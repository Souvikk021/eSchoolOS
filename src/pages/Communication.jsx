import { useState } from "react";

const ANNOUNCEMENTS = [
  {
    id: 1,
    type: "announcement",
    from: "Principal",
    initials: "PR",
    color: "linear-gradient(135deg,#0066ff,#6366f1)",
    title: "Annual Sports Day — 15 April",
    body: "All students and staff are invited to the Annual Sports Day on 15th April 2026 at the school grounds. Events begin at 9:00 AM. Parents are welcome.",
    time: "2h ago",
    audience: "All",
    pinned: true,
  },
  {
    id: 2,
    type: "message",
    from: "Priya Mehta's Parent",
    initials: "PM",
    color: "linear-gradient(135deg,#f59e0b,#ef4444)",
    title: "Absence notification",
    body: "Priya will be absent on 4th April due to a family function. Kindly note and excuse her from attendance.",
    time: "4h ago",
    audience: "Admin",
    pinned: false,
  },
  {
    id: 3,
    type: "alert",
    from: "System",
    initials: "eS",
    color: "linear-gradient(135deg,#ef4444,#f59e0b)",
    title: "Fee reminder sent to 38 parents",
    body: "Automated SMS & email reminders have been dispatched to parents of students with outstanding fees for April 2026.",
    time: "Yesterday",
    audience: "Finance",
    pinned: false,
  },
  {
    id: 4,
    type: "announcement",
    from: "Class Teacher — 10-A",
    initials: "CT",
    color: "linear-gradient(135deg,#10b981,#06b6d4)",
    title: "Parent-Teacher Meeting — 10 April",
    body: "PTM for Class 10-A is scheduled on 10th April from 10 AM to 1 PM. All parents are requested to attend. Slot booking is now open.",
    time: "Yesterday",
    audience: "Class 10-A",
    pinned: false,
  },
  {
    id: 5,
    type: "message",
    from: "Karan Sharma",
    initials: "KS",
    color: "linear-gradient(135deg,#10b981,#059669)",
    title: "Request for TC",
    body: "I would like to request a Transfer Certificate as my family is relocating to Bangalore by end of April. Please advise on the process.",
    time: "2 days ago",
    audience: "Admin",
    pinned: false,
  },
];

const TYPE_META = {
  announcement: { label: "Announcement", color: "#2563eb", bg: "#eff6ff" },
  message:      { label: "Message",      color: "#059669", bg: "#ecfdf5" },
  alert:        { label: "Alert",        color: "#d97706", bg: "#fffbeb" },
};

