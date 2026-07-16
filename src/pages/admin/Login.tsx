import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth, DEFAULT_CREDENTIALS } from "../../context/AuthContext";
import { useContent } from "../../context/ContentContext";
import { sizedSrc } from "../../utils/image";
import "./admin.css";

export default function Login() {
  const { login } = useAuth();
  const { content } = useContent();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate(from, { replace: true });
    } else {
      setError("Incorrect username or password.");
    }
  };

  const heroPhoto = content.photos[1]?.src ?? content.photos[0]?.src ?? "";

  return (
    <div className="login">
      <aside className="login__aside">
        {heroPhoto && <img src={sizedSrc(heroPhoto, 1400)} alt="" />}
        <div className="login__aside-txt">
          <h2>{content.site.name}</h2>
          <p>{content.site.tagline}</p>
        </div>
      </aside>

      <main className="login__main">
        <div className="login__card">
          <Link to="/" className="login__logo">
            {content.site.name}
          </Link>
          <h1 className="login__title">Admin sign in</h1>
          <p className="login__sub">Manage your portfolio content.</p>

          {error && <div className="login__error">{error}</div>}

          <form onSubmit={submit}>
            <div className="field">
              <label htmlFor="u">Username</label>
              <input
                id="u"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="field">
              <label htmlFor="p">Password</label>
              <input
                id="p"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="abtn abtn--solid" style={{ width: "100%", justifyContent: "center" }}>
              Sign in
            </button>
          </form>

          <p className="login__hint">
            Default login — username <code>{DEFAULT_CREDENTIALS.username}</code>,
            password <code>{DEFAULT_CREDENTIALS.password}</code>.
            <br />
            Change it under Admin → Settings after signing in.
          </p>

          <Link to="/" className="login__back">
            ← Back to site
          </Link>
        </div>
      </main>
    </div>
  );
}
