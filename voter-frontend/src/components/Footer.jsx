import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-left">
          <h3>E-Voting System</h3>
          <p>Secure • Transparent • Digital Voting Platform</p>
        </div>

        {/* CENTER */}
        <div className="footer-center">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/vote">Vote</a></li>
            <li><a href="/results">Results</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="footer-right">
          <h4>Contact</h4>
          <p>Email: support@evoting.com</p>
          <p>Location: Mumbai, India</p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 E-Voting System | Government of India</p>
      </div>

    </footer>
  );
}

export default Footer;