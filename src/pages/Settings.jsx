import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { supabase } from "../lib/supabase";
import Topbar from "../components/Topbar";

/* ── School Settings Tab ── */
function SchoolSettingsTab({ schoolId }) {
  const [school, setSchool] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("schools").select("*").eq("id", schoolId).single();
      if (data) { setSchool(data); setForm(data); }
      setLoading(false);
    }
    load();
  }, [schoolId]);

  async function save() {
    setSaving(true);
    await supabase.from("schools").update({
      name: form.name,
      address: form.address,
      phone: form.phone,
      email: form.email,
      principal_name: form.principal_name,
      udise_code: form.udise_code,
    }).eq("id", schoolId);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>Loading…</div>;

  const FIELDS = [
    { label: "School Name", key: "name" },
    { label: "UDISE Code", key: "udise_code" },
    { label: "Principal", key: "principal_name" },
    { label: "Contact Email", key: "email", type: "email" },
    { label: "Phone", key: "phone" },
    { label: "Address", key: "address" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>
      <div style={C.card}>
        <div style={C.header}><div style={C.title}>School Profile</div></div>
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
          {saved && <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#059669" }}>✓ Changes saved!</div>}
          {FIELDS.map(f => (
            <div key={f.key}>
              <label style={LBL}>{f.label}</label>
              <input type={f.type || "text"} style={INP} value={form[f.key] || ""} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={`Enter ${f.label.toLowerCase()}`} />
            </div>
          ))}
          <button style={BtnS.primary} onClick={save} disabled={saving}>{saving ? "Saving…" : "Save Changes"}</button>
        </div>
      </div>

      <div>
        <div style={{ ...C.card, marginBottom: 16 }}>
          <div style={C.header}><div style={C.title}>Academic Year</div></div>
          <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <label style={LBL}>Current Academic Year</label>
              <select style={INP}><option>2025–2026</option><option>2024–2025</option></select>
            </div>
            <div>
              <label style={LBL}>Session Start</label>
              <input type="text" style={INP} defaultValue="April 1, 2025" />
            </div>
            <div>
              <label style={LBL}>Session End</label>
              <input type="text" style={INP} defaultValue="March 31, 2026" />
            </div>
          </div>
        </div>
        <div style={C.card}>
          <div style={C.header}><div style={C.title}>Working Days</div></div>
          <div style={{ padding: "16px 20px", display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
              <label key={d} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}>
                <input type="checkbox" defaultChecked={i < 6} />
                {d}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── User Management Tab ── */
function UserManagementTab({ schoolId }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("app_users")
        .select("*")
        .eq("school_id", schoolId)
        .order("full_name");
      setUsers(data || []);
      setLoading(false);
    }
    load();
  }, [schoolId]);

  const roleColors = { admin: "blue", teacher: "green", accountant: "purple", student: "amber", parent: "red", superadmin: "red" };
  const filtered = search ? users.filter(u => u.full_name?.toLowerCase().includes(search.toLowerCase()) || u.login_id?.toLowerCase().includes(search.toLowerCase())) : users;

  return (
    <>
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: 14 }}>🔍</span>
          <input style={{ ...INP, paddingLeft: 32, width: 240 }} placeholder="Search users…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div style={C.card}>
        <table style={T.table}>
          <thead>
            <tr>{["User", "Login ID", "Role", "Status", ""].map(h => <th key={h} style={T.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={5} style={T.td}>Loading…</td></tr>
              : filtered.length === 0 ? <tr><td colSpan={5} style={{ ...T.td, textAlign: "center", color: "#9ca3af" }}>No users found</td></tr>
                : filtered.map(u => {
                  const initials = u.full_name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) || "??";
                  const rc = roleColors[u.role] || "blue";
                  const colorMap = { blue: "#0066ff", green: "#059669", purple: "#8b5cf6", amber: "#d97706", red: "#dc2626" };
                  const bgMap = { blue: "#eff4ff", green: "#ecfdf5", purple: "#f5f3ff", amber: "#fffbeb", red: "#fef2f2" };
                  return (
                    <tr key={u.id}>
                      <td style={T.td}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#0066ff,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#fff", flexShrink: 0 }}>{initials}</div>
                          <div>
                            <div style={{ fontWeight: 500 }}>{u.full_name}</div>
                            <div style={{ fontSize: 11, color: "#9ca3af" }}>{u.login_id}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ ...T.td, fontFamily: "monospace", fontSize: 12 }}>{u.login_id}</td>
                      <td style={T.td}>
                        <span style={{ background: bgMap[rc], color: colorMap[rc], fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20, textTransform: "capitalize" }}>{u.role}</span>
                      </td>
                      <td style={T.td}>
                        <span style={{ background: u.is_active !== false ? "#ecfdf5" : "#fef2f2", color: u.is_active !== false ? "#059669" : "#dc2626", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20 }}>
                          {u.is_active !== false ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td style={T.td}><button style={BtnS.ghost}>View</button></td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
        <div style={{ padding: "12px 16px", borderTop: "1px solid #f0f2f5" }}>
          <span style={{ fontSize: 12, color: "#9ca3af" }}>{filtered.length} users</span>
        </div>
      </div>
    </>
  );
}

/* ── Fee Types Tab ── */
function FeeTypesTab({ schoolId }) {
  const [feeTypes, setFeeTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", amount: "" });
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data } = await supabase.from("fee_types").select("*").eq("school_id", schoolId).order("name");
    setFeeTypes(data || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, [schoolId]);

  async function add() {
    if (!form.name || !form.amount) return;
    setSaving(true);
    await supabase.from("fee_types").insert([{ school_id: schoolId, name: form.name, amount: parseInt(form.amount) }]);
    setSaving(false);
    setForm({ name: "", amount: "" });
    setShowAdd(false);
    load();
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <button style={BtnS.primary} onClick={() => setShowAdd(v => !v)}>+ Add Fee Type</button>
      </div>
      {showAdd && (
        <div style={{ ...C.card, marginBottom: 16, padding: "20px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 12, alignItems: "end" }}>
            <div>
              <label style={LBL}>Fee Type Name *</label>
              <input style={INP} placeholder="e.g. Tuition Fee" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div>
              <label style={LBL}>Amount (₹) *</label>
              <input type="number" style={INP} placeholder="5000" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} />
            </div>
            <button style={BtnS.primary} onClick={add} disabled={saving}>{saving ? "Adding…" : "Add"}</button>
          </div>
        </div>
      )}
      <div style={C.card}>
        <table style={T.table}>
          <thead><tr>{["Fee Type", "Amount", ""].map(h => <th key={h} style={T.th}>{h}</th>)}</tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={3} style={T.td}>Loading…</td></tr>
              : feeTypes.length === 0 ? <tr><td colSpan={3} style={{ ...T.td, textAlign: "center", color: "#9ca3af" }}>No fee types configured</td></tr>
                : feeTypes.map(f => (
                  <tr key={f.id}>
                    <td style={{ ...T.td, fontWeight: 500 }}>{f.name}</td>
                    <td style={{ ...T.td, fontFamily: "monospace", fontWeight: 600 }}>₹{f.amount?.toLocaleString()}</td>
                    <td style={T.td}><button style={BtnS.ghost}>Edit</button></td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ── MAIN ── */
const TABS = [
  { id: "school", label: "School Settings" },
  { id: "users", label: "User Management" },
  { id: "feeTypes", label: "Fee Types" },
];

export default function Settings() {
  const { currentUser, currentRole } = useApp();
  const [activeTab, setActiveTab] = useState("school");

  if (!currentUser) return null;
  const isAdmin = ["admin", "superadmin"].includes(currentRole);

  const views = {
    school: <SchoolSettingsTab schoolId={currentUser.school_id} />,
    users: <UserManagementTab schoolId={currentUser.school_id} />,
    feeTypes: <FeeTypesTab schoolId={currentUser.school_id} />,
  };

  const visibleTabs = isAdmin ? TABS : TABS.filter(t => t.id !== "users");

  return (
    <>
      <Topbar title="Settings" sub="School configuration" />
      <div style={{ padding: "24px 28px" }}>
        <div style={{ display: "flex", gap: 2, borderBottom: "1px solid #e8eaed", marginBottom: 20 }}>
          {visibleTabs.map(t => (
            <div key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: "10px 16px", fontSize: 13.5, fontWeight: 500, cursor: "pointer",
              borderBottom: activeTab === t.id ? "2px solid #0066ff" : "2px solid transparent",
              marginBottom: -1, color: activeTab === t.id ? "#0066ff" : "#9ca3af",
            }}>{t.label}</div>
          ))}
        </div>
        {views[activeTab]}
      </div>
    </>
  );
}

/* ── STYLES ── */
const LBL = { fontSize: 12, fontWeight: 500, color: "#374151", display: "block", marginBottom: 5 };
const INP = { height: 38, border: "1px solid #e5e7eb", borderRadius: 8, padding: "0 12px", fontSize: 13.5, fontFamily: "'DM Sans',sans-serif", outline: "none", background: "#fff", width: "100%", boxSizing: "border-box" };
const BtnS = {
  primary: { height: 36, padding: "0 14px", background: "#0066ff", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" },
  ghost: { height: 28, padding: "0 10px", background: "none", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 12, cursor: "pointer", fontFamily: "inherit" },
};
const C = {
  card: { background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" },
  header: { padding: "14px 20px", borderBottom: "1px solid #f0f2f5", display: "flex", alignItems: "center", justifyContent: "space-between" },
  title: { fontSize: 14, fontWeight: 600 },
};
const T = {
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.5px", textTransform: "uppercase", padding: "10px 16px", borderBottom: "1px solid #e8eaed", whiteSpace: "nowrap" },
  td: { padding: "12px 16px", fontSize: 13.5, borderBottom: "1px solid #f0f2f5", color: "#0f1117" },
};
