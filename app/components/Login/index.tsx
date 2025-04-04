"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext/index"; // Assegura't que el path és correcte
import Link from "next/link";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { login } = useAuth();
    const { t } = useTranslation('common');

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
                setError(errorData.detail || t("login.invalid_credentials"));
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
            setError(t("login.server_error"));
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

    // Funció per gestionar l'èxit del login amb Google
    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            const response = await fetch(`${apiUrl}/auth/google/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: credentialResponse.credential,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Usuari loguejat correctament amb Google!");
                const token = data.access_token; // Obtenir el token del backend
                login(token); // Utilitzar la funció login del context

                router.push("/"); // Redirigir després del login
            } else {
                setError(data.message || t("login.google_error"));
            }
        } catch (err) {
            console.error("Error al processar el login amb Google:", err);
            setError(t("login.google_error"));
        }
    };

    return (
        <GoogleOAuthProvider clientId="677361179666-ae2o6mhsi2fq7g6ri1hiktap6mjrkaqs.apps.googleusercontent.com">

        <div className="relative h-screen flex items-center bg-gray-100">
            {/* Contenidor principal */}
            <div className="absolute inset-0 lg:grid grid-cols-2">
                {/* Columna de la imatge */}
                <div className="relative h-[900px] w-[900px] max-w-full hidden lg:block">
                    <div
                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-400 to-blue-600 clip-path-diagonal">
                        <Image
                            src="/images/login.png"
                            alt={t("login.image_alt")}
                            width={800}  // Definir amplada màxima
                            height={800} // Definir alçada màxima
                            style={{objectFit: "cover"}}
                            className="opacity-90 max-w-full max-h-full"
                        />
                    </div>
                </div>

                {/* Columna del formulari */}
                <div className="relative flex justify-center items-start pt-24">
                    <div className="rounded-2xl p-10 w-full max-w-lg bg-white shadow-md">
                        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
                            {t("login.title")}
                        </h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Input de Correu electrònic */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    {t("login.email_label")}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={t("login.email_placeholder")}
                                />
                            </div>

                            {/* Input de Contrasenya */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    {t("login.password_label")}
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={t("login.password_placeholder")}
                                />
                            </div>

                            {/* Missatge d'error */}
                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            {/* Botó de Login */}
                            <button
                                type="submit"
                                className="block w-full relative cursor-pointer text-center py-3 px-6 text-white bg-faqblue rounded-lg font-medium shadow-lg hover:scale-105 hover:bg-faqblue/90 hover:backdrop-blur-sm hover:opacity-95 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-btnblue focus:ring-offset-2 active:bg-hoblue transition transform duration-200"
                            >
                                {t("login.submit_button")}
                            </button>
                        </form>

                        {/* Text petit */}
                        <Link href="/loss-password">
                            <p className="mt-4 text-sm text-gray-500 text-center hover:text-blue-500 cursor-pointer">
                                {t("login.forgot_password")}
                            </p>
                        </Link>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <hr className="flex-grow border-t border-gray-300" />
                            <span className="px-4 text-sm text-gray-500">O</span>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>

                        {/* Botó de Google */}
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError(t("login.google_error"))}
                        />

                    </div>
                </div>
            </div>
        </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
