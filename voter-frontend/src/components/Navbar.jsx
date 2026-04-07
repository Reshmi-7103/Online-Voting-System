import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../styles/navbar.css";

import logo from "../assets/images/logo.png";
import profile from "../assets/images/profile.png";

function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef();

  const isLoggedIn = false;

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <img src={logo} alt="logo" className="logo" />
        <h2>E-Voting</h2>
      </div>

      {/* CENTER */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/results">Results</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </div>

      {/* RIGHT */}
      <div className="nav-right" ref={dropdownRef}>
        <div
          className="profile-box"
          onClick={() => setDropdown(!dropdown)}
        >
          <img src={profile} alt="profile" />
        </div>

        {dropdown && (
          <div className="dropdown">
            {!isLoggedIn ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Sign Up</Link>
              </>
            ) : (
              <>
                <Link to="/profile">Profile</Link>
                <Link to="/logout">Logout</Link>
              </>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

export default Navbar;