"use client";

import React, { useState } from "react";

interface ImageModelProps {
    imageUrl: string;
    description: string;
    price: number;
    brand: string;
    color: string;
    type: string;
    purchaseUrl: string;
    favorite: boolean;
    onFavoriteToggle: () => void;
    onReload: () => void; // Afegim funció per actualitzar la informació
}

const ImageModel: React.FC<ImageModelProps> = ({
                                                   imageUrl,
                                                   description,
                                                   price,
                                                   brand,
                                                   color,
                                                   type,
                                                   purchaseUrl,
                                                   favorite,
                                                   onFavoriteToggle,
                                                   onReload,
                                               }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="relative rounded-lg shadow-lg bg-white hover:shadow-lg transition max-w-[300px]">
            {/* Miniatura de la imatge */}
            <img
                src={imageUrl}
                alt={description}
                className="cursor-pointer object-cover w-[300px] h-[400px] rounded-t-lg"
                onClick={() => setIsModalOpen(true)}
            />

            {/* Botó Favorits */}
            <button
                className={`absolute top-2 right-2 rounded-full p-1 ${
                    favorite ? "bg-red-500" : "bg-gray-300"
                } hover:scale-105`}
                onClick={onFavoriteToggle}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={favorite ? "white" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-4 h-4 text-white"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.172 6.828a4 4 0 015.656 0L12 9.999l3.172-3.172a4 4 0 115.656 5.656L12 21.485l-8.828-8.828a4 4 0 010-5.656z"
                    />
                </svg>
            </button>

            {/* Línia separadora */}
            <div className="border-b border-gray-300"></div>

            {/* Descripció curta */}
            <p className="m-1 text-center text-black">{description}</p>

            {/* Modal detallat */}
            {/* Modal detallat */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg shadow-lg w-[600px] h-auto flex flex-col"
                        onClick={(e) => e.stopPropagation()} // Evitem que el clic fora tanqui el modal
                    >
                        
                        {/* Imatge en alta qualitat */}
                        <div className="h-[300px] flex items-center justify-center overflow-hidden rounded-t-lg relative">
                            {/* Creueta per tancar el modal */}
                            <button
                                className="absolute top-2 left-4 text-2xl font-bold text-black hover:text-gray-800 transition z-10"
                                onClick={() => setIsModalOpen(false)}
                            >
                                &times;
                            </button>
                            <img
                                src={imageUrl}
                                alt={description}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>

                        {/* Footer amb la informació */}
                        <div className="p-6 flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold text-gray-800">{description}</h2>
                            <p className="text-gray-600">
                                <strong>Marca:</strong> {brand}
                            </p>
                            <p className="text-gray-600">
                                <strong>Tipus:</strong> {type}
                            </p>
                            <p className="text-gray-600">
                                <strong>Color:</strong> {color}
                            </p>
                            <p className="text-gray-600">
                                <strong>Preu:</strong> {price}
                            </p>
                            <a
                                href={purchaseUrl}
                                className="text-blue-500 text-sm underline hover:text-blue-700"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Comprar ara
                            </a>

                            {/* Botó blau per buscar més informació */}
                            <button
                                className="mt-auto w-full bg-blue-500 text-black py-3 rounded-lg hover:bg-blue-600 transition"
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
