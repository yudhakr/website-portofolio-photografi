import { Link } from "react-router-dom";
import { buildSrcSet, resolveImage, sizedSrc } from "../utils/image";
import { useReveal } from "../utils/hooks";
import InquiryForm from "../components/InquiryForm";
import { useContent } from "../context/ContentContext";
import "./Services.css";

export default function Services() {
  const { content } = useContent();
  const { hero: heroImg, items: services, packages } = content.services;
  const listRef = useReveal<HTMLDivElement>();
  const pkgRef = useReveal<HTMLDivElement>();
  const bookRef = useReveal<HTMLDivElement>();

  return (
    <div className="page services">
      {/* Hero */}
      <section className="svc-hero">
        <img
          className="svc-hero__img"
          src={sizedSrc(heroImg, 2000)}
          srcSet={buildSrcSet(heroImg)}
          sizes="100vw"
          alt="Behind the scenes on a commercial shoot"
          loading="eager"
        />
        <div className="svc-hero__scrim" />
        <div className="svc-hero__content wrap">
          <p className="eyebrow">Services</p>
          <h1 className="display svc-hero__title">
            Commissions, considered.
          </h1>
          <p className="svc-hero__sub">
            A small number of projects each month, given full attention.
          </p>
        </div>
      </section>

      {/* Service list */}
      <section className="wrap section svc-list reveal" ref={listRef}>
        {services.map((s) => (
          <article key={s.n} className="svc-item">
            <div className="svc-item__img">
              <img
                src={resolveImage(s.img, 900)}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="svc-item__body">
              <span className="svc-item__n">{s.n}</span>
              <h3 className="display svc-item__title">{s.title}</h3>
              <p className="svc-item__desc">{s.desc}</p>
              <span className="svc-item__from">
                Starting at <strong>{s.from}</strong>
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* Packages */}
      <section className="wrap section svc-packages reveal" ref={pkgRef}>
        <div className="svc-packages__head">
          <span className="eyebrow">Sample packages</span>
          <h2 className="display">Where most projects begin.</h2>
        </div>
        <div className="svc-packages__grid">
          {packages.map((p) => (
            <div
              key={p.name}
              className={`pkg${p.featured ? " pkg--featured" : ""}`}
            >
              {p.featured && <span className="pkg__badge">Most booked</span>}
              <h3 className="display pkg__name">{p.name}</h3>
              <span className="pkg__for">{p.for}</span>
              <div className="pkg__price display">{p.price}</div>
              <ul className="pkg__list">
                {p.includes.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <Link to="/contact" className={`btn${p.featured ? " btn--solid" : ""} pkg__cta`}>
                Inquire
              </Link>
            </div>
          ))}
        </div>
        <p className="svc-packages__note">
          Every project is different. These are starting points — reach out and
          we'll shape something to fit.
        </p>
      </section>

      {/* Booking / inquiry */}
      <section className="wrap section svc-book reveal" ref={bookRef}>
        <div className="svc-book__intro">
          <span className="eyebrow">Booking</span>
          <h2 className="display svc-book__title">
            Check availability & start a project.
          </h2>
          <p>
            Tell me what you have in mind. I'll follow up within 48 hours with
            availability, a tailored quote, and next steps.
          </p>
        </div>
        <div className="svc-book__form">
          <InquiryForm />
        </div>
      </section>
    </div>
  );
}
