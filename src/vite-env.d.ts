/// <reference types="vite/client" />

import "react";

// React 18's types don't yet include the `fetchPriority` attribute.
declare module "react" {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchPriority?: "high" | "low" | "auto";
  }
}
