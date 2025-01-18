"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext/index"; // Assegura't que el path és correcte
import Link from "next/link";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.detail || "Credencials incorrectes.");
            } else {
                const userData = await response.json();
                const token = userData.access_token; // Adapta això segons el backend

                // Utilitza la funció login del context
                login(token);

                // Redirigeix a la pàgina principal
                router.push("/");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("No s'ha pogut connectar amb el servidor. Si us plau, intenta-ho més tard.");
        }
    };

    // Funció per gestionar errors d'autenticació o connexió
    const handleFetchError = (error: any) => {
        console.error(error);

        // Si l'error és d'autenticació, netegem el token i redirigim al login
        if (error.message === "Error en obtenir el perfil de l'usuari.") {
            localStorage.removeItem("authToken");
            router.push("/login");
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
                            alt="Imagen de login"
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
                            Inicia sesión en tu cuenta
                        </h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Input de Correu electrònic */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Usuario o correo electrónico
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

                            {/* Input de Contrasenya */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Contraseña
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
                            </div>

                            {/* Missatge d'error */}
                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            {/* Botó de Login */}
                            <button
                                type="submit"
                                className="block w-full relative cursor-pointer text-center py-3 px-6 text-white bg-faqblue rounded-lg font-medium shadow-lg hover:scale-105 hover:bg-faqblue/90 hover:backdrop-blur-sm hover:opacity-95 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-btnblue focus:ring-offset-2 active:bg-hoblue transition transform duration-200"
                            >
                                Iniciar sesión
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <hr className="flex-grow border-t border-gray-300" />
                            <span className="px-4 text-sm text-gray-500">O</span>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>

                        {/* Botó de Google */}
                        <button
                            className="block w-full relative cursor-pointer flex items-center justify-center py-3 px-6 text-white bg-faqblue rounded-lg font-medium shadow-lg hover:scale-105 hover:bg-faqblue/90 hover:backdrop-blur-sm hover:opacity-95 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-btnblue focus:ring-offset-2 active:bg-hoblue transition transform duration-200"
                        >
                            <svg
                                className="h-5 w-5 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    d="M21.35 11.1h-9.25v2.8h5.65c-.4 2.3-2.4 4-5.65 4-3.35 0-6.1-2.7-6.1-6s2.75-6 6.1-6c1.55 0 2.9.6 3.95 1.5l2.05-2.05C18.3 3.85 15.9 3 13.4 3 7.95 3 3.5 7.45 3.5 12.95S7.95 23 13.4 23c5.35 0 9.55-4.1 9.55-9.55 0-.55-.05-1.1-.15-1.65z"/>
                            </svg>
                            Iniciar sesión con Google
                        </button>
                        {/* Text petit */}
                        <Link href="/loss-password">
                            <p className="mt-4 text-sm text-gray-500 text-center hover:text-blue-500 cursor-pointer">
                                ¿Has olvidado la contraseña?
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
