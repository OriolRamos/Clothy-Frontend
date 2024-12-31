"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUp = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Estat per mostrar/ocultar contrasenya
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estat per confirmar contrasenya
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const router = useRouter();

    // Funció per validar la contrasenya
    const validatePassword = (password: string) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return regex.test(password);
    };

    // Gestionar l'enviament del formulari
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Les contrasenyes no coincideixen.");
        } else if (!validatePassword(password)) {
            setError("La contrasenya no compleix els requisits de seguretat.");
        } else {
            setError("");

            try {
                // Ús de la variable d'entorn per la URL de l'API
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                // Enviar les dades al backend
                const response = await fetch(`${apiUrl}/users/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        username,
                        password,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setError(errorData.detail || "Ha ocorregut un error en registrar l'usuari.");
                } else {
                    console.log("Usuari registrat correctament!");
                    // Redirigir a la pàgina de verificació
                    router.push("/verification");
                }
            } catch (error) {
                console.error("Error en la connexió amb el backend:", error);
                setError("No s'ha pogut connectar amb el servidor. Si us plau, intenta-ho més tard.");
            }
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="usuario@ejemplo.com"
                                />
                            </div>

                            {/* Input de nom d'usuari */}
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Nom d&#39;usuari
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Nom d'usuari"
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
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-sm text-gray-500"
                                    >
                                        {showPassword ? "Amagar" : "Mostrar"}
                                    </button>
                                </div>
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
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-3 text-sm text-gray-500"
                                    >
                                        {showConfirmPassword ? "Amagar" : "Mostrar"}
                                    </button>
                                </div>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
