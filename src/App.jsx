import { useEffect, useRef, useState } from "react";
import { useStore } from "./hooks/useStore";
import { T } from "./lib/i18n";
import { IND } from "./lib/logic";
import Header from "./components/Header";
import Hero from "./components/Hero";
import WorkerView from "./components/WorkerView";
import EmployerView from "./components/EmployerView";
import "./App.css";

export default function App() {
  const [S, update, reset] = useStore();
  const [msg, setMsg] = useState("");
  const timer = useRef();
  const t = T[S.lang];

  const toast = (m, ms = 4500) => {
    setMsg(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(""), ms);
  };

  const set = (k, v) =>
    update((n) => {
      n[k] = v;
      if (k === "ind") n.rate = IND[v].rate;
    });

  useEffect(() => { document.documentElement.lang = S.lang; }, [S.lang]);

  return (
    <>
      <Header S={S} set={set} reset={() => { reset(); toast("Demo data restored"); }} />
      <Hero t={t} role={S.role} set={set} />
      <main>
        {S.role === "worker"
          ? <WorkerView key={S.ind} S={S} update={update} t={t} toast={toast} />
          : <EmployerView S={S} update={update} t={t} />}
      </main>
      {msg && <div id="toast" style={{ display: "block" }}>{msg}</div>}
    </>
  );
}