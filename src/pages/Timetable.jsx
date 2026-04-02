export default function Timetable() {
  const periods = [
    { time: "8:00–8:45", slots: [
      { subject: "Physics", teacher: "R. Sharma", color: "" },
      { subject: "Maths", teacher: "A. Bose", color: "green" },
      { subject: "English", teacher: "V. Kumar", color: "purple" },
      { subject: "Physics", teacher: "R. Sharma", color: "" },
      { subject: "History", teacher: "S. Das", color: "amber" },
      null,
    ]},
    { time: "8:45–9:30", slots: [
      { subject: "Maths", teacher: "A. Bose", color: "green" },
      { subject: "Chemistry", teacher: "P. Roy", color: "" },
      { subject: "History", teacher: "S. Das", color: "amber" },
      { subject: "Maths", teacher: "A. Bose", color: "green" },
      { subject: "Physics", teacher: "R. Sharma", color: "" },
      null,
    ]},
    { time: "9:30–9:45", isBreak: true },
    { time: "9:45–10:30", slots: [
      { subject: "English", teacher: "V. Kumar", color: "purple" },
      { subject: "Geography", teacher: "M. Sen", color: "amber" },
      { subject: "Biology", teacher: "K. Nair", color: "green" },
      { subject: "English", teacher: "V. Kumar", color: "purple" },
      { subject: "Biology", teacher: "K. Nair", color: "green" },
      null,
    ]},
  ];

  return (
    <>
      <div className="input-row">
        <select>
          <option>Class 10 — Section A</option>
          <option>Class 10 — Section B</option>
          <option>Class 8 — Section A</option>
        </select>
        <select>
          <option>Week of Apr 1–5</option>
          <option>Week of Mar 25–29</option>
        </select>
        <div style={{ marginLeft: "auto" }}>
          <button className="btn primary">Edit Timetable</button>
        </div>
      </div>

      <div className="card">
        <div className="card-body" style={{ overflowX: "auto" }}>
          <div className="tt-grid" style={{ minWidth: 680 }}>
            {/* Headers */}
            <div className="tt-cell header">Period</div>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="tt-cell header">{d}</div>
            ))}

            {/* Rows */}
            {periods.map((period, pi) => (
              period.isBreak ? (
                <div key={pi} style={{ display: "contents" }}>
                  <div className="tt-cell tt-time">{period.time}</div>
                  <div className="tt-cell span-6">☕ Break</div>
                </div>
              ) : (
                <div key={pi} style={{ display: "contents" }}>
                  <div className="tt-cell tt-time">{period.time}</div>
                  {period.slots.map((slot, si) =>
                    slot ? (
                      <div key={si} className={`tt-cell filled${slot.color ? " " + slot.color : ""}`}>
                        <div className="tt-subject">{slot.subject}</div>
                        <div className="tt-teacher">{slot.teacher}</div>
                      </div>
                    ) : (
                      <div key={si} className="tt-cell">
                        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>—</div>
                      </div>
                    )
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
