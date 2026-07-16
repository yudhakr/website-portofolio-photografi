import { useState } from "react";
import { useContent } from "../../context/ContentContext";
import type { SiteContent } from "../../data/content-types";
import { useSavedFlag } from "./useSavedFlag";
import "./admin.css";

export default function AdminSite() {
  const { content, setContent } = useContent();
  const [form, setForm] = useState<SiteContent>(structuredClone(content.site));
  const { saved, flash } = useSavedFlag();

  const set = <K extends keyof SiteContent>(key: K, val: SiteContent[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const setStudio = (key: keyof SiteContent["studio"], val: string) =>
    setForm((f) => ({ ...f, studio: { ...f.studio, [key]: val } }));

  const setSocial = (i: number, key: "label" | "href", val: string) =>
    setForm((f) => ({
      ...f,
      socials: f.socials.map((s, idx) => (idx === i ? { ...s, [key]: val } : s)),
    }));

  const addSocial = () =>
    setForm((f) => ({ ...f, socials: [...f.socials, { label: "", href: "" }] }));
  const removeSocial = (i: number) =>
    setForm((f) => ({ ...f, socials: f.socials.filter((_, idx) => idx !== i) }));

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setContent((c) => ({ ...c, site: form }));
    flash();
  };

  return (
    <>
      <div className="admin__head">
        <div>
          <h1 className="admin__title">Site &amp; Profile</h1>
          <p className="admin__subtitle">Your name, contact details and studio info.</p>
        </div>
        {saved && <span className="saved-flag">✓ Saved</span>}
      </div>

      <form onSubmit={save}>
        <div className="card">
          <div className="card__title">Identity</div>
          <div className="field__row">
            <div className="field">
              <label>Name</label>
              <input value={form.name} onChange={(e) => set("name", e.target.value)} />
            </div>
            <div className="field">
              <label>Role</label>
              <input value={form.role} onChange={(e) => set("role", e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label>Tagline</label>
            <input value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
          </div>
        </div>

        <div className="card">
          <div className="card__title">Contact</div>
          <div className="field__row">
            <div className="field">
              <label>Email</label>
              <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
            </div>
            <div className="field">
              <label>Phone</label>
              <input value={form.phone} onChange={(e) => set("phone", e.target.value)} />
            </div>
          </div>
          <div className="field__row">
            <div className="field">
              <label>Location</label>
              <input value={form.location} onChange={(e) => set("location", e.target.value)} />
            </div>
            <div className="field">
              <label>Response time</label>
              <input value={form.responseTime} onChange={(e) => set("responseTime", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card__title">Studio & map</div>
          <div className="field">
            <label>Studio address</label>
            <input value={form.studio.address} onChange={(e) => setStudio("address", e.target.value)} />
          </div>
          <div className="field">
            <label>Google Maps embed URL</label>
            <input value={form.studio.mapEmbed} onChange={(e) => setStudio("mapEmbed", e.target.value)} />
            <p className="hint">
              In Google Maps: Share → Embed a map → copy the <code>src</code> URL
              from the iframe.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card__title">Social links</div>
          {form.socials.map((s, i) => (
            <div className="rrow" key={i} style={{ gridTemplateColumns: "1fr" }}>
              <div className="rrow__head">
                <span className="rrow__num">Link {i + 1}</span>
                <button type="button" className="abtn abtn--sm abtn--danger" onClick={() => removeSocial(i)}>
                  Remove
                </button>
              </div>
              <div className="field__row">
                <div className="field" style={{ margin: 0 }}>
                  <label>Label</label>
                  <input value={s.label} onChange={(e) => setSocial(i, "label", e.target.value)} />
                </div>
                <div className="field" style={{ margin: 0 }}>
                  <label>URL</label>
                  <input value={s.href} onChange={(e) => setSocial(i, "href", e.target.value)} />
                </div>
              </div>
            </div>
          ))}
          <button type="button" className="abtn abtn--sm" onClick={addSocial}>
            + Add social link
          </button>
        </div>

        <div className="admin__actions">
          <button type="submit" className="abtn abtn--solid">
            Save changes
          </button>
          {saved && <span className="saved-flag">✓ Saved</span>}
        </div>
      </form>
    </>
  );
}
