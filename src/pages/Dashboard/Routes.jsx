import React, { Component, Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import ProtectedRoute from '@/components/Misc/ProtectedRoute'

const Products = lazy(() => import('./Prodects'))
const Orders = lazy(() => import('./Orders'))
const Users = lazy(() => import('./Users'))
const Profile = lazy(() => import('./Profile'))
const Analytics = lazy(() => import('./Analytics'))
const Messages = lazy(() => import('./Messages'))
const Stories = lazy(() => import('./Stories'))

class RouteErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="d-flex flex-column justify-content-center align-items-center py-5 text-center" style={{ minHeight: '45vh' }}>
                    <h5 className="fw-bold mb-2">Page failed to load</h5>
                    <p className="text-muted small mb-3">If the dev server restarted, reload the page to reconnect.</p>
                    <button
                        type="button"
                        className="btn rounded-pill px-4 text-white border-0"
                        style={{ background: '#141414' }}
                        onClick={() => window.location.reload()}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

const RouteLoader = () => (
    <div className="d-flex justify-content-center align-items-center py-5 w-100" style={{ minHeight: '40vh' }}>
        <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
)

const Index = () => {
    return (
        <RouteErrorBoundary>
            <Suspense fallback={<RouteLoader />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/analytics" element={<ProtectedRoute Component={Analytics} allowedRoles={["superAdmin"]} />} />
                    <Route path="/products/*" element={<ProtectedRoute Component={Products} allowedRoles={["superAdmin"]} />} />
                    <Route path="/stories/*" element={<ProtectedRoute Component={Stories} allowedRoles={["superAdmin"]} />} />
                    <Route path="/orders/*" element={<ProtectedRoute Component={Orders} allowedRoles={["superAdmin", "customer"]} />} />
                    <Route path="/users/*" element={<ProtectedRoute Component={Users} allowedRoles={["superAdmin"]} />} />
                    <Route path="/messages/*" element={<ProtectedRoute Component={Messages} allowedRoles={["superAdmin", "customer"]} />} />
                    <Route path="/profile/*" element={<ProtectedRoute Component={Profile} allowedRoles={["superAdmin", "customer"]} />} />
                </Routes>
            </Suspense>
        </RouteErrorBoundary>
    )
}

export default Index