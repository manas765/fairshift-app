import { calc, fatigue, weekHours, fm } from "../lib/logic";

const sev = { High: "hi", Medium: "wn", Low: "ok" };

export default function EmployerView({ S, update, t }) {
  const ws = [...new Set(S.sh.map((x) => x.w))];
  const alerts = ws.map((w) => [w, fatigue(S, w)]).filter((a) => a[1]);
  const otHours = ws.reduce((a, w) => a + calc(S, w).o, 0);
  const open = S.rp.filter((r) => r.st !== "Resolved").length;
  const stats = [[t.wk, ws.length], ["OT " + t.hrs, otHours.toFixed(0)], [t.orp, open], [t.al, alerts.length]];

  return (
    <>
      <div className="g">
        {stats.map(([label, value]) => (
          <div className="card" key={label}>
            <span className="m">{label}</span>
            <div className="big">{value}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>{t.fat}</h3>
        {alerts.length === 0 && <p className="m">—</p>}
        {alerts.map(([w, f]) => (
          <div className="pr" key={w}>
            <span>{w}</span>
            <span className="hi">{f.wk.toFixed(0)} h/7d · max shift {f.mx.toFixed(0)} h</span>
          </div>
        ))}
        <p className="m">Rule: over 48 h in 7 days or any shift over 10 h.</p>
      </div>

      <div className="card">
        <h3>{t.sa}</h3>
        <div className="sc">
          <table>
            <thead>
              <tr><th>Code</th><th>Category</th><th>Details</th><th>Sev.</th><th>Reporter</th><th>{t.st}</th></tr>
            </thead>
            <tbody>
              {S.rp.map((r) => (
                <tr key={r.c}>
                  <td>{r.c}</td>
                  <td>{r.cat}</td>
                  <td>{r.d} ({r.loc})</td>
                  <td className={sev[r.sev]}>{r.sev}</td>
                  <td>{r.w || "Anonymous"}</td>
                  <td>
                    <select style={{ width: "auto" }} value={r.st}
                      onChange={(e) => update((n) => { n.rp.find((x) => x.c === r.c).st = e.target.value; })}>
                      <option>Open</option><option>In review</option><option>Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="g">
        <div className="card">
          <h3>{t.wk}</h3>
          <div className="sc">
            <table>
              <thead><tr><th></th><th>7d h</th><th>{t.tot}</th></tr></thead>
              <tbody>
                {ws.map((w) => {
                  const p = calc(S, w);
                  return (
                    <tr key={w}>
                      <td>{w}</td>
                      <td className={fatigue(S, w) ? "hi" : ""}>{weekHours(S, w).toFixed(0)}</td>
                      <td>{fm(p.pb + p.po)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h3>{t.sk}</h3>
          {S.sk.map((k, i) => (
            <div className="pr" key={i}>
              <span>{k.w}: {k.n}</span>
              <button className="s" onClick={() => update((n) => { n.sk[i].v = !n.sk[i].v; })}>
                {k.v ? "✓" : t.ver}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}