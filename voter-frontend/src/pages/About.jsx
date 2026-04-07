import Layout from "../components/Layout";
import "../styles/about.css";

function About() {
  return (
    <Layout>

      <div className="about-container">

        <h1>About E-Voting System</h1>

        <p>
          The E-Voting System is a secure and transparent platform designed to
          enable citizens to cast their votes digitally. This system aims to
          improve accessibility, reduce manual effort, and ensure fair elections.
        </p>

        <div className="about-cards">

          <div className="about-card">
            <h3>🔐 Secure</h3>
            <p>All votes are securely stored using blockchain technology.</p>
          </div>

          <div className="about-card">
            <h3>⚡ Fast</h3>
            <p>Instant voting and real-time result calculation.</p>
          </div>

          <div className="about-card">
            <h3>🌍 Accessible</h3>
            <p>Vote from anywhere without physical presence.</p>
          </div>

        </div>

      </div>

    </Layout>
  );
}

export default About;