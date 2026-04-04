import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { supabase } from "../lib/supabase";
import Topbar from "../components/Topbar";

/* ── Classes & Sections Tab ── */
function ClassesTab({ schoolId }) {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [{ data: cls }, { data: secs }] = await Promise.all([
        supabase.from("classes").select("*").eq("school_id", schoolId).order("name"),
        supabase.from("sections").select("*, classes(name)").eq("school_id", schoolId).order("name"),
      ]);
      setClasses(cls || []);
      setSections(secs || []);
      setLoading(false);
    }
    load();
  }, [schoolId]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>
      <div style={C.card}>
        <div style={C.header}>
          <div>
            <div style={C.title}>Classes</div>
            <div style={C.sub}>{classes.length} classes configured</div>
          </div>
        </div>
        <table style={T.table}>
          <thead><tr>{["Class", "Sections", ""].map(h => <th key={h} style={T.th}>{h}</th>)}</tr></thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} style={T.td}>Loading…</td></tr>
            ) : classes.length === 0 ? (
              <tr><td colSpan={3} style={T.td}>No classes found</td></tr>
            ) : classes.map(c => {
              const classSections = sections.filter(s => s.class_id === c.id);
              return (
                <tr key={c.id}>
                  <td style={{ ...T.td, fontWeight: 500 }}>{c.name}</td>
                  <td style={{ ...T.td, color: "#6b7280" }}>
                    {classSections.length > 0 ? classSections.map(s => s.name).join(", ") : "—"}
                  </td>
                  <td style={T.td}><button style={BtnS.ghost}>Edit</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div>
        <div style={{ ...C.card, marginBottom: 16 }}>
          <div style={C.header}><div style={C.title}>All Sections</div></div>
          <div style={{ padding: "16px 20px", display: "flex", flexWrap: "wrap", gap: 8 }}>
            {loading ? <span style={{ fontSize: 13, color: "#9ca3af" }}>Loading…</span>
              : sections.length === 0 ? <span style={{ fontSize: 13, color: "#9ca3af" }}>No sections found</span>
                : sections.map((s, i) => (
                  <span key={s.id} style={{
                    background: ["#eff4ff", "#ecfdf5", "#fffbeb", "#f5f3ff"][i % 4],
                    color: ["#0066ff", "#059669", "#d97706", "#8b5cf6"][i % 4],
                    fontSize: 13, fontWeight: 500, padding: "6px 14px", borderRadius: 20, cursor: "pointer",
                  }}>{s.classes?.name} — {s.name}</span>
                ))}
          </div>
        </div>
        <div style={C.card}>
          <div style={C.header}><div style={C.title}>Quick Stats</div></div>
          <div style={{ padding: "16px 20px" }}>
            {[
              { label: "Total Classes", value: classes.length, color: "#0066ff" },
              { label: "Total Sections", value: sections.length, color: "#10b981" },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f0f2f5" }}>
                <span style={{ fontSize: 13, color: "#6b7280" }}>{s.label}</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Subjects Tab ── */
function SubjectsTab({ schoolId }) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      let q = supabase.from("subjects").select("*").eq("school_id", schoolId).order("name");
      const { data } = await q;
      setSubjects(data || []);
      setLoading(false);
    }
    load();
  }, [schoolId]);

  const filtered = search
    ? subjects.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.code?.toLowerCase().includes(search.toLowerCase()))
    : subjects;

  return (
    <>
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: 14 }}>🔍</span>
          <input style={{ ...INP, paddingLeft: 32, width: 220 }} placeholder="Search subjects…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div style={C.card}>
        <table style={T.table}>
          <thead><tr>{["Subject", "Code", "Department", ""].map(h => <th key={h} style={T.th}>{h}</th>)}</tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={4} style={T.td}>Loading…</td></tr>
              : filtered.length === 0 ? <tr><td colSpan={4} style={{ ...T.td, textAlign: "center", color: "#9ca3af" }}>No subjects found</td></tr>
                : filtered.map(s => (
                  <tr key={s.id}>
                    <td style={{ ...T.td, fontWeight: 500 }}>{s.name}</td>
                    <td style={{ ...T.td, fontFamily: "monospace", fontSize: 12 }}>{s.code || "—"}</td>
                    <td style={T.td}>{s.department || "—"}</td>
                    <td style={T.td}><button style={BtnS.ghost}>Edit</button></td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ── Timetable Tab (static placeholder until timetable table exists) ── */
function TimetableTab() {
  return (
    <div style={{ ...C.card, padding: "40px 20px", textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
      📅 Timetable management coming soon — requires the <code>timetable_slots</code> table.
    </div>
  );
}

/* ── Assignments Tab ── */
function AssignmentsTab({ schoolId }) {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("assignments")
        .select("*, subjects(name), classes(name)")
        .eq("school_id", schoolId)
        .order("due_date", { ascending: true });
      setAssignments(data || []);
      setLoading(false);
    }
    load();
  }, [schoolId]);

  return (
    <div style={C.card}>
      <table style={T.table}>
        <thead>
          <tr>{["Title", "Class", "Subject", "Due Date", ""].map(h => <th key={h} style={T.th}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {loading ? <tr><td colSpan={5} style={T.td}>Loading…</td></tr>
            : assignments.length === 0
              ? <tr><td colSpan={5} style={{ ...T.td, textAlign: "center", color: "#9ca3af" }}>No assignments found</td></tr>
              : assignments.map((a, i) => (
                <tr key={i}>
                  <td style={{ ...T.td, fontWeight: 500, maxWidth: 240 }}>{a.title}</td>
                  <td style={T.td}>{a.classes?.name || "—"}</td>
                  <td style={T.td}>{a.subjects?.name || a.subject || "—"}</td>
                  <td style={{ ...T.td, fontFamily: "monospace", fontSize: 12 }}>
                    {a.due_date ? new Date(a.due_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—"}
                  </td>
                  <td style={T.td}><button style={BtnS.ghost}>View</button></td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── MAIN COMPONENT ── */
const TABS = [
  { id: "classes", label: "Classes & Sections" },
  { id: "subjects", label: "Subjects" },
  { id: "timetable", label: "Timetable" },
  { id: "assignments", label: "Assignments" },
];

export default function Academics() {
  const { currentUser, currentRole } = useApp();
  const [activeTab, setActiveTab] = useState("classes");

  if (!currentUser) return null;

  const views = {
    classes: <ClassesTab schoolId={currentUser.school_id} />,
    subjects: <SubjectsTab schoolId={currentUser.school_id} />,
    timetable: <TimetableTab />,
    assignments: <AssignmentsTab schoolId={currentUser.school_id} />,
  };

  return (
    <>
      <Topbar title="Academics" sub="Classes, subjects & curriculum" />
      <div style={{ padding: "24px 28px" }}>
        <div style={{ display: "flex", gap: 2, borderBottom: "1px solid #e8eaed", marginBottom: 20 }}>
          {TABS.map(t => (
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
const INP = { height: 36, border: "1px solid #e5e7eb", borderRadius: 8, padding: "0 12px", fontSize: 13.5, fontFamily: "'DM Sans',sans-serif", outline: "none", background: "#fff", minWidth: 140 };
const BtnS = {
  ghost: { height: 28, padding: "0 10px", background: "none", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 12, cursor: "pointer", fontFamily: "inherit" },
};
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