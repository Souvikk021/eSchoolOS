import Layout from "../components/Layout";

export default function Attendance() {
  return (
    <Layout title="Attendance" subtitle="Track daily presence">

      {/* ===== TABS ===== */}
      <div className="tab-row">
        <div className="tab active">Mark Attendance</div>
        <div className="tab">Calendar View</div>
        <div className="tab">Reports</div>
      </div>

      {/* ===== TOP GRID ===== */}
      <div className="grid-2">

        {/* LEFT CARD */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Today — Apr 2, 2026</div>
              <div className="card-sub">Class 10-A · 38 students</div>
            </div>
            <div className="actions">
              <button className="btn sm">Mark All Present</button>
              <button className="btn primary sm">Save</button>
            </div>
          </div>

          <div className="card-body small">

            {/* STUDENT ROW */}
            <div className="att-row">
              <div className="cell-user">
                <div className="avatar">AR</div>
                Aarav Roy <span className="mono">001</span>
              </div>
              <div className="att-actions">
                <button className="btn sm active-green">✓ Present</button>
                <button className="btn sm">Absent</button>
              </div>
            </div>

            <div className="att-row">
              <div className="cell-user">
                <div className="avatar gradient">PM</div>
                Priya Mehta <span className="mono">002</span>
              </div>
              <div className="att-actions">
                <button className="btn sm">Present</button>
                <button className="btn sm active-red">✗ Absent</button>
              </div>
            </div>

            <div className="att-row">
              <div className="cell-user">
                <div className="avatar">SK</div>
                Sourav Khan <span className="mono">003</span>
              </div>
              <div className="att-actions">
                <button className="btn sm active-green">✓ Present</button>
                <button className="btn sm">Absent</button>
              </div>
            </div>

            <div className="att-more">+ 35 more students</div>

          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Monthly Overview</div>
              <div className="card-sub">March 2026</div>
            </div>
          </div>

          <div className="card-body">
            <div className="att-stats">
              <div>
                <div className="big green">94.2%</div>
                <div className="sub">Avg Attendance</div>
              </div>
              <div>
                <div className="big">23</div>
                <div className="sub">Working Days</div>
              </div>
              <div>
                <div className="big red">4</div>
                <div className="sub">Holidays</div>
              </div>
            </div>

            <div className="legend">
              <span><span className="dot green"></span>Present</span>
              <span><span className="dot red"></span>Absent</span>
              <span><span className="dot gray"></span>Holiday</span>
            </div>

            <div className="progress-wrap">
              <div className="progress-head">
                <span>Overall attendance rate</span>
                <span>94.2%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "94%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== ALERT CARD ===== */}
      <div className="card alert">
        <div className="card-header">
          <div>
            <div className="card-title red">Absent Today — 3 students</div>
            <div className="card-sub">SMS notifications sent</div>
          </div>
          <button className="btn sm">Send Reminder</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Class</th>
              <th>Parent Contact</th>
              <th>Consecutive Absences</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="cell-user"><div className="avatar gradient">PM</div>Priya Mehta</td>
              <td>8-B</td>
              <td>99887 76655</td>
              <td><span className="badge red">3 days</span></td>
            </tr>

            <tr>
              <td className="cell-user"><div className="avatar gradient2">JK</div>Jatin Kumar</td>
              <td>10-A</td>
              <td>98765 11223</td>
              <td><span className="badge amber">1 day</span></td>
            </tr>
          </tbody>
        </table>
      </div>

    </Layout>
  );
}
