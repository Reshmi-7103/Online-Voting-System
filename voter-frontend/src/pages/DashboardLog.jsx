import NavbarLog from "../components/NavbarLog";
import SidebarLog from "../components/SidebarLog";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import "../styles/dashboard.css";

function DashboardLog() {
  return (
    <>
      {/* ✅ NAVBAR */}
      <NavbarLog />

      <div className="app-layout">

        {/* ✅ SIDEBAR */}
        <SidebarLog />

        <div className="main-wrapper">

          <div className="dashboard-log">

            <div className="hero">
              <h1>Welcome to EM-Voting Portal</h1>
              <p>Secure • Transparent • Digital Voting System</p>
            </div>

            <Carousel />

            <div className="info-section">
              <div className="info-card">
                <h3>🗳 Cast Your Vote</h3>
                <p>Participate in elections securely from anywhere.</p>
              </div>

              <div className="info-card">
                <h3>🔐 Secure Voting</h3>
                <p>Blockchain ensures safety and transparency.</p>
              </div>

              <div className="info-card">
                <h3>📊 Live Results</h3>
                <p>Check election results in real-time.</p>
              </div>
            </div>

            <div className="dashboard-cards">
              <div className="card"><h3>Voting Status</h3><p>Not Voted</p></div>
              <div className="card"><h3>Total Candidates</h3><p>5</p></div>
              <div className="card"><h3>Election Date</h3><p>25 March 2026</p></div>
              <div className="card"><h3>Your Area</h3><p>Mumbai</p></div>
            </div>

          </div>

          {/* ✅ FOOTER */}
          <Footer />

        </div>
      </div>
    </>
  );
}

export default DashboardLog;