import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cities = JSON.parse(await fs.readFile(path.join(root, 'src/data/cities.json'), 'utf8'));
const batchSize = 500;
const totalBatches = Math.ceil(cities.length / batchSize);
const requestedBatch = Number(process.argv.find((arg) => /^\d+$/.test(arg)) || 0);
const online = process.argv.includes('--online');
const checked = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());
const userAgent = 'NukkadNetworkResearchBot/1.0 (https://nukkad-network.vercel.app)';

if (requestedBatch && (requestedBatch < 1 || requestedBatch > totalBatches)) {
  throw new Error(`Batch must be between 1 and ${totalBatches}.`);
}

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .toLowerCase();
}

function trimSummary(value, max = 720) {
  const clean = String(value || '').replace(/[–—]/g, ',').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const sentence = cut.lastIndexOf('. ');
  return `${cut.slice(0, sentence > 360 ? sentence + 1 : cut.lastIndexOf(' ')).trim()}...`;
}

function baseline(city, batch) {
  return {
    citySlug: city.slug,
    name: city.name,
    state: city.state,
    latitude: city.lat,
    longitude: city.lon,
    population: city.population,
    batch,
    summary: `${city.name} is a populated place in ${city.state}, India. This page is in Nukkad Network's research queue. We are still comparing community discussions, local publications and current reviews before recommending how to experience it like a local.`,
    source: {
      title: `GeoNames record for ${city.name}`,
      url: `https://www.geonames.org/${city.id}/`,
      checked,
      type: 'directory',
    },
    researchStage: 'directory_baseline',
    localEvidenceStatus: 'not_started',
    fullGuideStatus: 'not_started',
  };
}

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function distanceKm(city, coordinate) {
  const radians = (degrees) => degrees * Math.PI / 180;
  const deltaLat = radians(coordinate.lat - city.lat);
  const deltaLon = radians(coordinate.lon - city.lon);
  const a = Math.sin(deltaLat / 2) ** 2
    + Math.cos(radians(city.lat)) * Math.cos(radians(coordinate.lat)) * Math.sin(deltaLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function fetchJsonWithRetry(url, attempts = 4) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const response = await fetch(url, { headers: { 'User-Agent': userAgent, Accept: 'application/json' } });
    if (response.ok) return response.json();
    if (response.status !== 429 || attempt === attempts) throw new Error(`Reference API returned ${response.status}`);
    const retryAfter = Math.min(30, Number(response.headers.get('retry-after')) || attempt * 4);
    await sleep(retryAfter * 1000);
  }
  return null;
}

async function queryReferenceBatch(host, group, { includeExtract = true, allowAliases = true } = {}) {
  const options = {
    action: 'query',
    format: 'json',
    origin: '*',
    titles: group.map((city) => city.name).join('|'),
    prop: includeExtract ? 'extracts|info|coordinates' : 'info|coordinates',
    inprop: 'url',
    redirects: '1',
    coprimary: 'all',
  };
  if (includeExtract) Object.assign(options, { exintro: '1', explaintext: '1', exchars: '900', exlimit: 'max' });
  const params = new URLSearchParams(options);
  const payload = await fetchJsonWithRetry(`https://${host}/w/api.php?${params}`);
  const pages = Object.values(payload?.query?.pages || {});
  const matches = new Map();
  for (const city of group) {
    const names = new Set([city.name, ...(allowAliases ? city.aliases || [] : [])].map(normalize).filter(Boolean));
    const page = pages.find((candidate) => {
      if (!candidate || candidate.missing || !candidate.fullurl) return false;
      const shortTitle = String(candidate.title || '').replace(/\s*\([^)]*\)\s*$/, '').split(',')[0];
      if (!names.has(normalize(candidate.title)) && !names.has(normalize(shortTitle))) return false;
      const coordinate = candidate.coordinates?.[0];
      return coordinate ? distanceKm(city, coordinate) <= 75 : group.filter((item) => normalize(item.name) === normalize(city.name)).length === 1;
    });
    if (page) matches.set(city.slug, page);
  }
  return matches;
}

