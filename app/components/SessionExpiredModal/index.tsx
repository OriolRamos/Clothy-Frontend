import React from "react";
import Link from "next/link";

interface SessionExpiredModalProps {
    show: boolean;
    onClose: () => void;
}

const SessionExpiredModal: React.FC<SessionExpiredModalProps> = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sessió Expirada</h2>
                <p className="text-lg text-gray-600 mb-6">La teva sessió ha expirat. Torna a iniciar sessió.</p>
                <div className="flex justify-center gap-4">
                    <Link href="/login">
                        <button
                            onClick={onClose}
                            className="bg-blue-600 text-black px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300"
                        >
                            Iniciar Sessió
                        </button>
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default SessionExpiredModal;
