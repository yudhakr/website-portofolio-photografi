import { useState } from "react";
import type { Photo } from "../data/types";
import ProgressiveImage from "./ProgressiveImage";
import Lightbox from "./Lightbox";
import "./MasonryGallery.css";

interface Props {
  photos: Photo[];
}

/** CSS-columns masonry with hover overlay + integrated lightbox. */
export default function MasonryGallery({ photos }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <div className="masonry">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            className="masonry__item"
            onClick={() => setActive(i)}
            aria-label={`Open ${photo.title}`}
          >
            <ProgressiveImage
              src={photo.src}
              alt={photo.alt}
              ratio={photo.ratio}
              sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
            />
            <span className="masonry__overlay">
              <span className="masonry__cat">{photo.subcategory}</span>
              <span className="masonry__title display">{photo.title}</span>
            </span>
          </button>
        ))}
      </div>

      {active !== null && (
        <Lightbox
          photos={photos}
          index={active}
          onClose={() => {
            setActive(null);
            setShowInfo(false);
          }}
          onNavigate={setActive}
          showInfo={showInfo}
          onToggleInfo={() => setShowInfo((v) => !v)}
        />
      )}
    </>
  );
}
