import { useRef, useState } from "react";
import { useContent } from "../../context/ContentContext";
import { useAuth } from "../../context/AuthContext";
import type { Content } from "../../data/content-types";
import "./admin.css";

export default function AdminSettings() {
  const { content, setContent, reset } = useContent();
  const { changeCredentials } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);

  // Credentials form
  const [cur, setCur] = useState("");
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  const [credMsg, setCredMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const changeCreds = (e: React.FormEvent) => {
    e.preventDefault();
    const res = changeCredentials(cur, user, pw);
    if (res.ok) {
      setCredMsg({ ok: true, text: "Credentials updated." });
      setCur("");
      setUser("");
      setPw("");
    } else {
      setCredMsg({ ok: false, text: res.error || "Could not update." });
    }
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-content-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as Content;
        if (!parsed.photos || !parsed.site) throw new Error("Invalid file");
        setContent(parsed);
        alert("Content imported successfully.");
      } catch {
        alert("That file doesn't look like a valid content backup.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const doReset = () => {
    if (
      confirm(
        "Reset ALL content back to the original demo? Your edits will be lost. (Consider exporting a backup first.)"
      )
    ) {
      reset();
      alert("Content reset to defaults.");
    }
  };

  return (
    <>
      <div className="admin__head">
        <div>
          <h1 className="admin__title">Settings</h1>
          <p className="admin__subtitle">Backups, credentials and reset.</p>
        </div>
      </div>

      <div className="card">
        <div className="card__title">Backup & restore</div>
        <p style={{ color: "var(--text-dim)", marginBottom: 18, fontSize: "0.92rem" }}>
          Your content is stored in this browser. Export a JSON backup regularly,
          and import it to move content to another browser or restore after
          clearing data.
        </p>
        <div className="admin__actions">
          <button className="abtn abtn--solid" onClick={exportJson}>
            ⭳ Export backup (.json)
          </button>
          <button className="abtn" onClick={() => fileRef.current?.click()}>
            ⭱ Import backup
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            hidden
            onChange={importJson}
          />
        </div>
      </div>

      <div className="card">
        <div className="card__title">Change credentials</div>
        {credMsg && (
          <div
            className="login__error"
            style={
              credMsg.ok
                ? { background: "rgba(80,180,120,0.12)", borderColor: "rgba(80,180,120,0.4)", color: "#7ec98f" }
                : undefined
            }
          >
            {credMsg.text}
          </div>
        )}
        <form onSubmit={changeCreds}>
          <div className="field" style={{ maxWidth: 360 }}>
            <label>Current password</label>
            <input type="password" value={cur} onChange={(e) => setCur(e.target.value)} required />
          </div>
          <div className="field__row" style={{ maxWidth: 520 }}>
            <div className="field">
              <label>New username</label>
              <input value={user} onChange={(e) => setUser(e.target.value)} required />
            </div>
            <div className="field">
              <label>New password</label>
              <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} required />
            </div>
          </div>
          <button type="submit" className="abtn abtn--solid">
            Update credentials
          </button>
        </form>
      </div>

      <div className="card">
        <div className="card__title">Danger zone</div>
        <p style={{ color: "var(--text-dim)", marginBottom: 16, fontSize: "0.92rem" }}>
          Restore everything to the original demo content.
        </p>
        <button className="abtn abtn--danger" onClick={doReset}>
          Reset all content
        </button>
      </div>

      <div className="card">
        <div className="card__title">Note on security</div>
        <p style={{ color: "var(--text-faint)", fontSize: "0.86rem", lineHeight: 1.6 }}>
          This admin runs entirely in the browser (no server), so login only
          hides the editing UI — it is not real server-side protection. It's
          ideal for a personal/demo site. For multi-device access or genuine
          security, connect a backend or a service like Supabase/Firebase.
        </p>
      </div>
    </>
  );
}
