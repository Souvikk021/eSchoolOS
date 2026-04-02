export default function Classes() {
  return (
    <div className="grid-2">
      {/* Classes Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">Classes</div>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="btn primary sm">+ Add Class</button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Class Name</th><th>Sections</th><th>Students</th><th></th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Class 6", secs: "A, B, C", students: 110 },
                { name: "Class 7", secs: "A, B, C, D", students: 148 },
                { name: "Class 8", secs: "A, B, C", students: 115 },
                { name: "Class 9", secs: "A, B, C, D", students: 152 },
                { name: "Class 10", secs: "A, B, C", students: 112 },
                { name: "Class 11", secs: "A, B (Science), C (Commerce)", students: 98 },
                { name: "Class 12", secs: "A, B (Science), C (Commerce)", students: 92 },
              ].map((c) => (
                <tr key={c.name}>
                  <td>{c.name}</td>
                  <td>{c.secs}</td>
                  <td>{c.students}</td>
                  <td><button className="btn ghost sm">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sections */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">Sections</div>
          <button className="btn primary sm">+ Add Section</button>
        </div>
        <div className="card-body">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <span className="badge blue" style={{ fontSize: 13, padding: "6px 12px" }}>Section A</span>
            <span className="badge green" style={{ fontSize: 13, padding: "6px 12px" }}>Section B</span>
            <span className="badge amber" style={{ fontSize: 13, padding: "6px 12px" }}>Section C</span>
            <span className="badge purple" style={{ fontSize: 13, padding: "6px 12px" }}>Section D</span>
          </div>
        </div>
      </div>
    </div>
  );
}
