export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--paper-2)]">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-xl font-semibold" style={{ fontFamily: 'var(--display)' }}>Nukkad Network</p>
            <p className="mt-2 max-w-xs text-[var(--ink-soft)]">
              A friend at every street corner. Real people, real places, real
              connections: India's human travel layer.
            </p>
          </div>
          <div>
            <p className="font-bold uppercase tracking-wide text-xs text-[var(--ink-soft)]">
              Explore
            </p>
            <ul className="mt-2 space-y-1">
              <li><a href="/" className="hover:text-[var(--rust)]">Nukkad Network</a></li>
              <li><a href="/charity-run" className="hover:text-[var(--rust)]">28 States · 28 Days</a></li>
              <li><a href="#waitlist" className="hover:text-[var(--rust)]">Become a Buddy</a></li>
            </ul>
          </div>
          <div>
            <p className="font-bold uppercase tracking-wide text-xs text-[var(--ink-soft)]">
              Contact
            </p>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="mailto:ribhav28@gmail.com" className="hover:text-[var(--rust)]">
                  ribhav28@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/ribhavmodi0528/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--rust)]"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/RibsModi"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--rust)]"
                >
                  X / Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-xs text-[var(--ink-soft)]">
          Built by Ribhav Modi. Both Nukkad Network and 28 States, 28 Days are
          pre-launch concepts, so numbers on this site are targets, not results.
        </p>
      </div>
    </footer>
  );
}
