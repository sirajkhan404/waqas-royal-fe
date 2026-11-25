import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ThunderboltOutlined,
    SafetyOutlined,
    RetweetOutlined,
    CustomerServiceOutlined,
    GiftOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';

const services = [
    {
        id: 1,
        icon: <ThunderboltOutlined />,
        title: 'Global Export Shipping',
        desc: 'Reliable air and sea freight worldwide with timely dispatch for retail and wholesale apparel shipments.',
        badge: 'Worldwide',
    },
    {
        id: 2,
        icon: <SafetyOutlined />,
        title: 'Secure Checkout',
        desc: 'All transactions and export inquiries are handled securely with verified payment protection.',
        badge: '100% Safe',
    },
    {
        id: 3,
        icon: <RetweetOutlined />,
        title: 'Custom OEM & Labeling',
        desc: 'Private-label embroidery, woven neck tags, custom sizing, and bespoke packaging for your brand.',
        badge: 'Custom OEM',
    },
    {
        id: 4,
        icon: <CustomerServiceOutlined />,
        title: '24/7 Export Desk',
        desc: 'Our dedicated support team assists international buyers with samples, sizing charts, and tracking.',
        badge: 'Always On',
    },
    {
        id: 5,
        icon: <GiftOutlined />,
        title: 'Bulk Wholesale Pricing',
        desc: 'Competitive factory-direct rates on bulk orders across Sport Wear, Fashion Wear, and Gym Wear.',
        badge: 'Factory Direct',
    },
    {
        id: 6,
        icon: <CheckCircleOutlined />,
        title: 'Quality Inspected',
        desc: 'Every batch manufactured at Waqas Royal goes through strict stitching, fabric, and colorfastness checks.',
        badge: 'Verified',
    },
];

const ServiceCard = ({ service, index }) => {
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.12 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="col-12 col-sm-6 col-lg-4"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.55s ease ${index * 0.08}s`,
            }}
        >
            <div
                className="h-100 rounded-4 p-4 position-relative"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    background: hovered ? '#EAEDE6' : '#FFFFFF',
                    border: hovered ? '1px solid #6E7D60' : '1px solid #E5E5E0',
                    boxShadow: hovered ? '0 14px 30px rgba(20,20,20,0.06)' : '0 2px 10px rgba(20,20,20,0.02)',
                    transition: 'all 0.25s ease',
                    cursor: 'default',
                }}
            >
                <span
                    className="position-absolute top-0 end-0 m-3 px-2 py-1 rounded-pill fw-semibold"
                    style={{
                        fontSize: '10.5px',
                        background: '#F3F3F0',
                        color: '#525E46',
                        border: '1px solid #E5E5E0',
                    }}
                >
                    {service.badge}
                </span>

                <div
                    className="d-flex align-items-center justify-content-center rounded-3 mb-4"
                    style={{
                        width: '54px',
                        height: '54px',
                        fontSize: '22px',
                        color: '#FFFFFF',
                        background: hovered ? '#141414' : '#525E46',
                        transition: 'background 0.25s ease',
                    }}
                >
                    {service.icon}
                </div>

                <h5 className="fw-bold mb-2 text-dark fs-5">{service.title}</h5>
                <p className="mb-0 lh-base" style={{ fontSize: '13.5px', color: '#6A6A64' }}>{service.desc}</p>
            </div>
        </div>
    );
};

const ServiceSection = () => {
    const [headerVisible, setHeaderVisible] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
            { threshold: 0.15 }
        );
        if (headerRef.current) observer.observe(headerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="py-5" style={{ background: '#F7F7F5', borderTop: '1px solid #E5E5E0' }}>
            <div className="container py-4">
                <div
                    ref={headerRef}
                    className="text-center mb-5"
                    style={{
                        opacity: headerVisible ? 1 : 0,
                        transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.6s ease, transform 0.6s ease',
                    }}
                >
                    <span
                        className="px-3 py-1 rounded-pill fw-bold d-inline-block mb-3"
                        style={{
                            background: '#EAEDE6',
                            color: '#525E46',
                            fontSize: '11.5px',
                            letterSpacing: '1.2px',
                            textTransform: 'uppercase',
                        }}
                    >
                        What We Offer
                    </span>
                    <h2 className="fw-bold text-dark mb-3" style={{ fontSize: '2.1rem', letterSpacing: '-0.5px' }}>
                        Export Services &amp; Standards
                    </h2>
                    <p className="mx-auto fs-6 lh-lg" style={{ maxWidth: '540px', color: '#6A6A64' }}>
                        Built for international apparel buyers and direct customers alike — consistent quality from factory floor to doorstep.
                    </p>
                </div>

                <div className="row g-4">
                    {services.map((service, i) => (
                        <ServiceCard key={service.id} service={service} index={i} />
                    ))}
                </div>

                <div
                    className="mt-5 pt-2 d-flex justify-content-center"
                    style={{ opacity: headerVisible ? 1 : 0, transition: 'opacity 0.8s ease 0.3s' }}
                >
                    <style>{`
                        .wr-partner-pill {
                            border-radius: 999px;
                        }
                        @media (max-width: 575.98px) {
                            .wr-partner-pill {
                                border-radius: 20px !important;
                                padding: 18px 16px !important;
                                text-align: center;
                            }
                            .wr-partner-pill .btn {
                                width: 100%;
                            }
                        }
                    `}</style>
                    <div
                        className="wr-partner-pill d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 gap-sm-4 p-3 px-sm-4 py-sm-3 border shadow-sm"
                        style={{
                            background: '#FFFFFF',
                            borderColor: '#E5E5E0',
                            maxWidth: '580px',
                            width: '100%',
                            transition: 'all 0.25s ease',
                        }}
                    >
                        <div className="text-center text-sm-start min-w-0">
                            <div className="fw-bold text-dark" style={{ fontSize: '15px', letterSpacing: '-0.2px' }}>
                                Looking for a manufacturing partner?
                            </div>
                            <div style={{ fontSize: '12.5px', color: '#6A6A64', marginTop: '2px' }}>
                                Browse ready stock or request custom export quotes.
                            </div>
                        </div>
                        <Link
                            to="/sport-wear"
                            className="btn rounded-pill text-white fw-semibold px-4 flex-shrink-0 border-0"
                            style={{
                                background: '#141414',
                                fontSize: '13.5px',
                                padding: '10px 24px',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#525E46';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#141414';
                                e.currentTarget.style.transform = 'none';
                            }}
                        >
                            Shop Now →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceSection;
