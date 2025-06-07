"use client";
import React, { useState, useEffect } from "react";
import SessionExpiredModal from "../components/SessionExpiredModal/index"; // Importem el modal
import { useAuth } from "../components/AuthContext/index";
import SuccesModal from "../components/Notifications/SuccesModal";
import ErrorModal from "../components/Notifications/ErrorModal";
import { useTranslation } from "react-i18next";
import RenderFilter from "../components/Filters/RenderFilter"; // Importem el component de filtres
import { filters } from "../components/Filters/cloth_filters";
import Head from "next/head";
import Link from 'next/link'; // [AFEGIT] Per al botó de subscripció
import { Loader2, Star, ShieldCheck, Zap } from 'lucide-react'; // [AFEGIT] Icones per a la secció de subscripció

interface UserSubscriptionStatus {
    has_active_subscription: boolean;
    status?: string;
    current_plan_id?: string;
    current_period_end?: string;
    cancel_at_period_end?: boolean;
    plan_name?: string; // Podries afegir el nom del pla des del backend
}

const UserProfile = () => {
    const { t } = useTranslation('common');

    const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);
    const { fetchWithAuth } = useAuth();
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "********",
        fullName: "",
        birthDate: "",
        gender: "",
        height: "",
        weight: "",
        location: "",
        country: "",
    });

    // Estats per gestionar el RenderFilter del país
    const [expandedFilter, setExpandedFilter] = React.useState<string>(""); // Estat a nivell global
    const [filtersState, setFiltersState] = useState<Record<string, string>>({ country: userData.country });
    const [subscriptionInfo, setSubscriptionInfo] = useState<UserSubscriptionStatus | null>(null);
    const [isLoadingSubscription, setIsLoadingSubscription] = useState(true);
    const [isManagingSubscription, setIsManagingSubscription] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoadingSubscription(true); // Comença la càrrega
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;

                // Fem les dues crides en paral·lel per a més eficiència
                const profilePromise = fetchWithAuth(`${apiUrl}/users/profile`);
                const subscriptionPromise = fetchWithAuth(`${apiUrl}/subscriptions/my-subscription`);

                const [profileResponse, subscriptionResponse] = await Promise.all([profilePromise, subscriptionPromise]);

                // Processar el perfil de l'usuari
                if (profileResponse.ok) {
                    const data = await profileResponse.json();
                    setUserData(prev => ({ ...prev, ...data }));
                } else {
                    console.error("Error obtenint el perfil de l'usuari.");
                }

                // Processar l'estat de la subscripció
                if (subscriptionResponse.ok) {
                    const subData = await subscriptionResponse.json();
                    setSubscriptionInfo(subData);
                } else {
                    console.error("Error obtenint l'estat de la subscripció.");
                    setSubscriptionInfo({ has_active_subscription: false }); // Assumeix que no hi ha subscripció si falla
                }

            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoadingSubscription(false); // Acaba la càrrega
            }
        };

        fetchUserData();
    }, [fetchWithAuth]);

    // Sincronitzar el valor de userData.country amb filtersState quan es carrega el perfil
    useEffect(() => {
        setFiltersState({ country: userData.country });
    }, [userData.country]);

    // Quan es canvia el filtre, actualitzar userData
    useEffect(() => {
        if (filtersState.country !== userData.country) {
            setUserData((prev) => ({ ...prev, country: filtersState.country }));
        }
    }, [filtersState.country]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetchWithAuth(`${apiUrl}/users/profile`, {
                    method: "GET",
                });

                if (response.ok) {
                    const data = await response.json();

                    // Actualitza les dades de l'usuari amb la resposta de l'API
                    setUserData((prevData) => ({
                        username: data.username || prevData.username,
                        email: data.email || prevData.email,
                        password: data.password || prevData.password, // Afegir la propietat password
                        fullName: data.fullName || prevData.fullName,
                        birthDate: data.birthDate || prevData.birthDate,
                        gender: data.gender || prevData.gender,
                        height: data.height || prevData.height,
                        weight: data.weight || prevData.weight,
                        location: data.location || prevData.location,
                        country: data.country || prevData.country,
                    }));
                } else {
                    throw new Error("Error obtenint el perfil de l'usuari.");
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, [fetchWithAuth]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const [isSucessModalOpen, setIsSucessModalOpen] = useState(false);
    const handleCloseSucessModal = () => {
        setIsSucessModalOpen(false);
    };

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const handleCloseErrorModal = () => {
        setIsErrorModalOpen(false);
    };

    const handleManageSubscription = async () => {
        setIsManagingSubscription(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetchWithAuth(`${apiUrl}/subscriptions/create-customer-portal-session`, {
                method: 'POST',
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "No s'ha pogut obrir el portal de gestió.");
            }
            const data = await response.json();
            window.location.href = data.url; // Redirigeix l'usuari al portal de Stripe
        } catch (error: any) {
            alert(`Error: ${error.message}`);
            setIsManagingSubscription(false);
        }
    };

    const saveChanges = () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        // Prepara les dades per enviar-les al backend
        const profileData = {
            email: userData.email,
            username: userData.username || null,
            fullName: userData.fullName || null,
            birthDate: userData.birthDate || null,
            gender: userData.gender || null,
            height: userData.height ? parseFloat(userData.height) : null,
            weight: userData.weight ? parseFloat(userData.weight) : null,
            location: userData.location || null,
            country: userData.country || null,
        };

        console.log("Dades enviades", profileData);

        fetch(`${apiUrl}/users/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profileData),
        })
            .then((response) => {
                if (response.ok) {
                    setIsSucessModalOpen(true);
                } else {
                    return response.json().then((data) => {
                        throw new Error(data.detail || "Error desconocido al actualizar el perfil.");
                    });
                }
            })
            .catch((error) => {
                console.error("Error al actualizar el perfil:", error);
                alert("Error al actualizar el perfil.");
            });
    };

    return (
        <>
            {/* SEO i metadades per la pàgina de perfil */}
            <Head>
                <title>{t("seo.profile.title")}</title>
                <meta name="description" content={t("seo.profile.description")}/>
                <meta name="robots" content="index, follow"/>

                {/* Open Graph */}
                <meta property="og:title" content={t("seo.profile.title")}/>
                <meta property="og:description" content={t("seo.profile.description")}/>
                <meta property="og:image" content="/images/og-image-profile.jpg"/>
                <meta property="og:url" content="https://www.clothy.es/profile"/>

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={t("seo.profile.title")}/>
                <meta name="twitter:description" content={t("seo.profile.description")}/>
                <meta name="twitter:image" content="/images/og-image-profile.jpg"/>

                {/* Enllaços alternatius per als idiomes */}
                <link rel="alternate" href="https://www.clothy.es/profile" hrefLang="es"/>
                <link rel="alternate" href="https://www.clothy.es/profile" hrefLang="en"/>
                <link rel="alternate" href="https://www.clothy.es/profile" hrefLang="ca"/>
                <link rel="alternate" href="https://www.clothy.es/profile" hrefLang="ch"/>
                <link rel="alternate" href="https://www.clothy.es/profile" hrefLang="ar"/>
                <link rel="alternate" href="https://www.clothy.es/profile" hrefLang="bn"/>
                <link rel="alternate" href="https://www.clothy.es/profile" hrefLang="de"/>
                <link rel="alternate" href="https://www.clothy.es/profile" hrefLang="fr"/>
                <link rel="alternate" href="https://www.clothy.es/profile" hrefLang="hi"/>
                <link rel="alternate" href="https://www.clothy.es/profile" hrefLang="ja"/>
                <link rel="alternate" href="https://www.clothy.es/profile" hrefLang="ko"/>
                <link rel="alternate" href="https://www.clothy.es/profile" hrefLang="pt"/>
                <link rel="alternate" href="https://www.clothy.es/profile" hrefLang="ru"/>
                <link rel="alternate" href="https://www.clothy.es/profile" hrefLang="tr"/>
                <link rel="alternate" href="https://www.clothy.es/profile" hrefLang="x-default"/>
            </Head>

            <div className="text-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
                {/* Header */}
                <header className="bg-blue-600 dark:bg-blue-800 py-6">
                    <div className="max-w-7xl mx-auto text-center text-black dark:text-white">
                        <h1 className="text-4xl font-extrabold">{t('profile.title')}</h1>
                        <p className="mt-2 text-lg">{t('profile.subtitle')}</p>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 bg-white dark:bg-gray-900 py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="rounded-lg p-8 bg-gray-100 dark:bg-gray-800 shadow-lg">
                            <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-6">{t('profile.personalInfo')}</h2>

                            {/* Username */}
                            <div className="mb-6">
                                <label
                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300">{t('profile.username')}</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={userData.username}
                                    onChange={handleInputChange}
                                    className="mt-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-6">
                                <label
                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300">{t('profile.email')}</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    disabled
                                    className="mt-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-6">
                                <label
                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300">{t('profile.password')}</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={userData.password}
                                    disabled
                                    className="mt-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {t('profile.changePassword')} <a href="/reset-password"
                                                                     className="text-blue-600 dark:text-blue-400 underline">{t('profile.here')}</a>.
                                </p>
                            </div>

                            {/* Optional Fields */}
                            <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mt-12 mb-6">{t('profile.additionalOptions')}</h2>
                            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 italic">{t('profile.additionalOptionsText')}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div>
                                    <label
                                        className="block text-lg font-medium text-gray-700 dark:text-gray-300">{t('profile.fullName')}</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={userData.fullName}
                                        onChange={handleInputChange}
                                        className="mt-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    />
                                </div>

                                {/* Birth Date */}
                                <div>
                                    <label
                                        className="block text-lg font-medium text-gray-700 dark:text-gray-300">{t('profile.birthDate')}</label>
                                    <input
                                        type="date"
                                        name="birthDate"
                                        value={userData.birthDate}
                                        onChange={handleInputChange}
                                        className="mt-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    />
                                </div>

                                {/* Gender */}
                                <div>
                                    <label
                                        className="block text-lg font-medium text-gray-700 dark:text-gray-300">{t('profile.gender')}</label>
                                    <select
                                        name="gender"
                                        value={userData.gender}
                                        onChange={handleInputChange}
                                        className="mt-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    >
                                        <option value="">{t('profile.select')}</option>
                                        <option value="male">{t('profile.male')}</option>
                                        <option value="female">{t('profile.female')}</option>
                                        <option value="non-binary">{t('profile.nonBinary')}</option>
                                    </select>
                                </div>

                                {/* Height */}
                                <div>
                                    <label
                                        className="block text-lg font-medium text-gray-700 dark:text-gray-300">{t('profile.height')}</label>
                                    <input
                                        type="number"
                                        name="height"
                                        value={userData.height}
                                        onChange={handleInputChange}
                                        className="mt-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    />
                                </div>

                                {/* Weight */}
                                <div>
                                    <label
                                        className="block text-lg font-medium text-gray-700 dark:text-gray-300">{t('profile.weight')}</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={userData.weight}
                                        onChange={handleInputChange}
                                        className="mt-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    />
                                </div>

                                {/* Location */}
                                <div>
                                    <label
                                        className="block text-lg font-medium text-gray-700 dark:text-gray-300">{t('profile.location')}</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={userData.location}
                                        onChange={handleInputChange}
                                        className="mt-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    />
                                </div>

                                {/* Country: MODIFICAT per usar RenderFilter */}
                                <div>
                                    <label
                                        className="block text-lg font-medium text-gray-700 dark:text-gray-300">{t('profile.country')}</label>
                                    <div className="mt-2 bg-white dark:bg-gray-700">
                                        <RenderFilter
                                            key="country"
                                            filterKey="country"
                                            filterOptions={filters["country"]}
                                            expandedFilter={expandedFilter}
                                            setExpandedFilter={setExpandedFilter}
                                            filtersState={filtersState}
                                            setFiltersState={setFiltersState}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* [SECCIÓ NOVA] - Apartat de Subscripció */}
                            <div className="rounded-lg p-8 bg-gray-100 dark:bg-gray-800 shadow-lg mt-12">
                                <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-6">{t('profile.subscription')}</h2>

                                {isLoadingSubscription ? (
                                    <div className="flex items-center justify-center h-24">
                                        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                                        <p className="ml-4 text-gray-600 dark:text-gray-400">{t('profile.loadingSubscription')}</p>
                                    </div>
                                ) : subscriptionInfo && subscriptionInfo.has_active_subscription ? (
                                    // Vista per a usuaris amb subscripció activa
                                    <div>
                                        <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 rounded-lg p-4 flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <Star className="h-10 w-10 text-green-500" />
                                            </div>
                                            <div className="flex-grow">
                                                <p className="font-semibold text-lg text-gray-800 dark:text-white">
                                                    {t('profile.currentPlan')}: <span className="font-bold text-green-600 dark:text-green-400">{subscriptionInfo.plan_name || 'Premium'}</span>
                                                </p>
                                                {subscriptionInfo.cancel_at_period_end ? (
                                                    <p className="text-sm text-orange-600 dark:text-orange-400">
                                                        {t('profile.subscriptionWillEnd', { date: new Date(subscriptionInfo.current_period_end!).toLocaleDateString('ca-ES') })}
                                                    </p>
                                                ) : (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {t('profile.renewsOn', { date: new Date(subscriptionInfo.current_period_end!).toLocaleDateString('ca-ES') })}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleManageSubscription}
                                            disabled={isManagingSubscription}
                                            className="mt-6 w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-wait"
                                        >
                                            {isManagingSubscription ? (
                                                <Loader2 className="h-5 w-5 animate-spin mr-3" />
                                            ) : (
                                                <ShieldCheck className="h-5 w-5 mr-3" />
                                            )}
                                            {t('profile.manageSubscription')}
                                        </button>
                                    </div>
                                ) : (
                                    // Vista per a usuaris sense subscripció activa
                                    <div>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">{t('profile.noActiveSubscription')}</p>
                                        <Link href="/subscription-plans" legacyBehavior>
                                            <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-800">
                                                <Zap className="h-5 w-5 mr-3" />
                                                {t('profile.viewPlans')}
                                            </a>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Save Button */}
                            <div className="mt-12 text-center">
                                <button
                                    onClick={saveChanges}
                                    className="bg-blue-600 dark:bg-blue-700 text-black dark:text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-800"
                                >
                                    {t('profile.saveChanges')}
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

        </>
    );
};

export default UserProfile;
