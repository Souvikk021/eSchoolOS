import { useState } from "react";

const CLASSES = ["All Classes", "6-A", "6-B", "7-A", "7-B", "8-A", "8-B", "9-A", "9-B", "10-A", "10-B", "11-S", "12-S"];

const STUDENTS = [
  { id: 1, name: "Aarav Roy",     initials: "AR", class: "10-A", roll: "01", color: "linear-gradient(135deg,#0066ff,#6366f1)" },
  { id: 2, name: "Priya Mehta",   initials: "PM", class: "8-B",  roll: "14", color: "linear-gradient(135deg,#f59e0b,#ef4444)" },
  { id: 3, name: "Sourav Khan",   initials: "SK", class: "12-S", roll: "22", color: "linear-gradient(135deg,#10b981,#0066ff)" },
  { id: 4, name: "Neha Das",      initials: "ND", class: "6-A",  roll: "03", color: "linear-gradient(135deg,#8b5cf6,#ec4899)" },
  { id: 5, name: "Rohit Gupta",   initials: "RG", class: "9-A",  roll: "08", color: "linear-gradient(135deg,#ef4444,#f59e0b)" },
  { id: 6, name: "Ananya Singh",  initials: "AS", class: "10-A", roll: "02", color: "linear-gradient(135deg,#06b6d4,#0066ff)" },
  { id: 7, name: "Karan Sharma",  initials: "KS", class: "11-S", roll: "17", color: "linear-gradient(135deg,#10b981,#059669)" },
  { id: 8, name: "Riya Bose",     initials: "RB", class: "7-B",  roll: "11", color: "linear-gradient(135deg,#ec4899,#8b5cf6)" },
];

const TODAY = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short", year: "numeric" });

export default function Attendance() {
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [attendance, setAttendance] = useState(
    Object.fromEntries(STUDENTS.map(s => [s.id, null]))
  );
  const [saved, setSaved] = useState(false);

  const filtered = STUDENTS.filter(s => selectedClass === "All Classes" || s.class === selectedClass);

  function mark(id, status) {
    setAttendance(a => ({ ...a, [id]: status }));
    setSaved(false);
  }

  function markAll(status) {
    const next = {};
    filtered.forEach(s => { next[s.id] = status; });
    setAttendance(a => ({ ...a, ...next }));
    setSaved(false);
  }

  const present = filtered.filter(s => attendance[s.id] === "present").length;
  const absent  = filtered.filter(s => attendance[s.id] === "absent").length;
  const late    = filtered.filter(s => attendance[s.id] === "late").length;
  const unmarked = filtered.filter(s => attendance[s.id] === null).length;
  const pct = filtered.length ? Math.round(((present + late) / filtered.length) * 100) : 0;

  return (
    <>
      {/* ── STATS ── */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label"><span className="dot" style={{ background: "#10b981" }} />Present</div>
          <div className="stat-value">{present}</div>
          <div className="stat-change up">{pct}% attendance rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><span className="dot" style={{ background: "#ef4444" }} />Absent</div>
          <div className="stat-value">{absent}</div>
          <div className="stat-change down">{absent > 0 ? `${absent} notified` : "All present"}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><span className="dot" style={{ background: "#f59e0b" }} />Late</div>
          <div className="stat-value">{late}</div>
          <div className="stat-change" style={{ color: "var(--text-muted)" }}>marked late today</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><span className="dot" style={{ background: "#9ca3af" }} />Unmarked</div>
          <div className="stat-value">{unmarked}</div>
          <div className="stat-change" style={{ color: "var(--text-muted)" }}>of {filtered.length} students</div>
        </div>
      </div>

      {/* ── MAIN CARD ── */}
      <div className="card" style={{ marginTop: 0 }}>
        <div className="card-header">
          <div>
            <div className="card-title">Mark Attendance</div>
            <div className="card-sub">{TODAY}</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            {/* Class filter */}
            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              style={{
                height: 32, border: "1px solid var(--border)", borderRadius: 7,
                padding: "0 10px", fontSize: 13, fontFamily: "inherit",
                background: "#fff", color: "var(--text-primary)", outline: "none",
              }}
            >
              {CLASSES.map(c => <option key={c}>{c}</option>)}
            </select>

            {/* Bulk actions */}
            <button
              onClick={() => markAll("present")}
              style={{ height: 32, padding: "0 12px", fontSize: 12, fontWeight: 500, border: "1px solid #d1fae5", borderRadius: 7, background: "#ecfdf5", color: "#059669", cursor: "pointer" }}
            >✓ All Present</button>
            <button
              onClick={() => markAll("absent")}
              style={{ height: 32, padding: "0 12px", fontSize: 12, fontWeight: 500, border: "1px solid #fee2e2", borderRadius: 7, background: "#fef2f2", color: "#dc2626", cursor: "pointer" }}
            >✗ All Absent</button>

            {/* Save */}
            <button
              onClick={() => setSaved(true)}
              style={{
                height: 32, padding: "0 16px", fontSize: 13, fontWeight: 500,
                border: "none", borderRadius: 7,
                background: saved ? "#ecfdf5" : "var(--blue)",
                color: saved ? "#059669" : "#fff", cursor: "pointer",
                transition: "all 0.2s",
              }}
            >{saved ? "✓ Saved" : "Save Attendance"}</button>
          </div>
        </div>

        {/* Progress bar */}
        {filtered.length > 0 && (
          <div style={{ padding: "0 20px 12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)", marginBottom: 5 }}>
              <span>{present + late} of {filtered.length} marked present/late</span>
              <span>{pct}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${pct}%`, background: pct >= 90 ? "#10b981" : pct >= 75 ? "#f59e0b" : "#ef4444" }} />
            </div>
          </div>
        )}

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Roll No.</th>
                <th style={{ textAlign: "center" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => {
                const status = attendance[s.id];
                return (
                  <tr key={s.id}>
                    <td>
                      <div className="cell-user">
                        <div className="cell-avatar" style={{ background: s.color }}>{s.initials}</div>
                        {s.name}
                      </div>
                    </td>
                    <td>{s.class}</td>
                    <td style={{ fontFamily: "'DM Mono', monospace", fontSize: 13 }}>{s.roll}</td>
                    <td>
                      <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                        {[
                          { key: "present", label: "P", color: "#059669", bg: "#ecfdf5", border: "#a7f3d0" },
                          { key: "late",    label: "L", color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
                          { key: "absent",  label: "A", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
                        ].map(({ key, label, color, bg, border }) => (
                          <button
                            key={key}
                            onClick={() => mark(s.id, status === key ? null : key)}
                            style={{
                              width: 28, height: 28, borderRadius: 6, fontSize: 12, fontWeight: 700,
                              border: `1.5px solid ${status === key ? border : "var(--border)"}`,
                              background: status === key ? bg : "#fff",
                              color: status === key ? color : "var(--text-muted)",
                              cursor: "pointer", transition: "all 0.15s",
                            }}
                          >{label}</button>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={4} style={{ textAlign: "center", color: "var(--text-muted)", padding: 32 }}>No students in this class</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
