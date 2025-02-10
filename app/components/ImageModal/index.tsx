import React, { useState } from "react";

interface ImageModelProps {
    imageUrl: string;
    description: string;
    price: number;
    discountPrice?: number; // Si hi ha un preu d'oferta
    brand: string;
    color: string;
    type: string;
    purchaseUrl: string;
    favorite: boolean;
    onFavoriteToggle: () => void;
    onReload: () => void;
}

const ImageModel: React.FC<ImageModelProps> = ({
                                                   imageUrl,
                                                   description,
                                                   price,
                                                   discountPrice,
                                                   brand,
                                                   color,
                                                   type,
                                                   purchaseUrl,
                                                   favorite,
                                                   onFavoriteToggle,
                                                   onReload,
                                               }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isOnSale = discountPrice !== undefined; // Comprovem si hi ha descompte

    return (
        <div className="relative rounded-lg shadow-lg bg-white hover:shadow-xl transition max-w-[300px]">
            {/* Miniatura de la imatge */}
            <div className="relative">
                <img
                    src={imageUrl}
                    alt={description || "Product image"}
                    className="cursor-pointer object-cover w-[300px] h-[400px] rounded-lg"
                    onClick={() => setIsModalOpen(true)}
                    onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/300x400?text=No+Image")}
                />

                {/* Preu flotant sobre la imatge */}
                <div
                    className={`absolute bottom-2 left-2 px-3 py-1 rounded-full text-white font-semibold text-sm 
                        ${isOnSale ? "bg-red-500" : "bg-black"} 
                    `}
                >
                    {isOnSale ? `${discountPrice}€` : `${price}€`}
                </div>
            </div>

            {/* Botó Favorits */}
            <button
                className={`absolute top-2 right-2 rounded-full p-2 ${favorite ? "bg-red-500" : "bg-gray-300"} hover:scale-110 transition`}
                onClick={onFavoriteToggle}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={favorite ? "white" : "none"}
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
            <p className="m-2 text-center text-black font-medium">{description}</p>

            {/* Modal detallat */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg shadow-lg w-[400px] h-auto flex flex-col"
                        onClick={(e) => e.stopPropagation()} // Evitem que el clic fora tanqui el modal
                    >
                        {/* Imatge en alta qualitat */}
                        <div className="h-[250px] flex items-center justify-center overflow-hidden rounded-t-lg relative">
                            {/* Creueta per tancar el modal */}
                            <button
                                className="absolute top-2 right-4 text-2xl font-bold text-black hover:text-gray-800 transition z-10"
                                onClick={() => setIsModalOpen(false)}
                            >
                                &times;
                            </button>
                            <img
                                src={imageUrl}
                                alt={description || "Product image"}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>

                        {/* Footer amb la informació */}
                        <div className="p-4 flex flex-col gap-2">
                            <h2 className="text-xl font-semibold text-gray-800">{description}</h2>
                            <p className="text-gray-600">
                                <strong>Marca:</strong> {brand}
                            </p>
                            <p className="text-gray-600">
                                <strong>Tipus:</strong> {type}
                            </p>
                            <p className="text-gray-600">
                                <strong>Color:</strong> {color}
                            </p>
                            <p className={`text-lg font-semibold ${isOnSale ? "text-red-500" : "text-black"}`}>
                                <strong>Preu:</strong> {isOnSale ? `${discountPrice}€` : `${price}€`}
                            </p>
                            <a
                                href={purchaseUrl}
                                className="text-blue-500 text-sm underline hover:text-blue-700"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Comprar ara
                            </a>

                            {/* Botó per actualitzar informació */}
                            <button
                                className="mt-auto w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                                onClick={onReload}
                            >
                                Actualitzar informació
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageModel;
