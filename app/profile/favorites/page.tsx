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
import filters from "../../components/Filters/cloth_filters";

interface Favorite {
    url: string;
    description?: string;
    type?: string;
    brand?: string;
    color?: string;
    price?: number;
    purchase_url?: string;
    imageUrl?: string | null; // Afegim `imageUrl` per a la imatge generada
}

const Favoritos = () => {
    const [filtersState, setFiltersState] = useState<{ [key: string]: string }>({
        type: '',
        color: '',
        brand: '',
    });

    const [expandedFilter, setExpandedFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const { fetchWithAuth } = useAuth();
    const [images, setImages] = useState<Favorite[]>([]); // Estat inicialitzat amb el tipus correcte


    // Funció per convertir el blob a Base64
    const blobToBase64 = (blob: Blob): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    resolve((reader.result as string).split(",")[1]); // Retorna només el Base64
                } else {
                    reject(new Error("Failed to read the Blob."));
                }
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });

    // useEffect per obtenir els favorits i les imatges
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetchWithAuth(`${apiUrl}/profile/favorites`, {
                    method: 'GET',
                });

                if (response.ok) {
                    // Obtenim els favorits inicials
                    const data: Favorite[] = await response.json();
                    console.log('Info', data);

                    // Per a cada favorit, fem una petició al backend per obtenir la imatge
                    const updatedFavorites = await Promise.all(
                        data.map(async (favorite: Favorite) => {
                            let imageUrl = null;

                            if (favorite.url) {
                                try {
                                    // Petició al backend amb la purchase_url per obtenir la imatge
                                    const imageResponse = await fetchWithAuth(`${apiUrl}/profile/favorites/imageFile`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ url: favorite.url }),
                                    });

                                    if (imageResponse.ok) {
                                        // Converteix el blob en un objecte Data URI
                                        const imageBlob = await imageResponse.blob();
                                        imageUrl = `data:image/jpeg;base64,${await blobToBase64(imageBlob)}`;
                                        console.log('Imatge64', imageUrl);
                                    } else {
                                        console.error(`Error obtenint la imatge per ${favorite.url}`);
                                    }
                                } catch (error) {
                                    console.error(`Error a la petició de la imatge: ${(error as Error).message}`);
                                }
                            }

                            return {
                                ...favorite,
                                imageUrl, // Afegim la URL de la imatge retornada
                            };
                        })
                    );
                    console.log('Images', updatedFavorites);
                    setImages(updatedFavorites); // Actualitzem l'estat amb les dades i les imatges
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
    }, []); // Assegurem-nos que només s'executi una vegada en el muntatge


    // Funció per actualitzar les imatges
    const onReload = async () => {
        try {
            setLoading(true); // Inicia la càrrega
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            // Fer una nova petició per obtenir les últimes dades de les imatges
            const response = await fetchWithAuth(`${apiUrl}/profile/favorites`, {
                method: 'GET',
            });

            if (response.ok) {
                const data: Favorite[] = await response.json();
                // Actualitzar les imatges amb les noves dades
                setImages(data);
            } else {
                console.error('Error al obtenir els favorits.');
            }
        } catch (error) {
            console.error('Error al recarregar les imatges:', error);
        } finally {
            setLoading(false); // Finalitza la càrrega
        }
    };

    const handleFavoriteToggle = async (url: string) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            await fetch(`${apiUrl}/favorites/${url}`, { method: "DELETE" });
            setImages((prev) => prev.filter((image) => image.url !== url));
        } catch (error) {
            console.error("Error eliminando de favoritos:", error);
        }
    };

    const filteredImages = images.filter((image) => {
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
        const filterValue = filtersState[filterKey] || ''; // Assegurem que el valor sigui una cadena
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
                        {filterValue || "Selecciona una opción"}
                    </span>
                </button>
                {expandedFilter === filterKey && (
                    <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md mt-2 z-10 max-h-48 overflow-y-auto">
                        <input
                            type="text"
                            placeholder="Buscar..."
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
        <div className="min-h-screen bg-gray-100 px-8 py-12">
            <h1 className="text-4xl font-bold text-center text-black mb-8">
                Favoritos
            </h1>

            {/* Filtros */}
            <div className="flex flex-col sm:flex-row items-center justify-evenly bg-white p-4 rounded-lg shadow-md mb-8 space-y-4 sm:space-y-0">
                {Object.keys(filters).map((filterKey) =>
                    renderFilter(filterKey, filters[filterKey])
                )}
                <button
                    onClick={() => setFiltersState({type: "", color: "", brand: ""})}
                    className="bg-blue-500 text-black px-4 py-2 rounded-md text-sm transition hover:bg-gray-300"
                >
                    Restablecer
                </button>
            </div>

            {/* Contenido principal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full flex justify-center items-center">
                        <div className="w-16 h-16 border-4 border-gray-700 border-dashed rounded-full animate-spin"></div>
                    </div>
                ) : filteredImages.length > 0 ? (
                    filteredImages.map((image) => (
                        <ImageModel
                            key={image.url}
                            imageUrl={image.imageUrl as string}
                            description={image.description as string}
                            price={image.price as number}
                            type={image.type as string}
                            brand={image.brand as string}
                            color={image.color as string}
                            purchaseUrl={image.purchase_url as string}
                            favorite={true}
                            onFavoriteToggle={() => handleFavoriteToggle(image.url)}
                            onReload={onReload}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-600">
                        No tienes ropa en favoritos.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favoritos;
