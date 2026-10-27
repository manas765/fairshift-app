export default function Hero({ t, role, set }) {
  return (
    <section className="hero">
      <span className="eb">SDG 8 · DECENT WORK</span>
      <h1>{t.h1}</h1>
      <p>{t.sub}</p>
      <div className="row" style={{ marginTop: 14 }}>
        <button className={role === "worker" ? "on" : ""} onClick={() => set("role", "worker")}>{t.w}</button>
        <button className={role === "employer" ? "on" : ""} onClick={() => set("role", "employer")}>{t.e}</button>
      </div>
    </section>
  );
}