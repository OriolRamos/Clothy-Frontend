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

    // UseEffect per gestionar l'autenticació al client
    useEffect(() => {
        async function checkToken() {
            if (typeof window !== "undefined") {
                const token = localStorage.getItem("authToken");
                if (token) {
                    const result = await validateToken(token);
                    if (result.valid && result.email) {
                        setUserInitial(result.email.charAt(0).toUpperCase());
                        setIsAuthenticated(true);
                        console.log("Usuari autenticat amb email:", result.email);
                    } else {
                        console.log("Token invàlid o caducat");
                        logout();
                    }
                }
            }
        }

        checkToken();
    }, []);

    const login = async (token: string) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("authToken", token);
            const result = await validateToken(token);
            if (result.valid && result.email) {
                setUserInitial(result.email.charAt(0).toUpperCase());
                setIsAuthenticated(true);
                console.log("Usuari autenticat amb email:", result.email);
            } else {
                console.log("Token invàlid o caducat");
                logout();
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
