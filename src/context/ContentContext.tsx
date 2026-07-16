import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { Content } from "../data/content-types";
import type { CategorySlug, Photo } from "../data/types";
import { CONTENT_VERSION, makeDefaultContent } from "../data/defaults";

const KEY = "lumen-content";

function loadContent(): Content {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return makeDefaultContent();
    const parsed = JSON.parse(raw) as Content;
    // Migrate / heal shape if version changed or fields missing.
    if (!parsed || parsed.version !== CONTENT_VERSION) {
      return { ...makeDefaultContent(), ...parsed, version: CONTENT_VERSION };
    }
    return parsed;
  } catch {
    return makeDefaultContent();
  }
}

interface ContentContextValue {
  content: Content;
  /** Replace the whole content bundle (used by admin editors). */
  setContent: (next: Content | ((prev: Content) => Content)) => void;
  /** Restore factory defaults. */
  reset: () => void;
  // derived helpers
  photosByCategory: (slug: CategorySlug) => Photo[];
  featured: Photo[];
  featuredGrid: Photo[];
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<Content>(loadContent);

  // Persist on every change.
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(content));
    } catch (e) {
      // Likely quota exceeded (large base64 images).
      console.error("Failed to save content", e);
    }
  }, [content]);

  // Keep tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY && e.newValue) {
        try {
          setContentState(JSON.parse(e.newValue));
        } catch {
          /* ignore */
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setContent = useCallback(
    (next: Content | ((prev: Content) => Content)) => {
      setContentState((prev) =>
        typeof next === "function" ? (next as (p: Content) => Content)(prev) : next
      );
    },
    []
  );

  const reset = useCallback(() => setContentState(makeDefaultContent()), []);

  const value = useMemo<ContentContextValue>(() => {
    const byId = (id: string) => content.photos.find((p) => p.id === id);
    return {
      content,
      setContent,
      reset,
      photosByCategory: (slug) =>
        content.photos.filter((p) => p.category === slug),
      featured: content.home.featuredIds
        .map(byId)
        .filter((p): p is Photo => Boolean(p)),
      featuredGrid: content.home.gridIds
        .map(byId)
        .filter((p): p is Photo => Boolean(p)),
    };
  }, [content, setContent, reset]);

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
