import Layout from "../components/Layout";

export default function Fees() {
  return (
    <Layout title="Fees" subtitle="Collect & manage payments">

      {/* ===== TABS ===== */}
      <div className="tab-row">
        <div className="tab active">Collect Fee</div>
        <div className="tab">Fee Records</div>
        <div className="tab">Due List</div>
        <div className="tab">Reports</div>
      </div>

      <div className="grid-2">

        {/* ===== LEFT FORM ===== */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Collect Fee</div>
          </div>

          <div className="card-body">
            <div className="form">

              <div className="form-group">
                <label>Student</label>
                <input className="input full" placeholder="Search student by name or roll..." />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Fee Type</label>
                  <select className="input full">
                    <option>Tuition Fee</option>
                    <option>Transport Fee</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Month</label>
                  <select className="input full">
                    <option>April 2026</option>
                    <option>March 2026</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Amount (₹)</label>
                  <input className="input full mono" placeholder="5,000" />
                </div>
                <div className="form-group">
                  <label>Payment Mode</label>
                  <select className="input full">
                    <option>Cash</option>
                    <option>UPI</option>
                    <option>Cheque</option>
                  </select>
                </div>
              </div>

              <button className="btn primary full big">Collect ₹5,000</button>

            </div>
          </div>
        </div>

        {/* ===== RIGHT RECEIPTS ===== */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Recent Receipts</div>
          </div>

          <div className="receipt-list">

            <div className="receipt-row">
              <div>
                <div className="name">Aarav Roy — Class 10-A</div>
                <div className="sub">Tuition Fee · April · Cash</div>
              </div>
              <div className="right">
                <div className="amount green">₹5,000</div>
                <div className="sub">Apr 2</div>
              </div>
            </div>

            <div className="receipt-row">
              <div>
                <div className="name">Neha Das — Class 6-A</div>
                <div className="sub">Tuition Fee · April · UPI</div>
              </div>
              <div className="right">
                <div className="amount green">₹4,000</div>
                <div className="sub">Apr 2</div>
              </div>
            </div>

            <div className="receipt-row">
              <div>
                <div className="name">Rohit Gupta — Class 9-D</div>
                <div className="sub">Transport Fee · April · Cheque</div>
              </div>
              <div className="right">
                <div className="amount green">₹2,500</div>
                <div className="sub">Apr 1</div>
              </div>
            </div>

            <div className="receipt-row">
              <div>
                <div className="name">Sourav Khan — Class 12-C</div>
                <div className="sub">Tuition Fee · March · Cash</div>
              </div>
              <div className="right">
                <div className="amount amber">₹3,000 partial</div>
                <div className="sub">Mar 30</div>
              </div>
            </div>

          </div>

          <div className="receipt-footer">
            <button className="btn full">View All Receipts</button>
          </div>
        </div>

      </div>

    </Layout>
  );
}
