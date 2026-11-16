import React, { useState } from "react";

// Equirectangular projection mapped onto SVG viewBox 0 0 1000 480
// x = ((lon + 180) / 360) * 1000
// y = ((82 - lat) / 142) * 480
const HUB = {
    name: "Sialkot, Pakistan",
    x: 707,
    y: 167,
};

const DESTINATIONS = [
    { id: "usa", name: "USA", x: 228, y: 145, cx: 470, cy: 20, labelDx: 10, labelDy: -6 },
    { id: "uk", name: "UK", x: 494, y: 95, cx: 610, cy: 55, labelDx: -18, labelDy: -10 },
    { id: "ireland", name: "Ireland", x: 476, y: 99, cx: 600, cy: 65, labelDx: -38, labelDy: 14 },
    { id: "portugal", name: "Portugal", x: 476, y: 144, cx: 605, cy: 95, labelDx: 10, labelDy: -8 },
    { id: "germany", name: "Germany", x: 528, y: 106, cx: 630, cy: 70, labelDx: 10, labelDy: 12 },
    { id: "sweden", name: "Sweden", x: 542, y: 68, cx: 638, cy: 48, labelDx: -30, labelDy: -10 },
    { id: "finland", name: "Finland", x: 572, y: 61, cx: 652, cy: 48, labelDx: 10, labelDy: -6 },
    { id: "uae", name: "UAE", x: 650, y: 196, cx: 682, cy: 168, labelDx: 10, labelDy: -6 },
    { id: "australia", name: "Australia", x: 872, y: 362, cx: 830, cy: 220, labelDx: 10, labelDy: -6 },
];

// Bottom pill order matching reference layout
const PILL_ORDER = ["usa", "uk", "australia", "germany", "ireland", "uae", "finland", "portugal", "sweden"];

// Continent silhouettes in the same 1000x480 coordinate space, filled with dot-matrix SVG pattern
const CONTINENT_PATHS = [
    // North America & Central America
    "M 60 80 L 115 62 L 175 56 L 235 60 L 290 48 L 325 65 L 305 90 L 340 105 L 322 128 L 285 138 L 268 158 L 250 165 L 236 184 L 214 188 L 204 205 L 222 224 L 245 235 L 252 246 L 236 244 L 212 225 L 185 205 L 168 182 L 145 162 L 138 135 L 118 115 L 82 105 L 62 96 Z",
    // Greenland
    "M 340 24 L 405 18 L 435 34 L 415 58 L 372 68 L 348 52 Z",
    // Cuba / Caribbean
    "M 255 198 L 285 202 L 282 210 L 252 206 Z",
    // South America
    "M 255 248 L 292 246 L 328 265 L 368 286 L 380 315 L 358 355 L 332 390 L 310 426 L 292 444 L 282 435 L 286 396 L 274 358 L 256 322 L 246 286 Z",
    // UK & Ireland
    "M 484 82 L 496 80 L 502 98 L 486 105 Z",
    "M 470 94 L 480 93 L 480 105 L 470 106 Z",
    // Continental Europe & Scandinavia
    "M 472 138 L 492 132 L 505 118 L 518 102 L 525 82 L 538 56 L 565 48 L 592 54 L 598 74 L 575 86 L 555 88 L 568 106 L 585 118 L 574 134 L 555 142 L 535 138 L 528 152 L 516 142 L 500 144 L 484 152 L 472 148 Z",
    // Africa
    "M 468 162 L 515 158 L 558 166 L 592 175 L 615 202 L 640 225 L 625 256 L 605 288 L 596 326 L 572 362 L 548 372 L 530 345 L 520 302 L 505 268 L 480 256 L 456 236 L 452 202 Z",
    // Madagascar
    "M 616 325 L 628 318 L 630 348 L 618 355 Z",
    // Asia (Middle East, Russia, India, China, SE Asia)
    "M 588 145 L 620 158 L 656 172 L 664 198 L 638 212 L 615 198 L 592 172 Z",
    "M 585 68 L 640 52 L 725 46 L 820 52 L 905 64 L 938 82 L 900 102 L 875 118 L 856 142 L 835 162 L 828 186 L 804 205 L 784 222 L 774 248 L 758 238 L 748 215 L 728 212 L 712 246 L 696 232 L 682 198 L 658 178 L 635 160 L 600 145 L 582 118 Z",
    // Japan
    "M 872 128 L 888 122 L 892 146 L 876 160 L 866 150 Z",
    // Indonesia / Philippines
    "M 776 266 L 805 268 L 802 282 L 774 278 Z",
    "M 818 268 L 848 272 L 846 286 L 816 282 Z",
    "M 832 232 L 844 234 L 842 252 L 830 248 Z",
    // Australia
    "M 816 332 L 858 318 L 896 324 L 926 350 L 922 384 L 896 402 L 862 396 L 826 382 L 810 356 Z",
    // New Zealand
    "M 952 396 L 966 386 L 968 412 L 950 422 Z",
];

