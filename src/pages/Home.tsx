import { CountUp } from '@/components/lightswind/count-up';
import { WorldMap } from '@/components/lightswind/world-map';
import { Badge } from '@/components/lightswind/badge';

const cityStories = [
  {
    city: 'Kochi',
    title: 'Where Art Escaped the Gallery',
    text: '"Your buddy is an artist from Mattancherry who paints murals and brews filter coffee. You skip the Biennale brochure and walk through lanes where abandoned warehouses turned into studios."',
  },
  {
    city: 'Lucknow',
    title: 'Courtyards, Kebabs & Nawabi Grace',
    text: '"You\'re invited to a home where biryani doesn\'t come with a QR code. Your buddy\'s nani insists you try her secret galouti recipe — because food is trust."',
  },
  {
    city: 'Varanasi',
    title: 'The Ghats, Through a Local Lens',
    text: '"Instead of a tour, you walk with a Sanskrit student who tells you why one temple matters more than ten. Then share chai on the steps of silence."',
  },
  {
    city: 'Shillong',
    title: 'Hills, Momos & Indie Rock',
    text: '"It starts with a college hangout over momos, ends with an invite to a jam session on someone\'s rooftop. Welcome to the Khasi underground."',
  },
  {
    city: 'Bhuj',
    title: 'Mud Homes & Master Crafts',
    text: '"A young artisan shows you how his family weaves stories into every thread. Then you help him pick fabric for a wedding gift — for someone you\'ve never met."',
  },
];

const audiences = [
  'Foreign travelers seeking authenticity',
  'Indian solo explorers',
  'Digital nomads',
  'Business travelers in Tier-2 cities',
  'Influencer travelers',
  'International students',
];

const competitors = [
  { name: 'Airbnb', local: false, trust: 'partial', money: true },
  { name: 'Couchsurfing', local: true, trust: 'partial', money: false },
  { name: 'Tour Agencies', local: false, trust: false, money: true },
  { name: 'MakeMyTrip', local: false, trust: 'partial', money: 'partial' },
  { name: 'Tripoto', local: 'partial', trust: 'partial', money: 'partial' },
  { name: 'Nukkad Network', local: true, trust: true, money: true, highlight: true },
];

function Mark({ v }: { v: boolean | 'partial' }) {
  if (v === true) return <span className="text-[var(--olive)]">✅</span>;
  if (v === 'partial') return <span className="text-amber-600">△</span>;
  return <span className="text-[var(--rust)]">✕</span>;
}

