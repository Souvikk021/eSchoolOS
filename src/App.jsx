import { AppProvider, useApp } from "./context/AppContext";
import Layout        from "./components/Layout";
import Login         from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import Dashboard     from "./pages/Dashboard";
import Students      from "./pages/Students";
import Academics     from "./pages/Academics";
import Attendance    from "./pages/Attendance";
import Finance       from "./pages/Finance";
import Communication from "./pages/Communication";
import Reports       from "./pages/Reports";
import Settings      from "./pages/Settings";

const PANELS = {
  dashboard:     Dashboard,
  students:      Students,
  academics:     Academics,
  attendance:    Attendance,
  finance:       Finance,
  communication: Communication,
  reports:       Reports,
  settings:      Settings,
};

function LoadingScreen() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#f7f8fa",
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10, background: "#0066ff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 700, color: "#fff",
          margin: "0 auto 16px",
          animation: "pulse 1.5s ease-in-out infinite",
        }}>eS</div>
        <div style={{ fontSize: 13, color: "#9ca3af" }}>Loading…</div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </div>
  );
}

function AppContent() {
  const { isLoggedIn, authLoading, mustChangePassword, currentPanel } = useApp();

  // 1. Still rehydrating session from localStorage
  if (authLoading) return <LoadingScreen />;

  // 2. Not logged in → show login
  if (!isLoggedIn) return <Login />;

  // 3. Logged in but must change password first
  if (mustChangePassword) return <ChangePassword />;

  // 4. Normal app
  const PanelComponent = PANELS[currentPanel] || Dashboard;
  return (
    <Layout>
      <PanelComponent />
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}