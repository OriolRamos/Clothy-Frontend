"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/app/components/AuthContext";
import { filters } from "../components/Filters/cloth_filters";
import { useTranslation } from "react-i18next";
import ErrorModal from "../components/Notifications/ErrorModal";
import { Cloth } from "../components/Modals/Cloth";
import { Filters, defaultFilters } from "../components/Modals/Filter";
import RenderFilter from "../components/Filters/RenderFilter";
import RenderMultipleFilter from "../components/Filters/RenderMultipleFilter";
import Head from "next/head";
import Footer from "@/app/components/Footer"
import debounce from "lodash.debounce";
import dynamic from "next/dynamic";
import { Dialog } from "@headlessui/react";
// A dalt del fitxer CercaRoba:
import MultipleSearchModal, { FilterItem } from "@/app/components/ClothModal/MultipleSearchModal";

const FilterModal = dynamic(
    () => import("../components/Filters/FilterModal"),
    { ssr: false }
);

const ImageUploadModal = dynamic(
    () => import("../components/CameraModal/index"),
    { ssr: false }
);

const ImageModel = dynamic(
    () => import("@/app/components/ClothModal/index"),
    { ssr: false }
);


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
    const [errorModalText, setErrorModalText] = useState(""); // Estat per al modal d'error
    const [searchInitiated, setSearchInitiated] = useState(false);
    const loadingRef = useRef(false);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [searchId, setSearchId]     = useState<string | null>(null);
    const [country, setCountry] = useState<string | null>(null);
    const [multiItems, setMultiItems] = useState<FilterItem[]>([]);
    const [isModalMultipleOpen, setIsModalMultipleOpen] = useState(false);


    const resetFilters = () => {
        setFiltersState({});
        setSearchInitiated(false);
        setResults([]);
        setPage(1);
        setHasMoreResults(true);
        setSearchId(null);
    };


// 2. Al mount: només guardem country, no canviem encara filtersState
    useEffect(() => {
        const fetchCountry = async () => {
            const res = await fetchWithAuth(`${apiUrl}/users/profile/getCountry`, { method: "GET" });
            if (res.ok) {
                const data = await res.json();
                if (data.country) setCountry(data.country);
            }
        };
        fetchCountry();
    }, [apiUrl, fetchWithAuth]);

// 3. Quan country canvia de null a un valor, actualitzem filtersState només si no està posat
    useEffect(() => {
        if (country !== null && !filtersState.country) {
            setFiltersState(prev => ({ ...prev, country }));
        }
    }, [country, filtersState.country]);

