import React from 'react';
import { Link } from 'react-router-dom';
import {
    ThunderboltOutlined,
    StarFilled,
    AimOutlined,
    CrownOutlined,
    HeartFilled,
    RocketOutlined
} from '@ant-design/icons';

const About = () => {
    return (
        <main className="d-flex flex-column flex-grow-1" style={{ fontFamily: "'Inter', sans-serif" }}>
            {/* ── Hero ── */}
            <section className="text-white text-center position-relative overflow-hidden py-5"
                style={{ background: 'linear-gradient(135deg, #525E46 0%, #6E7D60 100%)' }}>

                <div className="container position-relative py-4" style={{ zIndex: 1 }}>
                    <span className="badge rounded-pill px-3 py-2 mb-3 fw-semibold"
                        style={{ background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', fontSize: '12px' }}>
                        <ThunderboltOutlined className="me-1" /> Our Story
                    </span>
                    <h1 className="fw-extrabold display-5 display-md-4 mb-4" style={{ letterSpacing: '-0.5px' }}>
                        Redefining Global Apparel Export
                    </h1>
                    <p className="lead fs-6 fs-md-5 mb-0 mx-auto opacity-85" style={{ maxWidth: '640px' }}>
                        Waqas Royal started with a clear vision — exporting premium Sport Wear, Fashion Wear, and Gym Wear worldwide with uncompromising quality and trust.
                    </p>
                </div>
            </section>

            {/* ── Stats ── */}
            <div className="container position-relative" style={{ zIndex: 2, marginTop: '-35px' }}>
                <div className="p-4 p-md-5 text-white shadow-sm"
                    style={{ background: '#141414', borderRadius: '24px' }}>
                    <div className="row align-items-center text-center g-4 g-md-0">
                        <div className="col-6 col-md">
                            <div className="fs-2 fs-md-1 fw-bold lh-1">10k+</div>
                            <div className="small opacity-75 mt-1">Happy Customers</div>
                        </div>
                        <div className="d-none d-md-flex col-md-auto justify-content-center">
                            <div className="bg-white opacity-25" style={{ width: '1.5px', height: '50px' }}></div>
                        </div>
                        <div className="col-6 col-md">
                            <div className="fs-2 fs-md-1 fw-bold lh-1">500+</div>
                            <div className="small opacity-75 mt-1">Premium Products</div>
                        </div>
                        <div className="d-none d-md-flex col-md-auto justify-content-center">
                            <div className="bg-white opacity-25" style={{ width: '1.5px', height: '50px' }}></div>
                        </div>
                        <div className="col-6 col-md">
                            <div className="fs-2 fs-md-1 fw-bold lh-1">99%</div>
                            <div className="small opacity-75 mt-1">Positive Reviews</div>
                        </div>
                        <div className="d-none d-md-flex col-md-auto justify-content-center">
                            <div className="bg-white opacity-25" style={{ width: '1.5px', height: '50px' }}></div>
                        </div>
                        <div className="col-6 col-md">
                            <div className="fs-2 fs-md-1 fw-bold lh-1 d-flex align-items-center justify-content-center">5<StarFilled style={{ fontSize: '1.4rem', color: '#fbbf24', marginLeft: 4 }} /></div>
                            <div className="small opacity-75 mt-1">Avg. Rating</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Core Values ── */}
            <section style={{ background: '#F7F7F5' }} className="py-5 py-lg-6">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <span className="small fw-bold text-uppercase" style={{ color: '#525E46', letterSpacing: '1.5px' }}>Our Values</span>
                        <h2 className="fw-bold fs-2 fs-md-1 text-dark mt-2">Why choose Waqas Royal?</h2>
                    </div>
                    <div className="row g-4">
                        {[
                            {
                                icon: <AimOutlined style={{ color: '#525E46' }} />, bg: '#EAEDE6', title: 'Our Mission',
                                text: 'To deliver export-grade Sport Wear, Fashion Wear, and Gym Wear globally with transparent pricing and dependable turnaround.'
                            },
                            {
                                icon: <CrownOutlined style={{ color: '#525E46' }} />, bg: '#EAEDE6', title: 'Premium Quality',
                                text: 'We do not compromise on fabric or stitching. Every batch is inspected for durability, comfort, and international sizing.'
                            },
                            {
                                icon: <HeartFilled style={{ color: '#525E46' }} />, bg: '#EAEDE6', title: 'Customer First',
                                text: 'Our dedicated export & support team ensures your retail and wholesale orders arrive accurately and on schedule.'
                            },
                        ].map((v, i) => (
                            <div key={i} className="col-12 col-md-4">
                                <div className="card bg-white border border-light-subtle h-100 p-4 p-xl-5 text-center shadow-sm rounded-4 transition-all">
                                    <div className="d-flex align-items-center justify-content-center mx-auto mb-4 rounded-4"
                                        style={{ width: '64px', height: '64px', background: v.bg, fontSize: '28px' }}>
                                        {v.icon}
                                    </div>
                                    <h4 className="fw-bold fs-5 fs-md-4 mb-3 text-dark">{v.title}</h4>
                                    <p className="text-muted small fs-6 mb-0 lh-base">{v.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section style={{ background: '#F7F7F5' }} className="py-5">
                <div className="container">
                    <div className="p-4 p-md-5 text-center rounded-4" style={{ background: 'linear-gradient(135deg, #525E46 0%, #6E7D60 100%)' }}>
                        <div className="mb-3"><RocketOutlined style={{ fontSize: '3rem', color: '#FFFFFF' }} /></div>
                        <h3 className="fw-bold fs-3 mb-3 text-white">Ready to experience Waqas Royal?</h3>
                        <p className="mb-4 mx-auto" style={{ maxWidth: '520px', color: 'rgba(255,255,255,0.85)', fontSize: '15px' }}>
                            Explore our Sport Wear, Fashion Wear, and Gym Wear lines crafted for global quality standards.
                        </p>
                        <Link to="/sport-wear"
                            className="btn btn-lg rounded-pill fw-semibold px-4 px-md-5 py-3 text-white"
                            style={{ background: '#141414', border: 'none' }}>
                            Start Shopping Now →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;