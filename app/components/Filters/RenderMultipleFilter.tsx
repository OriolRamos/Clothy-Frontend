"use client";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import isEqual from "lodash.isequal";

interface FilterOption {
    value: string;
    translation: string;
}

interface RenderFilterProps {
    filterKey: string;
    filterOptions: FilterOption[];
    expandedFilter: string;
    setExpandedFilter: (key: string) => void;
    filtersState: Record<string, string | string[]>;
    setFiltersState: React.Dispatch<
        React.SetStateAction<Record<string, string | string[]>>
    >;
}

const RenderMultipleFilter: React.FC<RenderFilterProps> = ({
    filterKey,
    filterOptions,
    expandedFilter,
    setExpandedFilter,
    filtersState,
    setFiltersState,
}) => {
    const { t } = useTranslation("common");
    const filterRef = useRef<HTMLDivElement>(null);

    const selectedValues = Array.isArray(filtersState[filterKey])
        ? (filtersState[filterKey] as string[])
        : [];

    const rawSearchValue = filtersState[`${filterKey}Search`];
    const searchValue = typeof rawSearchValue === "string"
        ? rawSearchValue
        : Array.isArray(rawSearchValue)
            ? rawSearchValue.join(" ")
            : "";

    const filteredOptions = filterOptions.filter(option => {
        const translationResult = t(`filters.${filterKey}.${option.value}`);
        const translationText = Array.isArray(translationResult)
            ? translationResult.join(" ")
            : translationResult;
        return translationText.toLowerCase().includes(searchValue.toLowerCase());
    });

    const toggleSelection = (value: string) => {
        setFiltersState(prev => {
            const oldArray = Array.isArray(prev[filterKey]) ? prev[filterKey] as string[] : [];
            // Construïm el nou array:
            const newSet = new Set(oldArray);
            newSet.has(value) ? newSet.delete(value) : newSet.add(value);
            const newArray = Array.from(newSet);
            // Si no ha canviat res, retornem prev per evitar disparar el useEffect
            if (isEqual(oldArray, newArray)) return prev;
            return { ...prev, [filterKey]: newArray };
        });
    };


    const handleModalToggle = () => {
        setExpandedFilter(expandedFilter === filterKey ? "" : filterKey);
        if (expandedFilter !== filterKey) {
            setFiltersState(prev => ({
                ...prev,
                [`${filterKey}Search`]: "",
            }));
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setExpandedFilter("");
            }
        };
        if (expandedFilter === filterKey) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [expandedFilter, filterKey, setExpandedFilter]);

    return (
        <div ref={filterRef} key={filterKey} className="relative w-full scrollbar-hidden">
            <button
                className={`w-full text-black dark:text-gray-100 px-6 py-3 rounded-lg border dark:border-gray-600 ${
                    expandedFilter === filterKey
                        ? "border-blue-600 dark:border-blue-400"
                        : "border-gray-300"
                } focus:outline-none transition-all ease-in-out duration-200 hover:bg-blue-50 dark:hover:bg-gray-700`}
                onClick={handleModalToggle}
            >
                <span className="font-semibold">
                    {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}:
                </span>
                <span
                    className="px-2 py-1 ml-2 rounded-md text-black dark:text-gray-100"
                >
                    {selectedValues.length > 0
                        ? `${selectedValues.length} seleccionat${selectedValues.length > 1 ? "s" : ""}`
                        : t("defaultSelect")}
                </span>
            </button>

            {expandedFilter === filterKey && (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg shadow-lg mt-2 z-10 max-h-48 overflow-y-auto scrollbar-hidden filter">
                    <input
                        type="text"
                        placeholder={t("filters.searchPlaceholder", "Buscar...")}
                        value={searchValue}
                        onChange={e => {
                            const newSearch = e.target.value;
                            setFiltersState(prev => {
                                if (prev[`${filterKey}Search`] === newSearch) return prev;
                                return { ...prev, [`${filterKey}Search`]: newSearch };
                            });
                        }}
                        className="w-full px-4 py-3 border-b border-gray-200 dark:border-gray-700 focus:outline-none text-black dark:text-gray-100 rounded-t-lg bg-white dark:bg-gray-800"
                    />
                    <div className="py-1">
                        {filteredOptions.map((option, idx) => {
                            const isSelected = selectedValues.includes(option.value);
                            return (
                                <button
                                    key={`${filterKey}-${idx}`}
                                    className={`w-full text-left px-6 py-2 transition rounded-lg ${
                                        isSelected
                                            ? "bg-faqblue text-white dark:bg-blue-500 hover:bg-blue-300"
                                            : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                                    onClick={() => toggleSelection(option.value)}
                                >
                                    <span className="text-black dark:text-gray-100">
                                        {t(`filters.${filterKey}.${option.value}`, option.translation)}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RenderMultipleFilter;