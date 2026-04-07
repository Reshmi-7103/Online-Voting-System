import Layout from "../components/Layout";
import "../styles/auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async () => {

    if (!form.email || !form.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });

      const data = await res.json();

      if (res.status === 200) {
        alert(data.msg);

        // ✅ Save login status
        localStorage.setItem("isLoggedIn", "true");

        // 🔥 SAVE FULL USER DATA (IMPORTANT)
        localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ Update React state safely
        if (setIsLoggedIn) {
          setIsLoggedIn(true);
        }

        // ✅ Redirect
        navigate("/dashboard-log");

      } else {
        alert(data.msg);
      }

    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <Layout>
    <div className="auth-container">

      <div className="auth-box">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={handleLogin}>Login</button>

        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>

      </div>

    </div>
    </Layout>
  );
}

export default Login;