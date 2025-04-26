"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/AuthContext";
import { useTranslation } from "react-i18next";
import ErrorModal from "../components/Notifications/ErrorModal";

// Tipus per a historial de cerques
type SearchEntry = {
    search_id: string;
    search_date: string;
    cloth_count?: number;
    filters?: Record<string, any>;
};
// Tipus per a historial de converses
type ConversationEntry = {
    id: string;
    created_at: string;
    message_count: number;
};

const HistorialBusquedas = () => {
    const { t } = useTranslation("common");
    const { fetchWithAuth } = useAuth();
    const router = useRouter();

    // Estat per a cerques
    const [searchHistory, setSearchHistory] = useState<SearchEntry[]>([]);
    // Estat per a converses
    const [convHistory, setConvHistory] = useState<ConversationEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    // 0 = cerques, 1 = assistent
    const [activeTab, setActiveTab] = useState<0 | 1>(0);

    // Carrega historial de cerques
    const fetchSearchHistory = async () => {
        setLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetchWithAuth(`${apiUrl}/profile/history`, { method: "GET" });
            if (!res.ok) throw new Error("Error fetching search history");
            const data: SearchEntry[] = await res.json();
            // Ordenar per data descendent
            data.sort((a, b) => new Date(b.search_date).getTime() - new Date(a.search_date).getTime());
            setSearchHistory(data);
        } catch (e) {
            console.error(e);
            setErrorModalOpen(true);
        } finally {
            setLoading(false);
        }
    };
    // Carrega historial de converses
    const fetchConvHistory = async () => {
        setLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetchWithAuth(`${apiUrl}/outfit-assistant/conversations`, { method: "GET" });
            if (!res.ok) throw new Error("Error fetching conversation history");
            const data: ConversationEntry[] = await res.json();
            // Ordenar per data descendent (ja ho fa el backend)
            setConvHistory(data);
        } catch (e) {
            console.error(e);
            setErrorModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Carregar ambdues històries
        fetchSearchHistory();
        fetchConvHistory();
    }, []);

    // Handlers per a clic
    const handleClickSearch = (searchId: string) => {
        router.push(`/history/historial_search/${searchId}`);
    };
    const handleClickConversation = (convId: string) => {
        router.push(`/history/historial_outfit_assistant/${convId}`);
    };

    return (
        <>
            <Head>
                <title>{t("seo.history.title")}</title>
                <meta name="description" content={t("seo.history.description")} />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content={t("seo.history.title")} />
                <meta property="og:description" content={t("seo.history.description")} />
                <meta property="og:image" content="/images/og-image-history.jpg" />
                <meta property="og:url" content="https://www.clothy.com/history" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={t("seo.history.title")} />
                <meta name="twitter:description" content={t("seo.history.description")} />
                <meta name="twitter:image" content="/images/og-image-history.jpg" />
                {/* Enllaços alternatius multilíngües */}
                {['ca','es','en','fr','de','it','pt','ar','hi','zh','x-default'].map(lang => (
                    <link key={lang} rel="alternate" hrefLang={lang} href="https://www.clothy.com/history" />
                ))}
            </Head>

            <div className="min-h-screen bg-gray-100 px-8 py-12">
                {/* Pestanyes */}
                <div className="flex space-x-4 mb-8">
                    <button
                        className={`${activeTab === 0 ? 'border-b-2 border-faqblue text-faqblue' : 'text-gray-600'} pb-2 font-semibold`}
                        onClick={() => setActiveTab(0)}
                    >{t("historial.title", "Historial de cerques")}</button>
                    <button
                        className={`${activeTab === 1 ? 'border-b-2 border-faqblue text-faqblue' : 'text-gray-600'} pb-2 font-semibold`}
                        onClick={() => setActiveTab(1)}
                    >{t("historial.assistantTitle", "Historial de l'assistent")}</button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    activeTab === 0 ? (
                        searchHistory.length > 0 ? (
                            <ul className="space-y-4">
                                {searchHistory.map(entry => (
                                    <li
                                        key={entry.search_id}
                                        className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => handleClickSearch(entry.search_id)}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">{new Date(entry.search_date).toLocaleString()}</p>
                                                <p className="text-sm">{t("historial.totalCloth", "Total de prendes")}:{entry.cloth_count||0}</p>
                                            </div>
                                            {entry.filters && (
                                                <div className="mt-2 sm:mt-0">
                                                    <p className="text-sm font-medium">{t("historial.filters", "Filtres aplicats")}:</p>
                                                    <pre className="bg-gray-100 p-2 rounded text-xs">{JSON.stringify(entry.filters,null,2)}</pre>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-gray-600">{t("historial.noHistory","No hi ha historial de cerques.")}</p>
                        )
                    ) : (
                        convHistory.length > 0 ? (
                            <ul className="space-y-4">
                                {convHistory.map(conv => (
                                    <li
                                        key={conv.id}
                                        className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => handleClickConversation(conv.id)}
                                    >
                                        <div className="flex justify-between">
                                            <p className="text-sm text-gray-600">{new Date(conv.created_at).toLocaleString()}</p>
                                            <p className="text-sm font-medium">{t("historial.messageCount","Missatges")}:{conv.message_count}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-gray-600">{t("historial.noAssistantHistory","No hi ha historial de converses.")}</p>
                        )
                    )
                )}

                <ErrorModal
                    isOpen={errorModalOpen}
                    onClose={() => setErrorModalOpen(false)}
                    text={t("historial.error","S'ha produït un error en obtenir l'historial.")}
                    duration={5}
                />
            </div>
        </>
    );
};

export default HistorialBusquedas;
