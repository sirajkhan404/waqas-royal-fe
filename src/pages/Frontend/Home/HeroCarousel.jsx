import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const SLIDES = [
    {
        id: 1,
        name: "Sport Wear",
        tagline: "Emirates Pro Football Kit · Breathable Mesh",
        category: "Waqas Royal Export",
        price: "Rs. 3,499",
        oldPrice: "Rs. 4,500",
        badge: "SPORT WEAR",
        image: "/images/kit.jpg",
        link: "/sport-wear",
        accent: "#525E46",
    },
    {
        id: 2,
        name: "Fashion Wear",
        tagline: "New York Est. 199X Heavyweight Hoodie",
        category: "Waqas Royal Export",
        price: "Rs. 4,299",
        oldPrice: "Rs. 5,499",
        badge: "FASHION WEAR",
        image: "/images/hoodie.jpg",
        link: "/fashion-wear",
        accent: "#6E7D60",
    },
    {
        id: 3,
        name: "Gym Wear",
        tagline: "Pro Compression Set · Stretch & Quick-Dry",
        category: "Waqas Royal Export",
        price: "Rs. 2,899",
        oldPrice: "Rs. 3,799",
        badge: "GYM WEAR",
        image: "/images/gym-wear.jpg",
        link: "/gym-wear",
        accent: "#141414",
    },
];

const HeroCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, []);

    const prevSlide = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    }, []);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(nextSlide, 2000);
        return () => clearInterval(timer);
    }, [isPaused, nextSlide]);

    const getPosition = (idx) => {
        const diff = (idx - activeIndex + SLIDES.length) % SLIDES.length;
        if (diff === 0) return 'center';
        if (diff === 1) return 'right';
        return 'left';
    };

    const current = SLIDES[activeIndex];

    return (
        <div
            style={{
                width: '100%',
                maxWidth: '520px',
                margin: '0 auto',
                position: 'relative',
                userSelect: 'none',
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <style>{`
                @keyframes hc3d-float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-6px); }
                }
                @keyframes hc3d-text-in {
                    0% { opacity: 0; transform: translateY(12px) rotateX(-18deg); }
                    100% { opacity: 1; transform: translateY(0) rotateX(0deg); }
                }
                .hc3d-stage {
                    perspective: 1200px;
                    perspective-origin: 50% 45%;
                    position: relative;
                    height: 350px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .hc3d-card {
                    position: absolute;
                    width: 260px;
                    height: 315px;
                    border-radius: 22px;
                    transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
                                opacity 0.55s ease,
                                filter 0.55s ease,
                                box-shadow 0.55s ease;
                    transform-style: preserve-3d;
                    cursor: pointer;
                    overflow: hidden;
                    background: #FFFFFF;
                    border: 1px solid rgba(20, 20, 20, 0.1);
                }
                .hc3d-card-center {
                    transform: translate3d(0, 0, 70px) rotateY(0deg) scale(1);
                    opacity: 1;
                    z-index: 30;
                }
                .hc3d-card-left {
                    transform: translate3d(-125px, 10px, -90px) rotateY(30deg) scale(0.78);
                    opacity: 1;
                    z-index: 15;
                    filter: brightness(0.86);
                }
                .hc3d-card-right {
                    transform: translate3d(125px, 10px, -90px) rotateY(-30deg) scale(0.78);
                    opacity: 1;
                    z-index: 15;
                    filter: brightness(0.86);
                }
                .hc3d-card-left:hover, .hc3d-card-right:hover {
                    filter: brightness(0.98);
                }
                .hc3d-text-anim {
                    animation: hc3d-text-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
                .hc3d-arrow {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    border: 1px solid rgba(20, 20, 20, 0.14);
                    background: rgba(255, 255, 255, 0.92);
                    color: #141414;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    z-index: 40;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
                .hc3d-arrow:hover {
                    background: #141414;
                    color: #FFFFFF;
                    border-color: #141414;
                }
                .hc3d-cta:hover {
                    background: #2C3327 !important;
                }
                @media (max-width: 1199px) {
                    .hc3d-card { width: 230px; height: 285px; }
                    .hc3d-card-left { transform: translate3d(-100px, 10px, -90px) rotateY(28deg) scale(0.76); }
                    .hc3d-card-right { transform: translate3d(100px, 10px, -90px) rotateY(-28deg) scale(0.76); }
                }
                @media (max-width: 576px) {
                    .hc3d-stage { height: 295px; }
                    .hc3d-card { width: 200px; height: 255px; }
                    .hc3d-card-left { transform: translate3d(-80px, 8px, -80px) rotateY(26deg) scale(0.72); }
                    .hc3d-card-right { transform: translate3d(80px, 8px, -80px) rotateY(-26deg) scale(0.72); }
                }
            `}</style>

            {/* ── 3D Rotating Cards Stage ── */}
            <div className="hc3d-stage">
                {SLIDES.map((slide, idx) => {
                    const pos = getPosition(idx);
                    const isCenter = pos === 'center';
                    const posClass =
                        pos === 'center'
                            ? 'hc3d-card-center'
                            : pos === 'left'
                                ? 'hc3d-card-left'
                                : 'hc3d-card-right';

                    return (
                        <div
                            key={slide.id}
                            className={`hc3d-card ${posClass}`}
                            onClick={() => setActiveIndex(idx)}
                            style={{
                                boxShadow: isCenter
                                    ? '0 24px 48px rgba(20, 20, 20, 0.18)'
                                    : '0 10px 24px rgba(20, 20, 20, 0.1)',
                            }}
                        >
                            {/* Top Badge inside Card */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '12px',
                                    zIndex: 5,
                                    background: '#141414',
                                    color: '#FFFFFF',
                                    fontSize: '9.5px',
                                    fontWeight: 700,
                                    padding: '4px 10px',
                                    borderRadius: '999px',
                                    letterSpacing: '0.6px',
                                }}
                            >
                                {slide.badge}
                            </div>

                            {/* Product Image */}
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: '#F4F4F1',
                                    padding: '16px',
                                }}
                            >
                                <img
                                    src={slide.image}
                                    alt={slide.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        borderRadius: '14px',
                                        animation: isCenter ? 'hc3d-float 3.5s ease-in-out infinite' : 'none',
                                    }}
                                />
                            </div>

                            {/* Mini Label on Card Bottom */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: '24px 14px 12px',
                                    background: 'linear-gradient(to top, rgba(20, 20, 20, 0.88) 15%, rgba(20, 20, 20, 0.45) 65%, transparent 100%)',
                                    color: '#FFFFFF',
                                    textAlign: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: '13.5px',
                                        fontWeight: 700,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {slide.name}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Prev / Next Arrows */}
                <button
                    type="button"
                    className="hc3d-arrow"
                    onClick={prevSlide}
                    aria-label="Previous Product"
                    style={{ position: 'absolute', left: '4px', top: '50%', transform: 'translateY(-50%)' }}
                >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
                <button
                    type="button"
                    className="hc3d-arrow"
                    onClick={nextSlide}
                    aria-label="Next Product"
                    style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)' }}
                >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>

            {/* ── Animated Product Name & Info Card ── */}
            <div
                key={current.id}
                className="hc3d-text-anim"
                style={{
                    marginTop: '12px',
                    background: '#FFFFFF',
                    border: '1px solid #E5E5E0',
                    borderRadius: '18px',
                    padding: '15px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    flexWrap: 'wrap',
                    boxShadow: '0 10px 26px rgba(20, 20, 20, 0.08)',
                }}
            >
                <div style={{ minWidth: 0, flex: '1 1 200px' }}>
                    <div
                        style={{
                            fontSize: '10.5px',
                            fontWeight: 700,
                            color: '#6E7D60',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '2px',
                        }}
                    >
                        {current.category}
                    </div>
                    <h4
                        style={{
                            margin: 0,
                            color: '#141414',
                            fontSize: '17px',
                            fontWeight: 800,
                            letterSpacing: '-0.3px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {current.name}
                    </h4>
                    <div style={{ fontSize: '12px', color: '#6A6A64', marginTop: '2px' }}>
                        {current.tagline}
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                    <Link
                        to={current.link || "/sport-wear"}
                        className="hc3d-cta"
                        style={{
                            background: '#141414',
                            color: '#FFFFFF',
                            fontWeight: 600,
                            fontSize: '12.5px',
                            padding: '9px 18px',
                            borderRadius: '999px',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        Shop →
                    </Link>
                </div>
            </div>

            {/* ── Indicator Dots ── */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '14px' }}>
                {SLIDES.map((s, idx) => (
                    <button
                        key={s.id}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`Show ${s.name}`}
                        style={{
                            border: 'none',
                            padding: 0,
                            height: '7px',
                            width: idx === activeIndex ? '26px' : '7px',
                            borderRadius: '999px',
                            cursor: 'pointer',
                            background: idx === activeIndex ? '#141414' : 'rgba(255, 255, 255, 0.55)',
                            transition: 'all 0.3s ease',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
