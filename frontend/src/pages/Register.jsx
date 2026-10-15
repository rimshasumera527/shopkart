import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";

const Register = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: ""
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const validate = () => {
    if (!form.fullName || !form.email || !form.password || !form.phone) {
      return "Please fill in all fields.";
    }

    if (form.password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = validate();
    setError(message);

    if (message) {
      return;
    }

    setSaving(true);

    try {
      await api.post("/customers/register", form);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="page">
      <section className="auth-box">
        <div className="auth-head">
          <p className="auth-logo">🛍️</p>
          <h1>Create account</h1>
          <p>Join ShopKart and start shopping today.</p>
        </div>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Jane Doe"
              autoComplete="name"
            />
          </label>

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
              placeholder="At least 6 characters"
              autoComplete="new-password"
            />
          </label>

          <label>
            Phone Number
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="9876543210"
              autoComplete="tel"
            />
          </label>

          <button className="main-button" disabled={saving}>
            {saving ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p className="switch-text">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
};

export default Register;
