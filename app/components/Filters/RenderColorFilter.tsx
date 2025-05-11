import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface FilterOption {
    value: string;
    translation: string;
    color: string;  // Color per mostrar
}

interface RenderFilterProps {
    filterKey: string;
    filterOptions: FilterOption[];
    expandedFilter: string;
    setExpandedFilter: (key: string) => void;
    filtersState: Record<string, string | string[]>;
    setFiltersState: React.Dispatch<React.SetStateAction<Record<string, string | string[]>>>;
}

const RenderColorFilter: React.FC<RenderFilterProps> = ({
                                                            filterKey,
                                                            filterOptions,
                                                            expandedFilter,
                                                            setExpandedFilter,
                                                            filtersState,
                                                            setFiltersState,
                                                        }) => {
    const { t } = useTranslation("common");
    const filterRef = useRef<HTMLDivElement>(null); // 🔑 Referència al filtre

    const selectedValues = filtersState[filterKey] || [];
    const rawSearchValue = filtersState[`${filterKey}Search`] || "";
    const searchValue = Array.isArray(rawSearchValue) ? rawSearchValue.join(" ") : rawSearchValue;

    const filteredOptions = filterOptions.filter(option => {
        const translation: string | string[] = t(`filters.${filterKey}.${option.value}`);
        const text: string = Array.isArray(translation)
            ? translation.join(" ")
            : translation;
        return text.toLowerCase().includes(searchValue.toLowerCase());
    });

    // Funció per alternar les opcions seleccionades
    const toggleSelection = (value: string) => {
        setFiltersState(prev => {
            const selectedSet = new Set(prev[filterKey] || []);
            if (selectedSet.has(value)) {
                selectedSet.delete(value); // Eliminar si ja està seleccionat
            } else {
                selectedSet.add(value); // Afegir si no està seleccionat
            }
            return { ...prev, [filterKey]: Array.from(selectedSet) };
        });
    };

    const handleModalToggle = () => {
        setExpandedFilter(expandedFilter === filterKey ? "" : filterKey);

        // 🔄 Neteja la cerca només quan s'obre el modal
        if (expandedFilter !== filterKey) {
            setFiltersState(prev => ({
                ...prev,
                [`${filterKey}Search`]: "",
            }));
        }
    };

    // 🧲 Detecta clics fora per tancar el modal
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setExpandedFilter(""); // 🚪 Tanca si clic fora
            }
        };

        if (expandedFilter === filterKey) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside); // 🧹 Neteja l’escoltador
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
                <span
                    className={`px-2 py-1 ml-2 rounded-md ${
                        selectedValues.length > 0 ? "text-black dark:text-gray-100" : "text-black dark:text-gray-100"
                    }`}
                >
                    {selectedValues.length > 0
                        ? `${selectedValues.length} seleccionat${selectedValues.length > 1 ? "s" : ""}`
                        : t("defaultSelect")}
                </span>
            </button>

            {expandedFilter === filterKey && (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg mt-2 z-10 max-h-48 overflow-y-auto scrollbar-hidden filter">
                    <input
                        type="text"
                        placeholder={t("filters.searchPlaceholder", "Buscar...")}
                        value={searchValue}
                        onChange={(e) =>
                            setFiltersState(prev => ({
                                ...prev,
                                [`${filterKey}Search`]: e.target.value,
                            }))
                        }
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
                                    <div className="flex items-center">
                                        <div
                                            className="w-4 h-4 rounded-full mr-2"
                                            style={{
                                                backgroundColor: option.color,
                                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                                transform: "scale(1.1)",
                                                transition: "transform 0.2s ease-in-out",
                                            }}
                                        ></div>
                                        <span className="text-black dark:text-gray-100">
                                            {t(`filters.${filterKey}.${option.value}`, option.translation)}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RenderColorFilter;
