import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  return (
    <Layout title="Dashboard" subtitle="April 2, 2026">
      {/* ===== STATS ROW ===== */}
      <div className="stats-row">
        <StatCard label="Total Students" value="1,284" color="#0066ff" sub="↑ 12 this month" />
        <StatCard label="Today's Attendance" value="94.2%" color="#10b981" sub="↑ 2.1% vs yesterday" />
        <StatCard label="Fees Collected" value="₹4.8L" color="#f59e0b" sub="↓ ₹40k pending" down />
        <StatCard label="Teachers" value="68" color="#8b5cf6" sub="3 on leave today" />
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <div className="quick-actions">
        <div className="quick-card">
          <div className="quick-icon blue"></div>
          <div>
            <div className="quick-label">Students</div>
            <div className="quick-sub">1,284 enrolled</div>
          </div>
        </div>
        <div className="quick-card">
          <div className="quick-icon green"></div>
          <div>
            <div className="quick-label">Attendance</div>
            <div className="quick-sub">Mark today's</div>
          </div>
        </div>
        <div className="quick-card">
          <div className="quick-icon amber"></div>
          <div>
            <div className="quick-label">Fees</div>
            <div className="quick-sub">12 pending</div>
          </div>
        </div>
        <div className="quick-card">
          <div className="quick-icon purple"></div>
          <div>
            <div className="quick-label">Teachers</div>
            <div className="quick-sub">68 active</div>
          </div>
        </div>
      </div>

      {/* ===== GRID ===== */}
      <div className="grid-2">
        {/* Recent Admissions */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Recent Admissions</div>
              <div className="card-sub">Last 5 students</div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Aarav Roy</td><td>10-A</td><td>Apr 1</td><td className="badge green">Active</td></tr>
              <tr><td>Priya Mehta</td><td>8-B</td><td>Mar 28</td><td className="badge green">Active</td></tr>
              <tr><td>Sourav Khan</td><td>12-C</td><td>Mar 25</td><td className="badge amber">Pending</td></tr>
              <tr><td>Neha Das</td><td>6-A</td><td>Mar 22</td><td className="badge green">Active</td></tr>
              <tr><td>Rohit Gupta</td><td>9-D</td><td>Mar 20</td><td className="badge green">Active</td></tr>
            </tbody>
          </table>
        </div>

        {/* Fee Overview */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Fee Collection Overview</div>
              <div className="card-sub">April 2026</div>
            </div>
          </div>

          <div className="card-body">
            <div className="progress-wrap">
              <div className="progress-head">
                <span>Collected</span>
                <span>₹4,80,000 / ₹5,20,000</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "92%" }}></div>
              </div>
            </div>

            <div className="fee-stats">
              <div className="fee-box green">
                <div>PAID</div>
                <h3>1,142</h3>
                <span>students</span>
              </div>
              <div className="fee-box red">
                <div>PENDING</div>
                <h3>142</h3>
                <span>students</span>
              </div>
              <div className="fee-box amber">
                <div>PARTIAL</div>
                <h3>38</h3>
                <span>students</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
