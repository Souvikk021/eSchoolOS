import Layout from "../components/Layout";

export default function Teachers() {
  return (
    <Layout
      title="Teachers"
      subtitle="Staff management"
      action={<button className="btn primary">+ Add Teacher</button>}
    >

      {/* ===== FILTER BAR ===== */}
      <div className="input-row">
        <input className="input" placeholder="Search teachers..." />

        <select className="input">
          <option>All Departments</option>
          <option>Science</option>
          <option>Mathematics</option>
          <option>Languages</option>
        </select>

        <div className="actions">
          <button className="btn primary">+ Add Teacher</button>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Teacher</th>
              <th>Employee ID</th>
              <th>Subject</th>
              <th>Classes</th>
              <th>Phone</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="cell-user">
                <div className="avatar gradient-blue">RS</div>
                <div>
                  <div className="name">Ramesh Sharma</div>
                  <div className="sub">HOD Science</div>
                </div>
              </td>
              <td className="mono">TCH001</td>
              <td>Physics</td>
              <td>11-A, 12-A, 12-B</td>
              <td>98765 00001</td>
              <td><span className="badge green">Active</span></td>
              <td><button className="btn sm">View</button></td>
            </tr>

            <tr>
              <td className="cell-user">
                <div className="avatar">AB</div>
                <div>
                  <div className="name">Anita Bose</div>
                  <div className="sub">Class Teacher 8-B</div>
                </div>
              </td>
              <td className="mono">TCH002</td>
              <td>Mathematics</td>
              <td>8-A, 8-B, 9-A</td>
              <td>98765 00002</td>
              <td><span className="badge amber">On Leave</span></td>
              <td><button className="btn sm">View</button></td>
            </tr>

            <tr>
              <td className="cell-user">
                <div className="avatar gradient">VK</div>
                <div>
                  <div className="name">Vijay Kumar</div>
                  <div className="sub">Class Teacher 10-A</div>
                </div>
              </td>
              <td className="mono">TCH003</td>
              <td>English</td>
              <td>10-A, 10-B, 11-B</td>
              <td>98765 00003</td>
              <td><span className="badge green">Active</span></td>
              <td><button className="btn sm">View</button></td>
            </tr>
          </tbody>
        </table>
      </div>

    </Layout>
  );
}
