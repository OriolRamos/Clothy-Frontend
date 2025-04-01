import React, { useState } from "react";
import ExternalPageModal from "./ExternalPageModal";
import { Cloth } from "../Modals/Cloth"; // Importa la interfície Cloth centralitzada
import Image from "next/image";
import {filters} from "../Filters/cloth_filters";

interface ImageModelProps {
    cloth: Cloth;
    country: string | null,
    onFavoriteToggle: () => void;
    onReload: () => void;
}

const ImageModel: React.FC<ImageModelProps> = ({ cloth,country,  onFavoriteToggle, onReload }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isOnSale = cloth.discount_price !== undefined;

    // Buscar la divisa segons el país seleccionat
    const currencySymbol = filters.currency.find(c => c.value === country)?.translation || "€";
    const brandLogoPath = `/images/brands/${cloth.brand.toLowerCase()}.png`;

    return (
        <div className="relative rounded-lg shadow-lg bg-white hover:shadow-xl transition max-w-[300px]">
            {/* Miniatura de la imatge */}
            <div className="relative">
                <img
                    src={cloth.image_url}
                    alt={cloth.description || "Product image"}
                    className="cursor-pointer object-cover w-[300px] h-[400px] rounded-lg"
                    onClick={() => setIsModalOpen(true)} // Obre el modal
                    onError={(e) =>
                        (e.currentTarget.src =
                            "https://via.placeholder.com/300x400?text=No+Image")
                    }
                />

                {/* Logo de la marca */}
                <div className="absolute top-2 left-2 p-1">
                    <Image src={brandLogoPath} alt="logo-brand" width={50} height={50} className="mb-5" />
                </div>


                {/* Preu flotant sobre la imatge */}
                {cloth.in_discount ? (
                    <div
                        className="absolute bottom-2 left-2 px-3 py-1 rounded-full text-white bg-black font-semibold text-sm flex items-center space-x-2">
                    {/* Preu original amb un efecte de línia tachada */}
                        <span className="line-through text-gray-500">{cloth.price}{currencySymbol}</span>
                        {/* Preu amb descompte en vermell */}
                        <span className="text-red-500">{cloth.discount_price}{currencySymbol}</span>
                        {/* Percentatge de descompte en vermell */}
                        <span className="text-red-500 text-xs">- {cloth.discount}%</span>
                        {/* S'afegirà el signe de % al descompte */}
                    </div>
                ) : (
                    // Si no hi ha descompte, només mostrem el preu regular
                    <div
                        className="absolute bottom-2 left-2 px-3 py-1 rounded-full text-white font-semibold text-sm bg-black">
                        {cloth.price}{currencySymbol}
                    </div>
                )}
            </div>


            {/* Botó Favorits */}
            <button
                className={`absolute top-2 right-2 rounded-full p-2 ${
                    cloth.favorite ? "bg-red-500" : "bg-gray-300"
                } hover:scale-110 transition`}
                onClick={onFavoriteToggle}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={cloth.favorite ? "white" : "none"}
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
            <p className="m-2 text-center text-black font-medium">{cloth.description}</p>

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
