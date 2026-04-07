import { Link } from "react-router-dom";
import "../styles/adminSidebar.css";

function AdminSidebar() {
  return (
    <div className="admin-sidebar">

      <h3>Menu</h3>

      <Link to="/dashboard">Dashboard</Link>
      <Link to="/verify-users">Verify Users</Link>
      <Link to="/add-candidates">Add Candidates</Link>
      <Link to="/schedule">Voting Schedule</Link>
      <Link to="/results">Results</Link>

    </div>
  );
}

export default AdminSidebar;