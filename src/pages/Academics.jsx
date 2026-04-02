import { useState } from "react";

/* ─────────────────────────── SUB-VIEWS ─────────────────────────── */

function ClassesTab() {
  const classes = [
    { name: "Class 6",  secs: "A, B, C",                      students: 110 },
    { name: "Class 7",  secs: "A, B, C, D",                   students: 148 },
    { name: "Class 8",  secs: "A, B, C",                      students: 115 },
    { name: "Class 9",  secs: "A, B, C, D",                   students: 152 },
    { name: "Class 10", secs: "A, B, C",                      students: 112 },
    { name: "Class 11", secs: "A (Science), B (Commerce)",    students: 98  },
    { name: "Class 12", secs: "A (Science), B (Commerce)",    students: 92  },
  ];
  return (
    <div className="grid-2" style={{ alignItems: "start" }}>
      <div className="card">
        <div className="card-header">
          <div><div className="card-title">Classes</div><div className="card-sub">7 classes configured</div></div>
          <button className="btn primary sm">+ Add Class</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Class</th><th>Sections</th><th>Students</th><th></th></tr></thead>
            <tbody>
              {classes.map((c) => (
                <tr key={c.name}>
                  <td style={{ fontWeight: 500 }}>{c.name}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{c.secs}</td>
                  <td><span className="badge blue">{c.students}</span></td>
                  <td><button className="btn ghost sm">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-header">
            <div className="card-title">Sections</div>
            <button className="btn primary sm">+ Add Section</button>
          </div>
          <div className="card-body">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Section A","Section B","Section C","Section D"].map((s,i) => (
                <span key={s} className={`badge ${["blue","green","amber","purple"][i]}`}
                  style={{ fontSize: 13, padding: "6px 14px", cursor: "pointer" }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Quick Stats</div></div>
          <div className="card-body">
            {[
              { label: "Total Classes", value: "7", color: "#0066ff" },
              { label: "Total Sections", value: "22", color: "#10b981" },
              { label: "Total Students", value: "1,284", color: "#f59e0b" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border-light)" }}>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{s.label}</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SubjectsTab() {
  const subjects = [
    { name: "Physics",     code: "PHY", dept: "Science",      teachers: 3, classes: "11, 12" },
    { name: "Mathematics", code: "MTH", dept: "Mathematics",  teachers: 4, classes: "6–12" },
    { name: "English",     code: "ENG", dept: "Languages",    teachers: 5, classes: "6–12" },
    { name: "Chemistry",   code: "CHM", dept: "Science",      teachers: 2, classes: "11, 12" },
    { name: "Biology",     code: "BIO", dept: "Science",      teachers: 2, classes: "11, 12" },
    { name: "History",     code: "HST", dept: "Social",       teachers: 3, classes: "6–10" },
    { name: "Geography",   code: "GEO", dept: "Social",       teachers: 2, classes: "6–10" },
    { name: "Computer Sc", code: "CSC", dept: "Technology",   teachers: 2, classes: "9–12" },
  ];
  const deptColors = { Science: "blue", Mathematics: "purple", Languages: "green", Social: "amber", Technology: "red" };
  return (
    <>
      <div className="input-row">
        <div className="input-wrap">
          <span className="input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input type="text" placeholder="Search subjects..." />
        </div>
        <select><option>All Departments</option><option>Science</option><option>Mathematics</option><option>Languages</option><option>Social</option></select>
        <div style={{ marginLeft: "auto" }}><button className="btn primary">+ Add Subject</button></div>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Subject</th><th>Code</th><th>Department</th><th>Teachers</th><th>Classes</th><th></th></tr></thead>
            <tbody>
              {subjects.map((s) => (
                <tr key={s.code}>
                  <td style={{ fontWeight: 500 }}>{s.name}</td>
                  <td><span className="mono" style={{ fontSize: 12 }}>{s.code}</span></td>
                  <td><span className={`badge ${deptColors[s.dept] || "blue"}`}>{s.dept}</span></td>
                  <td>{s.teachers}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{s.classes}</td>
                  <td><button className="btn ghost sm">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function TimetableTab() {
  const periods = [
    { time: "8:00–8:45",  slots: [
      { s: "Physics",   t: "R. Sharma", c: "" },
      { s: "Maths",     t: "A. Bose",   c: "green" },
      { s: "English",   t: "V. Kumar",  c: "purple" },
      { s: "Physics",   t: "R. Sharma", c: "" },
      { s: "History",   t: "S. Das",    c: "amber" },
      null,
    ]},
    { time: "8:45–9:30",  slots: [
      { s: "Maths",     t: "A. Bose",   c: "green" },
      { s: "Chemistry", t: "P. Roy",    c: "" },
      { s: "History",   t: "S. Das",    c: "amber" },
      { s: "Maths",     t: "A. Bose",   c: "green" },
      { s: "Physics",   t: "R. Sharma", c: "" },
      null,
    ]},
    { time: "9:30–9:45",  isBreak: true },
    { time: "9:45–10:30", slots: [
      { s: "English",   t: "V. Kumar",  c: "purple" },
      { s: "Geography", t: "M. Sen",    c: "amber" },
      { s: "Biology",   t: "K. Nair",   c: "green" },
      { s: "English",   t: "V. Kumar",  c: "purple" },
      { s: "Biology",   t: "K. Nair",   c: "green" },
      null,
    ]},
    { time: "10:30–11:15",slots: [
      { s: "Chemistry", t: "P. Roy",    c: "" },
      { s: "English",   t: "V. Kumar",  c: "purple" },
      { s: "Physics",   t: "R. Sharma", c: "" },
      { s: "Biology",   t: "K. Nair",   c: "green" },
      { s: "Maths",     t: "A. Bose",   c: "green" },
      null,
    ]},
  ];
  return (
    <>
      <div className="input-row">
        <select><option>Class 10 — Section A</option><option>Class 10 — Section B</option><option>Class 8 — Section A</option></select>
        <select><option>Week of Apr 1–5</option><option>Week of Mar 25–29</option></select>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button className="btn">↓ Export PDF</button>
          <button className="btn primary">Edit Timetable</button>
        </div>
      </div>
      <div className="card">
        <div className="card-body" style={{ overflowX: "auto" }}>
          <div className="tt-grid" style={{ minWidth: 700 }}>
            <div className="tt-cell header">Period</div>
            {["Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
              <div key={d} className="tt-cell header">{d}</div>
            ))}
            {periods.map((p, pi) =>
              p.isBreak ? (
                <div key={pi} style={{ display: "contents" }}>
                  <div className="tt-cell tt-time">{p.time}</div>
                  <div className="tt-cell span-6" style={{ minHeight: 34 }}>☕ Break</div>
                </div>
              ) : (
                <div key={pi} style={{ display: "contents" }}>
                  <div className="tt-cell tt-time">{p.time}</div>
                  {p.slots.map((slot, si) =>
                    slot ? (
                      <div key={si} className={`tt-cell filled${slot.c ? " " + slot.c : ""}`}>
                        <div className="tt-subject">{slot.s}</div>
                        <div className="tt-teacher">{slot.t}</div>
                      </div>
                    ) : (
                      <div key={si} className="tt-cell">
                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>—</span>
                      </div>
                    )
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function AssignmentsTab() {
  const assignments = [
    { title: "Physics Ch. 12 — Numericals",  class: "12-A", subject: "Physics",   due: "Apr 5",  submissions: 28, total: 34, status: "green" },
    { title: "English Essay — My Role Model", class: "10-A", subject: "English",   due: "Apr 3",  submissions: 38, total: 38, status: "green" },
    { title: "Maths Practice Set 7",          class: "8-B",  subject: "Maths",     due: "Apr 8",  submissions: 12, total: 40, status: "amber" },
    { title: "History Map Work",               class: "9-C",  subject: "History",   due: "Apr 10", submissions: 5,  total: 36, status: "red" },
    { title: "Chemistry Lab Report",           class: "11-A", subject: "Chemistry", due: "Apr 7",  submissions: 22, total: 30, status: "amber" },
  ];
  return (
    <>
      <div className="input-row">
        <div className="input-wrap">
          <span className="input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input type="text" placeholder="Search assignments..." />
        </div>
        <select><option>All Classes</option><option>Class 10</option><option>Class 12</option></select>
        <select><option>All Subjects</option><option>Physics</option><option>Maths</option></select>
        <div style={{ marginLeft: "auto" }}><button className="btn primary">+ New Assignment</button></div>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Assignment</th><th>Class</th><th>Subject</th><th>Due Date</th><th>Submissions</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {assignments.map((a, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500, maxWidth: 220 }}>{a.title}</td>
                  <td>{a.class}</td>
                  <td><span className="badge blue">{a.subject}</span></td>
                  <td className="mono" style={{ fontSize: 12 }}>{a.due}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="progress-bar" style={{ width: 60 }}>
                        <div className="progress-fill" style={{
                          width: `${Math.round((a.submissions/a.total)*100)}%`,
                          background: a.status === "green" ? "var(--green)" : a.status === "amber" ? "var(--amber)" : "var(--red)"
                        }}></div>
                      </div>
                      <span className="mono" style={{ fontSize: 12 }}>{a.submissions}/{a.total}</span>
                    </div>
                  </td>
                  <td><span className={`badge ${a.status}`}>{a.status === "green" ? "Complete" : a.status === "amber" ? "Ongoing" : "Pending"}</span></td>
                  <td><button className="btn ghost sm">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function StudyMaterialsTab() {
  const materials = [
    { title: "Physics NCERT Ch. 12 Notes",      subject: "Physics",   class: "12",  type: "PDF",   size: "2.4 MB", date: "Apr 1" },
    { title: "Maths Formula Sheet — Algebra",   subject: "Maths",     class: "10",  type: "PDF",   size: "0.8 MB", date: "Mar 30" },
    { title: "English Grammar Reference",       subject: "English",   class: "All", type: "DOC",   size: "1.2 MB", date: "Mar 28" },
    { title: "Chemistry Lab Safety Guide",      subject: "Chemistry", class: "11",  type: "PDF",   size: "3.1 MB", date: "Mar 25" },
    { title: "History Timeline — Modern India", subject: "History",   class: "10",  type: "PPT",   size: "5.6 MB", date: "Mar 22" },
    { title: "Biology Diagrams Collection",     subject: "Biology",   class: "12",  type: "PDF",   size: "8.2 MB", date: "Mar 20" },
  ];
  const typeColors = { PDF: "red", DOC: "blue", PPT: "amber" };
  return (
    <>
      <div className="input-row">
        <div className="input-wrap">
          <span className="input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input type="text" placeholder="Search materials..." />
        </div>
        <select><option>All Subjects</option><option>Physics</option><option>Maths</option><option>English</option></select>
        <select><option>All Types</option><option>PDF</option><option>DOC</option><option>PPT</option><option>Video</option></select>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button className="btn">↑ Upload Material</button>
          <button className="btn primary">+ Add Link</button>
        </div>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Title</th><th>Subject</th><th>Class</th><th>Type</th><th>Size</th><th>Uploaded</th><th></th></tr></thead>
            <tbody>
              {materials.map((m, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{m.title}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{m.subject}</td>
                  <td>Class {m.class}</td>
                  <td><span className={`badge ${typeColors[m.type] || "blue"}`}>{m.type}</span></td>
                  <td className="mono" style={{ fontSize: 12 }}>{m.size}</td>
                  <td style={{ color: "var(--text-muted)", fontSize: 12 }}>{m.date}</td>
                  <td><button className="btn ghost sm">↓ Download</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function SyllabusTab() {
  const syllabus = [
    { class: "Class 12-A", subject: "Physics",   completed: 72, total: 100, chapters: "12 of 15 done" },
    { class: "Class 12-A", subject: "Chemistry", completed: 65, total: 100, chapters: "10 of 14 done" },
    { class: "Class 10-A", subject: "Maths",     completed: 88, total: 100, chapters: "16 of 18 done" },
    { class: "Class 10-A", subject: "English",   completed: 91, total: 100, chapters: "9 of 10 done" },
    { class: "Class 8-B",  subject: "Science",   completed: 55, total: 100, chapters: "7 of 12 done" },
    { class: "Class 8-B",  subject: "History",   completed: 80, total: 100, chapters: "8 of 10 done" },
  ];
  return (
    <>
      <div className="input-row">
        <select><option>All Classes</option><option>Class 12</option><option>Class 10</option><option>Class 8</option></select>
        <select><option>All Subjects</option><option>Physics</option><option>Maths</option><option>English</option></select>
        <div style={{ marginLeft: "auto" }}><button className="btn primary">Update Syllabus</button></div>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Class</th><th>Subject</th><th>Progress</th><th>Chapters</th><th>Status</th></tr></thead>
            <tbody>
              {syllabus.map((s, i) => {
                const color = s.completed >= 80 ? "var(--green)" : s.completed >= 60 ? "var(--amber)" : "var(--red)";
                const status = s.completed >= 80 ? "green" : s.completed >= 60 ? "amber" : "red";
                const statusLabel = s.completed >= 80 ? "On Track" : s.completed >= 60 ? "Moderate" : "Behind";
                return (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{s.class}</td>
                    <td style={{ color: "var(--text-secondary)" }}>{s.subject}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div className="progress-bar" style={{ width: 100 }}>
                          <div className="progress-fill" style={{ width: `${s.completed}%`, background: color }}></div>
                        </div>
                        <span className="mono" style={{ fontSize: 12 }}>{s.completed}%</span>
                      </div>
                    </td>
                    <td style={{ color: "var(--text-secondary)", fontSize: 13 }}>{s.chapters}</td>
                    <td><span className={`badge ${status}`}>{statusLabel}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────── MAIN COMPONENT ─────────────────────────── */

const TABS = [
  { id: "classes",   label: "Classes & Sections" },
  { id: "subjects",  label: "Subjects" },
  { id: "timetable", label: "Timetable" },
  { id: "assignments", label: "Assignments" },
  { id: "materials", label: "Study Materials" },
  { id: "syllabus",  label: "Syllabus" },
];

export default function Academics() {
  const [activeTab, setActiveTab] = useState("classes");

  const views = {
    classes:     <ClassesTab />,
    subjects:    <SubjectsTab />,
    timetable:   <TimetableTab />,
    assignments: <AssignmentsTab />,
    materials:   <StudyMaterialsTab />,
    syllabus:    <SyllabusTab />,
  };

  return (
    <>
      <div className="tab-row">
        {TABS.map((t) => (
          <div key={t.id}
            className={`tab${activeTab === t.id ? " active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </div>
        ))}
      </div>
      {views[activeTab]}
    </>
  );
}