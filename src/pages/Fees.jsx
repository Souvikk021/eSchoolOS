import { useState } from "react";

export default function Fees() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="tab-row">
        {["Collect Fee", "Fee Records", "Due List", "Reports"].map((t, i) => (
          <div key={t} className={`tab${activeTab === i ? " active" : ""}`} onClick={() => setActiveTab(i)}>{t}</div>
        ))}
      </div>

      <div className="grid-2">
        {/* Collect Fee Form */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Collect Fee</div>
          </div>
          <div className="card-body">
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5, display: "block" }}>Student</label>
                <div className="input-wrap" style={{ width: "100%" }}>
                  <span className="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </span>
                  <input type="text" placeholder="Search student by name or roll..." style={{ width: "100%" }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5, display: "block" }}>Fee Type</label>
                  <select style={{ width: "100%" }}>
                    <option>Tuition Fee</option><option>Transport Fee</option>
                    <option>Library Fee</option><option>Exam Fee</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5, display: "block" }}>Month</label>
                  <select style={{ width: "100%" }}>
                    <option>April 2026</option><option>March 2026</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5, display: "block" }}>Amount (₹)</label>
                  <input type="text" placeholder="5,000" style={{ width: "100%", fontFamily: "'DM Mono', monospace" }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5, display: "block" }}>Payment Mode</label>
                  <select style={{ width: "100%" }}>
                    <option>Cash</option><option>Online / UPI</option><option>Cheque</option><option>DD</option>
                  </select>
                </div>
              </div>

              <button className="btn primary" style={{ width: "100%", height: 40, fontSize: 14, justifyContent: "center" }}>
                Collect ₹5,000
              </button>
            </div>
          </div>
        </div>

        {/* Recent Receipts */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Recent Receipts</div>
          </div>
          <div>
            {[
              { name: "Aarav Roy — Class 10-A", sub: "Tuition Fee · April · Cash", amount: "₹5,000", color: "var(--green)", date: "Apr 2" },
              { name: "Neha Das — Class 6-A", sub: "Tuition Fee · April · UPI", amount: "₹4,000", color: "var(--green)", date: "Apr 2" },
              { name: "Rohit Gupta — Class 9-D", sub: "Transport Fee · April · Cheque", amount: "₹2,500", color: "var(--green)", date: "Apr 1" },
              { name: "Sourav Khan — Class 12-C", sub: "Tuition Fee · March · Cash", amount: "₹3,000", color: "var(--amber)", date: "Mar 30", partial: true },
            ].map((r, i) => (
              <div key={i} className="receipt-row">
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{r.sub}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, fontFamily: "'DM Mono', monospace", color: r.color }}>
                    {r.amount}{r.partial && <span style={{ fontSize: 10 }}> partial</span>}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{r.date}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: "12px 20px", borderTop: "1px solid var(--border-light)" }}>
            <button className="btn sm full">View All Receipts</button>
          </div>
        </div>
      </div>
    </>
  );
}
