import { useState } from "react";

function AcademicReportsTab() {
  return (
    <>
      <div className="stats-row" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
        {[
          { label: "Pass Rate",       value: "94.8%", sub: "This Term",       color: "#10b981", change: "up", ct: "↑ 2.3% vs last term" },
          { label: "Top Performer",   value: "98.6%", sub: "Aarav Roy · 10-A",color: "#0066ff", change: "",   ct: "Highest scorer" },
          { label: "Avg Score",       value: "76.4",  sub: "Out of 100",      color: "#8b5cf6", change: "up", ct: "↑ 4.1 pts vs last term" },
          { label: "Improvement",     value: "312",   sub: "Students",        color: "#f59e0b", change: "up", ct: "↑ Score improved" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-label"><span className="dot" style={{ background: s.color }}></span>{s.label}</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{s.value}</div>
            <div className={`stat-change ${s.change}`}>{s.ct}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginTop: 20 }}>
        <div className="card-header">
          <div><div className="card-title">Class-wise Performance</div><div className="card-sub">Current Term</div></div>
          <button className="btn sm">↓ Export PDF</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Class</th><th>Students</th><th>Avg %</th><th>Pass Rate</th><th>Toppers</th><th>Performance</th></tr></thead>
            <tbody>
              {[
                { cls: "Class 12-A", students: 34, avg: 82, pass: 100, topper: "A. Roy" },
                { cls: "Class 11-A", students: 38, avg: 76, pass: 97,  topper: "P. Sen" },
                { cls: "Class 10-A", students: 38, avg: 79, pass: 100, topper: "R. Gupta" },
                { cls: "Class 9-C",  students: 36, avg: 71, pass: 94,  topper: "N. Das" },
                { cls: "Class 8-B",  students: 40, avg: 68, pass: 90,  topper: "J. Kumar" },
              ].map((r) => {
                const col = r.pass >= 98 ? "var(--green)" : r.pass >= 90 ? "var(--amber)" : "var(--red)";
                const badge = r.pass >= 98 ? "green" : r.pass >= 90 ? "amber" : "red";
                return (
                  <tr key={r.cls}>
                    <td style={{ fontWeight: 500 }}>{r.cls}</td>
                    <td>{r.students}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="progress-bar" style={{ width: 60 }}>
                          <div className="progress-fill" style={{ width: `${r.avg}%`, background: "var(--accent)" }}></div>
                        </div>
                        <span className="mono" style={{ fontSize: 12 }}>{r.avg}%</span>
                      </div>
                    </td>
                    <td><span className={`badge ${badge}`}>{r.pass}%</span></td>
                    <td style={{ color: "var(--text-secondary)" }}>{r.topper}</td>
                    <td><button className="btn ghost sm">Detail</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function AttendanceReportsTab() {
  return (
    <>
      <div className="stats-row" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        {[
          { label: "Avg Attendance",  value: "94.2%", sub: "This Month",    color: "#10b981", ct: "↑ 1.8% vs last month", change: "up" },
          { label: "Perfect Attendance", value: "248", sub: "Students",    color: "#0066ff", ct: "No absences this term",  change: "" },
          { label: "Chronic Absent",  value: "8",     sub: "< 75%",        color: "#ef4444", ct: "↑ 2 new this week",     change: "down" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-label"><span className="dot" style={{ background: s.color }}></span>{s.label}</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{s.value}</div>
            <div className={`stat-change ${s.change}`}>{s.ct}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginTop: 20 }}>
        <div className="card-header">
          <div><div className="card-title">Class-wise Attendance</div><div className="card-sub">April 2026</div></div>
          <button className="btn sm">↓ Export CSV</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Class</th><th>Total</th><th>Avg Present</th><th>Avg Absent</th><th>Rate</th><th></th></tr></thead>
            <tbody>
              {[
                { cls: "Class 12-A", total: 34, pres: 33, abs: 1,  rate: 97 },
                { cls: "Class 10-A", total: 38, pres: 36, abs: 2,  rate: 94 },
                { cls: "Class 11-A", total: 38, pres: 35, abs: 3,  rate: 92 },
                { cls: "Class 9-C",  total: 36, pres: 32, abs: 4,  rate: 89 },
                { cls: "Class 8-B",  total: 40, pres: 35, abs: 5,  rate: 87 },
              ].map((r) => {
                const col = r.rate >= 90 ? "var(--green)" : r.rate >= 80 ? "var(--amber)" : "var(--red)";
                const badge = r.rate >= 90 ? "green" : r.rate >= 80 ? "amber" : "red";
                return (
                  <tr key={r.cls}>
                    <td style={{ fontWeight: 500 }}>{r.cls}</td>
                    <td>{r.total}</td>
                    <td>{r.pres}</td>
                    <td style={{ color: "var(--red)" }}>{r.abs}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="progress-bar" style={{ width: 80 }}>
                          <div className="progress-fill" style={{ width: `${r.rate}%`, background: col }}></div>
                        </div>
                        <span className="mono" style={{ fontSize: 12 }}>{r.rate}%</span>
                      </div>
                    </td>
                    <td><button className="btn ghost sm">Detail</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function FinancialReportsTab() {
  return (
    <>
      <div className="stats-row" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
        {[
          { label: "Total Revenue",  value: "₹48.2L", color: "#0066ff", change: "up", ct: "↑ 8% vs last year" },
          { label: "Fee Collection", value: "92.3%",  color: "#10b981", change: "up", ct: "₹4.8L collected" },
          { label: "Expenditure",    value: "₹8.4L",  color: "#f59e0b", change: "",   ct: "Operating costs" },
          { label: "Net Surplus",    value: "₹39.8L", color: "#8b5cf6", change: "up", ct: "↑ 12% vs last year" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-label"><span className="dot" style={{ background: s.color }}></span>{s.label}</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{s.value}</div>
            <div className={`stat-change ${s.change}`}>{s.ct}</div>
          </div>
        ))}
      </div>
      <div className="grid-2" style={{ marginTop: 20 }}>
        <div className="card">
          <div className="card-header">
            <div><div className="card-title">Monthly Collection</div><div className="card-sub">FY 2025–26</div></div>
          </div>
          <div className="card-body">
            {[
              { month: "January",  amt: 420000, target: 500000 },
              { month: "February", amt: 465000, target: 500000 },
              { month: "March",    amt: 490000, target: 500000 },
              { month: "April",    amt: 480000, target: 520000 },
            ].map((m) => {
              const pct = Math.round((m.amt / m.target) * 100);
              const col = pct >= 90 ? "var(--green)" : "var(--amber)";
              return (
                <div key={m.month} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                    <span style={{ fontWeight: 500 }}>{m.month}</span>
                    <span className="mono" style={{ fontSize: 12 }}>₹{(m.amt/100000).toFixed(1)}L / ₹{(m.target/100000).toFixed(1)}L</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${pct}%`, background: col }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="card-title">Top Fee Defaulters</div>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Student</th><th>Class</th><th>Due</th><th>Days</th></tr></thead>
              <tbody>
                {[
                  { name: "Priya Mehta",  cls: "8-B",  due: "₹10,000", days: 45 },
                  { name: "Jatin Kumar",  cls: "10-A", due: "₹7,500",  days: 32 },
                  { name: "Sourav Khan",  cls: "12-C", due: "₹8,000",  days: 38 },
                ].map((d, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{d.name}</td>
                    <td>{d.cls}</td>
                    <td className="mono" style={{ color: "var(--red)", fontWeight: 600, fontSize: 13 }}>{d.due}</td>
                    <td><span className="badge red">{d.days}d</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

function CustomAnalyticsTab() {
  return (
    <>
      <div style={{ marginBottom: 20, padding: "16px 20px", background: "var(--accent-light)", border: "1px solid #c7d9ff", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ fontSize: 28 }}>📊</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: "var(--accent)" }}>Custom Analytics Builder</div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>Build your own reports using any combination of metrics, date ranges, and filters.</div>
        </div>
        <button className="btn primary" style={{ marginLeft: "auto" }}>Build Report</button>
      </div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><div className="card-title">Metric</div></div>
          <div className="card-body">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Attendance Rate", "Fee Collection %", "Academic Performance", "Teacher Punctuality", "Assignment Completion"].map((m) => (
                <label key={m} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, cursor: "pointer" }}>
                  <input type="checkbox" defaultChecked={m.includes("Attendance") || m.includes("Fee")} />
                  {m}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Dimensions & Filters</div></div>
          <div className="card-body">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5, display: "block" }}>Group By</label>
                <select style={{ width: "100%" }}><option>Class</option><option>Section</option><option>Student</option><option>Teacher</option></select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5, display: "block" }}>Date Range</label>
                <select style={{ width: "100%" }}><option>This Month</option><option>Last 3 Months</option><option>This Academic Year</option><option>Custom...</option></select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5, display: "block" }}>Output Format</label>
                <select style={{ width: "100%" }}><option>Table</option><option>Export CSV</option><option>Export PDF</option></select>
              </div>
              <button className="btn primary full">Generate Report</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const TABS = [
  { id: "academic",    label: "Academic Reports" },
  { id: "attendance",  label: "Attendance Reports" },
  { id: "financial",   label: "Financial Reports" },
  { id: "analytics",   label: "Custom Analytics" },
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState("academic");
  const views = {
    academic:   <AcademicReportsTab />,
    attendance: <AttendanceReportsTab />,
    financial:  <FinancialReportsTab />,
    analytics:  <CustomAnalyticsTab />,
  };
  return (
    <>
      <div className="tab-row">
        {TABS.map((t) => (
          <div key={t.id} className={`tab${activeTab === t.id ? " active" : ""}`} onClick={() => setActiveTab(t.id)}>
            {t.label}
          </div>
        ))}
      </div>
      {views[activeTab]}
    </>
  );
}