const cityMarkers = [
  { lat: 28.6139, lng: 77.209, label: 'New Delhi', color: '#c1552e' },
  { lat: 9.9312, lng: 76.2673, label: 'Kochi', color: '#5b6b3f' },
  { lat: 26.8467, lng: 80.9462, label: 'Lucknow', color: '#5b6b3f' },
  { lat: 25.3176, lng: 82.9739, label: 'Varanasi', color: '#5b6b3f' },
  { lat: 25.5788, lng: 91.8933, label: 'Shillong', color: '#5b6b3f' },
  { lat: 23.242, lng: 69.6669, label: 'Bhuj', color: '#5b6b3f' },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-2 md:py-28">
          <div className="relative z-10">
            <span className="tag">India's human travel layer</span>
            <h1 className="mt-4 text-5xl md:text-6xl">
              A friend at
              <br />
              every <span className="text-[var(--rust)]">street corner.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-[var(--ink-soft)]">
              No more lonely layovers. Land anywhere, be known everywhere.
              Real people → real places → real connections — not a tour, a
              friendship.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="mailto:ribhav28@gmail.com?subject=I%20want%20to%20be%20a%20Nukkad%20Buddy"
                className="rounded-full bg-[var(--rust)] px-6 py-3 font-bold text-white shadow-md transition-transform hover:-translate-y-0.5"
              >
                Become a Buddy
              </a>
              <a
                href="mailto:ribhav28@gmail.com?subject=I%20want%20to%20find%20a%20Nukkad%20Buddy"
                className="rounded-full border-2 border-[var(--ink)] px-6 py-3 font-bold transition-transform hover:-translate-y-0.5"
              >
                Find a Buddy
              </a>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="paper-card w-full max-w-sm -rotate-2 p-6">
              <p className="hand text-2xl text-[var(--ink)]">"How it works"</p>
              <ol className="mt-3 space-y-3 text-sm text-[var(--ink-soft)]">
                <li><b className="text-[var(--ink)]">1.</b> Pick a city — or let your Buddy decide the vibe.</li>
                <li><b className="text-[var(--ink)]">2.</b> Get matched with a Nukkad Buddy who knows it like their playlist.</li>
                <li><b className="text-[var(--ink)]">3.</b> Meet up, hang out, see the city their way.</li>
                <li><b className="text-[var(--ink)]">4.</b> Leave with a memory, a friend, and a new story.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-[var(--border)] bg-[var(--ink)] py-10 text-[var(--paper)]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 text-center md:grid-cols-4">
          <Stat value={2.51} suffix="B+" decimals={2} label="Domestic trips in India, 2023" />
          <Stat value={231} suffix="B" prefix="$" label="India travel & tourism market" />
          <Stat value={81} suffix="%" label="Travelers want local immersion, not checklists" />
          <Stat value={51} suffix="%" label="Report feeling lonely — connection is the pitch" />
        </div>
        <p className="mx-auto mt-4 max-w-6xl px-5 text-center text-xs text-white/50">
          Cited from WTTC, Wikipedia, and American Express survey data — see the source deck for full references.
        </p>
      </section>

      {/* WHO'S THIS FOR */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl">Who's this for?</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {audiences.map((a) => (
            <Badge key={a} className="!bg-[var(--card)] !border-[var(--border)] !text-[var(--ink)] px-4 py-2 text-sm">
              {a}
            </Badge>
          ))}
        </div>
      </section>

      {/* CITY STORIES */}
      <section className="bg-[var(--paper-2)] py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl">See cities through the eyes of locals</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {cityStories.map((c) => (
              <div key={c.city} className="paper-card p-5">
                <span className="tag">{c.city}</span>
                <p className="hand mt-3 text-xl">{c.title}</p>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE ECONOMICS */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl">Who's earning, who's vibing</h2>
        <p className="mt-2 max-w-2xl text-[var(--ink-soft)]">
          This isn't a platform. It's a people-powered circle where value
          flows in every direction.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="paper-card p-6">
            <p className="hand text-xl">🎒 The Traveler</p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--ink-soft)]">
              <li>Drops ₹199 to unlock city-wise access to the coolest locals.</li>
              <li>Doesn't feel like paying a guide — feels like treating a friend to coffee.</li>
              <li>Finds stories, not just sights.</li>
            </ul>
          </div>
          <div className="paper-card p-6">
            <p className="hand text-xl">🎨 The Buddy</p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--ink-soft)]">
              <li>Earns a little extra hosting walks, food trails, rooftop sessions they already love doing.</li>
              <li>Feels like a local celeb in their own city.</li>
              <li>Builds a profile, a rep, and a community.</li>
            </ul>
          </div>
          <div className="paper-card p-6">
            <p className="hand text-xl">🧢 Nukkad HQ</p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--ink-soft)]">
              <li>Takes a small cut from premium subs and paid experiences.</li>
              <li>Helps travelers meet good people, not get scammed at a fort gate.</li>
              <li>Grows the network first, the bank account second.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="bg-[var(--ink)] py-16 text-[var(--paper)]">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl text-[var(--paper)]">Where Buddies live</h2>
          <p className="mt-2 max-w-xl text-white/60">
            An early look at the cities in the deck's own city-spotlight
            stories — the first places Nukkad Network would seed with real
            Buddies.
          </p>
          <div className="mt-8 overflow-hidden rounded-xl border border-white/10">
            <WorldMap
              markers={cityMarkers}
              dotColor="rgba(244,236,223,0.15)"
              markerColor="#c1552e"
              pulse
            />
          </div>
        </div>
      </section>

      {/* COMPETITIVE LANDSCAPE */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl">The missing piece</h2>
        <p className="mt-2 max-w-2xl text-[var(--ink-soft)]">
          No one combines all three — local friends, trust, and monetized
          experiences. That's the gap.
        </p>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] text-sm">
            <thead>
              <tr className="bg-[var(--paper-2)] text-left">
                <th className="px-4 py-3">Platform</th>
                <th className="px-4 py-3">Local friends</th>
                <th className="px-4 py-3">Trust</th>
                <th className="px-4 py-3">Monetized experiences</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c) => (
                <tr
                  key={c.name}
                  className={`border-t border-[var(--border)] ${c.highlight ? 'bg-[var(--rust)]/10 font-bold' : ''}`}
                >
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3"><Mark v={c.local as boolean | 'partial'} /></td>
                  <td className="px-4 py-3"><Mark v={c.trust as boolean | 'partial'} /></td>
                  <td className="px-4 py-3"><Mark v={c.money as boolean | 'partial'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA / WAITLIST */}
      <section id="waitlist" className="mx-auto max-w-4xl px-5 py-20 text-center">
        <h2 className="text-4xl">You're not booking a trip.</h2>
        <p className="hand mt-1 text-4xl text-[var(--rust)]">You're making a connection.</p>
        <p className="mx-auto mt-5 max-w-xl text-[var(--ink-soft)]">
          Nukkad Network is pre-launch — right now, that means real DMs and a
          real conversation, not a form that goes nowhere. Tell us which city
          you're in and whether you want to host or travel.
        </p>
        <a
          href="mailto:ribhav28@gmail.com?subject=Nukkad%20Network%20-%20I%27m%20in"
          className="mt-7 inline-block rounded-full bg-[var(--rust)] px-8 py-4 font-bold text-white shadow-md transition-transform hover:-translate-y-0.5"
        >
          Email us — let's talk
        </a>
      </section>
    </div>
  );
}

function Stat({
  value,
  suffix,
  prefix,
  decimals,
  label,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
}) {
  return (
    <div>
      <div className="hand text-4xl">
        <CountUp value={value} suffix={suffix} prefix={prefix} decimals={decimals} duration={1.6} />
      </div>
      <p className="mt-1 text-xs text-white/60">{label}</p>
    </div>
  );
}
