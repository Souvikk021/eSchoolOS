import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { supabase } from "../lib/supabase";
import Topbar from "../components/Topbar";

const GRADIENTS = [
  "linear-gradient(135deg,#667eea,#764ba2)",
  "linear-gradient(135deg,#f59e0b,#ef4444)",
  "linear-gradient(135deg,#10b981,#0066ff)",
  "linear-gradient(135deg,#8b5cf6,#ec4899)",
  "linear-gradient(135deg,#ef4444,#f59e0b)",
  "linear-gradient(135deg,#0066ff,#10b981)",
];

function Avatar({ name, index }) {
  const initials = name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) || "??";
  return (
    <div style={{ width: 30, height: 30, borderRadius: "50%", background: GRADIENTS[index % GRADIENTS.length], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#fff", flexShrink: 0 }}>
      {initials}
    </div>
  );
}

function Badge({ status }) {
  const map = { Active: { bg: "#ecfdf5", c: "#059669" }, Inactive: { bg: "#fef2f2", c: "#dc2626" } };
  const s = map[status] || { bg: "#f3f4f6", c: "#6b7280" };
  return <span style={{ background: s.bg, color: s.c, fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 20 }}>{status}</span>;
}

/* ── ADD STUDENT MODAL ── */
function AddModal({ schoolId, classes, onClose, onAdded }) {
  const [form, setForm] = useState({ full_name: "", roll_number: "", class_id: "", section_id: "" });
  const [sections, setSecs] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (form.class_id) {
      supabase.from("sections").select("*").eq("class_id", form.class_id).then(({ data }) => setSecs(data || []));
    }
  }, [form.class_id]);

  async function save() {
    if (!form.full_name || !form.roll_number || !form.class_id) { setError("Fill all required fields."); return; }
    setSaving(true);
    const { error: err } = await supabase.from("students").insert([{ ...form, school_id: schoolId }]);
    setSaving(false);
    if (err) { setError(err.message); return; }
    onAdded();
    onClose();
  }

  return (
    <div style={M.overlay}>
      <div style={M.modal}>
        <div style={M.header}>
          <span style={M.title}>Add Student</span>
          <button style={M.close} onClick={onClose}>✕</button>
        </div>
        <div style={M.body}>
          {[
            { label: "Full Name *", key: "full_name", type: "text", ph: "Aarav Roy" },
            { label: "Roll Number *", key: "roll_number", type: "text", ph: "001" },
            { label: "Phone", key: "phone", type: "text", ph: "98765 00000" },
          ].map(f => (
            <div key={f.key} style={M.field}>
              <label style={M.label}>{f.label}</label>
              <input style={M.input} type={f.type} placeholder={f.ph} value={form[f.key] || ""}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
            </div>
          ))}
          <div style={M.field}>
            <label style={M.label}>Class *</label>
            <select style={M.input} value={form.class_id} onChange={e => setForm(p => ({ ...p, class_id: e.target.value, section_id: "" }))}>
              <option value="">Select class</option>
              {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div style={M.field}>
            <label style={M.label}>Section</label>
            <select style={M.input} value={form.section_id} onChange={e => setForm(p => ({ ...p, section_id: e.target.value }))}>
              <option value="">Select section</option>
              {sections.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          {error && <div style={{ color: "#dc2626", fontSize: 13, marginTop: 4 }}>{error}</div>}
        </div>
        <div style={M.footer}>
          <button style={M.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={M.saveBtn} onClick={save} disabled={saving}>{saving ? "Adding…" : "Add Student"}</button>
        </div>
      </div>
    </div>
  );
}

export default function Students() {
  const { currentUser, currentRole } = useApp();
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCls, setFilterCls] = useState("");
  const [showModal, setShowModal] = useState(false);
  const isAdmin = ["admin", "superadmin"].includes(currentRole);

  async function fetchStudents() {
    setLoading(true);
    let q = supabase.from("students")
      .select("*, classes(name), sections(name)")
      .eq("school_id", currentUser.school_id)
      .order("created_at", { ascending: false });
    if (filterCls) q = q.eq("class_id", filterCls);
    if (search) q = q.ilike("full_name", `%${search}%`);
    const { data } = await q;
    setStudents(data || []);
    setLoading(false);
  }

  useEffect(() => {
    supabase.from("classes").select("*").eq("school_id", currentUser.school_id)
      .then(({ data }) => setClasses(data || []));
    fetchStudents();
  }, []);

  useEffect(() => { fetchStudents(); }, [search, filterCls]);

  const actions = isAdmin ? (
    <button style={BtnS.primary} onClick={() => setShowModal(true)}>+ Add Student</button>
  ) : null;

  return (
    <>
      <Topbar title={isAdmin ? "Students" : "My Students"} sub="Manage student roster" actions={actions} />
      <div style={{ padding: "24px 28px" }}>

        {/* Filters */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: 14 }}>🔍</span>
            <input style={{ ...INP, paddingLeft: 32, width: 220 }} placeholder="Search students…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select style={INP} value={filterCls} onChange={e => setFilterCls(e.target.value)}>
            <option value="">All Classes</option>
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        {/* Table */}
        <div style={S.card}>
          <div style={{ overflowX: "auto" }}>
            <table style={S.table}>
              <thead>
                <tr>
                  {["Student", "Roll No.", "Class", "Section", "Phone", "Status", isAdmin ? "" : ""].map((h, i) => (
                    <th key={i} style={S.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} style={{ ...S.td, textAlign: "center", color: "#9ca3af" }}>Loading…</td></tr>
                ) : students.length === 0 ? (
                  <tr><td colSpan={7} style={{ ...S.td, textAlign: "center", color: "#9ca3af" }}>No students found</td></tr>
                ) : students.map((s, i) => (
                  <tr key={s.id} style={{ transition: "background 0.1s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <td style={S.td}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Avatar name={s.full_name} index={i} />
                        <span style={{ fontWeight: 500 }}>{s.full_name}</span>
                      </div>
                    </td>
                    <td style={{ ...S.td, fontFamily: "monospace", fontSize: 13 }}>{s.roll_number}</td>
                    <td style={S.td}>{s.classes?.name || "—"}</td>
                    <td style={S.td}>{s.sections?.name || "—"}</td>
                    <td style={{ ...S.td, color: "#6b7280" }}>{s.phone || "—"}</td>
                    <td style={S.td}><Badge status={s.user_id ? "Active" : "Active"} /></td>
                    {isAdmin && <td style={S.td}><button style={BtnS.ghost}>View</button></td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: "12px 16px", borderTop: "1px solid #f0f2f5", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>Showing {students.length} students</span>
          </div>
        </div>
      </div>

      {showModal && (
        <AddModal schoolId={currentUser.school_id} classes={classes}
          onClose={() => setShowModal(false)} onAdded={fetchStudents} />
      )}
    </>
  );
}

const INP = { height: 36, border: "1px solid #e5e7eb", borderRadius: 8, padding: "0 12px", fontSize: 13.5, fontFamily: "'DM Sans',sans-serif", outline: "none", background: "#fff", minWidth: 140 };
const BtnS = {
  primary: { height: 34, padding: "0 14px", background: "#0066ff", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" },
  ghost: { height: 28, padding: "0 10px", background: "none", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 12, cursor: "pointer", fontFamily: "inherit" },
};
const S = {
  card: { background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.5px", textTransform: "uppercase", padding: "10px 16px", borderBottom: "1px solid #e8eaed", whiteSpace: "nowrap" },
  td: { padding: "12px 16px", fontSize: 13.5, borderBottom: "1px solid #f0f2f5", color: "#0f1117" },
};
const M = {
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 },
  modal: { background: "#fff", borderRadius: 16, width: 440, maxHeight: "90vh", overflow: "auto", boxShadow: "0 20px 40px rgba(0,0,0,0.15)" },
  header: { padding: "20px 24px 16px", borderBottom: "1px solid #f0f2f5", display: "flex", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 16, fontWeight: 600 },
  close: { background: "none", border: "none", fontSize: 16, cursor: "pointer", color: "#9ca3af" },
  body: { padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 },
  field: { display: "flex", flexDirection: "column", gap: 5 },
  label: { fontSize: 12, fontWeight: 500, color: "#374151" },
  input: { height: 38, border: "1px solid #e5e7eb", borderRadius: 8, padding: "0 12px", fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none", width: "100%", background: "#fff" },
  footer: { padding: "16px 24px", borderTop: "1px solid #f0f2f5", display: "flex", justifyContent: "flex-end", gap: 10 },
  cancelBtn: { height: 36, padding: "0 16px", background: "none", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, cursor: "pointer", fontFamily: "inherit" },
  saveBtn: { height: 36, padding: "0 16px", background: "#0066ff", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" },
};
