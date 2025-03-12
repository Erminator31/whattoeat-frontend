// src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);

    // Wenn kein Token vorhanden ist, wird der Benutzer weitergeleitet
    if (!auth.token) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
