import { useState } from "react";

/** Returns a saved flag + a trigger that shows "Saved" for ~2s. */
export function useSavedFlag() {
  const [saved, setSaved] = useState(false);
  const flash = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return { saved, flash };
}
