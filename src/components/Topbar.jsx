import { useApp, PAGE_META } from "../context/AppContext";

export default function Topbar({ title, sub, actions }) {
  const { currentPanel } = useApp();
  const meta = PAGE_META[currentPanel] || {};

  const displayTitle = title || meta.title || "Dashboard";
  const displaySub = sub || meta.sub || "";

  return (
    <header style={{
      height: 56,
      background: "#fff",
      borderBottom: "1px solid #e8eaed",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 28px",
      position: "sticky",
      top: 0,
      zIndex: 50,
      flexShrink: 0,
      width: "100%",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#0f1117", letterSpacing: "-0.2px" }}>
          {displayTitle}
        </span>
        {displaySub && (
          <span style={{ fontSize: 12, color: "#9ca3af" }}>{displaySub}</span>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {actions}
        <button style={{
          width: 34, height: 34,
          borderRadius: 8,
          border: "1px solid #e8eaed",
          background: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          color: "#6b7280",
          position: "relative",
          flexShrink: 0,
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span style={{ position: "absolute", top: 6, right: 6, width: 7, height: 7, background: "#ef4444", borderRadius: "50%", border: "1.5px solid #fff" }} />
        </button>
      </div>
    </header>
  );
}
