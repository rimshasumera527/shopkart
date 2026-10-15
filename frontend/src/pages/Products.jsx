import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { getProducts, getWishlist } from "../services/api.js";

const DEBOUNCE_MS = 400;

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [products, setProducts] = useState([]);
  const [savedIds, setSavedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const prevSearch = useRef(search);
  const debounceTimer = useRef(null);

  // Fetch wishlist once on mount so ProductCards know their initial saved state
  useEffect(() => {
    getWishlist()
      .then((data) => setSavedIds(new Set(data.wishlist.map((p) => p._id))))
      .catch(() => {}); // Non-critical
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const params = {};
        if (search.trim()) params.search = search.trim();
        if (category) params.category = category;
        if (sort) params.sort = sort;

        const data = await getProducts(params);
        setProducts(data.products);
      } catch (requestError) {
        setError("Something went wrong while loading products.");
      } finally {
        setLoading(false);
      }
    };

    const searchChanged = prevSearch.current !== search;
    prevSearch.current = search;
    const delay = searchChanged ? DEBOUNCE_MS : 0;

    const timer = setTimeout(fetchProducts, delay);
    return () => clearTimeout(timer);
  }, [search, category, sort]);

  return (
    <main className="products-page">
      <Navbar wishlistCount={savedIds.size} />

      <section className="products-content">
        <div className="products-head">
          <p className="eyebrow">ShopKart Catalogue</p>
          <h1>Discover Products</h1>
          <p className="products-note">
            Browse our full catalogue — search by name or filter by category and price.
          </p>
        </div>

        <SearchBar
          search={search}
          category={category}
          sort={sort}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onSortChange={setSort}
        />

        {loading && (
          <div className="state-box">
            <div className="spinner" aria-label="Loading" />
            <p className="state-title">Loading products…</p>
          </div>
        )}

        {!loading && error && (
          <div className="state-box state-error">
            <p className="state-icon">⚠️</p>
            <p className="state-title">Something went wrong.</p>
            <p className="state-note">{error}</p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="state-box">
            <p className="state-icon">🔍</p>
            <p className="state-title">No products found.</p>
            <p className="state-note">Try a different search term or category.</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <>
            <p className="result-count">
              Showing {products.length} {products.length === 1 ? "product" : "products"}
            </p>
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  initialSaved={savedIds.has(product._id)}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Products;
