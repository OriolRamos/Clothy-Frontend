"use client";

import {
    Button,
    IconButton,
    Typography,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import ImageModel from "../../components/ImageModal/index";
import { useAuth } from "@/app/components/AuthContext";
import { filters } from "../../components/Filters/cloth_filters";
import { useTranslation } from "react-i18next";
import { Cloth } from "../../components/Modals/Cloth";

const Favoritos = () => {
    const [filtersState, setFiltersState] = useState<{ [key: string]: string }>({
        type: '',
        color: '',
        brand: '',
    });
    const [expandedFilter, setExpandedFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const { fetchWithAuth } = useAuth();
    const [results, setResults] = useState<Cloth[]>([]);
    const [showMoreFilters, setShowMoreFilters] = useState(false);

    // Els tres filtres més importants
    const mainFilterKeys = ["brand", "type", "color"];
    // Els filtres extra: els que no siguin brand, type ni color
    const extraFilterKeys = Object.keys(filters).filter(key => !mainFilterKeys.includes(key));

    // useEffect per obtenir els favorits i les imatges
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetchWithAuth(`${apiUrl}/profile/favorites/get`, {
                    method: 'GET',
                });

                if (response.ok) {
                    // Obtenim els favorits inicials
                    const data = await response.json();
                    // Assegurem que data sigui un array
                    setResults(Array.isArray(data) ? data : []);
                } else {
                    throw new Error('Error al obtenir els favorits.');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [fetchWithAuth]); // S'executa una sola vegada en el muntatge

    // Funció per actualitzar les imatges
    const onReload = async () => {
        try {
            setLoading(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetchWithAuth(`${apiUrl}/profile/favorites/get`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                setResults(Array.isArray(data) ? data : []);
            } else {
                console.error('Error al obtenir els favorits.');
            }
        } catch (error) {
            console.error('Error al recarregar les imatges:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFavoriteToggle = async (url: string) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            await fetch(`${apiUrl}/profile/favorites/delete`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: url }),
            });
            setResults((prev) => prev.filter((image) => image.purchase_url !== url));
        } catch (error) {
            console.error("Error eliminando de favoritos:", error);
        }
    };

    const { t } = useTranslation('common');

    // Fix: Assegurem que results és un array abans de filtrar
    const filteredImages = (Array.isArray(results) ? results : []).filter((image) => {
        const matchesType = filtersState.type
            ? (image.type || "").toLowerCase().includes(filtersState.type.toLowerCase())
            : true;
        const matchesColor = filtersState.color
            ? (image.color || "").toLowerCase().includes(filtersState.color.toLowerCase())
            : true;
        const matchesBrand = filtersState.brand
            ? (image.brand || "").toLowerCase().includes(filtersState.brand.toLowerCase())
            : true;
        return matchesType && matchesColor && matchesBrand;
    });

    const renderFilter = (filterKey: string, filterOptions: string[]) => {
        const filterValue = filtersState[filterKey] || '';
        const filteredOptions = filterOptions.filter((option) =>
            option.toLowerCase().includes(filterValue.toLowerCase())
        );

        return (
            <div key={filterKey} className="relative w-full sm:w-auto">
                <button
                    className={`w-full text-left px-4 py-2 rounded-md border ${
                        expandedFilter === filterKey ? "border-blue-500" : "border-gray-300"
                    } focus:outline-none`}
                    onClick={() =>
                        setExpandedFilter((prev) => (prev === filterKey ? "" : filterKey))
                    }
                >
                    {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}:{" "}
                    <span className="text-gray-500">
                        {filterValue || t('favorites.selectOption')}
                    </span>
                </button>
                {expandedFilter === filterKey && (
                    <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md mt-2 z-10 max-h-48 overflow-y-auto">
                        <input
                            type="text"
                            placeholder={t('favorites.search')}
                            value={filterValue}
                            onChange={(e) =>
                                setFiltersState((prev) => ({
                                    ...prev,
                                    [filterKey]: e.target.value,
                                }))
                            }
                            className="w-full px-4 py-2 border-b border-gray-200 focus:outline-none"
                        />
                        {filteredOptions.map((option, idx) => (
                            <button
                                key={`${filterKey}-${idx}`}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => {
                                    setFiltersState((prev) => ({ ...prev, [filterKey]: option }));
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

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-8 py-12">
            <h1 className="text-4xl font-bold text-center text-black dark:text-white mb-8">
                {t('favorites.title')}
            </h1>

            {/* Filtres principals */}
            <div className="flex flex-col sm:flex-row items-center justify-evenly bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8 space-y-4 sm:space-y-0">
                {mainFilterKeys.map((filterKey) => (
                    <div key={filterKey} className="mx-2 min-w-[200px] max-[1199px]:hidden">
                        {renderFilter(
                            filterKey,
                            filters[filterKey].map((option) => option.translation)
                        )}
                    </div>
                ))}
                {/*
            <button
                onClick={() => setShowMoreFilters(true)}
                className="flex items-center justify-center w-full py-3 px-4 text-white bg-faqblue hover:bg-faqblue/90 rounded-full shadow-md transition-colors duration-200"
            >
                {t('favorites.more_filters')}
            </button>*/}
                <button
                    onClick={() => setFiltersState({ type: "", color: "", brand: "" })}
                    className="bg-blue-500 dark:bg-blue-700 text-black dark:text-white px-4 py-2 rounded-md text-sm transition hover:bg-gray-300 dark:hover:bg-gray-600 mx-2"
                >
                    {t('favorites.reset')}
                </button>
            </div>

            {/* Modal per als filtres extra */}
            {showMoreFilters && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-black dark:text-white">{t('favorites.more_filters')}</h2>
                            <button onClick={() => setShowMoreFilters(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                                X
                            </button>
                        </div>
                        {extraFilterKeys.map((filterKey) =>
                            renderFilter(
                                filterKey,
                                filters[filterKey].map((option) => option.translation)
                            )
                        )}
                        <div className="mt-4">
                            <button
                                onClick={() => setShowMoreFilters(false)}
                                className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition hover:bg-blue-600 dark:hover:bg-blue-700 w-full"
                            >
                                {t('favorites.apply_filters')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Contingut principal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full flex justify-center items-center">
                        <div className="w-16 h-16 border-4 border-gray-700 dark:border-gray-300 border-dashed rounded-full animate-spin"></div>
                    </div>
                ) : filteredImages.length > 0 ? (
                    filteredImages.map((image) => (
                        <ImageModel
                            key={image.purchase_url}
                            cloth={image}
                            country={filtersState.country}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-600 dark:text-gray-400">
                        {t('favorites.empty')}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favoritos;
