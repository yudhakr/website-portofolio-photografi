import { resolveImage } from "../../utils/image";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}

/**
 * Image field: accepts a URL / Unsplash id, or an uploaded file (stored as a
 * data URL in localStorage). Keep uploads small — localStorage has ~5MB limit.
 */
export default function ImageInput({ label, value, onChange, hint }: Props) {
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1_500_000) {
      alert(
        "That image is larger than ~1.5MB. Browser storage is limited — please use a smaller file or paste an image URL instead."
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <div className="field">
      <label>{label}</label>
      <div className="imgpick">
        {value ? (
          <img className="imgpick__preview" src={resolveImage(value, 200)} alt="" />
        ) : (
          <span className="imgpick__preview" />
        )}
        <div className="imgpick__body">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Image URL or Unsplash id (e.g. photo-1544005313-...)"
          />
          <div style={{ marginTop: 8 }}>
            <input type="file" accept="image/*" onChange={onFile} />
          </div>
          <p className="hint">
            {hint ||
              "Paste an image URL, an Unsplash photo id, or upload a small file (< 1.5MB)."}
          </p>
        </div>
      </div>
    </div>
  );
}
