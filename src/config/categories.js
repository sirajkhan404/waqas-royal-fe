/**
 * Central category definitions for Waqas Royal Export Apparel.
 * Editorial Sage-Olive, Warm Stone & Charcoal color palette.
 */
export const ROYAL_CATEGORIES = [
    {
        key: "sport-wear",
        name: "Sport Wear",
        path: "/sport-wear",
        badge: "PRO EXPORT",
        tagline: "High-Performance Team Kits & Athletic Jerseys",
        description:
            "Engineered with breathable dry-fit fabrics and precision stitching for international sports teams, clubs, and active athletes.",
        image: "/images/kit.jpg",
        accentColor: "#525E46",
        accentLight: "#EAEDE6",
        badgeBg: "#141414",
        bannerBg: "linear-gradient(135deg, #525E46 0%, #6E7D60 100%)",
        matches: ["sport wear", "sports wear", "sports", "sport"],
    },
    {
        key: "fashion-wear",
        name: "Fashion Wear",
        path: "/fashion-wear",
        badge: "STREET & CASUAL",
        tagline: "Premium Hoodies, Streetwear & Everyday Apparel",
        description:
            "Export-grade fleece hoodies, modern streetwear, and tailored casual sets designed for global fashion retail brands.",
        image: "/images/hoodie.jpg",
        accentColor: "#6E7D60",
        accentLight: "#EFEFEA",
        badgeBg: "#525E46",
        bannerBg: "linear-gradient(135deg, #2A2D26 0%, #525E46 100%)",
        matches: ["fashion wear", "fashion", "clothing", "streetwear"],
    },
    {
        key: "gym-wear",
        name: "Gym Wear",
        path: "/gym-wear",
        badge: "TRAINING SERIES",
        tagline: "Compression Sets, Tracksuits & Activewear",
        description:
            "Four-way stretch, moisture-wicking gym shirts, joggers, and compression gear built for intense workouts and global fitness markets.",
        image: "/images/gym-wear.jpg",
        accentColor: "#141414",
        accentLight: "#EFEFEA",
        badgeBg: "#141414",
        bannerBg: "linear-gradient(135deg, #141414 0%, #373D32 100%)",
        matches: ["gym wear", "gym", "fitness", "activewear"],
    },
];

/**
 * Checks whether a product belongs to a given Royal category config.
 */
export const matchesRoyalCategory = (product, categoryConfig) => {
    if (!product?.category || !categoryConfig) return false;
    const cat = product.category.trim().toLowerCase();
    return categoryConfig.matches.some((m) => cat === m || cat.includes(m));
};
