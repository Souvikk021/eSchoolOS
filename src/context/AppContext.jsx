import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

/* ─────────────────── MOCK CREDENTIAL STORE ─────────────────── */
// In production: replace with Supabase / API call
const USERS = {
  ADMIN001:  { password: "admin123",     role: "admin",      name: "School Admin",  initials: "SA", school: "DPS Newtown" },
  TCH001:    { password: "teacher123",   role: "teacher",    name: "Vijay Kumar",   initials: "VK", school: "DPS Newtown" },
  STU001:    { password: "student123",   role: "student",    name: "Aarav Roy",     initials: "AR", school: "DPS Newtown" },
  ACC001:    { password: "account123",   role: "accountant", name: "Sunita Rao",    initials: "SR", school: "DPS Newtown" },
};

/* ─────────────────── ROLES ─────────────────── */
export const ROLES = {
  admin: {
    label: "Admin",
    color: "#0066ff",
    school: "DPS Newtown",
    nav: [
      {
        section: "Overview",
        items: [{ id: "dashboard", label: "Dashboard", icon: "dashboard" }],
      },
      {
        section: "Core",
        items: [
          { id: "students",      label: "Students",       icon: "students",      badge: "1284" },
          { id: "academics",     label: "Academics",      icon: "academics" },
          { id: "attendance",    label: "Attendance",     icon: "attendance" },
          { id: "finance",       label: "Finance",        icon: "finance",       badge: "12", badgeColor: "amber" },
        ],
      },
      {
        section: "Communication",
        items: [
          { id: "communication", label: "Communication",  icon: "communication", badge: "3", badgeColor: "green" },
        ],
      },
      {
        section: "Insights",
        items: [
          { id: "reports",       label: "Reports",        icon: "reports" },
        ],
      },
      {
        section: "System",
        items: [
          { id: "settings",      label: "Settings",       icon: "settings" },
        ],
      },
    ],
  },
  teacher: {
    label: "Teacher",
    color: "#10b981",
    school: "DPS Newtown",
    nav: [
      {
        section: "Overview",
        items: [{ id: "dashboard", label: "Dashboard", icon: "dashboard" }],
      },
      {
        section: "My Classes",
        items: [
          { id: "students",   label: "My Students",   icon: "students" },
          { id: "academics",  label: "Academics",     icon: "academics" },
          { id: "attendance", label: "Attendance",    icon: "attendance" },
        ],
      },
      {
        section: "Communication",
        items: [
          { id: "communication", label: "Communication", icon: "communication" },
        ],
      },
    ],
  },
  student: {
    label: "Student",
    color: "#f59e0b",
    school: "DPS Newtown",
    nav: [
      {
        section: "My Portal",
        items: [
          { id: "dashboard",   label: "Overview",      icon: "dashboard" },
          { id: "academics",   label: "Academics",     icon: "academics" },
          { id: "attendance",  label: "My Attendance", icon: "attendance" },
          { id: "finance",     label: "My Fees",       icon: "finance" },
        ],
      },
      {
        section: "Communication",
        items: [
          { id: "communication", label: "Communication", icon: "communication" },
        ],
      },
    ],
  },
  accountant: {
    label: "Accountant",
    color: "#8b5cf6",
    school: "DPS Newtown",
    nav: [
      {
        section: "Finance",
        items: [
          { id: "dashboard", label: "Dashboard", icon: "dashboard" },
          { id: "finance",   label: "Finance",   icon: "finance",  badge: "12", badgeColor: "amber" },
          { id: "reports",   label: "Reports",   icon: "reports" },
        ],
      },
    ],
  },
};

export const PAGE_META = {
  dashboard:     { title: "Dashboard",     sub: "April 2026" },
  students:      { title: "Students",      sub: "Manage student roster",  primary: "+ Add Student",   secondary: "↑ Import" },
  academics:     { title: "Academics",     sub: "Classes, timetable & curriculum" },
  attendance:    { title: "Attendance",    sub: "Track daily presence" },
  finance:       { title: "Finance",       sub: "Fees, payroll & expenses", primary: "Collect Fee" },
  communication: { title: "Communication", sub: "Announcements & messaging" },
  reports:       { title: "Reports",       sub: "Analytics & insights",   secondary: "↓ Export" },
  settings:      { title: "Settings",      sub: "School configuration" },
};

/* ─────────────────── PROVIDER ─────────────────── */
export function AppProvider({ children }) {
  // Auth
  const [isLoggedIn,   setIsLoggedIn]   = useState(false);
  const [currentRole,  setCurrentRole]  = useState("admin");
  const [currentUser,  setCurrentUser]  = useState(null);   // { name, initials, school }

  // Navigation
  const [currentPanel,     setCurrentPanel]     = useState("dashboard");
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const roleData   = ROLES[currentRole];
  const allPanelIds = roleData.nav.flatMap((s) => s.items.map((i) => i.id));

  /* — Auth — */
  function login(loginId, password) {
    const user = USERS[loginId.trim().toUpperCase()];
    if (!user)                        return { success: false, error: "Invalid Login ID." };
    if (user.password !== password)   return { success: false, error: "Incorrect password." };

    setCurrentRole(user.role);
    setCurrentUser({ name: user.name, initials: user.initials, school: user.school });
    setCurrentPanel(ROLES[user.role].nav[0].items[0].id);
    setIsLoggedIn(true);
    return { success: true };
  }

  function logout() {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentRole("admin");
    setCurrentPanel("dashboard");
    setRoleSwitcherOpen(false);
  }

  /* — Navigation — */
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
        currentUser,
        login,
        logout,
        // nav
        currentRole,
        currentPanel,
        roleSwitcherOpen,
        role: { ...roleData, ...currentUser },   // merge user's real name/initials into role
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
