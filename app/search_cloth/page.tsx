"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/app/components/AuthContext";
import ImageModel from "../components/ImageModal/index";
import { filters } from "../components/Filters/cloth_filters";
import FilterModal from "../components/Filters/FilterModal";
import { useTranslation } from "react-i18next";
import ErrorModal from "../components/Notifications/ErrorModal";
import { Cloth } from "../components/Modals/Cloth";
import { Filters, defaultFilters } from "../components/Modals/Filter";
import RenderFilter from "../components/Filters/RenderFilter";
import ImageUploadModal from "../components/CameraModal/index";
import RenderMultipleFilter from "../components/Filters/RenderMultipleFilter";

const CercaRoba = () => {
    const { t } = useTranslation("common");
    const { fetchWithAuth } = useAuth();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [detectedInfo, setDetectedInfo] = useState<Record<string, string | number>>({});
    const [results, setResults] = useState<Cloth[]>([]);
    // Estat global amb filtres únics i múltiples
    const [filtersState, setFiltersState] = useState<Record<string, string | string[]>>({});
    const [expandedFilter, setExpandedFilter] = useState<string>(""); // Estat global per al modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);
    const [page, setPage] = useState(1); // Pàgina actual per a la càrrega
    const [hasMoreResults, setHasMoreResults] = useState(true); // Si hi ha més resultats per carregar
    const [errorModalOpen, setErrorModalOpen] = useState(false); // Estat per al modal d'error
    const [searchInitiated, setSearchInitiated] = useState(false);
    const loadingRef = useRef(false);

    // Funcions "wrapper" per als filtres únics (per RenderFilter)
    const getUniqueFilters = (): Record<string, string> => {
        return {
            type: typeof filtersState.type === "string"
                ? filtersState.type
                : Array.isArray(filtersState.type)
                    ? filtersState.type[0] || ""
                    : "",
            section: typeof filtersState.section === "string"
                ? filtersState.section
                : Array.isArray(filtersState.section)
                    ? filtersState.section[0] || ""
                    : "",
            // Afegeix altres filtres únics si cal...
        };
    };

    // Definim el setter wrapper per als filtres únics amb el tipus correcte:
    const setUniqueFilters: React.Dispatch<React.SetStateAction<Record<string, string>>> = (
        valueOrUpdater
    ) => {
        setFiltersState((prev) => {
            // Obtenim els filtres únics actuals
            const uniquePrev: Record<string, string> = getUniqueFilters();
            // Determinem el nou valor segons si valueOrUpdater és una funció o un valor directe
            const newUnique =
                typeof valueOrUpdater === "function"
                    ? (valueOrUpdater as (prev: Record<string, string>) => Record<string, string>)(uniquePrev)
                    : valueOrUpdater;
            return {
                ...prev,
                // Actualitzem només les claus dels filtres únics
                type: newUnique.type,
                section: newUnique.section,
            };
        });
    };


    // Funció per carregar més resultats fent una crida al backend
    const loadMoreResults = useCallback(async () => {
        // No permetem carregar si encara no s'ha iniciat la cerca,
        // si ja s'està carregant o si no hi ha més resultats.
        if (!searchInitiated || loadingRef.current || !hasMoreResults) return;
        loadingRef.current = true;
        setLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetchWithAuth(`${apiUrl}/search/results/reload`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // Enviem els filtres i la pàgina actual que es troba a l'estat
                body: JSON.stringify({}),
            });
            if (response.ok) {
                const data = await response.json();

                if (data.results && data.results.length > 0) {
                    // Afegim els nous resultats al final de la cua existent
                    setResults((prevResults) => [...prevResults, ...data.results]);
                    // Incrementem la pàgina per a la següent crida
                    setPage((prevPage) => prevPage + 1);
                    // Si hem rebut resultats, encara hi pot haver més
                    setHasMoreResults(true);
                } else {
                    // Si la resposta no conté resultats, desactivem noves crides
                    setHasMoreResults(false);
                }
            } else {
                setHasMoreResults(false);
                console.error("Error al carregar més resultats.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            loadingRef.current = false;
        }
    }, [searchInitiated, hasMoreResults, page, filtersState, fetchWithAuth]);

    // Afegim un event listener de scroll que només dispara la càrrega si la cerca s'ha iniciat
    useEffect(() => {
        const onScroll = () => {
            if (!searchInitiated) return;
            // Quan arribem a 100px del final de la pàgina
            if ((window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100) && hasMoreResults) {
                loadMoreResults();
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [loadMoreResults, searchInitiated]);

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

    // Funció per gestionar la pujada de la imatge, tant des de la galeria com per càmera.
    const uploadImageFile = async (file: File) => {
        console.log("s'envia imatge");
        setImageFile(file);
        // Marquem que la cerca s'ha iniciat
        setSearchInitiated(true);
        setLoading(true);
        setSearching(true);
        setResults([]); // Neteja els resultats previs
        setPage(1);
        setHasMoreResults(true);

        const reader = new FileReader();
        reader.onload = () => setUploadedImageUrl(reader.result as string);
        reader.readAsDataURL(file);

        try {
            const formData = new FormData();
            formData.append("image", file);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetchWithAuth(`${apiUrl}/search/image`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Data ", data);
                // Actualitzem la informació detectada
                setDetectedInfo(data);

                // Gestionem el camp google_response
                let googleResponse;
                if (data.google_response) {
                    // Si és un string, el convertim; si no, el mantenim tal qual
                    googleResponse =
                        typeof data.google_response === "string"
                            ? JSON.parse(data.google_response)
                            : data.google_response;
                } else {
                    googleResponse = data;
                }

                // Actualitzem els filtres amb tots els camps retornats, inclòs 'country'
                setFiltersState((prevFilters) => ({
                    ...prevFilters,
                    ...googleResponse,
                    // Si brand és null, utilitzem els filtres per defecte per a brand
                    brand:
                        googleResponse.brand !== null
                            ? googleResponse.brand
                            : defaultFilters.brand,
                }));

                setResults(data.cloth_results);
                // Incrementem la pàgina per la següent càrrega (ja que s'ha carregat la pàgina 1)
                setPage(2);
                setHasMoreResults(data.results.length > 0);
            } else {
                throw new Error("Error en el procesamiento de la imagen.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


// Aquesta funció es crida quan s'obté la imatge des de la càmera (el fitxer ja és un File)
    const onFileSelect = (file: File) => {
        uploadImageFile(file);
        setModalVisible(false);
    };

    // Funció de cerca: reinicialitza els resultats i carrega la primera pàgina
    const handleSearch = async () => {
        console.log("Info", filtersState);

        // Comprovem que els filtres obligatoris estiguin presents en els filtres únics
        const unique = getUniqueFilters();
        if (!unique.type || !filtersState.brand || !unique.section) {
            console.error("Error: Els filtres 'type', 'brand' i 'section' són obligatoris.");
            setErrorModalOpen(true);
            setLoading(false);
            return;
        }

        // Marquem que la cerca s'ha iniciat
        setSearchInitiated(true);
        setLoading(true);
        setSearching(true);
        setResults([]); // Neteja els resultats previs
        setPage(1);
        setHasMoreResults(true);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const combinedFilters = { ...getUniqueFilters(), ...filtersState };
            const response = await fetchWithAuth(`${apiUrl}/search/results/filter`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(combinedFilters),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Data", data);

                // Filtra i ordena els resultats segons els filtres de preu i descomptes
                const filteredResults = data.results.filter((item: Cloth) => {
                    const rawMin = filtersState.minPrice;
                    const rawMax = filtersState.maxPrice;
                    const productPrice = item.discount_price ?? item.price;

                    const minPrice = rawMin ? parseFloat(Array.isArray(rawMin) ? rawMin[0] : rawMin) : 0;
                    const maxPrice = rawMax ? parseFloat(Array.isArray(rawMax) ? rawMax[0] : rawMax) : Infinity;
                    const isWithinPriceRange = productPrice >= minPrice && productPrice <= maxPrice;
                    const matchesOfferFilter = filtersState.onlyOfferts ? item.in_discount === true : true;
                    return isWithinPriceRange && matchesOfferFilter;
                });

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

                setResults(sortedResults);
                // Incrementem la pàgina per la següent càrrega (ja que s'ha carregat la pàgina 1)
                setPage(2);
                setHasMoreResults(sortedResults.length > 0);
            } else {
                throw new Error("Error en la cerca de roba.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    const [modalVisible, setModalVisible] = useState(false);


    return (
        <div className="min-h-screen bg-gray-100 px-8 py-12">
            {/* Contenidor de filtres i botons */}
            <div className="mb-8">
                {/* Vista per a pantalles grans */}
                <div
                    className="hidden lg:flex flex-col sm:flex-row items-center justify-evenly bg-white p-4 rounded-lg shadow-md space-y-4 sm:space-y-0"
                >
                    {/* Botó de càmera */}
                    <div className="flex items-center">
                        <label
                            htmlFor="image-upload"
                            onClick={() => setModalVisible(true)}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-faqblue cursor-pointer hover:opacity-90 shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-btnblue focus:ring-offset-2 transition transform duration-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 7h4l2-3h6l2 3h4v11H3V7z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 11a4 4 0 100 8 4 4 0 000-8z"
                                />
                            </svg>
                        </label>
                    </div>

                    {/* Filtres */}
                    {Object.keys(filters).map((filterKey) => {
                        if (filterKey === "brand") {
                            return (
                                <div className="max-w-[250px] w-full" key={filterKey}>
                                    <RenderMultipleFilter
                                        filterKey={filterKey}
                                        filterOptions={filters[filterKey]}
                                        expandedFilter={expandedFilter}
                                        setExpandedFilter={setExpandedFilter}
                                        // Per filtres múltiples, passem l'estat tal com està (s'espera un array)
                                        filtersState={filtersState}
                                        setFiltersState={setFiltersState}
                                    />
                                </div>
                            );
                        } else if (filterKey === "type" || filterKey === "section") {
                            // Filtres únics
                            return (
                                <div className="max-w-[250px] w-full" key={filterKey}>
                                    <RenderFilter
                                        filterKey={filterKey}
                                        filterOptions={filters[filterKey]}
                                        expandedFilter={expandedFilter}
                                        setExpandedFilter={setExpandedFilter}
                                        // Aquí passem els filtres normalitzats (Record<string, string>)
                                        filtersState={getUniqueFilters()}
                                        setFiltersState={setUniqueFilters}
                                    />
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}

                    {/* Botó per més filtres */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center cursor-pointer text-black text-sm font-medium transition-transform duration-200 hover:scale-105 focus:outline-none"
                    >
                        {t("searchcloth.more_filters")}
                        <span className="ml-2 text-sm transform transition-transform duration-200">▼</span>
                    </button>

                    {/* Botó de cerca */}
                    <button
                        onClick={handleSearch}
                        className="block relative cursor-pointer text-center py-3 px-6 text-white bg-faqblue rounded-lg font-medium shadow-lg hover:scale-105 hover:bg-faqblue/90 hover:backdrop-blur-sm hover:opacity-95 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-btnblue focus:ring-offset-2 active:bg-hoblue transition transform duration-200"
                    >
                        {t("searchcloth.search")}
                    </button>
                </div>

                {/* Vista per a pantalles petites */}
                <div
                    className="lg:hidden flex items-center bg-white p-3 rounded-lg shadow-md border border-gray-300 transition-transform duration-200"
                >
                    {/* Botó de càmera sempre a l'esquerra */}
                    <div className="flex-shrink-0">
                        <button
                            onClick={() => setModalVisible(true)}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-faqblue cursor-pointer hover:opacity-90"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 7h4l2-3h6l2 3h4v11H3V7z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 11a4 4 0 100 8 4 4 0 000-8z"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1 pl-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center justify-center w-full py-3 px-4 text-white bg-faqblue hover:bg-faqblue/90 rounded-full shadow-md transition-colors duration-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <circle cx="11" cy="11" r="8"/>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                            {t("searchcloth.start_search" , "Buscar Ropa")}
                        </button>
                    </div>

                </div>
            </div>


            <ErrorModal
                isOpen={errorModalOpen}
                onClose={() => setErrorModalOpen(false)}
                text="Els filtres 'type', 'brand' i 'section' són obligatoris."
                duration={5}
            />

            {!loading && !searching && (
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-black mb-4">{t("searchcloth.title")}</h1>
                    <p className="text-gray-600 max-w-3xl mx-auto">{t("searchcloth.description")}</p>
                </div>
            )}

            {/* Modal per seleccionar entre càmera o galeria */}
            {modalVisible && (
                <ImageUploadModal
                    onFileSelect={onFileSelect}
                    onClose={() => setModalVisible(false)}
                />
            )}

            <FilterModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                filters={filters}
                filtersState={filtersState}
                setFiltersState={setFiltersState}
                handleSearch={handleSearch}
            />

            {loading && (
                <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-70 z-50">
                    <div
                        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {results.length > 0 && (
                <>
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
                    {!hasMoreResults && (
                        <div className="text-center mt-4">

                            <p className="text-gray-600">No hi han més resultats</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CercaRoba;
