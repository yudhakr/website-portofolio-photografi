import { useState } from "react";
import { useContent } from "../../context/ContentContext";
import type { ServicesContent } from "../../data/content-types";
import ImageInput from "./ImageInput";
import { useSavedFlag } from "./useSavedFlag";
import "./admin.css";

export default function AdminServices() {
  const { content, setContent } = useContent();
  const [form, setForm] = useState<ServicesContent>(structuredClone(content.services));
  const { saved, flash } = useSavedFlag();

  const setItem = (i: number, key: string, val: string) =>
    setForm((f) => ({
      ...f,
      items: f.items.map((it, idx) => (idx === i ? { ...it, [key]: val } : it)),
    }));

  const setPkg = (i: number, patch: Partial<ServicesContent["packages"][number]>) =>
    setForm((f) => ({
      ...f,
      packages: f.packages.map((p, idx) => (idx === i ? { ...p, ...patch } : p)),
    }));

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setContent((c) => ({ ...c, services: form }));
    flash();
  };

  return (
    <>
      <div className="admin__head">
        <div>
          <h1 className="admin__title">Services</h1>
          <p className="admin__subtitle">Shoot types, pricing and packages.</p>
        </div>
        {saved && <span className="saved-flag">✓ Saved</span>}
      </div>

      <form onSubmit={save}>
        <div className="card">
          <div className="card__title">Hero image</div>
          <ImageInput label="Services hero" value={form.hero} onChange={(v) => setForm((f) => ({ ...f, hero: v }))} />
        </div>

        <div className="card">
          <div className="card__title">Service types</div>
          {form.items.map((it, i) => (
            <div className="rrow" key={i} style={{ gridTemplateColumns: "1fr" }}>
              <div className="rrow__head">
                <span className="rrow__num">Service {i + 1}</span>
                <button
                  type="button"
                  className="abtn abtn--sm abtn--danger"
                  onClick={() =>
                    setForm((f) => ({ ...f, items: f.items.filter((_, idx) => idx !== i) }))
                  }
                >
                  Remove
                </button>
              </div>
              <div className="field__row" style={{ gridTemplateColumns: "80px 1fr 1fr" }}>
                <div className="field" style={{ margin: 0 }}>
                  <label>No.</label>
                  <input value={it.n} onChange={(e) => setItem(i, "n", e.target.value)} />
                </div>
                <div className="field" style={{ margin: 0 }}>
                  <label>Title</label>
                  <input value={it.title} onChange={(e) => setItem(i, "title", e.target.value)} />
                </div>
                <div className="field" style={{ margin: 0 }}>
                  <label>Starting price</label>
                  <input value={it.from} onChange={(e) => setItem(i, "from", e.target.value)} />
                </div>
              </div>
              <div className="field" style={{ margin: "10px 0 0" }}>
                <label>Description</label>
                <textarea rows={2} value={it.desc} onChange={(e) => setItem(i, "desc", e.target.value)} />
              </div>
              <ImageInput label="Image" value={it.img} onChange={(v) => setItem(i, "img", v)} />
            </div>
          ))}
          <button
            type="button"
            className="abtn abtn--sm"
            onClick={() =>
              setForm((f) => ({
                ...f,
                items: [
                  ...f.items,
                  { n: String(f.items.length + 1).padStart(2, "0"), title: "", desc: "", from: "", img: "" },
                ],
              }))
            }
          >
            + Add service
          </button>
        </div>

        <div className="card">
          <div className="card__title">Packages</div>
          {form.packages.map((p, i) => (
            <div className="rrow" key={i} style={{ gridTemplateColumns: "1fr" }}>
              <div className="rrow__head">
                <span className="rrow__num">Package {i + 1}</span>
                <button
                  type="button"
                  className="abtn abtn--sm abtn--danger"
                  onClick={() =>
                    setForm((f) => ({ ...f, packages: f.packages.filter((_, idx) => idx !== i) }))
                  }
                >
                  Remove
                </button>
              </div>
              <div className="field__row--3 field__row">
                <div className="field" style={{ margin: 0 }}>
                  <label>Name</label>
                  <input value={p.name} onChange={(e) => setPkg(i, { name: e.target.value })} />
                </div>
                <div className="field" style={{ margin: 0 }}>
                  <label>Price</label>
                  <input value={p.price} onChange={(e) => setPkg(i, { price: e.target.value })} />
                </div>
                <div className="field" style={{ margin: 0 }}>
                  <label>For</label>
                  <input value={p.for} onChange={(e) => setPkg(i, { for: e.target.value })} />
                </div>
              </div>
              <div className="field" style={{ margin: "10px 0 0" }}>
                <label>Includes (one per line)</label>
                <textarea
                  rows={5}
                  value={p.includes.join("\n")}
                  onChange={(e) =>
                    setPkg(i, { includes: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })
                  }
                />
              </div>
              <div className="checkbox-row" style={{ marginTop: 12, marginBottom: 0 }}>
                <input
                  id={`feat-${i}`}
                  type="checkbox"
                  checked={p.featured}
                  onChange={(e) => setPkg(i, { featured: e.target.checked })}
                />
                <label htmlFor={`feat-${i}`}>Highlight as "Most booked"</label>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="abtn abtn--sm"
            onClick={() =>
              setForm((f) => ({
                ...f,
                packages: [...f.packages, { name: "", price: "", for: "", includes: [], featured: false }],
              }))
            }
          >
            + Add package
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
