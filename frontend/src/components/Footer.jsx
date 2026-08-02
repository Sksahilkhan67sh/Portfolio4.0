import { Link } from "react-router-dom";
import { FiCoffee, FiArrowUp, FiHeart, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { personal } from "../data/portfolio";

const NAV_LINKS = [
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/education", label: "Education" },
  { to: "/contact", label: "Contact" },
];

const SOCIALS = [
  { href: personal.linkedinUrl, label: "LinkedIn", icon: FiLinkedin },
  { href: personal.githubUrl, label: "GitHub", icon: FiGithub },
  { href: personal.leetcodeUrl, label: "LeetCode", icon: SiLeetcode },
  { href: `mailto:${personal.email}`, label: "Email", icon: FiMail },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper-dark notebook-lines">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 grid gap-10 sm:grid-cols-3">
        {/* Brand */}
        <div>
          <Link
            to="/"
            className="font-hand text-2xl text-paper-light tracking-wide"
          >
            {personal.name}.
          </Link>
          <p className="mt-3 font-serif text-sm text-paper-dark/80 max-w-xs leading-relaxed">
            {personal.title}
          </p>
          <div className="flex items-center gap-4 mt-5 text-xl">
            {SOCIALS.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="text-paper-dark hover:text-rust-light transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <p className="font-type text-xs tracking-widest uppercase text-rust mb-4">
            Quick Links
          </p>
          <ul className="flex flex-col gap-2 font-type text-xs tracking-widest uppercase">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-paper-dark hover:text-rust-light transition-colors"
                >
                  / {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact snippet */}
        <div>
          <p className="font-type text-xs tracking-widest uppercase text-rust mb-4">
            Get In Touch
          </p>
          <ul className="flex flex-col gap-2 font-type text-xs tracking-wide">
            <li>
              <a
                href={`mailto:${personal.email}`}
                className="text-paper-dark hover:text-rust-light transition-colors break-all"
              >
                {personal.email}
              </a>
            </li>
            <li className="text-paper-dark/80">{personal.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper-dark/15">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 font-type text-xs tracking-wide">
          <p>
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            Built with <FiHeart className="text-rust" /> and lots of{" "}
            <FiCoffee className="text-paper-dark" />
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1 hover:text-rust-light transition-colors"
          >
            Back to top <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}
