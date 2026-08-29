import Hero1 from '@/components/ui/hero-1';
import { Footer1 } from '@/components/ui/footer-1';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, MapPin } from 'lucide-react';

const INSPIRATION_PLAYLIST_URL = 'https://youtube.com/playlist?list=PLlhlb6SLQQJ9Bhq7jkSi9dLVmLjm9lVAa&si=TpkJr9fvIqZNMwa2';

const NAV_LINKS = [
  { label: 'Nukkad Network', href: '/' },
  { label: '28 States · 28 Days', href: '/charity-run', active: true },
];

const wheel = [
  { name: 'Gaadi-Free Gaadi', text: '100 km by non-AC state bus.' },
  { name: '₹100 Budget Day', text: 'Food and transport, ₹100 or under.' },
  { name: 'No-English Day', text: 'Every English word costs a ₹1k host donation.' },
  { name: 'Masala Marathon', text: 'A 5 km sunrise run in local attire.' },
  { name: 'Band Baja Bonus', text: 'Busk until ₹500 is raised for charity.' },
];

const budget = [
  { item: 'Travel', cost: 18, notes: 'Flights, trains, fuel' },
  { item: 'Crew & stipends', cost: 10, notes: '4-person core plus a remote editor' },
  { item: 'Permits & insurance', cost: 2, notes: 'ILP, RAP, liability cover' },
  { item: 'Contingency & post', cost: 10, notes: 'Editing, unforeseen costs' },
];

const timeline = [
  { when: 'T-60 d', what: 'MoUs with Cuddles Foundation and GiveIndia, sponsor deck signed' },
  { when: 'T-45 d', what: 'Route locked, flights and stays booked' },
  { when: 'T-30 d', what: 'Crew onboard, Nukkad buddies shortlisted' },
  { when: 'T-7 d', what: 'Trailer and press blitz' },
  { when: 'Day 1 to 28', what: 'Shoot, edit, publish, every single day' },
  { when: '+14 d', what: 'Impact documentary and sponsor ROI report' },
];

const runOverview = [
  { label: 'Day 1: Ludhiana', text: 'The clockwise loop across all 28 states begins.' },
  { label: 'Every day', text: 'One vlog, one state, one new Buddy recruited for Nukkad Network.' },
  { label: 'Every ₹1L raised', text: 'The "Dasha Doom" wheel spins live, unlocking the next forfeit.' },
  { label: 'Day 28: Ludhiana', text: 'Back where it started, for the on-ground cheque hand-over.' },
];

const roadStops = [
  { img: '/images/real/road-state-bus.jpg', caption: 'The "Gaadi-Free Gaadi" rule in one photo: 100 km, roof included.' },
  { img: '/images/real/road-taxi-stand-sign.jpg', caption: 'Every taxi stand has its own hand-painted signage. No two look alike.' },
  { img: '/images/real/road-bhel-puri-vendor.jpg', caption: 'Roadside food, not restaurant food, is the whole point of the No-English Day.' },
];

