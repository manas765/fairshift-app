
import Navbar from "./components/Navbar";
import FeatureCard from "./components/FeatureCard";
import Dashboard from "./components/Dashboard";
import SafetySection from "./components/SafetySection";
import "./App.css";

function App() {
  const features = [
    {
      icon: "₹",
      title: "Pay transparency",
      description:
        "Understand earnings, deductions and overtime through a clear breakdown.",
    },
    {
      icon: "◷",
      title: "Shift records",
      description:
        "Keep track of working hours and maintain a readable record of completed shifts.",
    },
    {
      icon: "◇",
      title: "Workplace safety",
      description:
        "Provide a dedicated place to raise concerns about unsafe working conditions.",
    },
    {
      icon: "↗",
      title: "Worker wellbeing",
      description:
        "Help workers and employers pay attention to workload and fatigue risks.",
    },
  ];

  return (
    <div className="app">
      <Navbar />

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              DECENT WORK. BETTER FUTURES.
            </span>

            <h1>
              Work should be fair.
              <br />
              <span>Every single shift.</span>
            </h1>

            <p>
              FairShift brings pay transparency, shift records and
              workplace safety into one simple platform.
            </p>

            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() =>
                  document
                    .getElementById("dashboard")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore FairShift →
              </button>

              <a className="secondary-link" href="#features">
                Discover features
              </a>
            </div>

            <div className="hero-note">
              Built around UN Sustainable Development Goal 8
            </div>
          </div>

          <div className="hero-card">
            <div className="status-row">
              <span className="status-dot" />
              FairShift overview
              <span className="demo-label">DEMO</span>
            </div>

            <div className="hero-card-main">
              <p>Illustrative monthly earnings</p>
              <h2>₹18,500</h2>
              <span className="positive">
                Transparent pay breakdown
              </span>
            </div>

            <div className="mini-stats">
              <div>
                <span>Hours logged</span>
                <strong>160 hrs</strong>
              </div>

              <div>
                <span>Safety status</span>
                <strong>Monitored</strong>
              </div>
            </div>

            <p className="demo-warning">
              Sample data for demonstration only.
            </p>
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="section-heading">
            <span className="eyebrow">WHAT WE OFFER</span>
            <h2>Fairness you can see.</h2>
            <p>
              Essential workplace information, made easier to understand
              and act on.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>

        <Dashboard />

        <SafetySection />
      </main>

      <footer className="footer">
        <a className="logo" href="#home">
          Fair<span>Shift</span>
        </a>

        <p>
          Supporting decent work and economic growth · SDG 8
        </p>

        <span>Prototype · Sample data only</span>
      </footer>
    </div>
  );
}

export default App;
