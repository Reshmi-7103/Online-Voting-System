import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import VerifyUsers from "./pages/VerifyUsers";
import AddCandidates from "./pages/AddCandidates";
import VotingSchedule from "./pages/VotingSchedule";
import Results from "./pages/Results";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* 🔐 ADMIN LOGIN */}
        <Route path="/" element={<AdminLogin />} />

        {/* 🧑‍💼 ADMIN PANEL */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verify-users" element={<VerifyUsers />} />
        <Route path="/add-candidates" element={<AddCandidates />} />
        <Route path="/schedule" element={<VotingSchedule />} />
        <Route path="/results" element={<Results />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;