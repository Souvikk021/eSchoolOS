export default function Students() {
  return (
    <>
      {/* ── FILTER BAR ── */}
      <div className="input-row">
        <div className="input-wrap">
          <span className="input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input type="text" placeholder="Search students..." />
        </div>
        <select>
          <option>All Classes</option>
          <option>Class 6</option><option>Class 7</option><option>Class 8</option>
          <option>Class 9</option><option>Class 10</option><option>Class 11</option><option>Class 12</option>
        </select>
        <select>
          <option>All Sections</option>
          <option>Section A</option><option>Section B</option><option>Section C</option><option>Section D</option>
        </select>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button className="btn">↑ Import CSV</button>
          <button className="btn primary">+ Add Student</button>
        </div>
      </div>

      {/* ── TABLE ── */}
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No.</th>
                <th>Class</th>
                <th>Section</th>
                <th>Phone</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {[
                { init: "AR", grad: null, name: "Aarav Roy", email: "aarav@school.edu", roll: "001", cls: "Class 10", sec: "Section A", phone: "98765 43210", status: "green", statusLabel: "Active" },
                { init: "PM", grad: "linear-gradient(135deg,#f59e0b,#ef4444)", name: "Priya Mehta", email: "priya@school.edu", roll: "002", cls: "Class 8", sec: "Section B", phone: "99887 76655", status: "green", statusLabel: "Active" },
                { init: "SK", grad: "linear-gradient(135deg,#10b981,#0066ff)", name: "Sourav Khan", email: "sourav@school.edu", roll: "003", cls: "Class 12", sec: "Section C", phone: "97654 32100", status: "amber", statusLabel: "Inactive" },
                { init: "ND", grad: "linear-gradient(135deg,#8b5cf6,#ec4899)", name: "Neha Das", email: "neha@school.edu", roll: "004", cls: "Class 6", sec: "Section A", phone: "91234 56789", status: "green", statusLabel: "Active" },
              ].map((s) => (
                <tr key={s.roll}>
                  <td>
                    <div className="cell-user">
                      <div className="cell-avatar" style={s.grad ? { background: s.grad } : {}}>{s.init}</div>
                      <div>
                        <div style={{ fontWeight: 500 }}>{s.name}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="mono" style={{ fontSize: 13 }}>{s.roll}</span></td>
                  <td>{s.cls}</td>
                  <td>{s.sec}</td>
                  <td>{s.phone}</td>
                  <td><span className={`badge ${s.status}`}>{s.statusLabel}</span></td>
                  <td><button className="btn ghost sm">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: "14px 16px", borderTop: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Showing 4 of 1,284 students</span>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="btn sm">← Prev</button>
            <button className="btn primary sm">Next →</button>
          </div>
        </div>
      </div>
    </>
  );
}