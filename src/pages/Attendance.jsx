import { useState } from "react";

export default function Attendance() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="tab-row">
        {["Mark Attendance", "Calendar View", "Reports"].map((t, i) => (
          <div key={t} className={`tab${activeTab === i ? " active" : ""}`} onClick={() => setActiveTab(i)}>{t}</div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 20 }}>
        {/* Mark Attendance Card */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Today — Apr 2, 2026</div>
              <div className="card-sub">Class 10-A · 38 students</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn sm">Mark All Present</button>
              <button className="btn primary sm">Save</button>
            </div>
          </div>
          <div className="card-body" style={{ padding: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { init: "AR", grad: null, name: "Aarav Roy", roll: "001", present: true },
                { init: "PM", grad: "linear-gradient(135deg,#f59e0b,#ef4444)", name: "Priya Mehta", roll: "002", present: false },
                { init: "SK", grad: "linear-gradient(135deg,#10b981,#0066ff)", name: "Sourav Khan", roll: "003", present: true },
              ].map((s) => (
                <div key={s.roll} className="att-row">
                  <div className="cell-user">
                    <div className="cell-avatar" style={s.grad ? { background: s.grad } : {}}>{s.init}</div>
                    {s.name}
                    <span className="mono" style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 6 }}>{s.roll}</span>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      className="btn sm"
                      style={s.present ? { background: "var(--green-light)", color: "#059669", borderColor: "transparent" } : {}}
                    >
                      ✓ Present
                    </button>
                    <button
                      className="btn sm"
                      style={!s.present ? { background: "var(--red-light)", color: "#dc2626", borderColor: "transparent" } : {}}
                    >
                      ✗ Absent
                    </button>
                  </div>
                </div>
              ))}
              <div style={{ textAlign: "center", padding: 6, fontSize: 12, color: "var(--text-muted)" }}>
                + 35 more students
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Overview */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Monthly Overview</div>
              <div className="card-sub">March 2026</div>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 600, color: "var(--green)" }}>94.2%</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Avg Attendance</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 600, color: "var(--text-primary)" }}>23</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Working Days</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 600, color: "var(--red)" }}>4</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Holidays</div>
              </div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 8 }}>Day Legend</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", fontSize: 12 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 10, height: 10, background: "var(--green-light)", borderRadius: 3, display: "inline-block" }}></span>Present
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 10, height: 10, background: "var(--red-light)", borderRadius: 3, display: "inline-block" }}></span>Absent
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 10, height: 10, background: "var(--border-light)", borderRadius: 3, display: "inline-block" }}></span>Holiday
              </span>
            </div>
            <div style={{ marginTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-secondary)", marginBottom: 6 }}>
                <span>Overall attendance rate</span>
                <span style={{ fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>94.2%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "94%", background: "var(--green)" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Absent Today Alert */}
      <div className="card" style={{ borderLeft: "3px solid var(--red)" }}>
        <div className="card-header">
          <div>
            <div className="card-title" style={{ color: "var(--red)" }}>Absent Today — 3 students</div>
            <div className="card-sub">SMS notifications sent</div>
          </div>
          <button className="btn sm">Send Reminder</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Student</th><th>Class</th><th>Parent Contact</th><th>Consecutive Absences</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="cell-user">
                    <div className="cell-avatar" style={{ background: "linear-gradient(135deg,#f59e0b,#ef4444)" }}>PM</div>
                    Priya Mehta
                  </div>
                </td>
                <td>8-B</td>
                <td>99887 76655</td>
                <td><span className="badge red">3 days</span></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-user">
                    <div className="cell-avatar" style={{ background: "linear-gradient(135deg,#8b5cf6,#ec4899)" }}>JK</div>
                    Jatin Kumar
                  </div>
                </td>
                <td>10-A</td>
                <td>98765 11223</td>
                <td><span className="badge amber">1 day</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
