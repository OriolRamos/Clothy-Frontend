import React, { useState } from 'react';
import styled from 'styled-components';
import CorrectAnimation from "./CorrectAnimation";
import ErrorAnimation from "./ErrorAnimation";
import Loader from "./Loader";

// Estil del botó amb transició i estils condicionals
const CheckButton = styled.button`
  position: relative;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background-color: ${({ status }) =>
    status === 'success' ? '#34d399' : status === 'error' ? '#f87171' : '#9ca3af'}; // Colors verd, vermell o gris
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease, opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`;

const CheckBackendConnectionButton = () => {
    const [status, setStatus] = useState(null); // Estat del botó ('success', 'error' o null)
    const [isLoading, setIsLoading] = useState(false); // Estat de càrrega

    const handleClick = async () => {
        setStatus(null); // Reinicia l'estat
        setIsLoading(true); // Activa el carregador
        try {
            const response = await fetch('http://localhost:8080/images/health'); // Endpoint del backend
            if (response.ok) {
                setStatus('success'); // Èxit
            } else {
                setStatus('error'); // Error del servidor
            }
        } catch (error) {
            setStatus('error'); // Error de xarxa o backend
        } finally {
            setIsLoading(false); // Desactiva el carregador
        }
    };

    return (
        <CheckButton status={status} onClick={handleClick}>
            {isLoading ? (
                <Loader /> // Mostra el carregador si està carregant
            ) : (
                <div className="icon">
                    {status === 'success' ? (
                        <CorrectAnimation />
                    ) : status === 'error' ? (
                        <ErrorAnimation />
                    ) : (
                        'Comprova Connexió' // Text per defecte
                    )}
                </div>
            )}
        </CheckButton>
    );
};

export default CheckBackendConnectionButton;
