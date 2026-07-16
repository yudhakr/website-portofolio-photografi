import { useMemo, useState } from "react";
import { useContent } from "../../context/ContentContext";
import type { Photo, CategorySlug } from "../../data/types";
import { resolveImage } from "../../utils/image";
import ImageInput from "./ImageInput";
import "./admin.css";

function emptyPhoto(cat: CategorySlug, sub: string): Photo {
  return {
    id: "photo-" + Date.now().toString(36),
    src: "",
    alt: "",
    title: "Untitled",
    category: cat,
    subcategory: sub,
    ratio: 0.75,
    location: "",
    year: new Date().getFullYear(),
    exif: {
      camera: "",
      lens: "",
      focal: "",
      aperture: "",
      shutter: "",
      iso: "",
    },
    forSale: false,
    price: undefined,
  };
}

export default function AdminPhotos() {
  const { content, setContent } = useContent();
  const [filter, setFilter] = useState<string>("All");
  const [editing, setEditing] = useState<Photo | null>(null);
  const [isNew, setIsNew] = useState(false);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? content.photos
        : content.photos.filter((p) => p.category === filter),
    [content.photos, filter]
  );

  const openNew = () => {
    const cat = (content.categories[0]?.slug ?? "portrait") as CategorySlug;
    const sub = content.categories[0]?.subcategories[0] ?? "";
    setEditing(emptyPhoto(cat, sub));
    setIsNew(true);
  };

  const openEdit = (p: Photo) => {
    setEditing(structuredClone(p));
    setIsNew(false);
  };

  const remove = (id: string) => {
    if (!confirm("Delete this photo? This cannot be undone.")) return;
    setContent((c) => ({
      ...c,
      photos: c.photos.filter((p) => p.id !== id),
      home: {
        featuredIds: c.home.featuredIds.filter((x) => x !== id),
        gridIds: c.home.gridIds.filter((x) => x !== id),
      },
    }));
  };

  const save = (photo: Photo) => {
    setContent((c) => {
      const exists = c.photos.some((p) => p.id === photo.id);
      return {
        ...c,
        photos: exists
          ? c.photos.map((p) => (p.id === photo.id ? photo : p))
          : [photo, ...c.photos],
      };
    });
    setEditing(null);
  };

  return (
    <>
      <div className="admin__head">
        <div>
          <h1 className="admin__title">Photos</h1>
          <p className="admin__subtitle">{content.photos.length} photos in your library.</p>
        </div>
        <button className="abtn abtn--solid" onClick={openNew}>
          + Add photo
        </button>
      </div>

      <div className="pm__toolbar">
        <div className="pm__filters">
          {["All", ...content.categories.map((c) => c.slug)].map((f) => (
            <button
              key={f}
              className={`pm__filter${filter === f ? " is-active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "All"
                ? "All"
                : content.categories.find((c) => c.slug === f)?.name ?? f}
            </button>
          ))}
        </div>
      </div>

      <div className="pm__grid">
        {filtered.map((p) => (
          <div key={p.id} className="pm__card">
            <div className="pm__thumb">
              {p.src ? <img src={resolveImage(p.src, 400)} alt={p.alt} /> : null}
            </div>
            <div className="pm__body">
              <h4>{p.title}</h4>
              <span className="pm__tag">
                {p.category} · {p.subcategory}
                {p.forSale ? ` · $${p.price ?? "—"}` : ""}
              </span>
            </div>
            <div className="pm__cardactions">
              <button className="abtn abtn--sm" onClick={() => openEdit(p)}>
                Edit
              </button>
              <button
                className="abtn abtn--sm abtn--danger"
                onClick={() => remove(p.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p style={{ color: "var(--text-dim)" }}>No photos in this category yet.</p>
        )}
      </div>

      {editing && (
        <PhotoModal
          key={editing.id}
          initial={editing}
          isNew={isNew}
          categories={content.categories}
          onClose={() => setEditing(null)}
          onSave={save}
        />
      )}
    </>
  );
}

/* ---------- Modal ---------- */
interface ModalProps {
  initial: Photo;
  isNew: boolean;
  categories: { slug: string; name: string; subcategories: string[] }[];
  onClose: () => void;
  onSave: (p: Photo) => void;
}

function PhotoModal({ initial, isNew, categories, onClose, onSave }: ModalProps) {
  const [p, setP] = useState<Photo>(initial);
  const set = <K extends keyof Photo>(key: K, val: Photo[K]) =>
    setP((prev) => ({ ...prev, [key]: val }));
  const setExif = (key: keyof Photo["exif"], val: string) =>
    setP((prev) => ({ ...prev, exif: { ...prev.exif, [key]: val } }));

  const subs =
    categories.find((c) => c.slug === p.category)?.subcategories ?? [];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!p.src) {
      alert("Please add an image first.");
      return;
    }
    onSave({ ...p, alt: p.alt || p.title });
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__box" onClick={(e) => e.stopPropagation()}>
        <div className="modal__head">
          <h3>{isNew ? "Add photo" : "Edit photo"}</h3>
          <button className="abtn abtn--sm" onClick={onClose}>
            Close
          </button>
        </div>

        <form onSubmit={submit}>
          <ImageInput
            label="Image"
            value={p.src}
            onChange={(v) => set("src", v)}
          />

          <div className="field">
            <label>Title</label>
            <input value={p.title} onChange={(e) => set("title", e.target.value)} required />
          </div>

          <div className="field">
            <label>Alt text (accessibility)</label>
            <input
              value={p.alt}
              onChange={(e) => set("alt", e.target.value)}
              placeholder="Describe the image"
            />
          </div>

          <div className="field__row">
            <div className="field">
              <label>Category</label>
              <select
                value={p.category}
                onChange={(e) => {
                  const cat = e.target.value as CategorySlug;
                  const firstSub =
                    categories.find((c) => c.slug === cat)?.subcategories[0] ?? "";
                  setP((prev) => ({ ...prev, category: cat, subcategory: firstSub }));
                }}
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Subcategory</label>
              <select
                value={p.subcategory}
                onChange={(e) => set("subcategory", e.target.value)}
              >
                {subs.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field__row--3 field__row">
            <div className="field">
              <label>Location</label>
              <input
                value={p.location ?? ""}
                onChange={(e) => set("location", e.target.value)}
              />
            </div>
            <div className="field">
              <label>Year</label>
              <input
                type="number"
                value={p.year}
                onChange={(e) => set("year", Number(e.target.value))}
              />
            </div>
            <div className="field">
              <label>Aspect ratio (w/h)</label>
              <input
                type="number"
                step="0.01"
                value={p.ratio}
                onChange={(e) => set("ratio", Number(e.target.value) || 0.75)}
              />
            </div>
          </div>

          <div className="card__title" style={{ marginTop: 8 }}>
            Camera info (EXIF)
          </div>
          <div className="field__row--3 field__row">
            <div className="field">
              <label>Camera</label>
              <input value={p.exif.camera} onChange={(e) => setExif("camera", e.target.value)} />
            </div>
            <div className="field">
              <label>Lens</label>
              <input value={p.exif.lens} onChange={(e) => setExif("lens", e.target.value)} />
            </div>
            <div className="field">
              <label>Focal length</label>
              <input value={p.exif.focal} onChange={(e) => setExif("focal", e.target.value)} />
            </div>
          </div>
          <div className="field__row--3 field__row">
            <div className="field">
              <label>Aperture</label>
              <input value={p.exif.aperture} onChange={(e) => setExif("aperture", e.target.value)} />
            </div>
            <div className="field">
              <label>Shutter</label>
              <input value={p.exif.shutter} onChange={(e) => setExif("shutter", e.target.value)} />
            </div>
            <div className="field">
              <label>ISO</label>
              <input value={p.exif.iso} onChange={(e) => setExif("iso", e.target.value)} />
            </div>
          </div>

          <div className="checkbox-row">
            <input
              id="forsale"
              type="checkbox"
              checked={!!p.forSale}
              onChange={(e) => set("forSale", e.target.checked)}
            />
            <label htmlFor="forsale">This print is for sale</label>
          </div>
          {p.forSale && (
            <div className="field" style={{ maxWidth: 200 }}>
              <label>Price (USD)</label>
              <input
                type="number"
                value={p.price ?? ""}
                onChange={(e) =>
                  set("price", e.target.value ? Number(e.target.value) : undefined)
                }
              />
            </div>
          )}

          <div className="admin__actions">
            <button type="submit" className="abtn abtn--solid">
              {isNew ? "Add photo" : "Save changes"}
            </button>
            <button type="button" className="abtn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
