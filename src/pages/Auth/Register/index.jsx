import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    ArrowLeftOutlined,
    SafetyCertificateFilled,
    ShoppingFilled,
    UserAddOutlined,
    CheckCircleFilled,
    CloseCircleFilled
} from "@ant-design/icons"

const DISPOSABLE_DOMAINS = new Set([
    "10minutemail.com", "10minutemail.net", "tempmail.com", "temp-mail.org", "temp-mail.io",
    "guerrillamail.com", "guerrillamail.net", "mailinator.com", "throwawaymail.com",
    "yopmail.com", "yopmail.fr", "sharklasers.com", "dispostable.com", "trashmail.com",
    "fakeinbox.com", "fakemailgenerator.com", "emailondeck.com", "mytemp.email", "nada.ltd"
]);

const initialState = { name: "", email: "", password: "", confirmPassword: "" }

const Register = () => {
    const navigate = useNavigate()

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [agreeTerms, setAgreeTerms] = useState(true)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    // Password strength calculation
    const getPasswordStrength = (pass) => {
        if (!pass) return { level: 0, label: "", color: "#e2e8f0" }
        let score = 0
        if (pass.length >= 6) score++
        if (pass.length >= 8) score++
        if (/[A-Za-z]/.test(pass) && /[0-9]/.test(pass)) score++
        if (/[^A-Za-z0-9]/.test(pass)) score++

        if (score <= 1) return { level: 1, label: "Weak", color: "#ef4444" }
        if (score === 2) return { level: 2, label: "Fair", color: "#f59e0b" }
        if (score === 3) return { level: 3, label: "Good", color: "#3b82f6" }
        return { level: 4, label: "Strong", color: "#10b981" }
    }

    const strength = getPasswordStrength(state.password)

    const handleRegister = (e) => {
        e.preventDefault()
        let { name, email, password, confirmPassword } = state

        const fullName = name.trim()
        if (fullName.length < 3) {
            return window.toastify("Please enter your full name (minimum 3 characters)", "warning")
        }

        const cleanEmail = email.trim().toLowerCase()
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!cleanEmail || !emailRegex.test(cleanEmail)) {
            return window.toastify("Please enter a valid email address (e.g. name@example.com)", "warning")
        }

        const domain = cleanEmail.split("@")[1]
        if (DISPOSABLE_DOMAINS.has(domain)) {
            return window.toastify("Temporary / disposable emails are not allowed. Please enter your real email.", "warning")
        }

        if (!password || password.length < 6) {
            return window.toastify("Password must be at least 6 characters", "warning")
        }
        if (confirmPassword !== password) {
            return window.toastify("Passwords do not match. Please re-enter.", "warning")
        }
        if (!agreeTerms) {
            return window.toastify("Please agree to the Terms & Privacy Policy to proceed", "warning")
        }

        const user = { fullName, email: cleanEmail, password }
        setIsProcessing(true)

        axios.post(`${window.api}/api/auth/register`, user)
            .then((res) => {
                const { status } = res
                if (status === 201 || status === 200) {
                    window.toastify("Account Created Successfully! Welcome to Waqas Royal", "success")
                    navigate("/auth/login")
                }
            })
            .catch(error => {
                console.error(error)
                window.toastify(error?.response?.data?.message || "Registration failed. Please try again.", "error")
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }

    return (
        <main
            style={{
                minHeight: "100vh",
                background: "#F7F7F5",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "24px 16px",
                position: "relative",
                overflow: "hidden",
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            }}
        >

            {/* Top Navigation */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "520px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                    zIndex: 2
                }}
            >
                <Link
                    to="/"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "#141414",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                        padding: "8px 16px",
                        borderRadius: "999px",
                        background: "#ffffff",
                        border: "1px solid #E5E5E0",
                        transition: "all 0.2s ease"
                    }}
                >
                    <ArrowLeftOutlined /> Back to Store
                </Link>

                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#525E46",
                        background: "#EAEDE6",
                        border: "1px solid #DCE1D6",
                        padding: "6px 14px",
                        borderRadius: "999px"
                    }}
                >
                    <SafetyCertificateFilled style={{ color: "#525E46" }} />
                    <span>Instant VIP Registration</span>
                </div>
            </div>

            {/* Main Centered Registration Card */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "520px",
                    background: "#ffffff",
                    borderRadius: "24px",
                    boxShadow: "0 16px 40px rgba(20, 20, 20, 0.06)",
                    border: "1px solid #E5E5E0",
                    overflow: "hidden",
                    padding: "36px 32px",
                    position: "relative",
                    zIndex: 1
                }}
            >
                {/* Brand Header */}
                <div style={{ textAlign: "center", marginBottom: "22px" }}>
                    <div
                        style={{
                            width: "54px",
                            height: "54px",
                            borderRadius: "16px",
                            background: "#525E46",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "24px",
                            color: "#ffffff",
                            marginBottom: "12px"
                        }}
                    >
                        <ShoppingFilled />
                    </div>
                    <h3 style={{ margin: "0 0 4px 0", fontSize: "22px", fontWeight: 800, color: "#141414", letterSpacing: "-0.5px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                        Create Your Account <UserAddOutlined style={{ color: "#6E7D60", fontSize: "20px" }} />
                    </h3>
                    <p style={{ margin: 0, fontSize: "13px", color: "#6A6A64" }}>
                        Join Waqas Royal today and enjoy member perks.
                    </p>
                </div>

                {/* Top Segmented Switcher */}
                <div
                    style={{
                        display: "flex",
                        background: "#f1f5f9",
                        padding: "4px",
                        borderRadius: "14px",
                        marginBottom: "24px"
                    }}
                >
                    <Link
                        to="/auth/login"
                        style={{
                            flex: 1,
                            textAlign: "center",
                            padding: "9px 0",
                            fontSize: "14px",
                            fontWeight: 600,
                            borderRadius: "11px",
                            textDecoration: "none",
                            color: "#64748b",
                            background: "transparent",
                            transition: "all 0.2s ease"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#0f172a" }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b" }}
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/auth/register"
                        style={{
                            flex: 1,
                            textAlign: "center",
                            padding: "9px 0",
                            fontSize: "14px",
                            fontWeight: 700,
                            borderRadius: "11px",
                            textDecoration: "none",
                            color: "#0f766e",
                            background: "#ffffff",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                            transition: "all 0.2s ease"
                        }}
                    >
                        Register
                    </Link>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleRegister}>

                    {/* Full Name */}
                    <div style={{ marginBottom: "16px" }}>
                        <label
                            htmlFor="reg-name"
                            style={{
                                display: "block",
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#334155",
                                marginBottom: "6px"
                            }}
                        >
                            Full Name
                        </label>
                        <div style={{ position: "relative" }}>
                            <span
                                style={{
                                    position: "absolute",
                                    left: "16px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#94a3b8",
                                    fontSize: "16px",
                                    pointerEvents: "none"
                                }}
                            >
                                <UserOutlined />
                            </span>
                            <input
                                id="reg-name"
                                type="text"
                                name="name"
                                placeholder="e.g. John Doe"
                                value={state.name}
                                onChange={handleChange}
                                required
                                autoComplete="name"
                                style={{
                                    width: "100%",
                                    height: "46px",
                                    padding: "0 16px 0 46px",
                                    fontSize: "14px",
                                    color: "#0f172a",
                                    background: "#f8fafc",
                                    border: "1.5px solid #e2e8f0",
                                    borderRadius: "12px",
                                    outline: "none",
                                    transition: "all 0.2s ease",
                                    boxSizing: "border-box"
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "#0d9488"
                                    e.target.style.background = "#ffffff"
                                    e.target.style.boxShadow = "0 0 0 4px rgba(13, 148, 136, 0.12)"
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "#e2e8f0"
                                    e.target.style.background = "#f8fafc"
                                    e.target.style.boxShadow = "none"
                                }}
                            />
                        </div>
                    </div>

                    {/* Email Address */}
                    <div style={{ marginBottom: "16px" }}>
                        <label
                            htmlFor="reg-email"
                            style={{
                                display: "block",
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#334155",
                                marginBottom: "6px"
                            }}
                        >
                            Email Address
                        </label>
                        <div style={{ position: "relative" }}>
                            <span
                                style={{
                                    position: "absolute",
                                    left: "16px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#94a3b8",
                                    fontSize: "16px",
                                    pointerEvents: "none"
                                }}
                            >
                                <MailOutlined />
                            </span>
                            <input
                                id="reg-email"
                                type="email"
                                name="email"
                                placeholder="name@example.com (Real email required)"
                                value={state.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                                style={{
                                    width: "100%",
                                    height: "46px",
                                    padding: "0 16px 0 46px",
                                    fontSize: "14px",
                                    color: "#0f172a",
                                    background: "#f8fafc",
                                    border: "1.5px solid #e2e8f0",
                                    borderRadius: "12px",
                                    outline: "none",
                                    transition: "all 0.2s ease",
                                    boxSizing: "border-box"
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "#0d9488"
                                    e.target.style.background = "#ffffff"
                                    e.target.style.boxShadow = "0 0 0 4px rgba(13, 148, 136, 0.12)"
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "#e2e8f0"
                                    e.target.style.background = "#f8fafc"
                                    e.target.style.boxShadow = "none"
                                }}
                            />
                        </div>
                        <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px", paddingLeft: "4px" }}>
                            Only real active emails are accepted (Gmail, Yahoo, Outlook, etc.).
                        </div>
                    </div>

                    {/* Password and Confirm Password Row */}
                    <div className="row g-3" style={{ marginBottom: "12px" }}>
                        <div className="col-12 col-sm-6">
                            <label
                                htmlFor="reg-password"
                                style={{
                                    display: "block",
                                    fontSize: "13px",
                                    fontWeight: 700,
                                    color: "#334155",
                                    marginBottom: "6px"
                                }}
                            >
                                Real Password
                            </label>
                            <div style={{ position: "relative" }}>
                                <span
                                    style={{
                                        position: "absolute",
                                        left: "14px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "#94a3b8",
                                        fontSize: "15px",
                                        pointerEvents: "none"
                                    }}
                                >
                                    <LockOutlined />
                                </span>
                                <input
                                    id="reg-password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Min 6 characters"
                                    value={state.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                    style={{
                                        width: "100%",
                                        height: "46px",
                                        padding: "0 40px 0 42px",
                                        fontSize: "14px",
                                        color: "#0f172a",
                                        background: "#f8fafc",
                                        border: "1.5px solid #e2e8f0",
                                        borderRadius: "12px",
                                        outline: "none",
                                        transition: "all 0.2s ease",
                                        boxSizing: "border-box"
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "#0d9488"
                                        e.target.style.background = "#ffffff"
                                        e.target.style.boxShadow = "0 0 0 4px rgba(13, 148, 136, 0.12)"
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "#e2e8f0"
                                        e.target.style.background = "#f8fafc"
                                        e.target.style.boxShadow = "none"
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label="Toggle password visibility"
                                    style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        background: "none",
                                        border: "none",
                                        color: "#64748b",
                                        cursor: "pointer",
                                        padding: "6px",
                                        fontSize: "15px",
                                        display: "flex",
                                        alignItems: "center"
                                    }}
                                >
                                    {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                </button>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6">
                            <label
                                htmlFor="reg-confirm-password"
                                style={{
                                    display: "block",
                                    fontSize: "13px",
                                    fontWeight: 700,
                                    color: "#334155",
                                    marginBottom: "6px"
                                }}
                            >
                                Confirm
                            </label>
                            <div style={{ position: "relative" }}>
                                <span
                                    style={{
                                        position: "absolute",
                                        left: "14px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "#94a3b8",
                                        fontSize: "15px",
                                        pointerEvents: "none"
                                    }}
                                >
                                    <LockOutlined />
                                </span>
                                <input
                                    id="reg-confirm-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Repeat password"
                                    value={state.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                    style={{
                                        width: "100%",
                                        height: "46px",
                                        padding: "0 40px 0 42px",
                                        fontSize: "14px",
                                        color: "#0f172a",
                                        background: "#f8fafc",
                                        border: "1.5px solid #e2e8f0",
                                        borderRadius: "12px",
                                        outline: "none",
                                        transition: "all 0.2s ease",
                                        boxSizing: "border-box"
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "#0d9488"
                                        e.target.style.background = "#ffffff"
                                        e.target.style.boxShadow = "0 0 0 4px rgba(13, 148, 136, 0.12)"
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "#e2e8f0"
                                        e.target.style.background = "#f8fafc"
                                        e.target.style.boxShadow = "none"
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    aria-label="Toggle confirm password visibility"
                                    style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        background: "none",
                                        border: "none",
                                        color: "#64748b",
                                        cursor: "pointer",
                                        padding: "6px",
                                        fontSize: "15px",
                                        display: "flex",
                                        alignItems: "center"
                                    }}
                                >
                                    {showConfirmPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Password Strength Indicator */}
                    {state.password && (
                        <div style={{ marginBottom: "16px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: 700, marginBottom: "4px" }}>
                                <span style={{ color: "#64748b" }}>Password Strength:</span>
                                <span style={{ color: strength.color }}>{strength.label}</span>
                            </div>
                            <div style={{ display: "flex", gap: "4px", height: "4px" }}>
                                {[1, 2, 3, 4].map((step) => (
                                    <div
                                        key={step}
                                        style={{
                                            flex: 1,
                                            borderRadius: "2px",
                                            background: strength.level >= step ? strength.color : "#e2e8f0",
                                            transition: "background 0.3s ease"
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Terms & Conditions Checkbox */}
                    <div style={{ marginBottom: "22px" }}>
                        <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer", fontSize: "12px", color: "#475569", lineHeight: 1.4, userSelect: "none" }}>
                            <input
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                style={{
                                    width: "16px",
                                    height: "16px",
                                    marginTop: "2px",
                                    accentColor: "#0d9488",
                                    cursor: "pointer",
                                    borderRadius: "4px"
                                }}
                            />
                            <span>
                                I agree to Waqas Royal's{" "}
                                <span style={{ color: "#525E46", fontWeight: 700 }}>Terms of Service</span> and{" "}
                                <span style={{ color: "#525E46", fontWeight: 700 }}>Privacy Policy</span>.
                            </span>
                        </label>
                    </div>

                    {/* Submit CTA */}
                    <button
                        type="submit"
                        disabled={isProcessing}
                        style={{
                            width: "100%",
                            height: "50px",
                            borderRadius: "999px",
                            border: "none",
                            background: isProcessing ? "#9ca3af" : "#141414",
                            color: "#ffffff",
                            fontSize: "15px",
                            fontWeight: 600,
                            cursor: isProcessing ? "not-allowed" : "pointer",
                            transition: "all 0.2s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px"
                        }}
                    >
                        {isProcessing ? (
                            <>
                                <div
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    style={{ width: "18px", height: "18px", borderWidth: "2px" }}
                                />
                                <span>Creating Account...</span>
                            </>
                        ) : (
                            <>
                                <span>Create Free Account</span>
                                <span style={{ fontSize: "16px" }}>→</span>
                            </>
                        )}
                    </button>

                    {/* Bottom Login Prompt */}
                    <div style={{ marginTop: "22px", textAlign: "center", fontSize: "13px", color: "#6A6A64" }}>
                        Already have an account?{" "}
                        <Link
                            to="/auth/login"
                            style={{
                                color: "#525E46",
                                fontWeight: 700,
                                textDecoration: "none",
                                marginLeft: "4px"
                            }}
                        >
                            Sign In Here
                        </Link>
                    </div>

                </form>
            </div>

            {/* Footer */}
            <div style={{ marginTop: "20px", textAlign: "center", fontSize: "12px", color: "#6A6A64", zIndex: 1 }}>
                Protected by Waqas Royal Security • All Rights Reserved © {new Date().getFullYear()}
            </div>
        </main>
    )
}

export default Register