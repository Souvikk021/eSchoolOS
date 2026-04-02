import Layout from "../components/Layout";

export default function Reports() {
  return (
    <Layout title="Reports & Analytics" subtitle="Insights overview">

      {/* ===== TABS ===== */}
      <div className="tab-row">
        <div className="tab active">Attendance Report</div>
        <div className="tab">Fee Report</div>
        <div className="tab">Student Performance</div>
      </div>

      {/* ===== STATS ===== */}
      <div className="stats-row reports">
        <div className="stat-card">
          <div className="stat-label"><span className="dot green"></span>Avg Attendance</div>
          <div className="stat-value">94.2%</div>
          <div className="stat-change">↑ 1.8% vs last month</div>
        </div>

        <div className="stat-card">
          <div className="stat-label"><span className="dot blue"></span>Fee Collection</div>
          <div className="stat-value">92.3%</div>
          <div className="stat-change">↑ ₹1.2L collected this week</div>
        </div>

        <div className="stat-card">
          <div className="stat-label"><span className="dot amber"></span>Defaulters</div>
          <div className="stat-value">142</div>
          <div className="stat-change down">↑ 12 new this month</div>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Class-wise Attendance Summary</div>
            <div className="card-sub">April 2026</div>
          </div>
          <button className="btn sm">↓ Export CSV</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Total Students</th>
              <th>Avg Present</th>
              <th>Avg Absent</th>
              <th>Attendance %</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Class 10-A</td>
              <td>38</td>
              <td>36</td>
              <td>2</td>
              <td>
                <div className="progress-inline">
                  <div className="progress-bar small">
                    <div className="progress-fill" style={{ width: "94%" }}></div>
                  </div>
                  <span className="mono">94%</span>
                </div>
              </td>
              <td><button className="btn sm">Detail</button></td>
            </tr>

            <tr>
              <td>Class 8-B</td>
              <td>40</td>
              <td>35</td>
              <td>5</td>
              <td>
                <div className="progress-inline">
                  <div className="progress-bar small">
                    <div className="progress-fill amber" style={{ width: "87%" }}></div>
                  </div>
                  <span className="mono">87%</span>
                </div>
              </td>
              <td><button className="btn sm">Detail</button></td>
            </tr>

            <tr>
              <td>Class 12-C</td>
              <td>35</td>
              <td>34</td>
              <td>1</td>
              <td>
                <div className="progress-inline">
                  <div className="progress-bar small">
                    <div className="progress-fill" style={{ width: "97%" }}></div>
                  </div>
                  <span className="mono">97%</span>
                </div>
              </td>
              <td><button className="btn sm">Detail</button></td>
            </tr>
          </tbody>
        </table>
      </div>

    </Layout>
  );
}
