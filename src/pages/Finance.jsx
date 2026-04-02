import { useState } from "react";

/* ─── Fees Sub-view ─── */
function FeesTab() {
  return (
    <div className="grid-2">
      {/* Collect Fee Form */}
      <div className="card">
        <div className="card-header"><div className="card-title">Collect Fee</div></div>
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
                <input type="text" placeholder="Search by name or roll no..." style={{ width: "100%" }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5, display: "block" }}>Fee Type</label>
                <select style={{ width: "100%" }}>
                  <option>Tuition Fee</option><option>Transport Fee</option><option>Library Fee</option><option>Exam Fee</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5, display: "block" }}>Month</label>
                <select style={{ width: "100%" }}><option>April 2026</option><option>March 2026</option></select>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5, display: "block" }}>Amount (₹)</label>
                <input type="text" placeholder="5,000" style={{ width: "100%", fontFamily: "'DM Mono', monospace" }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5, display: "block" }}>Payment Mode</label>
                <select style={{ width: "100%" }}><option>Cash</option><option>UPI / Online</option><option>Cheque</option><option>DD</option></select>
              </div>
            </div>
            <button className="btn primary" style={{ width: "100%", height: 42, fontSize: 14, justifyContent: "center" }}>
              Collect ₹5,000
            </button>
          </div>
        </div>
      </div>

      {/* Recent Receipts */}
      <div className="card">
        <div className="card-header"><div className="card-title">Recent Receipts</div></div>
        {[
          { name: "Aarav Roy — Class 10-A",   sub: "Tuition Fee · April · Cash",    amount: "₹5,000", color: "var(--green)",  partial: false, date: "Apr 2" },
          { name: "Neha Das — Class 6-A",     sub: "Tuition Fee · April · UPI",     amount: "₹4,000", color: "var(--green)",  partial: false, date: "Apr 2" },
          { name: "Rohit Gupta — Class 9-D",  sub: "Transport Fee · April · Cheque",amount: "₹2,500", color: "var(--green)",  partial: false, date: "Apr 1" },
          { name: "Sourav Khan — Class 12-C", sub: "Tuition Fee · March · Cash",    amount: "₹3,000", color: "var(--amber)",  partial: true,  date: "Mar 30" },
        ].map((r, i) => (
          <div key={i} className="receipt-row">
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{r.name}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{r.sub}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 600, fontFamily: "'DM Mono',monospace", color: r.color }}>
                {r.amount}{r.partial && <span style={{ fontSize: 10 }}> partial</span>}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{r.date}</div>
            </div>
          </div>
        ))}
        <div style={{ padding: "12px 20px", borderTop: "1px solid var(--border-light)" }}>
          <button className="btn sm full">View All Receipts</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Online Payments Sub-view ─── */
