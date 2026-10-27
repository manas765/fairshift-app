export const ME = "Arun K.";
export const fm = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
export const IND = {
  construction: { rate: 75, cats: ["Electrical", "Scaffolding / height", "Machinery", "No protective gear", "Other"] },
  college: { rate: 60, cats: ["Fire safety", "Electrical", "Slippery floor", "Security / lighting", "Other"] },
  hospital: { rate: 70, cats: ["Biohazard / waste", "Equipment fault", "Violence / abuse", "Fire safety", "Other"] },
};

export function seed() {
  const n = Date.now(), D = 864e5, sh = [];
  [[ME, [8, 8, 8, 8, 0, 0, 8]], ["Meena S.", [8, 8, 8, 0, 8, 8, 8]], ["Ravi P.", [11, 11, 12, 10, 11, 11, 0]], ["Selvi M.", [8, 9, 8, 8, 8, 0, 0]]]
    .forEach(([w, hs]) => hs.forEach((h, i) => {
      if (h) { const s = new Date(n - (i + 1) * D); s.setHours(8, 0, 0, 0); sh.push({ w, s: +s, e: +s + h * 36e5 }); }
    }));
  return {
    sh,
    rp: [{ c: "FS-4821", cat: "Electrical", d: "Exposed wiring near gate 2", loc: "Block B", sev: "High", w: null, st: "Open" }],
    sk: [{ w: ME, n: "Safety induction training", by: "Supervisor", v: true }, { w: ME, n: "First aid certificate", by: "Self-declared", v: false }],
    lang: "en", ind: "construction", role: "worker", rate: 75, ot: 2, act: null,
  };
}

export function calc(S, w) {
  const cut = Date.now() - 30 * 864e5;
  let b = 0, o = 0;
  S.sh.filter((x) => x.w === w && x.s > cut).forEach((x) => {
    const h = (x.e - x.s) / 36e5;
    b += Math.min(h, 8);
    o += Math.max(0, h - 8);
  });
  return { b, o, pb: b * S.rate, po: o * S.rate * S.ot };
}

export function weekHours(S, w) {
  const c = Date.now() - 7 * 864e5;
  return S.sh.filter((x) => x.w === w && x.s > c).reduce((a, x) => a + (x.e - x.s) / 36e5, 0);
}

export function fatigue(S, w) {
  const c = Date.now() - 7 * 864e5;
  const l = S.sh.filter((x) => x.w === w && x.s > c);
  const wk = weekHours(S, w);
  const mx = Math.max(0, ...l.map((x) => (x.e - x.s) / 36e5));
  return wk > 48 || mx > 10 ? { wk, mx } : null;
}