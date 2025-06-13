// app/subscription-success/page.tsx
"use client";

import React, { useEffect, useState, Suspense } from 'react'; // Afegit Suspense
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { useAuth } from '../components/AuthContext'; // Ajusta la ruta si cal
import { useTranslation } from "react-i18next";


// Component Intern que utilitza useSearchParams
const SuccessContent = () => {
    const searchParams = useSearchParams();
    // Comprovació de nul·litat abans de cridar .get()
    const sessionId = searchParams ? searchParams.get('session_id') : null;

    // Assegura't que `token` és el que necessites per a `fetchWithAuth`.
    // Si `fetchWithAuth` gestiona el token internament, només necessites `isAuthenticated` per a la lògica condicional.
    const { isAuthenticated, fetchWithAuth } = useAuth();

    const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'error' | 'not_checked'>('not_checked');
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation("common");

    useEffect(() => {
        // Comprovem que sessionId existeix i que tenim el token (o isAuthenticated és true) abans de fer la crida.
        // També, només executem si l'estat de verificació és 'not_checked' per evitar crides múltiples.
        if (sessionId && verificationStatus === 'not_checked') {
            console.log("[SubscriptionSuccess] Session ID trobada:", sessionId, "Intentant verificar...");
            setIsLoading(true);
            setVerificationStatus('pending');

            const verifySession = async () => {
                try {
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                    // L'endpoint /subscriptions/verify-checkout-session l'hauries de crear al teu backend
                    const response = await fetchWithAuth(`${apiUrl}/subscriptions/verify-checkout-session`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            // fetchWithAuth ja hauria d'afegir la capçalera Authorization si token existeix
                        },
                        body: JSON.stringify({ session_id: sessionId }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data.status === 'completed' || data.subscription_status === 'active' || data.subscription_status === 'trialing') {
                            console.log("[SubscriptionSuccess] Verificació de sessió OK:", data);
                            setVerificationStatus('verified');
                        } else {
                            console.warn("[SubscriptionSuccess] Sessió no completada o subscripció no activa segons el backend:", data);
                            setVerificationStatus('pending');
                        }
                    } else {
                        const errorData = await response.json();
                        console.error("[SubscriptionSuccess] Error verificant la sessió amb el backend:", errorData);
                        setVerificationStatus('error');
                    }
                } catch (error) {
                    console.error('[SubscriptionSuccess] Error en la crida de verificació de sessió:', error);
                    setVerificationStatus('error');
                } finally {
                    setIsLoading(false);
                }
            };

            verifySession();
        } else if (!sessionId && verificationStatus === 'not_checked') { // Només actualitza si encara no s'ha comprovat
            console.log("[SubscriptionSuccess] No hi ha session_id a la URL. Mostrant missatge estàndard d'èxit pendent de webhook.");
            setVerificationStatus('pending');
        }
        // Les dependències de useEffect s'han d'escollir amb cura.
        // Si fetchWithAuth o isAuthenticated canvien de referència innecessàriament, pot causar re-execucions.
        // Normalment, sessionId i token són les claus per decidir si es fa la crida.
    }, [sessionId, verificationStatus, fetchWithAuth]); // Afegit fetchWithAuth per si la seva referència canvia

    // El JSX per al contingut de la pàgina (missatges, botons) va aquí
    return (
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-xl shadow-2xl">
            <div>
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                    {t("subscription_succes.succes") || "Subscripció Iniciada amb Èxit!"}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
                    {t("subscription_succes.thank") || "Gràcies per subscriure't a Clothy.es. Estem processant la teva subscripció."}
                </p>
            </div>

            {isLoading && (
                <div className="flex justify-center items-center space-x-2 mt-6">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("subscription_succes.verify") || "Verificant l'estat de la subscripció..."}

                    </p>
                </div>
            )}

            {!isLoading && verificationStatus === 'verified' && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-700 border-l-4 border-green-400 dark:border-green-600 rounded-md">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <CheckCircle className="h-5 w-5 text-green-400 dark:text-green-300" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-green-700 dark:text-green-50">
                                {t("subscription_succes.activate") || "La teva subscripció ha estat confirmada i ja està activa!"}

                            </p>
                        </div>
                    </div>
                </div>
            )}

            {!isLoading && (verificationStatus === 'pending' || verificationStatus === 'not_checked') && (
                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-700 border-l-4 border-yellow-400 dark:border-yellow-600 rounded-md">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <AlertTriangle className="h-5 w-5 text-yellow-400 dark:text-yellow-300" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-yellow-700 dark:text-yellow-50">
                                {t("subscription_succes.activating") || "La teva subscripció s'està activant. Normalment triga uns segons. "}

                            </p>
                            <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-200">
                                {t("subscription_succes.confirmating") || "Rebràs una confirmació quan estigui llesta (o ja pots revisar el teu perfil). La confirmació final depèn del processament del nostre sistema (webhooks)."}

                            </p>
                        </div>
                    </div>
                </div>
            )}

            {!isLoading && verificationStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-700 border-l-4 border-red-400 dark:border-red-600 rounded-md">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <AlertTriangle className="h-5 w-5 text-red-400 dark:text-red-300" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-red-700 dark:text-red-50">
                                {t("subscription_succes.problem") || "Hi ha hagut un problema verificant l'estat de la teva subscripció immediatament."}

                            </p>
                            <p className="mt-1 text-sm text-red-600 dark:text-red-200">
                                {t("subscription_succes.dont_worry") || "No et preocupis, si el pagament ha estat correcte, el nostre sistema l'activarà aviat. Si us plau, revisa el teu perfil en uns minuts."}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8">
                <Link
                    href="/"
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-faqblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors"
                >
                    {t("subscription_succes.return") || "Tornar a la pàgina principal"}
                </Link>
            </div>
            <div className="mt-4">
                <Link
                    href="/profile"
                    className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 text-sm font-semibold rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors"
                >
                    {t("subscription_succes.profile") || "Anar al meu Perfil"}
                </Link>
            </div>
        </div>
    );
};

// Component principal de la pàgina
const SubscriptionSuccessPage = () => {
    const { t } = useTranslation("common");
    return (
        // Contenidor principal que ocupa tota l'alçada i centra el contingut
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 via-teal-50 to-green-100 dark:from-slate-900 dark:via-teal-900 dark:to-green-900 py-12 px-4 sm:px-6 lg:px-8">
            <Suspense
                fallback={ // El que es mostra mentre SuccessContent (i useSearchParams) es carrega
                    <div className="flex flex-col items-center">
                        <Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-sky-400" />
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            {t("subscription_succes.charging") || "Carregant..."}
                        </p>
                    </div>
                }
            >
                <SuccessContent />
            </Suspense>
            {/* El Footer anirà al layout principal (app/layout.tsx) per estar sempre a sota de tot */}
        </div>
    );
};

export default SubscriptionSuccessPage;