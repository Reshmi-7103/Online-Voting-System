import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Carousel from "../components/Carousel";
import "../styles/home.css";

function Home() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="home-container">

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
            <h3>🔐 Secure System</h3>
            <p>Blockchain ensures your vote is safe and tamper-proof.</p>
          </div>

          <div className="info-card">
            <h3>📊 Transparent Results</h3>
            <p>View real-time election results instantly.</p>
          </div>
        </div>

      </div>
    </>
  );
}

export default Home;