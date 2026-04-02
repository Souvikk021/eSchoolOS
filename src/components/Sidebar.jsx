import { useApp, ROLES } from "../context/AppContext";
import { useEffect, useRef } from "react";

function NavIcon({ id }) {
  const icons = {
    dashboard: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
      </svg>
    ),
    students: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    academics: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    attendance: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    finance: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    communication: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    reports: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    settings: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  };
  return icons[id] || null;
}

export default function Sidebar() {
  const {
    currentRole, currentPanel, roleSwitcherOpen, role,
    navigate, switchRole, toggleRoleSwitcher, setRoleSwitcherOpen, logout,
  } = useApp();

  const switcherRef = useRef(null);
  const badgeRef    = useRef(null);

  useEffect(() => {
    if (!roleSwitcherOpen) return;
    function handler(e) {
      if (
        switcherRef.current && !switcherRef.current.contains(e.target) &&
        badgeRef.current    && !badgeRef.current.contains(e.target)
      ) {
        setRoleSwitcherOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [roleSwitcherOpen, setRoleSwitcherOpen]);

  const roleDisplayNames = {
    admin:      "School Admin",
    teacher:    "Teacher",
    student:    "Student / Parent",
    accountant: "Accountant",
  };

  return (
    <>
      <aside className="sidebar">
        {/* ── Logo ── */}
        <div className="sidebar-logo">
          <div className="logo-mark">eS</div>
          <span className="logo-text">eSchoolOS</span>
        </div>

        {/* ── Role badge / switcher trigger ── */}
        <div
          className="role-badge"
          ref={badgeRef}
          onClick={toggleRoleSwitcher}
          style={{ color: role.color, background: role.color + "18" }}
        >
          <span className="role-dot" style={{ background: role.color }} />
          <span>{role.label}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: "auto" }}>
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>

        {/* ── Nav ── */}
        <nav className="sidebar-nav">
          {role.nav.map((section) => (
            <div key={section.section}>
              <div className="nav-section-label">{section.section}</div>
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className={`nav-item${currentPanel === item.id ? " active" : ""}`}
                  onClick={() => navigate(item.id)}
                >
                  <span className="nav-icon"><NavIcon id={item.icon} /></span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`nav-badge${item.badgeColor ? " " + item.badgeColor : ""}`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </nav>

        {/* ── Footer ── */}
        <div className="sidebar-footer">
          <div className="avatar">{role.initials}</div>
          <div className="user-info">
            <div className="user-name">{role.name}</div>
            <div className="user-role">{role.school}</div>
          </div>
          <div className="logout-btn" title="Logout" onClick={logout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </div>
        </div>
      </aside>

      {/* ── Role Switcher Dropdown ── */}
      {roleSwitcherOpen && (
        <div className="role-switcher" ref={switcherRef}>
          {Object.entries(ROLES).map(([key, r]) => (
            <div
              key={key}
              className={`role-option${currentRole === key ? " active" : ""}`}
              onClick={() => switchRole(key)}
            >
              <span className="role-dot" style={{ background: r.color }} />
              {roleDisplayNames[key]}
            </div>
          ))}
        </div>
      )}
    </>
  );
}