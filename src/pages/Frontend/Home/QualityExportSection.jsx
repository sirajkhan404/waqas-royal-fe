import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRightOutlined, SafetyCertificateOutlined, CheckCircleFilled } from "@ant-design/icons";

export default function QualityExportSection() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section
            style={{
                background: "#FAFAF8",
                padding: "88px 0",
                position: "relative",
                overflow: "hidden",
                borderBottom: "1px solid #ECECE8",
            }}
        >
            <style>{`
                .wr-qc-img-wrap {
                    position: relative;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 16px 36px -10px rgba(20, 20, 20, 0.12);
                    transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.45s ease;
                    cursor: pointer;
                    background: #FAF7F2;
                }
                .wr-qc-img-wrap:hover {
                    transform: translateY(-6px) scale(1.015);
                    box-shadow: 0 26px 50px -12px rgba(82, 94, 70, 0.28);
                }
                .wr-qc-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    transition: transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.45s ease;
                }
                .wr-qc-img-wrap:hover .wr-qc-img {
                    transform: scale(1.06);
                    filter: saturate(1.08) contrast(1.03);
                }
                /* Glossy light sweep on hover */
                .wr-qc-shine {
                    position: absolute;
                    top: 0;
                    left: -120%;
                    width: 80%;
                    height: 100%;
                    background: linear-gradient(
                        105deg,
                        rgba(255, 255, 255, 0) 0%,
                        rgba(255, 255, 255, 0.35) 50%,
                        rgba(255, 255, 255, 0) 100%
                    );
                    transform: skewX(-20deg);
                    pointer-events: none;
                    transition: left 0.75s ease;
                }
                .wr-qc-img-wrap:hover .wr-qc-shine {
                    left: 140%;
                }
                /* Floating Glass Badge */
                .wr-qc-badge {
                    position: absolute;
                    bottom: 18px;
                    left: 18px;
                    right: 18px;
                    padding: 12px 18px;
                    border-radius: 14px;
                    background: rgba(20, 22, 20, 0.82);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    transform: translateY(10px);
                    opacity: 0.94;
                    transition: all 0.35s ease;
                    border: 1px solid rgba(255, 255, 255, 0.15);
                }
                .wr-qc-img-wrap:hover .wr-qc-badge {
                    transform: translateY(0);
                    background: rgba(20, 22, 20, 0.92);
                    border-color: rgba(82, 94, 70, 0.55);
                }
                /* Button styling matching the screenshot */
                .wr-quote-btn-alt {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 13px 34px;
                    border-radius: 999px;
                    border: 1.8px solid #141414;
                    background: transparent;
                    color: #141414;
                    font-size: 0.96rem;
                    font-weight: 700;
                    letter-spacing: -0.01em;
                    text-decoration: none;
                    transition: all 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                .wr-quote-btn-alt:hover {
                    background: #141414;
                    color: #FFFFFF;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 24px rgba(20, 20, 20, 0.18);
                }
                .wr-quote-btn-alt:hover .wr-btn-arrow {
                    transform: translateX(4px);
                }
            `}</style>

            <div className="container">
                <div className="row align-items-center g-5">
                    {/* Left Column: Quality & Export Factory Photo with Interactive Hover */}
                    <div className="col-12 col-lg-6 order-2 order-lg-1">
                        <div
                            className="wr-qc-img-wrap"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            style={{ maxWidth: 540, margin: "0 auto" }}
                        >
                            <img
                                src="/images/quality-export.jpg"
                                alt="Factory quality check, apparel inspection, individual poly-bagging and export packing"
                                className="wr-qc-img"
                                loading="lazy"
                            />

                            {/* Glossy light sweep effect */}
                            <div className="wr-qc-shine" />

                            {/* Glass Badge overlay on hover */}
                            <div className="wr-qc-badge">
                                <div>
                                    <div style={{ fontSize: "0.86rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
                                        Factory Floor QC Passed
                                    </div>
                                    <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.72)", marginTop: 2 }}>
                                        Measurements Checked • Poly-Bagged • Export Cartons
                                    </div>
                                </div>
                                <span
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 24,
                                        height: 24,
                                        borderRadius: "50%",
                                        background: "#525E46",
                                        color: "#FFFFFF",
                                        fontSize: "0.75rem",
                                    }}
                                >
                                    ✓
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Heading, Subtitle & Request a Quote Button */}
                    <div className="col-12 col-lg-6 order-1 order-lg-2">
                        <div style={{ maxWidth: 510, marginLeft: "auto" }}>
                            <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 7,
                                    fontSize: "0.74rem",
                                    fontWeight: 700,
                                    letterSpacing: "0.16em",
                                    textTransform: "uppercase",
                                    color: "#525E46",
                                    marginBottom: 14,
                                }}
                            >
                                <SafetyCertificateOutlined style={{ fontSize: "0.95rem" }} />
                                Pre-Shipment Inspection &amp; Standards
                            </div>

                            <h2
                                style={{
                                    fontSize: "clamp(2rem, 3.8vw, 3.1rem)",
                                    fontWeight: 900,
                                    lineHeight: 1.08,
                                    letterSpacing: "-0.03em",
                                    color: "#141414",
                                    textTransform: "uppercase",
                                    margin: "0 0 20px",
                                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                                }}
                            >
                                QUALITY &amp; EXPORT
                            </h2>

                            <p
                                style={{
                                    fontSize: "1.02rem",
                                    lineHeight: 1.7,
                                    color: "rgba(20, 20, 20, 0.68)",
                                    margin: "0 0 32px",
                                    fontWeight: 450,
                                }}
                            >
                                Every order goes through quality checks for measurements and finish
                                before packing. Garments are individually poly-bagged, packed in
                                export cartons and shipped to the USA, UK, Europe and beyond.
                            </p>

                            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                                <Link to="/contact" className="wr-quote-btn-alt">
                                    <span>Request a Quote</span>
                                    <span className="wr-btn-arrow">
                                        <ArrowRightOutlined style={{ fontSize: "0.85rem" }} />
                                    </span>
                                </Link>

                                <div
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 8,
                                        fontSize: "0.82rem",
                                        color: "rgba(20, 20, 20, 0.6)",
                                        fontWeight: 600,
                                    }}
                                >
                                    <CheckCircleFilled style={{ color: "#525E46" }} />
                                    <span>Global Air &amp; Sea Shipping</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

