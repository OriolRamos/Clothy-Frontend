"use client";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface FilterOption {
    value: string;
    translation: string; // Aquest camp ara serveix com a valor per defecte o per a fallback
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
    // Mostrem la traducció mitjançant t() amb la clau: filters.{filterKey}.{value}
    const selectedOption = filterOptions.find(
        (option) => option.value === initialValue
    );
    const searchValue = filtersState[`${filterKey}Search`] || "";

    const filteredOptions = filterOptions.filter((option) =>
        t(`filters.${filterKey}.${option.value}`)
            .toLowerCase()
            .includes(searchValue.toLowerCase())
    );

    const handleModalToggle = () => {
        setExpandedFilter(expandedFilter === filterKey ? "" : filterKey);
        if (expandedFilter !== filterKey) {
            setFiltersState((prev) => ({
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
                className={`w-full text-black px-6 py-3 rounded-lg border ${
                    expandedFilter === filterKey ? "border-blue-600" : "border-gray-300"
                } focus:outline-none transition-all ease-in-out duration-200 hover:bg-blue-50`}
                onClick={handleModalToggle}
            >
        <span className="font-semibold text-black">
          {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}:
        </span>
                <span className="px-2 py-1 ml-2 rounded-md text-black">
          {selectedOption
              ? t(`filters.${filterKey}.${selectedOption.value}`)
              : t("defaultSelect")}
        </span>
            </button>

            {expandedFilter === filterKey && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 z-10 max-h-48 overflow-y-auto scrollbar-hidden filter">
                    <input
                        type="text"
                        placeholder={t("filters.searchPlaceholder", "Buscar...")}
                        value={searchValue}
                        onChange={(e) =>
                            setFiltersState((prev) => ({
                                ...prev,
                                [`${filterKey}Search`]: e.target.value,
                            }))
                        }
                        className="w-full px-4 py-3 border-b border-gray-200 focus:outline-none text-black rounded-t-lg"
                    />
                    <div className="py-1">
                        {filteredOptions.map((option, idx) => {
                            const isSelected = option.value === initialValue;
                            return (
                                <button
                                    key={`${filterKey}-${idx}`}
                                    className={`w-full text-left px-6 py-2 transition rounded-lg ${
                                        isSelected
                                            ? "bg-faqblue text-white hover:bg-blue-300 border border-b-cyan-900"
                                            : "bg-white hover:bg-gray-100"
                                    }`}
                                    onClick={() => {
                                        setFiltersState((prev) => ({
                                            ...prev,
                                            [filterKey]: isSelected ? "" : option.value,
                                            [`${filterKey}Search`]: "",
                                        }));
                                        setExpandedFilter("");
                                    }}
                                >
                                    {t(`filters.${filterKey}.${option.value}`, option.translation)}
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