export default function Communication() {
  const [filter,   setFilter]  = useState("all");
  const [compose,  setCompose]  = useState(false);
  const [selected, setSelected] = useState(null);
  const [subject,  setSubject]  = useState("");
  const [body,     setBody]     = useState("");
  const [sent,     setSent]     = useState(false);

  const items = filter === "all"
    ? ANNOUNCEMENTS
    : ANNOUNCEMENTS.filter(a => a.type === filter);

  function handleSend(e) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setCompose(false); setSent(false); setSubject(""); setBody(""); }, 1500);
  }

  const active = selected !== null ? ANNOUNCEMENTS.find(a => a.id === selected) : items[0];

  return (
    <>
      {/* ── STATS ── */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label"><span className="dot" style={{ background: "#0066ff" }} />Announcements</div>
          <div className="stat-value">{ANNOUNCEMENTS.filter(a => a.type === "announcement").length}</div>
          <div className="stat-change up">this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><span className="dot" style={{ background: "#10b981" }} />Messages</div>
          <div className="stat-value">{ANNOUNCEMENTS.filter(a => a.type === "message").length}</div>
          <div className="stat-change" style={{ color: "var(--text-muted)" }}>unread</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><span className="dot" style={{ background: "#f59e0b" }} />Alerts</div>
          <div className="stat-value">{ANNOUNCEMENTS.filter(a => a.type === "alert").length}</div>
          <div className="stat-change down">needs action</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><span className="dot" style={{ background: "#8b5cf6" }} />Parents Reached</div>
          <div className="stat-value">284</div>
          <div className="stat-change up">this week</div>
        </div>
      </div>

      {/* ── COMPOSE MODAL ── */}
      {compose && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
        }}>
          <div style={{
            background: "#fff", borderRadius: 16, width: "100%", maxWidth: 520,
            padding: "28px 32px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>New Announcement</div>
              <button onClick={() => setCompose(false)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "var(--text-muted)" }}>✕</button>
            </div>
            <form onSubmit={handleSend} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>Audience</label>
                <select style={{
                  width: "100%", height: 36, border: "1px solid var(--border)", borderRadius: 7,
                  padding: "0 10px", fontSize: 13, fontFamily: "inherit", outline: "none",
                }}>
                  <option>All Students & Staff</option>
                  <option>Students Only</option>
                  <option>Parents Only</option>
                  <option>Staff Only</option>
                  <option>Class 10-A</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>Subject</label>
                <input
                  required value={subject} onChange={e => setSubject(e.target.value)}
                  placeholder="e.g. Annual Sports Day — 15 April"
                  style={{
                    width: "100%", height: 36, border: "1px solid var(--border)", borderRadius: 7,
                    padding: "0 12px", fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>Message</label>
                <textarea
                  required value={body} onChange={e => setBody(e.target.value)}
                  placeholder="Write your announcement here…"
                  rows={5}
                  style={{
                    width: "100%", border: "1px solid var(--border)", borderRadius: 7,
                    padding: "10px 12px", fontSize: 13, fontFamily: "inherit", outline: "none",
                    resize: "vertical", boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
                <button type="button" onClick={() => setCompose(false)} style={{
                  height: 36, padding: "0 16px", border: "1px solid var(--border)", borderRadius: 7,
                  background: "#fff", fontSize: 13, cursor: "pointer",
                }}>Cancel</button>
                <button type="submit" style={{
                  height: 36, padding: "0 20px", border: "none", borderRadius: 7,
                  background: sent ? "#10b981" : "var(--blue)", color: "#fff", fontSize: 13,
                  fontWeight: 500, cursor: "pointer", transition: "background 0.2s",
                }}>{sent ? "✓ Sent!" : "Send Announcement"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MAIN LAYOUT ── */}
      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 16, alignItems: "start" }}>

        {/* LEFT — list */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid var(--border)", display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["all", "announcement", "message", "alert"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  height: 26, padding: "0 10px", borderRadius: 20, fontSize: 11, fontWeight: 500,
                  border: "1px solid",
                  borderColor: filter === f ? "var(--blue)" : "var(--border)",
                  background: filter === f ? "#eff6ff" : "#fff",
                  color: filter === f ? "var(--blue)" : "var(--text-muted)",
                  cursor: "pointer", textTransform: "capitalize",
                }}
              >{f === "all" ? "All" : TYPE_META[f]?.label}</button>
            ))}
          </div>

          <div style={{ maxHeight: 480, overflowY: "auto" }}>
            {items.map(item => {
              const meta = TYPE_META[item.type];
              const isActive = (active?.id === item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => setSelected(item.id)}
                  style={{
                    padding: "14px 16px", cursor: "pointer", borderBottom: "1px solid var(--border)",
                    background: isActive ? "#f8faff" : "#fff",
                    borderLeft: isActive ? "3px solid var(--blue)" : "3px solid transparent",
                    transition: "background 0.15s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%", background: item.color,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 10, fontWeight: 700, color: "#fff", flexShrink: 0,
                      }}>{item.initials}</div>
                      <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-primary)" }}>{item.from}</span>
                    </div>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{item.time}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 3, paddingLeft: 36 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", paddingLeft: 36, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.body}</div>
                  <div style={{ paddingLeft: 36, marginTop: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 20, background: meta.bg, color: meta.color }}>{meta.label}</span>
                    {item.pinned && <span style={{ fontSize: 10, marginLeft: 5, color: "var(--text-muted)" }}>📌 Pinned</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — detail */}
        {active ? (
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", background: active.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 700, color: "#fff", flexShrink: 0,
                }}>{active.initials}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 3 }}>{active.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>From: <strong>{active.from}</strong> · {active.time} · To: {active.audience}</div>
                </div>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20,
                background: TYPE_META[active.type].bg, color: TYPE_META[active.type].color,
              }}>{TYPE_META[active.type].label}</span>
            </div>

            <div style={{
              fontSize: 14, color: "var(--text-primary)", lineHeight: 1.7,
              padding: "16px", background: "var(--bg)", borderRadius: 10, marginBottom: 20,
            }}>
              {active.body}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setCompose(true)}
                style={{
                  height: 34, padding: "0 16px", fontSize: 13, fontWeight: 500,
                  border: "none", borderRadius: 7, background: "var(--blue)", color: "#fff", cursor: "pointer",
                }}
              >↩ Reply</button>
              <button style={{
                height: 34, padding: "0 14px", fontSize: 13,
                border: "1px solid var(--border)", borderRadius: 7, background: "#fff", cursor: "pointer",
              }}>↗ Forward</button>
            </div>
          </div>
        ) : (
          <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200, color: "var(--text-muted)", fontSize: 13 }}>
            Select a message to view
          </div>
        )}
      </div>
    </>
  );
}
