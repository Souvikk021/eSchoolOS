import { useState } from "react";
import { useApp } from "../context/AppContext";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body, #root { height: 100%; }

.lp-root {
  min-height: 100vh; width: 100%;
  font-family: 'DM Sans', system-ui, sans-serif;
  display: grid;
  grid-template-columns: 1fr 480px;
  background: #f8f7f4;
}

/* LEFT */
.lp-left {
  position: relative;
  display: flex; flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 48px 56px 48px 52px;
  background: #0c1a2e;
  overflow: hidden;
  user-select: none;
}
.lp-orb {
  position: absolute; border-radius: 50%;
  filter: blur(90px); opacity: 0.14;
  animation: lpDrift 16s ease-in-out infinite;
  pointer-events: none;
}
.lp-orb-1 { width:500px;height:500px;background:#2563eb;top:-100px;left:-100px;animation-delay:0s; }
.lp-orb-2 { width:360px;height:360px;background:#0ea5e9;bottom:60px;right:-80px;animation-delay:-6s; }
.lp-orb-3 { width:260px;height:260px;background:#6366f1;top:45%;left:42%;animation-delay:-10s; }
@keyframes lpDrift {
  0%,100%{transform:translate(0,0) scale(1);}
  33%{transform:translate(24px,-16px) scale(1.04);}
  66%{transform:translate(-16px,24px) scale(0.97);}
}
.lp-left::before {
  content:''; position:absolute; inset:0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 36px 36px; pointer-events:none;
}
.lp-left-top, .lp-left-bottom { position:relative; z-index:1; }

.lp-logo {
  display:inline-flex; align-items:center; gap:11px;
  text-decoration:none; width:fit-content;
  align-self: flex-start;
}
.lp-logo-icon {
  width:38px; height:38px; border-radius:11px; background:#2563eb;
  display:flex; align-items:center; justify-content:center;
  box-shadow:0 0 0 1px rgba(255,255,255,0.1),0 8px 24px rgba(37,99,235,0.4);
  color:white; flex-shrink:0;
}
.lp-logo-text { font-size:17px; font-weight:600; color:#fff; letter-spacing:-0.3px; }

.lp-hero { margin-top:56px; width:100%; }
.lp-eyebrow {
  font-size:11px; font-weight:500; letter-spacing:2.5px;
  text-transform:uppercase; color:rgba(255,255,255,0.28);
  margin-bottom:18px; display:block; text-align:left;
}
.lp-headline {
  font-family:'Instrument Serif',Georgia,serif;
  font-size:48px; line-height:1.1; color:#fff;
  letter-spacing:-0.5px; margin-bottom:18px; display:block; text-align:left;
}
.lp-headline em { font-style:italic; color:#60a5fa; display:block; }
.lp-desc {
  font-size:14.5px; color:rgba(255,255,255,0.4);
  line-height:1.75; max-width:420px; display:block; text-align:left;
}

.lp-stats { display:flex; align-items:center; margin-top:44px; justify-content:flex-start; }
.lp-stat { padding:0 28px; }
.lp-stat:first-child { padding-left:0; }
.lp-stat + .lp-stat { border-left:1px solid rgba(255,255,255,0.08); }
.lp-stat-num { font-size:30px; font-weight:600; color:#fff; letter-spacing:-0.5px; line-height:1; display:block; }
.lp-stat-label { font-size:12px; color:rgba(255,255,255,0.3); margin-top:5px; display:block; }

.lp-badges { display:flex; gap:8px; flex-wrap:wrap; justify-content:flex-start; align-items:flex-start; }
.lp-badge {
  display:inline-flex; align-items:center; gap:7px;
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.1);
  border-radius:20px; padding:7px 14px;
  font-size:12px; color:rgba(255,255,255,0.45);
}
.lp-badge-dot { width:6px; height:6px; border-radius:50%; background:#22c55e; flex-shrink:0; }

/* RIGHT */
.lp-right {
  background:#fff;
  display:flex; flex-direction:column;
  align-items:center; justify-content:center;
  padding:56px 52px;
  border-left:1px solid #e8e5e0;
  position:relative; min-height:100vh;
}
.lp-panel {
  width:100%; max-width:352px;
  animation:lpFadeUp 0.4s 0.05s ease both;
}
@keyframes lpFadeUp {
  from{opacity:0;transform:translateY(12px);}
  to{opacity:1;transform:translateY(0);}
}
.lp-form-eyebrow {
  font-size:11px; font-weight:600; letter-spacing:1.5px;
  text-transform:uppercase; color:#2563eb;
  margin-bottom:10px; display:block;
}
.lp-form-title {
  font-size:26px; font-weight:600; color:#0c1a2e;
  letter-spacing:-0.5px; margin-bottom:7px; display:block;
}
.lp-form-sub {
  font-size:14px; color:#9a9589; line-height:1.55;
  margin-bottom:36px; display:block;
}

.lp-field { margin-bottom:18px; }
.lp-label {
  font-size:12px; font-weight:500; color:#4a4540;
  display:block; margin-bottom:8px; letter-spacing:0.2px;
}
.lp-input-wrap { position:relative; display:flex; align-items:center; }
.lp-input-icon {
  position:absolute; left:14px; top:50%; transform:translateY(-50%);
  color:#c4c0bb; pointer-events:none;
  display:flex; align-items:center; justify-content:center;
  width:16px; height:16px; flex-shrink:0; z-index:2;
}
.lp-input {
  width:100%; height:46px;
  border:1.5px solid #e2dfd9 !important; border-radius:10px;
  padding:0 44px 0 44px !important;
  font-size:14px; color:#0c1a2e;
  font-family:'DM Sans',system-ui,sans-serif;
  background:#fafaf8; outline:none;
  min-width:unset;
  transition:border-color 0.15s,box-shadow 0.15s,background 0.15s;
}
.lp-input::placeholder { color:#c4c0bb; }
.lp-input:focus {
  border-color:#2563eb; background:#fff;
  box-shadow:0 0 0 3px rgba(37,99,235,0.08);
}
.lp-input.lp-err {
  border-color:#ef4444;
  box-shadow:0 0 0 3px rgba(239,68,68,0.08);
}
.lp-eye {
  position:absolute; right:13px; top:50%; transform:translateY(-50%);
  background:none; border:none; cursor:pointer;
  color:#c4c0bb; display:flex; align-items:center;
  padding:3px; transition:color 0.12s; z-index:2;
}
.lp-eye:hover { color:#6b6760; }

.lp-forgot-row { display:flex; justify-content:flex-end; margin-top:6px; margin-bottom:24px; }
.lp-forgot {
  font-size:12px; font-weight:500; color:#2563eb;
  background:none; border:none; cursor:pointer;
  font-family:inherit; padding:0;
}
.lp-forgot:hover { text-decoration:underline; }

.lp-error-box {
  display:flex; align-items:flex-start; gap:9px;
  background:#fef2f2; border:1px solid #fecaca;
  border-radius:9px; padding:11px 13px; margin-bottom:16px;
  font-size:13px; color:#b91c1c; line-height:1.45;
}

.lp-submit {
  width:100%; height:48px;
  background:#0c1a2e; color:#fff;
  border:none; border-radius:10px;
  font-size:14px; font-weight:600;
  font-family:'DM Sans',system-ui,sans-serif;
  cursor:pointer;
  display:flex; align-items:center; justify-content:center; gap:8px;
  transition:background 0.15s,box-shadow 0.15s,transform 0.1s;
  box-shadow:0 1px 3px rgba(0,0,0,0.1),0 4px 14px rgba(12,26,46,0.18);
}
.lp-submit:hover:not(:disabled) {
  background:#1a2f4a;
  box-shadow:0 2px 6px rgba(0,0,0,0.12),0 8px 22px rgba(12,26,46,0.24);
}
.lp-submit:active:not(:disabled) { transform:translateY(1px); }
.lp-submit:disabled { opacity:0.5; cursor:not-allowed; }

.lp-spinner {
  width:16px; height:16px;
  border:2px solid rgba(255,255,255,0.25);
  border-top-color:#fff; border-radius:50%;
  animation:lpSpin 0.65s linear infinite; flex-shrink:0;
}
@keyframes lpSpin { to{transform:rotate(360deg);} }

.lp-help {
  margin-top:24px; text-align:center;
  font-size:13px; color:#b8b4af; line-height:1.55;
}
.lp-help strong { color:#6b6760; font-weight:500; }

.lp-footer {
  position:absolute; bottom:28px; left:0; right:0;
  font-size:11px; color:#d4d0ca;
  text-align:center; line-height:1.7;
}
.lp-footer a { color:#c4c0bb; text-decoration:none; }
.lp-footer a:hover { color:#6b6760; }

@media (max-width:900px) {
  .lp-root { grid-template-columns:1fr; }
  .lp-left { display:none; }
  .lp-right { min-height:100vh; background:#f8f7f4; border-left:none; padding:40px 28px; }
}
`;

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
    if (!res.success) setError(res.error || "Invalid credentials. Please try again.");
    // On success: AppContext sets isLoggedIn=true → App.jsx re-renders automatically
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="lp-root">

        {/* LEFT */}
        <div className="lp-left">
          <div className="lp-orb lp-orb-1" />
          <div className="lp-orb lp-orb-2" />
          <div className="lp-orb lp-orb-3" />

          <div className="lp-left-top">
            <div className="lp-logo">
              <div className="lp-logo-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <span className="lp-logo-text">eSchoolOS</span>
            </div>

            <div className="lp-hero">
              <span className="lp-eyebrow">School management platform</span>
              <span className="lp-headline">
                Run your school.
                <em>Effortlessly.</em>
              </span>
              <span className="lp-desc">
                The complete ERP built for Indian schools — attendance, fees,
                exams, and parent communication in one clean platform.
              </span>

              <div className="lp-stats">
                <div className="lp-stat">
                  <span className="lp-stat-num">3+</span>
                  <span className="lp-stat-label">Schools onboarded</span>
                </div>
                <div className="lp-stat">
                  <span className="lp-stat-num">1.5K+</span>
                  <span className="lp-stat-label">Students managed</span>
                </div>
                <div className="lp-stat">
                  <span className="lp-stat-num">100%</span>
                  <span className="lp-stat-label">Data secure</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lp-left-bottom">
            <div className="lp-badges">
              <span className="lp-badge">
                <span className="lp-badge-dot" />
                All systems operational
              </span>
              <span className="lp-badge">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                End-to-end encrypted
              </span>
              <span className="lp-badge">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                DPDP Act compliant
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lp-right">
          <div className="lp-panel">

            <span className="lp-form-eyebrow">Welcome back</span>
            <span className="lp-form-title">Sign in to your school</span>
            <span className="lp-form-sub">Enter your credentials to access the dashboard.</span>

            <form onSubmit={handleSubmit} noValidate>

              {/* Login ID */}
              <div className="lp-field">
                <label className="lp-label">Login ID</label>
                <div className="lp-input-wrap">
                  <span className="lp-input-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    className={`lp-input${error && !loginId.trim() ? " lp-err" : ""}`}
                    type="text"
                    placeholder="e.g. ADMIN001"
                    value={loginId}
                    autoFocus
                    autoComplete="username"
                    spellCheck={false}
                    onChange={e => { setLoginId(e.target.value.toUpperCase()); setError(""); }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="lp-field">
                <label className="lp-label">Password</label>
                <div className="lp-input-wrap">
                  <span className="lp-input-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    className={`lp-input${error && loginId && !password ? " lp-err" : ""}`}
                    type={showPw ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    autoComplete="current-password"
                    onChange={e => { setPassword(e.target.value); setError(""); }}
                  />
                  <button type="button" className="lp-eye" tabIndex={-1}
                    onClick={() => setShowPw(v => !v)}>
                    {showPw
                      ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                      : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    }
                  </button>
                </div>
              </div>

              <div className="lp-forgot-row">
                <button type="button" className="lp-forgot">Forgot password?</button>
              </div>

              {error && (
                <div className="lp-error-box">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              <button className="lp-submit" type="submit" disabled={loading}>
                {loading
                  ? <><span className="lp-spinner" />Signing in…</>
                  : <>
                    Sign in
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                }
              </button>
            </form>

            <div className="lp-help">
              Need access? Contact your <strong>school administrator</strong> to get an account.
            </div>

          </div>

          <p className="lp-footer">
            © 2025 eSchoolOS · <a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a>
          </p>
        </div>

      </div>
    </>
  );
}
