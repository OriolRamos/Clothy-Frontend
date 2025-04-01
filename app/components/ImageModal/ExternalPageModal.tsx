import React, { useEffect } from "react";
import { Cloth } from "../Modals/Cloth.ts"; // Assegura't que la interfície Cloth està en un fitxer centralitzat
import {filters, getTranslation} from "../Filters/cloth_filters";
import {useAuth} from "@/app/components/AuthContext";

interface ExternalPageModalProps {
    cloth: Cloth;
    counrty: string | null;
    isOpen: boolean;
    onClose: () => void;
}

const ExternalPageModal: React.FC<ExternalPageModalProps> = ({ cloth, country, isOpen, onClose }) => {
    const { fetchWithAuth } = useAuth();
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);
    const currencySymbol = filters.currency.find(c => c.value === country)?.translation || "€";

    if (!isOpen || !cloth) return null;

    const setRedirectingLog = async (cloth: Cloth) => {
        // Mètode per afegir o eliminar de favorits (sense canvis en aquesta part)
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetchWithAuth(`${apiUrl}/search/redirecting/log`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cloth }),
            });
            if (response.ok) {
                console.log("Log de reenviament correcte!");
            } else {
                console.error("Error eliminant dels favorits.");
            }

        } catch (error) {
            console.error("Error gestionant els favorits:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative bg-white w-full h-full flex flex-col">
                {/* Capçalera del modal */}
                <div
                    className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gray-900 text-white">
                    <h2 className="font-semibold text-lg">Clothy Search</h2>
                    <button onClick={onClose} className="text-2xl font-bold">&times;</button>
                </div>

                {/* Contingut principal */}
                <div className="mt-16 flex flex-col lg:flex-row flex-grow overflow-auto">

                    {/* Imatge del producte */}
                    <div className="w-full lg:w-1/2 flex justify-end items-start">
                        <img
                            src={cloth.image_url}
                            alt={cloth.brand}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Informació del producte */}
                    <div className="w-full lg:w-1/2 flex flex-col p-6">
                        {/* Brand i Section */}
                        <div className="text-center border-b pb-4">
                            <h2 className="text-3xl font-bold uppercase">{getTranslation("brand",cloth.brand)}<span
                                className="text-lg text-gray-600">{getTranslation("section",cloth.section)}</span></h2>
                        </div>

                        {/* Informació detallada */}
                        <div className="text-right mt-4 space-y-2">
                            <p className="text-lg"><span className="font-semibold">Tipus:</span> {getTranslation("type",cloth.type)}</p>
                            <p className="text-lg"><span
                                className="font-semibold">Descripció:</span> {cloth.description}</p>
                            {cloth.color &&
                                <p className="text-lg"><span className="font-semibold">Color:</span> {cloth.color}</p>}
                            {cloth.print &&
                                <p className="text-lg"><span className="font-semibold">Print:</span> {cloth.print}</p>}
                            {cloth.material &&
                                <p className="text-lg"><span className="font-semibold">Material:</span> {cloth.material}
                                </p>}
                        </div>

                        {/* Preu i descompte */}
                        <div className="mt-4 text-right">
                            {cloth.in_discount ? (
                                <p className="text-2xl font-bold">
                                    <span className="line-through text-gray-500 mr-2">{cloth.price}{currencySymbol}</span>
                                    <span className="text-red-500">{cloth.discount_price}{currencySymbol}</span>
                                    <span className="text-sm text-red-600 ml-2">-{cloth.discount}%</span>
                                </p>
                            ) : (
                                <p className="text-2xl font-bold">{cloth.price}{currencySymbol}</p>
                            )}
                        </div>

                        {/* Botó comprar */}
                        <div className="mt-auto text-right">
                            <a
                                onClick={() => setRedirectingLog(cloth)}
                                href={cloth.purchase_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-6 py-3 bg-black text-white rounded-lg shadow-md font-semibold hover:scale-105 transition-transform duration-200"
                            >
                                Comprar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExternalPageModal;
