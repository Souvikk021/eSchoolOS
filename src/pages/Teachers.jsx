export default function Teachers() {
  return (
    <>
      <div className="input-row">
        <div className="input-wrap">
          <span className="input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input type="text" placeholder="Search teachers..." />
        </div>
        <select>
          <option>All Departments</option>
          <option>Science</option><option>Mathematics</option><option>Languages</option><option>Social Studies</option>
        </select>
        <div style={{ marginLeft: "auto" }}>
          <button className="btn primary">+ Add Teacher</button>
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Teacher</th><th>Employee ID</th><th>Subject</th><th>Classes</th><th>Phone</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {[
                { init: "RS", grad: "linear-gradient(135deg,#0066ff,#8b5cf6)", name: "Ramesh Sharma", sub2: "HOD Science", empId: "TCH001", subject: "Physics", classes: "11-A, 12-A, 12-B", phone: "98765 00001", status: "green", statusLabel: "Active" },
                { init: "AB", grad: "linear-gradient(135deg,#10b981,#0066ff)", name: "Anita Bose", sub2: "Class Teacher 8-B", empId: "TCH002", subject: "Mathematics", classes: "8-A, 8-B, 9-A", phone: "98765 00002", status: "amber", statusLabel: "On Leave" },
                { init: "VK", grad: "linear-gradient(135deg,#f59e0b,#ef4444)", name: "Vijay Kumar", sub2: "Class Teacher 10-A", empId: "TCH003", subject: "English", classes: "10-A, 10-B, 11-B", phone: "98765 00003", status: "green", statusLabel: "Active" },
              ].map((t) => (
                <tr key={t.empId}>
                  <td>
                    <div className="cell-user">
                      <div className="cell-avatar" style={{ background: t.grad }}>{t.init}</div>
                      <div>
                        <div style={{ fontWeight: 500 }}>{t.name}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{t.sub2}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="mono" style={{ fontSize: 12 }}>{t.empId}</span></td>
                  <td>{t.subject}</td>
                  <td>{t.classes}</td>
                  <td>{t.phone}</td>
                  <td><span className={`badge ${t.status}`}>{t.statusLabel}</span></td>
                  <td><button className="btn ghost sm">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
