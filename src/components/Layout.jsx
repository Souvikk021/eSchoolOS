import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
      <Sidebar />
      <main className="main">
        {children}
      </main>
    </div>
  );
}