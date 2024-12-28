"use client";

import Image from "next/image";
import { useState } from "react";

const SignUp = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    // Funció per validar la contrasenya
    const validatePassword = (password: string) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return regex.test(password);
    };

    // Gestionar l'enviament del formulari
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Les contrasenyes no coincideixen.");
        } else if (!validatePassword(password)) {
            setError("La contrasenya no compleix els requisits de seguretat.");
        } else {
            setError("");
            console.log("Formulari enviat amb èxit.");
            // Aquí pots afegir la crida a l'API per a registrar l'usuari
        }
    };

    return (
        <div className="relative h-screen flex items-center bg-gray-100">
            {/* Contenidor principal */}
            <div className="absolute inset-0 lg:grid grid-cols-2">
                {/* Columna de la imatge */}
                <div className="relative h-full hidden lg:block">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-400 to-blue-600 clip-path-diagonal">
                        <Image
                            src="/images/login.png"
                            alt="Imagen de signup"
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
                            Crea el teu compte
                        </h2>
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
                                    required
                                    className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="usuario@ejemplo.com"
                                />
                            </div>

                            {/* Input de contrasenya */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Contrasenya
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="••••••••"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    La contrasenya ha de tenir almenys 8 caràcters, incloent-hi una lletra majúscula, un número i un caràcter especial.
                                </p>
                            </div>

                            {/* Input per confirmar contrasenya */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Confirma la contrasenya
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="••••••••"
                                />
                            </div>

                            {/* Missatge d'error */}
                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            {/* Botó de registre */}
                            <button
                                type="submit"
                                className="w-full bg-teal-400 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-teal-500 transition-colors"
                            >
                                Crea el teu compte
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <hr className="flex-grow border-t border-gray-300" />
                            <span className="px-4 text-sm text-gray-500">O</span>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>

                        {/* Botó d'inici de sessió amb Google */}
                        <button
                            className="flex items-center justify-center bg-teal-400 text-white py-3 px-6 rounded-lg w-full shadow-lg hover:bg-teal-500 transition-colors"
                        >
                            <svg
                                className="h-5 w-5 mr-3"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M21.35 11.1h-9.25v2.8h5.65c-.4 2.3-2.4 4-5.65 4-3.35 0-6.1-2.7-6.1-6s2.75-6 6.1-6c1.55 0 2.9.6 3.95 1.5l2.05-2.05C18.3 3.85 15.9 3 13.4 3 7.95 3 3.5 7.45 3.5 12.95S7.95 23 13.4 23c5.35 0 9.55-4.1 9.55-9.55 0-.55-.05-1.1-.15-1.65z" />
                            </svg>
                            Registra't amb Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
