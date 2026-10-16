import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cities = JSON.parse(await fs.readFile(path.join(root, 'src/data/cities.json'), 'utf8'));
const ready = JSON.parse(await fs.readFile(path.join(root, 'src/data/guides.json'), 'utf8'));
const highlights = JSON.parse(await fs.readFile(path.join(root, 'src/data/city-highlights.json'), 'utf8'));
const textureIds = ['paper-fleck', 'jaali', 'block-print', 'contour', 'handloom', 'terrazzo'];

function textureFor(slug) {
  let hash = 2166136261;
  for (const char of slug) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return textureIds[(hash >>> 0) % textureIds.length];
}

function populationBand(population) {
  if (population >= 1_000_000) return '1m_plus';
  if (population >= 250_000) return '250k_to_999k';
  if (population >= 50_000) return '50k_to_249k';
  return 'under_50k';
}

function csvCell(value) {
  const text = value === null || value === undefined ? '' : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

const guideData = new Map();
for (const slug of ready) {
  const file = path.join(root, 'public/guides', `${slug}.json`);
  const guide = JSON.parse(await fs.readFile(file, 'utf8'));
  guideData.set(slug, guide);
}

const headers = [
  'id', 'city', 'state', 'slug', 'latitude', 'longitude', 'population', 'population_band', 'aliases',
  'texture_id', 'guide_status', 'research_status', 'place_count', 'candidate_goal',
  'community_thread_min', 'last_researched', 'next_action', 'notes',
];

const rows = cities.map((city) => {
  const guide = guideData.get(city.slug);
  const aliases = [...new Map(city.aliases
    .filter((alias) => alias.trim() && alias.toLocaleLowerCase() !== city.name.toLocaleLowerCase())
    .map((alias) => [alias.toLocaleLowerCase(), alias])).values()];
  return [
    city.id,
    city.name,
    city.state,
    city.slug,
    city.lat,
    city.lon,
    city.population,
    populationBand(city.population),
    aliases.join(' | '),
    textureFor(city.slug),
    guide ? 'published' : 'awaiting_research',
    guide ? (guide.status === 'reviewed' ? 'reviewed' : 'pilot') : 'not_started',
    guide?.places?.length || 0,
    35,
    6,
    guide?.checked || '',
    guide ? 'Strengthen single-source leads and recheck venue details' : 'Compare local-evidence sources, shortlist supported places, then verify details',
    'GeoNames populated place, including towns. Population is the source attribute, not a current estimate.',
  ];
});

const csv = [headers, ...rows].map((row) => row.map(csvCell).join(',')).join('\n') + '\n';
await fs.writeFile(path.join(root, 'research/cities.csv'), csv, 'utf8');
const highlightHeaders = ['city_slug', 'city', 'state', 'known_for', 'signature_experience', 'best_season', 'hidden_gems', 'activities', 'discovery_sources', 'verification_sources', 'source_title', 'source_url', 'source_checked', 'search_checked', 'editorial_status', 'notes'];
const highlightRows = cities.map((city) => {
  const item = highlights[city.slug];
  return [
    city.slug,
    city.name,
    city.state,
    item?.knownFor?.join(' | ') || '',
    item?.signatureExperience || '',
    item?.bestSeason || '',
    '',
    item?.knownFor?.join(' | ') || '',
    '',
    item?.source?.url || '',
    item?.source?.title || '',
    item?.source?.url || '',
    item?.source?.checked || '',
    item?.source?.checked || '',
    item?.status || 'not_started',
    item ? 'Official destination snapshot only. A local guide still needs six independent local-evidence sources.' : 'Discover candidates in community, review and editorial sources. Verify the destination claim separately. Add hidden gems only after local comparison.',
  ];
});
const highlightCsv = [highlightHeaders, ...highlightRows].map((row) => row.map(csvCell).join(',')).join('\n') + '\n';
await fs.writeFile(path.join(root, 'research/city-highlights.csv'), highlightCsv, 'utf8');
console.log(`Wrote ${rows.length.toLocaleString('en-IN')} research-ready city records.`);
