import { useState } from "react";
import { useApp } from "../context/AppContext";

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

const DEMO = [
  { id: "ADMIN001", pw: "admin123",   label: "Admin",       color: "#2563eb" },
  { id: "TCH001",   pw: "teacher123", label: "Teacher",     color: "#059669" },
  { id: "STU001",   pw: "student123", label: "Student",     color: "#d97706" },
  { id: "ACC001",   pw: "account123", label: "Accountant",  color: "#7c3aed" },
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
    if (!password)       { setError("Please enter your password.");  return; }

    setLoading(true);
    const res = await login(loginId, password);
    setLoading(false);

    if (!res.success) setError(res.error);
    // On success: AppContext sets isLoggedIn = true → App.jsx re-renders automatically
  }

  return (
    <div className="lp">

      {/* ── LEFT ── */}
      <div className="lp-left">
        <div className="lp-left-inner">
          <div className="lp-brand-mark">eS</div>
          <h1 className="lp-brand-name">eSchoolOS</h1>
          <p className="lp-brand-tag">Smart, modern school management</p>

          <div className="lp-brand-divider" />

          <div className="lp-brand-features">
            {[
              "Students, attendance & academics",
              "Finance, fees & payroll",
              "Parent communication & AI alerts",
              "Reports & custom analytics",
            ].map((f) => (
              <div key={f} className="lp-brand-feature">
                <span className="lp-check">✓</span>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div className="lp-right">
        <div className="lp-form-wrap">

          <div className="lp-form-header">
            <h2 className="lp-title">Sign in</h2>
            <p className="lp-sub">Enter your school credentials to continue</p>
          </div>

          {/* Demo pills */}
          <div className="lp-pills">
            <span className="lp-pills-label">Try as:</span>
            {DEMO.map((d) => (
              <button
                key={d.id}
                type="button"
                className="lp-pill"
                style={{ "--c": d.color }}
                onClick={() => { setLoginId(d.id); setPassword(d.pw); setError(""); }}
              >
                {d.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate>

            <div className="lp-field">
              <label className="lp-label">Login ID</label>
              <input
                className="lp-input"
                type="text"
                placeholder="e.g. ADMIN001"
                value={loginId}
                autoComplete="username"
                onChange={e => { setLoginId(e.target.value.toUpperCase()); setError(""); }}
              />
            </div>

            <div className="lp-field">
              <div className="lp-label-row">
                <label className="lp-label">Password</label>
                <span className="lp-link">Forgot password?</span>
              </div>
              <div className="lp-pw-wrap">
                <input
                  className="lp-input"
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  autoComplete="current-password"
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                />
                <button type="button" className="lp-eye" onClick={() => setShowPw(v => !v)}>
                  {showPw ? <IconEyeOff /> : <IconEye />}
                </button>
              </div>
            </div>

            {error && (
              <div className="lp-error">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            <button className={`lp-submit${loading ? " busy" : ""}`} type="submit" disabled={loading}>
              {loading ? <span className="lp-ring" /> : "Sign in"}
            </button>

          </form>

          <p className="lp-note">Contact your school administrator if you need access.</p>

        </div>
      </div>

    </div>
  );
}
