import LayoutLog from "../components/LayoutLog";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/vote.css";

function VoteLog() {

  const navigate = useNavigate();

  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [candidates, setCandidates] = useState([]);

  const [form, setForm] = useState({
    aadhar: "",
    voterId: ""
  });

  // 🔥 FETCH CANDIDATES
  const fetchCandidates = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/admin/candidates");
      const data = await res.json();
      setCandidates(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // 🔥 VERIFY USER
  const handleVerify = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setMessage("Please login first ❌");
      navigate("/login");
      return;
    }

    if (user.is_rejected) {
      setMessage("Your document verification is rejected ❌");
      return;
    }

    if (!user.is_verified) {
      setMessage("Waiting for admin approval ⏳");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/verify-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: user.email,
          aadhar: form.aadhar,
          voter_id: form.voterId
        })
      });

      const data = await res.json();

      if (res.status === 200) {
        setVerified(true);
        setMessage("Verification successful ✅");
      } else {
        setMessage(data.msg);
      }

    } catch (err) {
      console.log(err);
      setMessage("Server error ❌");
    }
  };

  // 🔥 VOTE CLICK
  const handleVote = async (name) => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setMessage("Login required ❌");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: user.email,
          candidate: name
        })
      });

      const data = await res.json();

      if (res.status === 200) {
        setMessage(data.msg);
      } else {
        setMessage(data.msg);
      }

    } catch (err) {
      console.log(err);
      setMessage("Error voting ❌");
    }
  };

  return (
    <LayoutLog>
      <div className="vote-container">

        <h1>Vote Now</h1>

        {message && <p className="msg">{message}</p>}

        {!verified ? (
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
        ) : (
          <div className="candidates">

            {candidates.length === 0 ? (
              <p>No candidates available ❌</p>
            ) : (
              candidates.map((c, index) => (
                <div key={index} className="candidate-card">

                  <div className="img-row">
                    {c.photo && <img src={c.photo} className="candidate-img" />}
                    {c.symbol && <img src={c.symbol} className="symbol-img" />}
                  </div>

                  <h3>{c.name}</h3>
                  <p><strong>Party:</strong> {c.party}</p>
                  <p><strong>Region:</strong> {c.region}</p>

                  {/* 🔥 FIXED BUTTON */}
                  <button
                    className="vote-btn"
                    onClick={() => handleVote(c.name)}
                  >
                    Vote
                  </button>

                </div>
              ))
            )}

          </div>
        )}

      </div>
    </LayoutLog>
  );
}

export default VoteLog;