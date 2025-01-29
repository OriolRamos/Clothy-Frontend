"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";


const SignUp = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Estat per mostrar/ocultar contrasenya
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estat per confirmar contrasenya
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const router = useRouter();
    const { t } = useTranslation('common');


    // Funció per validar la contrasenya
    const validatePassword = (password: string) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return regex.test(password);
    };

    // Gestionar l'enviament del formulari
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError(t("signUp.errorPasswordMismatch"));
        } else if (!validatePassword(password)) {
            setError(t("signUp.errorPasswordInvalid"));
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
                    setError(errorData.detail || t("signUp.errorServer"));
                } else {
                    console.log("Usuari registrat correctament!");
                    // Redirigir a la pàgina de verificació
                    router.push("/verification");
                }
            } catch (error) {
                console.error("Error en la connexió amb el backend:", error);
                setError(t("signUp.errorServer"));
            }
        }
    };

    // Gestionar èxit del registre amb Google
    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            const response = await fetch(`${apiUrl}/auth/google/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: credentialResponse.credential,
                    username, // Opcional: Nom d'usuari afegit manualment
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Usuari registrat correctament amb Google!");
                router.push("/login"); // Redirigir després del registre
            } else {
                setError(data.message || t("signUp.errorGoogle"));
            }
        } catch (err) {
            console.error("Error al processar el registre amb Google:", err);
            setError(t("signUp.errorGoogle"));
        }
    };


    return (
        <GoogleOAuthProvider clientId="677361179666-ae2o6mhsi2fq7g6ri1hiktap6mjrkaqs.apps.googleusercontent.com">
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
                            {t("signUp.title")}
                        </h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Input de correu electrònic */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {t("signUp.emailLabel")}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={t("signUp.emailPlaceholder") as string}
                                />
                            </div>

                            {/* Input de nom d'usuari */}
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {t("signUp.usernameLabel")}
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={t("signUp.usernamePlaceholder") as string}
                                />
                            </div>

                            {/* Input de contrasenya */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {t("signUp.passwordLabel")}
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
                                        placeholder={t("signUp.passwordPlaceholder") as string}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-sm text-gray-500"
                                    >
                                        {showPassword ? t("signUp.hidePassword") : t("signUp.showPassword")}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    {t("signUp.passwordHint")}
                                </p>
                            </div>

                            {/* Input per confirmar contrasenya */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {t("signUp.confirmPasswordLabel")}
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
                                        placeholder={t("signUp.confirmPasswordPlaceholder") as string}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-3 text-sm text-gray-500"
                                    >
                                        {showConfirmPassword ? t("signUp.hidePassword") : t("signUp.showPassword")}
                                    </button>
                                </div>
                            </div>

                            {/* Missatge d'error */}
                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            {/* Botó de registre */}
                            <button
                                type="submit"
                                className="block w-full relative cursor-pointer text-center py-3 px-6 text-white bg-faqblue rounded-lg font-medium shadow-lg hover:scale-105 hover:bg-faqblue/90 hover:backdrop-blur-sm hover:opacity-95 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-btnblue focus:ring-offset-2 active:bg-hoblue transition transform duration-200"
                            >
                                {t("signUp.registerButton")}
                            </button>
                            {/* Divider */}
                            <div className="flex items-center my-6">
                                <hr className="flex-grow border-t border-gray-300" />
                                <span className="px-4 text-sm text-gray-500">O</span>
                                <hr className="flex-grow border-t border-gray-300" />
                            </div>

                            {/* Botó de Google */}
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={() => setError(t("signUp.errorGoogle"))}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </GoogleOAuthProvider>
    );
};

export default SignUp;
