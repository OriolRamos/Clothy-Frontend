import React, { useState, useEffect } from "react";
import MultiRangeSlider from "./MultiRangeSlider";
import './FilterModal.css';  // Importa el fitxer CSS
import RenderFilter from "./RenderFilter";
import RenderMultipleFilter from "./RenderMultipleFilter";
import RenderColorFilter from "./RenderColorFilter";
import {useTranslation} from "react-i18next";


interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    filters: { [key: string]: any }; // Pots ajustar segons les estructures concretes de filtres
    filtersState: { [key: string]: any }; // Ajusta els tipus segons el que s'espera de 'filtersState'
    setFiltersState: React.Dispatch<React.SetStateAction<any>>; // tipus per actualitzar 'filtersState'
    handleSearch: () => void;

}

interface FiltersState {
    minPrice: number;
    maxPrice: number;
    orderMajorMenor: boolean;
    orderMenorMajor: boolean;
    onlyOffers: boolean;
    officialBrands: boolean;
    [key: string]: any; // Permet altres propietats dinàmiques
}


const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, filters, filtersState, setFiltersState, handleSearch }) => {
    const [expandedFilter, setExpandedFilter] = useState<string>("");
    const [minPrice, setMinPrice] = useState<number>(filtersState.minPrice || 0);
    const [maxPrice, setMaxPrice] = useState<number>(filtersState.maxPrice || 1000);
    const { t } = useTranslation("common");


    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;


    const toggleBooleanFilter = (key: string) => {
        setFiltersState((prev: FiltersState) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };


    const handleOrderSelection = (key: "orderMajorMenor" | "orderMenorMajor") => {
        setFiltersState((prev: FiltersState) => {
            const newState = { ...prev };
            if (key === "orderMajorMenor") {
                newState.orderMajorMenor = !prev.orderMajorMenor;
                newState.orderMenorMajor = false; // Desmarcar l'altre ordre
            } else if (key === "orderMenorMajor") {
                newState.orderMenorMajor = !prev.orderMenorMajor;
                newState.orderMajorMenor = false; // Desmarcar l'altre ordre
            }
            return newState;
        });
    };

return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto m-4 scrollbar-hidden">
            <div
                className="sticky top-0 bg-white dark:bg-gray-800 shadow-md border-b border-gray-300 dark:border-gray-600 z-10 p-4 flex items-center relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 inset-y-0 my-auto text-black dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                >
                    ✕
                </button>
                <h2 className="text-2xl font-bold mx-auto text-black dark:text-gray-100">{t("filtermodal.title", "Filtros Avanzados")}</h2>
            </div>

            <div className="space-y-6 px-2 p-6 m-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-black dark:text-gray-100">
                    {Object.keys(filters).map((filterKey) => {
                        if (filterKey === "color") {
                            return (
                                <RenderColorFilter
                                    key={filterKey}
                                    filterKey={filterKey}
                                    filterOptions={filters[filterKey]}
                                    expandedFilter={expandedFilter}
                                    setExpandedFilter={setExpandedFilter}
                                    filtersState={filtersState}
                                    setFiltersState={setFiltersState}
                                />
                            );
                        } else if (filterKey === "brand" || filterKey === "size") {
                            return (
                                <RenderMultipleFilter
                                    key={filterKey}
                                    filterKey={filterKey}
                                    filterOptions={filters[filterKey]}
                                    expandedFilter={expandedFilter}
                                    setExpandedFilter={setExpandedFilter}
                                    filtersState={filtersState}
                                    setFiltersState={setFiltersState}
                                />
                            );
                        } else if (typeof filters[filterKey][0]?.translation === "string") {
                            return (
                                <RenderFilter
                                    key={filterKey}
                                    filterKey={filterKey}
                                    filterOptions={filters[filterKey]}
                                    expandedFilter={expandedFilter}
                                    setExpandedFilter={setExpandedFilter}
                                    filtersState={filtersState}
                                    setFiltersState={setFiltersState}
                                />
                            );
                        }
                        return null;
                    })}
                </div>

                <div className="mt-8"></div>
                <label className="text-lg font-medium text-black dark:text-gray-100">
                    {t("filtermodal.priceRang", "Rango de Precio")}
                </label>
                <MultiRangeSlider
                    min={0}
                    max={1000}
                    start={[filtersState.minPrice, filtersState.maxPrice]}
                    onChange={({ min, max }) => {
                        setFiltersState((prevFilters: FiltersState) => ({
                            ...prevFilters,
                            minPrice: min,
                            maxPrice: max,
                        }));
                    }}
                />

                <div className="flex flex-col gap-2">
                    <label className="text-lg font-medium text-black dark:text-gray-100">
                        {t("filtermodal.orderPrice", "Ordenar por precio")}
                    </label>
                    <div className="flex gap-4">
                        <button
                            className={`px-4 py-2 rounded-md border transition-all duration-300 transform hover:scale-105 ${filtersState.orderMajorMenor ? "bg-faqblue text-white dark:bg-blue-500" : "bg-gray-200 dark:bg-gray-700"}`}
                            onClick={() => handleOrderSelection("orderMajorMenor")}
                        >
                            {t("filtermodal.mayorMenor", "Mayor a Menor")}
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md border transition-all duration-300 transform hover:scale-105 ${filtersState.orderMenorMajor ? "bg-faqblue text-white dark:bg-blue-500" : "bg-gray-200 dark:bg-gray-700"}`}
                            onClick={() => handleOrderSelection("orderMenorMajor")}
                        >
                            {t("filtermodal.menorMayor", "Menor a Mayor")}
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-medium text-black dark:text-gray-100">
                        {t("filtermodal.aditionalFilters", "Filtros adicionales")}
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <label className="flex items-center mb-4">
                            <div
                                className={`px-4 py-2 rounded-md border transition-all duration-300 transform hover:scale-105 ${filtersState.onlyOfferts ? "bg-faqblue text-white dark:bg-blue-500" : "bg-gray-200 dark:bg-gray-700"}`}
                                onClick={() => toggleBooleanFilter("onlyOffers")}
                            >
                                {t("filtermodal.soloOfferts", "Solo ofertas")}
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <div className="sticky bottom-0 bg-white dark:bg-gray-800 shadow-md border-t border-gray-300 dark:border-gray-600 z-20 p-4 flex justify-between items-center">
                <div className="flex justify-between items-center w-full">
                    <button
                        onClick={() => setFiltersState({
                            onlyOffers: false,
                            officialBrands: false,
                            minPrice: 0,
                            maxPrice: 1000,
                        })}
                        className="py-3 px-6 text-black dark:text-gray-100 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium shadow-lg hover:scale-105 hover:bg-gray-300 dark:hover:bg-gray-600 transition transform duration-200"
                    >
                        {t("filtermodal.reset", "Reset")}
                    </button>

                    <button
                        onClick={() => {
                            handleSearch();
                            onClose();
                        }}
                        className="py-3 px-6 text-white bg-faqblue dark:bg-blue-700 rounded-lg font-medium shadow-lg hover:scale-105 hover:bg-faqblue/90 dark:hover:bg-blue-600 transition transform duration-200"
                    >
                        {t("filtermodal.search", "Buscar")}
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

    export default FilterModal;
