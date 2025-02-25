import React, { useEffect, useRef } from "react";

interface FilterOption {
    value: string;
    translation: string;
    color: string;  // Color per mostrar
}

interface RenderColorsProps {
    filterKey: string;
    filterOptions: FilterOption[];
    expandedFilter: string;
    setExpandedFilter: (key: string) => void;
    filtersState: Record<string, string>;
    setFiltersState: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const RenderColorFilter: React.FC<RenderColorsProps> = ({
                                                            filterKey,
                                                            filterOptions,
                                                            expandedFilter,
                                                            setExpandedFilter,
                                                            filtersState,
                                                            setFiltersState,
                                                        }) => {
    const filterRef = useRef<HTMLDivElement>(null); // Referència al filtre
    const initialValue = filtersState[filterKey] || ""; // Valor inicial del filtre

    // Filtrar les opcions en funció de la cerca
    const filteredOptions = filterOptions.filter(option =>
        option.translation.toLowerCase().includes(String(filtersState[`${filterKey}Search`] || "").toLowerCase())
    );


    // Funció per tancar el modal si es fa clic fora
    const handleClickOutside = (event: MouseEvent) => {
        if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
            setExpandedFilter(""); // Tancar el modal
        }
    };

    // Afegir i eliminar el listener de clic fora
    useEffect(() => {
        if (expandedFilter === filterKey) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside); // Netegem l'escoltador
        };
    }, [expandedFilter, filterKey]);

    // Trobar la traducció associada al valor seleccionat
    const selectedOption = filterOptions.find(option => option.value === initialValue);
    const selectedTranslation = selectedOption ? selectedOption.translation : "Selecciona un color";

    // Toggle per obrir o tancar el modal
    const handleModalToggle = () => {
        setExpandedFilter(expandedFilter === filterKey ? "" : filterKey);
        if (expandedFilter !== filterKey) {
            setFiltersState((prev) => ({
                ...prev,
                [`${filterKey}Search`]: "",
            }));
        }
    };

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
                <span className={`px-2 py-1 ml-2 rounded-md ${selectedOption ? "text-black" : "text-black"}`}>
                    {selectedTranslation} {/* Mostrar la traducció seleccionada */}
                </span>
            </button>

            {expandedFilter === filterKey && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 z-10 max-h-48 overflow-y-auto scrollbar-hidden filter">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={filtersState[`${filterKey}Search`] || ""}
                        onChange={(e) =>
                            setFiltersState((prev) => ({
                                ...prev,
                                [`${filterKey}Search`]: e.target.value, // Filtrar segons el cercador
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
                                        // Si el color ja és seleccionat, el deseleccionem
                                        const newValue = isSelected ? "" : option.value;
                                        setFiltersState((prev) => ({
                                            ...prev,
                                            [filterKey]: newValue, // Actualitzem el valor seleccionat o buidem-lo
                                            [`${filterKey}Search`]: "", // Netegem la cerca després de la selecció
                                        }));
                                        setExpandedFilter(""); // Tancar el modal després de seleccionar
                                    }}
                                >
                                    <div
                                        className="flex items-center"> {/* Utilitzem flex per alinear els elements horitzontalment */}
                                        <div
                                            className="w-4 h-4 rounded-full mr-2"
                                            style={{
                                                backgroundColor: option.color, // Mostrar el color de fons
                                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Afegir ombra suau per al relleu
                                                transform: "scale(1.1)", // Donar un efecte de lleuger relleu
                                                transition: "transform 0.2s ease-in-out", // Animar l'efecte quan es clica
                                            }}
                                        ></div>
                                        <span>{option.translation}</span> {/* Mostrar la traducció */}
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
