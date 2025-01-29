"use client";

import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    Typography,
} from "@material-tailwind/react";
import { useAuth } from "@/app/components/AuthContext";
import ImageModel from "../components/ImageModal/index";
import filters from "../components/Filters/cloth_filters";
import { useTranslation } from "react-i18next";


const CercaRoba = () => {
    const { t } = useTranslation("common");

    const { fetchWithAuth } = useAuth();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [detectedInfo, setDetectedInfo] = useState<Record<string, string | number>>({});
    const [results, setResults] = useState<any[]>([]);
    const [filtersState, setFiltersState] = React.useState<{
        type: string | null;
        color: string | null;
        brand: string | null;
        price: number | null;
        onlyOffers: boolean;
        highRating: boolean;
        officialBrands: boolean;
        [key: string]: any;  // Afegeix una signatura d'índex per permetre altres claus
    }>({
        type: null,
        color: null,
        brand: null,
        price: null,
        onlyOffers: false,
        highRating: false,
        officialBrands: false,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);

    // Comprovar verificació d'usuari
    useEffect(() => {

    }, []);

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
        if (!imageFile || Object.keys(detectedInfo).length === 0) return;

        setSearching(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetchWithAuth(`${apiUrl}/search/results`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    detected_info: detectedInfo,
                    filters: filtersState,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setResults(data.results);
            } else {
                throw new Error("Error en la cerca de roba.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSearching(false);
        }
    };

    const [expandedFilter, setExpandedFilter] = React.useState<string>(""); // Estat a nivell global

    const renderFilter = (filterKey: string, filterOptions: string[]) => {
        const isDynamicFilter = filterKey === "type" || filterKey === "color";

        // Obtenir el valor inicial només si no s'ha establert un valor al filtre
        const initialValue = isDynamicFilter && filtersState[filterKey] === undefined
            ? detectedInfo[filterKey] || ""
            : filtersState[filterKey] || "";

        const filteredOptions = filterOptions.filter((option) =>
            option.toLowerCase().includes(initialValue.toLowerCase())
        );

        return (
            <div key={filterKey} className="relative w-full sm:w-auto">
                <button
                    className={`min-w-[150px] w-full text-left px-4 py-2 rounded-md border ${
                        expandedFilter === filterKey ? "border-blue-500" : "border-gray-300"
                    } focus:outline-none`}
                    onClick={() =>
                        setExpandedFilter((prev) => (prev === filterKey ? "" : filterKey))
                    }
                >
                    {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}:{" "}
                    <span className="text-gray-500">
                    {initialValue || "Selecciona una opción"}
                </span>
                </button>
                {expandedFilter === filterKey && (
                    <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md mt-2 z-10 max-h-48 overflow-y-auto">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={initialValue}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                setFiltersState((prev) => ({
                                    ...prev,
                                    [filterKey]: newValue === "" ? null : newValue, // Si es buida, es posa a null
                                }));
                            }}
                            className="w-full px-4 py-2 border-b border-gray-200 focus:outline-none"
                        />
                        {filteredOptions.map((option, idx) => (
                            <button
                                key={`${filterKey}-${idx}`}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => {
                                    setFiltersState((prev) => ({
                                        ...prev,
                                        [filterKey]: option,
                                    }));
                                    setExpandedFilter("");
                                }}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };



    const handleFavoriteToggle = async (url: string) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            // Comprova si l'element ja és als favorits
            const isFavorite = results.some((result) => result.url === url && result.favorite);

            if (isFavorite) {
                // Si és favorit, elimina'l
                const response = await fetchWithAuth(`${apiUrl}/profile/favorites/delete`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ url }),
                });

                if (response.ok) {
                    // Actualitza l'estat per reflectir el canvi
                    setResults((prevResults) =>
                        prevResults.map((result) =>
                            result.url === url ? { ...result, favorite: false } : result
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
                    body: JSON.stringify({ url }),
                });

                if (response.ok) {
                    // Actualitza l'estat per reflectir el canvi
                    setResults((prevResults) =>
                        prevResults.map((result) =>
                            result.url === url ? { ...result, favorite: true } : result
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
            <h1 className="text-4xl font-bold text-center text-black mb-8">
                {t("searchcloth.title")}
            </h1>
            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
                {t("searchcloth.description")}
            </p>


            {/* Penjar Imatge */}
            {!uploadedImageUrl && !loading && (
                <div className="flex items-center justify-center">
                    <label
                        htmlFor="upload-input"
                        className="block relative cursor-pointer text-center py-3 px-6 text-white bg-faqblue rounded-lg font-medium shadow-lg hover:scale-105 hover:bg-faqblue/90 hover:backdrop-blur-sm hover:opacity-95 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-btnblue focus:ring-offset-2 active:bg-hoblue transition transform duration-200"
                    >
                        {t("searchcloth.uploadButton")}
                        <input
                            id="upload-input"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </label>
                </div>
            )}

            {/* Barra de càrrega */}
            {loading && (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="w-2/3">
                        <div className="h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                </div>
            )}

            {/* Layout amb imatge i informació */}{uploadedImageUrl && !loading && (
            <div className="flex flex-wrap max-h-[500px] overflow-y-auto">
                {/* 1/3: Imatge carregada */}
                <div className="flex w-full sm:w-1/3 p-4 max-h-[400px] justify-center items-center">
                    <img
                        src={uploadedImageUrl}
                        alt="Imatge carregada"
                        className="max-h-[400px] w-auto shadow-md object-contain rounded-md"
                    />
                </div>

                {/* 2/3: Informació detectada */}
                <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between h-full">
                    {Object.keys(detectedInfo).length > 0 ? (
                        <div className="p-6 bg-white rounded-lg shadow-lg space-y-4">
                            <h3 className="text-2xl font-semibold text-gray-900">
                                {t("searchcloth.detectedInfoTitle")}
                            </h3>
                            <div className="space-y-2">
                                {detectedInfo?.description && (
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-800">{t("searchcloth.descriptionLabel")}</span>
                                        <p className="text-gray-600">{detectedInfo.description}</p>
                                    </div>
                                )}
                                {detectedInfo?.type && (
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-800">{t("searchcloth.typeLabel")}</span>
                                        <p className="text-gray-600">{detectedInfo.type}</p>
                                    </div>
                                )}
                                {detectedInfo?.color && (
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-800">{t("searchcloth.colorLabel")}</span>
                                        <p className="text-gray-600">{detectedInfo.color}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex-grow flex items-center justify-center">
                            <p className="text-gray-600">{t("searchcloth.noInfoDetected")}</p>
                        </div>
                    )}

                    <div className="flex justify-center mt-4">
                        <label
                            htmlFor="upload-input"
                            className="block relative cursor-pointer text-center py-3 px-6 text-white bg-faqblue rounded-lg font-medium shadow-lg hover:scale-105 hover:bg-faqblue/90 hover:backdrop-blur-sm hover:opacity-95 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-btnblue focus:ring-offset-2 active:bg-hoblue transition transform duration-200"
                        >
                            {t("searchcloth.uploadButton")}
                            <input
                                id="upload-input"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </label>
                    </div>
                </div>
            </div>
        )}

            {/* Filtres */}
            {Object.keys(detectedInfo).length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-evenly bg-white p-4 rounded-lg shadow-md mt-8 space-y-4 sm:space-y-0">
                    {Object.keys(filters).map((filterKey) =>
                        renderFilter(filterKey, filters[filterKey])
                    )}

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center cursor-pointer text-black text-sm font-medium transition-transform duration-200 hover:scale-105 focus:outline-none"
                    >
                        {t('searchcloth.more_filters')}
                        <span className="ml-2 text-sm transform transition-transform duration-200">
        ▼
      </span>
                    </button>

                    <button
                        onClick={handleSearch}
                        className="block relative cursor-pointer text-center py-3 px-6 text-white bg-faqblue rounded-lg font-medium shadow-lg hover:scale-105 hover:bg-faqblue/90 hover:backdrop-blur-sm hover:opacity-95 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-btnblue focus:ring-offset-2 active:bg-hoblue transition transform duration-200"
                    >
                        {t('searchcloth.search')}
                    </button>
                </div>
            )}

            {/* Modal de filtres avançats */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 max-w-3xl w-full shadow-2xl relative">
                        {/* Fletxeta negra per tancar */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 left-4 text-black hover:text-gray-700 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Header del modal */}
                        <h2 className="text-2xl font-bold mb-6 text-center">{t('searchcloth.advanced_filters')}</h2>

                        {/* Cos del modal */}
                        <div className="space-y-6">
                            {/* Filtres dinàmics */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Object.keys(filters).map((filterKey) =>
                                    renderFilter(filterKey, filters[filterKey])
                                )}
                            </div>

                            {/* Filtre de preu */}
                            <div className="flex flex-col items-start">
                                <label htmlFor="price-range" className="text-lg font-medium mb-2">
                                    {t('searchcloth.price_range')}
                                </label>
                                <input
                                    id="price-range"
                                    type="range"
                                    min="0"
                                    max="1000"
                                    step="10"
                                    value={filtersState.price || 500} // Valor predeterminat
                                    onChange={(e) =>
                                        setFiltersState((prev) => ({
                                            ...prev,
                                            price: parseInt(e.target.value, 10),
                                        }))
                                    }
                                    className="w-full accent-blue-500"
                                />
                                <span className="mt-2 text-sm text-gray-600">
            {t('searchcloth.selected_price', { price: filtersState.price || 500 })}
          </span>
                            </div>

                            {/* Checkbox per opcions addicionals */}
                            <div className="space-y-2">
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id="only-offers"
                                        checked={filtersState.onlyOffers || false}
                                        onChange={(e) =>
                                            setFiltersState((prev) => ({
                                                ...prev,
                                                onlyOffers: e.target.checked,
                                            }))
                                        }
                                        className="h-5 w-5 accent-blue-500"
                                    />
                                    <label htmlFor="only-offers" className="text-sm">
                                        {t('searchcloth.only_offers')}
                                    </label>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id="high-rating"
                                        checked={filtersState.highRating || false}
                                        onChange={(e) =>
                                            setFiltersState((prev) => ({
                                                ...prev,
                                                highRating: e.target.checked,
                                            }))
                                        }
                                        className="h-5 w-5 accent-blue-500"
                                    />
                                    <label htmlFor="high-rating" className="text-sm">
                                        {t('searchcloth.high_rating')}
                                    </label>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id="official-brands"
                                        checked={filtersState.officialBrands || false}
                                        onChange={(e) =>
                                            setFiltersState((prev) => ({
                                                ...prev,
                                                officialBrands: e.target.checked,
                                            }))
                                        }
                                        className="h-5 w-5 accent-blue-500"
                                    />
                                    <label htmlFor="official-brands" className="text-sm">
                                        {t('searchcloth.official_brands')}
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Peu del modal */}
                        <div className="flex justify-between items-center mt-8">
                            <button
                                onClick={() =>
                                    setFiltersState({
                                        type: "",
                                        color: "",
                                        brand: "",
                                        price: null,
                                        onlyOffers: false,
                                        highRating: false,
                                        officialBrands: false,
                                    })
                                }
                                className="w-32 h-12 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition flex items-center justify-center shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                            >
                                {t('searchcloth.reset')}
                            </button>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => {
                                        handleSearch();
                                        setIsModalOpen(false);
                                    }}
                                    className="w-32 h-12 bg-faqblue text-white rounded-lg font-medium shadow-lg hover:scale-105 hover:bg-faqblue/90 hover:backdrop-blur-sm hover:opacity-95 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-btnblue focus:ring-offset-2 active:bg-hoblue transition-transform transform duration-200 flex items-center justify-center"
                                >
                                    {t('searchcloth.apply')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Resultats */}
            {Object.keys(detectedInfo).length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {loading || searching ? (
                        <div className="col-span-full flex justify-center items-center">
                            <div
                                className="w-16 h-16 border-4 border-gray-700 border-dashed rounded-full animate-spin"></div>
                        </div>
                    ) : results.length > 0 ? (
                        results.map((result, idx) => (
                            <ImageModel
                                key={result.url}
                                imageUrl={result.imageUrl as string}
                                description={result.description as string}
                                price={result.price as number}
                                type={result.type as string}
                                brand={result.brand as string}
                                color={result.color as string}
                                purchaseUrl={result.purchase_url as string}
                                favorite={result.favorite as boolean}
                                onFavoriteToggle={() => handleFavoriteToggle(result.url)}
                                onReload={onReload}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-600">
                            {t('searchcloth.noResult')}
                        </div>
                    )}
                </div>
            )}

        </div>
    );
};

export default CercaRoba;
