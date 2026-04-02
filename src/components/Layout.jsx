import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children, title, subtitle, action }) {
  return (
    <div className="layout">

      <Sidebar />

      <div className="main">
        <Topbar title={title} subtitle={subtitle} action={action} />

        <motion.div
          className="content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </div>

    </div>
  );
}
