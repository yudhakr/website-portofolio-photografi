import { Link } from "react-router-dom";
import { useContent } from "../../context/ContentContext";
import "./admin.css";

export default function Dashboard() {
  const { content } = useContent();

  const byCat = content.categories.map((c) => ({
    name: c.name,
    slug: c.slug,
    count: content.photos.filter((p) => p.category === c.slug).length,
  }));

  return (
    <>
      <div className="admin__head">
        <div>
          <h1 className="admin__title">Welcome back</h1>
          <p className="admin__subtitle">
            Edit your portfolio — changes save instantly and appear on the live
            site.
          </p>
        </div>
        <a href="/" target="_blank" rel="noreferrer" className="abtn">
          View site ↗
        </a>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat__num">{content.photos.length}</div>
          <div className="stat__label">Photos</div>
        </div>
        <div className="stat">
          <div className="stat__num">{content.categories.length}</div>
          <div className="stat__label">Categories</div>
        </div>
        <div className="stat">
          <div className="stat__num">{content.services.packages.length}</div>
          <div className="stat__label">Packages</div>
        </div>
        <div className="stat">
          <div className="stat__num">
            {content.photos.filter((p) => p.forSale).length}
          </div>
          <div className="stat__label">For sale</div>
        </div>
      </div>

      <div className="card">
        <div className="card__title">Photos by category</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {byCat.map((c) => (
            <Link
              key={c.slug}
              to="/admin/photos"
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 4px",
                borderBottom: "1px solid var(--line)",
                color: "var(--text-dim)",
              }}
            >
              <span>{c.name}</span>
              <span>{c.count} frames</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card__title">Quick actions</div>
        <div className="admin__actions">
          <Link to="/admin/photos" className="abtn abtn--solid">
            + Add photo
          </Link>
          <Link to="/admin/site" className="abtn">
            Edit profile
          </Link>
          <Link to="/admin/about" className="abtn">
            Edit About
          </Link>
          <Link to="/admin/services" className="abtn">
            Edit Services
          </Link>
          <Link to="/admin/settings" className="abtn">
            Backup & settings
          </Link>
        </div>
      </div>
    </>
  );
}
