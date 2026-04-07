import Layout from "../components/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/vote.css";

function Vote() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    aadhar: "",
    voterId: ""
  });

  const handleVerify = () => {
    if (form.aadhar.length === 12 && form.voterId.length > 5) {
      // 🔥 Redirect to Login Page
      navigate("/login");
    } else {
      alert("Invalid Details");
    }
  };

  return (
    <Layout>

      <div className="vote-container">

        <h1>Vote Now</h1>

        <div className="verify-box">

          <input
            type="text"
            placeholder="Enter Aadhar Number"
            onChange={(e) => setForm({ ...form, aadhar: e.target.value })}
          />

          <input
            type="text"
            placeholder="Enter Voter ID"
            onChange={(e) => setForm({ ...form, voterId: e.target.value })}
          />

          <button onClick={handleVerify}>Verify</button>

        </div>

      </div>

    </Layout>
  );
}

export default Vote;