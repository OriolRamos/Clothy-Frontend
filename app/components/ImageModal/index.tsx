import React, { useState } from "react";
import ExternalPageModal from "./ExternalPageModal";
import { Cloth } from "../Modals/Cloth";
import Image from "next/image";
import { filters } from "../Filters/cloth_filters";
import { useAuth } from "@/app/components/AuthContext";

interface ImageModelProps {
    cloth: Cloth;
    country: string | null;
}

const ImageModel: React.FC<ImageModelProps> = ({ cloth, country }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Creem una variable d'estat per gestionar el favorit, inicialitzada amb el valor de cloth.favorite
    const [isFavorite, setIsFavorite] = useState(cloth.favorite);
    const isOnSale = cloth.discount_price !== undefined;
    const { fetchWithAuth } = useAuth();

    const handleFavoriteToggle = async (cloth: Cloth) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            let response;
            if (isFavorite) {
                // Si l'element ja és favorit, el treu de favorits
                response = await fetchWithAuth(`${apiUrl}/profile/favorites/delete`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ purchase_url: cloth.purchase_url, color: cloth.color }),
                });
                if (!response.ok) {
                    console.error("Error eliminant dels favorits.");
                    return;
                }
                // Actualitzem l'estat a false
                setIsFavorite(false);
            } else {
                // Si l'element no és favorit, l'afegeix als favorits
                response = await fetchWithAuth(`${apiUrl}/profile/favorites/add`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ purchase_url: cloth.purchase_url, color: cloth.color }),
                });
                if (!response.ok) {
                    console.error("Error afegint als favorits.");
                    return;
                }
                // Actualitzem l'estat a true
                setIsFavorite(true);
            }
        } catch (error) {
            console.error("Error gestionant els favorits:", error);
        }
    };

    // Buscar la divisa segons el país seleccionat
    const currencySymbol =
        filters.currency.find(c => c.value === country)?.translation || "€";
    const brandLogoPath = `/images/brands/${cloth.brand.toLowerCase()}.png`;

    return (
        <div className="relative rounded-lg shadow-lg bg-white hover:shadow-xl transition max-w-[300px]">
            {/* Miniatura de la imatge */}
            <div className="relative">

                <div className="relative w-[300px] h-[400px] cursor-pointer" onClick={() => setIsModalOpen(true)}>
                    <Image
                        src={cloth.image_url || "https://via.placeholder.com/300x400?text=No+Image"}
                        alt={cloth.description || "Product image"}
                        fill
                        className="object-cover rounded-lg"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://via.placeholder.com/300x400?text=No+Image";
                        }}
                    />
                </div>

                {/* Logo de la marca */}
                <div className="absolute top-2 left-2 p-1">
                    <Image
                        src={brandLogoPath}
                        alt="logo-brand"
                        width={50}
                        height={50}
                        className="mb-5"
                    />
                </div>

                {/* Preu flotant sobre la imatge */}
                {cloth.in_discount ? (
                    <div
                        className="absolute bottom-2 left-2 px-3 py-1 rounded-full text-white bg-black font-semibold text-sm flex items-center space-x-2">
                        <span className="line-through text-gray-500">
                            {cloth.price}
                            {currencySymbol}
                        </span>
                        <span className="text-red-500">
                            {cloth.discount_price}
                            {currencySymbol}
                        </span>
                        <span className="text-red-500 text-xs">- {cloth.discount}%</span>
                    </div>
                ) : (
                    <div
                        className="absolute bottom-2 left-2 px-3 py-1 rounded-full text-white font-semibold text-sm bg-black">
                        {cloth.price}
                        {currencySymbol}
                    </div>
                )}
            </div>

            {/* Botó Favorits */}
            <button
                className={`absolute top-2 right-2 rounded-full p-2 ${
                    isFavorite ? "bg-red-500" : "bg-gray-300"
                } hover:scale-110 transition`}
                onClick={() => handleFavoriteToggle(cloth)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={isFavorite ? "white" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 text-white"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.172 6.828a4 4 0 015.656 0L12 9.999l3.172-3.172a4 4 0 115.656 5.656L12 21.485l-8.828-8.828a4 4 0 010-5.656z"
                    />
                </svg>
            </button>

            {/* Descripció curta */}
            <p className="m-2 text-center text-black font-medium">
                {cloth.description}
            </p>

            {/* Modal amb la informació del producte */}
            {isModalOpen && (
                <ExternalPageModal
                    cloth={cloth}
                    country={country}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ImageModel;
