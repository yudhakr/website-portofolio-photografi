import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { secondaryNav } from "../data/site";
import { useBodyLock } from "../utils/hooks";
import { useContent } from "../context/ContentContext";
import ThemeToggle from "./ThemeToggle";
import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { content } = useContent();
  const site = content.site;
  const nav = content.categories.map((c) => ({
    label: c.name,
    to: `/gallery/${c.slug}`,
  }));

  useBodyLock(open);

  // Transparent over homepage hero, solid once scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change.
  useEffect(() => setOpen(false), [location.pathname]);

  const isHome = location.pathname === "/";

  return (
    <header
      className={`hdr${scrolled || !isHome ? " hdr--solid" : ""}${
        open ? " hdr--open" : ""
      }`}
    >
      <div className="hdr__bar">
        <Link to="/" className="hdr__logo display" aria-label={`${site.name} — home`}>
          {site.name}
          <span className="hdr__role">{site.role}</span>
        </Link>

        <nav className="hdr__nav" aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                "hdr__link" + (isActive ? " is-active" : "")
              }
            >
              {item.label}
            </NavLink>
          ))}
          <span className="hdr__sep" aria-hidden="true" />
          {secondaryNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                "hdr__link hdr__link--sec" + (isActive ? " is-active" : "")
              }
            >
              {item.label}
            </NavLink>
          ))}
          <ThemeToggle />
        </nav>

        <button
          className="hdr__burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {/* Mobile overlay */}
      <div className="hdr__overlay" role="dialog" aria-modal="true" aria-hidden={!open}>
        <nav className="hdr__mnav" aria-label="Mobile">
          {nav.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="hdr__mlink display"
              style={{ transitionDelay: `${0.06 * i + 0.1}s` }}
            >
              {item.label}
            </NavLink>
          ))}
          <span className="hdr__mdiv" />
          {secondaryNav.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="hdr__mlink hdr__mlink--sec"
              style={{ transitionDelay: `${0.06 * (i + nav.length) + 0.1}s` }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hdr__mfoot">
          <a href={`mailto:${site.email}`} className="link-underline">
            {site.email}
          </a>
          <div className="hdr__msocial">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
