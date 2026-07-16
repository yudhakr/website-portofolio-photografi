import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="page"
      style={{
        minHeight: "80vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
      }}
    >
      <div>
        <p className="eyebrow">404</p>
        <h1 className="display" style={{ fontSize: "clamp(2.5rem,8vw,6rem)", margin: "12px 0 20px" }}>
          Out of frame.
        </h1>
        <p style={{ color: "var(--text-dim)", marginBottom: 30 }}>
          This page doesn't exist — but the work does.
        </p>
        <Link to="/" className="btn">
          Back home
        </Link>
      </div>
    </div>
  );
}
