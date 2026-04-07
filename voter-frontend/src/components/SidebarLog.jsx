import { Link } from "react-router-dom";
import "../styles/sidebar.css";

function SidebarLog() {
  return (
    <div className="sidebar">
      <h3 className="menu-title">Menu</h3>

      <Link to="/dashboard-log">Dashboard</Link>
      <Link to="/profileLog">Profilel</Link>
      <Link to="/voteLog">Vote Now</Link>
      <Link to="/results">Results</Link>
      <Link to="/login">Log Out</Link>
    </div>
  );
}

export default SidebarLog;