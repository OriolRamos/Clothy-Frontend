import React, { useEffect } from 'react';

// Definim els tipus de les propietats
interface ErrorModalProps {
    isOpen: boolean; // El modal s'obrirà si 'isOpen' és true
    onClose: () => void; // Funció per tancar el modal
    text?: string; // El text del modal, per defecte és '¡Ha ocurrido un error!'
    duration?: number; // Duració del modal en segons, per defecte és 5 segons
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, text = '¡Ha ocurrido un error!', duration = 5 }) => {
    useEffect(() => {
        if (!isOpen) return; // Només actua si el modal està obert

        const timer = setTimeout(() => {
            onClose(); // Tanca el modal després de passar el temps especificat
        }, duration * 1000); // Converteix segons a mil·lisegons

        return () => clearTimeout(timer); // Netegem el temporitzador si el component es desmunta
    }, [isOpen, duration, onClose]);

    if (!isOpen) return null; // Si no està obert, no es renderitza el contingut

    return (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
            <div
                className="bg-red-400 bg-opacity-90 text-white px-6 py-2 rounded-lg shadow-md w-72 text-center pointer-events-auto"
                style={{ backdropFilter: "blur(1px)" }}
            >
                <h2 className="text-sm font-medium">{text}</h2>
            </div>
        </div>
    );
};

export default ErrorModal;
