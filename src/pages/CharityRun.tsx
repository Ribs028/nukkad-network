import { CountUp } from '@/components/lightswind/count-up';
import { WorldMap } from '@/components/lightswind/world-map';

const wheel = [
  { name: 'Gaadi-Free Gaadi', text: '100 km by non-AC state bus' },
  { name: '₹100 Budget Day', text: 'Food + transport ≤ ₹100' },
  { name: 'No-English Day', text: 'Each English word = ₹1k host donation' },
  { name: 'Masala Marathon', text: '5 km sunrise run in local attire' },
  { name: 'Band Baja Bonus', text: 'Busk until ₹500 raised for charity' },
];

const budget = [
  { item: 'Travel', cost: 18, notes: 'Flights, trains, fuel' },
  { item: 'Crew & Stipends', cost: 10, notes: '4-person core + remote editor' },
  { item: 'Permits & Insurance', cost: 2, notes: 'ILP, RAP, liability cover' },
  { item: 'Contingency & Post', cost: 10, notes: 'Editing, unforeseen' },
];

const timeline = [
  { when: 'T-60 d', what: 'MoUs (Cuddles, GiveIndia) · sponsor deck signed' },
  { when: 'T-45 d', what: 'Route locked · flights & stays booked' },
  { when: 'T-30 d', what: 'Crew onboard · Nukkad buddies shortlisted' },
  { when: 'T-7 d', what: 'Trailer & press blitz' },
  { when: 'Day 1–28', what: 'Shoot ► edit ► publish, daily' },
  { when: '+14 d', what: 'Impact documentary & sponsor ROI report' },
];

const routeMarkers = [
  { lat: 30.901, lng: 75.8573, label: 'Ludhiana — Start & Finish', color: '#c1552e' },
  { lat: 26.1445, lng: 91.7362, label: 'Guwahati — NE leg', color: '#5b6b3f' },
  { lat: 11.6234, lng: 92.7265, label: 'Port Blair — island window', color: '#5b6b3f' },
];

