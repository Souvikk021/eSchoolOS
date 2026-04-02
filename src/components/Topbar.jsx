export default function Topbar({ title, subtitle, action }) {
  return (
    <div className="topbar">

      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="topbar-right">
        {action}
        <div className="notification">🔔</div>
      </div>

    </div>
  );
}
