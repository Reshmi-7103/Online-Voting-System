import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import DashboardLog from "./pages/DashboardLog";
import Profile from "./pages/Profile";
import ProfileLog from "./pages/profileLog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Results from "./pages/Results";
import Vote from "./pages/Vote";
import VoteLog from "./pages/VoteLog";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>

      <Routes>

        {/* 🏠 BEFORE LOGIN */}
        <Route path="/" element={<Dashboard />} />

        {/* 🟢 AFTER LOGIN */}
        <Route path="/dashboard-log" element={<DashboardLog />} />

        {/* 🔐 AUTH */}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/register" element={<Register />} />

        {/* 👤 PROFILE */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/profileLog" element={<ProfileLog />} />

        {/* 🗳 VOTE */}
        <Route path="/vote" element={<Vote />} />
        <Route path="/voteLog" element={<VoteLog />} />
        <Route path="/results" element={<Results />} />

        {/* ℹ️ INFO */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;