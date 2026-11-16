import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ShoppingFilled,
    RocketFilled,
    SafetyCertificateFilled,
    SyncOutlined,
    CustomerServiceFilled,
    WhatsAppOutlined,
    FacebookFilled,
    InstagramFilled,
    GlobalOutlined,
    EnvironmentFilled,
    PhoneFilled,
    MailFilled,
    ClockCircleFilled,
    SendOutlined,
    RightOutlined,
    LockFilled,
    CreditCardFilled,
    CheckCircleFilled
} from '@ant-design/icons'

const Footer = () => {
    const year = new Date().getFullYear()
    const [newsletterEmail, setNewsletterEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (newsletterEmail) {
            setSubscribed(true)
            if (window.toastify) {
                window.toastify('Subscribed to Waqas Royal newsletter successfully!', 'success')
            }
            setNewsletterEmail('')
            setTimeout(() => setSubscribed(false), 5000)
        }
    }

    return (
        <footer
            className="position-relative overflow-hidden w-100"
            style={{
                background: '#F7F7F5',
                color: '#141414',
                borderTop: '1px solid #E5E5E0',
                fontFamily: "'Inter', sans-serif"
            }}
        >
            {/* ── Top Highlights Strip ── */}
            <div
                className="py-4"
                style={{
                    background: '#FFFFFF',
                    borderBottom: '1px solid #E5E5E0'
                }}
            >
                <div className="container py-1">
                    <div className="row g-3 text-center text-md-start">
                        {[
                            {
                                icon: <RocketFilled style={{ color: '#525E46', fontSize: '20px' }} />,
                                title: 'Worldwide Export',
                                desc: 'Air & sea freight support'
                            },
                            {
                                icon: <SafetyCertificateFilled style={{ color: '#525E46', fontSize: '20px' }} />,
                                title: '100% Secure Checkout',
                                desc: 'Protected by SSL encryption'
                            },
                            {
                                icon: <SyncOutlined style={{ color: '#525E46', fontSize: '19px' }} />,
                                title: 'Custom OEM Orders',
                                desc: 'Private label manufacturing'
                            },
                            {
                                icon: <CustomerServiceFilled style={{ color: '#525E46', fontSize: '20px' }} />,
                                title: '24/7 Dedicated Support',
                                desc: 'Always ready to assist you'
                            },
                        ].map((item, idx) => (
                            <div key={idx} className="col-12 col-sm-6 col-lg-3">
                                <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 p-2">
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                                        style={{
                                            width: '44px',
                                            height: '44px',
                                            background: '#EAEDE6',
                                            border: '1px solid #DCE1D6',
                                        }}
                                    >
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h6 className="fw-bold mb-0 fs-6" style={{ color: '#141414' }}>{item.title}</h6>
                                        <p className="mb-0" style={{ fontSize: '12px', color: '#6A6A64' }}>{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Main Footer Grid ── */}
            <div className="container py-5">
                <div className="row g-4 g-lg-5 pt-2">

                    {/* Column 1: Brand & About */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none mb-3">
                            <img
                                src="/images/waqas-royal-logo.jpg"
                                alt="Waqas Royal Crest Logo"
                                style={{
                                    width: '42px',
                                    height: '42px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '1.5px solid rgba(212, 175, 55, 0.55)',
                                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.12)',
                                    display: 'block',
                                    flexShrink: 0,
                                }}
                            />
                            <span className="fw-bold fs-3" style={{ color: '#141414', letterSpacing: '-0.5px' }}>
                                Waqas <span style={{ color: '#6E7D60' }}>Royal.</span>
                            </span>
                        </Link>
                        <p className="small mb-4 pe-lg-3 lh-base" style={{ fontSize: '14px', color: '#6A6A64' }}>
                            Waqas Royal is a trusted export manufacturer and apparel brand specializing in Sport Wear, Fashion Wear, and Gym Wear for global markets.
                        </p>

                        {/* Social Buttons */}
                        <div className="d-flex gap-2 flex-wrap">
                            {[
                                {
                                    icon: <WhatsAppOutlined />,
                                    name: 'WhatsApp',
                                    href: 'https://wa.me/923705326459',
                                },
                                {
                                    icon: <FacebookFilled />,
                                    name: 'Facebook',
                                    href: 'https://www.facebook.com/profile.php?id=61587514156324',
                                },
                                {
                                    icon: <InstagramFilled />,
                                    name: 'Instagram',
                                    href: 'https://www.facebook.com/profile.php?id=61587514156324',
                                },
                                {
                                    icon: <GlobalOutlined />,
                                    name: 'Website',
                                    href: 'https://my-store-eta-ten.vercel.app',
                                },
                            ].map((s, idx) => (
                                <a
                                    key={idx}
                                    href={s.href}
                                    target={s.href.startsWith('http') ? '_blank' : '_self'}
                                    rel="noreferrer"
                                    title={s.name}
                                    className="d-inline-flex align-items-center justify-content-center text-decoration-none rounded-circle"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        background: '#FFFFFF',
                                        color: '#141414',
                                        border: '1px solid #E5E5E0',
                                        fontSize: '17px',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#141414'
                                        e.currentTarget.style.color = '#FFFFFF'
                                        e.currentTarget.style.borderColor = '#141414'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#FFFFFF'
                                        e.currentTarget.style.color = '#141414'
                                        e.currentTarget.style.borderColor = '#E5E5E0'
                                    }}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="col-6 col-md-3 col-lg-2">
                        <h6
                            className="fw-bold mb-3 pb-2 d-inline-block"
                            style={{
                                fontSize: '14px',
                                letterSpacing: '0.5px',
                                color: '#141414',
                                borderBottom: '2px solid #6E7D60'
                            }}
                        >
                            Quick Links
                        </h6>
                        <ul className="list-unstyled m-0 d-flex flex-column gap-2">
                            {[
                                { to: '/', label: 'Home Page' },
                                { to: '/sport-wear', label: 'Sport Wear' },
                                { to: '/fashion-wear', label: 'Fashion Wear' },
                                { to: '/gym-wear', label: 'Gym Wear' },
                                { to: '/about', label: 'About Us' },
                                { to: '/contact', label: 'Contact Us' },
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={link.to}
                                        className="text-decoration-none small d-inline-flex align-items-center gap-2"
                                        style={{ fontSize: '13.5px', color: '#5A5A54', fontWeight: 500, transition: 'all 0.2s ease' }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = '#141414'
                                            e.currentTarget.style.transform = 'translateX(3px)'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = '#5A5A54'
                                            e.currentTarget.style.transform = 'translateX(0)'
                                        }}
                                    >
                                        <RightOutlined style={{ fontSize: '9px', color: '#6E7D60' }} />
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Support & Contact */}
                    <div className="col-6 col-md-3 col-lg-2">
                        <h6
                            className="fw-bold mb-3 pb-2 d-inline-block"
                            style={{
                                fontSize: '14px',
                                letterSpacing: '0.5px',
                                color: '#141414',
                                borderBottom: '2px solid #6E7D60'
                            }}
                        >
                            Support &amp; Contact
                        </h6>
                        <ul className="list-unstyled m-0 d-flex flex-column gap-3">
                            <li className="d-flex align-items-center gap-2 small" style={{ fontSize: '13px', color: '#5A5A54' }}>
                                <EnvironmentFilled style={{ color: '#525E46', fontSize: '14px' }} />
                                <span>Waqas Royal, Sialkot, Pakistan</span>
                            </li>
                            <li className="d-flex align-items-center gap-2 small" style={{ fontSize: '13px', color: '#5A5A54' }}>
                                <PhoneFilled style={{ color: '#525E46', fontSize: '14px' }} />
                                <span>+92 370 5326459</span>
                            </li>
                            <li className="d-flex align-items-center gap-2 small" style={{ fontSize: '13px', color: '#5A5A54' }}>
                                <MailFilled style={{ color: '#525E46', fontSize: '14px' }} />
                                <span style={{ wordBreak: 'break-all' }}>waqasroyal08@gmail.com</span>
                            </li>
                            <li className="d-flex align-items-center gap-2 small" style={{ fontSize: '13px', color: '#5A5A54' }}>
                                <ClockCircleFilled style={{ color: '#525E46', fontSize: '14px' }} />
                                <span>Mon-Sat: 9am - 6pm</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter Card */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <div
                            className="p-4 rounded-4"
                            style={{
                                background: '#FFFFFF',
                                border: '1px solid #E5E5E0',
                                boxShadow: '0 4px 16px rgba(20, 20, 20, 0.04)',
                            }}
                        >
                            <div className="d-flex align-items-center gap-2 mb-2">
                                <div
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '8px',
                                        background: '#EAEDE6',
                                        color: '#525E46',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '15px'
                                    }}
                                >
                                    <MailFilled />
                                </div>
                                <h6 className="fw-bold mb-0" style={{ fontSize: '15px', color: '#141414' }}>
                                    Subscribe Newsletter
                                </h6>
                            </div>
                            <p className="small mb-3 lh-sm" style={{ fontSize: '12.5px', color: '#6A6A64' }}>
                                Get updates on new export apparel drops, wholesale catalogs, and seasonal offers.
                            </p>

                            {subscribed ? (
                                <div
                                    className="d-flex align-items-center justify-content-center gap-2 small p-2 text-center rounded-3 mb-0"
                                    style={{ background: '#EAEDE6', border: '1px solid #C8D1BE', color: '#3F4A36' }}
                                >
                                    <CheckCircleFilled />
                                    <span>Subscribed! Thank you.</span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="d-flex flex-column gap-2">
                                    <input
                                        type="email"
                                        className="form-control rounded-pill px-3 py-2 shadow-none small"
                                        placeholder="Enter your email address..."
                                        value={newsletterEmail}
                                        onChange={e => setNewsletterEmail(e.target.value)}
                                        required
                                        style={{
                                            fontSize: '13px',
                                            background: '#F7F7F5',
                                            border: '1px solid #E5E5E0',
                                            color: '#141414',
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        className="btn rounded-pill py-2 fw-semibold small text-white d-flex align-items-center justify-content-center gap-2 border-0"
                                        style={{
                                            background: '#141414',
                                            transition: 'opacity 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88' }}
                                        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
                                    >
                                        <span>Subscribe Now</span>
                                        <SendOutlined />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* ── Bottom Bar ── */}
            <div
                className="py-3"
                style={{
                    background: '#EFEFEA',
                    borderTop: '1px solid #E5E5E0'
                }}
            >
                <div className="container">
                    <div className="row align-items-center g-3 text-center text-md-start">
                        <div className="col-12 col-md-6 small" style={{ fontSize: '13px', color: '#6A6A64' }}>
                            © {year} <span className="fw-bold" style={{ color: '#141414' }}>Waqas Royal</span>. All rights reserved.
                        </div>
                        <div className="col-12 col-md-6 text-md-end">
                            <div className="d-inline-flex align-items-center gap-2 flex-wrap justify-content-center justify-content-md-end">
                                <span
                                    className="badge d-inline-flex align-items-center gap-1 px-3 py-2 rounded-pill"
                                    style={{ background: '#FFFFFF', border: '1px solid #E5E5E0', color: '#141414', fontSize: '11px', fontWeight: 600 }}
                                >
                                    <CreditCardFilled style={{ color: '#525E46' }} />
                                    <span>Cash on Delivery</span>
                                </span>
                                <span
                                    className="badge d-inline-flex align-items-center gap-1 px-3 py-2 rounded-pill"
                                    style={{ background: '#FFFFFF', border: '1px solid #E5E5E0', color: '#141414', fontSize: '11px', fontWeight: 600 }}
                                >
                                    <LockFilled style={{ color: '#525E46' }} />
                                    <span>Secure SSL 256-Bit</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    )
}

export default Footer
