import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { supabase } from "../lib/supabase";
import Topbar from "../components/Topbar";

function Badge({ status }) {
  const map = { paid: ["#ecfdf5", "#059669"], pending: ["#fef2f2", "#dc2626"], partial: ["#fffbeb", "#d97706"] };
  const [bg, c] = map[status] || ["#f3f4f6", "#6b7280"];
  return <span style={{ background: bg, color: c, fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 20 }}>{status}</span>;
}

/* ── COLLECT FEE (admin / accountant) ── */
function CollectFee({ user }) {
  const [feeTypes, setFeeTypes] = useState([]);
  const [students, setStudents] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [search, setSearch] = useState("");
  const [selStudent, setSelStudent] = useState(null);
  const [form, setForm] = useState({ fee_type_id: "", month: "", amount: "", payment_mode: "cash" });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [tab, setTab] = useState("collect");

  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    .map(m => `${m}-${new Date().getFullYear()}`);

  useEffect(() => {
    supabase.from("fee_types").select("*").eq("school_id", user.school_id).then(({ data }) => setFeeTypes(data || []));
    fetchReceipts();
  }, []);

  useEffect(() => {
    if (!search) { setStudents([]); return; }
    supabase.from("students").select("id, full_name, roll_number, classes(name)")
      .eq("school_id", user.school_id).ilike("full_name", `%${search}%`).limit(5)
      .then(({ data }) => setStudents(data || []));
  }, [search]);

  useEffect(() => {
    const ft = feeTypes.find(f => f.id === form.fee_type_id);
    if (ft) setForm(p => ({ ...p, amount: ft.amount }));
  }, [form.fee_type_id]);

  async function fetchReceipts() {
    const { data } = await supabase.from("fees")
      .select("*, students(full_name), fee_types(name)")
      .eq("school_id", user.school_id)
      .order("created_at", { ascending: false }).limit(20);
    setReceipts(data || []);
  }

  async function collect() {
    if (!selStudent || !form.fee_type_id || !form.month || !form.amount) return;
    setSaving(true);
    const { error } = await supabase.from("fees").insert([{
      school_id: user.school_id,
      student_id: selStudent.id,
      fee_type_id: form.fee_type_id,
      collected_by: user.id,
      amount: parseInt(form.amount),
      payment_mode: form.payment_mode,
      month: form.month,
      status: "paid",
    }]);
    setSaving(false);
    if (!error) {
      setSuccess(`Fee collected for ${selStudent.full_name}`);
      setSelStudent(null); setSearch(""); setStudents([]);
      setForm({ fee_type_id: "", month: "", amount: "", payment_mode: "cash" });
      fetchReceipts();
      setTimeout(() => setSuccess(""), 3000);
    }
  }

  const TABS = ["collect", "records", "due"];

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ display: "flex", gap: 2, borderBottom: "1px solid #e8eaed", marginBottom: 20 }}>
        {TABS.map(t => (
          <div key={t} onClick={() => setTab(t)} style={{ padding: "10px 16px", fontSize: 13.5, fontWeight: 500, cursor: "pointer", borderBottom: tab === t ? "2px solid #0066ff" : "2px solid transparent", marginBottom: -1, color: tab === t ? "#0066ff" : "#9ca3af", textTransform: "capitalize" }}>{t === "due" ? "Due List" : t === "collect" ? "Collect Fee" : "All Records"}</div>
        ))}
      </div>

      {tab === "collect" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Form */}
          <div style={C.card}>
            <div style={C.header}><span style={C.title}>Collect Fee</span></div>
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
              {success && <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#059669" }}>✓ {success}</div>}

              {/* Student search */}
              <div style={FLD}>
                <label style={LBL}>Student *</label>
                <input style={INP} placeholder="Search by name…" value={selStudent ? selStudent.full_name : search}
                  onChange={e => { setSearch(e.target.value); setSelStudent(null); }} />
                {students.length > 0 && !selStudent && (
                  <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden", marginTop: 2 }}>
                    {students.map(s => (
                      <div key={s.id} onClick={() => { setSelStudent(s); setStudents([]); setSearch(""); }}
                        style={{ padding: "10px 14px", cursor: "pointer", fontSize: 13, display: "flex", justifyContent: "space-between" }}
                        onMouseEnter={e => e.target.style.background = "#f9fafb"} onMouseLeave={e => e.target.style.background = "#fff"}>
                        <span style={{ fontWeight: 500 }}>{s.full_name}</span>
                        <span style={{ color: "#9ca3af" }}>{s.classes?.name} · {s.roll_number}</span>
                      </div>
                    ))}
                  </div>
                )}
                {selStudent && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#eff4ff", border: "1px solid #c7d9ff", borderRadius: 8, padding: "8px 12px" }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#0066ff" }}>{selStudent.full_name} · {selStudent.classes?.name}</span>
                    <button onClick={() => setSelStudent(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 16 }}>✕</button>
                  </div>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={FLD}>
                  <label style={LBL}>Fee Type *</label>
                  <select style={INP} value={form.fee_type_id} onChange={e => setForm(p => ({ ...p, fee_type_id: e.target.value }))}>
                    <option value="">Select type</option>
                    {feeTypes.map(f => <option key={f.id} value={f.id}>{f.name} (₹{f.amount})</option>)}
                  </select>
                </div>
                <div style={FLD}>
                  <label style={LBL}>Month *</label>
                  <select style={INP} value={form.month} onChange={e => setForm(p => ({ ...p, month: e.target.value }))}>
                    <option value="">Select month</option>
                    {MONTHS.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={FLD}>
                  <label style={LBL}>Amount (₹) *</label>
                  <input style={{ ...INP, fontFamily: "monospace" }} type="number" value={form.amount}
                    onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} placeholder="5000" />
                </div>
                <div style={FLD}>
                  <label style={LBL}>Payment Mode</label>
                  <select style={INP} value={form.payment_mode} onChange={e => setForm(p => ({ ...p, payment_mode: e.target.value }))}>
                    {["cash", "upi", "cheque", "dd", "bank"].map(m => <option key={m} value={m}>{m.toUpperCase()}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={collect} disabled={saving || !selStudent || !form.fee_type_id || !form.month}
                style={{ height: 42, background: "#0066ff", color: "#fff", border: "none", borderRadius: 9, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", opacity: (!selStudent || !form.fee_type_id || !form.month) ? 0.55 : 1 }}>
                {saving ? "Processing…" : `Collect ₹${form.amount || "—"}`}
              </button>
            </div>
          </div>

          {/* Recent receipts */}
          <div style={C.card}>
            <div style={C.header}><span style={C.title}>Recent Receipts</span></div>
            <div style={{ padding: "0 20px 8px" }}>
              {receipts.slice(0, 8).map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: i < 7 ? "1px solid #f0f2f5" : "none" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{r.students?.full_name || "—"}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>{r.fee_types?.name} · {r.month} · {r.payment_mode?.toUpperCase()}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, fontFamily: "monospace", color: r.status === "paid" ? "#059669" : r.status === "pending" ? "#dc2626" : "#d97706" }}>₹{r.amount?.toLocaleString()}</div>
                    <Badge status={r.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "records" && (
        <div style={C.card}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>{["Student", "Fee Type", "Month", "Amount", "Mode", "Status", "Date"].map(h => <th key={h} style={TH}>{h}</th>)}</tr></thead>
            <tbody>
              {receipts.map((r, i) => (
                <tr key={i}>
                  <td style={TD}>{r.students?.full_name || "—"}</td>
                  <td style={TD}>{r.fee_types?.name || "—"}</td>
                  <td style={TD}>{r.month}</td>
                  <td style={{ ...TD, fontFamily: "monospace" }}>₹{r.amount?.toLocaleString()}</td>
                  <td style={TD}>{r.payment_mode?.toUpperCase() || "—"}</td>
                  <td style={TD}><Badge status={r.status} /></td>
                  <td style={{ ...TD, color: "#9ca3af", fontSize: 12 }}>{new Date(r.created_at).toLocaleDateString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "due" && (
        <div style={C.card}>
          <div style={{ padding: "40px 20px", textAlign: "center", color: "#9ca3af" }}>
            Due list — connect to pending fees query (coming soon)
          </div>
        </div>
      )}
    </div>
  );
}

/* ── VIEW FEES (student / parent) ── */
function ViewFees({ user, isParent }) {
  const { currentRole } = useApp();
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      let studentId;
      if (isParent) {
        const { data } = await supabase.from("parents").select("student_id").eq("user_id", user.id).single();
        studentId = data?.student_id;
      } else {
        const { data } = await supabase.from("students").select("id").eq("user_id", user.id).single();
        studentId = data?.id;
      }
      if (!studentId) { setLoading(false); return; }
      const { data } = await supabase.from("fees").select("*, fee_types(name)")
        .eq("student_id", studentId).order("created_at", { ascending: false });
      setFees(data || []);
      setLoading(false);
    }
    load();
  }, [user]);

  const totalPaid = fees.filter(f => f.status === "paid").reduce((s, f) => s + f.amount, 0);
  const totalPending = fees.filter(f => f.status === "pending").reduce((s, f) => s + f.amount, 0);

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Paid", value: "₹" + totalPaid.toLocaleString(), color: "#10b981" },
          { label: "Pending", value: "₹" + totalPending.toLocaleString(), color: "#ef4444" },
          { label: "Transactions", value: fees.length, color: "#0066ff" },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={C.card}>
        <div style={C.header}><span style={C.title}>Fee History</span></div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>{["Fee Type", "Month", "Amount", "Mode", "Status"].map(h => <th key={h} style={TH}>{h}</th>)}</tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={5} style={{ padding: 20, textAlign: "center", color: "#9ca3af" }}>Loading…</td></tr>
              : fees.length === 0 ? <tr><td colSpan={5} style={{ padding: 20, textAlign: "center", color: "#9ca3af" }}>No fee records found</td></tr>
                : fees.map((f, i) => (
                  <tr key={i}>
                    <td style={TD}>{f.fee_types?.name || "—"}</td>
                    <td style={TD}>{f.month}</td>
                    <td style={{ ...TD, fontFamily: "monospace", fontWeight: 600 }}>₹{f.amount.toLocaleString()}</td>
                    <td style={TD}>{f.payment_mode?.toUpperCase() || "—"}</td>
                    <td style={TD}><Badge status={f.status} /></td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Finance() {
  const { currentUser, currentRole } = useApp();
  const canCollect = ["admin", "superadmin", "accountant"].includes(currentRole);

  return (
    <>
      <Topbar title="Finance" sub={canCollect ? "Collect & manage fees" : "My fee history"} />
      {canCollect
        ? <CollectFee user={currentUser} />
        : <ViewFees user={currentUser} isParent={currentRole === "parent"} />
      }
    </>
  );
}

const FLD = { display: "flex", flexDirection: "column", gap: 5 };
const LBL = { fontSize: 12, fontWeight: 500, color: "#374151" };
const INP = { height: 38, border: "1px solid #e5e7eb", borderRadius: 8, padding: "0 12px", fontSize: 13.5, fontFamily: "'DM Sans',sans-serif", outline: "none", background: "#fff", width: "100%", cursor: "pointer" };
const TH = { textAlign: "left", fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.5px", textTransform: "uppercase", padding: "10px 16px", borderBottom: "1px solid #e8eaed", whiteSpace: "nowrap" };
const TD = { padding: "12px 16px", fontSize: 13, borderBottom: "1px solid #f0f2f5", color: "#0f1117" };
const C = {
  card: { background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" },
  header: { padding: "14px 20px", borderBottom: "1px solid #f0f2f5", display: "flex", alignItems: "center", justifyContent: "space-between" },
  title: { fontSize: 14, fontWeight: 600 },
};
