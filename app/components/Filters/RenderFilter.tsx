"use client";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface FilterOption {
    value: string;
    translation: string;
}

interface RenderFilterProps {
    filterKey: string;
    filterOptions: FilterOption[];
    expandedFilter: string;
    setExpandedFilter: (key: string) => void;
    filtersState: Record<string, string>;
    setFiltersState: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const RenderFilter: React.FC<RenderFilterProps> = ({
    filterKey,
    filterOptions,
    expandedFilter,
    setExpandedFilter,
    filtersState,
    setFiltersState,
}) => {
    const { t } = useTranslation("common");
    const filterRef = useRef<HTMLDivElement>(null);

    const initialValue = String(filtersState[filterKey] ?? "");
    const selectedOption = filterOptions.find(option => option.value === initialValue);
    const searchValue = filtersState[`${filterKey}Search`] || "";

    const filteredOptions = filterOptions.filter(option =>
        t(`filters.${filterKey}.${option.value}`)
            .toLowerCase()
            .includes(searchValue.toLowerCase())
    );

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

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [expandedFilter, filterKey, setExpandedFilter]);

    return (
        <div ref={filterRef} key={filterKey} className="relative w-full scrollbar-hidden">
            <button
                className={`w-full text-black dark:text-gray-100 px-6 py-3 rounded-lg border dark:border-gray-600 ${
                    expandedFilter === filterKey ? "border-blue-600 dark:border-blue-400" : "border-gray-300"
                } focus:outline-none transition-all ease-in-out duration-200 hover:bg-blue-50 dark:hover:bg-gray-700`}
                onClick={handleModalToggle}
            >
                <span className="font-semibold">
                    {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}:
                </span>
                <span className="px-2 py-1 ml-2 rounded-md text-black dark:text-gray-100">
                    {selectedOption
                        ? t(`filters.${filterKey}.${selectedOption.value}`)
                        : t("defaultSelect")}
                </span>
            </button>

            {expandedFilter === filterKey && (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg shadow-lg mt-2 z-10 max-h-48 overflow-y-auto scrollbar-hidden filter">
                    <input
                        type="text"
                        placeholder={t("filters.searchPlaceholder", "Buscar...")}
                        value={searchValue}
                        onChange={e =>
                            setFiltersState(prev => ({
                                ...prev,
                                [`${filterKey}Search`]: e.target.value,
                            }))
                        }
                        className="w-full px-4 py-3 border-b border-gray-200 dark:border-gray-700 focus:outline-none text-black dark:text-gray-100 rounded-t-lg bg-white dark:bg-gray-800"
                    />
                    <div className="py-1">
                        {filteredOptions.map((option, idx) => {
                            const isSelected = option.value === initialValue;
                            return (
                                <button
                                    key={`${filterKey}-${idx}`}
                                    className={`w-full text-left px-6 py-2 transition rounded-lg ${
                                        isSelected
                                            ? "bg-faqblue text-white dark:bg-blue-500 hover:bg-blue-300"
                                            : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                                    onClick={() => {
                                        setFiltersState(prev => ({
                                            ...prev,
                                            [filterKey]: isSelected ? "" : option.value,
                                            [`${filterKey}Search`]: "",
                                        }));
                                        setExpandedFilter("");
                                    }}
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

export default RenderFilter;