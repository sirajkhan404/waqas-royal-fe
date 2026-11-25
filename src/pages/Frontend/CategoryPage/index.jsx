import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { InboxOutlined, SearchOutlined, ShoppingOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import { ROYAL_CATEGORIES, matchesRoyalCategory } from "@/config/categories";

/**
 * Dedicated page for a single Waqas Royal product category
 * (Sport Wear, Fashion Wear, or Gym Wear).
 */
const CategoryPage = ({ categoryKey }) => {
    const category = ROYAL_CATEGORIES.find((c) => c.key === categoryKey) || ROYAL_CATEGORIES[0];
    const { addToCart } = useCart();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [addedId, setAddedId] = useState(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setSearchQuery("");
    }, [categoryKey]);

    useEffect(() => {
        let active = true;
        (async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${window.api}/api/products/public-all`);
                if (active) {
                    setProducts(data.products || []);
                }
            } catch (err) {
                console.error(err);
                if (window.toastify) window.toastify("Failed to load products", "error");
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => {
            active = false;
        };
    }, []);

    const handleAdd = (p) => {
        if (p.stock <= 0) return;
        addToCart(p);
        setAddedId(p.id || p._id);
        if (window.toastify) window.toastify(`${p.name} added to cart`, "success");
        setTimeout(() => setAddedId(null), 1600);
    };

    const categoryProducts = products.filter((p) => matchesRoyalCategory(p, category));
    const filteredProducts = categoryProducts.filter((p) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            p.name?.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q)
        );
    });

    return (
        <main className="d-flex flex-column flex-grow-1" style={{ minHeight: "100vh", fontFamily: "'Inter', sans-serif", background: "#F7F7F5" }}>
            {/* ── Category Hero Banner ── */}
            <section
                className="text-white position-relative overflow-hidden py-5"
                style={{ background: category.bannerBg }}
            >
                <div className="container position-relative py-3" style={{ zIndex: 1 }}>
                    <div className="row align-items-center g-4">
                        <div className="col-12 col-lg-8">
                            <span
                                className="badge rounded-pill px-3 py-2 mb-3 fw-bold"
                                style={{
                                    background: "rgba(255,255,255,0.15)",
                                    border: "1px solid rgba(255,255,255,0.25)",
                                    fontSize: "11.5px",
                                    letterSpacing: "1px",
                                }}
                            >
                                <ShoppingOutlined className="me-1" /> WAQAS ROYAL · {category.badge}
                            </span>
                            <h1 className="display-4 fw-black mb-3" style={{ fontWeight: 900, letterSpacing: "-1px" }}>
                                {category.name}
                            </h1>
                            <p className="lead opacity-85 mb-2 fw-semibold" style={{ fontSize: "1.05rem" }}>
                                {category.tagline}
                            </p>
                            <p className="opacity-75 mb-0" style={{ maxWidth: "620px", fontSize: "14.5px", lineHeight: 1.7 }}>
                                {category.description}
                            </p>
                        </div>

                        <div className="col-12 col-lg-4 d-flex justify-content-lg-end">
                            <div
                                className="rounded-4 overflow-hidden shadow-lg border border-white border-opacity-25 bg-white p-2"
                                style={{ width: "210px", height: "210px" }}
                            >
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-100 h-100 rounded-3"
                                    style={{ objectFit: "contain", background: "#f8fafc" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Category Navigation + Search ── */}
            <section className="container px-3 px-md-4 position-relative" style={{ marginTop: "-28px", zIndex: 10 }}>
                <div className="card bg-white border border-light-subtle rounded-4 p-3 p-md-4 shadow-sm">
                    <div className="row align-items-center g-3">
                        <div className="col-12 col-lg-5">
                            <div className="position-relative">
                                <SearchOutlined
                                    className="position-absolute top-50 translate-middle-y text-muted ms-3"
                                    style={{ zIndex: 2, fontSize: 16 }}
                                />
                                <input
                                    type="text"
                                    className="form-control bg-light border-light-subtle ps-5 rounded-3 py-2"
                                    placeholder={`Search inside ${category.name}...`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-lg-7">
                            <div className="d-flex flex-wrap gap-2 justify-content-lg-end">
                                {ROYAL_CATEGORIES.map((c) => {
                                    const isCurrent = c.key === category.key;
                                    return (
                                        <Link
                                            key={c.key}
                                            to={c.path}
                                            className={`btn rounded-pill px-3 py-2 fw-semibold text-decoration-none ${
                                                isCurrent ? "text-white shadow-sm" : "btn-outline-secondary bg-white text-dark"
                                            }`}
                                            style={{
                                                fontSize: "13.5px",
                                                background: isCurrent ? c.badgeBg : undefined,
                                                border: isCurrent ? "none" : "1px solid #e2e8f0",
                                            }}
                                        >
                                            {c.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Products Grid (Only this category) ── */}
            <section className="py-5 flex-grow-1">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="fw-bold mb-0" style={{ color: "#042f2e" }}>
                            {category.name} Collection ({filteredProducts.length})
                        </h4>
                        <span className="text-muted small fw-semibold">Worldwide Export & Retail</span>
                    </div>

                    {loading ? (
                        <div className="text-center py-5 my-4">
                            <div
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: "50%",
                                    border: "4px solid #ccfbf1",
                                    borderTopColor: category.accentColor,
                                    animation: "spin 0.8s linear infinite",
                                    margin: "0 auto 14px",
                                }}
                            />
                            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                            <span className="text-muted fw-semibold">Loading {category.name} products...</span>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="text-center py-5 bg-white rounded-4 border p-5 shadow-sm mx-auto" style={{ maxWidth: "560px" }}>
                            <div className="display-3 mb-3 text-muted">
                                <InboxOutlined />
                            </div>
                            <h4 className="fw-bold text-dark">No {category.name} products found</h4>
                            <p className="text-muted mb-4">
                                {searchQuery
                                    ? "Try clearing your search filter."
                                    : `Products added under "${category.name}" from the Dashboard will appear here automatically.`}
                            </p>
                            {searchQuery && (
                                <button
                                    className="btn rounded-pill px-4 py-2 fw-semibold text-white border-0"
                                    style={{ background: category.badgeBg }}
                                    onClick={() => setSearchQuery("")}
                                >
                                    Clear Search
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="row g-2 g-sm-3 g-md-4">
                            {filteredProducts.map((product) => (
                                <div className="col-6 col-md-4 col-lg-3" key={product._id || product.id}>
                                    <ProductCard
                                        product={product}
                                        addedId={addedId}
                                        onAdd={handleAdd}
                                        accentColor={category.accentColor}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── Export Bulk Inquiry Banner ── */}
            <section className="pb-5">
                <div className="container">
                    <div
                        className="rounded-4 p-4 p-md-5 text-white d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4"
                        style={{ background: "linear-gradient(135deg, #525E46 0%, #6E7D60 100%)" }}
                    >
                        <div>
                            <span className="badge fw-bold rounded-pill mb-2 px-3 py-1" style={{ background: "rgba(255,255,255,0.18)", color: "#FFFFFF" }}>
                                EXPORT &amp; OEM MANUFACTURING
                            </span>
                            <h3 className="fw-bold mb-1">Need Custom Branding or Bulk {category.name} Orders?</h3>
                            <p className="mb-0 opacity-85" style={{ fontSize: "14px" }}>
                                Waqas Royal manufactures custom sizes, private-label logos, and bulk export shipments worldwide.
                            </p>
                        </div>
                        <Link
                            to="/contact"
                            className="btn btn-lg rounded-pill fw-semibold px-4 flex-shrink-0"
                            style={{
                                background: "#141414",
                                color: "#FFFFFF",
                                border: "none",
                            }}
                        >
                            Request Export Quote <ArrowRightOutlined />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CategoryPage;

