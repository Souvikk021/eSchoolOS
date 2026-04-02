import Layout from "../components/Layout";

export default function Timetable() {
  return (
    <Layout
      title="Timetable"
      subtitle="Class schedule"
      action={<button className="btn primary">Edit Timetable</button>}
    >

      {/* ===== FILTER BAR ===== */}
      <div className="input-row">
        <select className="input">
          <option>Class 10 — Section A</option>
          <option>Class 10 — Section B</option>
          <option>Class 8 — Section A</option>
        </select>

        <select className="input">
          <option>Week of Apr 1–5</option>
          <option>Week of Mar 25–29</option>
        </select>

        <div className="actions">
          <button className="btn primary">Edit Timetable</button>
        </div>
      </div>

      {/* ===== TIMETABLE GRID ===== */}
      <div className="card">
        <div className="tt-grid">

          {/* HEADER */}
          <div className="tt-cell header">Period</div>
          <div className="tt-cell header">Mon</div>
          <div className="tt-cell header">Tue</div>
          <div className="tt-cell header">Wed</div>
          <div className="tt-cell header">Thu</div>
          <div className="tt-cell header">Fri</div>
          <div className="tt-cell header">Sat</div>

          {/* ROW 1 */}
          <div className="tt-cell time">8:00–8:45</div>
          <div className="tt-cell filled">Physics<br/><span>R. Sharma</span></div>
          <div className="tt-cell filled green">Maths<br/><span>A. Bose</span></div>
          <div className="tt-cell filled purple">English<br/><span>V. Kumar</span></div>
          <div className="tt-cell filled">Physics<br/><span>R. Sharma</span></div>
          <div className="tt-cell filled amber">History<br/><span>S. Das</span></div>
          <div className="tt-cell">—</div>

          {/* ROW 2 */}
          <div className="tt-cell time">8:45–9:30</div>
          <div className="tt-cell filled green">Maths<br/><span>A. Bose</span></div>
          <div className="tt-cell filled">Chemistry<br/><span>P. Roy</span></div>
          <div className="tt-cell filled amber">History<br/><span>S. Das</span></div>
          <div className="tt-cell filled green">Maths<br/><span>A. Bose</span></div>
          <div className="tt-cell filled">Physics<br/><span>R. Sharma</span></div>
          <div className="tt-cell">—</div>

          {/* BREAK */}
          <div className="tt-cell time">9:30–9:45</div>
          <div className="tt-cell break" style={{ gridColumn: "span 6" }}>☕ Break</div>

          {/* ROW 3 */}
          <div className="tt-cell time">9:45–10:30</div>
          <div className="tt-cell filled purple">English<br/><span>V. Kumar</span></div>
          <div className="tt-cell filled amber">Geography<br/><span>M. Sen</span></div>
          <div className="tt-cell filled green">Biology<br/><span>K. Nair</span></div>
          <div className="tt-cell filled purple">English<br/><span>V. Kumar</span></div>
          <div className="tt-cell filled green">Biology<br/><span>K. Nair</span></div>
          <div className="tt-cell">—</div>

        </div>
      </div>

    </Layout>
  );
}
