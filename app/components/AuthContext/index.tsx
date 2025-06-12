"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import SessionExpiredModal from "../SessionExpiredModal/index"; // Modal existent
import RateLimitModal from "../Notifications/RateLimitModal"; // PAS 1: Importa el nou modal

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
    const [showRateLimitModal, setShowRateLimitModal] = useState(false); // PAS 2: Afegeix un estat per al nou modal
    const [isLoading, setIsLoading] = useState(true);
    const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);

    const fetchSubscriptionStatus = async (token: string) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            // Utilitzem fetchWithAuth per si aquesta crida també necessita autenticació
            const response = await fetch(`${apiUrl}/subscriptions/my-subscription`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                if (data.has_active_subscription) {
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
                    await fetchSubscriptionStatus(token);
                } else {
                    logout();
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
            await fetchSubscriptionStatus(token);
        } else {
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        setUserInitial("");
        setSubscription(null);
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
                handle401Error();
                throw new Error("Sessió expirada.");
            }

            // PAS 3: Afegeix la lògica per a l'error 429
            if (response.status === 429) {
                setShowRateLimitModal(true); // Mostra el modal de límit de peticions
                throw new Error("Límit de peticions del pla assolit."); // Llança l'error per aturar l'execució
            }

            return response;
        } catch (error) {
            console.error("Error a fetchWithAuth:", error);
            throw error; // Propaga l'error perquè el component que fa la crida sàpiga que ha fallat
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
            {/* PAS 4: Renderitza el nou modal */}
            <RateLimitModal
                show={showRateLimitModal}
                onClose={() => setShowRateLimitModal(false)}
            />
        </AuthContext.Provider>
    );
};

// Custom hook per accedir al context
export const useAuth = () => useContext(AuthContext);