"use client";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
    const { t } = useTranslation("common");

    return (
        <div className="text-gray-900 min-h-screen flex flex-col">
            {/* Encapçalament */}
            <header className="bg-blue-600 py-6">
                <div className="max-w-7xl mx-auto text-center text-black">
                    <h1 className="text-4xl font-extrabold">{t("privacypolicy.header.title")}</h1>
                    <p className="mt-2 text-lg">{t("privacypolicy.header.date")}</p>
                </div>
            </header>

            {/* Contingut principal */}
            <main className="flex-1 bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg p-8">
                        <p className="text-lg mb-6">{t("privacypolicy.intro")}</p>

                        <h2 className="text-3xl font-semibold text-blue-600 mb-4">{t("privacypolicy.section1.title")}</h2>
                        <p className="text-lg mb-4">{t("privacypolicy.section1.description")}</p>
                        <ul className="list-disc pl-6 text-lg">
                            <li>{t("privacypolicy.section1.bullet1")}</li>
                            <li>{t("privacypolicy.section1.bullet2")}</li>
                        </ul>

                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-4">{t("privacypolicy.section2.title")}</h2>
                        <p className="text-lg mb-4">{t("privacypolicy.section2.description")}</p>
                        <ul className="list-disc pl-6 text-lg">
                            <li>{t("privacypolicy.section2.bullet1")}</li>
                            <li>{t("privacypolicy.section2.bullet2")}</li>
                            <li>{t("privacypolicy.section2.bullet3")}</li>
                        </ul>
                        <p className="text-lg mt-4">{t("privacypolicy.section2.note")}</p>

                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-4">{t("privacypolicy.section3.title")}</h2>
                        <p className="text-lg mb-4">{t("privacypolicy.section3.description")}</p>
                        <ul className="list-disc pl-6 text-lg">
                            <li>{t("privacypolicy.section3.bullet1")}</li>
                            <li>{t("privacypolicy.section3.bullet2")}</li>
                            <li>{t("privacypolicy.section3.bullet3")}</li>
                            <li>{t("privacypolicy.section3.bullet4")}</li>
                            <li>{t("privacypolicy.section3.bullet5")}</li>
                        </ul>
                        <p className="text-lg mt-4">{t("privacypolicy.section3.note")}</p>

                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-4">{t("privacypolicy.section4.title")}</h2>
                        <p className="text-lg mb-4">{t("privacypolicy.section4.description")}</p>

                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-4">{t("privacypolicy.section5.title")}</h2>
                        <p className="text-lg mb-4">{t("privacypolicy.section5.description")}</p>
                        <ul className="list-disc pl-6 text-lg">
                            <li>{t("privacypolicy.section5.bullet1")}</li>
                            <li>{t("privacypolicy.section5.bullet2")}</li>
                        </ul>
                        <p className="text-lg mt-4">{t("privacypolicy.section5.note")}</p>

                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-4">{t("privacypolicy.section6.title")}</h2>
                        <p className="text-lg mb-4">{t("privacypolicy.section6.description")}</p>

                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-4">{t("privacypolicy.section7.title")}</h2>
                        <p className="text-lg mb-4">{t("privacypolicy.section7.description")}</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPolicy;
