import { useState } from "react";
import { blurSrc, buildSrcSet, sizedSrc } from "../utils/image";
import { useInView } from "../utils/hooks";

interface Props {
  src: string;
  alt: string;
  /** aspect ratio w/h to reserve space (prevents layout shift) */
  ratio?: number;
  sizes?: string;
  /** eager-load above-the-fold heroes */
  priority?: boolean;
  className?: string;
}

/**
 * Progressive, responsive, lazy image.
 * - reserves space via aspect-ratio (no layout shift)
 * - shows a blurred low-res placeholder until the full image decodes
 * - builds a srcset for responsive delivery
 */
export default function ProgressiveImage({
  src,
  alt,
  ratio,
  sizes = "100vw",
  priority = false,
  className,
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>("400px");
  const [loaded, setLoaded] = useState(false);
  const shouldLoad = priority || inView;

  return (
    <div
      ref={ref}
      className={`pimg${loaded ? " is-loaded" : ""}${className ? " " + className : ""}`}
      style={ratio ? { aspectRatio: String(ratio) } : undefined}
    >
      <img className="pimg__blur" src={blurSrc(src)} alt="" aria-hidden="true" />
      {shouldLoad && (
        <img
          className="pimg__full"
          src={sizedSrc(src, 1200)}
          srcSet={buildSrcSet(src)}
          sizes={sizes}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
}
