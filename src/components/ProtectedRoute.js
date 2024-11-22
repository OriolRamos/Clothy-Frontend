import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

const ProtectedRoute = ({ children, setIsAuthenticated }) => {
    const [sessionExpired, setSessionExpired] = useState(false); // Estat per al missatge d'error
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("http://localhost:8080/auth/protected", {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    // Token no vàlid o sessió expirada
                    localStorage.removeItem("authToken");
                    setIsAuthenticated(false);
                    setSessionExpired(true); // Mostra el missatge d'expiració
                    setTimeout(() => {
                        navigate("/login"); // Redirigeix després de mostrar el missatge
                    }, 3000);
                } else {
                    setIsAuthenticated(true); // Usuari autenticat
                }
            } catch (error) {
                // Error de xarxa o altre problema
                localStorage.removeItem("authToken");
                setIsAuthenticated(false);
                setSessionExpired(true); // Mostra el missatge d'expiració
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }
        };

        checkAuth();
    }, [navigate, setIsAuthenticated]);

    return (
        <>
            {/* Missatge d'expiració de sessió */}
            <Snackbar
                open={sessionExpired}
                autoHideDuration={3000} // Amaga el missatge automàticament
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    severity="error"
                    sx={{
                        bgcolor: "#f8d7da",
                        color: "#842029",
                        fontSize: "16px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                >
                    La teva sessió ha expirat. Torna a iniciar sessió.
                </Alert>
            </Snackbar>

            {children}
        </>
    );
};

export default ProtectedRoute;
