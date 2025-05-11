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
    const [isFavorite, setIsFavorite] = useState(cloth.favorite);
    const [imgLoading, setImgLoading] = useState(true);
    const { fetchWithAuth } = useAuth();

    const handleFavoriteToggle = async (cloth: Cloth) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            let response;
            if (isFavorite) {
                response = await fetchWithAuth(`${apiUrl}/profile/favorites/delete`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ purchase_url: cloth.purchase_url, color: cloth.color }),
                });
                if (response.ok) setIsFavorite(false);
            } else {
                response = await fetchWithAuth(`${apiUrl}/profile/favorites/add`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ purchase_url: cloth.purchase_url, color: cloth.color }),
                });
                if (response.ok) setIsFavorite(true);
            }
        } catch (error) {
            console.error("Error gestionant els favorits:", error);
        }
    };

    const currencySymbol =
        filters.currency.find(c => c.value === country)?.translation || "€";
    const brandLogoPath = `/images/brands/${cloth.brand.toLowerCase()}.png`;

    return (
        <div className="relative rounded-lg shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition max-w-[300px]">
            <div className="relative">
                <div
                    className="relative w-[300px] h-[400px] cursor-pointer bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden"
                    onClick={() => setIsModalOpen(true)}
                >
                    {imgLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="loader" />
                        </div>
                    )}
                    <Image
                        src={cloth.image_url || "/images/image-not-found.png"}
                        alt={cloth.description || "No Image"}
                        fill
                        className="object-cover rounded-lg"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 300px"
                        placeholder="blur"
                        blurDataURL="/images/placeholder-blur.png"
                        onLoadingComplete={() => setImgLoading(false)}
                        onError={({ currentTarget }) => {
                            setImgLoading(false);
                            currentTarget.src = "/images/image-not-found.png";
                        }}
                    />
                </div>

                <div className="absolute top-2 left-2 p-1">
                    <Image
                        src={brandLogoPath}
                        alt="logo-brand"
                        width={50}
                        height={50}
                        className="mb-5"
                    />
                </div>

                {cloth.in_discount ? (
                    <div className="absolute bottom-2 left-2 px-3 py-1 rounded-full text-white bg-black dark:bg-gray-900 font-semibold text-sm flex items-center space-x-2">
                        <span className="line-through text-gray-500 dark:text-gray-400">
                            {cloth.price}{currencySymbol}
                        </span>
                        <span className="text-red-500">
                            {cloth.discount_price}{currencySymbol}
                        </span>
                        <span className="text-red-500 text-xs">- {cloth.discount}%</span>
                    </div>
                ) : (
                    <div className="absolute bottom-2 left-2 px-3 py-1 rounded-full text-white bg-black dark:bg-gray-900 font-semibold text-sm">
                        {cloth.price}{currencySymbol}
                    </div>
                )}
            </div>

            <button
                className={`absolute top-2 right-2 rounded-full p-2 ${
                    isFavorite ? "bg-red-500" : "bg-gray-300 dark:bg-gray-600"
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

            <p className="m-2 text-center text-black dark:text-gray-100 font-medium">
                {cloth.description}
            </p>

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