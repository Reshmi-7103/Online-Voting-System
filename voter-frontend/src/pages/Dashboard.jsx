import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import "../styles/dashboard.css";

function Dashboard() {
  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      <div className="app-layout">

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <div className="main-wrapper">

          <div className="dashboard">

            {/* HERO SECTION */}
            <div className="hero">
              <h1>Welcome to E-Voting Portal</h1>
              <p>Secure • Transparent • Digital Voting System</p>
            </div>

            {/* CAROUSEL */}
            <Carousel />

            {/* INFO SECTION */}
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

            {/* DASHBOARD CARDS */}
            <div className="dashboard-cards">

              <div className="card">
                <h3>Voting Status</h3>
                <p>Not Voted</p>
              </div>

              <div className="card">
                <h3>Total Candidates</h3>
                <p>5</p>
              </div>

              <div className="card">
                <h3>Election Date</h3>
                <p>25 March 2026</p>
              </div>

              <div className="card">
                <h3>Your Area</h3>
                <p>Mumbai</p>
              </div>

            </div>

          </div>

          {/* FOOTER */}
          <Footer />

        </div>
      </div>
    </>
  );
}

export default Dashboard;