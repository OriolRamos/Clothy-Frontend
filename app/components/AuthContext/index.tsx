"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import SessionExpiredModal from "../SessionExpiredModal/index"; // Modal separat

// Definim el tipus per al context
interface AuthContextType {
    isAuthenticated: boolean;
    userInitial: string;
    isLoading: boolean;
    subscription: SubscriptionInfo | null;
    login: (token: string) => void;
    logout: () => void;
    fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
}

// Inicialitzem el context
const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    userInitial: "",
    isLoading: true,
    subscription: null,
    login: () => {},
    logout: () => {},
    fetchWithAuth: async () => {
        throw new Error("fetchWithAuth no implementat");
    },
});

interface SubscriptionInfo {
    plan_name?: string;
    status?: string;
}

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
    const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);

    const fetchSubscriptionStatus = async (token: string) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/subscriptions/my-subscription`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                if (data.has_active_subscription) {
                    // Obtenim el nom del pla des del backend
                    const planResponse = await fetch(`${apiUrl}/subscriptions/plans`);
                    const plans = await planResponse.json();
                    const currentPlan = plans.find((p: any) => p.id === data.current_plan_id);
                    setSubscription({ plan_name: currentPlan?.name || data.status, status: data.status });
                } else {
                    setSubscription(null);
                }
            } else {
                setSubscription(null);
            }
        } catch (error) {
            console.error("Error obtenint l'estat de la subscripció a AuthContext:", error);
            setSubscription(null);
        }
    };

    useEffect(() => {
        async function checkToken() {
            const token = localStorage.getItem("authToken");
            if (token) {
                const result = await validateToken(token);
                if (result.valid && result.email) {
                    setUserInitial(result.email.charAt(0).toUpperCase());
                    setIsAuthenticated(true);
                    await fetchSubscriptionStatus(token); // <--- AFEGIT: Carrega la subscripció
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
            await fetchSubscriptionStatus(token); // <--- AFEGIT: Carrega la subscripció en fer login
        } else {
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        setUserInitial("");
        setSubscription(null); // <--- AFEGIT: Neteja la subscripció en fer logout
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
        subscription,
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