export default function CharityRun() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center">
          <span className="tag">India Charity Sprint for Childhood-Cancer Nutrition</span>
          <h1 className="mt-4 text-5xl md:text-6xl">28 States • 28 Days</h1>
          <p className="mt-5 text-lg text-[var(--ink-soft)]">
            A daily YouTube race through every Indian state in 28 consecutive
            days — raising money for the Cuddles Foundation, inspired by Ryan
            Trahan's "50/50" format, run across Indian geography.
          </p>
          <div className="mt-6 inline-block rounded-lg border border-amber-400/60 bg-amber-50 px-4 py-2 text-sm text-amber-800">
            ⚠ The original target launch (Jan 2026) has passed — this page
            reflects the plan as pitched. A fresh timeline is needed before
            anything else.
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:ribhav28@gmail.com?subject=28%20States%20-%20Sponsorship%20interest"
              className="rounded-full bg-[var(--rust)] px-6 py-3 font-bold text-white shadow-md transition-transform hover:-translate-y-0.5"
            >
              Sponsor this run
            </a>
            <a
              href="mailto:ribhav28@gmail.com?subject=28%20States%20-%20Question"
              className="rounded-full border-2 border-[var(--ink)] px-6 py-3 font-bold transition-transform hover:-translate-y-0.5"
            >
              Ask a question
            </a>
          </div>
        </div>
      </section>

      {/* OBJECTIVES */}
      <section className="border-y border-[var(--border)] bg-[var(--ink)] py-10 text-[var(--paper)]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 text-center md:grid-cols-4">
          <Stat prefix="₹" value={50} suffix="L+" label="Donation goal (80-G & FCRA compliant)" />
          <Stat value={28} suffix="M" label="Cumulative views target" />
          <Stat value={10} suffix="k" label="Nukkad Network sign-ups target" />
          <Stat prefix="≤ ₹" value={110} label="Sponsor CPM target (cat. avg ~₹180)" />
        </div>
        <p className="mx-auto mt-4 max-w-6xl px-5 text-center text-xs text-white/50">
          All figures above are projections from the pitch deck — nothing has
          launched yet.
        </p>
      </section>

      {/* CONCEPT */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl">The concept</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="paper-card p-6">
            <p className="hand text-xl">Daily format</p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--ink-soft)]">
              <li>28 × 12–15 min vlogs, one per day, one per state</li>
              <li>Daily livestream: wheel spin + donation reveal</li>
              <li>56+ Shorts/Reels/TikToks alongside the main series</li>
              <li>Real-time donation ticker via the GiveIndia API</li>
            </ul>
          </div>
          <div className="paper-card p-6">
            <p className="hand text-xl">Built-in Nukkad Network</p>
            <p className="mt-3 text-sm text-[var(--ink-soft)]">
              Every stop doubles as a Nukkad Network seeding trip — meeting and
              recruiting real local Buddies in each city, plus Bussin'
              streetwear drops along the way. See the{' '}
              <a href="/" className="font-semibold text-[var(--rust)] underline">
                Nukkad Network
              </a>{' '}
              tab for what that platform actually is.
            </p>
          </div>
        </div>
      </section>

      {/* CAUSE PARTNER */}
      <section className="bg-[var(--paper-2)] py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl">Cause partner — Cuddles Foundation</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="paper-card p-6 text-center">
              <p className="hand text-3xl text-[var(--rust)]">18,100</p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">Children served in 42 hospitals (FY 2024)</p>
            </div>
            <div className="paper-card p-6 text-center">
              <p className="hand text-3xl text-[var(--rust)]">20–30%</p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">Survival-odds lift from nutrition programmes</p>
            </div>
            <div className="paper-card p-6 text-center">
              <p className="hand text-3xl text-[var(--rust)]">100%</p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">Of super-chat & merch profit flows via GiveIndia API</p>
            </div>
          </div>
        </div>
      </section>

      {/* DASHA DOOM */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl">"Dasha Doom" — the penalty wheel</h2>
        <p className="mt-2 max-w-2xl text-[var(--ink-soft)]">
          A live wheel that unlocks a new forfeit at every ₹1 lakh raised —
          the entertainment mechanic tying donations directly to what happens
          on screen.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {wheel.map((w) => (
            <div key={w.name} className="paper-card p-5">
              <p className="hand text-lg">{w.name}</p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ROUTE MAP */}
      <section className="bg-[var(--ink)] py-16 text-[var(--paper)]">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl text-[var(--paper)]">Route overview</h2>
          <p className="mt-2 max-w-xl text-white/60">
            Start & finish in Ludhiana, Punjab — clockwise loop, ~14,600 km,
            high-risk Northeast states first, with an island window (Andaman
            or Lakshadweep) if budget allows.
          </p>
          <div className="mt-8 overflow-hidden rounded-xl border border-white/10">
            <WorldMap markers={routeMarkers} dotColor="rgba(244,236,223,0.15)" markerColor="#c1552e" pulse />
          </div>
        </div>
      </section>

      {/* BUDGET */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 className="text-3xl">Budget snapshot (INR lakh)</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] text-sm">
            <thead>
              <tr className="bg-[var(--paper-2)] text-left">
                <th className="px-4 py-3">Item</th>
                <th className="px-4 py-3">Cost</th>
                <th className="px-4 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {budget.map((b) => (
                <tr key={b.item} className="border-t border-[var(--border)]">
                  <td className="px-4 py-3">{b.item}</td>
                  <td className="px-4 py-3">₹{b.cost}L</td>
                  <td className="px-4 py-3 text-[var(--ink-soft)]">{b.notes}</td>
                </tr>
              ))}
              <tr className="border-t border-[var(--border)] font-bold">
                <td className="px-4 py-3">Total cash out</td>
                <td className="px-4 py-3">₹40L</td>
                <td className="px-4 py-3"></td>
              </tr>
              <tr className="border-t border-[var(--border)] font-bold text-[var(--olive)]">
                <td className="px-4 py-3">Revenue in</td>
                <td className="px-4 py-3">₹80L</td>
                <td className="px-4 py-3 text-[var(--ink-soft)] font-normal">65 sponsorship, 8 merch, 7 ads</td>
              </tr>
              <tr className="border-t border-[var(--border)] font-bold text-[var(--rust)]">
                <td className="px-4 py-3">Net surplus to cause</td>
                <td className="px-4 py-3">₹40L+</td>
                <td className="px-4 py-3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-[var(--paper-2)] py-16">
        <div className="mx-auto max-w-4xl px-5">
          <h2 className="text-3xl">Timeline & milestones</h2>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">
            As originally pitched — needs re-dating before it's real.
          </p>
          <ol className="mt-6 space-y-4">
            {timeline.map((t) => (
              <li key={t.when} className="flex gap-4">
                <span className="tag shrink-0">{t.when}</span>
                <span className="text-sm text-[var(--ink-soft)]">{t.what}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-5 py-20 text-center">
        <h2 className="text-4xl">The ask, for sponsors</h2>
        <p className="mx-auto mt-4 max-w-xl text-[var(--ink-soft)]">
          Select a package (Title / Co-presenting / Segment / In-kind), sign
          the deliverables schedule, and join the on-ground Ludhiana finale
          for the live cheque hand-over.
        </p>
        <a
          href="mailto:ribhav28@gmail.com?subject=28%20States%20-%20Sponsorship%20package"
          className="mt-7 inline-block rounded-full bg-[var(--rust)] px-8 py-4 font-bold text-white shadow-md transition-transform hover:-translate-y-0.5"
        >
          Talk to Ribhav
        </a>
      </section>
    </div>
  );
}

function Stat({
  value,
  suffix,
  prefix,
  label,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}) {
  return (
    <div>
      <div className="hand text-4xl">
        <CountUp value={value} suffix={suffix} prefix={prefix} duration={1.6} />
      </div>
      <p className="mt-1 text-xs text-white/60">{label}</p>
    </div>
  );
}
