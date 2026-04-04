import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { supabase } from "../lib/supabase";
import Topbar from "../components/Topbar";

const TYPE_META = {
  announcement: { label: "Announcement", color: "#2563eb", bg: "#eff6ff" },
  message:      { label: "Message",      color: "#059669", bg: "#ecfdf5" },
  alert:        { label: "Alert",        color: "#d97706", bg: "#fffbeb" },
};

export default function Communication() {
  const { currentUser, currentRole } = useApp();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [compose, setCompose] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", audience: "All", type: "announcement" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const canCompose = ["admin", "superadmin", "teacher"].includes(currentRole);

  async function fetchAnnouncements() {
    if (!currentUser) return;
    const { data } = await supabase
      .from("announcements")
      .select("*")
      .eq("school_id", currentUser.school_id)
      .order("created_at", { ascending: false })
      .limit(50);
    setAnnouncements(data || []);
    setLoading(false);
  }

  useEffect(() => { fetchAnnouncements(); }, [currentUser]);

  async function handleSend(e) {
    e.preventDefault();
    if (!form.title || !form.body) return;
    setSending(true);
    await supabase.from("announcements").insert([{
      school_id: currentUser.school_id,
      created_by: currentUser.id,
      title: form.title,
      body: form.body,
      audience: form.audience,
      type: form.type,
    }]);
    setSending(false);
    setSent(true);
    setForm({ title: "", body: "", audience: "All", type: "announcement" });
    fetchAnnouncements();
    setTimeout(() => { setCompose(false); setSent(false); }, 1500);
  }

  const items = filter === "all" ? announcements : announcements.filter(a => a.type === filter);
  const active = selected !== null
    ? announcements.find(a => a.id === selected)
    : items[0] || null;

  const statCounts = {
    announcement: announcements.filter(a => a.type === "announcement").length,
    message: announcements.filter(a => a.type === "message").length,
    alert: announcements.filter(a => a.type === "alert").length,
  };

  return (
    <>
      <Topbar
        title="Communication"
        sub="Announcements & messaging"
        actions={canCompose ? (
          <button style={BtnS.primary} onClick={() => setCompose(true)}>+ New Announcement</button>
        ) : null}
      />

      <div style={{ padding: "24px 28px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Announcements", value: statCounts.announcement, color: "#0066ff" },
            { label: "Messages", value: statCounts.message, color: "#10b981" },
            { label: "Alerts", value: statCounts.alert, color: "#f59e0b" },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, padding: 20, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, display: "inline-block" }} />
                <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>{s.label}</span>
              </div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.8px", lineHeight: 1 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Compose Modal */}
        {compose && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ background: "#fff", borderRadius: 16, width: 520, boxShadow: "0 20px 60px rgba(0,0,0,0.15)", padding: "28px 32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>New Announcement</div>
                <button onClick={() => setCompose(false)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#9ca3af" }}>✕</button>
              </div>
              <form onSubmit={handleSend} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={LBL}>Type</label>
                    <select style={INP} value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                      <option value="announcement">Announcement</option>
                      <option value="message">Message</option>
                      <option value="alert">Alert</option>
                    </select>
                  </div>
                  <div>
                    <label style={LBL}>Audience</label>
                    <select style={INP} value={form.audience} onChange={e => setForm(p => ({ ...p, audience: e.target.value }))}>
                      {["All", "Students", "Parents", "Teachers", "Admin"].map(a => <option key={a}>{a}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={LBL}>Title *</label>
                  <input required style={INP} placeholder="e.g. Annual Sports Day — 15 April" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
                </div>
                <div>
                  <label style={LBL}>Message *</label>
                  <textarea required value={form.body} onChange={e => setForm(p => ({ ...p, body: e.target.value }))}
                    placeholder="Write your announcement here…" rows={5}
                    style={{ ...INP, height: "auto", padding: "10px 12px", resize: "vertical", width: "100%", boxSizing: "border-box" }} />
                </div>
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  <button type="button" onClick={() => setCompose(false)} style={BtnS.cancel}>Cancel</button>
                  <button type="submit" disabled={sending} style={{ ...BtnS.primary, background: sent ? "#10b981" : "#0066ff" }}>
                    {sent ? "✓ Sent!" : sending ? "Sending…" : "Send Announcement"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Main layout */}
        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 16, alignItems: "start" }}>
          {/* Left - list */}
          <div style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #e8eaed", display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["all", "announcement", "message", "alert"].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  height: 26, padding: "0 10px", borderRadius: 20, fontSize: 11, fontWeight: 500,
                  border: "1px solid", cursor: "pointer", textTransform: "capitalize",
                  borderColor: filter === f ? "#0066ff" : "#e8eaed",
                  background: filter === f ? "#eff4ff" : "#fff",
                  color: filter === f ? "#0066ff" : "#9ca3af",
                }}>{f === "all" ? "All" : TYPE_META[f]?.label}</button>
              ))}
            </div>
            <div style={{ maxHeight: 520, overflowY: "auto" }}>
              {loading ? (
                <div style={{ padding: 24, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>Loading…</div>
              ) : items.length === 0 ? (
                <div style={{ padding: 24, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>No {filter === "all" ? "" : filter}s yet</div>
              ) : items.map(item => {
                const meta = TYPE_META[item.type] || TYPE_META.announcement;
                const isActive = active?.id === item.id;
                const initials = (item.from_name || "eS").split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
                return (
                  <div key={item.id} onClick={() => setSelected(item.id)} style={{
                    padding: "14px 16px", cursor: "pointer", borderBottom: "1px solid #f0f2f5",
                    background: isActive ? "#f8faff" : "#fff",
                    borderLeft: isActive ? "3px solid #0066ff" : "3px solid transparent",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#0066ff,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{initials}</div>
                        <span style={{ fontSize: 12, fontWeight: 500 }}>{item.from_name || "Admin"}</span>
                      </div>
                      <span style={{ fontSize: 11, color: "#9ca3af" }}>{new Date(item.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, paddingLeft: 36, marginBottom: 3 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: "#9ca3af", paddingLeft: 36, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.body}</div>
                    <div style={{ paddingLeft: 36, marginTop: 6 }}>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 20, background: meta.bg, color: meta.color }}>{meta.label}</span>
                      {item.audience && <span style={{ fontSize: 10, marginLeft: 6, color: "#9ca3af" }}>→ {item.audience}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right - detail */}
          {active ? (
            <div style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, padding: "24px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{active.title}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af" }}>
                    From: <strong>{active.from_name || "Admin"}</strong> · {new Date(active.created_at).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })} · To: {active.audience || "All"}
                  </div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20, background: (TYPE_META[active.type] || TYPE_META.announcement).bg, color: (TYPE_META[active.type] || TYPE_META.announcement).color }}>
                  {(TYPE_META[active.type] || TYPE_META.announcement).label}
                </span>
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.8, padding: 16, background: "#f9fafb", borderRadius: 10, marginBottom: 20 }}>{active.body}</div>
              {canCompose && (
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setCompose(true)} style={BtnS.primary}>↩ New Announcement</button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200, color: "#9ca3af", fontSize: 13 }}>
              {loading ? "Loading…" : "No announcements yet"}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const LBL = { fontSize: 12, fontWeight: 500, color: "#374151", display: "block", marginBottom: 5 };
const INP = { height: 38, border: "1px solid #e5e7eb", borderRadius: 8, padding: "0 12px", fontSize: 13.5, fontFamily: "'DM Sans',sans-serif", outline: "none", background: "#fff", width: "100%", boxSizing: "border-box" };
const BtnS = {
  primary: { height: 36, padding: "0 16px", background: "#0066ff", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" },
  cancel: { height: 36, padding: "0 16px", background: "none", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, cursor: "pointer", fontFamily: "inherit" },
};
