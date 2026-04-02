import { useState } from "react";

/* ─── Announcements ─── */
function AnnouncementsTab() {
  const announcements = [
    {
      title: "Annual Sports Day — April 15",
      body: "All students are required to participate. Parents are cordially invited. Formal attire required for the march-past.",
      target: "All Classes", author: "School Admin", date: "Apr 2, 2026",
      type: "event", pinned: true, views: 1284,
    },
    {
      title: "Mid-Term Exam Schedule Released",
      body: "Mid-term exams will be held from April 20–28. Time-tables have been uploaded in the Academics section.",
      target: "Class 9, 10, 11, 12", author: "Academic Dept", date: "Apr 1, 2026",
      type: "academic", pinned: false, views: 856,
    },
    {
      title: "Fee Payment Reminder — April 2026",
      body: "This is a reminder that April fees are due by April 10. Late fees of ₹100/day will be applicable.",
      target: "All Students", author: "Finance Dept", date: "Mar 30, 2026",
      type: "finance", pinned: false, views: 1102,
    },
    {
      title: "Parent-Teacher Meeting",
      body: "PTM scheduled for April 12 from 9 AM – 1 PM. All parents are requested to attend.",
      target: "All Classes", author: "School Admin", date: "Mar 28, 2026",
      type: "event", pinned: false, views: 724,
    },
  ];
  const typeColors = { event: "blue", academic: "green", finance: "amber" };
  const typeLabels = { event: "Event", academic: "Academic", finance: "Finance" };

  return (
    <>
      <div className="input-row">
        <select><option>All Types</option><option>Event</option><option>Academic</option><option>Finance</option></select>
        <select><option>All Targets</option><option>All Classes</option><option>Class 10</option><option>Class 12</option></select>
        <div style={{ marginLeft: "auto" }}><button className="btn primary">+ New Announcement</button></div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {announcements.map((a, i) => (
          <div key={i} className="card" style={a.pinned ? { borderLeft: "3px solid var(--accent)" } : {}}>
            <div className="card-body" style={{ padding: "16px 20px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    {a.pinned && <span style={{ fontSize: 10, fontWeight: 700, color: "var(--accent)", background: "var(--accent-light)", padding: "2px 8px", borderRadius: 20 }}>📌 PINNED</span>}
                    <span className={`badge ${typeColors[a.type]}`}>{typeLabels[a.type]}</span>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{a.target}</span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>{a.title}</div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{a.body}</div>
                  <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 12, color: "var(--text-muted)" }}>
                    <span>By {a.author}</span>
                    <span>{a.date}</span>
                    <span>👁 {a.views.toLocaleString()} views</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <button className="btn ghost sm">Edit</button>
                  <button className="btn danger sm">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ─── SMS / WhatsApp ─── */
function SMSTab() {
  const [msgType, setMsgType] = useState("sms");
  const logs = [
    { to: "All Parents",    msg: "Fees reminder — April 2026 due by Apr 10", type: "sms",      sent: 1284, date: "Apr 1" },
    { to: "Class 10-A",     msg: "Exam schedule released. Check your portal.",  type: "whatsapp", sent: 38,   date: "Apr 1" },
    { to: "Absentees",      msg: "Your child was absent today. Please advise.", type: "sms",      sent: 12,   date: "Apr 2" },
    { to: "Class 12-A",     msg: "PTM on April 12. Attendance mandatory.",      type: "whatsapp", sent: 34,   date: "Mar 30" },
  ];
  return (
    <>
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><div className="card-title">Send Message</div></div>
          <div className="card-body">
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <button onClick={() => setMsgType("sms")} className={`btn sm${msgType === "sms" ? " primary" : ""}`}>📱 SMS</button>
              <button onClick={() => setMsgType("whatsapp")} className={`btn sm${msgType === "whatsapp" ? " primary" : ""}`} style={msgType === "whatsapp" ? { background: "#25d366", borderColor: "#25d366" } : {}}>💬 WhatsApp</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5, display: "block" }}>Send To</label>
                <select style={{ width: "100%" }}>
                  <option>All Students & Parents</option>
                  <option>All Parents</option>
                  <option>Class 10-A (Parents)</option>
                  <option>Students with Fee Due</option>
                  <option>Absent Today</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5, display: "block" }}>Message Template</label>
                <select style={{ width: "100%" }}>
                  <option>Fee Reminder</option>
                  <option>Attendance Alert</option>
                  <option>Exam Schedule</option>
                  <option>Custom Message</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5, display: "block" }}>Message</label>
                <textarea
                  style={{ width: "100%", height: 90, border: "1px solid var(--border)", borderRadius: 8, padding: 10, fontFamily: "'DM Sans',sans-serif", fontSize: 13, resize: "vertical", outline: "none" }}
                  defaultValue="Dear Parent, this is a reminder that April 2026 fees are due by April 10. Please pay at the earliest."
                />
              </div>
              <button className="btn primary" style={{ justifyContent: "center", height: 40 }}>
                {msgType === "sms" ? "📱 Send SMS" : "💬 Send WhatsApp"}
              </button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Message History</div></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Recipients</th><th>Message</th><th>Type</th><th>Sent</th><th>Date</th></tr></thead>
              <tbody>
                {logs.map((l, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{l.to}</td>
                    <td style={{ fontSize: 12, color: "var(--text-secondary)", maxWidth: 180 }}>{l.msg}</td>
                    <td>
                      <span className={`badge ${l.type === "whatsapp" ? "green" : "blue"}`}>
                        {l.type === "whatsapp" ? "WhatsApp" : "SMS"}
                      </span>
                    </td>
                    <td className="mono" style={{ fontSize: 12 }}>{l.sent.toLocaleString()}</td>
                    <td style={{ color: "var(--text-muted)", fontSize: 12 }}>{l.date}</td>
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

/* ─── Parent Chat ─── */
function ParentChatTab() {
  const chats = [
    { name: "Rajesh Roy",    child: "Aarav Roy · 10-A",  last: "Thank you for the update!", time: "2m ago",    unread: 0 },
    { name: "Sunita Mehta",  child: "Priya Mehta · 8-B",  last: "When is the PTM exactly?",  time: "12m ago",   unread: 2 },
    { name: "Arun Das",      child: "Neha Das · 6-A",     last: "She's recovered, will attend", time: "1h ago", unread: 0 },
    { name: "Rekha Gupta",   child: "Rohit Gupta · 9-D",  last: "Fee paid via UPI just now",  time: "2h ago",    unread: 0 },
    { name: "Vikram Khan",   child: "Sourav Khan · 12-C", last: "Can he get extra coaching?", time: "Yesterday", unread: 1 },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20, height: 520 }}>
      {/* Chat List */}
      <div className="card" style={{ overflow: "hidden" }}>
        <div className="card-header" style={{ padding: "12px 16px" }}>
          <div className="card-title">Conversations</div>
        </div>
        <div style={{ padding: "8px 0", overflowY: "auto", height: "calc(100% - 49px)" }}>
          {chats.map((c, i) => (
            <div key={i} style={{
              padding: "10px 16px", cursor: "pointer",
              background: i === 1 ? "var(--accent-light)" : "transparent",
              borderLeft: i === 1 ? "3px solid var(--accent)" : "3px solid transparent",
              transition: "background 0.1s",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div className="avatar" style={{ width: 34, height: 34, fontSize: 12 }}>
                  {c.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</span>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{c.time}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>{c.child}</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.last}</div>
                </div>
                {c.unread > 0 && (
                  <span style={{ background: "var(--accent)", color: "white", fontSize: 10, fontWeight: 700, width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.unread}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="card" style={{ display: "flex", flexDirection: "column" }}>
        <div className="card-header">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="avatar" style={{ width: 34, height: 34, fontSize: 12 }}>SM</div>
            <div>
              <div className="card-title">Sunita Mehta</div>
              <div className="card-sub">Parent of Priya Mehta · Class 8-B</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="btn ghost sm">📞</button>
            <button className="btn ghost sm">⋯</button>
          </div>
        </div>
        <div style={{ flex: 1, padding: 20, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { from: "parent", msg: "Hello, I wanted to ask about Priya's attendance. She was unwell for 3 days.", time: "10:30 AM" },
            { from: "school", msg: "Hello! Yes, we noticed. I hope she's feeling better now. We've noted the medical leave.", time: "10:35 AM" },
            { from: "parent", msg: "She's recovering. Will she need to submit any medical certificate?", time: "10:36 AM" },
            { from: "school", msg: "Yes, please send a doctor's certificate within 3 days of rejoining. This helps us update the attendance records officially.", time: "10:38 AM" },
            { from: "parent", msg: "When is the PTM exactly?", time: "10:40 AM" },
          ].map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.from === "school" ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "70%", padding: "10px 14px", borderRadius: 12,
                borderBottomLeftRadius: m.from === "school" ? 12 : 4,
                borderBottomRightRadius: m.from === "school" ? 4 : 12,
                background: m.from === "school" ? "var(--accent)" : "var(--bg)",
                color: m.from === "school" ? "white" : "var(--text-primary)",
                border: m.from === "school" ? "none" : "1px solid var(--border)",
              }}>
                <div style={{ fontSize: 13, lineHeight: 1.5 }}>{m.msg}</div>
                <div style={{ fontSize: 10, marginTop: 4, opacity: 0.7, textAlign: "right" }}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border-light)", display: "flex", gap: 10 }}>
          <input type="text" placeholder="Type a message..." style={{ flex: 1, height: 38 }} />
          <button className="btn primary" style={{ flexShrink: 0 }}>Send →</button>
        </div>
      </div>
    </div>
  );
}

/* ─── AI Alerts ─── */
function AIAlertsTab() {
  const alerts = [
    {
      icon: "🤖", type: "Attendance AI", severity: "red",
      title: "Chronic Absenteeism Detected — 8 Students",
      body: "8 students have attendance below 75% this month. Immediate parent contact recommended. Priya Mehta (56%), Jatin Kumar (62%), and 6 others.",
      action: "Send SMS to Parents", time: "2m ago",
    },
    {
      icon: "💸", type: "Finance AI", severity: "amber",
      title: "Fee Default Risk — 24 Students",
      body: "Predictive model identifies 24 students likely to default in April based on March payment patterns. Early intervention suggested.",
      action: "Generate Due List", time: "15m ago",
    },
    {
      icon: "📊", type: "Academic AI", severity: "amber",
      title: "3 Classes Below Syllabus Target",
      body: "Class 8-B (Science), Class 9-C (Maths), and Class 11-A (Chemistry) are 20%+ behind syllabus completion targets for this term.",
      action: "View Syllabus Status", time: "1h ago",
    },
    {
      icon: "✅", type: "General", severity: "green",
      title: "Attendance Rate Up 2.1% This Week",
      body: "Overall school attendance improved from 92.1% to 94.2% this week. Top performing class: Class 12-A at 98.5%.",
      action: "View Full Report", time: "6h ago",
    },
  ];
  const sevColors = { red: "var(--red-light)", amber: "var(--amber-light)", green: "var(--green-light)" };
  const sevBadge  = { red: "red", amber: "amber", green: "green" };
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, padding: "14px 20px", background: "linear-gradient(135deg,#0066ff11,#8b5cf611)", border: "1px solid #e0e8ff", borderRadius: "var(--radius-md)" }}>
        <div style={{ fontSize: 28 }}>🤖</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>AI-Powered School Intelligence</div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Real-time alerts, predictions & actionable insights — powered by machine learning
          </div>
        </div>
        <button className="btn primary" style={{ marginLeft: "auto", flexShrink: 0 }}>Configure AI</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {alerts.map((a, i) => (
          <div key={i} className="card" style={{ borderLeft: `3px solid var(--${a.severity})` }}>
            <div className="card-body" style={{ padding: "16px 20px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ fontSize: 28, lineHeight: 1 }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span className={`badge ${sevBadge[a.severity]}`}>{a.type}</span>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{a.time}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{a.title}</div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{a.body}</div>
                </div>
                <button className="btn primary sm" style={{ flexShrink: 0 }}>{a.action}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ─────────────────────────── MAIN COMPONENT ─────────────────────────── */

const TABS = [
  { id: "announcements", label: "📢 Announcements" },
  { id: "sms",           label: "💬 SMS / WhatsApp" },
  { id: "chat",          label: "🗨️ Parent Chat" },
  { id: "ai",            label: "🤖 AI Alerts" },
];

export default function Communication() {
  const [activeTab, setActiveTab] = useState("announcements");
  const views = {
    announcements: <AnnouncementsTab />,
    sms:           <SMSTab />,
    chat:          <ParentChatTab />,
    ai:            <AIAlertsTab />,
  };
  return (
    <>
      <div className="tab-row">
        {TABS.map((t) => (
          <div key={t.id} className={`tab${activeTab === t.id ? " active" : ""}`} onClick={() => setActiveTab(t.id)}>
            {t.label}
          </div>
        ))}
      </div>
      {views[activeTab]}
    </>
  );
}
