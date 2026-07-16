import { useState } from "react";
import { useContent } from "../../context/ContentContext";
import type { AboutContent } from "../../data/content-types";
import ImageInput from "./ImageInput";
import { useSavedFlag } from "./useSavedFlag";
import "./admin.css";

export default function AdminAbout() {
  const { content, setContent } = useContent();
  const [form, setForm] = useState<AboutContent>(structuredClone(content.about));
  const { saved, flash } = useSavedFlag();

  const set = <K extends keyof AboutContent>(key: K, val: AboutContent[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setContent((c) => ({ ...c, about: form }));
    flash();
  };

  return (
    <>
      <div className="admin__head">
        <div>
          <h1 className="admin__title">About Page</h1>
          <p className="admin__subtitle">Your story, clients, awards and gear.</p>
        </div>
        {saved && <span className="saved-flag">✓ Saved</span>}
      </div>

      <form onSubmit={save}>
        <div className="card">
          <div className="card__title">Intro</div>
          <ImageInput label="Portrait photo" value={form.portrait} onChange={(v) => set("portrait", v)} />
          <div className="field">
            <label>Headline</label>
            <textarea value={form.title} onChange={(e) => set("title", e.target.value)} rows={2} />
          </div>
          <div className="field">
            <label>Subtitle</label>
            <textarea value={form.sub} onChange={(e) => set("sub", e.target.value)} rows={2} />
          </div>
        </div>

        <div className="card">
          <div className="card__title">Bio story (one paragraph per box)</div>
          {form.storyParagraphs.map((para, i) => (
            <div className="rrow" key={i} style={{ gridTemplateColumns: "1fr" }}>
              <div className="rrow__head">
                <span className="rrow__num">Paragraph {i + 1}</span>
                <button
                  type="button"
                  className="abtn abtn--sm abtn--danger"
                  onClick={() =>
                    set("storyParagraphs", form.storyParagraphs.filter((_, idx) => idx !== i))
                  }
                >
                  Remove
                </button>
              </div>
              <textarea
                rows={4}
                value={para}
                onChange={(e) =>
                  set(
                    "storyParagraphs",
                    form.storyParagraphs.map((p, idx) => (idx === i ? e.target.value : p))
                  )
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="abtn abtn--sm"
            onClick={() => set("storyParagraphs", [...form.storyParagraphs, ""])}
          >
            + Add paragraph
          </button>
        </div>

        <div className="card">
          <div className="card__title">Pull-quote</div>
          <div className="field">
            <textarea value={form.quote} onChange={(e) => set("quote", e.target.value)} rows={2} />
          </div>
        </div>

        <div className="card">
          <div className="card__title">Clients / press (comma separated)</div>
          <div className="field">
            <textarea
              rows={2}
              value={form.clients.join(", ")}
              onChange={(e) =>
                set(
                  "clients",
                  e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                )
              }
            />
          </div>
        </div>

        <div className="card">
          <div className="card__title">Awards & publications</div>
          {form.awards.map((a, i) => (
            <div className="rrow" key={i} style={{ gridTemplateColumns: "1fr" }}>
              <div className="rrow__head">
                <span className="rrow__num">Entry {i + 1}</span>
                <button
                  type="button"
                  className="abtn abtn--sm abtn--danger"
                  onClick={() => set("awards", form.awards.filter((_, idx) => idx !== i))}
                >
                  Remove
                </button>
              </div>
              <div className="field__row" style={{ gridTemplateColumns: "100px 1fr" }}>
                <div className="field" style={{ margin: 0 }}>
                  <label>Year</label>
                  <input
                    value={a.year}
                    onChange={(e) =>
                      set("awards", form.awards.map((x, idx) => (idx === i ? { ...x, year: e.target.value } : x)))
                    }
                  />
                </div>
                <div className="field" style={{ margin: 0 }}>
                  <label>Description</label>
                  <input
                    value={a.text}
                    onChange={(e) =>
                      set("awards", form.awards.map((x, idx) => (idx === i ? { ...x, text: e.target.value } : x)))
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="abtn abtn--sm"
            onClick={() => set("awards", [...form.awards, { year: "", text: "" }])}
          >
            + Add award
          </button>
        </div>

        <div className="card">
          <div className="card__title">Equipment (items comma separated)</div>
          {form.gear.map((g, i) => (
            <div className="rrow" key={i} style={{ gridTemplateColumns: "1fr" }}>
              <div className="rrow__head">
                <span className="rrow__num">Group {i + 1}</span>
                <button
                  type="button"
                  className="abtn abtn--sm abtn--danger"
                  onClick={() => set("gear", form.gear.filter((_, idx) => idx !== i))}
                >
                  Remove
                </button>
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label>Group name</label>
                <input
                  value={g.group}
                  onChange={(e) =>
                    set("gear", form.gear.map((x, idx) => (idx === i ? { ...x, group: e.target.value } : x)))
                  }
                />
              </div>
              <div className="field" style={{ margin: "10px 0 0" }}>
                <label>Items</label>
                <input
                  value={g.items.join(", ")}
                  onChange={(e) =>
                    set(
                      "gear",
                      form.gear.map((x, idx) =>
                        idx === i
                          ? { ...x, items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }
                          : x
                      )
                    )
                  }
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="abtn abtn--sm"
            onClick={() => set("gear", [...form.gear, { group: "", items: [] }])}
          >
            + Add gear group
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