function csvCell(value) {
  const text = value === null || value === undefined ? '' : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

async function writeBatch(batch, profiles) {
  const number = String(batch).padStart(3, '0');
  const publicDir = path.join(root, 'public/city-profiles');
  const researchDir = path.join(root, 'research/batches');
  await fs.mkdir(publicDir, { recursive: true });
  await fs.mkdir(researchDir, { recursive: true });
  const object = Object.fromEntries(profiles.map((profile) => [profile.citySlug, profile]));
  await fs.writeFile(
    path.join(publicDir, `batch-${number}.json`),
    `${JSON.stringify({ batch, batchSize, checked, cities: object }, null, 2)}\n`,
    'utf8',
  );
  const headers = [
    'batch', 'city_slug', 'city', 'state', 'research_stage', 'local_evidence_status',
    'full_guide_status', 'reference_title', 'reference_url', 'travel_guide_url', 'checked', 'summary',
  ];
  const rows = profiles.map((profile) => [
    batch,
    profile.citySlug,
    profile.name,
    profile.state,
    profile.researchStage,
    profile.localEvidenceStatus,
    profile.fullGuideStatus,
    profile.source.title,
    profile.source.url,
    profile.travelGuide?.url || '',
    profile.source.checked,
    profile.summary,
  ]);
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(',')).join('\n') + '\n';
  await fs.writeFile(path.join(researchDir, `batch-${number}.csv`), csv, 'utf8');
}

async function runBatch(batch, useOnline) {
  const start = (batch - 1) * batchSize;
  const group = cities.slice(start, start + batchSize);
  const profiles = group.map((city) => baseline(city, batch));
  if (useOnline) {
    for (let index = 0; index < group.length; index += 20) {
      const chunk = group.slice(index, index + 20);
      try {
        const wikipedia = await queryReferenceBatch('en.wikipedia.org', chunk, { includeExtract: true, allowAliases: true });
        chunk.forEach((city, offset) => {
          const page = wikipedia.get(city.slug);
          if (page?.extract) {
            profiles[index + offset].summary = trimSummary(page.extract);
            profiles[index + offset].source = { title: page.title, url: page.fullurl, checked, type: 'reference' };
            profiles[index + offset].researchStage = 'reference_profile';
          }
        });
      } catch (error) {
        console.warn(`Batch ${batch}, cities ${index + 1} to ${index + chunk.length}: ${error.message}`);
      }
      await sleep(1200);
    }
    for (let index = 0; index < group.length; index += 50) {
      const chunk = group.slice(index, index + 50);
      try {
        const wikivoyage = await queryReferenceBatch('en.wikivoyage.org', chunk, { includeExtract: false, allowAliases: false });
        chunk.forEach((city, offset) => {
          const travel = wikivoyage.get(city.slug);
          if (travel?.fullurl) profiles[index + offset].travelGuide = { title: travel.title, url: travel.fullurl, checked };
        });
      } catch (error) {
        console.warn(`Batch ${batch}, travel references ${index + 1} to ${index + chunk.length}: ${error.message}`);
      }
      console.log(`Batch ${batch}: checked ${index + chunk.length} of ${group.length}`);
      await writeBatch(batch, profiles);
      await sleep(1200);
    }
  }
  await writeBatch(batch, profiles);
  const referenced = profiles.filter((profile) => profile.researchStage === 'reference_profile').length;
  console.log(`Batch ${batch}: wrote ${profiles.length} profiles, ${referenced} with a verified reference page.`);
  return { batch, count: profiles.length, referenced, checked, online: useOnline };
}

const batches = requestedBatch ? [requestedBatch] : Array.from({ length: totalBatches }, (_, index) => index + 1);
const results = [];
for (const batch of batches) results.push(await runBatch(batch, online));
const manifest = {
  checked,
  totalCities: cities.length,
  batchSize,
  totalBatches,
  batches: Array.from({ length: totalBatches }, (_, index) => {
    const batch = index + 1;
    const existing = results.find((item) => item.batch === batch);
    const count = Math.min(batchSize, Math.max(0, cities.length - index * batchSize));
    return existing || { batch, count, referenced: 0, checked, online: false };
  }),
  note: 'Reference profiles provide orientation only. Local recommendations remain unpublished until the evidence standard is met.',
};
await fs.mkdir(path.join(root, 'public/city-profiles'), { recursive: true });
await fs.writeFile(path.join(root, 'public/city-profiles/manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`Prepared ${results.length} batch${results.length === 1 ? '' : 'es'} of ${batchSize} cities, with ${cities.length % batchSize || batchSize} in the final batch.`);
