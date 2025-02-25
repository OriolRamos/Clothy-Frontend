"use client";

import React, {useState, useEffect, useCallback} from "react";
import { useAuth } from "@/app/components/AuthContext";
import ImageModel from "../components/ImageModal/index";
import {filters} from "../components/Filters/cloth_filters";
import FilterModal from "../components/Filters/FilterModal";
import { useTranslation } from "react-i18next";
import ErrorModal from "../components/Notifications/ErrorModal"
import { Cloth } from "../components/Modals/Cloth.ts";
import { Filters, defaultFilters } from "../components/Modals/Filter.ts";
import RenderFilter from "../components/Filters/RenderFilter";
import RenderMultipleFilter from "../components/Filters/RenderMultipleFilter";


const CercaRoba = () => {

    const { t } = useTranslation("common");
    const { fetchWithAuth } = useAuth();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [detectedInfo, setDetectedInfo] = useState<Record<string, string | number>>({});
    const [results, setResults] = useState<Cloth[]>([]);
    const [filtersState, setFiltersState] = useState<Filters>(defaultFilters);
    const [expandedFilter, setExpandedFilter] = React.useState<string>(""); // Estat a nivell global
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);
    const [page, setPage] = useState(1); // Pàgina actual per a la càrrega
    const [hasMoreResults, setHasMoreResults] = useState(true); // Si hi ha més resultats per carregar
    const [totalResults, setTotalResults] = useState<any[]>([]); // Tots els resultats obtinguts
    const [errorModalOpen, setErrorModalOpen] = useState(false); // Estat per al modal d'error


// Carregar més resultats a mesura que es fa scroll
    const loadMoreResults = useCallback(() => {
        if (loading || !hasMoreResults || totalResults.length === 0) return;

        setLoading(true);

        setTimeout(() => {
            setResults((prevResults) => [
                ...prevResults,
                ...totalResults.slice(page * 9, (page + 1) * 9)
            ]);

            // Comprovar si queden més resultats per carregar
            setHasMoreResults(totalResults.length > (page + 1) * 9);
            setPage((prevPage) => prevPage + 1);
            setLoading(false);
        }, 500); // Afegim un petit delay per evitar càrregues innecessàries

    }, [loading, hasMoreResults, page, totalResults]);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetchWithAuth(`${apiUrl}/users/profile/getCountry`, {
                    method: "GET",
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.country) {
                        setFiltersState((prev) => ({ ...prev, country: data.country }));
                    }
                } else {
                    console.error("Error obtenint el country del perfil.");
                }
            } catch (error) {
                console.error("Error fetching country:", error);
            }
        };
        fetchCountry();
    }, [fetchWithAuth]);

