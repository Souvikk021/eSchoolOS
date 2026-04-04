import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { supabase } from "../lib/supabase";
import Topbar from "../components/Topbar";

export default function Reports() {
  const { currentUser, currentRole } = useApp();
  const [activeTab, setActiveTab] = useState("attendance");
  const [stats, setStats] = useState({});
  const [attData, setAttData] = useState([]);
  const [feeData, setFeeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    async function load() {
      const sid = currentUser.school_id;

      const [
        { count: studentCount },
        { count: teacherCount },
        attRes,
        feeRes,
      ] = await Promise.all([
        supabase.from("students").select("*", { count: "exact", head: true }).eq("school_id", sid),
        supabase.from("teachers").select("*", { count: "exact", head: true }).eq("school_id", sid),
        supabase.from("attendance").select("school_id, status, class_id, classes(name)").eq("school_id", sid),
        supabase.from("fees").select("amount, status, student_id, students(full_name, classes(name))").eq("school_id", sid),
      ]);

      const att = attRes.data || [];
      const fees = feeRes.data || [];
      const totalPresent = att.filter(a => a.status === "present").length;
      const totalAtt = att.length;
      const totalFees = fees.filter(f => f.status === "paid").reduce((s, f) => s + f.amount, 0);
      const pendingFees = fees.filter(f => f.status === "pending").reduce((s, f) => s + f.amount, 0);

      setStats({
        students: studentCount || 0,
        teachers: teacherCount || 0,
        attRate: totalAtt ? Math.round((totalPresent / totalAtt) * 100) : 0,
        totalPresent,
        totalAtt,
        collectedFees: totalFees,
        pendingFees,
        feeCount: fees.length,
      });

      // Class-wise attendance summary
      const classMap = {};
      att.forEach(a => {
        const cls = a.classes?.name || "Unknown";
        if (!classMap[cls]) classMap[cls] = { present: 0, absent: 0, total: 0 };
        classMap[cls].total++;
        if (a.status === "present") classMap[cls].present++;
        else if (a.status === "absent") classMap[cls].absent++;
      });
      setAttData(Object.entries(classMap).map(([name, v]) => ({ name, ...v, rate: v.total ? Math.round((v.present / v.total) * 100) : 0 })).sort((a, b) => b.rate - a.rate));

      // Fee summary per student
      const studentFeeMap = {};
      fees.forEach(f => {
        const name = f.students?.full_name || "Unknown";
        const cls = f.students?.classes?.name || "—";
        if (!studentFeeMap[name]) studentFeeMap[name] = { name, cls, paid: 0, pending: 0 };
        if (f.status === "paid") studentFeeMap[name].paid += f.amount;
        else if (f.status === "pending") studentFeeMap[name].pending += f.amount;
      });
      const defaulters = Object.values(studentFeeMap).filter(s => s.pending > 0).sort((a, b) => b.pending - a.pending).slice(0, 5);
      setFeeData(defaulters);

      setLoading(false);
    }
    load();
  }, [currentUser]);

  const TABS = [
    { id: "attendance", label: "Attendance Reports" },
    { id: "financial", label: "Financial Reports" },
    { id: "overview", label: "Overview" },
  ];

  return (
    <>
      <Topbar title="Reports" sub="Analytics & insights" />
      <div style={{ padding: "24px 28px" }}>
        {/* Summary stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Total Students", value: stats.students, color: "#0066ff" },
            { label: "Teachers", value: stats.teachers, color: "#10b981" },
            { label: "Avg Attendance", value: (stats.attRate || 0) + "%", color: "#8b5cf6" },
            { label: "Fees Collected", value: "₹" + ((stats.collectedFees || 0) / 1000).toFixed(1) + "k", color: "#f59e0b" },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, padding: 20, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, display: "inline-block" }} />
                <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>{s.label}</span>
              </div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.8px", lineHeight: 1 }}>{loading ? "—" : s.value}</div>
            </div>
          ))}
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: 2, borderBottom: "1px solid #e8eaed", marginBottom: 20 }}>
          {TABS.map(t => (
            <div key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: "10px 16px", fontSize: 13.5, fontWeight: 500, cursor: "pointer",
              borderBottom: activeTab === t.id ? "2px solid #0066ff" : "2px solid transparent",
              marginBottom: -1, color: activeTab === t.id ? "#0066ff" : "#9ca3af",
            }}>{t.label}</div>
          ))}
        </div>

        {/* Attendance tab */}
        {activeTab === "attendance" && (
          <div style={C.card}>
            <div style={C.header}>
              <div>
                <div style={C.title}>Class-wise Attendance Summary</div>
                <div style={C.sub}>Based on all recorded attendance data</div>
              </div>
            </div>
            <table style={T.table}>
              <thead><tr>{["Class", "Total Records", "Present", "Absent", "Rate"].map(h => <th key={h} style={T.th}>{h}</th>)}</tr></thead>
              <tbody>
                {loading ? <tr><td colSpan={5} style={T.td}>Loading…</td></tr>
                  : attData.length === 0 ? <tr><td colSpan={5} style={{ ...T.td, textAlign: "center", color: "#9ca3af" }}>No attendance data found</td></tr>
                    : attData.map((r, i) => {
                      const color = r.rate >= 90 ? "#059669" : r.rate >= 75 ? "#d97706" : "#dc2626";
                      const bg = r.rate >= 90 ? "#ecfdf5" : r.rate >= 75 ? "#fffbeb" : "#fef2f2";
                      return (
                        <tr key={i}>
                          <td style={{ ...T.td, fontWeight: 500 }}>{r.name}</td>
                          <td style={T.td}>{r.total}</td>
                          <td style={{ ...T.td, color: "#059669", fontWeight: 500 }}>{r.present}</td>
                          <td style={{ ...T.td, color: "#dc2626" }}>{r.absent}</td>
                          <td style={T.td}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ background: "#f0f2f5", borderRadius: 4, height: 6, width: 80, overflow: "hidden" }}>
                                <div style={{ background: color, height: "100%", width: `${r.rate}%` }} />
                              </div>
                              <span style={{ background: bg, color, fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20 }}>{r.rate}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        )}

        {/* Financial tab */}
        {activeTab === "financial" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Summary */}
            <div style={C.card}>
              <div style={C.header}><div style={C.title}>Fee Summary</div></div>
              <div style={{ padding: "16px 20px" }}>
                {[
                  { label: "Total Collected", value: "₹" + ((stats.collectedFees || 0) / 1000).toFixed(1) + "k", color: "#059669" },
                  { label: "Pending Amount", value: "₹" + ((stats.pendingFees || 0) / 1000).toFixed(1) + "k", color: "#dc2626" },
                  { label: "Total Transactions", value: stats.feeCount || 0, color: "#0066ff" },
                  { label: "Collection Rate", value: stats.feeCount ? Math.round((stats.collectedFees / (stats.collectedFees + stats.pendingFees)) * 100) + "%" : "—", color: "#8b5cf6" },
                ].map(s => (
                  <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f0f2f5" }}>
                    <span style={{ fontSize: 13, color: "#6b7280" }}>{s.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{loading ? "—" : s.value}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Top defaulters */}
            <div style={C.card}>
              <div style={C.header}><div style={C.title}>Top Fee Defaulters</div></div>
              <table style={T.table}>
                <thead><tr>{["Student", "Class", "Pending"].map(h => <th key={h} style={T.th}>{h}</th>)}</tr></thead>
                <tbody>
                  {loading ? <tr><td colSpan={3} style={T.td}>Loading…</td></tr>
                    : feeData.length === 0 ? <tr><td colSpan={3} style={{ ...T.td, textAlign: "center", color: "#9ca3af" }}>No pending fees</td></tr>
                      : feeData.map((d, i) => (
                        <tr key={i}>
                          <td style={{ ...T.td, fontWeight: 500 }}>{d.name}</td>
                          <td style={T.td}>{d.cls}</td>
                          <td style={{ ...T.td, fontFamily: "monospace", color: "#dc2626", fontWeight: 600 }}>₹{d.pending.toLocaleString()}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Overview tab */}
        {activeTab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={C.card}>
              <div style={C.header}><div style={C.title}>School Summary</div></div>
              <div style={{ padding: "16px 20px" }}>
                {[
                  { label: "Total Students", value: stats.students },
                  { label: "Total Teachers", value: stats.teachers },
                  { label: "Attendance Records", value: stats.totalAtt },
                  { label: "Fee Transactions", value: stats.feeCount },
                  { label: "Today's Date", value: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
                ].map(s => (
                  <div key={s.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0f2f5" }}>
                    <span style={{ fontSize: 13, color: "#6b7280" }}>{s.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{loading && typeof s.value === "number" ? "—" : s.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={C.card}>
              <div style={C.header}><div style={C.title}>Attendance Overview</div></div>
              <div style={{ padding: "20px" }}>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <div style={{ fontSize: 48, fontWeight: 700, color: stats.attRate >= 80 ? "#059669" : "#dc2626" }}>{stats.attRate || 0}%</div>
                  <div style={{ fontSize: 13, color: "#9ca3af" }}>Overall attendance rate</div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  {[
                    { label: "Present", value: stats.totalPresent || 0, color: "#059669", bg: "#ecfdf5" },
                    { label: "Total", value: stats.totalAtt || 0, color: "#0066ff", bg: "#eff4ff" },
                  ].map(s => (
                    <div key={s.label} style={{ flex: 1, background: s.bg, borderRadius: 10, padding: "12px", textAlign: "center" }}>
                      <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{loading ? "—" : s.value}</div>
                      <div style={{ fontSize: 11, color: s.color, fontWeight: 500 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const C = {
  card: { background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" },
  header: { padding: "14px 20px", borderBottom: "1px solid #f0f2f5", display: "flex", alignItems: "center", justifyContent: "space-between" },
  title: { fontSize: 14, fontWeight: 600 },
  sub: { fontSize: 12, color: "#9ca3af", marginTop: 2 },
};
const T = {
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.5px", textTransform: "uppercase", padding: "10px 16px", borderBottom: "1px solid #e8eaed", whiteSpace: "nowrap" },
  td: { padding: "12px 16px", fontSize: 13.5, borderBottom: "1px solid #f0f2f5", color: "#0f1117" },
};
