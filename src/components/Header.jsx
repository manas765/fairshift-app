import { IND } from "../lib/logic";

export default function Header({ S, set, reset }) {
  return (
    <header>
      <span className="logo">Fair<i>Shift</i></span>
      <div className="row">
        <select value={S.ind} onChange={(e) => set("ind", e.target.value)}>
          {Object.keys(IND).map((k) => (
            <option key={k} value={k}>{k[0].toUpperCase() + k.slice(1)}</option>
          ))}
        </select>
        <select value={S.lang} onChange={(e) => set("lang", e.target.value)}>
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="ta">தமிழ்</option>
        </select>
        <button className="s" onClick={reset}>Reset demo</button>
      </div>
    </header>
  );
}