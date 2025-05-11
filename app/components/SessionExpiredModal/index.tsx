"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface SessionExpiredModalProps {
    show: boolean;
    onClose: () => void;
}

const SessionExpiredModal: React.FC<SessionExpiredModalProps> = ({ show, onClose }) => {
    const { t } = useTranslation('common');

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    {t("sessionExpired.title")}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    {t("sessionExpired.message")}
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/login">
                        <button
                            onClick={onClose}
                            className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-300"
                        >
                            {t("sessionExpired.loginButton")}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SessionExpiredModal;