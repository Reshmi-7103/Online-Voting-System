import Layout from "../components/Layout";
import "../styles/contact.css";

function Contact() {
  return (
    <Layout>
    <div className="contact-container">

      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">
        Have any questions? We'd love to hear from you.
      </p>

      <div className="contact-wrapper">

        {/* LEFT SIDE INFO */}
        <div className="contact-info">
          <h3>Get in Touch</h3>

          <p><strong>📧 Email:</strong> support@evoting.com</p>
          <p><strong>📞 Phone:</strong> +91 9876543210</p>
          <p><strong>📍 Address:</strong> Mumbai, India</p>

          <div className="contact-note">
            Our team will respond within 24 hours.
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>

          <button>Send Message</button>
        </div>

      </div>

    </div>
    </Layout>
  );
}

export default Contact;