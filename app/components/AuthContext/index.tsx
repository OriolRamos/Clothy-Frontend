"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

// Definim el tipus per al context
interface AuthContextType {
    isAuthenticated: boolean;
    userInitial: string;
    login: (token: string) => void;
    logout: () => void;
}

// Inicialitzem el context
const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    userInitial: "",
    login: () => {},
    logout: () => {},
});

// Proveïdor del context
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInitial, setUserInitial] = useState("");

    // UseEffect per gestionar l'autenticació al client
    useEffect(() => {
        // Només executem aquest codi al client
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("authToken");
            if (token) {
                try {
                    // Decodifiquem el token JWT i establim l'estat d'autenticació
                    const userData = JSON.parse(atob(token.split(".")[1]));
                    const email = userData.email || "";
                    setUserInitial(email.charAt(0).toUpperCase());
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Error decoding token:", error);
                }
            }
        }
    }, []);

    const login = (token: string) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("authToken", token);
            try {
                const userData = JSON.parse(atob(token.split(".")[1]));
                const email = userData.email || "";
                setUserInitial(email.charAt(0).toUpperCase());
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Error decoding token during login:", error);
            }
        }
    };

    const logout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("authToken");
        }
        setIsAuthenticated(false);
        setUserInitial("");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userInitial, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook per accedir al context
export const useAuth = () => useContext(AuthContext);
