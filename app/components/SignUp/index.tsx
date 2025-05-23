"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import RenderFilter from "../Filters/RenderFilter";
import { filters } from "../Filters/cloth_filters";
import Footer from "@/app/components/Footer";
import {useAuth} from "@/app/components/AuthContext";
import { Eye, EyeOff } from "lucide-react"; // o usa icones que prefereixis

const SignUp = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [expandedFilter, setExpandedFilter] = useState<string>("");
    const [filtersState, setFiltersState] = useState<Record<string, string>>({ country: "" });
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const router = useRouter();
    const { login } = useAuth();
    const { t } = useTranslation("common");


    // al costat de router i t:
    // true només si hi ha país i s’han acceptat els termes
    const canProceed = Boolean(filtersState.country && termsAccepted);

    // substitueix l’anterior per:
    const updateFiltersState = (
        stateOrUpdater: Record<string, any> | ((prev: Record<string, any>) => Record<string, any>)
    ) => {
        if (typeof stateOrUpdater === "function") {
            // rebem un updater funció
            setFiltersState((prev) => {
                const newState = (stateOrUpdater as Function)(prev);
                const raw = newState.country;
                const country =
                    raw && typeof raw === "object" && raw.value !== undefined
                        ? raw.value
                        : raw;
                return { ...newState, country };
            });
        } else {
            // rebem un objecte directe
            const raw = stateOrUpdater.country;
            const country =
                raw && typeof raw === "object" && raw.value !== undefined
                    ? raw.value
                    : raw;
            setFiltersState({ ...stateOrUpdater, country });
        }
    };


    const validatePassword = (password: string) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        var country = filtersState.country;
        // Comprobación de campos obligatorios en el registro vía correo
        if (showEmailForm && (!email || !username || !password || !confirmPassword)) {
            setError(t("signUp.all_fields_required") || "Tots els camps són obligatoris.");
            return;
        }
        // Comprobación de campos obligatorios generales (país y términos)
        if (!filtersState.country || !termsAccepted) {
            setError(t("signUp.all_fields_required") || "Tots els camps són obligatoris.");
            return;
        }

        if (showEmailForm) {
            if (password !== confirmPassword) {
                setError(t("signUp.errorPasswordMismatch"));
                return;
            }
            if (!validatePassword(password)) {
                setError(t("signUp.errorPasswordInvalid"));
                return;
            }
        }

        setError("");

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            console.log("API URL:", apiUrl);
            const response = await fetch(`${apiUrl}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    username,
                    password,
                    country
                }),
            });

            console.log("response", response);

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.detail || t("signUp.errorServer"));
            } else {
                console.log("Usuari registrat correctament!");
                router.push("/verification");
            }
        } catch (error) {
            console.error("Error en la connexió amb el backend:", error);
            setError(t("signUp.errorServer"));
        }
    };

    const handleGoogleSuccess = async (credentialResponse: any) => {
        if (!filtersState.country || !termsAccepted) {
            setError(
                t("signUp.google_required_fields") ||
                "El país i l'acceptació dels termes són obligatoris per al registre amb Google."
            );
            return;
        }
        var country = filtersState.country;

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            const response = await fetch(`${apiUrl}/auth/google/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: credentialResponse.credential,
                    username,
                    country
                }),
            });

            const data = await response.json();
            console.log("Data ", data);
            if (response.ok) {
                console.log("Usuari loguejat correctament amb Google!");
                const token = data.access_token; // Obtenir el token del backend
                login(token); // Utilitzar la funció login del context

                router.push("/"); // Redirigir després del login
            } else {
                setError(data.message || t("login.google_error"));
            }

        } catch (err) {
            console.error("Error al processar el registre amb Google:", err);
            setError(t("signUp.errorGoogle"));
        }
    };

    return (
            <GoogleOAuthProvider clientId="677361179666-ae2o6mhsi2fq7g6ri1hiktap6mjrkaqs.apps.googleusercontent.com">
                <div className="relative h-[1200px] flex items-center bg-gray-100 dark:bg-gray-900">
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
                        style={{ objectFit: "cover" }}
                        className="opacity-90 max-w-full max-h-full"
                    />
                </div>
            </div>

            <div className="relative flex justify-center items-start pt-24">
                <div className="rounded-2xl p-10 w-full max-w-lg bg-white dark:bg-gray-800 shadow-md">
                    <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-300 text-center mb-6">
                        {t("signUp.title")}
                    </h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {/* Sección de información necesaria (país y términos) */}
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t("profile.country")}
                                </label>
                                {/* Icono de información */}
                                <div className="relative ml-2 group">
                          <span
                              className="w-2 h-2 bg-transparent text-black dark:text-white border border-black dark:border-white rounded-full flex items-center justify-center text-[6px] text-xs cursor-default">
                            i
                          </span>
                                    <div
                                        className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900 text-xs rounded py-1 px-2 min-w-[200px]">
                                        Especificar el país es esencial para poder obtener la ropa disponible en
                                        tu país y brindar al usuario una mejor experiencia.
                                    </div>
                                </div>
                            </div>
                            <div>
                                <RenderFilter
                                    key="country"
                                    filterKey="country"
                                    filterOptions={filters["country"]}
                                    expandedFilter={expandedFilter}
                                    setExpandedFilter={setExpandedFilter}
                                    filtersState={filtersState}
                                    setFiltersState={updateFiltersState}
                                />
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                    className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded"
                                    required
                                />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-200">
                                    {t("termsText")}{" "}
                                    <Link href="/terms&conditions">
                            <span className="underline text-blue-600 dark:text-blue-400 cursor-pointer">
                              {t("termsLink")}
                            </span>
                                    </Link>
                                </label>
                            </div>
                        </div>
                        {canProceed && (
                            <>
                                {/* Divider */}
                                <div className="flex items-center my-6">
                                    <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
                                </div>

                                {/* Fila para desplegar el formulario de correo */}
                                <div
                                    onClick={() => setShowEmailForm(!showEmailForm)}
                                    className="block w-full relative cursor-pointer text-center py-3 px-6 text-black bg-white dark:bg-faqblue/80 rounded-lg font-medium shadow-lg hover:scale-105 hover:bg-faqblue/90 transition transform duration-200 border border-black"
                                >
                                    <p className="text-blue-600 dark:text-blue-200 hover:underline">
                                        {t("signUp.registerButton") || "Crea sessió amb correu"}
                                    </p>
                                </div>

                                {/* Contenedor animado para el formulario de correo */}
                                <div
                                    className={`overflow-hidden transition-all duration-500 ${
                                        showEmailForm ? "max-h-[1000px] mt-4" : "max-h-0"
                                    }`}
                                >
                                    <div className="space-y-6">
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                {t("signUp.emailLabel")}
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="mt-2 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                placeholder={t("signUp.emailPlaceholder") as string}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="username"
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                {t("signUp.usernameLabel")}
                                            </label>
                                            <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="mt-2 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                placeholder={t("signUp.usernamePlaceholder") as string}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                {t("signUp.passwordLabel")}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    id="password"
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="mt-2 block w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                    placeholder={t("signUp.passwordPlaceholder") as string}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                                                    aria-label={showPassword ? "Oculta la contrasenya" : "Mostra la contrasenya"}
                                                >
                                                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {t("signUp.passwordHint")}
                                            </p>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="confirmPassword"
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                {t("signUp.confirmPasswordLabel")}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="mt-2 block w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                    placeholder={t("signUp.confirmPasswordPlaceholder") as string}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                                                    aria-label={showConfirmPassword ? "Oculta la contrasenya" : "Mostra la contrasenya"}
                                                >
                                                    {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="block w-full relative z-10 cursor-pointer text-center py-3 px-6 text-white bg-faqblue dark:bg-faqblue/80 rounded-lg font-medium shadow-lg hover:scale-105 hover:bg-faqblue/90 transition-transform duration-200"
                                        >
                                            {t("signUp.registerButton")}
                                        </button>
                                    </div>
                                </div>

                                {/* Mostrar error si existe */}
                                {error && (
                                    <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
                                )}

                                {/* Divider */}
                                <div className="flex items-center mt-0 mb-6">
                                    <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
                                    <span className="px-4 text-sm text-gray-500 dark:text-gray-400">O</span>
                                    <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
                                </div>

                                {/* Botón de Google */}
                                <div className="border border-black rounded-lg overflow-hidden">
                                    <GoogleLogin
                                        onSuccess={handleGoogleSuccess}
                                        onError={() => setError(t("signUp.errorGoogle"))}
                                    />
                                </div>

                            </>
                        )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </GoogleOAuthProvider>
    );
};

export default SignUp;
