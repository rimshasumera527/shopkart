import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const { setCustomer } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    setSaving(true);

    try {
      const response = await api.post("/customers/login", form);
      setCustomer(response.data.customer);
      navigate("/home");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="page">
      <section className="auth-box">
        <div className="auth-head">
          <p className="auth-logo">🛍️</p>
          <h1>Welcome back</h1>
          <p>Sign in to continue shopping with ShopKart.</p>
        </div>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Email address
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </label>

          <button className="main-button" disabled={saving}>
            {saving ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="switch-text">
          New to ShopKart? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
