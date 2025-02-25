import { useEffect, useRef } from "react";

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
    const filterRef = useRef<HTMLDivElement>(null); // 🔑 Referència al filtre

    const initialValue = String(filtersState[filterKey] ?? "");
    const selectedOption = filterOptions.find(option => option.value === initialValue);
    const searchValue = filtersState[`${filterKey}Search`] || "";

    const filteredOptions = filterOptions.filter(option =>
        option.translation.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleModalToggle = () => {
        setExpandedFilter(expandedFilter === filterKey ? "" : filterKey);

        // 🔄 Neteja la cerca només quan s'obre el modal
        if (expandedFilter !== filterKey) {
            setFiltersState((prev) => ({
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
                        selectedOption ? "text-black" : "text-black"
                    }`}
                >
                    {selectedOption ? selectedOption.translation : "Seleccione"}
                </span>
            </button>

            {expandedFilter === filterKey && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 z-10 max-h-48 overflow-y-auto scrollbar-hidden filter">
                    <input
                        type="text"
                        placeholder="Buscar..."
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
                                            [filterKey]: isSelected ? null : option.value,
                                            [`${filterKey}Search`]: "",
                                        }));
                                        setExpandedFilter(""); // 🚪 Tanca després de seleccionar
                                    }}
                                >
                                    {option.translation}
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
