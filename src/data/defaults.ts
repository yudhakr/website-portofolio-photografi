import type {
  AboutContent,
  Content,
  ServicesContent,
  SiteContent,
} from "./content-types";
import { site as defaultSite } from "./site";
import { categories, photos } from "./photos";

export const defaultSiteContent: SiteContent = {
  name: defaultSite.name,
  shortName: defaultSite.shortName,
  role: defaultSite.role,
  tagline: defaultSite.tagline,
  email: defaultSite.email,
  phone: defaultSite.phone,
  location: defaultSite.location,
  studio: { ...defaultSite.studio },
  responseTime: defaultSite.responseTime,
  socials: defaultSite.socials.map((s) => ({ ...s })),
};

export const defaultAboutContent: AboutContent = {
  portrait:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1400&q=80&auto=format",
  title: "I photograph the pause before a moment becomes a memory.",
  sub: `${defaultSite.role} based in ${defaultSite.location}, working across portrait, landscape and commercial commissions.`,
  storyParagraphs: [
    `I didn't start with a camera. I started with a darkroom that smelled of fixer and a grandfather who believed a photograph was a way of paying attention. He'd hand me a loupe and a contact sheet and say, "Find the frame that's breathing." Thirty years later, that's still the only thing I'm looking for.`,
    `My work lives in the space between control and surrender — a lit studio setup that leaves room for a subject to forget I'm there, a landscape I've hiked to a dozen times waiting for the one hour it decides to reveal itself. I care less about perfect and more about true. The slightly closed eyes. The weather that wasn't in the plan.`,
    `Today I split my time between commissioned commercial work for brands who value restraint, and personal projects that keep me honest. Both feed each other. Both are, in the end, about the same thing: light, held still.`,
  ],
  clients: [
    "ARIA",
    "HALDEN",
    "MERIDIAN",
    "NOOR",
    "OSTERIA",
    "ELIX",
    "KINFOLK",
    "MONOCLE",
  ],
  quote: "A good photograph doesn't ask you to look. It asks you to stay.",
  awards: [
    { year: "2024", text: "Sony World Photography Awards — Shortlist, Portraiture" },
    { year: "2023", text: "Communication Arts Photography Annual — Winner" },
    { year: "2023", text: "Feature — Kinfolk, Issue 47" },
    { year: "2022", text: "LensCulture Portrait Awards — Finalist" },
    { year: "2021", text: "Print feature — Monocle, The Escapist" },
  ],
  gear: [
    { group: "Bodies", items: ["Hasselblad X2D 100C", "Leica M11", "Sony A7R V"] },
    { group: "Lenses", items: ["XCD 55 / 65 / 90mm", "Summilux 35 / 50mm", "GM 24-70 / 12-24mm"] },
    { group: "Light", items: ["Profoto B10X Plus", "Profoto A2", "Practicals & window light"] },
    { group: "Film", items: ["Hasselblad 500C/M", "Portra 400", "HP5 Plus"] },
  ],
};

export const defaultServicesContent: ServicesContent = {
  hero: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=2000&q=80&auto=format",
  items: [
    {
      n: "01",
      title: "Portrait Sessions",
      desc: "Studio or environmental. For individuals, families, and personal brands who want images that feel like them.",
      from: "$650",
      img: "photo-1544005313-94ddf0286df2",
    },
    {
      n: "02",
      title: "Editorial & Fashion",
      desc: "Concept-led shoots for magazines, lookbooks and campaigns. Full creative direction available.",
      from: "$2,400",
      img: "photo-1483985988355-763728e1935b",
    },
    {
      n: "03",
      title: "Commercial & Brand",
      desc: "Product, lifestyle and brand libraries built for consistency across every channel.",
      from: "Contact for quote",
      img: "photo-1441986300917-64674bd600d8",
    },
    {
      n: "04",
      title: "Fine Art Prints",
      desc: "Museum-grade archival prints of gallery work, editioned and signed. Shipped worldwide.",
      from: "$220",
      img: "photo-1500534623283-312aade485b7",
    },
  ],
  packages: [
    {
      name: "The Sitting",
      price: "$650",
      for: "Individual portraits",
      includes: [
        "90-minute session",
        "1 location or studio",
        "15 retouched images",
        "Online private gallery",
        "Personal-use license",
      ],
      featured: false,
    },
    {
      name: "The Story",
      price: "$1,800",
      for: "Brands & editorial",
      includes: [
        "Half-day (4 hours)",
        "Up to 2 looks / locations",
        "40 retouched images",
        "Creative direction & moodboard",
        "Commercial license",
        "48-hour preview gallery",
      ],
      featured: true,
    },
    {
      name: "The Campaign",
      price: "From $3,600",
      for: "Full productions",
      includes: [
        "Full-day production",
        "Unlimited looks",
        "80+ retouched images",
        "Team: assist, HMU, stylist",
        "Extended commercial license",
        "Usage consultation",
      ],
      featured: false,
    },
  ],
};

export const defaultHomeContent = {
  featuredIds: ["l-03", "p-01", "l-02", "c-05", "x-01"],
  gridIds: [
    "p-01",
    "l-02",
    "c-05",
    "x-02",
    "l-03",
    "p-02",
    "c-03",
    "x-03",
    "l-05",
    "p-03",
    "c-06",
    "x-06",
  ],
};

export const CONTENT_VERSION = 1;

export function makeDefaultContent(): Content {
  return {
    version: CONTENT_VERSION,
    site: structuredClone(defaultSiteContent),
    categories: structuredClone(categories),
    photos: structuredClone(photos),
    home: structuredClone(defaultHomeContent),
    about: structuredClone(defaultAboutContent),
    services: structuredClone(defaultServicesContent),
  };
}
