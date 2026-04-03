import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const AppContext = createContext(null);

/* ── ROLE CONFIG (same as before, unchanged) ── */
export const ROLES = {
  admin: {
    label: "Admin",
    color: "#0066ff",
    nav: [
      {
        section: "Overview",
        items: [{ id: "dashboard", label: "Dashboard", icon: "dashboard" }],
      },
      {
        section: "Core",
        items: [
          { id: "students",      label: "Students",    icon: "students",   badge: "1284" },
          { id: "academics",     label: "Academics",   icon: "academics" },
          { id: "attendance",    label: "Attendance",  icon: "attendance" },
          { id: "finance",       label: "Finance",     icon: "finance",    badge: "12", badgeColor: "amber" },
        ],
      },
      {
        section: "Communication",
        items: [
          { id: "communication", label: "Communication", icon: "communication", badge: "3", badgeColor: "green" },
        ],
      },
      {
        section: "Insights",
        items: [{ id: "reports", label: "Reports", icon: "reports" }],
      },
      {
        section: "System",
        items: [{ id: "settings", label: "Settings", icon: "settings" }],
      },
    ],
  },
  teacher: {
    label: "Teacher",
    color: "#10b981",
    nav: [
      {
        section: "Overview",
        items: [{ id: "dashboard", label: "Dashboard", icon: "dashboard" }],
      },
      {
        section: "My Classes",
        items: [
          { id: "students",   label: "My Students", icon: "students" },
          { id: "academics",  label: "Academics",   icon: "academics" },
          { id: "attendance", label: "Attendance",  icon: "attendance" },
        ],
      },
      {
        section: "Communication",
        items: [{ id: "communication", label: "Communication", icon: "communication" }],
      },
    ],
  },
  student: {
    label: "Student",
    color: "#f59e0b",
    nav: [
      {
        section: "My Portal",
        items: [
          { id: "dashboard",     label: "Overview",      icon: "dashboard" },
          { id: "academics",     label: "Academics",     icon: "academics" },
          { id: "attendance",    label: "My Attendance", icon: "attendance" },
          { id: "finance",       label: "My Fees",       icon: "finance" },
        ],
      },
      {
        section: "Communication",
        items: [{ id: "communication", label: "Communication", icon: "communication" }],
      },
    ],
  },
  accountant: {
    label: "Accountant",
    color: "#8b5cf6",
    nav: [
      {
        section: "Finance",
        items: [
          { id: "dashboard", label: "Dashboard", icon: "dashboard" },
          { id: "finance",   label: "Finance",   icon: "finance", badge: "12", badgeColor: "amber" },
          { id: "reports",   label: "Reports",   icon: "reports" },
        ],
      },
    ],
  },
  superadmin: {
    label: "Superadmin",
    color: "#ef4444",
    nav: [
      {
        section: "System",
        items: [
          { id: "dashboard", label: "Dashboard", icon: "dashboard" },
          { id: "settings",  label: "Settings",  icon: "settings" },
        ],
      },
    ],
  },
};

export const PAGE_META = {
  dashboard:     { title: "Dashboard",     sub: "April 2026" },
  students:      { title: "Students",      sub: "Manage student roster",        primary: "+ Add Student", secondary: "↑ Import" },
  academics:     { title: "Academics",     sub: "Classes, timetable & curriculum" },
  attendance:    { title: "Attendance",    sub: "Track daily presence" },
  finance:       { title: "Finance",       sub: "Fees, payroll & expenses",     primary: "Collect Fee" },
  communication: { title: "Communication", sub: "Announcements & messaging" },
  reports:       { title: "Reports",       sub: "Analytics & insights",         secondary: "↓ Export" },
  settings:      { title: "Settings",      sub: "School configuration" },
};

