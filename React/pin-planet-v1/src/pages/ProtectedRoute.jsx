import React from 'react'
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from '../contexts/useAuthContext'

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuthContext();
    const location = useLocation();

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/authenticate"
                replace
                state={{ from: location }}
            />
        );
    }

    return children;
}
