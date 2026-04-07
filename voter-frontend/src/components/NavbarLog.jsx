import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

import logo from "../assets/images/logo.png";
import profile from "../assets/images/profile.png";

function NavbarLog() {
  const navigate = useNavigate();

  return (
    <div className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <img src={logo} alt="logo" className="logo" />
        <h2>E-Voting</h2>
      </div>

      {/* CENTER */}
      <div className="nav-links">
        <Link to="/dashboard-log">Home</Link>
        <Link to="/results">Results</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <div
          className="profile-box"
          onClick={() => navigate("/profileLog")}
          style={{ cursor: "pointer" }}
        >
          <img src={profile} alt="profile" />
        </div>
      </div>

    </div>
  );
}

export default NavbarLog;