export default function CharityRun() {
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(hsl(38 42% 93% / 0.86), hsl(38 42% 93% / 0.86)), url('/images/vehicles-pattern.jpg')",
        backgroundRepeat: 'no-repeat, repeat',
        backgroundSize: '100% 100%, 320px 320px',
      }}
    >
      <Hero1
        brand="Nukkad Network"
        navLinks={NAV_LINKS}
        headline={<>28 States,<br />28 Days.</>}
        description={"A daily YouTube race through every Indian state in 28 consecutive\ndays, raising money for the Cuddles Foundation. Inspired by Ryan\nTrahan's \"50/50\" format, run across Indian geography."}
        ctaLabel="Sponsor this run"
        ctaHref="mailto:ribhav28@gmail.com?subject=28%20States%20-%20Sponsorship%20interest"
        signInLabel="Read the full plan (PDF)"
        signInHref="/docs/28-States-28-Days-plan.pdf"
        socialLinks={[{ label: 'Talk to Ribhav', href: 'mailto:ribhav28@gmail.com' }]}
        backgroundVideo="/videos/charity-rickshaw.mp4"
        backgroundImage="/images/real/mumbai-vt-night.jpg"
      />

      {/* INSPIRATION */}
      <section className="mx-auto max-w-3xl px-5 pt-10">
        <a
          href={INSPIRATION_PLAYLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-lg border bg-card p-3 transition-colors hover:border-primary/40"
        >
          <span className="relative flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md">
            <img
              src="/images/real/ryan-trahan-thumb.png"
              alt="Ryan Trahan, day 1 of 50 States in 50 Days"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-foreground/25 transition-colors group-hover:bg-foreground/10" />
            <Play className="relative h-6 w-6 fill-background text-background drop-shadow" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-foreground group-hover:text-primary">
              Inspired by Ryan Trahan's "50 States in 50 Days"
            </span>
            <span className="block text-xs text-muted-foreground">
              YouTube playlist &middot; 50 videos &middot; opens on YouTube
            </span>
          </span>
        </a>
      </section>

      {/* OBJECTIVES */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <p className="text-2xl leading-relaxed text-muted-foreground md:text-3xl">
          The target is <b className="text-primary">₹50 lakh or more</b>, raised
          through 80-G and FCRA-compliant channels, against a{' '}
          <b className="text-primary">28 million</b> cumulative view goal and a
          sponsor CPM target of <b className="text-primary">₹110 or under</b>,
          against a category average near ₹180.
        </p>
        <p className="mt-4 text-sm text-muted-foreground/70">
          All figures here are projections from the pitch deck. Nothing has
          launched yet.
        </p>
      </section>

      {/* CONCEPT */}
      <section className="border-t bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-semibold tracking-tight">The concept</h2>

          <Card className="mt-8">
            <CardContent>
              <p className="text-lg font-semibold text-primary">How the run works</p>
              <p className="mt-1 text-sm text-muted-foreground">
                The whole idea, tentatively, in one line: loop the country, post daily, let donations control the show.
              </p>
              <div className="relative mt-10 pb-2">
                <div className="absolute left-4 top-2 bottom-2 w-px bg-primary/25 sm:left-0 sm:right-0 sm:top-4 sm:h-px sm:w-auto sm:bottom-auto" />
                <div className="relative flex flex-col gap-8 sm:flex-row sm:justify-between sm:gap-4">
                  {runOverview.map((step) => (
                    <div key={step.label} className="relative flex gap-4 sm:flex-1 sm:flex-col sm:items-center sm:gap-3 sm:text-center">
                      <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <div className="sm:max-w-[170px]">
                        <p className="text-sm font-semibold text-foreground">{step.label}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative mt-6 overflow-hidden">
            <img
              src="/images/real/nukkad-network-card-bg.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-card/40" />
            <CardContent className="relative z-10">
              <p className="text-lg font-semibold text-primary">Built-in Nukkad Network</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Every stop doubles as a Nukkad Network seeding trip: meeting
                and recruiting real local Buddies in each city, alongside
                Bussin' streetwear drops. See the{' '}
                <a href="/" className="font-semibold text-primary underline">
                  Nukkad Network
                </a>{' '}
                tab for what that platform actually is.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SCENES FROM THE ROAD */}
      <section className="border-t py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-semibold tracking-tight">Scenes from the road</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Real photos from the kind of roads this run is actually on.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {roadStops.map((s) => (
              <Card key={s.img} className="overflow-hidden py-0">
                <img src={s.img} alt={s.caption} className="w-full" style={{ aspectRatio: '4/3', objectFit: 'cover' }} />
                <CardContent className="py-4 text-sm text-muted-foreground">{s.caption}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CAUSE PARTNER */}
      <section className="border-t py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Cause partner: Cuddles Foundation</h2>
              <ul className="mt-6 space-y-3 text-muted-foreground">
                <li><b className="text-foreground">18,100 children</b> served across 42 hospitals in FY 2024.</li>
                <li>Nutrition programmes lift survival odds by <b className="text-foreground">20 to 30 percent</b>.</li>
                <li><b className="text-foreground">100 percent</b> of super-chat and merch profit flows through the GiveIndia API.</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/images/real/cuddles-kids-1.jpg"
                alt="Children smiling, arms around each other"
                className="w-full rounded-lg object-cover"
                style={{ aspectRatio: '3/4' }}
              />
              <img
                src="/images/real/cuddles-kids-2.jpg"
                alt="A group of schoolchildren laughing together"
                className="mt-8 w-full rounded-lg object-cover"
                style={{ aspectRatio: '3/4' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* DASHA DOOM */}
      <section className="relative overflow-hidden border-t bg-foreground py-16 text-background">
        <video
          src="/videos/dasha-doom-road.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-foreground/65" />
        <div className="relative z-10 mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-semibold tracking-tight text-background">"Dasha Doom," the penalty wheel</h2>
          <p className="mt-2 max-w-2xl text-background/70">
            A live wheel that unlocks a new forfeit at every ₹1 lakh raised,
            the entertainment mechanic tying donations directly to what
            happens on screen.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {wheel.map((w, i) => (
              <div key={w.name} className="rounded-lg border border-background/15 bg-background/10 p-4 backdrop-blur-sm">
                <span className="text-3xl font-light text-primary">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-2 font-semibold text-background">{w.name}</p>
                <p className="mt-1 text-sm text-background/70">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROUTE */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Route overview</h2>
            <p className="mt-3 text-muted-foreground">
              Start and finish in Ludhiana, Punjab: a clockwise loop of
              roughly 14,600 km, with the highest-risk Northeast states
              scheduled first and an island window (Andaman or Lakshadweep)
              if the budget allows.
            </p>
          </div>
          <img
            src="/images/real/fruit-truck-workers.jpg"
            alt="Two young workers on a fruit delivery truck"
            className="w-full rounded-lg border shadow-md"
            style={{ aspectRatio: '4/3', objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* BUDGET */}
      <section className="border-t bg-muted/30 py-16">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-3xl font-semibold tracking-tight">Budget snapshot (INR lakh)</h2>
          <Card className="mt-6 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-left">
                  <th className="px-4 py-3 font-semibold">Item</th>
                  <th className="px-4 py-3 font-semibold">Cost</th>
                  <th className="px-4 py-3 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {budget.map((b) => (
                  <tr key={b.item} className="border-b">
                    <td className="px-4 py-3">{b.item}</td>
                    <td className="px-4 py-3">₹{b.cost}L</td>
                    <td className="px-4 py-3 text-muted-foreground">{b.notes}</td>
                  </tr>
                ))}
                <tr className="border-b font-bold">
                  <td className="px-4 py-3">Total cash out</td>
                  <td className="px-4 py-3">₹40L</td>
                  <td className="px-4 py-3"></td>
                </tr>
                <tr className="border-b font-bold text-primary">
                  <td className="px-4 py-3">Revenue in</td>
                  <td className="px-4 py-3">₹80L</td>
                  <td className="px-4 py-3 font-normal text-muted-foreground">65 sponsorship, 8 merch, 7 ads</td>
                </tr>
                <tr className="font-bold text-primary">
                  <td className="px-4 py-3">Net surplus to cause</td>
                  <td className="px-4 py-3">₹40L+</td>
                  <td className="px-4 py-3"></td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-3xl px-5 py-16">
        <h2 className="text-3xl font-semibold tracking-tight">Timeline & milestones</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          As originally pitched, this needs re-dating before it's real.
        </p>
        <ol className="mt-6 space-y-4">
          {timeline.map((t) => (
            <li key={t.when} className="flex gap-4">
              <Badge variant="secondary" className="shrink-0">{t.when}</Badge>
              <span className="text-sm text-muted-foreground">{t.what}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/30 py-20 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-4xl font-semibold tracking-tight">The ask, for sponsors</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Select a package (title, co-presenting, segment, or in-kind),
            sign the deliverables schedule, and join the on-ground Ludhiana
            finale for the live cheque hand-over.
          </p>
          <Button asChild size="lg" className="mt-7">
            <a href="mailto:ribhav28@gmail.com?subject=28%20States%20-%20Sponsorship%20package">Talk to Ribhav</a>
          </Button>
        </div>
      </section>

      <Footer1
        logo={<span className="text-2xl">🧭</span>}
        brandName="Nukkad Network"
        backgroundImage="/images/real/footer-bg.jpg"
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
