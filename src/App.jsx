import { AppProvider, useApp } from "./context/AppContext";
import Layout        from "./components/Layout";
import Login         from "./pages/Login";
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

function AppContent() {
  const { isLoggedIn, currentPanel } = useApp();

  if (!isLoggedIn) return <Login />;

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