export default function ExportWorldMap() {
    const [activeId, setActiveId] = useState(null);

    const pills = PILL_ORDER.map((id) => DESTINATIONS.find((d) => d.id === id)).filter(Boolean);

    return (
        <section
            style={{
                background: "#121412",
                color: "#FFFFFF",
                padding: "76px 0 68px",
                position: "relative",
                overflow: "hidden",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
        >
            <style>{`
                @keyframes wrArcFlow {
                    to {
                        stroke-dashoffset: -48;
                    }
                }
                @keyframes wrHubPulse {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.75;
                    }
                    50% {
                        transform: scale(2.1);
                        opacity: 0;
                    }
                }
                .wr-map-arc-anim {
                    stroke-dasharray: 5 7;
                    animation: wrArcFlow 2.6s linear infinite;
                }
                .wr-hub-ring {
                    transform-box: fill-box;
                    transform-origin: center;
                    animation: wrHubPulse 2.4s ease-out infinite;
                }
                .wr-country-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    border-radius: 999px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    color: rgba(255, 255, 255, 0.85);
                    font-size: 0.82rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.22s ease;
                    user-select: none;
                }
                .wr-country-pill:hover,
                .wr-country-pill.is-active {
                    background: rgba(225, 29, 99, 0.14);
                    border-color: rgba(225, 29, 99, 0.65);
                    color: #FFFFFF;
                    transform: translateY(-2px);
                }
                @media (max-width: 768px) {
                    .wr-export-header {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                    }
                }
            `}</style>

            {/* Subtle background ambient glow */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "radial-gradient(circle at 68% 48%, rgba(225, 29, 99, 0.08) 0%, rgba(18, 20, 18, 0) 52%)",
                    pointerEvents: "none",
                }}
            />

            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                {/* Header Row */}
                <div
                    className="wr-export-header"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        gap: 24,
                        marginBottom: 28,
                    }}
                >
                    <div style={{ maxWidth: 560 }}>
                        <div
                            style={{
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                color: "#E11D63",
                                marginBottom: 10,
                            }}
                        >
                            WORLDWIDE EXPORT
                        </div>
                        <h2
                            style={{
                                margin: "0 0 12px",
                                fontSize: "clamp(1.75rem, 3.6vw, 2.75rem)",
                                fontWeight: 900,
                                letterSpacing: "-0.02em",
                                lineHeight: 1.05,
                                color: "#FFFFFF",
                                textTransform: "uppercase",
                            }}
                        >
                            FROM SIALKOT TO THE WORLD
                        </h2>
                        <p
                            style={{
                                margin: 0,
                                fontSize: "0.92rem",
                                lineHeight: 1.65,
                                color: "rgba(255, 255, 255, 0.58)",
                            }}
                        >
                            For 18 years we have shipped export-ready orders from our Sialkot factory
                            to brands across the world.
                        </p>
                    </div>

                    <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexShrink: 0 }}>
                        <span
                            style={{
                                fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
                                fontWeight: 900,
                                lineHeight: 1,
                                color: "#E11D63",
                                letterSpacing: "-0.03em",
                            }}
                        >
                            12
                        </span>
                        <span
                            style={{
                                fontSize: "0.86rem",
                                color: "rgba(255, 255, 255, 0.58)",
                                fontWeight: 500,
                            }}
                        >
                            countries we ship to
                        </span>
                    </div>
                </div>

                {/* Dot-Matrix World Map */}
                <div style={{ width: "100%", maxWidth: 1060, margin: "0 auto" }}>
                    <svg
                        viewBox="0 0 1000 470"
                        role="img"
                        aria-label="Worldwide export map from Sialkot, Pakistan"
                        style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
                    >
                        <defs>
                            <pattern
                                id="wr-world-dots"
                                x="0"
                                y="0"
                                width="5.2"
                                height="5.2"
                                patternUnits="userSpaceOnUse"
                            >
                                <circle cx="2.2" cy="2.2" r="1.2" fill="rgba(255,255,255,0.22)" />
                            </pattern>

                            <filter id="wr-pink-glow" x="-30%" y="-30%" width="160%" height="160%">
                                <feGaussianBlur stdDeviation="2.5" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Dot-Matrix Continents */}
                        <g>
                            {CONTINENT_PATHS.map((d, idx) => (
                                <path key={idx} d={d} fill="url(#wr-world-dots)" />
                            ))}
                        </g>

                        {/* Shipping Arcs from Sialkot */}
                        <g>
                            {DESTINATIONS.map((dest) => {
                                const pathD = `M ${HUB.x} ${HUB.y} Q ${dest.cx} ${dest.cy} ${dest.x} ${dest.y}`;
                                const isFocused = !activeId || activeId === dest.id;
                                const opacity = activeId ? (activeId === dest.id ? 1 : 0.16) : 0.78;
                                return (
                                    <g key={dest.id} style={{ transition: "opacity 0.25s ease", opacity }}>
                                        {/* Base glowing arc */}
                                        <path
                                            d={pathD}
                                            fill="none"
                                            stroke="#E11D63"
                                            strokeWidth={activeId === dest.id ? 2 : 1.35}
                                            strokeOpacity={isFocused ? 0.55 : 0.25}
                                            filter={activeId === dest.id ? "url(#wr-pink-glow)" : undefined}
                                        />
                                        {/* Animated traveling dash */}
                                        <path
                                            d={pathD}
                                            fill="none"
                                            stroke="#FF6B9D"
                                            strokeWidth={activeId === dest.id ? 2 : 1.3}
                                            className="wr-map-arc-anim"
                                        />
                                    </g>
                                );
                            })}
                        </g>

                        {/* Destination Markers & Labels */}
                        <g>
                            {DESTINATIONS.map((dest) => {
                                const isActive = activeId === dest.id;
                                const dimmed = activeId && !isActive;
                                return (
                                    <g
                                        key={dest.id}
                                        style={{
                                            cursor: "pointer",
                                            opacity: dimmed ? 0.28 : 1,
                                            transition: "opacity 0.25s ease",
                                        }}
                                        onMouseEnter={() => setActiveId(dest.id)}
                                        onMouseLeave={() => setActiveId(null)}
                                    >
                                        {isActive && (
                                            <circle
                                                cx={dest.x}
                                                cy={dest.y}
                                                r="9"
                                                fill="rgba(225, 29, 99, 0.28)"
                                            />
                                        )}
                                        <circle
                                            cx={dest.x}
                                            cy={dest.y}
                                            r={isActive ? 4.2 : 3}
                                            fill="#FFFFFF"
                                            stroke="#E11D63"
                                            strokeWidth="1.5"
                                        />
                                        <text
                                            x={dest.x + dest.labelDx}
                                            y={dest.y + dest.labelDy}
                                            fill="#FFFFFF"
                                            fontSize="10.5"
                                            fontWeight={isActive ? "700" : "600"}
                                            style={{
                                                textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                                                pointerEvents: "none",
                                            }}
                                        >
                                            {dest.name}
                                        </text>
                                    </g>
                                );
                            })}
                        </g>

                        {/* Sialkot Origin Hub */}
                        <g>
                            <circle
                                cx={HUB.x}
                                cy={HUB.y}
                                r="12"
                                fill="rgba(225, 29, 99, 0.35)"
                                className="wr-hub-ring"
                            />
                            <circle
                                cx={HUB.x}
                                cy={HUB.y}
                                r="6"
                                fill="#E11D63"
                                stroke="#FFFFFF"
                                strokeWidth="1.8"
                                filter="url(#wr-pink-glow)"
                            />
                            <text
                                x={HUB.x + 12}
                                y={HUB.y + 18}
                                fill="#FFFFFF"
                                fontSize="11"
                                fontWeight="700"
                                style={{ textShadow: "0 1px 6px rgba(0,0,0,0.95)" }}
                            >
                                Sialkot, Pakistan
                            </text>
                        </g>
                    </svg>
                </div>

                {/* Country Filter Pills */}
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 10,
                        marginTop: 28,
                    }}
                >
                    {pills.map((country) => {
                        const isActive = activeId === country.id;
                        return (
                            <button
                                key={country.id}
                                type="button"
                                className={`wr-country-pill${isActive ? " is-active" : ""}`}
                                onMouseEnter={() => setActiveId(country.id)}
                                onMouseLeave={() => setActiveId(null)}
                                onClick={() => setActiveId((prev) => (prev === country.id ? null : country.id))}
                            >
                                <span
                                    style={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: "50%",
                                        background: "#E11D63",
                                        boxShadow: "0 0 8px #E11D63",
                                        flexShrink: 0,
                                    }}
                                />
                                {country.name}
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

