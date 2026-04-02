import { useState } from "react";

function SchoolSettingsTab() {
  return (
    <div className="grid-2">
      <div className="card">
        <div className="card-header"><div className="card-title">School Profile</div></div>
        <div className="card-body">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "School Name",     value: "Delhi Public School, Newtown", type: "text" },
              { label: "UDISE Code",      value: "19242000101",                  type: "text" },
              { label: "Affiliation",     value: "CBSE — Board No. 1920021",      type: "text" },
              { label: "Principal",       value: "Dr. Anita Sharma",             type: "text" },
              { label: "Contact Email",   value: "admin@dpsnewtewn.edu.in",      type: "text" },
              { label: "Phone",           value: "+91 33 2576 0000",             type: "text" },
            ].map((f) => (
              <div key={f.label}>
                <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5, display: "block" }}>{f.label}</label>
                <input type={f.type} defaultValue={f.value} style={{ width: "100%" }} />
              </div>
            ))}
            <button className="btn primary" style={{ justifyContent: "center" }}>Save Changes</button>
          </div>
        </div>
      </div>
      <div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-header"><div className="card-title">Academic Year</div></div>
          <div className="card-body">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5, display: "block" }}>Current Academic Year</label>
                <select style={{ width: "100%" }}><option>2025–2026</option><option>2024–2025</option></select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5, display: "block" }}>Session Start</label>
                <input type="text" defaultValue="April 1, 2025" style={{ width: "100%" }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5, display: "block" }}>Session End</label>
                <input type="text" defaultValue="March 31, 2026" style={{ width: "100%" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Working Days</div></div>
          <div className="card-body">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => (
                <label key={d} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}>
                  <input type="checkbox" defaultChecked={i < 6} />
                  {d}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RolesPermissionsTab() {
  const roles = [
    { role: "School Admin", users: 2, permissions: ["Full Access"], color: "#0066ff" },
    { role: "Teacher",      users: 68, permissions: ["Students", "Attendance", "Academics"], color: "#10b981" },
    { role: "Accountant",   users: 3, permissions: ["Finance", "Reports"], color: "#8b5cf6" },
    { role: "Student",      users: 1284, permissions: ["Own Profile", "Academics", "Attendance"], color: "#f59e0b" },
    { role: "Parent",       users: 2190, permissions: ["Child Profile", "Fees", "Communication"], color: "#ef4444" },
  ];
  return (
    <>
      <div className="card">
        <div className="card-header">
          <div><div className="card-title">Roles & Permissions</div><div className="card-sub">Define what each role can access</div></div>
          <button className="btn primary sm">+ Create Role</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Role</th><th>Users</th><th>Permissions</th><th></th></tr></thead>
            <tbody>
              {roles.map((r) => (
                <tr key={r.role}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: r.color, display: "inline-block" }}></span>
                      <span style={{ fontWeight: 500 }}>{r.role}</span>
                    </div>
                  </td>
                  <td><span className="badge blue">{r.users.toLocaleString()} users</span></td>
                  <td>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {r.permissions.map((p) => (
                        <span key={p} className="badge green">{p}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn ghost sm">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function UserManagementTab() {
  const users = [
    { name: "Dr. Anita Sharma",  email: "anita@dps.edu", role: "Admin",     last: "2m ago",    status: "green" },
    { name: "Ramesh Sharma",     email: "ramesh@dps.edu",role: "Teacher",   last: "25m ago",   status: "green" },
    { name: "Anita Bose",        email: "bose@dps.edu",  role: "Teacher",   last: "3h ago",    status: "green" },
    { name: "Sunita Rao",        email: "sunita@dps.edu",role: "Accountant",last: "Yesterday", status: "amber" },
    { name: "Vijay Kumar",       email: "vijay@dps.edu", role: "Teacher",   last: "4h ago",    status: "green" },
  ];
  const roleColors = { Admin: "blue", Teacher: "green", Accountant: "purple", Student: "amber" };
  return (
    <>
      <div className="input-row">
        <div className="input-wrap">
          <span className="input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input type="text" placeholder="Search users..." />
        </div>
        <select><option>All Roles</option><option>Admin</option><option>Teacher</option><option>Accountant</option></select>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button className="btn">↑ Import Users</button>
          <button className="btn primary">+ Add User</button>
        </div>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>User</th><th>Role</th><th>Last Active</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email}>
                  <td>
                    <div className="cell-user">
                      <div className="cell-avatar">{u.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                      <div>
                        <div style={{ fontWeight: 500 }}>{u.name}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={`badge ${roleColors[u.role] || "blue"}`}>{u.role}</span></td>
                  <td style={{ fontSize: 12, color: "var(--text-muted)" }}>{u.last}</td>
                  <td><span className={`badge ${u.status}`}>{u.status === "green" ? "Active" : "Idle"}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn ghost sm">Edit</button>
                      <button className="btn danger sm">Disable</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function IntegrationsTab() {
  const integrations = [
    { name: "Razorpay",     desc: "Online fee collection & payment gateway",  icon: "💳", status: "green", label: "Connected" },
    { name: "WhatsApp API", desc: "Automated parent & student messaging",     icon: "💬", status: "green", label: "Connected" },
    { name: "Google Meet",  desc: "Online classes & parent meetings",          icon: "📹", status: "amber", label: "Setup Needed" },
    { name: "SMS Gateway",  desc: "Bulk SMS via Textlocal / MSG91",           icon: "📱", status: "green", label: "Connected" },
    { name: "Google Drive", desc: "Study materials & document storage",       icon: "📂", status: "red",   label: "Not Connected" },
    { name: "Zoom",         desc: "Online classes & webinars",                icon: "🎥", status: "red",   label: "Not Connected" },
  ];
  return (
    <div className="grid-3">
      {integrations.map((intg) => (
        <div key={intg.name} className="card">
          <div className="card-body">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ fontSize: 28 }}>{intg.icon}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{intg.name}</div>
                <span className={`badge ${intg.status}`}>{intg.label}</span>
              </div>
            </div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 14, lineHeight: 1.5 }}>{intg.desc}</div>
            <button className={`btn sm${intg.status === "red" ? " primary" : ""}`} style={{ width: "100%", justifyContent: "center" }}>
              {intg.status === "green" ? "Configure" : intg.status === "amber" ? "Complete Setup" : "Connect"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const TABS = [
  { id: "school",       label: "School Settings" },
  { id: "roles",        label: "Roles & Permissions" },
  { id: "users",        label: "User Management" },
  { id: "integrations", label: "Integrations" },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("school");
  const views = {
    school:       <SchoolSettingsTab />,
    roles:        <RolesPermissionsTab />,
    users:        <UserManagementTab />,
    integrations: <IntegrationsTab />,
  };
  return (
    <>
      <div className="tab-row">
        {TABS.map((t) => (
          <div key={t.id} className={`tab${activeTab === t.id ? " active" : ""}`} onClick={() => setActiveTab(t.id)}>
            {t.label}
          </div>
        ))}
      </div>
      {views[activeTab]}
    </>
  );
}
