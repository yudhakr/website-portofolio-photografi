import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buildSrcSet, sizedSrc } from "../utils/image";
import MasonryGallery from "../components/MasonryGallery";
import { useReveal } from "../utils/hooks";
import { useContent } from "../context/ContentContext";
import "./Home.css";

export default function Home() {
  const { content, featured, featuredGrid } = useContent();
  const site = content.site;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const gridReveal = useReveal<HTMLDivElement>();
  const gridHeadReveal = useReveal<HTMLDivElement>();

  // Keep slide index valid if the featured list shrinks.
  const slideCount = Math.max(featured.length, 1);

  // Auto-advancing slideshow
  useEffect(() => {
    if (paused || slideCount <= 1) return;
    const t = setInterval(() => setI((v) => (v + 1) % slideCount), 5500);
    return () => clearInterval(t);
  }, [paused, slideCount]);

  useEffect(() => {
    if (i >= slideCount) setI(0);
  }, [i, slideCount]);

  const current = featured[i] ?? featured[0];

  return (
    <div className="home">
      {/* ---------- HERO SLIDESHOW ---------- */}
      <section
        className="hero"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
      >
        {featured.map((photo, idx) => (
          <div
            key={photo.id}
            className={`hero__slide${idx === i ? " is-active" : ""}`}
            aria-hidden={idx !== i}
          >
            <img
              className="hero__img"
              src={sizedSrc(photo.src, 2000)}
              srcSet={buildSrcSet(photo.src)}
              sizes="100vw"
              alt={photo.alt}
              loading={idx === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={idx === 0 ? "high" : "auto"}
            />
          </div>
        ))}

        <div className="hero__scrim" />

        <div className="hero__content">
          <p className="hero__eyebrow eyebrow">{site.role} — {site.location}</p>
          <h1 className="hero__name display">{site.name}</h1>
          <p className="hero__tag display">{site.tagline}</p>
          <div className="hero__cta">
            <Link to="/gallery/portrait" className="btn">
              Enter the work
            </Link>
          </div>
        </div>

        {/* current slide caption */}
        {current && (
          <div className="hero__meta">
            <span className="display">{current.title}</span>
            <span className="hero__meta-sub">
              {current.location} · {current.year}
            </span>
          </div>
        )}

        {/* nav dots */}
        <div className="hero__dots" role="tablist" aria-label="Slides">
          {featured.map((p, idx) => (
            <button
              key={p.id}
              className={`hero__dot${idx === i ? " is-active" : ""}`}
              onClick={() => setI(idx)}
              role="tab"
              aria-selected={idx === i}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span>Scroll</span>
          <span className="hero__scroll-line" />
        </div>
      </section>

      {/* ---------- SELECTED WORK (MASONRY) ---------- */}
      <section className="section wrap">
        <div className="home__gridhead reveal" ref={gridHeadReveal}>
          <div>
            <p className="eyebrow">Selected Work</p>
            <h2 className="display home__gridtitle">
              A quiet edit of recent frames.
            </h2>
          </div>
          <Link to="/gallery/portrait" className="link-underline">
            View all galleries
          </Link>
        </div>

        <div className="reveal" ref={gridReveal}>
          <MasonryGallery photos={featuredGrid} />
        </div>
      </section>

      {/* ---------- CATEGORY STRIP ---------- */}
      <CategoryStrip />
    </div>
  );
}

function CategoryStrip() {
  const ref = useReveal<HTMLDivElement>();
  const { content } = useContent();
  return (
    <section className="wrap section home__cats reveal" ref={ref}>
      {content.categories.map((cat) => (
        <Link key={cat.slug} to={`/gallery/${cat.slug}`} className="home__cat">
          <div className="home__cat-img">
            <img
              src={sizedSrc(cat.hero, 800)}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
          <span className="home__cat-label display">{cat.name}</span>
          <span className="home__cat-arrow">→</span>
        </Link>
      ))}
    </section>
  );
}
