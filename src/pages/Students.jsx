import Layout from "../components/Layout";

export default function Students() {
  return (
    <Layout
      title="Students"
      subtitle="Manage student roster"
      action={<button className="btn primary">+ Add Student</button>}
    >
      {/* ===== FILTER BAR ===== */}
      <div className="input-row">
        <input className="input" placeholder="Search students..." />

        <select className="input">
          <option>All Classes</option>
          <option>Class 6</option>
          <option>Class 7</option>
          <option>Class 8</option>
          <option>Class 9</option>
          <option>Class 10</option>
        </select>

        <select className="input">
          <option>All Sections</option>
          <option>Section A</option>
          <option>Section B</option>
          <option>Section C</option>
        </select>

        <div className="actions">
          <button className="btn">↑ Import CSV</button>
          <button className="btn primary">+ Add Student</button>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="card">
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
            <tr>
              <td className="cell-user">
                <div className="avatar">AR</div>
                <div>
                  <div className="name">Aarav Roy</div>
                  <div className="sub">aarav@school.edu</div>
                </div>
              </td>
              <td className="mono">001</td>
              <td>Class 10</td>
              <td>Section A</td>
              <td>98765 43210</td>
              <td><span className="badge green">Active</span></td>
              <td><button className="btn sm">View</button></td>
            </tr>

            <tr>
              <td className="cell-user">
                <div className="avatar gradient">PM</div>
                <div>
                  <div className="name">Priya Mehta</div>
                  <div className="sub">priya@school.edu</div>
                </div>
              </td>
              <td className="mono">002</td>
              <td>Class 8</td>
              <td>Section B</td>
              <td>99887 76655</td>
              <td><span className="badge green">Active</span></td>
              <td><button className="btn sm">View</button></td>
            </tr>

            <tr>
              <td className="cell-user">
                <div className="avatar">SK</div>
                <div>
                  <div className="name">Sourav Khan</div>
                  <div className="sub">sourav@school.edu</div>
                </div>
              </td>
              <td className="mono">003</td>
              <td>Class 12</td>
              <td>Section C</td>
              <td>97654 32100</td>
              <td><span className="badge amber">Inactive</span></td>
              <td><button className="btn sm">View</button></td>
            </tr>

            <tr>
              <td className="cell-user">
                <div className="avatar gradient2">ND</div>
                <div>
                  <div className="name">Neha Das</div>
                  <div className="sub">neha@school.edu</div>
                </div>
              </td>
              <td className="mono">004</td>
              <td>Class 6</td>
              <td>Section A</td>
              <td>91234 56789</td>
              <td><span className="badge green">Active</span></td>
              <td><button className="btn sm">View</button></td>
            </tr>
          </tbody>
        </table>

        {/* ===== FOOTER ===== */}
        <div className="table-footer">
          <span>Showing 4 of 1,284 students</span>
          <div className="pagination">
            <button className="btn sm">← Prev</button>
            <button className="btn primary sm">Next →</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
