import { useState } from "react";
import { useApp } from "../context/AppContext";

function Rule({ met, text }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 7,
      fontSize: 12, color: met ? "#059669" : "#9ca3af",
      transition: "color 0.2s",
    }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0, opacity: met ? 1 : 0.35 }}>
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      {text}
    </div>
  );
}

export default function ChangePassword() {
  const { currentUser, changePassword, logout } = useApp();

  const [oldPw,   setOldPw]   = useState("");
  const [newPw,   setNewPw]   = useState("");
  const [confirm, setConfirm] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const rules = {
    length:  newPw.length >= 8,
    upper:   /[A-Z]/.test(newPw),
    number:  /[0-9]/.test(newPw),
    special: /[^A-Za-z0-9]/.test(newPw),
    match:   newPw === confirm && confirm.length > 0,
  };
  const allMet = Object.values(rules).every(Boolean);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!allMet) { setError("Please meet all password requirements."); return; }
    setError("");
    setLoading(true);
    const res = await changePassword(oldPw, newPw);
    setLoading(false);
    if (!res.success) setError(res.error);
    // on success: AppContext sets mustChangePassword=false → App.jsx shows main app
  }

  const firstName = currentUser?.name?.split(" ")[0] || "there";

  return (
    <div style={S.page}>
      <div style={S.card}>

        {/* Logo */}
        <div style={S.logoRow}>
          <div style={S.mark}>eS</div>
          <span style={S.logoText}>eSchoolOS</span>
        </div>

        {/* Banner */}
        <div style={S.banner}>
          <span style={{ fontSize: 22 }}>🔐</span>
          <div>
            <div style={S.bannerTitle}>Set your new password</div>
            <div style={S.bannerSub}>
              Welcome, {firstName}! You must change your temporary password before continuing.
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={S.form}>

          {/* Current password */}
          <div style={S.field}>
            <label style={S.label}>Current (temporary) password</label>
            <div style={{ position: "relative" }}>
              <input
                style={S.input}
                type={showOld ? "text" : "password"}
                placeholder="The password given to you"
                value={oldPw}
                onChange={e => { setOldPw(e.target.value); setError(""); }}
                autoFocus
              />
              <button type="button" style={S.eye} onClick={() => setShowOld(v => !v)}>
                {showOld ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* New password */}
          <div style={S.field}>
            <label style={S.label}>New password</label>
            <div style={{ position: "relative" }}>
              <input
                style={S.input}
                type={showNew ? "text" : "password"}
                placeholder="Create a strong password"
                value={newPw}
                onChange={e => { setNewPw(e.target.value); setError(""); }}
              />
              <button type="button" style={S.eye} onClick={() => setShowNew(v => !v)}>
                {showNew ? "🙈" : "👁"}
              </button>
            </div>
            {newPw && (
              <div style={S.rules}>
                <Rule met={rules.length}  text="At least 8 characters" />
                <Rule met={rules.upper}   text="One uppercase letter (A-Z)" />
                <Rule met={rules.number}  text="One number (0-9)" />
                <Rule met={rules.special} text="One special character (!@#$...)" />
              </div>
            )}
          </div>

          {/* Confirm */}
          <div style={S.field}>
            <label style={S.label}>Confirm new password</label>
            <input
              style={{
                ...S.input,
                borderColor: confirm
                  ? rules.match ? "#10b981" : "#ef4444"
                  : "#e8eaed",
              }}
              type="password"
              placeholder="Re-enter new password"
              value={confirm}
              onChange={e => { setConfirm(e.target.value); setError(""); }}
            />
            {confirm && rules.match && (
              <div style={{ fontSize: 12, color: "#059669", marginTop: 4 }}>✓ Passwords match</div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div style={S.error}>{error}</div>
          )}

          <button
            type="submit"
            style={{ ...S.submit, opacity: allMet ? 1 : 0.55, cursor: allMet ? "pointer" : "not-allowed" }}
            disabled={loading || !allMet}
          >
            {loading ? "Saving…" : "Set new password & continue →"}
          </button>

          <button type="button" style={S.cancelBtn} onClick={logout}>
            Sign out instead
          </button>

        </form>
      </div>
    </div>
  );
}

const S = {
  page: {
    minHeight: "100vh", background: "#f7f8fa",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'DM Sans', system-ui, sans-serif", padding: "24px 16px",
  },
  card: {
    background: "#fff", border: "1px solid #e8eaed", borderRadius: 16,
    padding: "36px 40px", width: "100%", maxWidth: 440,
    boxShadow: "0 4px 6px rgba(0,0,0,0.04)",
  },
  logoRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 24 },
  mark: {
    width: 32, height: 32, borderRadius: 8, background: "#0066ff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 12, fontWeight: 700, color: "#fff",
  },
  logoText: { fontSize: 15, fontWeight: 600, letterSpacing: "-0.3px" },
  banner: {
    display: "flex", alignItems: "flex-start", gap: 12,
    background: "#fffbeb", border: "1px solid #fde68a",
    borderRadius: 10, padding: "14px 16px", marginBottom: 24,
  },
  bannerTitle: { fontSize: 13.5, fontWeight: 600, color: "#92400e", marginBottom: 3 },
  bannerSub:   { fontSize: 12.5, color: "#b45309", lineHeight: 1.5 },
  form:  { display: "flex", flexDirection: "column", gap: 16 },
  field: { display: "flex", flexDirection: "column", gap: 5 },
  label: { fontSize: 12, fontWeight: 500, color: "#374151" },
  input: {
    width: "100%", height: 40, border: "1px solid #e8eaed", borderRadius: 8,
    padding: "0 40px 0 12px", fontSize: 14, fontFamily: "inherit",
    outline: "none", background: "#fff", boxSizing: "border-box",
    transition: "border-color 0.15s",
  },
  eye: {
    position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
    background: "none", border: "none", cursor: "pointer", fontSize: 14, padding: 4,
  },
  rules: {
    background: "#f9fafb", border: "1px solid #f0f2f5",
    borderRadius: 8, padding: "10px 12px", marginTop: 6,
    display: "flex", flexDirection: "column", gap: 5,
  },
  error: {
    background: "#fef2f2", border: "1px solid #fecaca",
    borderRadius: 8, padding: "10px 12px",
    fontSize: 13, color: "#dc2626",
  },
  submit: {
    width: "100%", height: 40, background: "#0066ff", color: "#fff",
    border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500,
    fontFamily: "inherit", transition: "background 0.15s",
  },
  cancelBtn: {
    width: "100%", height: 36, background: "none",
    border: "none", fontSize: 13, color: "#9ca3af",
    cursor: "pointer", fontFamily: "inherit",
  },
};
