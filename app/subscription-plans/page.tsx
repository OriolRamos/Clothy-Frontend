// app/subscription-plans/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from "@/app/components/AuthContext"; // Ajusta la ruta si cal
import {
    Loader2, AlertTriangle, Check, Zap, ShieldCheck, Star,
    Search, History, Mail, Archive, TrendingUp, Sparkles, Gift, PlusCircle, Wand2, Percent, Award, CalendarHeart, Camera, Bell
} from 'lucide-react';
import Footer from "@/app/components/Footer"; // Importa el teu Footer

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

const iconMap: { [key: string]: React.ElementType } = {
    Search, History, Mail, Star, Zap, Archive, TrendingUp, Sparkles, ShieldCheck, Gift, Check, PlusCircle, Wand2, Percent, Award, CalendarHeart, Camera, Bell
};

interface UserSubscriptionStatus {
    has_active_subscription: boolean;
    status?: string;
    current_plan_id?: string;
    current_period_end?: string; // Stripe retorna una data, la gestionarem com a string
    cancel_at_period_end?: boolean;
}

interface PlanFeature {
    text: string;
    icon_name?: string;
}
interface Plan {
    button_color_class: string;
    bg_color_class: string | undefined;
    id: string;
    name: string;
    price_display: string;
    description: string;
    product_id?: string;
    features: PlanFeature[];
    bgColorClass: string;
    textColorClass: string;
    buttonColorClass: string;
    borderColorClass?: string; // Opcional, per a la targeta destacada
    highlight?: boolean;
}

