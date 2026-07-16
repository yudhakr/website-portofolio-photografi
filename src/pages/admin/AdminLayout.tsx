import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useContent } from "../../context/ContentContext";
import "./admin.css";

const links = [
  { to: "/admin", end: true, label: "Dashboard", icon: "grid" },
  { to: "/admin/photos", label: "Photos", icon: "image" },
  { to: "/admin/site", label: "Site & Profile", icon: "user" },
  { to: "/admin/about", label: "About Page", icon: "book" },
  { to: "/admin/services", label: "Services", icon: "tag" },
  { to: "/admin/settings", label: "Settings", icon: "cog" },
];

function Icon({ name }: { name: string }) {
  const common = { width: 17, height: 17, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4 } as const;
  switch (name) {
    case "grid":
      return <svg {...common}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>;
    case "image":
      return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="M21 15l-5-5L5 21" /></svg>;
    case "user":
      return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>;
    case "book":
      return <svg {...common}><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 19V5" /></svg>;
    case "tag":
      return <svg {...common}><path d="M20 12l-8 8-8-8V4h8z" /><circle cx="8" cy="8" r="1.4" /></svg>;
    case "cog":
      return <svg {...common}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></svg>;
    default:
      return null;
  }
}

export default function AdminLayout() {
  const { logout, username } = useAuth();
  const { content } = useContent();
  const navigate = useNavigate();

  const doLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="admin">
      <aside className="admin__side">
        <div className="admin__brand">
          {content.site.name}
          <small>Admin Studio</small>
        </div>

        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              "admin__navlink" + (isActive ? " is-active" : "")
            }
          >
            <Icon name={l.icon} />
            {l.label}
          </NavLink>
        ))}

        <div className="admin__side-foot">
          <a href="/" target="_blank" rel="noreferrer">
            View site ↗
          </a>
          <button onClick={doLogout}>Sign out ({username})</button>
        </div>
      </aside>

      <main className="admin__main">
        <Outlet />
      </main>
    </div>
  );
}
