import LayoutLog from "../components/LayoutLog";
import "../styles/profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🔥 GET USER DATA (for now localStorage se)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) {
    return (
      <div className="profile-container">
        <h2>You are not logged in ❌</h2>
        <button onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <LayoutLog>
    <div className="profile-container">

      <div className="profile-card">

        <h2>User Profile 👤</h2>

        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Aadhar:</strong> {user.aadhar}</p>
          <p><strong>Voter ID:</strong> {user.voter_id}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Occupation:</strong> {user.occupation}</p>
        </div>

        {/* 🔥 VOTE BUTTON */}
        <div className="vote-btn">
          <button onClick={() => navigate("/vote")}>
            🗳️ Vote Now
          </button>
        </div>

      </div>

    </div>
    </LayoutLog>
  );
}

export default Profile;