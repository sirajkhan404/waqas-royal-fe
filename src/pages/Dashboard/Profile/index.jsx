import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/Auth';
import {
    CameraOutlined,
    CrownOutlined,
    ShoppingOutlined,
    EditOutlined,
    LockOutlined,
    PictureOutlined,
    CheckOutlined,
    SaveOutlined,
    UserOutlined,
    MailOutlined,
    SafetyOutlined,
    CheckCircleOutlined,
    KeyOutlined,
    CalendarOutlined,
    WarningOutlined,
    SafetyCertificateOutlined
} from '@ant-design/icons';

const Profile = () => {
    const { user, readProfile } = useAuth();
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState(user?.fullName || '');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(user?.profilePicture || '');
    const [activeTab, setActiveTab] = useState('edit');
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (!fullName.trim()) return window.toastify("Full name cannot be empty.", "warning");
        try {
            setLoading(true);
            const token = localStorage.getItem('jwt');
            const formData = new FormData();
            formData.append('fullName', fullName);
            if (imageFile) formData.append('image', imageFile);
            const { data } = await axios.put(
                `${window.api}/api/auth/update-profile`, formData,
                { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
            );
            window.toastify(data.message, "success");
            await readProfile(token);
        } catch (err) {
            window.toastify(err.response?.data?.message || "Failed to update profile", "error");
        } finally { setLoading(false); }
    };

    const initials = (fullName || user?.fullName || 'U').charAt(0).toUpperCase();
    const isAdmin = user?.role === 'superAdmin';

    return (
        <div className="p-3 p-sm-4 p-lg-5 text-white position-relative overflow-hidden w-100 flex-grow-1"
            style={{ minHeight: 'calc(100vh - 70px)', background: 'linear-gradient(135deg, #141414 0%, #1A2218 50%, #11150F 100%)', fontFamily: "'Inter', sans-serif" }}>

            {/* Background glowing blurred decorative blobs */}
            <div className="position-fixed rounded-circle pointer-event-none" style={{ top: '80px', right: '80px', width: '300px', height: '300px', background: 'rgba(82,94,70,0.25)', filter: 'blur(60px)', zIndex: 0 }} />
            <div className="position-fixed rounded-circle pointer-event-none" style={{ bottom: '80px', left: '60px', width: '250px', height: '250px', background: 'rgba(245,158,11,0.08)', filter: 'blur(60px)', zIndex: 0 }} />

            <div className="mx-auto position-relative" style={{ maxWidth: '720px', zIndex: 2 }}>

                {/* ── Top Hero Section ── */}
                <div className="card text-white rounded-4 border border-light border-opacity-10 mb-4 overflow-hidden shadow-lg"
                    style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>

                    {/* Shimmer top bar */}
                    <div style={{ height: '3px', background: 'linear-gradient(90deg, #525E46, #A5B68D, #f59e0b, #A5B68D, #525E46)', backgroundSize: '200%' }} />

                    <div className="card-body p-3 p-sm-4 p-md-5 d-flex align-items-center gap-3 gap-sm-4 flex-wrap">

                        {/* Avatar */}
                        <div className="position-relative flex-shrink-0" onClick={() => fileInputRef.current?.click()} style={{ cursor: 'pointer' }}>
                            <div className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center shadow-lg"
                                style={{
                                    width: '80px', height: '80px',
                                    border: '3px solid rgba(220,227,213,0.6)',
                                    background: imagePreview ? '#000' : 'linear-gradient(135deg, #525E46, #141414)',
                                }}>
                                {imagePreview
                                    ? <img src={imagePreview} alt="dp" className="w-100 h-100 object-fit-cover" />
                                    : <span className="fs-2 fw-bold text-white">{initials}</span>
                                }
                            </div>
                            {/* Edit Badge Dot */}
                            <div className="position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-content-center text-white shadow-sm"
                                style={{
                                    width: '28px', height: '28px',
                                    background: 'linear-gradient(135deg,#525E46,#141414)',
                                    border: '2px solid #141414',
                                    fontSize: '12px'
                                }}>
                                <CameraOutlined />
                            </div>
                            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="d-none" />
                        </div>

                        {/* Name & Info */}
                        <div className="flex-grow-1 min-width-0">
                            <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                                <h2 className="fw-extrabold fs-4 mb-0 text-white" style={{ letterSpacing: '-0.5px' }}>
                                    {user?.fullName}
                                </h2>
                                <span className="badge rounded-pill fw-bold"
                                    style={{
                                        fontSize: '11px',
                                        padding: '4px 12px',
                                        background: isAdmin ? 'rgba(245,158,11,0.2)' : 'rgba(82,94,70,0.3)',
                                        color: isAdmin ? '#fbbf24' : '#DCE3D5',
                                        border: `1px solid ${isAdmin ? 'rgba(245,158,11,0.4)' : 'rgba(165,182,141,0.5)'}`
                                    }}>
                                    {isAdmin ? <><CrownOutlined className="me-1" /> Super Admin</> : <><ShoppingOutlined className="me-1" /> Customer</>}
                                </span>
                            </div>
                            <div className="small text-white-50 mb-3 text-break">{user?.email}</div>

                            {/* Mini stats */}
                            <div className="d-flex gap-4 flex-wrap">
                                {[
                                    { label: 'Status', value: user?.status || 'active', color: '#4ade80' },
                                    { label: 'Member since', value: user?.createdAt ? new Date(user.createdAt).getFullYear() : '2024', color: '#fb923c' },
                                    { label: 'Account', value: 'Verified', color: '#DCE3D5' },
                                ].map((s, i) => (
                                    <div key={i}>
                                        <div className="text-white-50 text-uppercase fw-semibold" style={{ fontSize: '10px', letterSpacing: '0.8px' }}>{s.label}</div>
                                        <div className="fw-bold text-capitalize mt-1" style={{ fontSize: '13px', color: s.color }}>{s.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* ── Tabs ── */}
                <div className="d-flex gap-2 mb-3">
                    {[
                        { key: 'edit', icon: <EditOutlined />, label: 'Edit Profile' },
                        { key: 'security', icon: <SafetyCertificateOutlined />, label: 'Security' },
                    ].map(tab => (
                        <button key={tab.key}
                            className={`btn rounded-3 px-4 py-2 fw-semibold d-flex align-items-center gap-2 border ${activeTab === tab.key ? 'text-white border-light' : 'text-white-50 bg-white bg-opacity-10 border-light border-opacity-10'}`}
                            onClick={() => setActiveTab(tab.key)}
                            style={{
                                fontSize: '13.5px',
                                background: activeTab === tab.key ? '#525E46' : 'rgba(255,255,255,0.05)',
                                color: activeTab === tab.key ? '#ffffff' : 'rgba(255,255,255,0.6)',
                                borderColor: activeTab === tab.key ? '#6E7D60' : 'rgba(255,255,255,0.1)'
                            }}>
                            <span>{tab.icon}</span><span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* ── Edit Tab ── */}
                {activeTab === 'edit' && (
                    <div className="card text-white rounded-4 border border-light border-opacity-10 p-3 p-sm-4 p-md-5 shadow-lg"
                        style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
                        <form onSubmit={handleUpdateProfile}>
                            <div className="row g-3 mb-4">

                                {/* Full Name */}
                                <div className="col-12 col-md-6">
                                    <label className="form-label text-white-50 text-uppercase fw-bold mb-2" style={{ fontSize: '11px', letterSpacing: '1px' }}>
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control bg-dark bg-opacity-25 border border-light border-opacity-15 text-white rounded-3 px-3 py-2.5 shadow-none"
                                        value={fullName}
                                        onChange={e => setFullName(e.target.value)}
                                        placeholder="Your full name"
                                        style={{ fontSize: '14px' }}
                                    />
                                </div>

                                {/* Email */}
                                <div className="col-12 col-md-6">
                                    <label className="form-label text-white-50 text-uppercase fw-bold mb-2" style={{ fontSize: '11px', letterSpacing: '1px' }}>
                                        Email Address
                                    </label>
                                    <div className="position-relative">
                                        <input
                                            type="email"
                                            value={user?.email || ''}
                                            disabled
                                            className="form-control bg-dark bg-opacity-10 border border-light border-opacity-10 text-white-50 ps-5 rounded-3 py-2.5"
                                            style={{ fontSize: '14px', cursor: 'not-allowed' }}
                                        />
                                        <span className="position-absolute top-50 start-0 translate-middle-y ms-3 opacity-50"><LockOutlined /></span>
                                    </div>
                                    <small className="text-white-50 opacity-75 mt-1 d-block" style={{ fontSize: '11px' }}>Cannot be changed</small>
                                </div>
                            </div>

                            {/* Photo Upload */}
                            <div className="mb-4">
                                <label className="form-label text-white-50 text-uppercase fw-bold mb-2" style={{ fontSize: '11px', letterSpacing: '1px' }}>
                                    Profile Photo
                                </label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="rounded-4 p-3 p-md-4 d-flex align-items-center gap-3 cursor-pointer border border-dashed transition-all"
                                    style={{
                                        borderColor: imageFile ? 'rgba(165,182,141,0.7)' : 'rgba(255,255,255,0.15)',
                                        background: imageFile ? 'rgba(82,94,70,0.25)' : 'rgba(255,255,255,0.03)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div className="rounded-3 overflow-hidden flex-shrink-0 d-flex align-items-center justify-content-center bg-white bg-opacity-10 border border-light border-opacity-10"
                                        style={{ width: '52px', height: '52px' }}>
                                        {imagePreview
                                            ? <img src={imagePreview} alt="" className="w-100 h-100 object-fit-cover" />
                                            : <span className="fs-4 text-white-50"><PictureOutlined /></span>
                                        }
                                    </div>
                                    <div className="min-width-0">
                                        <div className="fw-semibold small text-truncate" style={{ color: imageFile ? '#DCE3D5' : 'rgba(255,255,255,0.7)' }}>
                                            {imageFile ? <><CheckOutlined className="me-1" /> {imageFile.name}</> : 'Click to upload a new photo'}
                                        </div>
                                        <div className="text-white-50 opacity-75 mt-1" style={{ fontSize: '11px' }}>PNG, JPG or GIF · Max 5MB</div>
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn text-white w-100 rounded-pill py-3 fw-bold shadow-lg border-0"
                                style={{
                                    background: loading ? 'rgba(82,94,70,0.5)' : 'linear-gradient(135deg, #525E46 0%, #3F4935 50%, #141414 100%)',
                                    fontSize: '15px',
                                    boxShadow: '0 4px 20px rgba(82,94,70,0.35)'
                                }}
                            >
                                {loading ? (
                                    <><span className="spinner-border spinner-border-sm me-2" role="status" />Saving Changes...</>
                                ) : <><SaveOutlined className="me-2" /> Save Changes</>}
                            </button>
                        </form>
                    </div>
                )}

                {/* ── Security Tab ── */}
                {activeTab === 'security' && (
                    <div className="card text-white rounded-4 border border-light border-opacity-10 p-3 p-sm-4 p-md-5 shadow-lg"
                        style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
                        <div className="mb-4">
                            <h5 className="fw-bold mb-1 text-white fs-5">Account Security</h5>
                            <p className="text-white-50 small mb-0">Your account details and security info</p>
                        </div>

                        <div className="d-flex flex-column">
                            {[
                                { icon: <UserOutlined style={{ color: '#c4b5fd' }} />, label: 'Full Name', value: user?.fullName, color: '#c4b5fd' },
                                { icon: <MailOutlined style={{ color: '#93c5fd' }} />, label: 'Email', value: user?.email, color: '#93c5fd' },
                                { icon: <SafetyOutlined style={{ color: isAdmin ? '#fbbf24' : '#60a5fa' }} />, label: 'Role', value: user?.role, color: isAdmin ? '#fbbf24' : '#60a5fa' },
                                { icon: <CheckCircleOutlined style={{ color: '#4ade80' }} />, label: 'Status', value: user?.status, color: '#4ade80' },
                                { icon: <KeyOutlined style={{ color: 'rgba(255,255,255,0.6)' }} />, label: 'Password', value: '••••••••••', color: 'rgba(255,255,255,0.4)' },
                                { icon: <CalendarOutlined style={{ color: '#fb923c' }} />, label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' }) : '—', color: '#fb923c' },
                            ].map((item, i, arr) => (
                                <div key={i} className="d-flex align-items-center justify-content-between py-3 border-bottom border-light border-opacity-10 gap-3 flex-wrap">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="rounded-3 bg-white bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0"
                                            style={{ width: '38px', height: '38px', fontSize: '17px' }}>{item.icon}</div>
                                        <span className="small text-white-50 fw-medium">{item.label}</span>
                                    </div>
                                    <span className="small fw-bold text-capitalize text-break text-end" style={{ color: item.color }}>
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Security Note */}
                        <div className="mt-4 p-3 rounded-3 bg-warning bg-opacity-10 border border-warning border-opacity-25 d-flex align-items-start gap-3">
                            <WarningOutlined className="text-warning fs-5 flex-shrink-0 mt-1" />
                            <p className="small text-warning mb-0 lh-base" style={{ opacity: 0.9 }}>
                                To change your password or email, please contact support. Keep your account secure by not sharing your credentials.
                            </p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Profile;