import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { supabase } from "../lib/supabase";
import Topbar from "../components/Topbar";

function Badge({ status }) {
  const map = { present: ["#ecfdf5", "#059669"], absent: ["#fef2f2", "#dc2626"], late: ["#fffbeb", "#d97706"] };
  const [bg, c] = map[status] || ["#f3f4f6", "#6b7280"];
  return <span style={{ background: bg, color: c, fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 4 }}>
    <span style={{ width: 5, height: 5, borderRadius: "50%", background: c, display: "inline-block" }} />{status}
  </span>;
}

/* ── TEACHER / ADMIN: Mark attendance ── */
function MarkAttendance({ user }) {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [selClass, setSelClass] = useState("");
  const [selSec, setSelSec] = useState("");
  const [attMap, setAttMap] = useState({});   // studentId → "present"|"absent"|"late"
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    supabase.from("classes").select("*").eq("school_id", user.school_id)
      .then(({ data }) => setClasses(data || []));
  }, []);

  useEffect(() => {
    if (!selClass) { setSections([]); setStudents([]); return; }
    supabase.from("sections").select("*").eq("class_id", selClass)
      .then(({ data }) => setSections(data || []));
  }, [selClass]);

  useEffect(() => {
    if (!selClass) { setStudents([]); return; }
    let q = supabase.from("students").select("id, full_name, roll_number")
      .eq("class_id", selClass).eq("school_id", user.school_id);
    if (selSec) q = q.eq("section_id", selSec);
    q.order("roll_number").then(({ data }) => {
      setStudents(data || []);
      const map = {};
      (data || []).forEach(s => map[s.id] = "present");
      setAttMap(map);
      setSaved(false);
    });
  }, [selClass, selSec]);

  // Check existing attendance for today
  useEffect(() => {
    if (!students.length) return;
    supabase.from("attendance").select("student_id, status").eq("date", today)
      .in("student_id", students.map(s => s.id))
      .then(({ data }) => {
        if (data?.length) {
          const map = { ...attMap };
          data.forEach(r => { map[r.student_id] = r.status; });
          setAttMap(map);
        }
      });
  }, [students]);

  async function saveAttendance() {
    if (!students.length) return;
    setSaving(true);
    const rows = students.map(s => ({
      school_id: user.school_id,
      student_id: s.id,
      class_id: selClass,
      section_id: selSec || null,
      marked_by: user.id,
      status: attMap[s.id] || "present",
      date: today,
    }));
    await supabase.from("attendance").upsert(rows, { onConflict: "student_id,date" });
    setSaving(false);
    setSaved(true);
  }

  const presentCount = Object.values(attMap).filter(v => v === "present").length;
  const absentCount = Object.values(attMap).filter(v => v === "absent").length;

  return (
    <div style={{ padding: "24px 28px" }}>
      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "flex-end" }}>
        <div style={FLD}>
          <label style={LBL}>Class</label>
          <select style={SEL} value={selClass} onChange={e => { setSelClass(e.target.value); setSelSec(""); }}>
            <option value="">Select class</option>
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div style={FLD}>
          <label style={LBL}>Section</label>
          <select style={SEL} value={selSec} onChange={e => setSelSec(e.target.value)} disabled={!selClass}>
            <option value="">All sections</option>
            {sections.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          {saved && <span style={{ fontSize: 13, color: "#059669" }}>✓ Saved!</span>}
          <button style={BtnS.ghost} onClick={() => { const m = { ...attMap }; students.forEach(s => m[s.id] = "present"); setAttMap(m); }}>
            All Present
          </button>
          <button style={BtnS.primary} onClick={saveAttendance} disabled={saving || !students.length}>
            {saving ? "Saving…" : "Save Attendance"}
          </button>
        </div>
      </div>

      {students.length > 0 && (
        <>
          {/* Summary */}
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            {[
              { label: "Present", val: presentCount, bg: "#ecfdf5", c: "#059669" },
              { label: "Absent", val: absentCount, bg: "#fef2f2", c: "#dc2626" },
              { label: "Total", val: students.length, bg: "#f0f2f5", c: "#374151" },
            ].map(s => (
              <div key={s.label} style={{ background: s.bg, borderRadius: 10, padding: "10px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: s.c }}>{s.val}</div>
                <div style={{ fontSize: 11, color: s.c, fontWeight: 500, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Student list */}
          <div style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, overflow: "hidden" }}>
            {students.map((s, i) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: i < students.length - 1 ? "1px solid #f0f2f5" : "none", background: attMap[s.id] === "absent" ? "#fff8f8" : "transparent" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: "monospace", fontSize: 12, color: "#9ca3af", width: 28 }}>{s.roll_number}</span>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{s.full_name}</span>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {["present", "absent", "late"].map(v => (
                    <button key={v} onClick={() => setAttMap(p => ({ ...p, [s.id]: v }))}
                      style={{
                        height: 28, padding: "0 12px", borderRadius: 6, border: "1px solid", cursor: "pointer", fontSize: 12, fontWeight: 500, fontFamily: "inherit",
                        ...(attMap[s.id] === v
                          ? { background: v === "present" ? "#059669" : v === "absent" ? "#dc2626" : "#d97706", color: "#fff", borderColor: "transparent" }
                          : { background: "#fff", color: "#6b7280", borderColor: "#e5e7eb" })
                      }}>
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {!selClass && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af", fontSize: 14 }}>
          Select a class to mark attendance
        </div>
      )}
    </div>
  );
}

/* ── STUDENT / PARENT: View attendance ── */
function ViewAttendance({ user, isParent }) {
  const { currentRole } = useApp();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    async function load() {
      let studentId;
      if (isParent) {
        const { data } = await supabase.from("parents").select("student_id, students(full_name, roll_number, classes(name))").eq("user_id", user.id).single();
        if (data) { studentId = data.student_id; setStudentInfo(data.students); }
      } else {
        const { data } = await supabase.from("students").select("id, full_name, roll_number, classes(name)").eq("user_id", user.id).single();
        if (data) { studentId = data.id; setStudentInfo(data); }
      }
      if (!studentId) { setLoading(false); return; }

      const { data: att } = await supabase.from("attendance").select("date, status")
        .eq("student_id", studentId).order("date", { ascending: false }).limit(30);
      setRecords(att || []);
      setLoading(false);
    }
    load();
  }, [user]);

  const present = records.filter(r => r.status === "present").length;
  const absent = records.filter(r => r.status === "absent").length;
  const pct = records.length ? Math.round((present / records.length) * 100) : 0;

  return (
    <div style={{ padding: "24px 28px" }}>
      {studentInfo && (
        <div style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, padding: 20, marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{studentInfo.full_name}</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>{studentInfo.classes?.name} · Roll {studentInfo.roll_number}</div>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {[{ l: "Present", v: present, c: "#059669" }, { l: "Absent", v: absent, c: "#dc2626" }, { l: "Rate", v: pct + "%", c: "#0066ff" }].map(s => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: s.c }}>{s.v}</div>
                <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>{["Date", "Day", "Status"].map(h => <th key={h} style={{ textAlign: "left", fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.5px", textTransform: "uppercase", padding: "10px 16px", borderBottom: "1px solid #e8eaed" }}>{h}</th>)}</tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={3} style={{ padding: 20, textAlign: "center", color: "#9ca3af" }}>Loading…</td></tr>
              : records.length === 0 ? <tr><td colSpan={3} style={{ padding: 20, textAlign: "center", color: "#9ca3af" }}>No attendance records found</td></tr>
                : records.map((r, i) => {
                  const d = new Date(r.date);
                  return (
                    <tr key={i}>
                      <td style={{ padding: "11px 16px", fontSize: 13, borderBottom: "1px solid #f0f2f5" }}>{d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                      <td style={{ padding: "11px 16px", fontSize: 13, borderBottom: "1px solid #f0f2f5", color: "#6b7280" }}>{d.toLocaleDateString("en-IN", { weekday: "long" })}</td>
                      <td style={{ padding: "11px 16px", borderBottom: "1px solid #f0f2f5" }}><Badge status={r.status} /></td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Attendance() {
  const { currentUser, currentRole } = useApp();
  const canMark = ["admin", "superadmin", "teacher"].includes(currentRole);

  return (
    <>
      <Topbar
        title="Attendance"
        sub={canMark ? "Mark & manage daily attendance" : "My attendance record"}
        actions={null}
      />
      {canMark
        ? <MarkAttendance user={currentUser} />
        : <ViewAttendance user={currentUser} isParent={currentRole === "parent"} />
      }
    </>
  );
}

const FLD = { display: "flex", flexDirection: "column", gap: 5 };
const LBL = { fontSize: 12, fontWeight: 500, color: "#374151" };
const SEL = { height: 36, border: "1px solid #e5e7eb", borderRadius: 8, padding: "0 28px 0 12px", fontSize: 13.5, fontFamily: "'DM Sans',sans-serif", outline: "none", background: "#fff", minWidth: 160, cursor: "pointer" };
const BtnS = {
  primary: { height: 36, padding: "0 16px", background: "#0066ff", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" },
  ghost: { height: 36, padding: "0 14px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, cursor: "pointer", fontFamily: "inherit" },
};
