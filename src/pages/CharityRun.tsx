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
    <div>
      {/* HERO */}
      <section className="border-b border-[var(--edge)] py-20" style={{ background: 'var(--indigo)' }}>
        <div className="mx-auto max-w-3xl px-5 text-center text-[var(--paper)]">
          <span className="tag" style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
            India charity sprint for childhood-cancer nutrition
          </span>
          <h1 className="mt-5 text-5xl text-[var(--paper)] md:text-6xl">28 States, 28 Days</h1>
          <p className="mt-5 text-lg text-[var(--paper)]/75">
            A daily YouTube race through every Indian state in 28 consecutive
            days, raising money for the Cuddles Foundation. Inspired by Ryan
            Trahan's "50/50" format, run across Indian geography.
          </p>
          <div className="mt-6 inline-block rounded-sm border border-[var(--gold)]/50 bg-[var(--paper)]/5 px-4 py-2 text-sm text-[var(--gold)]">
            The original target launch, January 2026, has already passed.
            This page reflects the plan as pitched. A fresh timeline is
            needed before anything else.
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:ribhav28@gmail.com?subject=28%20States%20-%20Sponsorship%20interest"
              className="rounded-sm px-6 py-3 font-semibold text-[var(--ink)] shadow-md transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--gold)' }}
            >
              Sponsor this run
            </a>
            <a
              href="/docs/28-States-28-Days-plan.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-[var(--paper)]/40 px-6 py-3 font-semibold text-[var(--paper)] transition-transform hover:-translate-y-0.5"
            >
              Read the full plan (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* OBJECTIVES, editorial pull-quote */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <p className="text-2xl leading-relaxed text-[var(--ink-soft)] md:text-3xl">
          The target is <b style={{ color: 'var(--rust)' }}>₹50 lakh or more</b>, raised
          through 80-G and FCRA-compliant channels, against a{' '}
          <b style={{ color: 'var(--rust)' }}>28 million</b> cumulative view goal and a
          sponsor CPM target of <b style={{ color: 'var(--rust)' }}>₹110 or under</b>,
          against a category average near ₹180.
        </p>
        <p className="mt-4 text-sm text-[var(--ink-soft)]/70">
          All figures here are projections from the pitch deck. Nothing has
          launched yet.
        </p>
      </section>

      {/* CONCEPT */}
      <section className="border-t border-[var(--edge)] bg-[var(--paper-2)] py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl">The concept</h2>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <div>
              <p className="script text-xl" style={{ color: 'var(--rust)' }}>Daily format</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--ink-soft)]">
                <li>28 vlogs of 12 to 15 minutes, one per day, one per state.</li>
                <li>A daily livestream: wheel spin, then a donation reveal.</li>
                <li>56 or more Shorts, Reels, and TikToks alongside the main series.</li>
                <li>A real-time donation ticker, via the GiveIndia API.</li>
              </ul>
            </div>
            <div>
              <p className="script text-xl" style={{ color: 'var(--rust)' }}>Built-in Nukkad Network</p>
              <p className="mt-3 text-sm text-[var(--ink-soft)]">
                Every stop doubles as a Nukkad Network seeding trip: meeting
                and recruiting real local Buddies in each city, alongside
                Bussin' streetwear drops. See the{' '}
                <a href="/" className="font-semibold text-[var(--rust)] underline">
                  Nukkad Network
                </a>{' '}
                tab for what that platform actually is.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CAUSE PARTNER */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 className="text-3xl">Cause partner: Cuddles Foundation</h2>
        <ul className="mt-6 space-y-3 text-[var(--ink-soft)]">
          <li><b className="text-[var(--ink)]">18,100 children</b> served across 42 hospitals in FY 2024.</li>
          <li>Nutrition programmes lift survival odds by <b className="text-[var(--ink)]">20 to 30 percent</b>.</li>
          <li><b className="text-[var(--ink)]">100 percent</b> of super-chat and merch profit flows through the GiveIndia API.</li>
        </ul>
      </section>

      {/* DASHA DOOM */}
      <section className="border-t border-[var(--edge)] py-16 text-[var(--paper)]" style={{ background: 'var(--ink)' }}>
        <div className="mx-auto max-w-4xl px-5">
          <h2 className="text-3xl text-[var(--paper)]">"Dasha Doom," the penalty wheel</h2>
          <p className="mt-2 max-w-2xl text-[var(--paper)]/70">
            A live wheel that unlocks a new forfeit at every ₹1 lakh raised,
            the entertainment mechanic tying donations directly to what
            happens on screen.
          </p>
          <ol className="mt-8 space-y-4">
            {wheel.map((w, i) => (
              <li key={w.name} className="flex gap-4">
                <span className="text-2xl font-light" style={{ fontFamily: 'var(--display)', color: 'var(--gold)' }}>
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-[var(--paper)]">{w.name}</p>
                  <p className="text-sm text-[var(--paper)]/65">{w.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ROUTE */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 className="text-3xl">Route overview</h2>
        <p className="mt-3 text-[var(--ink-soft)]">
          Start and finish in Ludhiana, Punjab: a clockwise loop of roughly
          14,600 km, with the highest-risk Northeast states scheduled first
          and an island window (Andaman or Lakshadweep) if the budget
          allows.
        </p>
      </section>

      {/* BUDGET */}
      <section className="border-t border-[var(--edge)] bg-[var(--paper-2)] py-16">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-3xl">Budget snapshot (INR lakh)</h2>
          <table className="mt-6 w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-[var(--ink)] text-left">
                <th className="py-3 pr-4 font-semibold">Item</th>
                <th className="py-3 pr-4 font-semibold">Cost</th>
                <th className="py-3 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {budget.map((b) => (
                <tr key={b.item} className="border-b border-[var(--edge)]">
                  <td className="py-3 pr-4">{b.item}</td>
                  <td className="py-3 pr-4">₹{b.cost}L</td>
                  <td className="py-3 text-[var(--ink-soft)]">{b.notes}</td>
                </tr>
              ))}
              <tr className="border-b border-[var(--edge)] font-bold">
                <td className="py-3 pr-4">Total cash out</td>
                <td className="py-3 pr-4">₹40L</td>
                <td className="py-3"></td>
              </tr>
              <tr className="border-b border-[var(--edge)] font-bold" style={{ color: 'var(--indigo)' }}>
                <td className="py-3 pr-4">Revenue in</td>
                <td className="py-3 pr-4">₹80L</td>
                <td className="py-3 font-normal text-[var(--ink-soft)]">65 sponsorship, 8 merch, 7 ads</td>
              </tr>
              <tr className="font-bold" style={{ color: 'var(--rust)' }}>
                <td className="py-3 pr-4">Net surplus to cause</td>
                <td className="py-3 pr-4">₹40L+</td>
                <td className="py-3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-3xl px-5 py-16">
        <h2 className="text-3xl">Timeline & milestones</h2>
        <p className="mt-1 text-sm text-[var(--ink-soft)]">
          As originally pitched, this needs re-dating before it's real.
        </p>
        <ol className="mt-6 space-y-4">
          {timeline.map((t) => (
            <li key={t.when} className="flex gap-4">
              <span className="tag shrink-0">{t.when}</span>
              <span className="text-sm text-[var(--ink-soft)]">{t.what}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--edge)] py-20 text-center" style={{ background: 'var(--paper-2)' }}>
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-4xl">The ask, for sponsors</h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--ink-soft)]">
            Select a package (title, co-presenting, segment, or in-kind),
            sign the deliverables schedule, and join the on-ground Ludhiana
            finale for the live cheque hand-over.
          </p>
          <a
            href="mailto:ribhav28@gmail.com?subject=28%20States%20-%20Sponsorship%20package"
            className="mt-7 inline-block rounded-sm px-8 py-4 font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--rust)' }}
          >
            Talk to Ribhav
          </a>
        </div>
      </section>
    </div>
  );
}