const PricingPlansPage = () => {
    const { isAuthenticated, fetchWithAuth } = useAuth();
    const [plans, setPlans] = useState<Plan[]>([]);
    const [isLoadingPlans, setIsLoadingPlans] = useState(true);
    const [errorLoadingPlans, setErrorLoadingPlans] = useState<string | null>(null);
    const [isSubscribing, setIsSubscribing] = useState<string | null>(null);
    const [subscriptionStatus, setSubscriptionStatus] = useState<UserSubscriptionStatus | null>(null);
    const [isProcessingAction, setIsProcessingAction] = useState<string | null>(null); // Per a 'Subscriure's' o 'Gestionar'


    // [MILLORA] Lògica per estilitzar plans, extreta a una funció auxiliar per a més claredat
    const getStyledPlans = (plansData: any[]): Plan[] => {
        return plansData.map((planData, index) => {
            let planSpecifics: Partial<Plan> = {
                features: [{ text: "Característica base", icon_name: "Check" }],
                bgColorClass: "bg-white dark:bg-slate-800",
                textColorClass: "text-slate-700 dark:text-slate-300",
                buttonColorClass: "bg-teal-500 hover:bg-teal-600 text-white",
                borderColorClass: "border-transparent",
                highlight: false,
            };

            if (planData.name.toLowerCase().includes("fan") || index === 1) {
                planSpecifics = {
                    features: [
                        { text: "Tot el del pla Supporter", icon_name: "PlusCircle" },
                        { text: "Assistent d'outfit amb IA", icon_name: "Wand2" },
                        { text: "Historial de cerques complet", icon_name: "Archive" },
                        { text: "Descomptes exclusius", icon_name: "Percent" },
                    ],
                    bgColorClass: "bg-sky-600 dark:bg-sky-700",
                    textColorClass: "text-white",
                    buttonColorClass: "bg-white hover:bg-slate-100 text-sky-600",
                    borderColorClass: "border-sky-400",
                    highlight: true,
                };
            } else if (planData.name.toLowerCase().includes("founder") || index === 2) {
                planSpecifics = {
                    features: [
                        { text: "Totes les funcions del pla Fan", icon_name: "Award" },
                        { text: "Suport prioritari VIP", icon_name: "ShieldCheck" },
                        { text: "Accés anticipat a novetats", icon_name: "Gift" },
                        { text: "Esdeveniments exclusius Clothy", icon_name: "CalendarHeart" },
                    ],
                    bgColorClass: "bg-gradient-to-br from-gray-900 via-black to-red-900/50 dark:from-black dark:to-red-900/30",
                    textColorClass: "text-white",
                    buttonColorClass: "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white",
                    borderColorClass: "border-red-500/50",
                };
            } else { // Pla Bàsic/Supporter
                planSpecifics = {
                    features: [
                        { text: "Accés complet a cerques", icon_name: "Search" },
                        { text: "Cerques il·limitades per imatge", icon_name: "Camera" },
                        { text: "Alerta de preus avançada", icon_name: "Bell" },
                        { text: "Historial de cerques (15 dies)", icon_name: "History" },
                    ],
                    bgColorClass: "bg-teal-400 hover:bg-teal-600 text-white",
                    buttonColorClass: "bg-white",
                    textColorClass: "text-teal-600"
                };
            }

            return { ...planData, ...planSpecifics } as Plan;
        });
    };

    // [CORRECCIÓ] Un únic useEffect per carregar totes les dades necessàries
    useEffect(() => {
        const loadPageData = async () => {
            setIsLoadingPlans(true);
            setErrorLoadingPlans(null);

            try {
                // Sempre carreguem els plans disponibles
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const plansResponse = await fetch(`${apiUrl}/subscriptions/plans`);
                if (!plansResponse.ok) throw new Error('No s\'ha pogut carregar els plans.');
                const plansData = await plansResponse.json();
                setPlans(getStyledPlans(plansData)); // Estilitzem i desem els plans
                console.log("[PricingPlans] Plans carregats i estilitzats.");

                // Si l'usuari està autenticat, comprovem el seu estat de subscripció
                if (isAuthenticated) {
                    console.log("[PricingPlans] Usuari autenticat. Comprovant estat de subscripció...");
                    const subResponse = await fetchWithAuth(`${apiUrl}/subscriptions/my-subscription`);
                    if (!subResponse.ok) throw new Error("No s'ha pogut obtenir l'estat de la teva subscripció.");
                    const subData: UserSubscriptionStatus = await subResponse.json();
                    setSubscriptionStatus(subData);
                    console.log("[PricingPlans] Estat de subscripció obtingut:", subData);
                } else {
                    // Si no està autenticat, resetejem l'estat de subscripció
                    setSubscriptionStatus(null);
                }
            } catch (err: any) {
                setErrorLoadingPlans(err.message || "Error desconegut carregant les dades.");
                console.error("Error a loadPageData:", err);
            } finally {
                setIsLoadingPlans(false);
            }
        };

        // Només carreguem si l'estat d'autenticació no està carregant
        if (!isAuthenticated) {
            loadPageData();
        }
    }, [isAuthenticated, isAuthenticated, fetchWithAuth]);



    const handleManageSubscription = async () => {
        setIsProcessingAction('manage');
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetchWithAuth(`${apiUrl}/subscriptions/create-customer-portal-session`, { method: 'POST' });
            if (!response.ok) throw new Error("No s'ha pogut obrir el portal de gestió.");
            const data = await response.json();
            window.location.href = data.url;
        } catch (error: any) {
            alert(`Error: ${error.message}`);
            setIsProcessingAction(null);
        }
    };

    const handleSubscribeClick = async (priceId: string, planName: string) => {
        setIsSubscribing(priceId);

        if (!isAuthenticated) {
            alert("Si us plau, inicia sessió o crea un compte per subscriure't.");
            setIsSubscribing(null); return;
        }
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetchWithAuth(`${apiUrl}/subscriptions/create-checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ price_id: priceId }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'No s\'ha pogut iniciar el procés de pagament.');
            }
            const session = await response.json();
            const { sessionId } = session;
            const stripe = await stripePromise;
            if (stripe && sessionId) {
                const { error } = await stripe.redirectToCheckout({ sessionId });
                if (error) alert(`Error en la redirecció al pagament: ${error.message}`);
            } else {
                alert("Hi ha hagut un problema preparant el pagament.");
            }
        } catch (error: any) {
            alert(`Error de subscripció: ${error.message || 'Error inesperat.'}`);
        } finally {
            setIsSubscribing(null);
        }
    };

    // Estats de Càrrega i Error (pots estilitzar-los més si vols)
    if (isLoadingPlans) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-100 dark:bg-slate-900">
                <Loader2 className="h-16 w-16 animate-spin text-teal-500" />
                <p className="ml-4 text-xl text-slate-700 dark:text-slate-300">Carregant plans...</p>
            </div>
        );
    }
    if (errorLoadingPlans) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen text-center px-4 bg-slate-100 dark:bg-slate-900">
                <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
                <h2 className="text-3xl font-semibold mb-3 text-slate-800 dark:text-white">Error Carregant Plans</h2>
                <p className="text-red-600 dark:text-red-400 mb-8">{errorLoadingPlans}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-lg text-lg"
                >
                    Reintentar
                </button>
            </div>
        );
    }
    if (plans.length === 0 && !isLoadingPlans) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen text-center px-4 bg-slate-100 dark:bg-slate-900">
                <AlertTriangle className="h-16 w-16 text-yellow-500 mb-4" />
                <h2 className="text-3xl font-semibold mb-3 text-slate-800 dark:text-white">No hi ha Plans Disponibles</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    {"Actualment no tenim plans de subscripció disponibles. Si us plau, torna a intentar-ho més tard."}
                </p>
                <Link href="/" legacyBehavior>
                    <a className="text-teal-500 hover:text-teal-400 text-lg">{"Tornar a l'inici"}</a>
                </Link>
            </div>
        );
    }

    // [NOVA VISTA] Si l'usuari ja té una subscripció activa
    if (isAuthenticated && subscriptionStatus?.has_active_subscription) {
        const currentPlan = plans.find(p => p.id === subscriptionStatus.current_plan_id);
        const periodEndDate = subscriptionStatus.current_period_end
            ? new Date(subscriptionStatus.current_period_end).toLocaleDateString('ca-ES', { day: 'numeric', month: 'long', year: 'numeric' })
            : '';

        return (
            <div className="flex flex-col min-h-screen">
                <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-sky-100 via-teal-50 to-green-100 dark:from-slate-900 dark:via-teal-900 dark:to-green-900 py-12 px-4">
                    <div className="w-full max-w-lg text-center">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
                            <Star className="mx-auto h-16 w-16 text-yellow-400 mb-4" />
                            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2">
                                El Teu Pla Actual
                            </h1>
                            {currentPlan ? (
                                <p className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-6">{currentPlan.name}</p>
                            ) : (
                                <p className="text-lg text-slate-500 mb-6">Pla actiu</p>
                            )}

                            {subscriptionStatus.cancel_at_period_end ? (
                                <div className="bg-orange-100 dark:bg-orange-800 border-l-4 border-orange-500 text-orange-700 dark:text-orange-200 p-4 rounded-md mb-6">
                                    La teva subscripció ha estat cancel·lada i **finalitzarà el {periodEndDate}**.
                                </div>
                            ) : (
                                <p className="text-slate-600 dark:text-slate-300 mb-6">
                                    El teu accés es renovarà el **{periodEndDate}**.
                                </p>
                            )}

                            <button
                                onClick={handleManageSubscription}
                                disabled={isProcessingAction === 'manage'}
                                className="w-full font-semibold py-3.5 px-6 rounded-lg text-lg shadow-md transition-all duration-300 ease-in-out bg-slate-700 hover:bg-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-wait"
                            >
                                {isProcessingAction === 'manage' ? <Loader2 className="animate-spin h-6 w-6 mx-auto" /> : "Gestionar Subscripció"}
                            </button>
                            <p className="text-xs text-slate-500 mt-3">
                                Canvia de pla, actualitza el mètode de pagament o cancel·la la teva subscripció.
                            </p>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        // embolcalla tot amb un div que permeti que el footer quedi a sota de tot
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow"> {/* Aquesta serà la secció principal que s'expandeix */}
                <div className="bg-gradient-to-br from-sky-100 via-teal-50 to-green-100 dark:from-slate-900 dark:via-teal-900 dark:to-green-900 text-slate-800 dark:text-slate-200 py-16 px-4 sm:px-6 lg:px-8">
                    <div className="container mx-auto">
                        <header className="text-center mb-20">
                            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl xl:text-7xl">
                                <span className="block">Plans Flexibles per a</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-sky-500 to-green-400 mt-2">
                                    Clothy.es
                                </span>
                            </h1>
                            <p className="mt-8 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300">
                                {"Escull el pla que millor s'adapti a les teves necessitats i desbloqueja tot el potencial de la moda intel·ligent."}
                            </p>
                        </header>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 items-stretch">
                            {plans.map((plan) => {
                                const FeatureIcon = ({ iconName }: { iconName?: string }) => {
                                    const IconComponent = iconName ? iconMap[iconName] : Check;
                                    return IconComponent ? <IconComponent className={`h-5 w-5 mr-3 flex-shrink-0 ${plan.highlight ? 'text-sky-300' : 'text-teal-500 dark:text-teal-400'}`} /> : null;
                                };

                                return (
                                    <div
                                        key={plan.id}
                                        className={`
                                            rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-2xl
                                            border-2 ${plan.borderColorClass}
                                            transform transition-all duration-300 ease-out
                                            ${plan.bg_color_class} 
                                            ${plan.highlight ? 'scale-105 z-10' : 'hover:shadow-3xl hover:-translate-y-1'}
                                        `}
                                    >
                                        {plan.highlight && (
                                            <div className="absolute top-0 -right-10 transform rotate-45 bg-pink-500 text-white text-xs font-semibold py-1.5 px-12 shadow-md">
                                                Popular
                                            </div>
                                        )}
                                        <div className={`mb-8 ${plan.textColorClass}`}>
                                            <h3 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">{plan.name}</h3>
                                            <p className="text-4xl sm:text-5xl font-extrabold mb-3">
                                                {plan.price_display.split('/')[0]}
                                                <span className="text-lg sm:text-xl font-medium opacity-70">/{plan.price_display.split('/')[1] || 'mes'}</span>
                                            </p>
                                            <p className="text-sm opacity-80 min-h-[40px] sm:min-h-[60px]">{plan.description}</p>
                                        </div>

                                        <ul className={`space-y-3 sm:space-y-4 mb-10 flex-grow ${plan.textColorClass} opacity-90 text-sm sm:text-base`}>
                                            {plan.features && plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-start">
                                                    <FeatureIcon iconName={feature.icon_name} />
                                                    <span>{feature.text}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <button
                                            onClick={() => handleSubscribeClick(plan.id, plan.name)}
                                            disabled={isSubscribing === plan.id }
                                            className={`
                                                w-full font-semibold py-3.5 px-6 rounded-lg text-base sm:text-lg shadow-md
                                                transition-all duration-300 ease-in-out
                                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
                                                ${plan.highlight ? 'focus:ring-white' : 'focus:ring-teal-500'}
                                                ${isSubscribing === plan.id 
                                                ? 'bg-slate-400 dark:bg-slate-600 text-slate-200 dark:text-slate-400 cursor-not-allowed'
                                                : `${plan.button_color_class} hover:brightness-110 transform hover:-translate-y-px active:translate-y-0 active:brightness-95`
                                            }
                                            `}
                                        >
                                            {isSubscribing === plan.id ? (
                                                <Loader2 className="animate-spin h-6 w-6 mx-auto" />
                                            ) : "Començar Ara"}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>
            <Footer /> {/* Footer fora del div principal del contingut de la pàgina */}
        </div>
    );
};

export default PricingPlansPage;