import { Badge } from '@/components/lightswind/badge';

const cityStories = [
  {
    city: 'Kochi',
    title: 'Where Art Escaped the Gallery',
    text: 'Your buddy is an artist from Mattancherry who paints murals and brews filter coffee. You skip the Biennale brochure and walk through lanes where abandoned warehouses turned into studios.',
  },
  {
    city: 'Lucknow',
    title: 'Courtyards, Kebabs & Nawabi Grace',
    text: 'You\'re invited to a home where biryani doesn\'t come with a QR code. Your buddy\'s nani insists you try her secret galouti recipe, because food is trust.',
  },
  {
    city: 'Varanasi',
    title: 'The Ghats, Through a Local Lens',
    text: 'Instead of a tour, you walk with a Sanskrit student who tells you why one temple matters more than ten. Then share chai on the steps of silence.',
  },
  {
    city: 'Shillong',
    title: 'Hills, Momos & Indie Rock',
    text: 'It starts with a college hangout over momos, ends with an invite to a jam session on someone\'s rooftop. Welcome to the Khasi underground.',
  },
  {
    city: 'Bhuj',
    title: 'Mud Homes & Master Crafts',
    text: 'A young artisan shows you how his family weaves stories into every thread. Then you help him pick fabric for a wedding gift, for someone he\'s never met.',
  },
];

const personas = [
  { img: '/images/persona-foreign-traveler.png', label: 'Foreign travelers seeking authenticity' },
  { img: '/images/persona-indian-explorer.png', label: 'Indian solo explorers' },
  { img: '/images/persona-digital-nomad.png', label: 'Digital nomads' },
];

const otherAudiences = [
  'Business travelers in Tier-2 cities',
  'Influencer travelers',
  'International students',
];

const competitors = [
  { name: 'Airbnb', local: false, trust: 'partial', money: true },
  { name: 'Couchsurfing', local: true, trust: 'partial', money: false },
  { name: 'Tour agencies', local: false, trust: false, money: true },
  { name: 'MakeMyTrip', local: false, trust: 'partial', money: 'partial' },
  { name: 'Tripoto', local: 'partial', trust: 'partial', money: 'partial' },
  { name: 'Nukkad Network', local: true, trust: true, money: true, highlight: true },
];

function Mark({ v }: { v: boolean | 'partial' }) {
  if (v === true) return <span style={{ color: 'var(--indigo)' }}>Yes</span>;
  if (v === 'partial') return <span style={{ color: 'var(--gold)', filter: 'brightness(0.75)' }}>Partly</span>;
  return <span style={{ color: 'var(--rust)' }}>No</span>;
}

