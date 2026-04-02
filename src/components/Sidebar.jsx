import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  Wallet,
  Bell,
  BarChart3,
  Settings
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="logo">
        <div className="logo-icon">eS</div>
        <span>eSchoolOS</span>
      </div>

      {/* NAV */}
      <nav>

        <NavItem to="/" icon={<LayoutDashboard size={18}/>} label="Dashboard" />

        <NavItem to="/students" icon={<Users size={18}/>} label="Students" />

        <NavItem to="/academics" icon={<BookOpen size={18}/>} label="Academics" />

        <NavItem to="/attendance" icon={<Calendar size={18}/>} label="Attendance" />

        <NavItem to="/finance" icon={<Wallet size={18}/>} label="Finance" />

        <NavItem to="/communication" icon={<Bell size={18}/>} label="Communication" />

        <NavItem to="/reports" icon={<BarChart3 size={18}/>} label="Reports" />

        <NavItem to="/settings" icon={<Settings size={18}/>} label="Settings" />

      </nav>

      {/* USER */}
      <div className="sidebar-user">
        <div className="avatar">SA</div>
        <div>
          <p>School Admin</p>
          <span>DPS Newtown</span>
        </div>
      </div>

    </aside>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink to={to} className="nav-item">
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
