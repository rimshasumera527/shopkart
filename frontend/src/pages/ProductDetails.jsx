import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { getProductById } from "../services/api.js";

const formatPrice = (price) =>
  `₹${Number(price).toLocaleString("en-IN")}`;

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getProductById(id);
        setProduct(data.product);
      } catch (requestError) {
        const status = requestError.response?.status;
        const message =
          requestError.response?.data?.message ||
          (status === 404
            ? "Product not found."
            : "Something went wrong while loading the product.");
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const inStock = product && product.stock > 0;

  return (
    <main className="products-page">
      <Navbar />

      <section className="details-content">
        <button className="back-link" onClick={() => navigate("/products")}>
          ← Back to Products
        </button>

        {loading && (
          <div className="state-box">
            <div className="spinner" aria-label="Loading" />
            <p className="state-title">Loading product…</p>
          </div>
        )}

        {!loading && error && (
          <div className="state-box state-error">
            <p className="state-icon">⚠️</p>
            <p className="state-title">{error}</p>
            <Link className="main-button card-button" to="/products">
              Browse Products
            </Link>
          </div>
        )}

        {!loading && !error && product && (
          <div className="details-card">
            <div className="details-image-wrap">
              <img
                className="details-image"
                src={product.image}
                alt={product.name}
              />
            </div>

            <div className="details-info">
              <span className="product-category">{product.category}</span>
              <h1 className="details-name">{product.name}</h1>
              <p className="details-price">{formatPrice(product.price)}</p>

              <span className={`stock-badge-inline ${inStock ? "in-stock" : "out-of-stock"}`}>
                {inStock ? `✓ ${product.stock} units in stock` : "✕ Out of stock"}
              </span>

              <h2 className="details-subhead">About this product</h2>
              <p className="details-description">{product.description}</p>

              <button className="main-button" disabled={!inStock}>
                {inStock ? "🛒 Add to Cart" : "Out of Stock"}
              </button>
              {inStock && (
                <p className="cart-note">Free delivery on orders over ₹500</p>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default ProductDetails;