const deckSlides = [
  { src: '/images/deck/slide-02-about.png', caption: 'The mission, as pitched.' },
  { src: '/images/deck/slide-07-howitworks.png', caption: 'How a match actually happens.' },
  { src: '/images/deck/slide-14-economics.png', caption: 'Who takes a cut, and why.' },
  { src: '/images/deck/slide-16-competitive.png', caption: 'Where Nukkad sits versus the alternatives.' },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[var(--edge)]" style={{ background: 'var(--ink)' }}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
          <div className="relative z-10 text-[var(--paper)]">
            <span className="tag" style={{ background: 'var(--rust)' }}>
              India's human travel layer
            </span>
            <h1 className="mt-5 text-5xl text-[var(--paper)] md:text-6xl">
              A friend at every
              <br />
              <span className="script" style={{ color: 'var(--gold)' }}>street corner.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-[var(--paper)]/75">
              No more lonely layovers. Land anywhere, be known everywhere.
              Real people, real places, real connections. Not a tour, a
              friendship.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:ribhav28@gmail.com?subject=I%20want%20to%20be%20a%20Nukkad%20Buddy"
                className="rounded-sm px-6 py-3 font-semibold text-[var(--ink)] shadow-md transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--gold)' }}
              >
                Become a Buddy
              </a>
              <a
                href="mailto:ribhav28@gmail.com?subject=I%20want%20to%20find%20a%20Nukkad%20Buddy"
                className="rounded-sm border border-[var(--paper)]/40 px-6 py-3 font-semibold text-[var(--paper)] transition-transform hover:-translate-y-0.5"
              >
                Find a Buddy
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/atmosphere-musicians.png"
              alt="Two street musicians laughing against a mural"
              className="ml-auto w-full max-w-sm rotate-1 rounded-sm border-4 border-[var(--paper)] shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* PULL-QUOTE STATS */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <p className="text-2xl leading-relaxed text-[var(--ink-soft)] md:text-3xl">
          India logged <b className="text-[var(--rust)]">2.51 billion</b> domestic
          trips in 2023, up from 610 million in 2020. <b className="text-[var(--rust)]">81%</b> of
          travelers now say they want local immersion over touristy
          checklists. And <b className="text-[var(--rust)]">51%</b> of people report
          feeling lonely, which is the whole reason connection sells better
          than sightseeing.
        </p>
        <p className="mt-4 text-sm text-[var(--ink-soft)]/70">
          Figures cited from WTTC, Wikipedia, and American Express survey
          data, as referenced in the source deck.
        </p>
      </section>

      {/* WHO'S THIS FOR */}
      <section className="border-t border-[var(--edge)] bg-[var(--paper-2)] py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl">Who's this for</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {personas.map((p) => (
              <figure key={p.label} className="text-left">
                <img
                  src={p.img}
                  alt={p.label}
                  className="w-full rounded-sm border-4 border-white shadow-lg"
                  style={{ aspectRatio: '4/3', objectFit: 'cover' }}
                />
                <figcaption className="mt-3 font-semibold text-[var(--ink)]">
                  {p.label}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {otherAudiences.map((a) => (
              <Badge key={a} className="!bg-[var(--surface)] !border-[var(--edge)] !text-[var(--ink)] px-4 py-2 text-sm">
                {a}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CITY STORIES, editorial list */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 className="text-3xl">What a match could feel like</h2>
        <p className="mt-2 text-sm text-[var(--ink-soft)]/70">
          Five imagined scenarios from the concept deck, written to sell the
          idea. No cities are confirmed yet, and none of these are real
          Buddies.
        </p>
        <div className="mt-10 space-y-10">
          {cityStories.map((c, i) => (
            <div key={c.city} className="grid grid-cols-[auto_1fr] gap-5">
              <span
                className="text-4xl font-light"
                style={{ fontFamily: 'var(--display)', color: 'var(--edge)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="text-xs font-bold tracking-widest text-[var(--rust)] uppercase">
                  {c.city}
                </p>
                <p className="script mt-1 text-2xl">{c.title}</p>
                <p className="mt-2 max-w-xl text-[var(--ink-soft)]">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ECONOMICS */}
      <section className="border-t border-[var(--edge)] bg-[var(--ink)] py-16 text-[var(--paper)]">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl text-[var(--paper)]">Who's earning, who's vibing</h2>
          <p className="mt-2 max-w-2xl text-[var(--paper)]/70">
            This isn't a platform. It's a people-powered circle where value
            flows in every direction.
          </p>
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
            <div>
              <p className="script text-xl" style={{ color: 'var(--gold)' }}>The Traveler</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--paper)]/75">
                <li>Drops ₹199 to unlock city-wise access to the coolest locals.</li>
                <li>Doesn't feel like paying a guide. Feels like treating a friend to coffee.</li>
                <li>Finds stories, not just sights.</li>
              </ul>
            </div>
            <div>
              <p className="script text-xl" style={{ color: 'var(--gold)' }}>The Buddy</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--paper)]/75">
                <li>Earns a little extra hosting walks, food trails, rooftop sessions they already love doing.</li>
                <li>Feels like a local celeb in their own city.</li>
                <li>Builds a profile, a rep, and a community.</li>
              </ul>
            </div>
            <div>
              <p className="script text-xl" style={{ color: 'var(--gold)' }}>Nukkad HQ</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--paper)]/75">
                <li>Takes a small cut from premium subs and paid experiences.</li>
                <li>Helps travelers meet good people, not get scammed at a fort gate.</li>
                <li>Grows the network first, the bank account second.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COMPETITIVE LANDSCAPE */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 className="text-3xl">The missing piece</h2>
        <p className="mt-2 max-w-2xl text-[var(--ink-soft)]">
          No one combines all three: local friends, trust, and monetized
          experiences. That's the gap.
        </p>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-[var(--ink)] text-left">
                <th className="py-3 pr-4 font-semibold">Platform</th>
                <th className="py-3 pr-4 font-semibold">Local friends</th>
                <th className="py-3 pr-4 font-semibold">Trust</th>
                <th className="py-3 font-semibold">Monetized experiences</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c) => (
                <tr
                  key={c.name}
                  className="border-b border-[var(--edge)]"
                  style={c.highlight ? { background: 'rgba(193,85,46,0.08)' } : undefined}
                >
                  <td className={`py-3 pr-4 ${c.highlight ? 'font-bold' : ''}`}>{c.name}</td>
                  <td className="py-3 pr-4"><Mark v={c.local as boolean | 'partial'} /></td>
                  <td className="py-3 pr-4"><Mark v={c.trust as boolean | 'partial'} /></td>
                  <td className="py-3"><Mark v={c.money as boolean | 'partial'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* DECK GALLERY */}
      <section className="border-t border-[var(--edge)] bg-[var(--paper-2)] py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl">From the pitch deck</h2>
          <p className="mt-2 max-w-2xl text-[var(--ink-soft)]">
            A few slides from the deck this page is built from, in their
            original form.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {deckSlides.map((s) => (
              <figure key={s.src}>
                <img
                  src={s.src}
                  alt={s.caption}
                  className="w-full rounded-sm border border-[var(--edge)] shadow-md"
                />
                <figcaption className="mt-2 text-sm text-[var(--ink-soft)]">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="waitlist" className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h2 className="text-4xl">You're not booking a trip.</h2>
        <p className="script mt-1 text-4xl" style={{ color: 'var(--rust)' }}>You're making a connection.</p>
        <p className="mx-auto mt-5 max-w-xl text-[var(--ink-soft)]">
          Nukkad Network is pre-launch. Right now, that means a real
          conversation, not a form that goes nowhere. Tell us which city
          you're in and whether you want to host or travel.
        </p>
        <a
          href="mailto:ribhav28@gmail.com?subject=Nukkad%20Network%20-%20I%27m%20in"
          className="mt-7 inline-block rounded-sm px-8 py-4 font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
          style={{ background: 'var(--rust)' }}
        >
          Email us, let's talk
        </a>
      </section>
    </div>
  );
}
