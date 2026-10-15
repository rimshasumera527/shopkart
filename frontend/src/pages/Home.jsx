import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Home = () => {
  const { customer } = useAuth();

  const initials = customer?.fullName
    ? customer.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <main className="home-page">
      <Navbar />

      {/* Hero */}
      <div className="home-hero">
        <p className="home-hero-eyebrow">Welcome back 👋</p>
        <h1>Hello, {customer.fullName.split(" ")[0]}!</h1>
        <p>Discover thousands of products curated just for you. Shop smarter, faster.</p>
        <div className="home-hero-actions">
          <Link className="home-cta" to="/products">
            Shop Now →
          </Link>
        </div>
      </div>

      {/* Profile */}
      <section className="home-content">
        <div className="profile-box">
          <div className="profile-box-header">
            <div className="profile-avatar">{initials}</div>
            <div>
              <h2 className="profile-name">{customer.fullName}</h2>
              <p className="profile-role">Customer Account</p>
            </div>
          </div>
          <div className="profile-row">
            <span>Full Name</span>
            <strong>{customer.fullName}</strong>
          </div>
          <div className="profile-row">
            <span>Email Address</span>
            <strong>{customer.email}</strong>
          </div>
          <div className="profile-row">
            <span>Phone Number</span>
            <strong>{customer.phone}</strong>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
