import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer, useState } from "react";

const AuthContext = createContext();

const initialState = { isAuth: false, user: {} };

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { isAuth: true, user: action.payload };
        case "SET_PROFILE":
            return { ...state, user: { ...state.user, ...action.payload } };
        case "LOGOUT":
            return initialState;
        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isAppLoading, setIsAppLoading] = useState(true);

    const readProfile = async (token = null) => {
        const start = Date.now();
        const jwt = token || localStorage.getItem("jwt");

        const finishLoading = () => {
            const elapsed = Date.now() - start;
            const delay = Math.max(0, 650 - elapsed);
            setTimeout(() => {
                setIsAppLoading(false);
            }, delay);
        };

        if (!jwt) {
            finishLoading();
            return;
        }

        try {
            const res = await axios.get(window.api + "/api/auth/user", {
                headers: { Authorization: `Bearer ${jwt}` }
            });

            if (res.status === 200 && res.data?.user) {
                dispatch({ type: "LOGIN", payload: res.data.user });
            }
        } catch (err) {
            console.error("Auth check failed:", err.response?.data?.message || err.message);
            // If token is invalid or expired, clear it
            if (err.response?.status === 401) {
                localStorage.removeItem("jwt");
                dispatch({ type: "LOGOUT" });
            }
        } finally {
            finishLoading();
        }
    };

    useEffect(() => {
        readProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        dispatch({ type: "LOGOUT" });
    };

    return (
        <AuthContext.Provider value={{ ...state, dispatch, isAppLoading, handleLogout, readProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
