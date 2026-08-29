import Hero1 from '@/components/ui/hero-1';
import { Footer1 } from '@/components/ui/footer-1';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

export default function CharityRun() {
  return (
    <div className="bg-background text-foreground">
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
        backgroundImage="/images/real/mumbai-vt-night.jpg"
      />

      <section className="mx-auto max-w-3xl px-5 pt-10">
        <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary">
          The original target launch, January 2026, has already passed. This
          page reflects the plan as pitched. A fresh timeline is needed
          before anything else.
        </div>
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
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent>
                <p className="text-lg font-semibold text-primary">Daily format</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>28 vlogs of 12 to 15 minutes, one per day, one per state.</li>
                  <li>A daily livestream: wheel spin, then a donation reveal.</li>
                  <li>56 or more Shorts, Reels, and TikToks alongside the main series.</li>
                  <li>A real-time donation ticker, via the GiveIndia API.</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
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
        </div>
      </section>

      {/* CAUSE PARTNER */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 className="text-3xl font-semibold tracking-tight">Cause partner: Cuddles Foundation</h2>
        <ul className="mt-6 space-y-3 text-muted-foreground">
          <li><b className="text-foreground">18,100 children</b> served across 42 hospitals in FY 2024.</li>
          <li>Nutrition programmes lift survival odds by <b className="text-foreground">20 to 30 percent</b>.</li>
          <li><b className="text-foreground">100 percent</b> of super-chat and merch profit flows through the GiveIndia API.</li>
        </ul>
      </section>

      {/* DASHA DOOM */}
      <section className="border-t bg-foreground py-16 text-background">
        <div className="mx-auto max-w-4xl px-5">
          <h2 className="text-3xl font-semibold tracking-tight text-background">"Dasha Doom," the penalty wheel</h2>
          <p className="mt-2 max-w-2xl text-background/70">
            A live wheel that unlocks a new forfeit at every ₹1 lakh raised,
            the entertainment mechanic tying donations directly to what
            happens on screen.
          </p>
          <ol className="mt-8 space-y-4">
            {wheel.map((w, i) => (
              <li key={w.name} className="flex gap-4">
                <span className="text-2xl font-light text-primary">{i + 1}</span>
                <div>
                  <p className="font-semibold text-background">{w.name}</p>
                  <p className="text-sm text-background/65">{w.text}</p>
                </div>
              </li>
            ))}
          </ol>
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
