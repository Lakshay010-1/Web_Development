import React from 'react'
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from '../contexts/useAuthContext'
import LoaderPage from './LoaderPage';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, authLoading } = useAuthContext();
    const location = useLocation();

    if (authLoading) {
        return <LoaderPage />
    }

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
