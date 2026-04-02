import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { navigate } = useApp();

  return (
    <>
      {/* ── STAT CARDS ── */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">
            <span className="dot" style={{ background: "#0066ff" }}></span>
            Total Students
          </div>
          <div className="stat-value">1,284</div>
          <div className="stat-change up">↑ 12 this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">
            <span className="dot" style={{ background: "#10b981" }}></span>
            Today's Attendance
          </div>
          <div className="stat-value">94.2%</div>
          <div className="stat-change up">↑ 2.1% vs yesterday</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">
            <span className="dot" style={{ background: "#f59e0b" }}></span>
            Fees Collected
          </div>
          <div className="stat-value">₹4.8L</div>
          <div className="stat-change down">↓ ₹40k pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">
            <span className="dot" style={{ background: "#8b5cf6" }}></span>
            Teachers
          </div>
          <div className="stat-value">68</div>
          <div className="stat-change" style={{ color: "var(--text-muted)" }}>3 on leave today</div>
        </div>
      </div>

      {/* ── QUICK ACTIONS ── */}
      <div className="quick-actions">
        <div className="quick-card" onClick={() => navigate("students")}>
          <div className="quick-icon" style={{ background: "#eff4ff" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div>
            <div className="quick-label">Students</div>
            <div className="quick-sub">1,284 enrolled</div>
          </div>
        </div>
        <div className="quick-card" onClick={() => navigate("attendance")}>
          <div className="quick-icon" style={{ background: "#ecfdf5" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <div>
            <div className="quick-label">Attendance</div>
            <div className="quick-sub">Mark today's</div>
          </div>
        </div>
        <div className="quick-card" onClick={() => navigate("fees")}>
          <div className="quick-icon" style={{ background: "#fffbeb" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <div>
            <div className="quick-label">Fees</div>
            <div className="quick-sub">12 pending</div>
          </div>
        </div>
        <div className="quick-card" onClick={() => navigate("teachers")}>
          <div className="quick-icon" style={{ background: "#f5f3ff" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div>
            <div className="quick-label">Teachers</div>
            <div className="quick-sub">68 active</div>
          </div>
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="grid-2">
        {/* Recent Admissions */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Recent Admissions</div>
              <div className="card-sub">Last 5 students</div>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="cell-user">
                      <div className="cell-avatar">AR</div>
                      Aarav Roy
                    </div>
                  </td>
                  <td>10-A</td>
                  <td>Apr 1</td>
                  <td><span className="badge green">Active</span></td>
                </tr>
                <tr>
                  <td>
                    <div className="cell-user">
                      <div className="cell-avatar" style={{ background: "linear-gradient(135deg,#f59e0b,#ef4444)" }}>PM</div>
                      Priya Mehta
                    </div>
                  </td>
                  <td>8-B</td>
                  <td>Mar 28</td>
                  <td><span className="badge green">Active</span></td>
                </tr>
                <tr>
                  <td>
                    <div className="cell-user">
                      <div className="cell-avatar" style={{ background: "linear-gradient(135deg,#10b981,#0066ff)" }}>SK</div>
                      Sourav Khan
                    </div>
                  </td>
                  <td>12-C</td>
                  <td>Mar 25</td>
                  <td><span className="badge amber">Pending</span></td>
                </tr>
                <tr>
                  <td>
                    <div className="cell-user">
                      <div className="cell-avatar" style={{ background: "linear-gradient(135deg,#8b5cf6,#ec4899)" }}>ND</div>
                      Neha Das
                    </div>
                  </td>
                  <td>6-A</td>
                  <td>Mar 22</td>
                  <td><span className="badge green">Active</span></td>
                </tr>
                <tr>
                  <td>
                    <div className="cell-user">
                      <div className="cell-avatar" style={{ background: "linear-gradient(135deg,#ef4444,#f59e0b)" }}>RG</div>
                      Rohit Gupta
                    </div>
                  </td>
                  <td>9-D</td>
                  <td>Mar 20</td>
                  <td><span className="badge green">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Fee Collection Overview */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Fee Collection Overview</div>
              <div className="card-sub">April 2026</div>
            </div>
          </div>
          <div className="card-body">
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
                <span style={{ color: "var(--text-secondary)" }}>Collected</span>
                <span style={{ fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>₹4,80,000 / ₹5,20,000</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "92%", background: "var(--green)" }}></div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 100, padding: 14, background: "var(--green-light)", borderRadius: 10 }}>
                <div style={{ fontSize: 11, color: "#059669", fontWeight: 500, marginBottom: 4 }}>PAID</div>
                <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.5px", color: "var(--text-primary)" }}>1,142</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>students</div>
              </div>
              <div style={{ flex: 1, minWidth: 100, padding: 14, background: "var(--red-light)", borderRadius: 10 }}>
                <div style={{ fontSize: 11, color: "#dc2626", fontWeight: 500, marginBottom: 4 }}>PENDING</div>
                <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.5px", color: "var(--text-primary)" }}>142</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>students</div>
              </div>
              <div style={{ flex: 1, minWidth: 100, padding: 14, background: "var(--amber-light)", borderRadius: 10 }}>
                <div style={{ fontSize: 11, color: "#d97706", fontWeight: 500, marginBottom: 4 }}>PARTIAL</div>
                <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.5px", color: "var(--text-primary)" }}>38</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>students</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}