// Detectar quan l'usuari arriba al final de la pàgina per carregar més resultats
    useEffect(() => {
        const onScroll = () => {
            if (window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100) {
                loadMoreResults();
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [loadMoreResults]);

// Quan es fa la cerca, inicialitzar els resultats
    useEffect(() => {
        if (totalResults.length > 0) {
            setResults(totalResults.slice(0, 9)); // Inicialment només carreguem els primers 9 resultats
            setPage(1);
            setHasMoreResults(totalResults.length > 9);
        }
    }, [totalResults]);


    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImageFile(file);

            const reader = new FileReader();
            reader.onload = () => setUploadedImageUrl(reader.result as string);
            reader.readAsDataURL(file);

            // Enviar la imagen al backend
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append("image", file); // Usamos FormData para enviar archivos

                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetchWithAuth(`${apiUrl}/search/image`, {
                    method: 'POST',
                    body: formData,  // Usamos formData como body
                });

                if (response.ok) {
                    const data = await response.json();
                    setDetectedInfo(data);  // El backend debe retornar los datos de la imagen procesada
                } else {
                    throw new Error("Error en el procesamiento de la imagen.");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSearch = async () => {

        console.log("Info", filtersState);

        // Validar que 'type', 'brand' i 'section' no siguin null ni undefined
        if (!filtersState.type || !filtersState.brand || !filtersState.section) {
            console.error("Error: Els valors de type, brand i section són obligatoris.");
            setErrorModalOpen(true); // Obre el modal d'error
            setLoading(false);  // Atura la càrrega
            return; // No continuïs amb la cerca
        }

        setLoading(true);
        setSearching(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetchWithAuth(`${apiUrl}/search/results/filter`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(filtersState), // Enviar directament filtersState

            });

            if (response.ok) {
                const data = await response.json();
                console.log("Data", data);

                // Filtrar productes segons el rang de preus i l'estat de descompte
                const filteredResults = data.results.filter((item: Cloth) => {
                    const productPrice = item.discount_price ?? item.price;
                    const minPrice = filtersState.minPrice ?? 0;
                    const maxPrice = filtersState.maxPrice ?? Infinity;

                    // Comprova si el producte està dins del rang de preus
                    const isWithinPriceRange = productPrice >= minPrice && productPrice <= maxPrice;

                    // Si onlyOfferts està activat, només mostra productes amb descompte
                    const matchesOfferFilter = filtersState.onlyOfferts ? item.in_discount === true : true;

                    return isWithinPriceRange && matchesOfferFilter;
                });

                // Ordena els resultats segons l'ordre seleccionat
                let sortedResults = filteredResults;
                if (filtersState.orderMenorMajor) {
                    sortedResults = filteredResults.sort(
                        (a: Cloth, b: Cloth) => (a.discount_price ?? a.price) - (b.discount_price ?? b.price)
                    );
                } else if (filtersState.orderMajorMenor) {
                    sortedResults = filteredResults.sort(
                        (a: Cloth, b: Cloth) => (b.discount_price ?? b.price) - (a.discount_price ?? a.price)
                    );
                }

                setResults(sortedResults.slice(0, 9)); // Carrega només els primers 9 resultats
                setHasMoreResults(sortedResults.length > 9); // Comprova si hi ha més resultats per carregar
                setTotalResults(sortedResults); // Desa els resultats totals
            } else {
                throw new Error("Error en la cerca de roba.");
            }


        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFavoriteToggle = async (cloth: Cloth) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            // Comprova si l'element ja és als favorits
            const isFavorite = results.some((item) => item.purchase_url === cloth.purchase_url && item.favorite);

            if (isFavorite) {
                // Si és favorit, elimina'l
                const response = await fetchWithAuth(`${apiUrl}/profile/favorites/delete`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ purchase_url: cloth.purchase_url }),
                });

                if (response.ok) {
                    setResults((prevResults) =>
                        prevResults.map((item) =>
                            item.purchase_url === cloth.purchase_url ? { ...item, favorite: false } : item
                        )
                    );
                } else {
                    console.error("Error eliminant dels favorits.");
                }
            } else {
                // Si no és favorit, afegeix-lo
                const response = await fetchWithAuth(`${apiUrl}/profile/favorites/add`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(cloth), // Envia totes les dades de la peça
                });

                if (response.ok) {
                    setResults((prevResults) =>
                        prevResults.map((item) =>
                            item.purchase_url === cloth.purchase_url ? { ...item, favorite: true } : item
                        )
                    );
                } else {
                    console.error("Error afegint als favorits.");
                }
            }
        } catch (error) {
            console.error("Error gestionant els favorits:", error);
        }
    };


    const onReload = async () => {
        try {
            setLoading(true); // Inicia la càrrega
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            // Fer una nova petició per obtenir les últimes dades de les imatges
            const response = await fetchWithAuth(`${apiUrl}/profile/favorites`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                // Actualitzar els resultats amb els favorits
                setResults(data);
            } else {
                console.error("Error al obtenir els favorits.");
            }
        } catch (error) {
            console.error("Error al recarregar les imatges:", error);
        } finally {
            setLoading(false); // Finalitza la càrrega
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 px-8 py-12">
            {/* Contenidor de filtres amb comportament responsiu */}
            <div className="mb-8">
                {/* Versió completa (només visible en pantalles grans) */}
                <div
                    className="hidden lg:flex flex-col sm:flex-row items-center justify-evenly bg-white p-4 rounded-lg shadow-md space-y-4 sm:space-y-0">
                    {Object.keys(filters).map((filterKey) => {
                        if (filterKey === "brand") {
                            // Per al filtre de marques, utilitza renderFilterBrand per la selecció múltiple
                            return (
                                <div className="max-w-[250px] w-full"> {/* Aquí afegim el màxim ample */}
                                    <RenderMultipleFilter
                                        key={filterKey}
                                        filterKey={filterKey}
                                        filterOptions={filters[filterKey]} // Ens passem les opcions per aquest filtre
                                        expandedFilter={expandedFilter}
                                        setExpandedFilter={setExpandedFilter}
                                        filtersState={filtersState}
                                        setFiltersState={setFiltersState}
                                    />
                                </div>
                            );
                        } else if (filterKey === "type" || filterKey === "section") {
                            // Per als altres filtres (type i section), utilitza renderFilter com abans
                            return (
                                <div className="max-w-[250px] w-full"> {/* Aquí també afegim el màxim ample */}
                                    <RenderFilter
                                        key={filterKey}
                                        filterKey={filterKey}
                                        filterOptions={filters[filterKey]} // Ens passem les opcions per aquest filtre
                                        expandedFilter={expandedFilter}
                                        setExpandedFilter={setExpandedFilter}
                                        filtersState={filtersState}
                                        setFiltersState={setFiltersState}
                                    />
                                </div>
                            );
                        } else {
                            return null; // No es mostra si no coincideix amb cap filtre conegut
                        }
                    })}

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center cursor-pointer text-black text-sm font-medium transition-transform duration-200 hover:scale-105 focus:outline-none"
                    >
                        {t('searchcloth.more_filters')}
                        <span className="ml-2 text-sm transform transition-transform duration-200">▼</span>
                    </button>

                    <button
                        onClick={handleSearch}
                        className="block relative cursor-pointer text-center py-3 px-6 text-white bg-faqblue rounded-lg font-medium shadow-lg hover:scale-105 hover:bg-faqblue/90 hover:backdrop-blur-sm hover:opacity-95 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-btnblue focus:ring-offset-2 active:bg-hoblue transition transform duration-200"
                    >
                        {t('searchcloth.search')}
                    </button>
                </div>


                {/* Versió mòbil (només visible en pantalles petites) */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="lg:hidden flex items-center justify-center w-full py-3 px-6 bg-white text-black rounded-lg shadow-md font-medium border border-gray-300 hover:scale-105 transition-transform duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20"
                         fill="currentColor">
                        <path fillRule="evenodd"
                              d="M8 2a6 6 0 014.47 10.24l4.28 4.28a1 1 0 11-1.42 1.42l-4.28-4.28A6 6 0 118 2zm0 2a4 4 0 100 8 4 4 0 000-8z"
                              clipRule="evenodd"/>
                    </svg>
                    {t("searchcloth.start_search")} {/* "Empieza a buscar" */}
                </button>
            </div>

            {/* Mostrar el modal d'error si hi ha un error */}
            <ErrorModal
                isOpen={errorModalOpen}
                onClose={() => setErrorModalOpen(false)} // Tanca el modal quan es faci click a "tancar"
                text="Els filtres 'type', 'brand' i 'section' són obligatoris." // Missatge personalitzat
                duration={5} // Duració de 5 segons
            />

            {/* Informacion del buscador*/}
            {!loading && !searching && (
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-black mb-4">
                        {t("searchcloth.title")}
                    </h1>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        {t("searchcloth.description")}
                    </p>
                </div>
            )}

            <FilterModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                filters={filters}
                filtersState={filtersState}
                setFiltersState={setFiltersState}
                handleSearch={handleSearch}
            />


            {/* Barra de càrrega */}
            {loading && (
                <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-70 z-50">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}


            {/* Resultats */}
                        {results.length > 0 && (
                            <div
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 justify-center place-items-center mx-auto max-w-[1200px]">
                                {results.map((result) => (
                                    <ImageModel
                                        key={result.purchase_url}
                                        cloth={result}
                                        onFavoriteToggle={() => handleFavoriteToggle(result)}
                                        onReload={onReload}
                                    />
                                ))}
                            </div>

                        )}

        </div>
    );
};

export default CercaRoba;
