export type CategorySlug =
  | "portrait"
  | "landscape"
  | "commercial"
  | "personal";

export interface Photo {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: CategorySlug;
  subcategory: string;
  /** natural aspect ratio for masonry sizing (w / h) */
  ratio: number;
  location?: string;
  year: number;
  /** EXIF-style info shown on toggle */
  exif: {
    camera: string;
    lens: string;
    focal: string;
    aperture: string;
    shutter: string;
    iso: string;
  };
  forSale?: boolean;
  price?: number;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  hero: string;
  subcategories: string[];
}
