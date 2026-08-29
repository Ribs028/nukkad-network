import Hero1 from '@/components/ui/hero-1';
import { Footer1 } from '@/components/ui/footer-1';
import { Faq1 } from '@/components/ui/faq-1';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const NAV_LINKS = [
  { label: 'Nukkad Network', href: '/', active: true },
  { label: '28 States · 28 Days', href: '/charity-run' },
];

const cityStories = [
  {
    city: 'Kochi',
    title: 'Where Art Escaped the Gallery',
    text: 'Your buddy is an artist from Mattancherry who paints murals and brews filter coffee. You skip the Biennale brochure and walk through lanes where abandoned warehouses turned into studios.',
    img: '/images/real/city-kochi.jpg',
  },
  {
    city: 'Lucknow',
    title: 'Courtyards, Kebabs & Nawabi Grace',
    text: 'You\'re invited to a home where biryani doesn\'t come with a QR code. Your buddy\'s nani insists you try her secret galouti recipe, because food is trust.',
    img: '/images/real/city-lucknow.jpg',
  },
  {
    city: 'Varanasi',
    title: 'The Ghats, Through a Local Lens',
    text: 'Instead of a tour, you walk with a Sanskrit student who tells you why one temple matters more than ten. Then share chai on the steps of silence.',
    img: '/images/real/city-varanasi.jpg',
  },
  {
    city: 'Shillong',
    title: 'Hills, Momos & Indie Rock',
    text: 'It starts with a college hangout over momos, ends with an invite to a jam session on someone\'s rooftop. Welcome to the Khasi underground.',
    img: '/images/real/city-shillong.jpg',
  },
  {
    city: 'Bhuj',
    title: 'Mud Homes & Master Crafts',
    text: 'A young artisan shows you how his family weaves stories into every thread. Then you help him pick fabric for a wedding gift, for someone he\'s never met.',
    img: '/images/real/city-bhuj.jpg',
  },
  {
    city: 'Jaipur',
    title: 'Havelis Painted With Stories',
    text: 'Your buddy grew up in a Shekhawati haveli covered floor to ceiling in hand-painted frescoes. She walks you through alleys where every wall is a mural nobody photographs for Instagram, because it was never meant to be a backdrop.',
    img: '/images/real/city-jaipur.jpg',
  },
];

const buddyPhotos = [
  { img: '/images/real/cobbler-ledger.jpg', label: 'A cobbler who knows every regular by their shoe' },
  { img: '/images/real/shopkeeper-pickles.jpg', label: "A corner shopkeeper who's seen the street change for decades" },
  { img: '/images/real/idol-sculptor.jpg', label: 'An artisan sculpting the next festival\'s idols by hand' },
  { img: '/images/real/cotton-candy-seller.jpg', label: 'A night-market vendor who lights up after dark' },
];

const travelerAudiences = [
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
  { name: 'Tour agencies', local: false, trust: false, money: true },
  { name: 'MakeMyTrip', local: false, trust: 'partial', money: 'partial' },
  { name: 'Tripoto', local: 'partial', trust: 'partial', money: 'partial' },
  { name: 'Nukkad Network', local: true, trust: true, money: true, highlight: true },
];

function Mark({ v }: { v: boolean | 'partial' }) {
  if (v === true) return <span className="text-primary font-medium">Yes</span>;
  if (v === 'partial') return <span className="text-muted-foreground">Partly</span>;
  return <span className="text-destructive">No</span>;
}

const deckSlides = [
  { src: '/images/deck/slide-02-about.png', caption: 'The mission, as pitched.' },
  { src: '/images/deck/slide-07-howitworks.png', caption: 'How a match actually happens.' },
  { src: '/images/deck/slide-14-economics.png', caption: 'Who takes a cut, and why.' },
  { src: '/images/deck/slide-16-competitive.png', caption: 'Where Nukkad sits versus the alternatives.' },
];

const faqs = [
  {
    id: 'q1',
    question: "Isn't this just Couchsurfing with a different name?",
    answer:
      'Couchsurfing gets you a real local, but verification is weak and hosts earn nothing. Nukkad adds community ratings, intent-based matching, and optional paid experiences, so Buddies have a reason to keep showing up.',
  },
  {
    id: 'q2',
    question: 'How do you keep this safe when strangers meet up?',
    answer:
      "Honestly: this is still being worked out. Community ratings and intent-based matching are the plan, but the exact verification mechanism isn't finalized. That's one of the open questions Phase 0 (manual matching) is meant to answer before any code gets written.",
  },
  {
    id: 'q3',
    question: 'Why would a local bother hosting a stranger?',
    answer:
      "They're usually already doing these things: murals, food trails, jam sessions. Nukkad adds visibility, a bit of status, and a little income on top of what they'd do anyway.",
  },
  {
    id: 'q4',
    question: 'Is there an app yet?',
    answer:
      'No, and not yet on purpose. The plan is to validate demand with real DMs and a Notion sheet in one or two cities first. Code comes after there is evidence people actually want this.',
  },
];

