import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("http://localhost:8080/auth/protected", {
                    method: "GET",
                    credentials: "include", // Inclou cookies en la petició
                });

                if (!response.ok) {
                    navigate('/login'); // Redirigeix a login si no està autenticat
                }
            } catch (error) {
                navigate('/login');
            }
        };

        checkAuth();
    }, [navigate]);

    return <>{children}</>;
};

export default ProtectedRoute;
