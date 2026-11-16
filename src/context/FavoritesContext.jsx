import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem("mystore_favorites");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("mystore_favorites", JSON.stringify(favorites));
        } catch (e) {
            console.error("Failed to save favorites to localStorage", e);
        }
    }, [favorites]);

    const isFavorite = (productId) => {
        if (!productId) return false;
        return favorites.some((item) => (item.id || item._id) === productId);
    };

    const toggleFavorite = (product) => {
        const id = product.id || product._id;
        if (!id) return;

        setFavorites((prev) => {
            const exists = prev.some((item) => (item.id || item._id) === id);
            if (exists) {
                if (window.toastify) {
                    window.toastify(`Removed "${product.name}" from favorites`, "info");
                }
                return prev.filter((item) => (item.id || item._id) !== id);
            } else {
                if (window.toastify) {
                    window.toastify(`Added "${product.name}" to favorites ❤️`, "success");
                }
                return [
                    ...prev,
                    {
                        id: product.id || product._id,
                        _id: product._id || product.id,
                        name: product.name,
                        price: Number(product.price) || 0,
                        imageURL: product.imageURL || "",
                        category: product.category || "",
                        description: product.description || "",
                        stock: product.stock,
                    },
                ];
            }
        });
    };

    const removeFavorite = (productId) => {
        setFavorites((prev) => prev.filter((item) => (item.id || item._id) !== productId));
    };

    const clearFavorites = () => setFavorites([]);

    const totalFavorites = favorites.length;

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                isFavorite,
                toggleFavorite,
                removeFavorite,
                clearFavorites,
                totalFavorites,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);
export default FavoritesProvider;

