import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ContactSection from "./ContactSection";
import ServiceSection from "./ServiceSection";
import StoriesBar from "../../../components/Stories/StoriesBar";
import HeroCarousel from "./HeroCarousel";
import ProductCard from "../../../components/ProductCard";
import ExportWorldMap from "./ExportWorldMap";
import CustomProductionSection from "./CustomProductionSection";
import QualityExportSection from "./QualityExportSection";
import { ROYAL_CATEGORIES, matchesRoyalCategory } from "../../../config/categories";
import { useCart } from "../../../context/CartContext";
import {
    SmileOutlined,
    InboxOutlined,
    StarFilled,
    CustomerServiceOutlined,
    RocketOutlined,
    ShoppingOutlined,
    ArrowRightOutlined
} from '@ant-design/icons';

/* ── Editorial Design Tokens (Sage Olive + Charcoal + Warm Stone) ── */
const T = {
    sage: "#6E7D60",
    sageDark: "#525E46",
    sageSoft: "#EAEDE6",
    ink: "#141414",
    inkSoft: "#2C2E29",
    canvas: "#F7F7F5",
    surface: "#FFFFFF",
    surfaceMuted: "#F3F3F0",
    muted: "#6A6A64",
    border: "#E5E5E0",
};

/* ── FadeIn helper ──────────────────────────────────── */
const FadeIn = ({ children, delay = 0, from = "up" }) => {
    const [v, setV] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 });
        if (ref.current) o.observe(ref.current);
        return () => o.disconnect();
    }, []);
    const t = from === "up" ? "translateY(24px)" : from === "left" ? "translateX(-24px)" : "translateX(24px)";
    return (
        <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : t, transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s` }}>
            {children}
        </div>
    );
};

/* ── Home Page ──────────────────────────────────────── */
const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addedId, setAddedId] = useState(null);
    const { addToCart } = useCart();

    const handleAdd = (p) => {
        if (p.stock <= 0) return;
        addToCart(p);
        setAddedId(p.id || p._id);
        if (window.toastify) window.toastify(`${p.name} added to cart`, "success");
        setTimeout(() => setAddedId(null), 1600);
    };

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${window.api}/api/products/public-all`);
                setProducts(data.products || []);
            } catch (e) { console.error(e); }
            finally { setLoading(false); }
        })();
    }, []);

    const stats = [
        { v: "30+", l: "Export Countries", icon: <RocketOutlined style={{ color: "#DCE3D5" }} /> },
        { v: "10K+", l: "Global Clients", icon: <SmileOutlined style={{ color: "#DCE3D5" }} /> },
        { v: "99%", l: "Quality Approval", icon: <StarFilled style={{ color: "#DCE3D5" }} /> },
        { v: "24/7", l: "Export Desk", icon: <CustomerServiceOutlined style={{ color: "#DCE3D5" }} /> },
    ];

    return (
        <main style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: T.surface }}>

            {/* ══ EDITORIAL HERO CANVAS ════════════════════════════════ */}
            <section style={{ background: T.surface, padding: "24px 0 36px" }}>
                <div className="container">
                    <div
                        style={{
                            background: `linear-gradient(135deg, ${T.sage} 0%, ${T.sageDark} 100%)`,
                            borderRadius: "28px",
                            padding: "48px 36px",
                            position: "relative",
                            overflow: "hidden",
                            border: "1px solid rgba(20, 20, 20, 0.08)",
                        }}
                    >
                        <div className="row align-items-center g-4 g-lg-5">
                            {/* Left Editorial Copy */}
                            <div className="col-12 col-lg-6">
                                <div
                                    className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-4"
                                    style={{
                                        background: "rgba(255, 255, 255, 0.16)",
                                        border: "1px solid rgba(255, 255, 255, 0.25)",
                                    }}
                                >
                                    <span
                                        style={{
                                            width: "7px",
                                            height: "7px",
                                            borderRadius: "50%",
                                            background: "#FFFFFF",
                                            display: "inline-block",
                                        }}
                                    />
                                    <span style={{ color: "#FFFFFF", fontSize: "12px", fontWeight: 600, letterSpacing: "0.6px" }}>
                                        WAQAS ROYAL · EXPORT APPAREL
                                    </span>
                                </div>

                                <h1
                                    style={{
                                        fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)",
                                        fontWeight: 800,
                                        color: "#FFFFFF",
                                        lineHeight: 1.12,
                                        letterSpacing: "-1.2px",
                                        marginBottom: "1.25rem",
                                    }}
                                >
                                    Crafted for Sport, Fashion &amp; Performance.
                                </h1>

                                <p
                                    style={{
                                        color: "rgba(255, 255, 255, 0.86)",
                                        fontSize: "16px",
                                        lineHeight: 1.7,
                                        maxWidth: "480px",
                                        marginBottom: "2rem",
                                    }}
                                >
                                    Direct manufacturer and global exporter of Sport Wear, Fashion Wear, and Gym Wear. Engineered for international retail and custom bulk orders.
                                </p>

                                <div className="d-flex flex-wrap gap-3 mb-4">
                                    <Link
                                        to="/sport-wear"
                                        className="btn btn-lg rounded-pill fw-semibold px-4"
                                        style={{
                                            background: T.ink,
                                            color: "#FFFFFF",
                                            border: "none",
                                            fontSize: "14.5px",
                                            padding: "12px 28px",
                                        }}
                                    >
                                        Explore Collection <ArrowRightOutlined className="ms-1" />
                                    </Link>
                                    <Link
                                        to="/contact"
                                        className="btn btn-lg rounded-pill fw-semibold px-4"
                                        style={{
                                            background: "rgba(255, 255, 255, 0.14)",
                                            border: "1px solid rgba(255, 255, 255, 0.35)",
                                            color: "#FFFFFF",
                                            fontSize: "14.5px",
                                            padding: "12px 24px",
                                        }}
                                    >
                                        Export Inquiry
                                    </Link>
                                </div>

                                <div className="d-flex flex-wrap gap-4 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.18)" }}>
                                    {[
                                        { v: "30+", l: "Export Countries" },
                                        { v: "10K+", l: "Clients Served" },
                                        { v: "4.9 ★", l: "Quality Score" }
                                    ].map((item, i) => (
                                        <div key={i}>
                                            <div style={{ fontWeight: 800, fontSize: "1.4rem", color: "#FFFFFF" }}>{item.v}</div>
                                            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "12.5px" }}>{item.l}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right – 3D Product Carousel */}
                            <div className="col-12 col-lg-6 d-flex justify-content-center">
                                <HeroCarousel />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ STORIES BAR ════════════════════════════════ */}
            <StoriesBar />

            {/* ══ EXPORT DIVISIONS OVERVIEW (3 EDITORIAL CARDS) ═════════ */}
            <section style={{ background: T.canvas, padding: "60px 0 44px" }}>
                <div className="container">
                    <FadeIn>
                        <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4">
                            <div>
                                <span
                                    style={{
                                        color: T.sageDark,
                                        fontSize: 11.5,
                                        fontWeight: 700,
                                        letterSpacing: "1.4px",
                                        textTransform: "uppercase",
                                        display: "block",
                                        marginBottom: 6,
                                    }}
                                >
                                    Waqas Royal Divisions
                                </span>
                                <h2 style={{ fontWeight: 800, color: T.ink, fontSize: "2rem", marginBottom: 4, letterSpacing: "-0.5px" }}>
                                    Explore Our Collections
                                </h2>
                                <p style={{ color: T.muted, fontSize: 14.5, margin: 0 }}>
                                    Dedicated apparel lines manufactured for global export standards.
                                </p>
                            </div>
                            <Link
                                to="/sport-wear"
                                className="btn rounded-pill fw-semibold px-4"
                                style={{ border: `1px solid ${T.ink}`, color: T.ink, fontSize: 13.5, background: T.surface }}
                            >
                                Explore Sport Wear →
                            </Link>
                        </div>
                    </FadeIn>

                    <div className="row g-4">
                        {ROYAL_CATEGORIES.map((cat, idx) => (
                            <div key={cat.key} className="col-12 col-md-4">
                                <FadeIn delay={idx * 0.06}>
                                    <Link to={cat.path} className="text-decoration-none">
                                        <div
                                            className="overflow-hidden bg-white h-100 d-flex flex-column align-items-center text-center p-4"
                                            style={{
                                                borderRadius: "28px",
                                                border: `1px solid ${T.border}`,
                                                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                                                boxShadow: "0 4px 16px rgba(20,20,20,0.04)",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "translateY(-6px)";
                                                e.currentTarget.style.boxShadow = "0 18px 36px rgba(20,20,20,0.08)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "none";
                                                e.currentTarget.style.boxShadow = "0 4px 16px rgba(20,20,20,0.04)";
                                            }}
                                        >
                                            {/* 50% Circular Image Frame with Gold & Dark Concentric Rings */}
                                            <div className="my-3 position-relative d-flex align-items-center justify-content-center">
                                                <div
                                                    style={{
                                                        width: 200,
                                                        height: 200,
                                                        borderRadius: "50%",
                                                        padding: "5px",
                                                        background: "#FFFFFF",
                                                        boxShadow: "0 0 0 4px #141414, 0 0 0 8px #C5A059, 0 0 0 12px #141414, 0 12px 28px rgba(0,0,0,0.12)",
                                                        overflow: "hidden",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        transition: "transform 0.3s ease",
                                                    }}
                                                >
                                                    <img
                                                        src={cat.image}
                                                        alt={cat.name}
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            borderRadius: "50%",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="pt-2 d-flex flex-column flex-grow-1 align-items-center">
                                                <span
                                                    className="mb-2"
                                                    style={{
                                                        background: T.surfaceMuted,
                                                        color: T.ink,
                                                        border: `1px solid ${T.border}`,
                                                        fontSize: "10.5px",
                                                        fontWeight: 700,
                                                        padding: "4px 12px",
                                                        borderRadius: "999px",
                                                        letterSpacing: "0.6px",
                                                        textTransform: "uppercase",
                                                    }}
                                                >
                                                    {cat.badge}
                                                </span>
                                                <h4 style={{ fontWeight: 800, color: T.ink, marginBottom: 6, fontSize: "1.25rem" }}>
                                                    {cat.name}
                                                </h4>
                                                <p style={{ color: T.muted, fontSize: 13.5, marginBottom: 18, flexGrow: 1, maxWidth: 280 }}>
                                                    {cat.tagline}
                                                </p>
                                                <span
                                                    className="btn btn-sm rounded-pill fw-semibold px-4"
                                                    style={{
                                                        background: T.sageDark,
                                                        color: "#FFFFFF",
                                                        fontSize: 13,
                                                        padding: "8px 22px",
                                                        border: "none",
                                                        transition: "background 0.2s ease",
                                                    }}
                                                >
                                                    Shop {cat.name} →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </FadeIn>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ DEDICATED PRODUCT SECTIONS (SPORT WEAR, FASHION WEAR, GYM WEAR) ══ */}
            {ROYAL_CATEGORIES.map((cat, sectionIdx) => {
                const sectionProducts = products.filter((p) => matchesRoyalCategory(p, cat)).slice(0, 4);
                const isEven = sectionIdx % 2 === 0;

                return (
                    <section
                        key={cat.key}
                        id={cat.key}
                        style={{
                            background: isEven ? T.surface : T.canvas,
                            padding: "60px 0",
                            borderTop: `1px solid ${T.border}`,
                        }}
                    >
                        <div className="container">
                            <FadeIn>
                                <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4">
                                    <div>
                                        <span
                                            style={{
                                                background: T.sageSoft,
                                                color: T.sageDark,
                                                fontSize: 11,
                                                fontWeight: 700,
                                                letterSpacing: "1.2px",
                                                textTransform: "uppercase",
                                                padding: "5px 14px",
                                                borderRadius: 999,
                                                display: "inline-block",
                                                marginBottom: 10,
                                            }}
                                        >
                                            {cat.badge}
                                        </span>
                                        <h2 style={{ fontWeight: 800, color: T.ink, fontSize: "1.9rem", marginBottom: 4, letterSpacing: "-0.4px" }}>
                                            {cat.name}
                                        </h2>
                                        <p style={{ color: T.muted, fontSize: 14, margin: 0 }}>{cat.tagline}</p>
                                    </div>
                                    <Link
                                        to={cat.path}
                                        className="btn rounded-pill fw-semibold px-4 py-2 text-white border-0"
                                        style={{ background: T.ink, fontSize: 13.5 }}
                                    >
                                        View All {cat.name} →
                                    </Link>
                                </div>
                            </FadeIn>

                            {loading ? (
                                <div className="text-center py-5">
                                    <div
                                        style={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: "50%",
                                            border: `3px solid ${T.sageSoft}`,
                                            borderTopColor: T.sageDark,
                                            animation: "spin 0.8s linear infinite",
                                            margin: "0 auto 14px",
                                        }}
                                    />
                                    <span style={{ color: T.muted, fontWeight: 600 }}>Loading {cat.name}...</span>
                                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                                </div>
                            ) : sectionProducts.length === 0 ? (
                                <div className="text-center py-5 rounded-4 bg-white" style={{ border: `1px solid ${T.border}` }}>
                                    <div style={{ fontSize: "2.8rem", color: T.sage }}>
                                        <InboxOutlined />
                                    </div>
                                    <h5 style={{ color: T.ink, marginTop: 12 }}>No {cat.name} products added yet</h5>
                                    <p style={{ color: T.muted, fontSize: 13, marginBottom: 0 }}>
                                        Add products with category &ldquo;{cat.name}&rdquo; from the Dashboard to display them here.
                                    </p>
                                </div>
                            ) : (
                                <div className="row g-4">
                                    {sectionProducts.map((p, i) => (
                                        <div key={p._id || p.id} className="col-12 col-sm-6 col-md-4 col-xl-3">
                                            <FadeIn delay={i * 0.05}>
                                                <ProductCard
                                                    product={p}
                                                    addedId={addedId}
                                                    onAdd={handleAdd}
                                                />
                                            </FadeIn>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                );
            })}

            {/* ══ CUSTOM OEM PRODUCTION ══════════════════════ */}
            <CustomProductionSection />

            {/* ══ QUALITY & EXPORT SECTION ═════════════════════ */}
            <QualityExportSection />

            {/* ══ STATS BANNER ════════════════════════════════ */}
            <section style={{ background: T.inkSoft, padding: "56px 0", borderTop: `1px solid ${T.border}` }}>
                <div className="container">
                    <div className="row g-4 text-center">
                        {stats.map((s, i) => (
                            <div key={i} className="col-6 col-md-3">
                                <FadeIn delay={i * 0.06}>
                                    <div
                                        style={{
                                            padding: "26px 18px",
                                            borderRadius: 18,
                                            background: "rgba(255,255,255,0.04)",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                        }}
                                    >
                                        <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{s.icon}</div>
                                        <div style={{ fontWeight: 800, fontSize: "1.9rem", color: "#FFFFFF", marginBottom: 4 }}>{s.v}</div>
                                        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, fontWeight: 500 }}>{s.l}</div>
                                    </div>
                                </FadeIn>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ WORLDWIDE EXPORT MAP ═════════════════════════ */}
            <ExportWorldMap />

            {/* ══ SERVICES ════════════════════════════════════ */}
            <ServiceSection />

            {/* ══ CTA ═════════════════════════════════════════ */}
            <section style={{ background: T.surface, padding: "56px 0", borderTop: `1px solid ${T.border}` }}>
                <div className="container">
                    <FadeIn>
                        <div
                            style={{
                                borderRadius: 24,
                                padding: "56px 36px",
                                textAlign: "center",
                                background: `linear-gradient(135deg, ${T.sageDark} 0%, ${T.sage} 100%)`,
                                border: "1px solid rgba(20,20,20,0.08)",
                            }}
                        >
                            <ShoppingOutlined style={{ fontSize: "2.5rem", color: "#FFFFFF" }} />
                            <h2 style={{ fontWeight: 800, color: "#FFFFFF", fontSize: "2.1rem", marginTop: 16, marginBottom: 12, letterSpacing: "-0.5px" }}>
                                Ready to Order from Waqas Royal?
                            </h2>
                            <p style={{ color: "rgba(255,255,255,0.85)", maxWidth: 500, margin: "0 auto 28px", fontSize: 15.5, lineHeight: 1.7 }}>
                                Browse our Sport Wear, Fashion Wear, and Gym Wear collections or contact us for custom wholesale export shipments.
                            </p>
                            <Link
                                to="/sport-wear"
                                className="btn btn-lg rounded-pill fw-semibold px-5"
                                style={{
                                    background: T.ink,
                                    color: "#FFFFFF",
                                    border: "none",
                                    fontSize: 15,
                                    padding: "12px 32px",
                                }}
                            >
                                Shop Sport Wear →
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ══ CONTACT ═════════════════════════════════════ */}
            <ContactSection />

        </main>
    );
};

export default Home;
