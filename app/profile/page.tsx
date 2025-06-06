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
