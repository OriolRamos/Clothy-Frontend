import React from "react";
import { useTranslation } from "react-i18next";

export interface FilterItem {
    type: string;
    color: string[] | null;
    section: string;
    brand: string[] | null;
    [key: string]: any;
}


interface MultipleSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    items: FilterItem[];
    onSelect: (item: FilterItem) => void;
}

const MultipleSearchModal: React.FC<MultipleSearchModalProps> = ({ isOpen, onClose, items, onSelect }) => {
    const { t } = useTranslation("common");

    if (!isOpen) return null;

    const translateType = (type: string) => t(`filters.type.${type}`, type);
    const translateColor = (color: string) => t(`filters.color.${color}`, color);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl shadow-2xl p-8">
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                    <h2 className="text-3xl font-semibold text-black dark:text-white">
                        {t("multipleSearch.title", "Cerca Múltiple")}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-600 dark:text-gray-300 hover:text-red-500"
                        aria-label="Tancar"
                    >
                        ×
                    </button>
                </div>

                <p className="mb-6 text-lg text-gray-800 dark:text-gray-200">
                    {t("multipleSearch.subtitle", "S'han detectat més d'una peça de roba, selecciona quina vols processar:")}
                </p>

                <ul className="space-y-4 mb-8">
                    {items.map((item, idx) => {
                        const typeLabel = translateType(item.type);
                        const colorArray = Array.isArray(item.color)
                            ? item.color
                            : item.color
                                ? [item.color]
                                : [];
                        const colorLabel = colorArray.map(c => translateColor(c)).join(", ");

                        return (
                            <li key={idx}>
                                <button
                                    onClick={() => onSelect(item)}
                                    className="w-full text-left px-6 py-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition font-medium text-lg text-gray-900 dark:text-gray-100"
                                >
                                    {`${typeLabel}${colorLabel ? `, ${colorLabel}` : ""}`}
                                </button>
                            </li>
                        );
                    })}
                </ul>

                <div className="text-right">
                    <button
                        onClick={onClose}
                        className="inline-block py-2 px-6 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                    >
                        {t("multipleSearch.close", "Tancar")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MultipleSearchModal;
