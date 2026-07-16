import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

/**
 * Client-only auth for a static site.
 *
 * NOTE: This protects the admin UI on the client, but because everything runs
 * in the browser, it is NOT real server-side security. Do not use it to guard
 * genuinely sensitive data. Default credentials are below — change them on first
 * login (Admin → Settings).
 */

const CRED_KEY = "lumen-admin-cred";
const SESSION_KEY = "lumen-admin-session";

const DEFAULT_USER = "admin";
const DEFAULT_PASS = "portfolio";

interface Credentials {
  username: string;
  passHash: string;
}

// Small, dependency-free hash (FNV-1a). Sufficient to avoid storing plaintext.
function hash(input: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16);
}

function loadCred(): Credentials {
  try {
    const raw = localStorage.getItem(CRED_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return { username: DEFAULT_USER, passHash: hash(DEFAULT_PASS) };
}

interface AuthContextValue {
  isAuthed: boolean;
  username: string;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  changeCredentials: (
    currentPassword: string,
    newUsername: string,
    newPassword: string
  ) => { ok: boolean; error?: string };
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [cred, setCred] = useState<Credentials>(loadCred);
  const [isAuthed, setIsAuthed] = useState<boolean>(
    () => sessionStorage.getItem(SESSION_KEY) === "1"
  );

  useEffect(() => {
    localStorage.setItem(CRED_KEY, JSON.stringify(cred));
  }, [cred]);

  const login = useCallback(
    (username: string, password: string) => {
      const ok =
        username.trim() === cred.username && hash(password) === cred.passHash;
      if (ok) {
        setIsAuthed(true);
        sessionStorage.setItem(SESSION_KEY, "1");
      }
      return ok;
    },
    [cred]
  );

  const logout = useCallback(() => {
    setIsAuthed(false);
    sessionStorage.removeItem(SESSION_KEY);
  }, []);

  const changeCredentials = useCallback(
    (currentPassword: string, newUsername: string, newPassword: string) => {
      if (hash(currentPassword) !== cred.passHash) {
        return { ok: false, error: "Current password is incorrect." };
      }
      if (!newUsername.trim()) {
        return { ok: false, error: "Username cannot be empty." };
      }
      if (newPassword.length < 4) {
        return { ok: false, error: "New password must be at least 4 characters." };
      }
      setCred({ username: newUsername.trim(), passHash: hash(newPassword) });
      return { ok: true };
    },
    [cred]
  );

  const value = useMemo<AuthContextValue>(
    () => ({ isAuthed, username: cred.username, login, logout, changeCredentials }),
    [isAuthed, cred.username, login, logout, changeCredentials]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export const DEFAULT_CREDENTIALS = { username: DEFAULT_USER, password: DEFAULT_PASS };
