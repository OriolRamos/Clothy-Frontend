"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/app/components/AuthContext";
import ImageModel from "@/app/components/ImageModal/index";
import FilterModal from "@/app/components/Filters/FilterModal";
import { useTranslation } from "react-i18next";
import ErrorModal from "@/app/components/Notifications/ErrorModal";
import { Cloth } from "@/app/components/Modals/Cloth";
import { Filters, defaultFilters } from "@/app/components/Modals/Filter";
import RenderFilter from "@/app/components/Filters/RenderFilter";
import ImageUploadModal from "@/app/components/CameraModal/index";
import RenderMultipleFilter from "@/app/components/Filters/RenderMultipleFilter";

const SearchDetailPage = () => {
    const { t } = useTranslation("common");
    const { id } = useParams(); // Obté l'id de la URL
    const { fetchWithAuth } = useAuth();
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
            const response = await fetchWithAuth(`${apiUrl}/search/history/${id}?page=${pageToLoad}`, {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    if (pageToLoad === 1) {
                        setResults(data.results);
                        // Actualitza els filtres de la cerca si són enviats per l'endpoint
                        setFiltersState((prev) => ({ ...prev, ...data.filters }));
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

    // Funció per alternar favorits (com en el component original)
    const handleFavoriteToggle = async (cloth: Cloth) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const isFavorite = results.some((item) => item.purchase_url === cloth.purchase_url && item.favorite);
            if (isFavorite) {
                const response = await fetchWithAuth(`${apiUrl}/profile/favorites/delete`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ purchase_url: cloth.purchase_url, color: cloth.color }),
                });
                if (response.ok) {
                    setResults((prevResults) =>
                        prevResults.map((item) =>
                            item.purchase_url === cloth.purchase_url ? { ...item, favorite: false } : item
                        )
                    );
                }
            } else {
                const response = await fetchWithAuth(`${apiUrl}/profile/favorites/add`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ purchase_url: cloth.purchase_url, color: cloth.color }),
                });
                if (response.ok) {
                    setResults((prevResults) =>
                        prevResults.map((item) =>
                            item.purchase_url === cloth.purchase_url ? { ...item, favorite: true } : item
                        )
                    );
                }
            }
        } catch (error) {
            console.error("Error gestionant els favorits:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 px-8 py-12">
            {/* Opcional: mostra informació de la cerca (p.e. filtres aplicats, pàgina de cerca, etc.) */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-black mb-4">
                    {t("searchDetail.title", "Detall de la cerca")}
                </h1>
                {filtersState && (
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <p className="text-sm font-medium">{t("searchDetail.filters", "Filtres aplicats")}:</p>
                        <pre className="bg-gray-100 p-2 rounded text-xs">
              {JSON.stringify(filtersState, null, 2)}
            </pre>
                    </div>
                )}
            </div>

            {/* Mostra les robes resultants de la cerca */}
            {loading && (
                <div className="flex justify-center items-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {results.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 justify-center place-items-center mx-auto max-w-[1200px]">
                    {results.map((result) => (
                        <ImageModel
                            key={result.purchase_url}
                            cloth={result}
                            country={filtersState.country}
                            onFavoriteToggle={() => handleFavoriteToggle(result)}
                        />
                    ))}
                </div>
            )}

            {!loading && results.length === 0 && (
                <p className="text-center text-gray-600">{t("searchDetail.noResults", "No s'han trobat robes per aquesta cerca.")}</p>
            )}

            <ErrorModal
                isOpen={errorModalOpen}
                onClose={() => setErrorModalOpen(false)}
                text={t("searchDetail.error", "S'ha produït un error en carregar la cerca.")}
                duration={5}
            />
        </div>
    );
};

export default SearchDetailPage;
