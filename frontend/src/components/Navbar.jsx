import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { personal } from "../data/portfolio";

const LINKS = [
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/education", label: "Education" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-ink text-paper-light transition-shadow ${
        scrolled ? "shadow-paperLg" : ""
      }`}
    >
      <div className="border-b-2 border-rust/40" />
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 md:px-8 py-3">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="font-hand text-2xl md:text-3xl text-paper-light tracking-wide"
        >
          {personal.name}.
        </Link>

        <ul className="hidden md:flex items-center gap-1 font-type text-[11px] tracking-widest uppercase">
          {LINKS.map((l) => (
            <li key={l.to} className="relative">
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `px-3 py-2 relative group block transition-colors ${
                    isActive
                      ? "text-rust-light"
                      : "text-paper-dark hover:text-rust-light"
                  }`
                }
              >
                / {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-type text-[11px] tracking-widest uppercase bg-paper-light text-ink px-4 py-2 border border-ink/20 shadow-paper hover:bg-rust hover:text-paper-light transition-colors"
          >
            Download CV ↓
          </a>
        </div>

        <button
          aria-label="Toggle navigation"
          className="md:hidden text-paper-light text-2xl font-type"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "×" : "≡"}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-ink-soft border-t border-rust/30 px-5 py-4 flex flex-col gap-3 font-type text-xs tracking-widest uppercase">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-left transition-colors ${
                  isActive ? "text-rust-light" : "text-paper-dark hover:text-rust-light"
                }`
              }
            >
              / {l.label}
            </NavLink>
          ))}
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-center bg-paper-light text-ink px-4 py-2 border border-ink/20"
          >
            Download CV ↓
          </a>
        </div>
      )}
    </header>
  );
}
