"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

interface RateLimitModalProps {
    show: boolean;
    onClose: () => void;
}

const RateLimitModal: React.FC<RateLimitModalProps> = ({ show, onClose }) => {
    const router = useRouter();

    if (!show) {
        return null;
    }

    const handleUpgrade = () => {
        router.push('/donaciones'); // URL on l'usuari pot millorar el pla
        onClose(); // Tanca el modal un cop es redirigeix
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Límit de Peticions Aconseguit</h2>
                <p className="mb-6 text-gray-600">
                    Has assolit el límit de peticions permeses pel teu pla actual.
                </p>
                <p className="mb-8 text-gray-600">
                    Vols millorar el teu pla per a obtenir accés il·limitat i més funcionalitats?
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        No, gràcies
                    </button>
                    <button
                        onClick={handleUpgrade}
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                    >
                        Millora el Pla
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RateLimitModal;