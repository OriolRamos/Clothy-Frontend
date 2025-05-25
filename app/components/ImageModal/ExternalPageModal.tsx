import React, { useEffect } from "react";
import { Cloth } from "../Modals/Cloth";
import { filters, getTranslation } from "../Filters/cloth_filters";
import { useAuth } from "@/app/components/AuthContext";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import HistoryPriceModal from "./../HistoryPriceModal/index";
interface ExternalPageModalProps {
    cloth: Cloth;
    country: string | null;
    isOpen: boolean;
    onClose: () => void;
}

const ExternalPageModal: React.FC<ExternalPageModalProps> = ({ cloth, country, isOpen, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const { t } = useTranslation("common");
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [imgLoading, setImgLoading] = useState(true);

    useEffect(() => {
        const logView = async () => {
            if (isOpen && cloth?.id) {
                try {
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                    const response = await fetchWithAuth(`${apiUrl}/search/cloth/popularity`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ cloth_id: cloth.id, score: 3 }),
                    });
                    if (response.ok) {
                        console.log("👀 Popularitat de vista registrada (score 3)");
                    } else {
                        console.error("❌ Error registrant la vista de la peça");
                    }
                } catch (err) {
                    console.error("❌ Error al registrar vista:", err);
                }
            }
        };

        logView();
    }, [isOpen, cloth, fetchWithAuth]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const currencyList = filters.currency ?? [];
    const currencySymbol =
        (country
                ? currencyList.find(c => c.value === country)?.translation
                : undefined
        ) || "€";

    if (!isOpen || !cloth) return null;

    const setRedirectingLog = async (cloth: Cloth) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetchWithAuth(`${apiUrl}/search/cloth/popularity`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cloth_id: cloth.id, score: 7 }),
            });
            if (response.ok) console.log("✅ Popularitat de compra registrada (score 7)");
            else console.error("❌ Error registrant la popularitat de compra");
        } catch (error) {
            console.error("❌ Error a la crida de popularitat:", error);
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative bg-white dark:bg-gray-800 w-full h-full flex flex-col">
                {/* Capçalera del modal */}
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gray-900 dark:bg-gray-700 text-white">
                    <h2 className="font-semibold text-lg">{t("externalPage.clothySearch", "Clothy Search")}</h2>
                    <button onClick={onClose} className="text-2xl font-bold">
                        &times;
                    </button>
                </div>

                {/* Contingut principal */}
                <div className="mt-16 flex flex-col lg:flex-row flex-grow overflow-auto">
                    {/* Imatge del producte */}
                    {imgLoading && (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="w-16 h-16 border-4 border-black dark:border-white border-t-blue-500 rounded-full animate-spin"></div>
                        </div>
                    )}
                    <div className="relative w-full lg:w-1/2 aspect-[3/4] min-h-[400px]">
                        <Image
                            src={cloth.image_url || "/images/image-not-found.png"}
                            alt={cloth.title || "No Image"}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                            className="object-contain object-top rounded-lg"
                            loading="lazy"
                            onLoad={() => setImgLoading(false)}
                            onError={({ currentTarget }) => {
                                setImgLoading(false);
                                currentTarget.src = "/images/image-not-found.png";
                            }}
                        />
                    </div>



                    {/* Informació del producte */}
                    <div className="w-full lg:w-1/2 flex flex-col p-6 bg-white dark:bg-gray-800 text-black dark:text-gray-100">
                        {/* Brand i secció */}
                        <div className="text-center border-b border-gray-300 dark:border-gray-600 pb-4">
                            <h2 className="text-3xl font-bold uppercase">
                                {getTranslation("brand", cloth.brand)}
                                <span className="text-lg text-gray-600 dark:text-gray-400">
                                    {getTranslation("section", cloth.section)}
                                </span>
                            </h2>
                        </div>

                        {/* Informació detallada */}
                        <div className="text-right mt-4 space-y-2">
                            <p className="text-lg">
                                <span className="font-semibold">{t("externalPage.type", "Tipus:")}</span> {getTranslation("type", cloth.type)}
                            </p>
                            <p className="text-lg">
                                <span className="font-semibold">{t("externalPage.title", "Titulo:")}</span> {cloth.title}
                            </p>
                            {cloth.color && (
                                <p className="text-lg">
                                    <span className="font-semibold">
                                      {t("externalPage.colorLabel", "Color:")}
                                    </span>{" "}
                                    {/*
                                      fem el lookup a externalPage.color.<valor>,
                                      i caiguem al fallback (el mateix valor) si no existeix.
                                    */}
                                    {t(
                                        `filters.color.${cloth.color.toLowerCase()}`,
                                        cloth.color
                                    )}
                                </p>
                            )}

                            {cloth.print && (
                                <p className="text-lg">
                                    <span className="font-semibold">{t("externalPage.print", "Print:")}</span> {cloth.print}
                                </p>
                            )}
                            {cloth.material && (
                                <p className="text-lg">
                                    <span className="font-semibold">{t("externalPage.material", "Material:")}</span> {cloth.material}
                                </p>
                            )}
                            {cloth.description && (
                                <p className="text-lg">
                                    <span className="font-semibold">{t("externalPage.description", "Description:")}</span> {cloth.description}
                                </p>
                            )}
                        </div>

                        {/* Preu i descompte */}
                        <div className="mt-4 text-right">
                            {cloth.in_discount ? (
                                <p className="text-2xl font-bold">
                                    <span className="line-through text-gray-500 dark:text-gray-300 mr-2">
                                        {cloth.price}{currencySymbol}
                                    </span>
                                    <span className="text-red-500">
                                        {cloth.discount_price}{currencySymbol}
                                    </span>
                                    <span className="text-sm text-red-600 ml-2">-{cloth.discount}%</span>
                                </p>
                            ) : (
                                <p className="text-2xl font-bold">
                                    {cloth.price}{currencySymbol}
                                </p>
                            )}
                        </div>

                        {/* Botons */}
                        <div className="mt-auto flex flex-wrap justify-end gap-2">
                            <button
                                onClick={() => setIsHistoryOpen(true)}
                                className="px-4 py-2 text-sm sm:text-base bg-gray-700 dark:bg-gray-300 text-white dark:text-black rounded-lg shadow-md font-semibold hover:scale-105 transition-transform duration-200"
                            >
                                {t("externalPage.history", "Historial Preus")}
                            </button>
                            <a
                                onClick={() => setRedirectingLog(cloth)}
                                href={cloth.purchase_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 text-sm sm:text-base bg-black dark:bg-gray-900 text-white rounded-lg shadow-md font-semibold hover:scale-105 transition-transform duration-200"
                            >
                                {t("externalPage.buy", "Comprar")}
                            </a>
                        </div>

                    </div>
                </div>
                {/* Historial de preus */}
                {isHistoryOpen && (
                    <HistoryPriceModal
                        clothId={cloth.id}
                        onClose={() => setIsHistoryOpen(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default ExternalPageModal;
