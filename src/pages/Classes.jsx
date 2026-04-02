import Layout from "../components/Layout";

export default function Classes() {
  return (
    <Layout
      title="Classes & Sections"
      subtitle="Academic structure"
      action={
        <button className="btn primary">+ Add Class</button>
      }
    >
      <div className="grid-2">

        {/* LEFT */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Classes</div>
            <button className="btn sm primary">+ Add Class</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Sections</th>
                <th>Students</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr><td>Class 6</td><td>A, B, C</td><td>110</td><td>Edit</td></tr>
              <tr><td>Class 7</td><td>A, B, C, D</td><td>148</td><td>Edit</td></tr>
              <tr><td>Class 8</td><td>A, B, C</td><td>115</td><td>Edit</td></tr>
              <tr><td>Class 9</td><td>A, B, C, D</td><td>152</td><td>Edit</td></tr>
              <tr><td>Class 10</td><td>A, B, C</td><td>112</td><td>Edit</td></tr>
            </tbody>
          </table>
        </div>

        {/* RIGHT */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Sections</div>
            <button className="btn sm primary">+ Add Section</button>
          </div>

          <div className="chips">
            <span className="chip blue">Section A</span>
            <span className="chip green">Section B</span>
            <span className="chip amber">Section C</span>
            <span className="chip purple">Section D</span>
          </div>
        </div>

      </div>
    </Layout>
  );
}
