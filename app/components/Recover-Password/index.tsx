"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const RecoverPassword = () => {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1); // 1: Introduir correu, 2: Introduir codi
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [lastSentTime, setLastSentTime] = useState<number | null>(null); // Aquí es declara correctament el tipus
    const [canResend, setCanResend] = useState(true); // Si es pot tornar a enviar el codi
    const [timer, setTimer] = useState(0); // Per mostrar el temps restant per tornar a enviar el correu

    const router = useRouter();

    useEffect(() => {
        if (lastSentTime) {
            const interval = setInterval(() => {
                const timeElapsed = Date.now() - lastSentTime;
                const remainingTime = Math.max(0, 300000 - timeElapsed); // 5 minuts = 300000ms
                setTimer(Math.floor(remainingTime / 1000)); // Convertir a segons

                if (remainingTime === 0) {
                    setCanResend(true); // Deshabilitar després de 5 minuts
                    clearInterval(interval);
                }
            }, 1000);

            return () => clearInterval(interval); // Netegem l'interval en sortir del component
        }
    }, [lastSentTime]);

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/users/recover-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStep(2); // Passar a la fase de verificació del codi
                setLastSentTime(Date.now()); // Guardar l'hora quan s'envia el correu
                setCanResend(false); // Deshabilitar el botó d'enviament
            } else {
                const errorData = await response.json();
                setError(errorData.message || "No s'ha pogut enviar el correu electrònic.");
            }
        } catch (err) {
            console.error(err);
            setError("Hi ha hagut un problema al contactar amb el servidor.");
        }
    };

    const handleResendCode = async () => {
        setError("");
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/users/recover-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setLastSentTime(Date.now()); // Actualitzar l'hora del darrer enviament
                setCanResend(false); // Deshabilitar el botó
            } else {
                const errorData = await response.json();
                setError(errorData.message || "No s'ha pogut tornar a enviar el correu electrònic.");
            }
        } catch (err) {
            console.error(err);
            setError("Hi ha hagut un problema al contactar amb el servidor.");
        }
    };

    const handleCodeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Les contrasenyes no coincideixen.");
            return;
        }

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/users/verify-new-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    verification_code: code,
                    new_password: password,
                }),
            });

            if (response.ok) {
                setSuccessMessage("Contrasenya actualitzada correctament! Pots iniciar sessió.");
                setTimeout(() => router.push("/login"), 3000);
            } else {
                const errorData = await response.json();
                setError(errorData.message || "El codi introduït no és vàlid.");
            }
        } catch (err) {
            console.error(err);
            setError("Hi ha hagut un problema al contactar amb el servidor.");
        }
    };

    return (
        <div className="relative h-screen flex">
            {/* Columna de la imatge */}
            <div className="hidden lg:flex lg:w-1/2 bg-blue-500 relative justify-center items-center">
                <Image
                    src="/images/recover-password/rb_7876.png"
                    alt="Recupera la contrasenya"
                    width={500}
                    height={500}
                    style={{ objectFit: "contain" }}
                    className="opacity-90"
                />
            </div>

            {/* Columna del formulari */}
            <div className="flex flex-col justify-center items-center lg:w-1/2 p-8 bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">
                        Recupera la teva contrasenya
                    </h2>

                    {step === 1 && (
                        <form onSubmit={handleEmailSubmit}>
                            <p className="text-gray-700 text-sm mb-4">
                                Introdueix el teu correu electrònic per rebre el codi de verificació.
                            </p>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Correu electrònic
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                                    placeholder="usuario@ejemplo.com"
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                            >
                                Enviar codi
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleCodeSubmit}>
                            <p className="text-gray-700 text-sm mb-4">
                                Introdueix el codi de 6 dígits que t&#39;hem enviat al correu electrònic i la nova contrasenya.
                            </p>
                            <div className="mb-4">
                                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                                    Codi de verificació
                                </label>
                                <input
                                    type="text"
                                    id="code"
                                    name="code"
                                    required
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                                    placeholder="123456"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Nova contrasenya
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                                    placeholder="********"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirma la nova contrasenya
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                                    placeholder="********"
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                            >
                                Verificar codi i actualitzar contrasenya
                            </button>
                        </form>
                    )}

                    {successMessage && (
                        <p className="text-green-500 text-sm mt-4 text-center">{successMessage}</p>
                    )}

                    {/* Botó per tornar a enviar el codi si han passat 5 minuts */}
                    {step === 2 && !canResend && (
                        <p className="text-sm text-gray-500 mt-4">
                            Pots tornar a enviar el codi en {timer} segons.
                        </p>
                    )}
                    {step === 1 && canResend && (
                        <button
                            type="button"
                            onClick={handleResendCode}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Tornar a enviar codi
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecoverPassword;
