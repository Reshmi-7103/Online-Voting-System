import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import "../styles/votingSchedule.css";

function VotingSchedule() {

  const [schedule, setSchedule] = useState({
    date: "",
    totalCandidates: ""
  });

  const handleSave = () => {

    if (!schedule.date || !schedule.totalCandidates) {
      alert("Fill all fields");
      return;
    }

    // 🔥 For now localStorage (later backend)
    localStorage.setItem("election", JSON.stringify(schedule));

    alert("Election Schedule Saved ✅");
  };

  return (
    <AdminLayout>

      <div className="schedule-container">

        <h2>Set Voting Schedule</h2>

        <div className="schedule-box">

          <label>Election Date</label>
          <input
            type="date"
            onChange={(e) =>
              setSchedule({ ...schedule, date: e.target.value })
            }
          />

          <label>Total Candidates</label>
          <input
            type="number"
            placeholder="Enter total candidates"
            onChange={(e) =>
              setSchedule({ ...schedule, totalCandidates: e.target.value })
            }
          />

          <button onClick={handleSave}>Save</button>

        </div>

      </div>

    </AdminLayout>
  );
}

export default VotingSchedule;