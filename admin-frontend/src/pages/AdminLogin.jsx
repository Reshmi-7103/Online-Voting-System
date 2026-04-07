import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function AdminLogin() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleLogin = () => {

    // 🔥 SIMPLE HARDCODED LOGIN
    if (form.email === "admin@gmail.com" && form.password === "admin123") {
      alert("Admin Login Successful ✅");

      localStorage.setItem("admin", "true");

      navigate("/dashboard");

    } else {
      alert("Invalid Admin Credentials ❌");
    }
  };

  return (
    <div className="admin-login-container">

      <div className="admin-login-box">
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Enter Admin Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={handleLogin}>Login</button>

      </div>

    </div>
  );
}

export default AdminLogin;