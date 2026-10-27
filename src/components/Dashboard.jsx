
import { useState } from "react";

function Dashboard() {
  const [role, setRole] = useState("worker");

  const isWorker = role === "worker";

  function scrollToSafety() {
    document
      .getElementById("safety")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="dashboard-section" id="dashboard">
      <div className="section-heading">
        <span className="eyebrow">INTERACTIVE PREVIEW</span>
        <h2>Your work. Your information.</h2>
        <p>
          Switch between sample worker and employer views.
        </p>
      </div>

      <div className="dashboard">
        <div className="dashboard-top">
          <div>
            <span className="eyebrow">FAIRSHIFT PORTAL</span>
            <h3>
              {isWorker ? "Worker dashboard" : "Employer dashboard"}
            </h3>
          </div>

          <div className="role-switch">
            <button
              className={isWorker ? "selected" : ""}
              onClick={() => setRole("worker")}
            >
              Worker
            </button>

            <button
              className={!isWorker ? "selected" : ""}
              onClick={() => setRole("employer")}
            >
              Employer
            </button>
          </div>
        </div>

        <div className="dashboard-stats">
          <article className="stat-card">
            <span>{isWorker ? "Monthly earnings" : "Illustrative payroll"}</span>
            <strong>{isWorker ? "₹18,500" : "₹2,40,000"}</strong>
            <small>Sample figures</small>
          </article>

          <article className="stat-card">
            <span>{isWorker ? "Hours this month" : "Hours recorded"}</span>
            <strong>{isWorker ? "160" : "1,840"}</strong>
            <small>Illustrative records</small>
          </article>

          <article className="stat-card">
            <span>{isWorker ? "My safety reports" : "Safety concerns"}</span>
            <strong>{isWorker ? "0" : "3"}</strong>
            <small>Demo status only</small>
          </article>
        </div>

        <div className="dashboard-bottom">
          {isWorker ? (
            <>
              <div>
                <h4>Quick actions</h4>
                <p>Explore the available demonstration actions.</p>
              </div>

              <div className="quick-actions">
                <button
                  onClick={() =>
                    alert("Pay details will be implemented next.")
                  }
                >
                  View pay details
                </button>

                <button
                  onClick={() =>
                    alert("Shift history will be implemented next.")
                  }
                >
                  Check shift history
                </button>

                <button onClick={scrollToSafety}>
                  Report a concern
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4>Workforce overview</h4>
                <p>
                  A sample view of payroll, working hours and workplace
                  concerns.
                </p>
              </div>

              <span className="demo-label">SAMPLE DATA</span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
