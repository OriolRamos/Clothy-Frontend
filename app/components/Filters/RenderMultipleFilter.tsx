import { useEffect, useRef } from "react";
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
    // Permetem que els valors siguin string o string[]
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

    // Assegurem que els filtres per a aquesta clau són un array (si no, s'inicialitza a l'array buit)
    const selectedValues = Array.isArray(filtersState[filterKey])
        ? (filtersState[filterKey] as string[])
        : [];

    // Obtenim el valor de cerca; si és un array, el convertim a cadena
    const rawSearchValue = filtersState[`${filterKey}Search`];
    const searchValue =
        typeof rawSearchValue === "string"
            ? rawSearchValue
            : Array.isArray(rawSearchValue)
                ? rawSearchValue.join(" ")
                : "";

    // Filtratge de les opcions segons la cerca
    const filteredOptions = filterOptions.filter(option => {
        const translationResult = t(`filters.${filterKey}.${option.value}`);
        const translationText = Array.isArray(translationResult)
            ? translationResult.join(" ")
            : translationResult;
        const translationString =
            typeof translationText === "string" ? translationText : "";
        return translationString.toLowerCase().includes(searchValue.toLowerCase());
    });

    // Funció per alternar les opcions seleccionades
    const toggleSelection = (value: string) => {
        setFiltersState(prev => {
            const currentValues = Array.isArray(prev[filterKey])
                ? (prev[filterKey] as string[])
                : [];
            const selectedSet = new Set(currentValues);
            if (selectedSet.has(value)) {
                selectedSet.delete(value);
            } else {
                selectedSet.add(value);
            }
            return { ...prev, [filterKey]: Array.from(selectedSet) };
        });
    };

    const handleModalToggle = () => {
        setExpandedFilter(expandedFilter === filterKey ? "" : filterKey);

        // Neteja la cerca només quan s'obre el modal
        if (expandedFilter !== filterKey) {
            setFiltersState(prev => ({
                ...prev,
                // Ara podem assignar una cadena
                [`${filterKey}Search`]: "",
            }));
        }
    };

    // Detecta clics fora per tancar el modal
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
                <span
                    className={`px-2 py-1 ml-2 rounded-md ${
                        selectedValues.length > 0 ? "text-black" : "text-black"
                    }`}
                >
          {selectedValues.length > 0
              ? `${selectedValues.length} seleccionat${selectedValues.length > 1 ? "s" : ""}`
              : t("defaultSelect")}
        </span>
            </button>

            {expandedFilter === filterKey && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 z-10 max-h-48 overflow-y-auto scrollbar-hidden filter">
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
                        className="w-full px-4 py-3 border-b border-gray-200 focus:outline-none text-black rounded-t-lg"
                    />
                    <div className="py-1">
                        {filteredOptions.map((option, idx) => {
                            const isSelected = selectedValues.includes(option.value);
                            return (
                                <button
                                    key={`${filterKey}-${idx}`}
                                    className={`w-full text-left px-6 py-2 transition rounded-lg ${
                                        isSelected
                                            ? "bg-faqblue text-white hover:bg-blue-300 border border-b-cyan-900"
                                            : "bg-white hover:bg-gray-100"
                                    }`}
                                    onClick={() => toggleSelection(option.value)}
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

export default RenderMultipleFilter;
