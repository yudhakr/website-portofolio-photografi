import InquiryForm from "../components/InquiryForm";
import { useContent } from "../context/ContentContext";
import "./Contact.css";

export default function Contact() {
  const { content } = useContent();
  const site = content.site;
  return (
    <div className="page contact">
      <section className="wrap contact__top">
        <p className="eyebrow">Contact</p>
        <h1 className="display contact__title">Let's make something.</h1>
        <p className="contact__lede">
          Commissions, print enquiries, or just to say hello — I'd love to hear
          from you.
        </p>
      </section>

      <section className="wrap contact__body">
        <div className="contact__form">
          <InquiryForm />
        </div>

        <aside className="contact__info">
          <div className="contact__block">
            <span className="eyebrow">Email</span>
            <a href={`mailto:${site.email}`} className="contact__big">
              {site.email}
            </a>
          </div>
          <div className="contact__block">
            <span className="eyebrow">Phone</span>
            <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="contact__big">
              {site.phone}
            </a>
          </div>
          <div className="contact__block">
            <span className="eyebrow">Studio</span>
            <p className="contact__addr">{site.studio.address}</p>
          </div>
          <div className="contact__block">
            <span className="eyebrow">Response time</span>
            <p>{site.responseTime}</p>
          </div>
          <div className="contact__block">
            <span className="eyebrow">Follow</span>
            <div className="contact__socials">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-underline">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* Map */}
      <section className="contact__map">
        <iframe
          title="Studio location"
          src={site.studio.mapEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </div>
  );
}
