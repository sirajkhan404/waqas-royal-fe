import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/Auth';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import CartSidebar from '../CartSidebar';
import FavoritesSidebar from '../FavoritesSidebar';
import {
    CloseOutlined,
    ShoppingOutlined,
    ShoppingCartOutlined,
    HeartOutlined,
    HeartFilled,
    DownOutlined,
    GlobalOutlined,
    PhoneOutlined,
    MailOutlined,
    UserOutlined,
    RightOutlined,
    AppstoreOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';

const CATEGORY_LINKS = [
    { to: '/sport-wear', label: 'Sport Wear', badge: 'Kits & Jerseys', dot: '#525E46' },
    { to: '/fashion-wear', label: 'Fashion Wear', badge: 'Streetwear', dot: '#6E7D60' },
    { to: '/gym-wear', label: 'Gym Wear', badge: 'Compression', dot: '#141414' },
];

const NAV_LINKS = [
    { to: '/', label: 'Home' },
    { to: '/sport-wear', label: 'Sport Wear' },
    { to: '/fashion-wear', label: 'Fashion Wear' },
    { to: '/gym-wear', label: 'Gym Wear' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
    const { isAuth, handleLogout, user } = useAuth();
    const { totalItems, totalAmount } = useCart();
    const { totalFavorites } = useFavorites();
    const location = useLocation();

    const [scrolled, setScrolled] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [favoritesOpen, setFavoritesOpen] = useState(false);
    const [showTopBar, setShowTopBar] = useState(true);

    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close mobile drawer on route change
    useEffect(() => {
        setSidebarOpen(false);
        setDropdownOpen(false);
    }, [location.pathname]);

    // Handle scroll styling
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
            setScrolled(scrollY > 15);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent background scrolling when mobile drawer is open
    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        };
    }, [sidebarOpen]);

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <style>{`
                /* ── Navbar Global Animations & Styles ── */
                .wr-nav-pill-link {
                    font-size: 13.5px;
                    font-weight: 500;
                    padding: 7px 15px;
                    border-radius: 999px;
                    text-decoration: none;
                    white-space: nowrap;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
                    color: #3A3A36;
                    background: transparent;
                }
                .wr-nav-pill-link:hover {
                    color: #141414;
                    background: rgba(82, 94, 70, 0.08);
                }
                .wr-nav-pill-link.active {
                    color: #FFFFFF;
                    background: #141414;
                    font-weight: 600;
                    box-shadow: 0 2px 8px rgba(20, 20, 20, 0.15);
                }
                .wr-action-btn {
                    height: 40px;
                    border-radius: 999px;
                    border: 1px solid #E5E5E0;
                    background: #FFFFFF;
                    color: #141414;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 7px;
                    font-size: 13px;
                    font-weight: 600;
                    padding: 0 14px;
                    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                    text-decoration: none;
                }
                .wr-action-btn:hover {
                    background: #F7F7F5;
                    border-color: #D5D5CE;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
                    color: #141414;
                }
                .wr-action-icon-only {
                    width: 40px;
                    height: 40px;
                    padding: 0;
                }
                .wr-drawer-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 14px;
                    border-radius: 14px;
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 600;
                    color: #1F1F1D;
                    transition: all 0.2s ease;
                }
                .wr-drawer-item:hover {
                    background: #F3F3F0;
                    color: #141414;
                }
                .wr-drawer-item.active {
                    background: #141414;
                    color: #FFFFFF !important;
                }
                .wr-badge-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    display: inline-block;
                }
                /* Top Announcement marquee / links */
                .wr-top-link {
                    color: #5A5A54;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.18s ease;
                }
                .wr-top-link:hover {
                    color: #141414;
                }
            `}</style>

            {/* ── Fixed Header Wrapper ── */}
            <header className="fixed-top w-100" style={{ zIndex: 1040 }}>
                {/* 1. Optional Top Announcement Bar */}
                {showTopBar && (
                    <div
                        className="w-100"
                        style={{
                            background: '#F7F7F5',
                            borderBottom: '1px solid #E5E5E0',
                            fontSize: '11.5px',
                            color: '#5A5A54',
                            height: '34px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div className="container-fluid container-xl px-3 px-sm-4 d-flex align-items-center justify-content-between gap-2">
                            {/* Left: Tagline & Live Export */}
                            <div className="d-flex align-items-center gap-2 text-truncate">
                                <span
                                    className="d-inline-flex align-items-center gap-1 px-2 py-0 rounded-pill fw-bold flex-shrink-0"
                                    style={{
                                        background: '#EAEDE6',
                                        color: '#525E46',
                                        border: '1px solid #DCE1D6',
                                        fontSize: '10px',
                                        lineHeight: '18px',
                                    }}
                                >
                                    <GlobalOutlined style={{ fontSize: '9.5px' }} /> Worldwide Export
                                </span>
                                <span className="text-truncate d-none d-sm-inline" style={{ color: '#5A5A54' }}>
                                    Direct Sialkot Apparel Manufacturer · Custom OEM &amp; Bulk Orders
                                </span>
                                <span className="text-truncate d-inline d-sm-none" style={{ color: '#5A5A54', fontSize: '11px' }}>
                                    Custom Export Apparel
                                </span>
                            </div>

                            {/* Right: Quick Contacts & Close */}
                            <div className="d-flex align-items-center gap-3 flex-shrink-0">
                                <a
                                    href="tel:+92 370 5326459"
                                    className="wr-top-link d-none d-md-inline-flex align-items-center gap-1"
                                >
                                    <PhoneOutlined style={{ color: '#525E46', fontSize: '11px' }} />
                                    <span>+92 370 5326459</span>
                                </a>

                                <span className="d-none d-lg-inline" style={{ color: '#D5D5CE' }}>|</span>

                                <a
                                    href="mailto:sirajkhank819@gmail.com"
                                    className="wr-top-link d-none d-lg-inline-flex align-items-center gap-1"
                                >
                                    <MailOutlined style={{ color: '#525E46', fontSize: '11px' }} />
                                    <span>Export Desk</span>
                                </a>

                                <button
                                    type="button"
                                    onClick={() => setShowTopBar(false)}
                                    className="btn btn-link p-0 text-decoration-none border-0 shadow-none d-inline-flex align-items-center"
                                    style={{ color: '#6A6A64', fontSize: '11px', lineHeight: 1 }}
                                    aria-label="Close announcement bar"
                                    title="Close topbar"
                                >
                                    <CloseOutlined />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. Main Navigation Bar */}
                <nav
                    className="w-100"
                    style={{
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.98)',
                        borderBottom: '1px solid #E5E5E0',
                        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none',
                        padding: scrolled ? '8px 0' : '11px 0',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                >
                    <div className="container-fluid container-xl px-3 px-sm-4 d-flex align-items-center justify-content-between gap-3">
                        {/* ── Brand Logo ── */}
                        <Link
                            to="/"
                            className="d-flex align-items-center gap-2 text-decoration-none flex-shrink-0"
                            style={{ transition: 'transform 0.2s ease' }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                        >
                            <img
                                src="/images/waqas-royal-logo.jpg"
                                alt="Waqas Royal Crest Logo"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '1.5px solid rgba(212, 175, 55, 0.65)',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                                    display: 'block',
                                    flexShrink: 0,
                                }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            <div className="d-flex flex-column">
                                <span className="fw-black lh-1" style={{ fontSize: '1.25rem', letterSpacing: '-0.3px', color: '#141414', fontWeight: 800 }}>
                                    Waqas<span style={{ color: '#525E46' }}>Royal</span>
                                </span>
                                <span
                                    style={{
                                        fontSize: '8.5px',
                                        letterSpacing: '1.4px',
                                        textTransform: 'uppercase',
                                        color: '#6E7D60',
                                        fontWeight: 700,
                                        marginTop: '3px',
                                    }}
                                >
                                    Export Apparel
                                </span>
                            </div>
                        </Link>

                        {/* ── Desktop Center Navigation Links (Visible on >= 992px) ── */}
                        <div
                            className="d-none d-lg-flex align-items-center"
                            style={{
                                gap: '3px',
                                padding: '4px 6px',
                                borderRadius: '999px',
                                background: '#F7F7F5',
                                border: '1px solid #E5E5E0',
                            }}
                        >
                            {NAV_LINKS.map((link) => {
                                const active = isActive(link.to);
                                return (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className={`wr-nav-pill-link ${active ? 'active' : ''}`}
                                    >
                                        <span>{link.label}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* ── Desktop Right Actions (Visible on >= 992px) ── */}
                        <div className="d-none d-lg-flex align-items-center gap-2 flex-shrink-0">
                            {/* 1. Wishlist Button */}
                            <button
                                type="button"
                                onClick={() => setFavoritesOpen(true)}
                                className="wr-action-btn position-relative"
                                title="My Wishlist / Favorites"
                            >
                                {totalFavorites > 0 ? (
                                    <HeartFilled style={{ fontSize: '15px', color: '#EF4444' }} />
                                ) : (
                                    <HeartOutlined style={{ fontSize: '15px', color: '#3A3A36' }} />
                                )}
                                <span className="d-none d-xl-inline">Wishlist</span>
                                {totalFavorites > 0 && (
                                    <span
                                        className="badge rounded-pill fw-bold"
                                        style={{
                                            background: '#EF4444',
                                            color: '#FFFFFF',
                                            fontSize: '10px',
                                            minWidth: '18px',
                                            padding: '2px 5px',
                                        }}
                                    >
                                        {totalFavorites}
                                    </span>
                                )}
                            </button>

                            {/* 2. Cart Button */}
                            <button
                                type="button"
                                onClick={() => setCartOpen(true)}
                                className="wr-action-btn position-relative"
                                title="Shopping Cart"
                            >
                                <ShoppingCartOutlined style={{ fontSize: '16px', color: '#3A3A36' }} />
                                <span className="d-none d-xl-inline">Cart</span>
                                {totalItems > 0 && (
                                    <span
                                        className="badge rounded-pill fw-bold"
                                        style={{
                                            background: '#525E46',
                                            color: '#FFFFFF',
                                            fontSize: '10px',
                                            minWidth: '18px',
                                            padding: '2px 5px',
                                        }}
                                    >
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            {/* 3. User Auth / Profile Dropdown */}
                            {isAuth ? (
                                <div className="position-relative" ref={dropdownRef}>
                                    <button
                                        type="button"
                                        className="btn d-flex align-items-center gap-2 p-1 pe-3 rounded-pill"
                                        style={{
                                            background: '#F7F7F5',
                                            border: '1px solid #E5E5E0',
                                            color: '#141414',
                                            height: '40px',
                                        }}
                                        onClick={() => setDropdownOpen((prev) => !prev)}
                                        aria-expanded={dropdownOpen}
                                    >
                                        <div
                                            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold overflow-hidden flex-shrink-0"
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                background: '#525E46',
                                                fontSize: '13px',
                                            }}
                                        >
                                            {user?.profilePicture ? (
                                                <img
                                                    src={user.profilePicture}
                                                    alt="DP"
                                                    className="w-100 h-100 object-fit-cover"
                                                />
                                            ) : (
                                                user?.fullName?.charAt(0)?.toUpperCase() || 'U'
                                            )}
                                        </div>
                                        <div className="d-flex flex-column text-start lh-1">
                                            <span
                                                className="fw-bold text-truncate"
                                                style={{ maxWidth: '90px', fontSize: '12.5px' }}
                                            >
                                                {user?.fullName?.split(' ')[0] || 'Account'}
                                            </span>
                                            <span style={{ fontSize: '9.5px', color: '#6E7D60', fontWeight: 600 }}>
                                                {user?.role === 'superAdmin' ? 'Admin' : 'Member'}
                                            </span>
                                        </div>
                                        <DownOutlined
                                            style={{
                                                fontSize: '9px',
                                                opacity: 0.6,
                                                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.2s ease',
                                            }}
                                        />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {dropdownOpen && (
                                        <div
                                            className="position-absolute end-0 mt-2 bg-white rounded-4 shadow-lg border overflow-hidden py-2"
                                            style={{ width: '230px', zIndex: 1200, borderColor: '#E5E5E0' }}
                                        >
                                            <div className="px-3 py-2 mb-1 border-bottom" style={{ background: '#F7F7F5' }}>
                                                <div className="fw-bold text-dark text-truncate" style={{ fontSize: '13.5px' }}>
                                                    {user?.fullName || 'User'}
                                                </div>
                                                <div className="text-muted text-truncate" style={{ fontSize: '11px' }}>
                                                    {user?.email || ''}
                                                </div>
                                                <div className="mt-1">
                                                    <span
                                                        className="badge rounded-pill fw-bold"
                                                        style={{
                                                            fontSize: '9.5px',
                                                            background: user?.role === 'superAdmin' ? '#141414' : '#525E46',
                                                            color: '#FFFFFF',
                                                            padding: '2px 7px',
                                                        }}
                                                    >
                                                        {user?.role === 'superAdmin' ? 'Super Admin' : 'Customer'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="px-1">
                                                <Link
                                                    to="/dashboard"
                                                    className="d-flex align-items-center px-3 py-2 rounded-3 text-decoration-none text-dark fw-semibold"
                                                    style={{ fontSize: '13px' }}
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    Dashboard
                                                </Link>
                                                <Link
                                                    to="/dashboard/profile"
                                                    className="d-flex align-items-center px-3 py-2 rounded-3 text-decoration-none text-dark fw-semibold"
                                                    style={{ fontSize: '13px' }}
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    My Profile
                                                </Link>
                                                <Link
                                                    to="/dashboard/orders"
                                                    className="d-flex align-items-center px-3 py-2 rounded-3 text-decoration-none text-dark fw-semibold"
                                                    style={{ fontSize: '13px' }}
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    My Orders
                                                </Link>
                                                {user?.role === 'superAdmin' && (
                                                    <Link
                                                        to="/dashboard/messages"
                                                        className="d-flex align-items-center px-3 py-2 rounded-3 text-decoration-none text-dark fw-semibold"
                                                        style={{ fontSize: '13px' }}
                                                        onClick={() => setDropdownOpen(false)}
                                                    >
                                                        Customer Messages
                                                    </Link>
                                                )}
                                            </div>

                                            <div className="border-top my-1" />

                                            <div className="px-1">
                                                <button
                                                    type="button"
                                                    className="btn w-100 text-start px-3 py-2 rounded-3 text-danger fw-bold border-0 bg-transparent"
                                                    style={{ fontSize: '13px' }}
                                                    onClick={() => {
                                                        setDropdownOpen(false);
                                                        handleLogout();
                                                    }}
                                                >
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="d-flex align-items-center gap-2">
                                    <Link
                                        to="/auth/login"
                                        className="wr-action-btn"
                                        style={{ height: '40px' }}
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        to="/auth/register"
                                        className="btn rounded-pill fw-semibold text-white border-0 text-nowrap d-flex align-items-center"
                                        style={{
                                            height: '40px',
                                            padding: '0 18px',
                                            background: '#141414',
                                            fontSize: '13px',
                                        }}
                                    >
                                        Get Started →
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* ── Mobile / Tablet Action Icons (Visible on < 992px) ── */}
                        <div className="d-flex d-lg-none align-items-center gap-2">
                            {/* Wishlist */}
                            <button
                                type="button"
                                onClick={() => setFavoritesOpen(true)}
                                className="wr-action-btn wr-action-icon-only position-relative"
                                aria-label="Open Wishlist"
                                title="Wishlist"
                            >
                                {totalFavorites > 0 ? (
                                    <HeartFilled style={{ fontSize: '16px', color: '#EF4444' }} />
                                ) : (
                                    <HeartOutlined style={{ fontSize: '16px', color: '#3A3A36' }} />
                                )}
                                {totalFavorites > 0 && (
                                    <span
                                        className="badge rounded-pill position-absolute top-0 start-100 translate-middle"
                                        style={{ fontSize: '9px', padding: '2px 5px', background: '#EF4444', color: '#FFFFFF' }}
                                    >
                                        {totalFavorites}
                                    </span>
                                )}
                            </button>

                            {/* Cart */}
                            <button
                                type="button"
                                onClick={() => setCartOpen(true)}
                                className="wr-action-btn wr-action-icon-only position-relative"
                                aria-label="Open Cart"
                                title="Cart"
                            >
                                <ShoppingCartOutlined style={{ fontSize: '17px', color: '#3A3A36' }} />
                                {totalItems > 0 && (
                                    <span
                                        className="badge rounded-pill position-absolute top-0 start-100 translate-middle"
                                        style={{ fontSize: '9px', padding: '2px 5px', background: '#525E46', color: '#FFFFFF' }}
                                    >
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Modern Hamburger Button */}
                            <button
                                type="button"
                                className="wr-action-btn wr-action-icon-only"
                                onClick={() => setSidebarOpen((prev) => !prev)}
                                aria-label="Toggle navigation menu"
                                title="Open Menu"
                                style={{
                                    background: sidebarOpen ? '#141414' : '#FFFFFF',
                                    borderColor: sidebarOpen ? '#141414' : '#E5E5E0',
                                }}
                            >
                                <div className="d-flex flex-column align-items-center justify-content-center gap-1" style={{ width: '18px' }}>
                                    <span
                                        style={{
                                            width: '18px',
                                            height: '2px',
                                            background: sidebarOpen ? '#FFFFFF' : '#141414',
                                            borderRadius: '2px',
                                            transition: 'all 0.25s ease',
                                        }}
                                    />
                                    <span
                                        style={{
                                            width: '18px',
                                            height: '2px',
                                            background: sidebarOpen ? '#FFFFFF' : '#141414',
                                            borderRadius: '2px',
                                            transition: 'all 0.25s ease',
                                        }}
                                    />
                                    <span
                                        style={{
                                            width: '14px',
                                            height: '2px',
                                            background: sidebarOpen ? '#FFFFFF' : '#141414',
                                            borderRadius: '2px',
                                            alignSelf: 'flex-start',
                                            transition: 'all 0.25s ease',
                                        }}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Responsive Spacer so page content never goes behind fixed header */}
            <div
                style={{
                    height: showTopBar ? (scrolled ? '76px' : '84px') : (scrolled ? '54px' : '62px'),
                    transition: 'height 0.25s ease',
                }}
            />

            {/* ── Mobile Slide-Over Backdrop ── */}
            <div
                className={`position-fixed top-0 start-0 w-100 h-100 ${sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                style={{
                    zIndex: 9998,
                    background: 'rgba(20, 20, 20, 0.55)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    transition: 'all 0.3s ease',
                }}
                onClick={() => setSidebarOpen(false)}
            />

            {/* ── Mobile & Tablet Slide Drawer ── */}
            <div
                className="position-fixed top-0 h-100 bg-white d-flex flex-column shadow-lg"
                style={{
                    width: '320px',
                    maxWidth: '86vw',
                    left: sidebarOpen ? '0' : '-100%',
                    zIndex: 9999,
                    transition: 'left 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                {/* Header */}
                <div
                    className="p-3 px-4 text-white d-flex align-items-center justify-content-between"
                    style={{ background: '#525E46' }}
                >
                    <Link
                        to="/"
                        className="d-flex align-items-center gap-2 text-decoration-none"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <img
                            src="/images/waqas-royal-logo.jpg"
                            alt="Waqas Royal Crest Logo"
                            style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '1.5px solid rgba(212, 175, 55, 0.65)',
                                display: 'block',
                                flexShrink: 0,
                            }}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                        <div className="d-flex flex-column">
                            <span className="fw-bold fs-5 lh-1 text-white">
                                Waqas<span style={{ color: '#DCE3D5' }}>Royal</span>
                            </span>
                            <span
                                style={{
                                    fontSize: '9px',
                                    letterSpacing: '1.2px',
                                    textTransform: 'uppercase',
                                    color: '#DCE3D5',
                                    fontWeight: 600,
                                    marginTop: '2px',
                                }}
                            >
                                Export Apparel
                            </span>
                        </div>
                    </Link>

                    <button
                        type="button"
                        className="btn btn-sm text-white rounded-circle p-0 d-flex align-items-center justify-content-center border-0 shadow-none"
                        style={{ width: '32px', height: '32px', background: 'rgba(255, 255, 255, 0.16)' }}
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close menu"
                    >
                        <CloseOutlined />
                    </button>
                </div>

                {/* User card if logged in */}
                {isAuth && (
                    <div className="p-3 mx-3 mt-3 rounded-4 border" style={{ background: '#F7F7F5', borderColor: '#E5E5E0' }}>
                        <div className="d-flex align-items-center gap-3">
                            <div
                                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold overflow-hidden flex-shrink-0"
                                style={{ width: '42px', height: '42px', background: '#525E46' }}
                            >
                                {user?.profilePicture ? (
                                    <img src={user.profilePicture} alt="DP" className="w-100 h-100 object-fit-cover" />
                                ) : (
                                    user?.fullName?.charAt(0)?.toUpperCase() || 'U'
                                )}
                            </div>
                            <div className="min-width-0 flex-grow-1">
                                <div className="fw-bold text-dark text-truncate" style={{ fontSize: '13.5px' }}>
                                    {user?.fullName || 'User'}
                                </div>
                                <div className="text-muted text-truncate" style={{ fontSize: '11px' }}>
                                    {user?.email}
                                </div>
                                <div className="mt-1">
                                    <span
                                        className="badge rounded-pill fw-bold"
                                        style={{
                                            fontSize: '9px',
                                            background: user?.role === 'superAdmin' ? '#141414' : '#525E46',
                                            color: '#FFFFFF',
                                            padding: '2px 7px',
                                        }}
                                    >
                                        {user?.role === 'superAdmin' ? 'Super Admin' : 'Customer'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Links Area */}
                <div className="flex-grow-1 py-3 px-3 overflow-auto">
                    <div
                        className="text-muted fw-bold text-uppercase px-2 mb-2"
                        style={{ fontSize: '10px', letterSpacing: '1px' }}
                    >
                        Explore Collections
                    </div>

                    <div className="d-flex flex-column gap-1">
                        {NAV_LINKS.map((l) => {
                            const active = isActive(l.to);
                            const cat = CATEGORY_LINKS.find((c) => c.to === l.to);
                            return (
                                <Link
                                    key={l.to}
                                    to={l.to}
                                    className={`wr-drawer-item ${active ? 'active' : ''}`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <div className="d-flex align-items-center gap-2">
                                        {cat && (
                                            <span
                                                className="wr-badge-dot"
                                                style={{ background: active ? '#FFFFFF' : cat.dot }}
                                            />
                                        )}
                                        <span>{l.label}</span>
                                    </div>
                                    <RightOutlined style={{ fontSize: '11px', opacity: active ? 0.9 : 0.4 }} />
                                </Link>
                            );
                        })}
                    </div>

                    {isAuth && (
                        <>
                            <div
                                className="text-muted fw-bold text-uppercase px-2 mt-4 mb-2"
                                style={{ fontSize: '10px', letterSpacing: '1px' }}
                            >
                                My Account
                            </div>
                            <div className="d-flex flex-column gap-1">
                                <Link to="/dashboard" className="wr-drawer-item" onClick={() => setSidebarOpen(false)}>
                                    <span>Dashboard Overview</span>
                                    <RightOutlined style={{ fontSize: '11px', opacity: 0.4 }} />
                                </Link>
                                <Link to="/dashboard/profile" className="wr-drawer-item" onClick={() => setSidebarOpen(false)}>
                                    <span>Profile Settings</span>
                                    <RightOutlined style={{ fontSize: '11px', opacity: 0.4 }} />
                                </Link>
                                <Link to="/dashboard/orders" className="wr-drawer-item" onClick={() => setSidebarOpen(false)}>
                                    <span>My Orders</span>
                                    <RightOutlined style={{ fontSize: '11px', opacity: 0.4 }} />
                                </Link>
                                {user?.role === 'superAdmin' && (
                                    <Link to="/dashboard/messages" className="wr-drawer-item" onClick={() => setSidebarOpen(false)}>
                                        <span>Customer Inquiries</span>
                                        <RightOutlined style={{ fontSize: '11px', opacity: 0.4 }} />
                                    </Link>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Drawer Footer Actions */}
                <div className="p-3 border-top" style={{ background: '#F7F7F5', borderColor: '#E5E5E0' }}>
                    {/* View Wishlist */}
                    <button
                        type="button"
                        className="btn w-100 rounded-pill fw-bold mb-2 d-flex align-items-center justify-content-between border text-dark"
                        style={{ padding: '9px 16px', background: '#FFFFFF', borderColor: '#E5E5E0', fontSize: '13.5px' }}
                        onClick={() => {
                            setSidebarOpen(false);
                            setFavoritesOpen(true);
                        }}
                    >
                        <span className="d-flex align-items-center gap-2">
                            <HeartFilled style={{ color: '#EF4444' }} />
                            <span>My Wishlist</span>
                        </span>
                        <span className="badge rounded-pill px-2 py-1 fw-bold" style={{ background: '#FEE2E2', color: '#EF4444', fontSize: '10px' }}>
                            {totalFavorites} saved
                        </span>
                    </button>

                    {/* View Cart */}
                    <button
                        type="button"
                        className="btn w-100 rounded-pill fw-bold mb-2 d-flex align-items-center justify-content-between border-0 text-white"
                        style={{ padding: '9px 16px', background: '#525E46', fontSize: '13.5px' }}
                        onClick={() => {
                            setSidebarOpen(false);
                            setCartOpen(true);
                        }}
                    >
                        <span className="d-flex align-items-center gap-2">
                            <ShoppingCartOutlined />
                            <span>View Cart</span>
                        </span>
                        <span className="badge rounded-pill bg-white text-dark px-2 py-1 fw-bold" style={{ fontSize: '10px' }}>
                            {totalItems} items
                        </span>
                    </button>

                    {/* Sign out or Login */}
                    {isAuth ? (
                        <button
                            type="button"
                            className="btn btn-outline-danger w-100 rounded-pill py-2 fw-semibold mt-1"
                            style={{ fontSize: '13px' }}
                            onClick={() => {
                                handleLogout();
                                setSidebarOpen(false);
                            }}
                        >
                            Sign Out
                        </button>
                    ) : (
                        <div className="d-flex flex-column gap-2 mt-1">
                            <Link
                                to="/auth/login"
                                className="btn btn-outline-dark w-100 rounded-pill py-2 fw-semibold"
                                style={{ fontSize: '13px' }}
                                onClick={() => setSidebarOpen(false)}
                            >
                                Log In
                            </Link>
                            <Link
                                to="/auth/register"
                                className="btn w-100 rounded-pill py-2 fw-semibold text-white border-0"
                                style={{ background: '#141414', fontSize: '13px' }}
                                onClick={() => setSidebarOpen(false)}
                            >
                                Create Free Account →
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Drawers */}
            <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
            <FavoritesSidebar isOpen={favoritesOpen} onClose={() => setFavoritesOpen(false)} />
        </>
    );
};

export default Navbar;
