import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export const ROLES = {
  admin: {
    label: "Admin",
    color: "#0066ff",
    name: "School Admin",
    initials: "SA",
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
    name: "Vijay Kumar",
    initials: "VK",
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
    name: "Aarav Roy",
    initials: "AR",
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
    name: "Sunita Rao",
    initials: "SR",
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
  finance:       { title: "Finance",       sub: "Fees, payroll & expenses",       primary: "Collect Fee" },
  communication: { title: "Communication", sub: "Announcements & messaging" },
  reports:       { title: "Reports",       sub: "Analytics & insights",   secondary: "↓ Export" },
  settings:      { title: "Settings",      sub: "School configuration" },
};

export function AppProvider({ children }) {
  const [currentRole, setCurrentRole] = useState("admin");
  const [currentPanel, setCurrentPanel] = useState("dashboard");
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const role = ROLES[currentRole];
  const allPanelIds = role.nav.flatMap((s) => s.items.map((i) => i.id));

  function navigate(panelId) {
    if (!allPanelIds.includes(panelId)) return;
    setCurrentPanel(panelId);
  }

  function switchRole(roleKey) {
    setCurrentRole(roleKey);
    const firstPanel = ROLES[roleKey].nav[0].items[0].id;
    setCurrentPanel(firstPanel);
    setRoleSwitcherOpen(false);
  }

  function toggleRoleSwitcher() {
    setRoleSwitcherOpen((v) => !v);
  }

  return (
    <AppContext.Provider
      value={{
        currentRole,
        currentPanel,
        roleSwitcherOpen,
        role,
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
