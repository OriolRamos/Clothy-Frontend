"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/AuthContext";
import { useTranslation } from "react-i18next";
import ErrorModal from "../components/Notifications/ErrorModal";

const HistorialBusquedas = () => {
    const { t } = useTranslation("common");
    const { fetchWithAuth } = useAuth();
    const router = useRouter();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);

    // Funció per obtenir l'historial de cerques
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
                    (a, b) => new Date(b.search_date) - new Date(a.search_date)
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
    const handleClick = (searchId) => {
        router.push(`/history/${searchId}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 px-8 py-12">
            {/* Títol de la pàgina */}
            <h1 className="text-4xl font-bold text-black mb-8">
                {t("historial.title", "Historial de cerques")}
            </h1>

            {/* Llista d'historial */}
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
                                    <p className="text-lg font-semibold">
                                        {t("historial.searchPage", "Pàgina")}: {entry.search_page}
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
    );
};

export default HistorialBusquedas;
