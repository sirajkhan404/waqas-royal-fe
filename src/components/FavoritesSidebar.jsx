import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import {
    HeartFilled,
    CloseOutlined,
    ShoppingOutlined,
    DeleteOutlined,
    ShoppingCartOutlined,
    ArrowRightOutlined
} from "@ant-design/icons";

const FavoritesSidebar = ({ isOpen, onClose }) => {
    const { favorites, removeFavorite, clearFavorites } = useFavorites();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        addToCart(product);
        if (window.toastify) {
            window.toastify(`Added "${product.name}" to cart! 🛒`, "success");
        }
    };

    const handleMoveAllToCart = () => {
        favorites.forEach((product) => {
            if (product.stock > 0 || product.stock === undefined) {
                addToCart(product);
            }
        });
        if (window.toastify) {
            window.toastify("All available favorites added to cart! 🛒", "success");
        }
    };

    return (
        <>
            {/* ── Backdrop ── */}
            <div
                className={`position-fixed top-0 start-0 w-100 h-100 ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                style={{
                    zIndex: 9998,
                    background: "rgba(20, 20, 20, 0.5)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    transition: "all 0.3s ease",
                }}
                onClick={onClose}
            />

            {/* ── Favorites Drawer Panel ── */}
            <div
                className="position-fixed top-0 h-100 bg-white shadow-lg d-flex flex-column"
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    right: isOpen ? 0 : "-100%",
                    zIndex: 9999,
                    transition: "right 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: isOpen ? "-10px 0 40px rgba(20,20,20,0.2)" : "none",
                }}
            >
                {/* 1. Header */}
                <div
                    className="p-3 px-4 text-white d-flex align-items-center justify-content-between position-relative"
                    style={{ background: "#525E46" }}
                >
                    <div className="d-flex align-items-center gap-2">
                        <div
                            className="rounded-3 d-flex align-items-center justify-content-center text-white"
                            style={{
                                width: "36px",
                                height: "36px",
                                background: "rgba(255, 255, 255, 0.16)",
                                fontSize: "18px",
                            }}
                        >
                            <HeartFilled style={{ color: "#FF6B6B" }} />
                        </div>
                        <div>
                            <div className="fw-bold fs-5 lh-1 text-white">My Favorites</div>
                            <div style={{ fontSize: "11.5px", color: "#DCE3D5", marginTop: "3px" }}>
                                {favorites.length} {favorites.length === 1 ? "Product" : "Products"} Saved
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="btn btn-sm text-white rounded-circle p-0 d-flex align-items-center justify-content-center border-0 shadow-none"
                        style={{ width: "32px", height: "32px", background: "rgba(255,255,255,0.16)" }}
                        aria-label="Close favorites"
                    >
                        <CloseOutlined />
                    </button>
                </div>

                {/* 2. Items List */}
                <div className="flex-grow-1 overflow-auto px-3 py-3">
                    {favorites.length === 0 ? (
                        <div className="text-center py-5 my-auto d-flex flex-column align-items-center justify-content-center h-100">
                            <div
                                className="rounded-circle d-flex align-items-center justify-content-center mb-3"
                                style={{
                                    width: "90px",
                                    height: "90px",
                                    background: "#FEE2E2",
                                    fontSize: "40px",
                                }}
                            >
                                <HeartFilled style={{ color: "#EF4444" }} />
                            </div>
                            <h5 className="fw-bold text-dark mb-1">Your Wishlist is Empty</h5>
                            <p className="text-muted small mb-4" style={{ maxWidth: "240px" }}>
                                Tap the heart icon on any product to save it here for later!
                            </p>
                            <button
                                onClick={() => {
                                    onClose();
                                    navigate("/sport-wear");
                                }}
                                className="btn rounded-pill px-4 py-2 fw-semibold text-white border-0"
                                style={{ background: "#141414", fontSize: "14px" }}
                            >
                                Discover Products →
                            </button>
                        </div>
                    ) : (
                        <div className="d-flex flex-column gap-3">
                            {favorites.map((item) => {
                                const id = item.id || item._id;
                                const oos = item.stock !== undefined && item.stock <= 0;
                                return (
                                    <div
                                        key={id}
                                        className="d-flex align-items-center gap-3 p-3 rounded-4 border bg-white shadow-sm position-relative"
                                        style={{ borderColor: "#E5E7EB" }}
                                    >
                                        {/* Image */}
                                        <div
                                            className="rounded-3 overflow-hidden flex-shrink-0 border bg-light"
                                            style={{ width: "70px", height: "70px", borderColor: "#F1F5F9" }}
                                        >
                                            <img
                                                src={item.imageURL || "https://via.placeholder.com/70"}
                                                alt={item.name}
                                                className="w-100 h-100 object-fit-cover"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/70?text=No+Img";
                                                }}
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-grow-1 min-width-0">
                                            <div
                                                className="fw-semibold text-dark text-truncate"
                                                style={{ fontSize: "13.5px" }}
                                            >
                                                {item.name}
                                            </div>
                                            {item.category && (
                                                <div style={{ fontSize: "11px", color: "#525E46", fontWeight: 600 }}>
                                                    {item.category}
                                                </div>
                                            )}
                                            <div className="fw-bold mt-1" style={{ fontSize: "13.5px", color: "#0D9488" }}>
                                                Rs. {Number(item.price).toLocaleString()}
                                            </div>

                                            {/* Action buttons */}
                                            <div className="d-flex align-items-center gap-2 mt-2">
                                                <button
                                                    onClick={() => handleAddToCart(item)}
                                                    disabled={oos}
                                                    className="btn btn-sm text-white rounded-pill px-3 py-1 fw-semibold d-inline-flex align-items-center gap-1 border-0"
                                                    style={{
                                                        background: oos ? "#9CA3AF" : "#141414",
                                                        fontSize: "11.5px",
                                                        cursor: oos ? "not-allowed" : "pointer",
                                                    }}
                                                >
                                                    <ShoppingCartOutlined /> {oos ? "Out of Stock" : "Add to Cart"}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Delete */}
                                        <button
                                            onClick={() => removeFavorite(id)}
                                            className="btn btn-sm p-1 text-danger border-0 bg-transparent shadow-none align-self-start"
                                            style={{ fontSize: "15px", lineHeight: 1 }}
                                            title="Remove from favorites"
                                        >
                                            <DeleteOutlined />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* 3. Footer */}
                {favorites.length > 0 && (
                    <div className="p-3 px-4 border-top bg-light" style={{ borderColor: "#E2E8F0" }}>
                        <div className="d-flex gap-2">
                            <button
                                onClick={clearFavorites}
                                className="btn btn-outline-danger rounded-pill px-3 fw-semibold"
                                style={{ fontSize: "13px" }}
                            >
                                Clear All
                            </button>
                            <button
                                onClick={handleMoveAllToCart}
                                className="btn text-white rounded-pill flex-grow-1 fw-semibold d-flex align-items-center justify-content-center gap-2 border-0"
                                style={{
                                    background: "#525E46",
                                    fontSize: "13.5px",
                                    padding: "10px 16px",
                                }}
                            >
                                <ShoppingCartOutlined /> Add All to Cart
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default FavoritesSidebar;

