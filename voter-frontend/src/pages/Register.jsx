import LayoutLog from "../components/LayoutLog";
import "../styles/auth.css";
import { useState } from "react";

function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    otp: "",
    gender: "",
    phone: "",
    aadhar: "",
    voterId: "",
    age: "",
    occupation: "",
    password: ""
  });

  const [otpSent, setOtpSent] = useState(false);

  // 🔥 SEND OTP (BACKEND EMAIL)
  const sendOtp = async () => {

    if (!form.email) {
      alert("Enter email first");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: form.email })
      });

      const data = await res.json();

      alert(data.msg); // OTP sent to email
      setOtpSent(true);

    } catch (err) {
      console.log(err);
      alert("Error sending OTP");
    }
  };

  // 🔥 REGISTER API CALL
  const handleRegister = async () => {

    if (
      !form.name || !form.email || !form.gender ||
      !form.phone || !form.aadhar || !form.voterId ||
      !form.age || !form.occupation || !form.password || !form.otp
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          otp: form.otp,
          gender: form.gender,
          phone: form.phone,
          aadhar: form.aadhar,
          voter_id: form.voterId,
          age: form.age,
          occupation: form.occupation,
          password: form.password
        })
      });

      const data = await res.json();

      alert(data.msg);

    } catch (error) {
      console.log(error);
      alert("Error connecting to server");
    }
  };

  return (
    <LayoutLog>
    <div className="auth-container">

      <div className="auth-box">
        <h2>Register</h2>

        <input type="text" placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* EMAIL + OTP */}
        <div className="otp-row">
          <input type="email" placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </div>

        {otpSent && (
          <input type="text" placeholder="Enter OTP"
            onChange={(e) => setForm({ ...form, otp: e.target.value })}
          />
        )}

        {/* GENDER */}
        <select onChange={(e) => setForm({ ...form, gender: e.target.value })}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input type="text" placeholder="Phone Number"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input type="text" placeholder="Aadhar Number (12 digit)"
          onChange={(e) => setForm({ ...form, aadhar: e.target.value })}
        />

        <input type="text" placeholder="Voter ID"
          onChange={(e) => setForm({ ...form, voterId: e.target.value })}
        />

        <input type="number" placeholder="Age"
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />

        <input type="text" placeholder="Occupation"
          onChange={(e) => setForm({ ...form, occupation: e.target.value })}
        />

        <input type="password" placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={handleRegister}>Register</button>

        <p>
          Already have account? <a href="/login">Login</a>
        </p>

      </div>

    </div>
    </LayoutLog>
  );
}

export default Register;