export default function Home() {
  return (
    <div>
      <Hero1
        brand="Nukkad Network"
        navLinks={NAV_LINKS}
        headline={<>A friend at every<br />street corner.</>}
        description={'No more lonely layovers. Land anywhere, be known everywhere.\nReal people, real places, real connections. Not a tour, a friendship.'}
        ctaLabel="Become a Buddy"
        ctaHref="mailto:ribhav28@gmail.com?subject=I%20want%20to%20be%20a%20Nukkad%20Buddy"
        signInLabel="Find a Buddy"
        signInHref="mailto:ribhav28@gmail.com?subject=I%20want%20to%20find%20a%20Nukkad%20Buddy"
        socialLinks={[
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ribhavmodi0528/' },
          { label: 'X', href: 'https://x.com/RibsModi' },
        ]}
        backgroundImage="/images/real/traveler-and-local.jpg"
        backgroundVideo="/videos/bazaar-street.mp4"
      />

      {/* PULL-QUOTE STATS */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <p className="text-2xl leading-relaxed text-muted-foreground md:text-3xl">
          India logged <b className="text-primary">2.51 billion</b> domestic trips
          in 2023, up from 610 million in 2020. <b className="text-primary">81%</b> of
          travelers now say they want local immersion over touristy
          checklists. And <b className="text-primary">51%</b> of people report
          feeling lonely, which is the whole reason connection sells better
          than sightseeing.
        </p>
        <p className="mt-4 text-sm text-muted-foreground/70">
          Figures cited from WTTC, Wikipedia, and American Express survey
          data, as referenced in the source deck.
        </p>
      </section>

      {/* WHO'S THIS FOR */}
      <section className="border-t bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-semibold tracking-tight">Who's this for</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {travelerAudiences.map((a) => (
              <Badge key={a} variant="secondary" className="px-4 py-2 text-sm">
                {a}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* WHO YOU'D ACTUALLY MEET */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-semibold tracking-tight">Who you'd actually meet</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Real street photography, not stock traveler photos. This is the
            texture Nukkad Network is trying to give visitors access to.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {buddyPhotos.map((p) => (
              <Card key={p.label} className="overflow-hidden py-0">
                <img
                  src={p.img}
                  alt={p.label}
                  className="w-full"
                  style={{ aspectRatio: '4/5', objectFit: 'cover' }}
                />
                <CardContent className="py-4">
                  <p className="text-sm font-medium">{p.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* JALI BANNER — collage of three real lattice/archway photos */}
      <section className="relative h-72 overflow-hidden md:h-96">
        <div className="grid h-full grid-cols-3">
          <img
            src="/images/real/jali-room.jpg"
            alt="Light falling through a jali lattice screen"
            className="h-full w-full object-cover"
          />
          <img
            src="/images/real/fatehpur-arches.jpg"
            alt="Carved sandstone jali corridor at Fatehpur Sikri"
            className="h-full w-full object-cover"
          />
          <img
            src="/images/real/jali-closeup.jpg"
            alt="Close-up of a carved jali lattice pattern"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-foreground/55" />
        <div className="relative z-10 flex h-full items-center justify-center px-5 text-center">
          <p className="max-w-xl text-xl font-medium text-background md:text-2xl">
            The same light falls through every jali screen. Nukkad Network is
            about who's standing on the other side of it.
          </p>
        </div>
      </section>

      {/* CITY STORIES */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl font-semibold tracking-tight">What a match could feel like</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Six imagined scenarios from the concept deck, written to sell the
          idea. No cities are confirmed yet, and none of these are real
          Buddies.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cityStories.map((c, i) => (
            <Card key={c.city} className="group relative overflow-hidden p-0">
              <div className="relative aspect-[3/4] w-full">
                <img
                  src={c.img}
                  alt={c.city}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/35 to-transparent" />
                <span className="absolute right-4 top-4 text-5xl font-light text-background/50 [text-shadow:0_1px_6px_rgb(0_0_0_/_0.5)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <Badge variant="outline" className="mb-2 border-background/40 text-background">
                    {c.city}
                  </Badge>
                  <p className="text-xl font-semibold text-background">{c.title}</p>
                  <p className="mt-2 text-sm text-background/85">{c.text}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ECONOMICS */}
      <section className="border-t bg-foreground py-16 text-background">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-semibold tracking-tight text-background">Who's earning, who's vibing</h2>
          <p className="mt-2 max-w-2xl text-background/70">
            This isn't a platform. It's a people-powered circle where value
            flows in every direction.
          </p>
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
            <div>
              <p className="text-lg font-semibold text-primary">The Traveler</p>
              <ul className="mt-3 space-y-2 text-sm text-background/75">
                <li>Drops ₹199 to unlock city-wise access to the coolest locals.</li>
                <li>Doesn't feel like paying a guide. Feels like treating a friend to coffee.</li>
                <li>Finds stories, not just sights.</li>
              </ul>
            </div>
            <div>
              <p className="text-lg font-semibold text-primary">The Buddy</p>
              <ul className="mt-3 space-y-2 text-sm text-background/75">
                <li>Earns a little extra hosting walks, food trails, rooftop sessions they already love doing.</li>
                <li>Feels like a local celeb in their own city.</li>
                <li>Builds a profile, a rep, and a community.</li>
              </ul>
            </div>
            <div>
              <p className="text-lg font-semibold text-primary">Nukkad HQ</p>
              <ul className="mt-3 space-y-2 text-sm text-background/75">
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
        <h2 className="text-3xl font-semibold tracking-tight">The missing piece</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          No one combines all three: local friends, trust, and monetized
          experiences. That's the gap.
        </p>
        <Card className="mt-8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-left">
                  <th className="px-4 py-3 font-semibold">Platform</th>
                  <th className="px-4 py-3 font-semibold">Local friends</th>
                  <th className="px-4 py-3 font-semibold">Trust</th>
                  <th className="px-4 py-3 font-semibold">Monetized experiences</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((c) => (
                  <tr key={c.name} className={`border-b last:border-0 ${c.highlight ? 'bg-primary/5' : ''}`}>
                    <td className={`px-4 py-3 ${c.highlight ? 'font-bold' : ''}`}>{c.name}</td>
                    <td className="px-4 py-3"><Mark v={c.local as boolean | 'partial'} /></td>
                    <td className="px-4 py-3"><Mark v={c.trust as boolean | 'partial'} /></td>
                    <td className="px-4 py-3"><Mark v={c.money as boolean | 'partial'} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* DECK GALLERY */}
      <section className="border-t bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-semibold tracking-tight">From the pitch deck</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            A few slides from the deck this page is built from, in their
            original form.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {deckSlides.map((s) => (
              <Card key={s.src} className="overflow-hidden py-0">
                <img src={s.src} alt={s.caption} className="w-full" />
                <CardContent className="py-3 text-sm text-muted-foreground">{s.caption}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Faq1
        badge="Before you ask"
        title="Objections, answered honestly"
        faqs={faqs}
      />

      {/* CTA */}
      <section id="waitlist" className="relative overflow-hidden py-20 text-center">
        <img
          src="/images/real/jali-closeup.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.07]"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-5">
          <h2 className="text-4xl font-semibold tracking-tight">You're not booking a trip.</h2>
          <p className="mt-1 text-4xl font-semibold text-primary">You're making a connection.</p>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Nukkad Network is pre-launch. Right now, that means a real
            conversation, not a form that goes nowhere. Tell us which city
            you're in and whether you want to host or travel.
          </p>
          <Button asChild size="lg" className="mt-7">
            <a href="mailto:ribhav28@gmail.com?subject=Nukkad%20Network%20-%20I%27m%20in">Email us, let's talk</a>
          </Button>
        </div>
      </section>

      <Footer1
        logo={<span className="text-2xl">🧭</span>}
        brandName="Nukkad Network"
        newsletterTitle="Currently"
        newsletterDescription="Pre-launch concept. Numbers on this site are targets, not results."
        newsletterButtonText="Email us"
        newsletterButtonHref="mailto:ribhav28@gmail.com"
        linkGroups={[
          {
            title: 'Explore',
            links: [
              { label: 'Nukkad Network', href: '/' },
              { label: '28 States · 28 Days', href: '/charity-run' },
              { label: 'Become a Buddy', href: '#waitlist' },
            ],
          },
          {
            title: 'Contact',
            links: [
              { label: 'ribhav28@gmail.com', href: 'mailto:ribhav28@gmail.com' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ribhavmodi0528/' },
              { label: 'X / Twitter', href: 'https://x.com/RibsModi' },
            ],
          },
        ]}
        copyright="Built by Ribhav Modi. Both Nukkad Network and 28 States, 28 Days are pre-launch concepts."
      />
    </div>
  );
}