// 4. Memoització del filtre (sense camps Search)
    const filtered = React.useMemo(() => {
        return Object.fromEntries(
            Object.entries(filtersState).filter(([key]) => !key.endsWith("Search"))
        );
    }, [filtersState]);


    const fetchResults = useCallback(
        debounce(async (dynFilters) => {
            setLoading(true);
            setPage(1);
            setHasMoreResults(true);
            try {
                const res = await fetchWithAuth(`${apiUrl}/search/results/filter`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...dynFilters, page: 1 , searchId: null}),
                });
                if (res.ok) {
                    const data = await res.json();
                    const { results: items, search_id } = data;

                    setResults(items);
                    setHasMoreResults(items.length > 0);
                    setPage(2);
                    setSearchId(search_id);
                } else {
                    setErrorModalOpen(true);
                    setErrorModalText(
                        "Error en la carga de resultados.\n" +
                        "Vuelva a intentarlo más tarde o contacte con el administrador."
                    );
                    throw new Error("Error en la carga de resultados.");
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }, 300),
        [fetchWithAuth]
    );


    useEffect(() => {
        if (!filtered.country) return;

        const { minPrice: rawMin, maxPrice: rawMax, ...other } = filtered;

        const minPrice = rawMin ? Number(rawMin) : undefined;
        const maxPrice = rawMax ? Number(rawMax) : undefined;

        fetchResults({
            ...other,
            ...(minPrice !== undefined && { minPrice }),
            ...(maxPrice !== undefined && { maxPrice }),
        });

        // Marquem que s'ha iniciat una cerca real
        setSearchInitiated(true);
    }, [JSON.stringify(Object.fromEntries(
        Object.entries(filtersState).filter(([key]) => !key.endsWith("Search"))
    )), fetchResults]);



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
        };
    };

    const setUniqueFilters: React.Dispatch<React.SetStateAction<Record<string, string>>> = (
        valueOrUpdater
    ) => {
        setFiltersState((prev) => {
            const uniquePrev = getUniqueFilters();
            const newUnique =
                typeof valueOrUpdater === "function"
                    ? (valueOrUpdater as (p: Record<string, string>) => Record<string, string>)(uniquePrev)
                    : valueOrUpdater;

            // Si no ha canviat res, retornem l'objecte antic
            if (
                uniquePrev.type === newUnique.type &&
                uniquePrev.section === newUnique.section
            ) {
                return prev;
            }

            return {
                ...prev,
                type: newUnique.type,
                section: newUnique.section,
            };
        });
    };


    const loadMoreResults = useCallback(
        async (dynFilters: Record<string, any>) => {
            if (!searchInitiated || loadingRef.current || !hasMoreResults) return;

            loadingRef.current = true;
            setLoading(true);

            try {
                const response = await fetchWithAuth(
                    `${apiUrl}/search/results/filter`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            ...dynFilters,
                            page,
                            ...(searchId ? { search_id: searchId } : {}),
                        }),
                    }
                );

                if (!response.ok) {
                    console.error("Error al carregar més resultats.");
                    setHasMoreResults(false);
                    return;
                }

                const data = await response.json();
                const newItems = data.results ?? [];

                if (newItems.length > 0) {
                    setResults((prev) => {
                        const existingIds = new Set(prev.map(item => item.id));
                        const filteredNewItems = newItems.filter((item: { id: string; }) => !existingIds.has(item.id));
                        return [...prev, ...filteredNewItems];
                    });

                    setPage((prev) => prev + 1);

                    if (typeof data.totalCount === "number") {
                        const loaded = page * 30 + newItems.length;
                        if (loaded >= data.totalCount) {
                            setHasMoreResults(false);
                        }
                    }
                } else {
                    setHasMoreResults(false);
                }
            } catch (error) {
                console.error("Error en loadMoreResults:", error);
                setHasMoreResults(false);
            } finally {
                loadingRef.current = false;
                setLoading(false);
            }
        },
        [
            filtered,       // 🔥 afegeix els filtres dinàmics
            page,
            searchId,
            searchInitiated,
            hasMoreResults,
            fetchWithAuth,
            apiUrl,
        ]
    );

    useEffect(() => {
        const onScroll = () => {
            if (!searchInitiated) return;
            if (
                window.innerHeight + window.scrollY >=
                document.documentElement.offsetHeight - 600 &&
                hasMoreResults
            ) {
                loadMoreResults(filtered); // 🔁 Passar `filtered` explícitament
            }
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [loadMoreResults, searchInitiated, hasMoreResults, filtered]);



    const uploadImageFile = async (file: File) => {
        setImageFile(file);
        setSearchInitiated(true);
        setLoading(true);
        setResults([]);
        setPage(1);
        setHasMoreResults(true);

        const reader = new FileReader();
        reader.onload = () => setUploadedImageUrl(reader.result as string);
        reader.readAsDataURL(file);

        try {
            const formData = new FormData();
            formData.append("image", file);
            const response = await fetchWithAuth(`${apiUrl}/search/image`, { method: "POST", body: formData });
            if (!response.ok) throw new Error();
            const data = await response.json();

            // Obtenim google_response (pot ser array o objecte amb .results)
            let googleResponse = typeof data.google_response === "string"
                ? JSON.parse(data.google_response)
                : data.google_response;

            // Normalitzem a un array de FilterItem
            const items: FilterItem[] = Array.isArray(googleResponse)
                ? googleResponse
                : Array.isArray(googleResponse.results)
                    ? googleResponse.results
                    : [];

            // Si hi ha múltiples deteccions
            if (items.length > 1) {
                setMultiItems(items);
                setIsModalMultipleOpen(true);
                return;
            }

            // Si només n'hi ha una, recollim el primer
            const single = items[0] ?? {};

            setFiltersState(prev => {
                const merged = {
                    ...prev,
                    ...single,
                    brand: single.brand ?? prev.brand,
                };

                const cleaned = Object.fromEntries(
                    Object.entries(merged).filter(([_, value]) => value !== null)
                ) as Record<string, string | string[]>;

                return cleaned;
            });

            // Carreguem resultats de l'API
            const clothItems = Array.isArray(data.cloth_results) ? data.cloth_results : [];
            setResults(clothItems);
            setSearchId(data.search_id);
            setHasMoreResults(clothItems.length > 0);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


// Utilitat per netejar filtres abans d’enviar-los
    function cleanFilters(filters: Record<string, any>): Record<string, any> {
        const cleaned: Record<string, any> = {};

        for (const [key, value] of Object.entries(filters)) {
            if (
                value !== null &&
                value !== undefined &&
                value !== '' &&
                !(Array.isArray(value) && value.length === 0)
            ) {
                cleaned[key] = value;
            }
        }

        return cleaned;
    }

    const onSelectItem = async (item: FilterItem) => {
        setIsModalOpen(false);
        setLoading(true);

        // Força que certs camps siguin arrays (evitem errors com ['b','l','a','c','k'])
        const normalizedItem = {
            ...item,
            color: item.color
                ? Array.isArray(item.color)
                    ? item.color
                    : [item.color]
                : [],
            brand: item.brand
                ? Array.isArray(item.brand)
                    ? item.brand
                    : [item.brand]
                : [],
        };

        const cleanedItem = Object.fromEntries(
            Object.entries(normalizedItem).filter(([_, value]) => value !== null)
        ) as Record<string, string | string[]>;

        const updatedFilters = {
            ...filtersState,
            ...cleanedItem,
            brand: normalizedItem.brand ?? filtersState.brand,
        };

        const cleanedFilters = cleanFilters(updatedFilters);

        setFiltersState(cleanedFilters);
        setIsModalMultipleOpen(false);
    };






// Aquesta funció es crida quan s'obté la imatge des de la càmera (el fitxer ja és un File)
    const onFileSelect = (file: string | File) => {
        // Comprovem si el paràmetre és un File, ja que només en processarem aquest cas.
        if (typeof file !== "string") {
            uploadImageFile(file);
            setModalVisible(false);
        } else {
            // Opcional: gestiona el cas on el valor és una cadena si cal.
            console.warn("S'ha rebut una cadena, però s'esperava un File.");
        }
    };


    const [modalVisible, setModalVisible] = useState(false);


    return (
        <>
            {/* Metadades SEO amb traduccions */}
            <Head>
                {/* Títol i meta-descripció dinàmiques */}
                <title>{t("seo.search.title")}</title>
                <meta name="description" content={t("seo.search.description")} />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:title" content={t("seo.search.title")} />
                <meta property="og:description" content={t("seo.search.description")} />
                <meta property="og:image" content="/images/og-image-search.jpg" />
                <meta property="og:url" content="https://www.clothy.es/search_cloth" />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={t("seo.search.title")} />
                <meta name="twitter:description" content={t("seo.search.description")} />
                <meta name="twitter:image" content="/images/og-image-search.jpg" />

                {/* Enllaços alternatius per als diversos idiomes (URL invariant perquè la traducció és dinàmica) */}
                <link rel="alternate" href="https://www.clothy.es/search_cloth" hrefLang="es" />
                <link rel="alternate" href="https://www.clothy.es/search_cloth" hrefLang="en" />
                <link rel="alternate" href="https://www.clothy.es/search_cloth" hrefLang="ca" />
                <link rel="alternate" href="https://www.clothy.es/search_cloth" hrefLang="ch" />
                <link rel="alternate" href="https://www.clothy.es/search_cloth" hrefLang="ar" />
                <link rel="alternate" href="https://www.clothy.es/search_cloth" hrefLang="bn" />
                <link rel="alternate" href="https://www.clothy.es/search_cloth" hrefLang="de" />
                <link rel="alternate" href="https://www.clothy.es/search_cloth" hrefLang="fr" />
                <link rel="alternate" href="https://www.clothy.es/search_cloth" hrefLang="hi" />
                <link rel="alternate" href="https://www.clothy.es/search_cloth" hrefLang="ja" />
                <link rel="alternate" href="https://www.clothy.es/search_cloth" hrefLang="ko" />
                <link rel="alternate" href="https://www.clothy.es/search_cloth" hrefLang="pt" />
                <link rel="alternate" href="https://www.clothy.es/search_cloth" hrefLang="ru" />
                <link rel="alternate" href="https://www.clothy.es/search_cloth" hrefLang="tr" />
                <link rel="alternate" href="https://www.clothy.es/search_cloth" hrefLang="x-default" />
            </Head>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-8 py-12 text-gray-900 dark:text-gray-100">
                {/* Contenidor de filtres i botons */}
                <div className="mb-8">
                    {/* Vista per a pantalles grans */}
                    <div className="hidden lg:flex flex-col sm:flex-row items-center justify-evenly bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-4 sm:space-y-0">
                        {/* Botó de càmera */}
                        <div className="flex items-center">
                            <label
                                htmlFor="image-upload"
                                onClick={() => setModalVisible(true)}
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-faqblue dark:bg-faqblue/80 cursor-pointer hover:opacity-90 shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-btnblue focus:ring-offset-2 transition transform duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h4l2-3h6l2 3h4v11H3V7z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11a4 4 0 100 8 4 4 0 000-8z" />
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
                                            filtersState={filtersState}
                                            setFiltersState={setFiltersState}
                                        />
                                    </div>
                                );
                            } else if (filterKey === "type" || filterKey === "section") {
                                return (
                                    <div className="max-w-[250px] w-full" key={filterKey}>
                                        <RenderFilter
                                            filterKey={filterKey}
                                            filterOptions={filters[filterKey]}
                                            expandedFilter={expandedFilter}
                                            setExpandedFilter={setExpandedFilter}
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
                            className="flex items-center cursor-pointer text-black dark:text-white text-sm font-medium transition-transform duration-200 hover:scale-105 focus:outline-none"
                        >
                            {t("searchcloth.more_filters")}
                            <span className="ml-2 text-sm transform transition-transform duration-200">▼</span>
                        </button>

                        <button onClick={resetFilters}
                                className="flex items-center cursor-pointer text-black dark:text-white text-sm font-medium transition-transform duration-200 hover:scale-105 focus:outline-none"
                        >
                            {t("searchcloth.reset_filters", "Restablir filtres")}
                        </button>


                    </div>

                    {/* Vista per a pantalles petites */}
                    <div className="lg:hidden flex items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md border border-gray-300 dark:border-gray-600 transition-transform duration-200">
                        {/* Botó de càmera sempre a l'esquerra */}
                        <div className="flex-shrink-0">
                            <button
                                onClick={() => setModalVisible(true)}
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-faqblue dark:bg-faqblue/80 cursor-pointer hover:opacity-90"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h4l2-3h6l2 3h4v11H3V7z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11a4 4 0 100 8 4 4 0 000-8z" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 pl-4">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center justify-center w-full py-3 px-4 text-white bg-faqblue dark:bg-faqblue/90 hover:bg-faqblue/90 rounded-full shadow-md transition-colors duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                {t("searchcloth.start_search", "Buscar Ropa")}
                            </button>
                        </div>
                    </div>
                </div>

                <ErrorModal
                    isOpen={errorModalOpen}
                    onClose={() => setErrorModalOpen(false)}
                    text={errorModalText}
                    duration={5}
                />

                {!loading && !searching && (
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
                            {t("searchcloth.title")}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            {t("searchcloth.description")}
                        </p>
                    </div>
                )}

                {/* Modal per seleccionar entre càmera o galeria */}
                {modalVisible && (
                    <ImageUploadModal onFileSelect={onFileSelect} onClose={() => setModalVisible(false)} />
                )}

                <MultipleSearchModal
                    isOpen={isModalMultipleOpen}
                    onClose={() => setIsModalMultipleOpen(false)}
                    items={multiItems}
                    onSelect={onSelectItem}
                />

                <FilterModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    filters={filters}
                    filtersState={filtersState}
                    setFiltersState={setFiltersState}
                />

                <div className="relative">
                    {loading && (
                        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    {results?.length > 0 && (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 justify-center place-items-center mx-auto max-w-[1200px]">
                                {results.map((result) => (
                                    <ImageModel
                                        key={result.id}
                                        cloth={result}
                                        country={Array.isArray(filtersState.country) ? filtersState.country[0] : filtersState.country}
                                    />
                                ))}
                            </div>
                            {!hasMoreResults && (
                                <div className="text-center mt-4">
                                    <p className="text-gray-600 dark:text-gray-400">{t("searchcloth.noMoreResults", "No hai mas resultados")}</p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <Dialog
                    open={errorModalOpen}
                    onClose={() => setErrorModalOpen(false)}
                    className="fixed z-50 inset-0 flex items-center justify-center"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-40" />
                    <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-xl z-50">
                        <Dialog.Title className="text-lg font-semibold text-red-600">
                            Error de servidor
                        </Dialog.Title>
                        <Dialog.Description className="mt-2 text-gray-700">
                            Recorda enviar una imatge de roba, sinó pot donar error.
                        </Dialog.Description>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setErrorModalOpen(false)}
                                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
                            >
                                Tancar
                            </button>
                        </div>
                    </div>
                </Dialog>


            </div>
            <Footer />
        </>
    );
};

export default CercaRoba;
