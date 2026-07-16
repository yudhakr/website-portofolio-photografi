import { useState } from "react";
import "./InquiryForm.css";

const shootTypes = [
  "Portrait session",
  "Editorial / Fashion",
  "Commercial / Brand",
  "Product",
  "Event",
  "Print purchase",
  "Other",
];

interface Props {
  compact?: boolean;
}

export default function InquiryForm({ compact = false }: Props) {
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In production, POST to your endpoint / form service here.
    setSent(true);
  };

  if (sent) {
    return (
      <div className="inq inq--done">
        <h3 className="display">Thank you.</h3>
        <p>
          Your inquiry is on its way. I read every message personally and will
          reply within 48 hours.
        </p>
        <button className="btn" onClick={() => setSent(false)}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className={`inq${compact ? " inq--compact" : ""}`} onSubmit={submit}>
      <div className="inq__row">
        <label className="inq__field">
          <span>Name</span>
          <input type="text" name="name" required autoComplete="name" placeholder="Your name" />
        </label>
        <label className="inq__field">
          <span>Email</span>
          <input type="email" name="email" required autoComplete="email" placeholder="you@email.com" />
        </label>
      </div>

      <div className="inq__row">
        <label className="inq__field">
          <span>Type of shoot</span>
          <select name="type" required defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {shootTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="inq__field">
          <span>Preferred date</span>
          <input type="date" name="date" />
        </label>
      </div>

      <label className="inq__field">
        <span>Message</span>
        <textarea
          name="message"
          rows={compact ? 3 : 5}
          required
          placeholder="Tell me about the project — mood, scope, timeline, budget range."
        />
      </label>

      <div className="inq__actions">
        <button type="submit" className="btn btn--solid">
          Send inquiry
        </button>
        <span className="inq__note">Response within 48 hours</span>
      </div>
    </form>
  );
}
