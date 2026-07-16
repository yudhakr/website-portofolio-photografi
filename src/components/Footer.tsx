import { Link } from "react-router-dom";
import { secondaryNav } from "../data/site";
import { useContent } from "../context/ContentContext";
import "./Footer.css";

export default function Footer() {
  const { content } = useContent();
  const site = content.site;
  const nav = content.categories.map((c) => ({
    label: c.name,
    to: `/gallery/${c.slug}`,
  }));
  return (
    <footer className="ftr">
      <div className="wrap ftr__inner">
        <div className="ftr__brand">
          <Link to="/" className="ftr__logo display">
            {site.name}
          </Link>
          <p className="ftr__tag">{site.tagline}</p>
        </div>

        <div className="ftr__cols">
          <div className="ftr__col">
            <span className="eyebrow">Work</span>
            {nav.map((n) => (
              <Link key={n.to} to={n.to}>
                {n.label}
              </Link>
            ))}
          </div>
          <div className="ftr__col">
            <span className="eyebrow">Studio</span>
            {secondaryNav.map((n) => (
              <Link key={n.to} to={n.to}>
                {n.label}
              </Link>
            ))}
          </div>
          <div className="ftr__col">
            <span className="eyebrow">Connect</span>
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
      </div>

      <div className="wrap ftr__base">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span>
          {site.location} · <Link to="/admin">Admin</Link>
        </span>
      </div>
    </footer>
  );
}
