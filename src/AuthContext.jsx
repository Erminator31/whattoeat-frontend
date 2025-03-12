// src/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: null,
        userEmail: null,
        role: null,          // <-- Rolle ergänzen
    });

    // Beim Initialisieren aus localStorage laden (optional)
    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        const storedEmail = localStorage.getItem('userEmail');
        const storedRole  = localStorage.getItem('userRole');

        if (storedToken) {
            setAuth({
                token: storedToken,
                userEmail: storedEmail,
                role: storedRole,
            });
        }
    }, []);

    // Funktion zum Login (Token, E-Mail und Rolle speichern)
    const login = (token, userEmail, role) => {
        setAuth({ token, userEmail, role });
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem('userRole', role);
    };

    // Funktion zum Logout
    const logout = () => {
        setAuth({ token: null, userEmail: null, role: null });
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
