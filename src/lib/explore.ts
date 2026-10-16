import catalogue from '../data/cities.json';
import highlightCatalogue from '../data/city-highlights.json';

export type City = { id: string; slug: string; name: string; state: string; lat: number; lon: number; population: number; aliases: string[] };
export type Category = 'breakfast' | 'lunch' | 'dinner' | 'nightlife' | 'shopping' | 'unique' | 'must-visit' | 'known-for' | 'activities' | 'hidden-gems';
export type CityHighlight = { knownFor: string[]; signatureExperience: string; bestSeason: string; source: { title: string; url: string; checked: string }; status: 'verified_snapshot' };
export type ProfileEvidenceStatus = 'not_started' | 'in_progress' | 'evidence_queue_complete' | 'reviewed_guide_exists' | 'covered_by_parent_city' | 'evidence_gap';
export type ProfileEvidenceSource = {
  title: string;
  url: string;
  type: 'community' | 'community-aggregation' | 'review-platform' | 'local-publication';
  reviewMethod: string;
  excerpt: string;
  note: string;
};
export type ProfileEvidenceSummary = {
  checked: string;
  searchPasses: number;
  candidateSourceCount: number;
  shortlistedSourceCount: number;
  communitySourceCount: number;
  status: ProfileEvidenceStatus;
  note: string;
  parentCitySlug?: string | null;
  parentCity?: string | null;
  sources: ProfileEvidenceSource[];
};
export type CityProfile = {
  citySlug: string;
  name: string;
  state: string;
  latitude: number;
  longitude: number;
  population: number;
  batch: number;
  summary: string;
  source: { title: string; url: string; checked: string; type: 'directory' | 'reference' };
  travelGuide?: { title: string; url: string; checked: string };
  researchStage: 'directory_baseline' | 'reference_profile';
  localEvidenceStatus: ProfileEvidenceStatus;
  fullGuideStatus: 'not_started' | 'in_progress' | 'published';
  evidenceSummary?: ProfileEvidenceSummary;
};
export type SourceType = 'community' | 'review-platform' | 'local-publication' | 'travel-editorial' | 'official';
export type Source = { id: string; title: string; url: string; type: SourceType; checked: string; note: string };
export type Place = { id: string; name: string; category: Category; area: string; why: string; try: string; tip: string; history?: string; historySource?: string; sourceIds: string[]; evidence: string; mapsQuery?: string; rating?: { value: number; count: number; checked: string; url: string } };
export type Guide = { citySlug: string; title: string; intro: string; checked: string; status: 'partial' | 'reviewed'; sources: Source[]; places: Place[]; media: { src: string; alt: string; credit: string; href?: string }[]; editorialNote: string; itinerary: { time: string; placeId: string; note: string }[] };
export const cities = catalogue as City[];
export const cityHighlights = highlightCatalogue as Record<string, CityHighlight>;
export const cityTextures = [
  { id: 'paper-fleck', src: '/textures/paper-fleck.svg', size: '310px', paper: 'oklch(96.5% .022 82)' },
  { id: 'jaali', src: '/textures/jaali.svg', size: '230px', paper: 'oklch(96.8% .019 94)' },
  { id: 'block-print', src: '/textures/block-print.svg', size: '280px', paper: 'oklch(96.2% .023 72)' },
  { id: 'contour', src: '/textures/contour.svg', size: '360px', paper: 'oklch(96.5% .018 105)' },
  { id: 'handloom', src: '/textures/handloom.svg', size: '250px', paper: 'oklch(96.6% .019 65)' },
  { id: 'terrazzo', src: '/textures/terrazzo.svg', size: '300px', paper: 'oklch(96.4% .021 88)' },
] as const;
export function getCityTexture(slug: string) {
  let hash = 2166136261;
  for (const char of slug) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return cityTextures[(hash >>> 0) % cityTextures.length];
}
export const categories: { id: Category; label: string; title: string; hint: string; hindi: string }[] = [
  { id: 'breakfast', hindi: 'Pehle pet pooja.', label: 'Breakfast', title: 'Worth waking up for.', hint: 'A good city day starts with a good breakfast.' },
  { id: 'lunch', hindi: 'Khaana kha ke jaana.', label: 'Lunch', title: 'Lunch, the local way.', hint: 'The places people point friends towards.' },
  { id: 'dinner', hindi: 'Ek niwala aur sahi.', label: 'Dinner', title: 'Stay for one more bite.', hint: 'Easy evenings, good food and a little more city.' },
  { id: 'nightlife', hindi: 'Shaam ka kya scene hai?', label: 'After dark', title: 'Find your evening crowd.', hint: 'A little music, a little conversation. Pick your kind of evening.' },
  { id: 'shopping', hindi: 'Thoda sheher saath le chalo.', label: 'Shopping', title: 'Bring a little of it home.', hint: 'Markets, makers and something with a story.' },
  { id: 'unique', hindi: 'Yeh waali gali dekhi?', label: 'A little different', title: 'Take the interesting turn.', hint: 'Small detours worth making room for.' },
  { id: 'must-visit', hindi: 'Yahan toh jaana banta hai.', label: 'Must visit', title: 'Some classics earn their place.', hint: 'The landmarks locals still send their friends to.' },
  { id: 'known-for', hindi: 'Iski pehchaan yahi hai.', label: 'Known for', title: 'The experience people come here for.', hint: 'Signature food, craft, culture or landscape, with a source behind the claim.' },
  { id: 'activities', hindi: 'Aaj kya karna hai?', label: 'Things to do', title: 'Do more than pass through.', hint: 'Seasonal activities, walks, workshops and experiences worth planning around.' },
  { id: 'hidden-gems', hindi: 'Thoda hatke, bilkul local.', label: 'Hidden gems', title: 'The quieter stories.', hint: 'Places with real community evidence, kept separate from the usual checklist.' },
];
export const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const cityIndex = new Map(cities.map((city, index) => [city.slug, index]));
export function getCityBatch(slug: string) {
  const index = cityIndex.get(slug);
  return index === undefined ? 1 : Math.floor(index / 500) + 1;
}
const indexed = cities.map(city => ({ city, words: [city.name, ...city.aliases].map(normalize), state: normalize(city.state) }));
export function searchCities(query: string): City[] {
  const q = normalize(query);
  if (!q) return ['jaipur', 'mumbai', 'delhi', 'bengaluru', 'kochi', 'varanasi'].map(s => cities.find(c => c.slug === s)).filter((c): c is City => !!c);
  return indexed.map(item => ({ ...item, score: item.words.includes(q) ? 0 : item.words.some(w => w.startsWith(q)) ? 1 : item.words.some(w => w.includes(q)) ? 2 : item.state.includes(q) ? 3 : 9 }))
    .filter(item => item.score < 9).sort((a, b) => a.score - b.score || b.city.population - a.city.population).slice(0, 8).map(item => item.city);
}
export function projectCity(city: Pick<City, 'lat' | 'lon'>) { return { x: (city.lon - 67) * 18.6 + 26, y: (38 - city.lat) * 20.3 + 22 }; }
export function mapsLink(place: Place, city: City) { return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapsQuery || `${place.name}, ${place.area}, ${city.name}, India`)}`; }
export function communityLink(city: City, category?: string) { return `https://www.reddit.com/search/?q=${encodeURIComponent(`${city.name} ${city.state} ${category || 'local recommendations'}`)}`; }
const localEvidenceTypes: SourceType[] = ['community', 'review-platform', 'local-publication'];
export function getSourceCount(guide: Guide) { return new Set(guide.sources.filter(s => localEvidenceTypes.includes(s.type)).map(s => s.url.match(/comments\/([^/]+)/)?.[1] || s.url.replace(/[?#].*$/, '').replace(/\/$/, ''))).size; }
export function isGuide(value: unknown, slug: string): value is Guide {
  const g = value as Guide;
  const text = (v: unknown): v is string => typeof v === 'string' && !!v.trim();
  const https = (v: unknown) => { try { return text(v) && new URL(v).protocol === 'https:'; } catch { return false; } };
  if (!g || g.citySlug !== slug || !Array.isArray(g.sources) || !Array.isArray(g.places) || !Array.isArray(g.media) || !Array.isArray(g.itinerary) || !text(g.checked) || !text(g.title) || !text(g.intro) || !text(g.editorialNote)) return false;
  if (!g.sources.every(s => s && text(s.id) && text(s.title) && https(s.url) && ['community','review-platform','local-publication','travel-editorial','official'].includes(s.type)) || getSourceCount(g) < 6) return false;
  const ids = new Set(g.sources.map(s => s.id));
  const validPlaces = g.places.length > 0 && g.places.every(p => p && text(p.id) && text(p.name) && text(p.why) && text(p.evidence) && text(p.area) && text(p.try) && text(p.tip) && categories.some(c => c.id === p.category) && Array.isArray(p.sourceIds) && p.sourceIds.length > 0 && p.sourceIds.every(id => ids.has(id)) && g.sources.some(s => p.sourceIds.includes(s.id) && localEvidenceTypes.includes(s.type)) && (!p.historySource || https(p.historySource)) && (!p.rating || (p.rating.value >= 0 && p.rating.value <= 5 && p.rating.count >= 0 && text(p.rating.checked) && https(p.rating.url))));
  return validPlaces && ids.size === g.sources.length && new Set(g.places.map(p => p.id)).size === g.places.length
    && g.media.every(m => m && https(m.src) && https(m.href) && text(m.credit) && text(m.alt))
    && g.itinerary.every(s => s && text(s.time) && text(s.note) && g.places.some(p => p.id === s.placeId));
}
export function readSaved(citySlug: string): string[] {
  try { const v = JSON.parse(localStorage.getItem(`nukkad-stops:${citySlug}`) || '[]'); return Array.isArray(v) ? v.filter(x => typeof x === 'string') : []; } catch { return []; }
}
export function formatDate(value: string) { return new Date(`${value.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }
