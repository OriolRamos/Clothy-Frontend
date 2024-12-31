"use client";

import Image from "next/image";
import { useState } from "react";

const Verification = () => {
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Gestionar l'enviament del formulari
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Ús de la variable d'entorn per la URL de l'API
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/users/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, verification_code: verificationCode }),
            });

            if (response.ok) {
                setSuccess(true);
                setError("");
            } else {
                const errorData = await response.json();
                setError(errorData.detail || "Hi ha hagut un error en la verificació.");
                setSuccess(false);
            }
        } catch (err) {
            console.error(err);
            setError("Error inesperat. Torna-ho a intentar més tard.");
            setSuccess(false);
        }
    };

    return (
        <div className="relative h-screen flex items-center bg-gray-100">
            {/* Contenidor principal */}
            <div className="absolute inset-0 lg:grid grid-cols-2">
                {/* Columna de la imatge */}
                <div className="relative h-full hidden lg:block">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-teal-400 to-blue-600 clip-path-diagonal">
                        <Image
                            src="/images/verification.png"
                            alt="Imagen de verificació"
                            fill
                            style={{ objectFit: "cover" }}
                            className="opacity-90"
                        />
                    </div>
                </div>

                {/* Columna del formulari */}
                <div className="relative flex justify-center items-center">
                    <div className="rounded-2xl p-10 w-full max-w-lg bg-white shadow-md">
                        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
                            Verifica el teu compte
                        </h2>
                        <p className="text-gray-500 text-center mb-4">
                            Introdueix el teu correu i el codi de verificació enviat al teu correu electrònic.
                        </p>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Input de correu electrònic */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Correu electrònic
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="usuario@ejemplo.com"
                                />
                            </div>

                            {/* Input del codi de verificació */}
                            <div>
                                <label
                                    htmlFor="verificationCode"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Codi de verificació
                                </label>
                                <input
                                    type="text"
                                    id="verificationCode"
                                    name="verificationCode"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    required
                                    className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="123456"
                                />
                            </div>

                            {/* Missatge d'error */}
                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            {/* Missatge d'èxit */}
                            {success && (
                                <p className="text-green-500 text-sm">
                                    El teu compte ha estat verificat correctament!
                                </p>
                            )}

                            {/* Botó de verificació */}
                            <button
                                type="submit"
                                className="w-full bg-teal-400 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-teal-500 transition-colors"
                            >
                                Verifica el compte
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Verification;
