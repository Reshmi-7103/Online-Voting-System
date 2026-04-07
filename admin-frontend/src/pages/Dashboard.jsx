import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import "../styles/adminDashboard.css";

function Dashboard() {

  const [stats, setStats] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    pendingUsers: 0,
    totalCandidates: 0,
    electionDate: ""
  });

  useEffect(() => {

    // 🔥 FETCH REAL DATA FROM BACKEND
    fetch("http://127.0.0.1:5000/admin/stats")
      .then(res => res.json())
      .then(data => {

        const election = JSON.parse(localStorage.getItem("election"));

        setStats({
          totalUsers: data.totalUsers,
          verifiedUsers: data.verifiedUsers,
          pendingUsers: data.pendingUsers,
          totalCandidates: 0, // baad me backend se aayega
          electionDate: election?.date || "Not Set"
        });

      })
      .catch(err => console.log(err));

  }, []);

  return (
    <AdminLayout>

      <div className="admin-dashboard">

        <h2>Admin Dashboard</h2>

        <div className="cards">

          <div className="card">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>

          <div className="card">
            <h3>Verified Users</h3>
            <p>{stats.verifiedUsers}</p>
          </div>

          <div className="card">
            <h3>Pending Users</h3>
            <p>{stats.pendingUsers}</p>
          </div>

          <div className="card">
            <h3>Total Candidates</h3>
            <p>{stats.totalCandidates}</p>
          </div>

          <div className="card">
            <h3>Election Date</h3>
            <p>{stats.electionDate}</p>
          </div>

        </div>

      </div>

    </AdminLayout>
  );
}

export default Dashboard;