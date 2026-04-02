import { useApp, PAGE_META } from "../context/AppContext";

export default function Topbar() {
  const { currentPanel } = useApp();
  const meta = PAGE_META[currentPanel] || {};

  return (
    <header className="topbar">
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span className="page-title">{meta.title || currentPanel}</span>
        {meta.sub && <span className="page-sub">{meta.sub}</span>}
      </div>

      <div className="topbar-right">
        {meta.secondary && (
          <button className="topbar-btn">{meta.secondary}</button>
        )}
        {meta.primary && (
          <button className="topbar-btn primary">{meta.primary}</button>
        )}
        <div className="notif-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <div className="notif-dot"></div>
        </div>
      </div>
    </header>
  );
}