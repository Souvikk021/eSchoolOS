import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { supabase } from "../lib/supabase";
import Topbar from "../components/Topbar";

/* ── helpers ── */
function StatCard({ label, value, change, color, loading }) {
  return (
    <div style={S.statCard}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0, display: "inline-block" }} />
        <span style={S.statLabel}>{label}</span>
      </div>
      <div style={S.statValue}>{loading ? "—" : value}</div>
      {change && <div style={{ marginTop: 6, fontSize: 12, color: "#9ca3af" }}>{change}</div>}
    </div>
  );
}

function QuickCard({ icon, label, sub, color, bg, onClick }) {
  return (
    <div style={{ ...S.quickCard }} onClick={onClick}>
      <div style={{ ...S.quickIcon, background: bg }}>{icon}</div>
      <div>
        <div style={S.quickLabel}>{label}</div>
        <div style={S.quickSub}>{sub}</div>
      </div>
    </div>
  );
}

/* ── ADMIN DASHBOARD ── */
function AdminDashboard({ user }) {
  const { navigate } = useApp();
  const [stats, setStats] = useState({});
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const sid = user.school_id;

      const [{ count: studentCount }, { count: teacherCount }, feeRes, attRes] = await Promise.all([
        supabase.from("students").select("*", { count: "exact", head: true }).eq("school_id", sid),
        supabase.from("teachers").select("*", { count: "exact", head: true }).eq("school_id", sid),
        supabase.from("fees").select("amount, status").eq("school_id", sid),
        supabase.from("attendance").select("status").eq("school_id", sid).eq("date", new Date().toISOString().split("T")[0]),
      ]);

      const totalFees = feeRes.data?.reduce((s, r) => s + (r.status === "paid" ? r.amount : 0), 0) || 0;
      const todayPresent = attRes.data?.filter(r => r.status === "present").length || 0;
      const todayTotal = attRes.data?.length || 0;

      setStats({
        students: studentCount || 0,
        teachers: teacherCount || 0,
        fees: "₹" + (totalFees / 1000).toFixed(0) + "k",
        att: todayTotal ? Math.round((todayPresent / todayTotal) * 100) + "%" : "N/A",
      });

      // Recent students
      const { data: rec } = await supabase
        .from("students")
        .select("full_name, roll_number, classes(name), sections(name)")
        .eq("school_id", sid)
        .order("created_at", { ascending: false })
        .limit(5);
      setRecent(rec || []);
      setLoading(false);
    }
    load();
  }, [user.school_id]);

  const QUICKS = [
    { icon: "👥", label: "Students", sub: stats.students + " enrolled", color: "#0066ff", bg: "#eff4ff", panel: "students" },
    { icon: "📅", label: "Attendance", sub: "Mark today", color: "#10b981", bg: "#ecfdf5", panel: "attendance" },
    { icon: "💰", label: "Finance", sub: stats.fees + " collected", color: "#f59e0b", bg: "#fffbeb", panel: "finance" },
    { icon: "📚", label: "Academics", sub: "Classes & timetable", color: "#8b5cf6", bg: "#f5f3ff", panel: "academics" },
  ];

  return (
    <div style={S.page}>
      <div style={S.statsGrid}>
        <StatCard label="Total Students" value={stats.students} color="#0066ff" loading={loading} change="Active enrollments" />
        <StatCard label="Today's Attendance" value={stats.att} color="#10b981" loading={loading} change="As of today" />
        <StatCard label="Fees Collected" value={stats.fees} color="#f59e0b" loading={loading} change="This month" />
        <StatCard label="Teachers" value={stats.teachers} color="#8b5cf6" loading={loading} change="Active staff" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {QUICKS.map(q => (
          <QuickCard key={q.label} {...q} onClick={() => navigate(q.panel)} />
        ))}
      </div>

      <div style={S.grid2}>
        <div style={S.card}>
          <div style={S.cardHeader}><span style={S.cardTitle}>Recent Students</span></div>
          <table style={S.table}>
            <thead><tr>{["Name", "Class", "Section", "Roll"].map(h => <th key={h} style={S.th}>{h}</th>)}</tr></thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} style={S.td}>Loading…</td></tr>
              ) : recent.length === 0 ? (
                <tr><td colSpan={4} style={S.td}>No students yet</td></tr>
              ) : recent.map((s, i) => (
                <tr key={i} style={S.tr}>
                  <td style={{ ...S.td, fontWeight: 500 }}>{s.full_name}</td>
                  <td style={S.td}>{s.classes?.name || "—"}</td>
                  <td style={S.td}>{s.sections?.name || "—"}</td>
                  <td style={{ ...S.td, fontFamily: "monospace", fontSize: 13 }}>{s.roll_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={S.card}>
          <div style={S.cardHeader}><span style={S.cardTitle}>Quick Stats</span></div>
          <div style={{ padding: "16px 20px" }}>
            {[
              { label: "Classes", value: "7" },
              { label: "Sections", value: "14" },
              { label: "Pending Fees", value: "₹0" },
              { label: "Today's Date", value: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
            ].map(r => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0f2f5" }}>
                <span style={{ fontSize: 13, color: "#6b7280" }}>{r.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── TEACHER DASHBOARD ── */
function TeacherDashboard({ user }) {
  const { navigate } = useApp();
  const [stats, setStats] = useState({ students: 0, todayAtt: "—", classes: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: teacher } = await supabase
        .from("teachers")
        .select("id, department, subjects")
        .eq("user_id", user.id)
        .single();

      const { count: studentCount } = await supabase
        .from("students")
        .select("*", { count: "exact", head: true })
        .eq("school_id", user.school_id);

      setStats({
        students: studentCount || 0,
        subjects: teacher?.subjects?.join(", ") || "—",
        dept: teacher?.department || "—",
      });
      setLoading(false);
    }
    load();
  }, [user]);

  return (
    <div style={S.page}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard label="My Students" value={stats.students} color="#10b981" loading={loading} />
        <StatCard label="Department" value={stats.dept} color="#0066ff" loading={loading} />
        <StatCard label="Subjects" value={stats.subjects} color="#f59e0b" loading={loading} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        {[
          { icon: "📅", label: "Mark Attendance", sub: "Record today's class", bg: "#ecfdf5", panel: "attendance" },
          { icon: "👥", label: "My Students", sub: "View class roster", bg: "#eff4ff", panel: "students" },
          { icon: "📚", label: "Academics", sub: "Timetable & classes", bg: "#f5f3ff", panel: "academics" },
        ].map(q => <QuickCard key={q.label} {...q} onClick={() => navigate(q.panel)} />)}
      </div>
    </div>
  );
}

/* ── STUDENT / PARENT DASHBOARD ── */
function StudentDashboard({ user }) {
  const { navigate, currentRole } = useApp();
  const [info, setInfo] = useState(null);
  const [fees, setFees] = useState([]);
  const [att, setAtt] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      let studentId = null;

      if (currentRole === "parent") {
        const { data: parent } = await supabase
          .from("parents")
          .select("student_id, relation, students(full_name, roll_number, classes(name), sections(name))")
          .eq("user_id", user.id)
          .single();
        if (parent) {
          studentId = parent.student_id;
          setInfo({ ...parent.students, relation: parent.relation });
        }
      } else {
        const { data: student } = await supabase
          .from("students")
          .select("full_name, roll_number, classes(name), sections(name)")
          .eq("user_id", user.id)
          .single();
        if (student) {
          const { data: s2 } = await supabase.from("students").select("id").eq("user_id", user.id).single();
          studentId = s2?.id;
          setInfo(student);
        }
      }

      if (studentId) {
        const [feeRes, attRes] = await Promise.all([
          supabase.from("fees").select("amount, status, month, fee_types(name)").eq("student_id", studentId).order("created_at", { ascending: false }).limit(5),
          supabase.from("attendance").select("date, status").eq("student_id", studentId).order("date", { ascending: false }).limit(10),
        ]);
        setFees(feeRes.data || []);
        setAtt(attRes.data || []);
      }
      setLoading(false);
    }
    load();
  }, [user, currentRole]);

  const presentDays = att.filter(a => a.status === "present").length;
  const attPct = att.length ? Math.round((presentDays / att.length) * 100) : 0;

  return (
    <div style={S.page}>
      {/* Identity card */}
      {info && (
        <div style={{ ...S.card, marginBottom: 20, padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg,#0066ff,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
            {user.initials}
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{info.full_name}</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>
              {info.classes?.name} — Section {info.sections?.name} · Roll {info.roll_number}
              {info.relation && <span style={{ marginLeft: 8, color: "#06b6d4" }}>({info.relation})</span>}
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>
        <StatCard label="Attendance" value={attPct + "%"} color="#10b981" loading={loading} change={`${presentDays} / ${att.length} days`} />
        <StatCard label="Fees Paid" value={fees.filter(f => f.status === "paid").length + " months"} color="#0066ff" loading={loading} />
        <StatCard label="Pending" value={"₹" + fees.filter(f => f.status === "pending").reduce((s, f) => s + f.amount, 0)} color="#ef4444" loading={loading} />
      </div>

      <div style={S.grid2}>
        {/* Recent fees */}
        <div style={S.card}>
          <div style={S.cardHeader}>
            <span style={S.cardTitle}>Fee History</span>
            <button style={S.linkBtn} onClick={() => navigate("finance")}>View all →</button>
          </div>
          <table style={S.table}>
            <thead><tr>{["Month", "Type", "Amount", "Status"].map(h => <th key={h} style={S.th}>{h}</th>)}</tr></thead>
            <tbody>
              {loading ? <tr><td colSpan={4} style={S.td}>Loading…</td></tr>
                : fees.length === 0 ? <tr><td colSpan={4} style={S.td}>No fee records</td></tr>
                  : fees.map((f, i) => (
                    <tr key={i} style={S.tr}>
                      <td style={S.td}>{f.month}</td>
                      <td style={S.td}>{f.fee_types?.name || "—"}</td>
                      <td style={{ ...S.td, fontFamily: "monospace" }}>₹{f.amount.toLocaleString()}</td>
                      <td style={S.td}><StatusBadge status={f.status} /></td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Attendance */}
        <div style={S.card}>
          <div style={S.cardHeader}>
            <span style={S.cardTitle}>Recent Attendance</span>
            <button style={S.linkBtn} onClick={() => navigate("attendance")}>View all →</button>
          </div>
          <div style={{ padding: "8px 16px" }}>
            {loading ? <div style={S.td}>Loading…</div>
              : att.length === 0 ? <div style={S.td}>No attendance records</div>
                : att.slice(0, 8).map((a, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 4px", borderBottom: "1px solid #f0f2f5" }}>
                    <span style={{ fontSize: 13 }}>{new Date(a.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</span>
                    <StatusBadge status={a.status} />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── ACCOUNTANT DASHBOARD ── */
function AccountantDashboard({ user }) {
  const { navigate } = useApp();
  const [stats, setStats] = useState({ collected: 0, pending: 0, count: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: fees } = await supabase.from("fees").select("amount, status").eq("school_id", user.school_id);
      const collected = fees?.filter(f => f.status === "paid").reduce((s, f) => s + f.amount, 0) || 0;
      const pending = fees?.filter(f => f.status === "pending").reduce((s, f) => s + f.amount, 0) || 0;

      const { data: rec } = await supabase
        .from("fees")
        .select("amount, payment_mode, month, status, students(full_name), fee_types(name)")
        .eq("school_id", user.school_id)
        .order("created_at", { ascending: false })
        .limit(6);

      setStats({ collected, pending, count: fees?.length || 0 });
      setRecent(rec || []);
      setLoading(false);
    }
    load();
  }, [user.school_id]);

  return (
    <div style={S.page}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard label="Total Collected" value={"₹" + (stats.collected / 1000).toFixed(1) + "k"} color="#10b981" loading={loading} />
        <StatCard label="Pending Amount" value={"₹" + (stats.pending / 1000).toFixed(1) + "k"} color="#ef4444" loading={loading} />
        <StatCard label="Transactions" value={stats.count} color="#0066ff" loading={loading} />
      </div>

      <div style={S.card}>
        <div style={S.cardHeader}>
          <span style={S.cardTitle}>Recent Transactions</span>
          <button style={S.linkBtn} onClick={() => navigate("finance")}>Collect Fee →</button>
        </div>
        <table style={S.table}>
          <thead><tr>{["Student", "Fee Type", "Month", "Amount", "Mode", "Status"].map(h => <th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={6} style={S.td}>Loading…</td></tr>
              : recent.map((r, i) => (
                <tr key={i} style={S.tr}>
                  <td style={{ ...S.td, fontWeight: 500 }}>{r.students?.full_name || "—"}</td>
                  <td style={S.td}>{r.fee_types?.name || "—"}</td>
                  <td style={S.td}>{r.month}</td>
                  <td style={{ ...S.td, fontFamily: "monospace" }}>₹{r.amount.toLocaleString()}</td>
                  <td style={S.td}>{r.payment_mode || "—"}</td>
                  <td style={S.td}><StatusBadge status={r.status} /></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    present: { bg: "#ecfdf5", color: "#059669" },
    absent: { bg: "#fef2f2", color: "#dc2626" },
    late: { bg: "#fffbeb", color: "#d97706" },
    paid: { bg: "#ecfdf5", color: "#059669" },
    pending: { bg: "#fef2f2", color: "#dc2626" },
    partial: { bg: "#fffbeb", color: "#d97706" },
  };
  const style = map[status] || { bg: "#f3f4f6", color: "#6b7280" };
  return (
    <span style={{ background: style.bg, color: style.color, fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 4 }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: style.color, display: "inline-block" }} />
      {status}
    </span>
  );
}

export default function Dashboard() {
  const { currentUser, currentRole } = useApp();

  if (!currentUser) return null;

  const meta = {
    admin: { title: "Dashboard", sub: currentUser.school },
    superadmin: { title: "Dashboard", sub: "System Overview" },
    teacher: { title: `Welcome, ${currentUser.name.split(" ")[0]}`, sub: currentUser.school },
    student: { title: `Hello, ${currentUser.name.split(" ")[0]}`, sub: currentUser.school },
    parent: { title: `Hello, ${currentUser.name.split(" ")[0]}`, sub: "Parent Portal" },
    accountant: { title: "Finance Dashboard", sub: currentUser.school },
  };

  const m = meta[currentRole] || meta.admin;

  return (
    <>
      <Topbar title={m.title} sub={m.sub} />
      {currentRole === "admin" && <AdminDashboard user={currentUser} />}
      {currentRole === "superadmin" && <AdminDashboard user={currentUser} />}
      {currentRole === "teacher" && <TeacherDashboard user={currentUser} />}
      {currentRole === "student" && <StudentDashboard user={currentUser} />}
      {currentRole === "parent" && <StudentDashboard user={currentUser} />}
      {currentRole === "accountant" && <AccountantDashboard user={currentUser} />}
    </>
  );
}

/* ── STYLES ── */
const S = {
  page: { padding: "24px 28px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 },
  statCard: { background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, padding: 20, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" },
  statLabel: { fontSize: 12, color: "#9ca3af", fontWeight: 500 },
  statValue: { fontSize: 26, fontWeight: 600, letterSpacing: "-0.8px", lineHeight: 1 },
  quickCard: { background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, padding: 16, cursor: "pointer", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.04)", transition: "box-shadow 0.15s" },
  quickIcon: { width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 },
  quickLabel: { fontSize: 13, fontWeight: 500 },
  quickSub: { fontSize: 11, color: "#9ca3af", marginTop: 1 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 },
  card: { background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.04)", overflow: "hidden" },
  cardHeader: { padding: "14px 20px", borderBottom: "1px solid #f0f2f5", display: "flex", alignItems: "center", justifyContent: "space-between" },
  cardTitle: { fontSize: 14, fontWeight: 600 },
  linkBtn: { background: "none", border: "none", fontSize: 12, color: "#0066ff", cursor: "pointer", fontFamily: "inherit" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.5px", textTransform: "uppercase", padding: "10px 16px", borderBottom: "1px solid #e8eaed" },
  td: { padding: "11px 16px", fontSize: 13, borderBottom: "1px solid #f0f2f5", color: "#0f1117" },
  tr: { transition: "background 0.1s" },
};
