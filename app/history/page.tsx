"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/AuthContext";
import { useTranslation } from "react-i18next";
import ErrorModal from "../components/Notifications/ErrorModal";

type HistoryEntry = {
    search_id: string;
    search_date: string;
    cloth_count?: number;
    filters?: Record<string, any>;
};

const HistorialBusquedas = () => {
    const { t } = useTranslation("common");
    const { fetchWithAuth } = useAuth();
    const router = useRouter();

    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetchWithAuth(`${apiUrl}/profile/history`, {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                // Ordenem de més recent a menys recent
                const sortedHistory = data.sort(
                    (a: HistoryEntry, b: HistoryEntry) =>
                        new Date(b.search_date).getTime() - new Date(a.search_date).getTime()
                );
                setHistory(sortedHistory);
            } else {
                setErrorModalOpen(true);
                console.error("Error al obtenir l'historial.");
            }
        } catch (error) {
            console.error(error);
            setErrorModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    // Quan l'usuari fa click en una entrada, redirigeix a la pàgina dinàmica
    const handleClick = (searchId: string) => {
        router.push(`/history/${searchId}`);
    };

    return (
        <>
            {/* Metadades SEO */}
            <Head>
                <title>{t("seo.history.title")}</title>
                <meta name="description" content={t("seo.history.description")} />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:title" content={t("seo.history.title")} />
                <meta property="og:description" content={t("seo.history.description")} />
                <meta property="og:image" content="/images/og-image-history.jpg" />
                <meta property="og:url" content="https://www.clothy.com/history" />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={t("seo.history.title")} />
                <meta name="twitter:description" content={t("seo.history.description")} />
                <meta name="twitter:image" content="/images/og-image-history.jpg" />

                {/* Enllaços alternatius per a SEO multilingüe */}
                <link rel="alternate" href="https://www.clothy.com/history" hrefLang="ca" />
                <link rel="alternate" href="https://www.clothy.com/history" hrefLang="es" />
                <link rel="alternate" href="https://www.clothy.com/history" hrefLang="en" />
                <link rel="alternate" href="https://www.clothy.com/history" hrefLang="fr" />
                <link rel="alternate" href="https://www.clothy.com/history" hrefLang="de" />
                <link rel="alternate" href="https://www.clothy.com/history" hrefLang="it" />
                <link rel="alternate" href="https://www.clothy.com/history" hrefLang="pt" />
                <link rel="alternate" href="https://www.clothy.com/history" hrefLang="ar" />
                <link rel="alternate" href="https://www.clothy.com/history" hrefLang="hi" />
                <link rel="alternate" href="https://www.clothy.com/history" hrefLang="zh" />
                <link rel="alternate" href="https://www.clothy.com/history" hrefLang="x-default" />
            </Head>

            {/* Contingut de la pàgina */}
            <div className="min-h-screen bg-gray-100 px-8 py-12">
                {/* Títol principal */}
                <h1 className="text-4xl font-bold text-black mb-8">
                    {t("historial.title", "Historial de cerques")}
                </h1>

                {/* Visualització de l'historial */}
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : history.length > 0 ? (
                    <ul className="space-y-4">
                        {history.map((entry) => (
                            <li
                                key={entry.search_id}
                                className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => handleClick(entry.search_id)}
                            >
                                <div className="flex flex-col sm:flex-row sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            {new Date(entry.search_date).toLocaleString()}
                                        </p>
                                        <p className="text-sm">
                                            {t("historial.totalCloth", "Total de prendes")}: {entry.cloth_count || 0}
                                        </p>
                                    </div>
                                    {entry.filters && (
                                        <div className="mt-2 sm:mt-0">
                                            <p className="text-sm font-medium">
                                                {t("historial.filters", "Filtres aplicats")}:
                                            </p>
                                            <pre className="bg-gray-100 p-2 rounded text-xs">
                        {JSON.stringify(entry.filters, null, 2)}
                      </pre>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-600">
                        {t("historial.noHistory", "No hi ha historial de cerques.")}
                    </p>
                )}

                <ErrorModal
                    isOpen={errorModalOpen}
                    onClose={() => setErrorModalOpen(false)}
                    text={t("historial.error", "S'ha produït un error en obtenir l'historial.")}
                    duration={5}
                />
            </div>
        </>
    );
};

export default HistorialBusquedas;
