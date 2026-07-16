import type { Category, Photo } from "./types";

/* ---------- Site / profile ---------- */
export interface SiteContent {
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  studio: {
    address: string;
    mapEmbed: string;
  };
  responseTime: string;
  socials: { label: string; href: string }[];
}

/* ---------- About ---------- */
export interface AboutContent {
  portrait: string;
  title: string;
  sub: string;
  storyParagraphs: string[];
  clients: string[];
  quote: string;
  awards: { year: string; text: string }[];
  gear: { group: string; items: string[] }[];
}

/* ---------- Services ---------- */
export interface ServiceItem {
  n: string;
  title: string;
  desc: string;
  from: string;
  img: string;
}
export interface ServicePackage {
  name: string;
  price: string;
  for: string;
  includes: string[];
  featured: boolean;
}
export interface ServicesContent {
  hero: string;
  items: ServiceItem[];
  packages: ServicePackage[];
}

/* ---------- Homepage feature selection ---------- */
export interface HomeContent {
  /** photo ids used in the hero slideshow (in order) */
  featuredIds: string[];
  /** photo ids used in the "selected work" masonry (in order) */
  gridIds: string[];
}

/* ---------- Full editable content bundle ---------- */
export interface Content {
  version: number;
  site: SiteContent;
  categories: Category[];
  photos: Photo[];
  home: HomeContent;
  about: AboutContent;
  services: ServicesContent;
}
