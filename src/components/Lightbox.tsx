import { useCallback, useEffect } from "react";
import type { Photo } from "../data/types";
import { buildSrcSet, sizedSrc } from "../utils/image";
import { useBodyLock } from "../utils/hooks";
import "./Lightbox.css";

interface Props {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  showInfo: boolean;
  onToggleInfo: () => void;
}

export default function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
  showInfo,
  onToggleInfo,
}: Props) {
  const photo = photos[index];
  useBodyLock(true);

  const next = useCallback(
    () => onNavigate((index + 1) % photos.length),
    [index, photos.length, onNavigate]
  );
  const prev = useCallback(
    () => onNavigate((index - 1 + photos.length) % photos.length),
    [index, photos.length, onNavigate]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key.toLowerCase() === "i") onToggleInfo();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onClose, onToggleInfo]);

  // Touch swipe
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
        dx < 0 ? next() : prev();
      }
    };
    const node = document.getElementById("lb-stage");
    node?.addEventListener("touchstart", onStart, { passive: true });
    node?.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      node?.removeEventListener("touchstart", onStart);
      node?.removeEventListener("touchend", onEnd);
    };
  }, [next, prev]);

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}?photo=${photo.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: photo.title, text: photo.title, url });
      } catch {
        /* cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    }
  };

  if (!photo) return null;

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={photo.title}>
      <div className="lb__topbar">
        <div className="lb__count">
          {String(index + 1).padStart(2, "0")}
          <span> / {String(photos.length).padStart(2, "0")}</span>
        </div>
        <div className="lb__actions">
          <button className="lb__action" onClick={onToggleInfo} aria-pressed={showInfo}>
            {showInfo ? "Hide info" : "Info"}
          </button>
          <button className="lb__action" onClick={share}>
            Share
          </button>
          {photo.forSale ? (
            <a className="lb__action lb__action--buy" href="/contact">
              Purchase · ${photo.price}
            </a>
          ) : (
            <a
              className="lb__action"
              href={sizedSrc(photo.src, 2600)}
              target="_blank"
              rel="noreferrer"
              download
            >
              Download
            </a>
          )}
          <button className="lb__close" onClick={onClose} aria-label="Close">
            <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.3">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>
      </div>

      <button className="lb__arrow lb__arrow--prev" onClick={prev} aria-label="Previous">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>

      <div id="lb-stage" className="lb__stage">
        <figure className="lb__figure" key={photo.id}>
          <img
            className="lb__img"
            src={sizedSrc(photo.src, 1600)}
            srcSet={buildSrcSet(photo.src)}
            sizes="100vw"
            alt={photo.alt}
            decoding="async"
          />
        </figure>
      </div>

      <button className="lb__arrow lb__arrow--next" onClick={next} aria-label="Next">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className={`lb__caption${showInfo ? " is-expanded" : ""}`}>
        <div className="lb__caption-main">
          <h3 className="display lb__title">{photo.title}</h3>
          <p className="lb__meta">
            {photo.location} · {photo.year} · {photo.subcategory}
          </p>
        </div>
        {showInfo && (
          <dl className="lb__exif">
            <div><dt>Camera</dt><dd>{photo.exif.camera}</dd></div>
            <div><dt>Lens</dt><dd>{photo.exif.lens}</dd></div>
            <div><dt>Focal</dt><dd>{photo.exif.focal}</dd></div>
            <div><dt>Aperture</dt><dd>{photo.exif.aperture}</dd></div>
            <div><dt>Shutter</dt><dd>{photo.exif.shutter}</dd></div>
            <div><dt>ISO</dt><dd>{photo.exif.iso}</dd></div>
          </dl>
        )}
      </div>
    </div>
  );
}
