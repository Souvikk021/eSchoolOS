import { useState } from "react";
import { useApp, ROLES } from "../context/AppContext";

/* ── Eye / EyeOff icons — no external dep ── */
function IconEye() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}
function IconEyeOff() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

/* ── Demo credential pills ── */
const DEMO_CREDENTIALS = [
  { id: "ADMIN001", pw: "admin123",   role: "admin",      label: "Admin",      color: "#0066ff" },
  { id: "TCH001",   pw: "teacher123", role: "teacher",    label: "Teacher",    color: "#10b981" },
  { id: "STU001",   pw: "student123", role: "student",    label: "Student",    color: "#f59e0b" },
  { id: "ACC001",   pw: "account123", role: "accountant", label: "Accountant", color: "#8b5cf6" },
];

export default function Login() {
  const { login } = useApp();

  const [loginId,  setLoginId]  = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!loginId.trim()) { setError("Please enter your Login ID."); return; }
    if (!password)        { setError("Please enter your password."); return; }

    setLoading(true);
    // Simulate network delay for premium feel
    await new Promise((r) => setTimeout(r, 600));
    const res = login(loginId, password);
    setLoading(false);

    if (!res.success) setError(res.error);
  }

  function fillDemo(cred) {
    setLoginId(cred.id);
    setPassword(cred.pw);
    setError("");
  }

  return (
    <div className="lp-container">

      {/* ── LEFT — Branding ── */}
      <div className="lp-left">
        <div className="lp-overlay">

          {/* top badge */}
          <div style={{ position: "absolute", top: 32, left: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="lp-logo-mark">eS</div>
              <span style={{ color: "white", fontWeight: 600, fontSize: 18, letterSpacing: "-0.3px" }}>eSchoolOS</span>
            </div>
          </div>

          {/* centre content */}
          <div className="lp-hero">
            <div className="lp-pill">🏫 Smart School ERP</div>
            <h1 className="lp-headline">Managing schools,<br/>the smart way.</h1>
            <p className="lp-tagline">
              All-in-one platform for admissions, attendance, fees,<br/>
              academics & communication — built for modern schools.
            </p>

            <div className="lp-feature-tiles">
              {[
                { icon: "👥", label: "Students",      val: "1,284" },
                { icon: "📅", label: "Attendance",    val: "94.2%" },
                { icon: "💰", label: "Fees Collected",val: "₹4.8L" },
                { icon: "👩‍🏫", label: "Teachers",     val: "68" },
              ].map((f) => (
                <div key={f.label} className="lp-tile">
                  <div className="lp-tile-icon">{f.icon}</div>
                  <div>
                    <div className="lp-tile-val">{f.val}</div>
                    <div className="lp-tile-label">{f.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* bottom school name */}
          <div style={{ position: "absolute", bottom: 32, left: 32, color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
            Delhi Public School — Newtown, Kolkata
          </div>
        </div>
      </div>

      {/* ── RIGHT — Login form ── */}
      <div className="lp-right">
        <div className="lp-card">

          {/* header */}
          <div className="lp-card-logo">
            <div className="lp-logo-mark" style={{ width: 40, height: 40, borderRadius: 10, fontSize: 16 }}>eS</div>
          </div>
          <h2 className="lp-card-title">Welcome back</h2>
          <p className="lp-card-sub">Sign in to your school portal</p>

          {/* demo pills */}
          <div className="lp-demo-row">
            {DEMO_CREDENTIALS.map((c) => (
              <button key={c.id} className="lp-demo-pill" onClick={() => fillDemo(c)}
                style={{ "--pill-color": c.color }}>
                <span className="lp-demo-dot" style={{ background: c.color }}></span>
                {c.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate>

            {/* Login ID */}
            <div className="lp-field">
              <label className="lp-label">Login ID</label>
              <div className="lp-input-wrap">
                <span className="lp-input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <input
                  type="text"
                  className="lp-input"
                  placeholder="e.g. ADMIN001"
                  value={loginId}
                  autoComplete="username"
                  onChange={(e) => { setLoginId(e.target.value.toUpperCase()); setError(""); }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="lp-field">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label className="lp-label">Password</label>
                <span className="lp-forgot">Forgot password?</span>
              </div>
              <div className="lp-input-wrap">
                <span className="lp-input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type={showPw ? "text" : "password"}
                  className="lp-input"
                  placeholder="••••••••"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                />
                <button type="button" className="lp-eye" onClick={() => setShowPw((v) => !v)}>
                  {showPw ? <IconEyeOff /> : <IconEye />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="lp-error">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" className={`lp-btn${loading ? " loading" : ""}`} disabled={loading}>
              {loading
                ? <span className="lp-spinner"></span>
                : <>Sign In <span style={{ marginLeft: 6 }}>→</span></>
              }
            </button>

          </form>

          <p className="lp-footer">
            Contact your school admin if you don't have login credentials.
          </p>
        </div>
      </div>

    </div>
  );
}
