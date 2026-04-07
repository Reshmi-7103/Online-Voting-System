import { Link } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h3 className="menu-title">Menu</h3>

      <Link to="/">Dashboard</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/Vote">Vote Now</Link>
      <Link to="/login">Log Out</Link>
      
    </div>
  );
}

export default Sidebar;