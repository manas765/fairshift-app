import { useState, useEffect } from "react";
import { seed } from "../lib/logic";

const KEY = "fairshift_v1";

export function useStore() {
  const [S, setS] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || seed(); }
    catch { return seed(); }
  });

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* ignore */ }
  }, [S]);

  const update = (fn) => setS((p) => { const n = structuredClone(p); fn(n); return n; });
  const reset = () => setS(seed());
  return [S, update, reset];
}