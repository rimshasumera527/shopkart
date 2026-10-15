import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const QUICK_LINKS = [
  { to: "/products",  icon: "🛍️", label: "Browse Products",  desc: "Explore our full catalogue" },
  { to: "/wishlist",  icon: "❤️", label: "My Wishlist",      desc: "Products you've saved" },
  { to: "/cart",      icon: "🛒", label: "My Cart",          desc: "Items ready to checkout" },
  { to: "/orders",    icon: "📦", label: "My Orders",        desc: "Track your purchases" },
];

const FEATURES = [
  { icon: "⚡", title: "Fast Delivery",     desc: "Same-day dispatch on in-stock items" },
  { icon: "🔒", title: "Secure Payments",   desc: "Powered by Razorpay — 256-bit encrypted" },
  { icon: "↩️",  title: "Easy Returns",     desc: "Hassle-free 7-day return policy" },
  { icon: "🎧", title: "24/7 Support",      desc: "Our team is always here to help" },
];

const Home = () => {
  const { customer } = useAuth();

  const initials = customer?.fullName
    ? customer.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const firstName = customer?.fullName?.split(" ")[0] || "there";

  return (
    <main className="home-page">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="home-hero">
        <div className="home-hero-inner">
          <p className="home-hero-eyebrow">Welcome back 👋</p>
          <h1 className="home-hero-title">
            Hello, <span className="home-hero-name">{firstName}!</span>
          </h1>
          <p className="home-hero-subtitle">
            Discover thousands of products. Shop smarter, faster, and better — all in one place.
          </p>
          <div className="home-hero-actions">
            <Link className="hero-cta-primary" to="/products">
              Shop Now →
            </Link>
            <Link className="hero-cta-secondary" to="/orders">
              Track Orders
            </Link>
          </div>

          {/* Floating badges */}
          <div className="hero-badges">
            <span className="hero-badge">🚀 Fast Shipping</span>
            <span className="hero-badge">✅ Secure Checkout</span>
            <span className="hero-badge">🎁 Best Prices</span>
          </div>
        </div>
      </section>

      {/* ── Quick Links ───────────────────────────────────── */}
      <section className="home-section">
        <div className="home-section-inner">
          <p className="eyebrow">Quick Access</p>
          <h2 className="home-section-title">What would you like to do?</h2>
          <div className="quick-links-grid">
            {QUICK_LINKS.map((link) => (
              <Link key={link.to} className="quick-link-card" to={link.to}>
                <span className="quick-link-icon">{link.icon}</span>
                <span className="quick-link-label">{link.label}</span>
                <span className="quick-link-desc">{link.desc}</span>
                <span className="quick-link-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Profile ───────────────────────────────────────── */}
      <section className="home-section home-section--alt">
        <div className="home-section-inner home-profile-layout">
          {/* Left: Profile card */}
          <div className="profile-box">
            <div className="profile-box-header">
              <div className="profile-avatar">{initials}</div>
              <div>
                <h2 className="profile-name">{customer.fullName}</h2>
                <p className="profile-role">ShopKart Customer</p>
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

          {/* Right: Why ShopKart */}
          <div className="features-list">
            <p className="eyebrow">Why ShopKart</p>
            <h2 className="home-section-title">Built for your convenience</h2>
            <div className="features-grid">
              {FEATURES.map((f) => (
                <div key={f.title} className="feature-item">
                  <span className="feature-icon">{f.icon}</span>
                  <div>
                    <p className="feature-title">{f.title}</p>
                    <p className="feature-desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="home-footer">
        <p>© 2024 ShopKart. Made with ❤️ using React &amp; Node.js.</p>
      </footer>
    </main>
  );
};

export default Home;
