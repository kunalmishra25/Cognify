import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

axios.defaults.withCredentials = true;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/auth/me`,
                {
                    withCredentials: true,
                    timeout: 15000,
                }
            );

            setUser(response.data.user);

            return response.data.user;
        } catch (error) {
            console.error("Auth check failed:", error.message);
            setUser(null);
            return null;
        }
    };

    // On mount, verify session so refresh doesn't log user out
    useEffect(() => {
        checkAuth().finally(() => setLoading(false));
    }, []);

    const logout = async () => {
        try {
            await axios.post(
                `${API_BASE_URL}/auth/logout`,
                {},
                {
                    withCredentials: true,
                }
            );
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                checkAuth,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);