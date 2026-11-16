import React from 'react';

const ScreenLoader = ({ message = "Preparing your royal experience..." }) => {
    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center"
            style={{
                zIndex: 99999,
                background: "radial-gradient(ellipse at center, #1a2219 0%, #0d120d 50%, #070907 100%)",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                color: "#FFFFFF",
                overflow: "hidden",
            }}
        >
            <style>{`
                @keyframes wr-spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes wr-spin-reverse {
                    0% { transform: rotate(360deg); }
                    100% { transform: rotate(0deg); }
                }
                @keyframes wr-pulse-glow {
                    0%, 100% {
                        opacity: 0.35;
                        transform: scale(0.96);
                        box-shadow: 0 0 25px rgba(82, 94, 70, 0.4);
                    }
                    50% {
                        opacity: 0.85;
                        transform: scale(1.04);
                        box-shadow: 0 0 50px rgba(110, 125, 96, 0.7);
                    }
                }
                @keyframes wr-shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                @keyframes wr-fade-in-up {
                    0% {
                        opacity: 0;
                        transform: translateY(12px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes wr-dot-blink {
                    0%, 20% { opacity: 0.2; }
                    50% { opacity: 1; }
                    100% { opacity: 0.2; }
                }
            `}</style>

            {/* Ambient Background Glow Effect */}
            <div
                className="position-absolute rounded-circle pointer-events-none"
                style={{
                    width: "480px",
                    height: "480px",
                    background: "radial-gradient(circle, rgba(110, 125, 96, 0.18) 0%, rgba(82, 94, 70, 0.05) 50%, transparent 70%)",
                    filter: "blur(40px)",
                    zIndex: 0,
                }}
            />

            {/* Central Branded Box */}
            <div
                className="position-relative d-flex flex-column align-items-center text-center p-4"
                style={{ zIndex: 1, animation: "wr-fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both" }}
            >
                {/* 1. Animated Logo Ring */}
                <div
                    className="position-relative d-flex align-items-center justify-content-center mb-4"
                    style={{ width: "120px", height: "120px" }}
                >
                    {/* Outer glowing aura */}
                    <div
                        className="position-absolute rounded-circle"
                        style={{
                            width: "116px",
                            height: "116px",
                            background: "transparent",
                            border: "1px solid rgba(165, 182, 141, 0.25)",
                            animation: "wr-pulse-glow 2.8s ease-in-out infinite",
                        }}
                    />

                    {/* Outer spinning gradient ring */}
                    <div
                        className="position-absolute rounded-circle"
                        style={{
                            width: "112px",
                            height: "112px",
                            border: "2px solid transparent",
                            borderTop: "2px solid #A5B68D",
                            borderRight: "2px solid #525E46",
                            animation: "wr-spin 1.8s linear infinite",
                        }}
                    />

                    {/* Inner counter-rotating ring */}
                    <div
                        className="position-absolute rounded-circle"
                        style={{
                            width: "96px",
                            height: "96px",
                            border: "1.5px dashed rgba(220, 227, 213, 0.4)",
                            borderBottom: "1.5px solid #DCE3D5",
                            animation: "wr-spin-reverse 3s linear infinite",
                        }}
                    />

                    {/* Central Brand Emblem */}
                    <div
                        className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center shadow-lg"
                        style={{
                            width: "74px",
                            height: "74px",
                            background: "#141414",
                            border: "2px solid #525E46",
                            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.6)",
                        }}
                    >
                        <img
                            src="/images/waqas-royal-logo.jpg"
                            alt="Waqas Royal Logo"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => {
                                // Fallback elegant monogram if logo image fails
                                e.target.style.display = "none";
                                if (e.target.parentNode) {
                                    e.target.parentNode.innerHTML = `<span style="font-weight:900;font-size:22px;letter-spacing:1px;color:#DCE3D5;">WR</span>`;
                                }
                            }}
                        />
                    </div>
                </div>

                {/* 2. Brand Name Typography */}
                <h2
                    className="fw-bold mb-1"
                    style={{
                        letterSpacing: "4px",
                        fontSize: "22px",
                        fontWeight: 900,
                        color: "#F7F7F5",
                        textTransform: "uppercase",
                    }}
                >
                    Waqas <span style={{ color: "#A5B68D" }}>Royal</span>
                </h2>

                <div
                    className="text-uppercase fw-semibold mb-4"
                    style={{
                        fontSize: "10.5px",
                        letterSpacing: "2.8px",
                        color: "#9EA895",
                    }}
                >
                    Export Apparel &amp; Activewear
                </div>

                {/* 3. Luxury Shimmer Progress Track */}
                <div
                    className="position-relative overflow-hidden rounded-pill mb-3"
                    style={{
                        width: "210px",
                        height: "3.5px",
                        background: "rgba(255, 255, 255, 0.08)",
                        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.4)",
                    }}
                >
                    <div
                        className="position-absolute top-0 start-0 h-100 rounded-pill"
                        style={{
                            width: "100%",
                            background: "linear-gradient(90deg, transparent 0%, #525E46 25%, #DCE3D5 50%, #A5B68D 75%, transparent 100%)",
                            animation: "wr-shimmer 1.6s ease-in-out infinite",
                        }}
                    />
                </div>

                {/* 4. Dynamic Loading Message with animated dots */}
                <p
                    className="mb-0 fw-medium"
                    style={{
                        fontSize: "12px",
                        color: "rgba(220, 227, 213, 0.75)",
                        letterSpacing: "0.5px",
                    }}
                >
                    {message}
                    <span style={{ animation: "wr-dot-blink 1.4s infinite 0.1s" }}>.</span>
                    <span style={{ animation: "wr-dot-blink 1.4s infinite 0.25s" }}>.</span>
                    <span style={{ animation: "wr-dot-blink 1.4s infinite 0.4s" }}>.</span>
                </p>

                {/* 5. Minimal Quality Seal */}
                <div
                    className="mt-4 pt-2 border-top border-white border-opacity-10 d-flex align-items-center gap-2"
                    style={{ fontSize: "10px", letterSpacing: "1.8px", color: "#6E7D60", textTransform: "uppercase", fontWeight: 700 }}
                >
                    <span>Worldwide Export Quality</span>
                </div>
            </div>
        </div>
    );
};

export default ScreenLoader;
