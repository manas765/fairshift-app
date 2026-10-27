import { useState } from "react";
import { IND, ME, calc, fatigue, fm } from "../lib/logic";

export default function WorkerView({ S, update, t, toast }) {
  const p = calc(S, ME);
  const f = fatigue(S, ME);
  const mine = S.sh.filter((x) => x.w === ME).sort((a, b) => b.s - a.s).slice(0, 6);

  const [sh, setSh] = useState({ d: new Date().toISOString().slice(0, 10), a: "08:00", b: "17:00" });
  const [rp, setRp] = useState({ cat: IND[S.ind].cats[0], loc: "", sev: "Medium", d: "", anon: true });
  const [code, setCode] = useState("");
  const [found, setFound] = useState("");
  const [skill, setSkill] = useState("");

  function clock() {
    update((n) => {
      if (n.act) { n.sh.push({ w: ME, s: n.act, e: Date.now() }); n.act = null; }
      else n.act = Date.now();
    });
    toast(S.act ? "Shift saved" : "Shift started");
  }

  function addShift() {
    if (!sh.d || !sh.a || !sh.b) return toast("Fill date, start and end");
    const s = new Date(sh.d + "T" + sh.a), e = new Date(sh.d + "T" + sh.b);
    if (e <= s) e.setDate(e.getDate() + 1);
    update((n) => { n.sh.push({ w: ME, s: +s, e: +e }); });
    toast("Shift added");
  }

  function sendReport() {
    if (rp.d.trim().length < 5) return toast("Please describe the concern");
    const c = "FS-" + Math.floor(1000 + Math.random() * 9000);
    update((n) => {
      n.rp.push({ c, cat: rp.cat, d: rp.d.trim(), loc: rp.loc || "-", sev: rp.sev, w: rp.anon ? null : ME, st: "Open" });
    });
    setRp({ ...rp, d: "", loc: "" });
    toast("Report sent. Your tracking code: " + c + " (save it)", 9000);
  }

  function track() {
    const r = S.rp.find((x) => x.c === code.trim().toUpperCase());
    setFound(r ? r.cat + " · " + r.st : "Not found");
  }

  function mic() {
    const R = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!R) return toast("Voice input is not supported in this browser (try Chrome)");
    const r = new R();
    r.lang = { en: "en-IN", hi: "hi-IN", ta: "ta-IN" }[S.lang];
    r.onresult = (e) => setRp((x) => ({ ...x, d: x.d + " " + e.results[0][0].transcript }));
    r.onerror = () => toast("Microphone unavailable");
    r.start();
    toast("Listening…", 2500);
  }

  function addSkill() {
    if (!skill.trim()) return;
    update((n) => { n.sk.push({ w: ME, n: skill.trim(), by: "Self-declared", v: false }); });
    setSkill("");
  }

  return (
    <>
      <div className="g">
        <div className="card">
          <h3>{t.pay}</h3>
          <div className="pr"><span>{t.base} ({p.b.toFixed(1)} {t.hrs} × ₹{S.rate})</span><b>{fm(p.pb)}</b></div>
          <div className="pr"><span>{t.ot} ({p.o.toFixed(1)} {t.hrs} × {S.ot}×)</span><b>{fm(p.po)}</b></div>
          <div className="pr t"><span>{t.tot}</span><span>{fm(p.pb + p.po)}</span></div>
          <p className="m">{t.dis}</p>
          <div className="row">
            <span className="m">₹/hr</span>
            <input type="number" value={S.rate} style={{ width: 80 }}
              onChange={(e) => update((n) => { n.rate = +e.target.value || 1; })} />
            <span className="m">OT ×</span>
            <input type="number" step=".5" value={S.ot} style={{ width: 70 }}
              onChange={(e) => update((n) => { n.ot = +e.target.value || 1; })} />
          </div>
        </div>

        <div className="card">
          <h3>{t.sh}</h3>
          {f && <p className="hi"><b>⚠ {f.wk.toFixed(0)} {t.hrs} / 7d</b> — rest recommended</p>}
          <button className={S.act ? "on" : ""} onClick={clock}>{S.act ? "■ " + t.out : "▶ " + t.in}</button>
          <div className="row" style={{ margin: "10px 0" }}>
            <input type="date" value={sh.d} onChange={(e) => setSh({ ...sh, d: e.target.value })} />
            <input type="time" value={sh.a} onChange={(e) => setSh({ ...sh, a: e.target.value })} />
            <input type="time" value={sh.b} onChange={(e) => setSh({ ...sh, b: e.target.value })} />
            <button className="s" onClick={addShift}>{t.add}</button>
          </div>
          {mine.map((x) => (
            <div className="pr" key={x.s}>
              <span>{new Date(x.s).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
              <span>{((x.e - x.s) / 36e5).toFixed(1)} h</span>
            </div>
          ))}
        </div>
      </div>

      <div className="g">
        <div className="card">
          <h3>{t.sa}</h3>
          <label>Category</label>
          <select value={rp.cat} onChange={(e) => setRp({ ...rp, cat: e.target.value })}>
            {IND[S.ind].cats.map((c) => <option key={c}>{c}</option>)}
          </select>
          <label>Location</label>
          <input value={rp.loc} onChange={(e) => setRp({ ...rp, loc: e.target.value })} />
          <label>Severity</label>
          <select value={rp.sev} onChange={(e) => setRp({ ...rp, sev: e.target.value })}>
            <option>Low</option><option>Medium</option><option>High</option>
          </select>
          <label>Details</label>
          <textarea rows="3" value={rp.d} onChange={(e) => setRp({ ...rp, d: e.target.value })} />
          <div className="row" style={{ marginTop: 8 }}>
            <label style={{ margin: 0 }}>
              <input type="checkbox" checked={rp.anon} style={{ width: "auto" }}
                onChange={(e) => setRp({ ...rp, anon: e.target.checked })} /> {t.anon}
            </label>
            <button className="s" onClick={mic}>🎤 {t.voice}</button>
            <button onClick={sendReport}>{t.sub2}</button>
          </div>
          <hr style={{ border: 0, borderTop: "1px solid var(--b)", margin: "14px 0" }} />
          <div className="row">
            <input placeholder={t.trk} value={code} style={{ flex: 1 }} onChange={(e) => setCode(e.target.value)} />
            <button className="s" onClick={track}>{t.st}</button>
          </div>
          <p className="m">{found}</p>
        </div>

        <div className="card">
          <h3>{t.sk}</h3>
          {S.sk.filter((k) => k.w === ME).map((k) => (
            <div className="pr" key={k.n}>
              <span>{k.n}<br /><span className="m">{k.by}</span></span>
              <span className={"tag " + (k.v ? "ok" : "")}>{k.v ? "✓ Verified" : "Pending"}</span>
            </div>
          ))}
          <div className="row" style={{ marginTop: 10 }}>
            <input placeholder="Skill or training" value={skill} style={{ flex: 1 }} onChange={(e) => setSkill(e.target.value)} />
            <button className="s" onClick={addSkill}>{t.add}</button>
          </div>
        </div>
      </div>
    </>
  );
}