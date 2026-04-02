export default function StatCard({ label, value, color, sub, down }) {
  return (
    <div className="stat-card">
      <div className="stat-label">
        <span className="dot" style={{ background: color }}></span>
        {label}
      </div>
      <div className="stat-value">{value}</div>
      {sub && (
        <div className={down ? "stat-change down" : "stat-change"}>
          {sub}
        </div>
      )}
    </div>
  );
}
