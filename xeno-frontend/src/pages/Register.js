// src/pages/Register.js
import React, { useState } from "react";
import { registerUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react"; // nice icon

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    tenant_id: "1", // 👈 default for now
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("✅ Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("❌ Registration failed:", err.response?.data || err.message);
      alert(`Registration failed: ${err.response?.data?.error || "Try again"}`);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Header */}
        <div className="register-header">
          <h2>Create Account</h2>
          <p>Fill in your details to get started</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="register-input"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="register-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="register-input"
          />

          <input
            type="text"
            name="tenant_id"
            placeholder="Tenant ID"
            value={form.tenant_id}
            onChange={handleChange}
            required
            className="register-input"
          />

          <button type="submit" className="register-button">
            <UserPlus size={18} /> Register
          </button>
        </form>

        {/* Footer */}
        <p className="register-footer">
          Already have an account?{" "}
          <a href="/login">Login</a>
        </p>
      </div>

      {/* Embedded CSS */}
      <style>{`
        .register-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to right, #34d399, #3b82f6, #8b5cf6);
          font-family: "Segoe UI", sans-serif;
        }
        .register-card {
          background: #fff;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          border-radius: 16px;
          padding: 40px;
          width: 100%;
          max-width: 400px;
        }
        .register-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .register-header h2 {
          font-size: 26px;
          font-weight: bold;
          color: #333;
          margin-bottom: 6px;
        }
        .register-header p {
          color: #666;
          font-size: 14px;
        }
        .register-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .register-input {
          padding: 12px 14px;
          border: 1px solid #ccc;
          border-radius: 10px;
          font-size: 15px;
          transition: 0.2s;
        }
        .register-input:focus {
          border-color: #34d399;
          outline: none;
          box-shadow: 0 0 0 2px rgba(52,211,153,0.2);
        }
        .register-button {
          background: #10b981;
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
        .register-button:hover {
          background: #059669;
        }
        .register-footer {
          text-align: center;
          font-size: 14px;
          margin-top: 20px;
          color: #666;
        }
        .register-footer a {
          color: #10b981;
          font-weight: 600;
          text-decoration: none;
        }
        .register-footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Register;