/* ── PROVIDER ── */
export function AppProvider({ children }) {
  const [isLoggedIn,        setIsLoggedIn]        = useState(false);
  const [currentRole,       setCurrentRole]        = useState("admin");
  const [currentUser,       setCurrentUser]        = useState(null);
  const [currentPanel,      setCurrentPanel]       = useState("dashboard");
  const [roleSwitcherOpen,  setRoleSwitcherOpen]   = useState(false);
  const [authLoading,       setAuthLoading]        = useState(true);  // true on first load
  const [mustChangePassword, setMustChangePassword] = useState(false);
  const [sessionToken,      setSessionToken]       = useState(null);

  /* ── Rehydrate session from localStorage on app start ── */
  useEffect(() => {
    const saved = localStorage.getItem("es_session");
    if (saved) {
      try {
        const { user, token } = JSON.parse(saved);
        _applyUser(user, token);
      } catch {
        localStorage.removeItem("es_session");
      }
    }
    setAuthLoading(false);
  }, []);

  function _applyUser(user, token) {
    const role = user.role === "superadmin" ? "admin" : user.role; // superadmin uses admin nav for now
    setCurrentRole(role);
    setCurrentUser({
      id:       user.id,
      name:     user.full_name,
      initials: user.initials || user.full_name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0,2),
      school:   "DPS Newtown",   // will come from school join later
      login_id: user.login_id,
      role:     user.role,
      school_id: user.school_id,
    });
    setCurrentPanel(ROLES[role]?.nav[0]?.items[0]?.id || "dashboard");
    setMustChangePassword(user.must_change_password || false);
    setSessionToken(token);
    setIsLoggedIn(true);
  }

  /* ── LOGIN — hits Supabase RPC ── */
  async function login(loginId, password) {
    const { data, error } = await supabase.rpc("login", {
      p_login_id: loginId.trim().toUpperCase(),
      p_password: password,
    });

    if (error) {
      console.error("Login RPC error:", error);
      return { success: false, error: "Something went wrong. Please try again." };
    }

    if (!data.success) {
      return { success: false, error: data.error };
    }

    // Persist to localStorage
    localStorage.setItem("es_session", JSON.stringify({ user: data.user, token: data.token }));
    _applyUser(data.user, data.token);

    return {
      success: true,
      mustChangePassword: data.user.must_change_password,
    };
  }

  /* ── LOGOUT ── */
  async function logout() {
    if (sessionToken) {
      // Invalidate session in DB (fire and forget)
      supabase
        .from("sessions")
        .update({ is_valid: false })
        .eq("token", sessionToken)
        .then(() => {});
    }
    localStorage.removeItem("es_session");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentRole("admin");
    setCurrentPanel("dashboard");
    setRoleSwitcherOpen(false);
    setMustChangePassword(false);
    setSessionToken(null);
  }

  /* ── CHANGE PASSWORD ── */
  async function changePassword(oldPassword, newPassword) {
    const { data, error } = await supabase.rpc("change_password", {
      p_user_id:      currentUser.id,
      p_old_password: oldPassword,
      p_new_password: newPassword,
    });

    if (error) return { success: false, error: "Something went wrong." };
    if (!data.success) return { success: false, error: data.error };

    setMustChangePassword(false);

    // Update localStorage
    const saved = localStorage.getItem("es_session");
    if (saved) {
      const parsed = JSON.parse(saved);
      parsed.user.must_change_password = false;
      localStorage.setItem("es_session", JSON.stringify(parsed));
    }

    return { success: true };
  }

  /* ── NAVIGATION ── */
  const roleData    = ROLES[currentRole] || ROLES.admin;
  const allPanelIds = roleData.nav.flatMap((s) => s.items.map((i) => i.id));

  function navigate(panelId) {
    if (!allPanelIds.includes(panelId)) return;
    setCurrentPanel(panelId);
  }

  function switchRole(roleKey) {
    setCurrentRole(roleKey);
    setCurrentPanel(ROLES[roleKey].nav[0].items[0].id);
    setRoleSwitcherOpen(false);
  }

  function toggleRoleSwitcher() {
    setRoleSwitcherOpen((v) => !v);
  }

  return (
    <AppContext.Provider
      value={{
        // auth
        isLoggedIn,
        authLoading,
        mustChangePassword,
        currentUser,
        login,
        logout,
        changePassword,
        // nav
        currentRole,
        currentPanel,
        roleSwitcherOpen,
        role: { ...roleData, ...(currentUser || {}) },
        allPanelIds,
        navigate,
        switchRole,
        toggleRoleSwitcher,
        setRoleSwitcherOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
