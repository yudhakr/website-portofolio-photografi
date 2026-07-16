import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { CategorySlug } from "../data/types";
import { buildSrcSet, sizedSrc } from "../utils/image";
import MasonryGallery from "../components/MasonryGallery";
import NotFound from "./NotFound";
import { useContent } from "../context/ContentContext";
import "./Gallery.css";

const PAGE = 6;

export default function Gallery() {
  const { slug } = useParams<{ slug: string }>();
  const { content, photosByCategory } = useContent();
  const category = content.categories.find((c) => c.slug === slug);

  const [filter, setFilter] = useState<string>("All");
  const [count, setCount] = useState(PAGE);

  const all = useMemo(
    () => (category ? photosByCategory(category.slug as CategorySlug) : []),
    [category, photosByCategory]
  );

  const filtered = useMemo(
    () => (filter === "All" ? all : all.filter((p) => p.subcategory === filter)),
    [all, filter]
  );

  const visible = filtered.slice(0, count);

  if (!category) return <NotFound />;

  return (
    <div className="page gallery">
      {/* Category hero */}
      <section className="gal-hero">
        <img
          className="gal-hero__img"
          src={sizedSrc(category.hero, 2000)}
          srcSet={buildSrcSet(category.hero)}
          sizes="100vw"
          alt={`${category.name} photography`}
          loading="eager"
          fetchPriority="high"
        />
        <div className="gal-hero__scrim" />
        <div className="gal-hero__content wrap">
          <nav className="gal-hero__crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>{category.name}</span>
          </nav>
          <h1 className="display gal-hero__title">{category.name}</h1>
          <p className="display gal-hero__tag">{category.tagline}</p>
        </div>
      </section>

      {/* Filters */}
      <div className="wrap gal-toolbar">
        <div className="gal-filters" role="tablist" aria-label="Subcategories">
          {["All", ...category.subcategories].map((sub) => (
            <button
              key={sub}
              className={`gal-filter${filter === sub ? " is-active" : ""}`}
              onClick={() => {
                setFilter(sub);
                setCount(PAGE);
              }}
              role="tab"
              aria-selected={filter === sub}
            >
              {sub}
            </button>
          ))}
        </div>
        <span className="gal-count">
          {filtered.length} {filtered.length === 1 ? "frame" : "frames"}
        </span>
      </div>

      {/* Grid */}
      <div className="wrap gallery__grid">
        <MasonryGallery key={filter} photos={visible} />
      </div>

      {count < filtered.length && (
        <div className="gallery__more">
          <button
            className="btn"
            onClick={() => setCount((c) => c + PAGE)}
          >
            Load more
          </button>
        </div>
      )}

      {/* Other categories */}
      <section className="wrap gallery__next">
        <span className="eyebrow">More galleries</span>
        <div className="gallery__next-list">
          {content.categories
            .filter((c) => c.slug !== category.slug)
            .map((c) => (
              <Link key={c.slug} to={`/gallery/${c.slug}`} className="gallery__next-item display">
                {c.name}
                <span>→</span>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
