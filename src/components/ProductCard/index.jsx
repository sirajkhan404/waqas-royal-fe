import React, { useState } from "react";
import { CheckOutlined, ShoppingCartOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useFavorites } from "../../context/FavoritesContext";

const T = {
    ink: "#141414",
    sage: "#6E7D60",
    sageDark: "#525E46",
    surfaceMuted: "#F3F3F0",
    card: "#FFFFFF",
    muted: "#6A6A64",
    border: "#E5E5E0",
};

/**
 * Minimalist editorial product card matching the Figma E-Commerce UI Kit aesthetic.
 */
const ProductCard = ({ product, addedId, onAdd }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const [hov, setHov] = useState(false);
    const added = addedId === (product.id || product._id);
    const oos = product.stock <= 0;
    const prodId = product.id || product._id;
    const isFav = isFavorite(prodId);

    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                borderRadius: "18px",
                overflow: "hidden",
                background: T.card,
                boxShadow: hov ? "0 14px 32px rgba(20, 20, 20, 0.08)" : "0 2px 10px rgba(20, 20, 20, 0.03)",
                transform: hov ? "translateY(-4px)" : "none",
                transition: "all 0.25s ease",
                border: hov ? `1px solid ${T.sage}` : `1px solid ${T.border}`,
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Image Frame */}
            <div style={{ height: "clamp(165px, 45vw, 235px)", overflow: "hidden", position: "relative", background: T.surfaceMuted }}>
                <img
                    src={product.imageURL || "https://via.placeholder.com/300"}
                    alt={product.name}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transform: hov ? "scale(1.04)" : "scale(1)",
                        transition: "transform 0.45s ease",
                    }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/300?text=No+Image";
                    }}
                />
                {product.category && (
                    <span
                        className="d-none d-sm-inline-block text-truncate"
                        style={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            maxWidth: "48%",
                            background: "rgba(255, 255, 255, 0.94)",
                            color: T.ink,
                            fontSize: "10px",
                            padding: "3px 8px",
                            borderRadius: "999px",
                            fontWeight: 600,
                            border: `1px solid ${T.border}`,
                        }}
                    >
                        {product.category}
                    </span>
                )}
                {oos ? (
                    <span
                        style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            background: "#DC2626",
                            color: "#fff",
                            fontSize: "9.5px",
                            padding: "3px 8px",
                            borderRadius: "999px",
                            fontWeight: 700,
                        }}
                    >
                        Out of Stock
                    </span>
                ) : product.stock <= 5 ? (
                    <span
                        style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            background: "#141414",
                            color: "#fff",
                            fontSize: "9.5px",
                            padding: "3px 8px",
                            borderRadius: "999px",
                            fontWeight: 600,
                        }}
                    >
                        Only {product.stock} left
                    </span>
                ) : (
                    <span
                        style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            background: "#EAEDE6",
                            color: T.sageDark,
                            fontSize: "9.5px",
                            padding: "3px 8px",
                            borderRadius: "999px",
                            fontWeight: 700,
                            border: "1px solid rgba(82,94,70,0.18)",
                        }}
                    >
                        Export Ready
                    </span>
                )}

                {/* Floating Favorite Button */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(product);
                    }}
                    aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                    title={isFav ? "Remove from favorites" : "Add to favorites"}
                    style={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                        background: isFav ? "#FFFFFF" : "rgba(255, 255, 255, 0.92)",
                        backdropFilter: "blur(6px)",
                        WebkitBackdropFilter: "blur(6px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontSize: "15px",
                        color: isFav ? "#EF4444" : "#4B5563",
                        boxShadow: isFav
                            ? "0 4px 12px rgba(239, 68, 68, 0.25)"
                            : "0 2px 8px rgba(0, 0, 0, 0.12)",
                        transition: "all 0.22s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        transform: isFav ? "scale(1.08)" : "scale(1)",
                        zIndex: 3,
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.18)";
                        e.currentTarget.style.boxShadow = "0 6px 16px rgba(239, 68, 68, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = isFav ? "scale(1.08)" : "scale(1)";
                        e.currentTarget.style.boxShadow = isFav
                            ? "0 4px 12px rgba(239, 68, 68, 0.25)"
                            : "0 2px 8px rgba(0, 0, 0, 0.12)";
                    }}
                >
                    {isFav ? <HeartFilled style={{ color: "#EF4444" }} /> : <HeartOutlined />}
                </button>
            </div>

            {/* Body */}
            <div style={{ padding: "clamp(12px, 3.5vw, 18px)", display: "flex", flexDirection: "column", gap: "6px", flexGrow: 1 }}>
                <h6
                    style={{
                        fontWeight: 700,
                        color: T.ink,
                        margin: 0,
                        fontSize: "clamp(13px, 3.5vw, 15px)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                    title={product.name}
                >
                    {product.name}
                </h6>
                <p
                    style={{
                        color: T.muted,
                        fontSize: "12px",
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: "34px",
                        lineHeight: 1.4,
                    }}
                    title={product.description}
                >
                    {product.description}
                </p>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "auto",
                        paddingTop: "2px",
                    }}
                >
                    <span style={{ fontSize: "11px", color: T.sageDark, fontWeight: 700 }}>
                        {product.category || "Waqas Royal Export"}
                    </span>
                    <span style={{ fontSize: "10.5px", color: T.muted, fontWeight: 600 }}>MOQ: 1+</span>
                </div>
                <button
                    onClick={() => onAdd(product)}
                    disabled={oos}
                    style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "999px",
                        border: "none",
                        fontWeight: 600,
                        fontSize: "clamp(11.5px, 2.8vw, 13px)",
                        color: "#FFFFFF",
                        background: added ? T.sageDark : oos ? "#D4D4D0" : T.ink,
                        cursor: oos ? "not-allowed" : "pointer",
                        transition: "background 0.22s ease, transform 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                    }}
                >
                    {added ? (
                        <>
                            <CheckOutlined /> Added to Cart
                        </>
                    ) : oos ? (
                        "Out of Stock"
                    ) : (
                        <>
                            <ShoppingCartOutlined /> Add to Cart
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
