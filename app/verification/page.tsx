"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import {useAuth} from "@/app/components/AuthContext";

const Verification = () => {
    const { t } = useTranslation("common");
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const { login } = useAuth();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/users/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, verification_code: verificationCode }),
            });
            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setError("");

                console.log("Usuari loguejat correctament!");
                const token = data.access_token; // Obtenir el token del backend
                login(token); // Utilitzar la funció login del context

                router.push("/");
            } else {
                const errorData = await response.json();
                setError(errorData.detail || t("verification.error.verification"));
                setSuccess(false);
            }
        } catch (err) {
            console.error(err);
            setError(t("verification.error.unexpected"));
            setSuccess(false);
        }
    };

    return (
        <div className="relative h-screen flex items-center bg-gray-100 dark:bg-gray-900">
            <div className="absolute inset-0 lg:grid grid-cols-2">
                <div className="relative h-full hidden lg:block">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-teal-400 to-blue-600 clip-path-diagonal">
                        <Image
                            src="/images/verification.png"
                            alt={t("verification.imageAlt")}
                            fill
                            style={{ objectFit: "cover" }}
                            className="opacity-90"
                        />
                    </div>
                </div>

                <div className="relative flex justify-center items-center">
                    <div className="rounded-2xl p-10 w-full max-w-lg bg-white dark:bg-gray-800 shadow-md">
                        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center mb-6">
                            {t("verification.title")}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-300 text-center mb-4">
                            {t("verification.instructions")}
                        </p>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    {t("verification.emailLabel")}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-2 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={t("verification.emailPlaceholder")}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="verificationCode"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    {t("verification.codeLabel")}
                                </label>
                                <input
                                    type="text"
                                    id="verificationCode"
                                    name="verificationCode"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    required
                                    className="mt-2 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={t("verification.codePlaceholder")}
                                />
                            </div>

                            {error && (
                                <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
                            )}

                            {success && (
                                <p className="text-green-500 dark:text-green-400 text-sm">
                                    {t("verification.successMessage")}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-teal-400 dark:bg-teal-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-teal-500 dark:hover:bg-teal-700 transition-colors"
                            >
                                {t("verification.buttonText")}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Verification;
