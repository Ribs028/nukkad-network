import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const tabs = [
  { to: '/', label: 'Nukkad Network', end: true },
  { to: '/charity-run', label: '28 States · 28 Days' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--paper)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <NavLink to="/" className="text-2xl font-semibold text-[var(--ink)]" style={{ fontFamily: 'var(--display)' }}>
          Nukkad<span className="text-[var(--rust)]"> Network</span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                `rounded-sm px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[var(--ink)] text-[var(--paper)]'
                    : 'text-[var(--ink-soft)] hover:bg-[var(--paper-2)]'
                }`
              }
            >
              {t.label}
            </NavLink>
          ))}
        </nav>

        <a
          href="#waitlist"
          className="hidden rounded-sm bg-[var(--rust)] px-5 py-2 text-sm font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5 md:inline-block"
        >
          Join the network
        </a>

        <button
          className="md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-[var(--border)] px-5 py-3 md:hidden">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-semibold ${
                  isActive ? 'bg-[var(--ink)] text-[var(--paper)]' : 'text-[var(--ink-soft)]'
                }`
              }
            >
              {t.label}
            </NavLink>
          ))}
          <a
            href="#waitlist"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-lg bg-[var(--rust)] px-3 py-2 text-center text-sm font-bold text-white"
          >
            Join the network
          </a>
        </div>
      )}
    </header>
  );
}
