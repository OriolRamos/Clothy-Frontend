"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/app/components/AuthContext";
import ImageModel from "@/app/components/ImageModal/index";
import { useTranslation } from "react-i18next";
import ErrorModal from "@/app/components/Notifications/ErrorModal";
import { Cloth } from "@/app/components/Modals/Cloth";
import { Filters, defaultFilters } from "@/app/components/Modals/Filter";

const SearchDetailPage = () => {
    const {t} = useTranslation("common");
    const {id} = useParams(); // Obté l'id de la URL
    const {fetchWithAuth} = useAuth();
    const [results, setResults] = useState<Cloth[]>([]);
    const [filtersState, setFiltersState] = useState<Filters>(defaultFilters);
    const [expandedFilter, setExpandedFilter] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [hasMoreResults, setHasMoreResults] = useState(true);
    const [page, setPage] = useState(1);

    const loadingRef = useRef(false);

    // Funció per carregar els resultats de la cerca per l'id
    const fetchSearchDetails = async (pageToLoad = 1) => {
        setLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            // Es suposa que aquest endpoint rep l'id de la cerca i retorna les robes associades,
            // a més de detalls com filtres aplicats, número de pàgina, etc.
            const response = await fetchWithAuth(`${apiUrl}/profile/search_history/${id}?page=${pageToLoad}`, {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    if (pageToLoad === 1) {
                        setResults(data.results);
                        // Actualitza els filtres de la cerca si són enviats per l'endpoint
                        setFiltersState((prev) => ({...prev, ...data.filters}));
                    } else {
                        setResults((prevResults) => [...prevResults, ...data.results]);
                    }
                    setPage(pageToLoad + 1);
                    setHasMoreResults(true);
                } else {
                    setHasMoreResults(false);
                }
            } else {
                console.error("Error en obtenir els detalls de la cerca.");
                setErrorModalOpen(true);
            }
        } catch (error) {
            console.error(error);
            setErrorModalOpen(true);
        } finally {
            setLoading(false);
            loadingRef.current = false;
        }
    };

    useEffect(() => {
        fetchSearchDetails();
    }, [id]);

    // Funció per carregar més resultats al fer scroll (si escau)
    const loadMoreResults = useCallback(async () => {
        if (loadingRef.current || !hasMoreResults) return;
        loadingRef.current = true;
        await fetchSearchDetails(page);
    }, [hasMoreResults, page]);

    useEffect(() => {
        const onScroll = () => {
            if (window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100 && hasMoreResults) {
                loadMoreResults();
            }
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [loadMoreResults, hasMoreResults]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-8 py-12">
            {/* Opcional: mostra informació de la cerca (p.e. filtres aplicats, pàgina de cerca, etc.) */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
                    {t("searchDetail.title", "Detall de la cerca")}
                </h1>

            </div>

            {/* Mostra les robes resultants de la cerca */}
            {loading && (
                <div className="flex justify-center items-center">
                    <div
                        className="w-16 h-16 border-4 border-blue-500 dark:border-blue-300 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {results.length > 0 && (
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 justify-center place-items-center mx-auto max-w-[1200px]">
                    {results.map((result) => (
                        <ImageModel
                            key={result.purchase_url}
                            cloth={result}
                            country={filtersState.country}
                        />
                    ))}
                </div>
            )}

            {!loading && results.length === 0 && (
                <p className="text-center text-gray-600 dark:text-gray-400">
                    {t("searchDetail.noResults", "No s'han trobat robes per aquesta cerca.")}
                </p>
            )}

            <ErrorModal
                isOpen={errorModalOpen}
                onClose={() => setErrorModalOpen(false)}
                text={t("searchDetail.error", "S'ha produït un error en carregar la cerca.")}
                duration={5}
            />
        </div>
    );
}

export default SearchDetailPage;
