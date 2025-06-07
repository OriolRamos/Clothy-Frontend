"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import SessionExpiredModal from "../SessionExpiredModal/index"; // Modal separat

// Definim el tipus per al context
interface AuthContextType {
    isAuthenticated: boolean;
    userInitial: string;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
    fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
}

// Inicialitzem el context
const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    userInitial: "",
    isLoading: true,
    login: () => {},
    logout: () => {},
    fetchWithAuth: async () => {
        throw new Error("fetchWithAuth no implementat");
    },
});

async function validateToken(token: string): Promise<{ valid: boolean; email?: string }> {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/users/validate-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });

        if (!response.ok) {
            throw new Error("Error validant el token");
        }

        return await response.json();
    } catch (error) {
        console.error("Error validant el token:", error);
        return { valid: false };
    }
}

// Proveïdor del context
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInitial, setUserInitial] = useState("");
    const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function checkToken() {
            const token = localStorage.getItem("authToken");
            if (token) {
                const result = await validateToken(token);
                if (result.valid && result.email) {
                    setUserInitial(result.email.charAt(0).toUpperCase());
                    setIsAuthenticated(true);
                } else {
                    logout(); // Elimina el token si no és vàlid
                }
            }
            setIsLoading(false);
        }
        checkToken();
    }, []);

    const login = async (token: string) => {
        localStorage.setItem("authToken", token);
        const result = await validateToken(token);
        if (result.valid && result.email) {
            setUserInitial(result.email.charAt(0).toUpperCase());
            setIsAuthenticated(true);
        } else {
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        setUserInitial("");
    };

    const handle401Error = () => {
        logout();
        setShowSessionExpiredModal(true);
    };

    // Funció personalitzada per fer fetch
    const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
        const token = localStorage.getItem("authToken");
        const headers = {
            ...options.headers,
            Authorization: token ? `Bearer ${token}` : '',
        };

        try {
            const response = await fetch(url, { ...options, headers });

            if (response.status === 401) {
                handle401Error(); // Gestiona l'error 401
                throw new Error("Sessió expirada.");
            }

            return response;
        } catch (error) {
            console.error("Error a fetchWithAuth:", error);
            throw error;
        }
    };

    const contextValue = {
        isAuthenticated,
        userInitial,
        isLoading,
        login,
        logout,
        fetchWithAuth,
    };

    return (
        <AuthContext.Provider value={ contextValue }>
            {children}
            <SessionExpiredModal
                show={showSessionExpiredModal}
                onClose={() => setShowSessionExpiredModal(false)}
            />
        </AuthContext.Provider>
    );
};

// Custom hook per accedir al context
export const useAuth = () => useContext(AuthContext);
