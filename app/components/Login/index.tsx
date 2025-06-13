"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext/index";
import Link from "next/link";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import Footer from "@/app/components/Footer";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { login } = useAuth();
    const { t } = useTranslation('common');
    const [showPassword, setShowPassword] = useState(false);

    // Les teves funcions handleSubmit i handleGoogleSuccess es mantenen igual
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
            <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">

                {/* [CORRECCIÓ] El contingut principal creix per ocupar l'espai i centra els elements */}
                <main className="flex-grow flex items-center justify-center ">
                    <div className="container mx-auto">
                        <div className="grid lg:grid-cols-2 gap-8 items-center">

                            {/* Columna Esquerra: Imatge (el teu disseny original) */}
                            <div className="relative h-full min-h-[600px] hidden lg:block">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-400 to-blue-600 clip-path-diagonal">
                                    <Image
                                        src="/images/login.png"
                                        alt={t("login.image_alt")}
                                        layout="fill"
                                        objectFit="cover"
                                        className="opacity-90"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Columna Dreta: Formulari */}
                            <div className="flex justify-center items-center py-12 lg:py-0">
                                <div className="w-full max-w-md bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl">
                                    <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center mb-6">
                                        {t("login.title")}
                                    </h2>
                                    {/* El teu formulari es manté igual */}
                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                        {/* ... (camps d'email, password, etc.) ... */}
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {t("login.email_label")}
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                                placeholder={t("login.email_placeholder")}
                                            />
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {t("login.password_label")}
                                            </label>
                                            <div className="relative mt-2">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    id="password"
                                                    name="password"
                                                    required
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    className="block w-full px-4 py-2 pr-10 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                                    placeholder={t("login.password_placeholder")}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(prev => !prev)}
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                                                    aria-label={showPassword ? "Oculta la contrasenya" : "Mostra la contrasenya"}
                                                >
                                                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="block w-full text-center py-3 px-6 text-white bg-faqblue dark:bg-blue-700 rounded-lg font-medium shadow-lg hover:scale-105 hover:bg-faqblue/90 dark:hover:bg-blue-600 transition-transform duration-200 border border-black"
                                        >
                                            {t("login.submit_button")}
                                        </button>
                                    </form>
                                    <Link href="/reset-password">
                                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center hover:text-blue-500 cursor-pointer">
                                            {t("login.forgot_password")}
                                        </p>
                                    </Link>
                                    <div className="flex items-center my-6">
                                        <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
                                        <span className="px-4 text-sm text-gray-500 dark:text-gray-400">O</span>
                                        <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
                                    </div>
                                    <div className="flex justify-center">
                                        <GoogleLogin
                                            onSuccess={handleGoogleSuccess}
                                            onError={() => setError(t("login.google_error"))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;