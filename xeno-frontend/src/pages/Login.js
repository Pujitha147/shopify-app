import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { LogIn } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
        tenant_id: 1,
      });

      login(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/customers");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert("❌ Login failed: Try again");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-button">
            <LogIn size={18} /> Login
          </button>
        </form>

        {/* Footer */}
        <p className="login-footer">
          Don’t have an account?{" "}
          <a href="/register">Register</a>
        </p>
      </div>

      {/* Embedded CSS */}
      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to right, #6366f1, #8b5cf6, #ec4899);
          font-family: "Segoe UI", sans-serif;
        }
        .login-card {
          background: #fff;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          border-radius: 16px;
          padding: 40px;
          width: 100%;
          max-width: 400px;
        }
        .login-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .login-header h2 {
          font-size: 28px;
          font-weight: bold;
          color: #333;
          margin-bottom: 6px;
        }
        .login-header p {
          color: #666;
          font-size: 14px;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .login-input {
          padding: 12px 14px;
          border: 1px solid #ccc;
          border-radius: 10px;
          font-size: 15px;
          transition: 0.2s;
        }
        .login-input:focus {
          border-color: #6366f1;
          outline: none;
          box-shadow: 0 0 0 2px rgba(99,102,241,0.2);
        }
        .login-button {
          background: #6366f1;
          color: #fff;
          border: none;
          padding: 12px;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .login-button:hover {
          background: #4f46e5;
        }
        .login-footer {
          text-align: center;
          font-size: 14px;
          margin-top: 20px;
          color: #666;
        }
        .login-footer a {
          color: #6366f1;
          font-weight: 600;
          text-decoration: none;
        }
        .login-footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

export default Login;