function OnlinePaymentsTab() {
  const txns = [
    { name: "Aarav Roy",   roll: "001", amount: "₹5,000", method: "UPI",        txnId: "pay_Rm9Xa", status: "green", label: "Success",  date: "Apr 2" },
    { name: "Priya Mehta", roll: "002", amount: "₹4,000", method: "Razorpay",   txnId: "pay_Tc8Lq", status: "green", label: "Success",  date: "Apr 2" },
    { name: "Neha Das",    roll: "004", amount: "₹5,000", method: "Net Banking", txnId: "pay_Bk3Wz", status: "amber", label: "Pending",  date: "Apr 1" },
    { name: "Jatin Kumar", roll: "007", amount: "₹3,500", method: "UPI",        txnId: "pay_Qn2Yr", status: "red",   label: "Failed",   date: "Mar 31" },
    { name: "Rohit Gupta", roll: "005", amount: "₹2,500", method: "Card",       txnId: "pay_Mn5Pk", status: "green", label: "Success",  date: "Mar 30" },
  ];
  return (
    <>
      {/* Razorpay Integration Banner */}
      <div className="card" style={{ marginBottom: 20, background: "linear-gradient(135deg,#0066ff,#8b5cf6)", border: "none" }}>
        <div className="card-body" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 4 }}>Razorpay Integration Active</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>
              Accepting UPI, Cards, Net Banking, Wallets — auto-reconciled with student accounts
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <button className="btn" style={{ background: "white", color: "#0066ff", borderColor: "white" }}>Configure</button>
            <button className="btn" style={{ background: "rgba(255,255,255,0.2)", color: "white", borderColor: "rgba(255,255,255,0.3)" }}>View Dashboard</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 20 }}>
        {[
          { label: "Today's Collection", value: "₹24,500", sub: "8 transactions", color: "#0066ff" },
          { label: "This Month",         value: "₹4.8L",   sub: "via online",     color: "#10b981" },
          { label: "Pending",            value: "₹40,000", sub: "142 students",   color: "#f59e0b" },
          { label: "Failed Txns",        value: "3",       sub: "retry needed",   color: "#ef4444" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-label"><span className="dot" style={{ background: s.color }}></span>{s.label}</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{s.value}</div>
            <div className="stat-change" style={{ color: "var(--text-muted)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div><div className="card-title">Transaction History</div><div className="card-sub">April 2026</div></div>
          <button className="btn sm">↓ Export</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Student</th><th>Txn ID</th><th>Amount</th><th>Method</th><th>Date</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {txns.map((t) => (
                <tr key={t.txnId}>
                  <td>
                    <div className="cell-user">
                      <div className="cell-avatar">{t.name.split(" ").map(n=>n[0]).join("")}</div>
                      <div>
                        <div style={{ fontWeight: 500 }}>{t.name}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Roll #{t.roll}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="mono" style={{ fontSize: 11 }}>{t.txnId}</span></td>
                  <td><span style={{ fontWeight: 600, fontFamily: "'DM Mono',monospace", color: "var(--text-primary)" }}>{t.amount}</span></td>
                  <td>{t.method}</td>
                  <td style={{ color: "var(--text-muted)", fontSize: 12 }}>{t.date}</td>
                  <td><span className={`badge ${t.status}`}>{t.label}</span></td>
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

/* ─── Payroll Sub-view ─── */
function PayrollTab() {
  const staff = [
    { name: "Ramesh Sharma", role: "HOD Physics",   empId: "TCH001", basic: 65000, hra: 13000, da: 6500,  deduct: 8450,  net: 76050, status: "green" },
    { name: "Anita Bose",    role: "Sr. Teacher",   empId: "TCH002", basic: 55000, hra: 11000, da: 5500,  deduct: 7150,  net: 64350, status: "green" },
    { name: "Vijay Kumar",   role: "Class Teacher", empId: "TCH003", basic: 50000, hra: 10000, da: 5000,  deduct: 6500,  net: 58500, status: "amber" },
    { name: "Sunita Rao",    role: "Accountant",    empId: "ACC001", basic: 45000, hra: 9000,  da: 4500,  deduct: 5850,  net: 52650, status: "green" },
  ];
  return (
    <>
      <div className="stats-row" style={{ gridTemplateColumns: "repeat(3,1fr)", marginBottom: 20 }}>
        {[
          { label: "Total Payroll",   value: "₹8.4L", sub: "April 2026",  color: "#0066ff" },
          { label: "Staff Count",     value: "68",    sub: "active staff", color: "#10b981" },
          { label: "Pending Approval",value: "4",     sub: "this month",  color: "#f59e0b" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-label"><span className="dot" style={{ background: s.color }}></span>{s.label}</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{s.value}</div>
            <div className="stat-change" style={{ color: "var(--text-muted)" }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-header">
          <div><div className="card-title">Payroll — April 2026</div></div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn sm">Generate Slip</button>
            <button className="btn primary sm">Process Payroll</button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Employee</th><th>Emp ID</th><th>Basic</th><th>HRA</th><th>DA</th><th>Deductions</th><th>Net Pay</th><th>Status</th></tr></thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s.empId}>
                  <td>
                    <div className="cell-user">
                      <div className="cell-avatar">{s.name.split(" ").map(n=>n[0]).join("")}</div>
                      <div>
                        <div style={{ fontWeight: 500 }}>{s.name}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.role}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="mono" style={{ fontSize: 12 }}>{s.empId}</span></td>
                  {[s.basic, s.hra, s.da, s.deduct].map((v, i) => (
                    <td key={i} className="mono" style={{ fontSize: 12 }}>₹{v.toLocaleString()}</td>
                  ))}
                  <td><strong className="mono" style={{ fontSize: 13, color: "var(--green)" }}>₹{s.net.toLocaleString()}</strong></td>
                  <td><span className={`badge ${s.status}`}>{s.status === "green" ? "Processed" : "Pending"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ─── Expenses Sub-view ─── */
function ExpensesTab() {
  const expenses = [
    { title: "Electricity Bill",     category: "Utilities",   amount: 28500,  date: "Apr 1",  receipt: true,  status: "green" },
    { title: "Lab Equipment Repair", category: "Maintenance", amount: 12000,  date: "Apr 2",  receipt: true,  status: "green" },
    { title: "Sports Equipment",     category: "Academics",   amount: 45000,  date: "Apr 3",  receipt: false, status: "amber" },
    { title: "Stationery Purchase",  category: "Admin",       amount: 8500,   date: "Mar 30", receipt: true,  status: "green" },
    { title: "AC Service Charges",   category: "Maintenance", amount: 15000,  date: "Mar 28", receipt: true,  status: "green" },
  ];
  const catColors = { Utilities: "blue", Maintenance: "amber", Academics: "purple", Admin: "green" };
  return (
    <>
      <div className="input-row" style={{ marginBottom: 16 }}>
        <select><option>All Categories</option><option>Utilities</option><option>Maintenance</option><option>Academics</option><option>Admin</option></select>
        <select><option>April 2026</option><option>March 2026</option></select>
        <div style={{ marginLeft: "auto" }}><button className="btn primary">+ Log Expense</button></div>
      </div>
      <div className="grid-2" style={{ marginBottom: 20 }}>
        {[
          { label: "Total Expenses", value: "₹1,09,000", sub: "April 2026", color: "#0066ff" },
          { label: "Pending Bills",  value: "₹45,000",   sub: "3 items",    color: "#f59e0b" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-label"><span className="dot" style={{ background: s.color }}></span>{s.label}</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{s.value}</div>
            <div className="stat-change" style={{ color: "var(--text-muted)" }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Description</th><th>Category</th><th>Amount</th><th>Date</th><th>Receipt</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {expenses.map((e, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{e.title}</td>
                  <td><span className={`badge ${catColors[e.category] || "blue"}`}>{e.category}</span></td>
                  <td className="mono" style={{ fontSize: 13, fontWeight: 600 }}>₹{e.amount.toLocaleString()}</td>
                  <td style={{ color: "var(--text-muted)", fontSize: 12 }}>{e.date}</td>
                  <td>
                    {e.receipt
                      ? <span style={{ color: "var(--green)", fontSize: 13 }}>✓ Attached</span>
                      : <span style={{ color: "var(--amber)", fontSize: 13 }}>⚠ Missing</span>
                    }
                  </td>
                  <td><span className={`badge ${e.status}`}>{e.status === "green" ? "Approved" : "Pending"}</span></td>
                  <td><button className="btn ghost sm">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ─── Finance Reports Sub-view ─── */
function FinanceReportsTab() {
  return (
    <>
      <div className="stats-row" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 20 }}>
        {[
          { label: "Total Revenue",   value: "₹48.2L", sub: "FY 2025–26",   color: "#0066ff", change: "up", changeText: "↑ 8% vs last year" },
          { label: "Fee Collection",  value: "92.3%",  sub: "this month",   color: "#10b981", change: "up", changeText: "↑ ₹1.2L this week" },
          { label: "Expenses",        value: "₹8.4L",  sub: "April 2026",   color: "#f59e0b", change: "",   changeText: "Operating costs" },
          { label: "Net Surplus",     value: "₹39.8L", sub: "this year",    color: "#8b5cf6", change: "up", changeText: "↑ 12% vs last year" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-label"><span className="dot" style={{ background: s.color }}></span>{s.label}</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{s.value}</div>
            <div className={`stat-change ${s.change}`}>{s.changeText}</div>
          </div>
        ))}
      </div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div><div className="card-title">Fee Collection Summary</div><div className="card-sub">By class</div></div>
            <button className="btn sm">↓ Export</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Class</th><th>Expected</th><th>Collected</th><th>Pending</th><th>Rate</th></tr></thead>
              <tbody>
                {[
                  { cls: "Class 12", exp: "₹4,40,000", col: "₹4,18,000", pend: "₹22,000", rate: 95 },
                  { cls: "Class 11", exp: "₹3,92,000", col: "₹3,60,000", pend: "₹32,000", rate: 92 },
                  { cls: "Class 10", exp: "₹4,48,000", col: "₹3,92,000", pend: "₹56,000", rate: 88 },
                  { cls: "Class 8",  exp: "₹4,60,000", col: "₹3,96,000", pend: "₹64,000", rate: 86 },
                ].map((r) => {
                  const col = r.rate >= 90 ? "var(--green)" : r.rate >= 80 ? "var(--amber)" : "var(--red)";
                  return (
                    <tr key={r.cls}>
                      <td style={{ fontWeight: 500 }}>{r.cls}</td>
                      <td className="mono" style={{ fontSize: 12 }}>{r.exp}</td>
                      <td className="mono" style={{ fontSize: 12, color: "var(--green)" }}>{r.col}</td>
                      <td className="mono" style={{ fontSize: 12, color: "var(--red)" }}>{r.pend}</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div className="progress-bar" style={{ width: 60 }}>
                            <div className="progress-fill" style={{ width: `${r.rate}%`, background: col }}></div>
                          </div>
                          <span className="mono" style={{ fontSize: 12 }}>{r.rate}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div><div className="card-title">Defaulters List</div><div className="card-sub">Overdue &gt; 30 days</div></div>
            <button className="btn sm">Send Reminders</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Student</th><th>Overdue</th><th>Days</th><th></th></tr></thead>
              <tbody>
                {[
                  { name: "Priya Mehta",  cls: "8-B",  amt: "₹10,000", days: 45 },
                  { name: "Jatin Kumar",  cls: "10-A", amt: "₹7,500",  days: 32 },
                  { name: "Sourav Khan",  cls: "12-C", amt: "₹8,000",  days: 38 },
                  { name: "Riya Sharma",  cls: "9-D",  amt: "₹5,000",  days: 30 },
                ].map((d, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{d.name}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Class {d.cls}</div>
                    </td>
                    <td className="mono" style={{ fontSize: 13, fontWeight: 600, color: "var(--red)" }}>{d.amt}</td>
                    <td><span className="badge red">{d.days} days</span></td>
                    <td><button className="btn ghost sm">SMS</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────── MAIN COMPONENT ─────────────────────────── */

const TABS = [
  { id: "fees",     label: "Fees" },
  { id: "online",   label: "Online Payments" },
  { id: "payroll",  label: "Payroll" },
  { id: "expenses", label: "Expenses" },
  { id: "reports",  label: "Reports" },
];

export default function Finance() {
  const [activeTab, setActiveTab] = useState("fees");

  const views = {
    fees:     <FeesTab />,
    online:   <OnlinePaymentsTab />,
    payroll:  <PayrollTab />,
    expenses: <ExpensesTab />,
    reports:  <FinanceReportsTab />,
  };

  return (
    <>
      <div className="tab-row">
        {TABS.map((t) => (
          <div key={t.id}
            className={`tab${activeTab === t.id ? " active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </div>
        ))}
      </div>
      {views[activeTab]}
    </>
  );
}
