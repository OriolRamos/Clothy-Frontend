"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
    const { t } = useTranslation('common');
    const router = useRouter();

    return (
        <div className="text-gray-900">
            {/* Encapçalament */}
            <header className="bg-blue-600 py-6">
                <div className="max-w-7xl mx-auto text-center text-black">
                    <h1 className="text-4xl font-extrabold">{t("aboutusModal.header.title")}</h1>
                    <p className="mt-2 text-lg">{t("aboutusModal.header.effectiveDate")}</p>
                </div>
            </header>

            {/* Contingut principal */}
            <main className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg p-8">
                        <p className="text-lg mb-6">{t("aboutusModal.content.intro")}</p>

                        <h2 className="text-3xl font-semibold text-blue-600 mb-4">{t("aboutusModal.content.history.title")}</h2>
                        <p className="text-lg mb-6">{t("aboutusModal.content.history.description")}</p>

                        <h2 className="text-3xl font-semibold text-blue-600 mb-4">{t("aboutusModal.content.vision.title")}</h2>
                        <p className="text-lg mb-6">{t("aboutusModal.content.vision.description")}</p>

                        <h2 className="text-3xl font-semibold text-blue-600 mb-4">{t("aboutusModal.content.commitment.title")}</h2>
                        <p className="text-lg mb-6">{t("aboutusModal.content.commitment.description")}</p>

                        <h2 className="text-3xl font-semibold text-blue-600 mb-4">{t("aboutusModal.content.future.title")}</h2>
                        <p className="text-lg mb-6">{t("aboutusModal.content.future.description")}</p>

                        <p className="text-lg mb-6">{t("aboutusModal.content.thanks")}</p>

                        {/* Botó per tornar */}
                        <div className="mt-12">
                            <button
                                className="text-white bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded"
                                onClick={() => router.push('/')}
                            >
                                {t("aboutusModal.button.back")}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AboutUs;
