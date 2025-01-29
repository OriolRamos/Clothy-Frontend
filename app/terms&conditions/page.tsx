"use client"
import Link from "next/link";
import { useTranslation } from "react-i18next";

const TermsAndConditions = () => {
    const { t } = useTranslation('common');

    return (
        <div className="text-gray-900 min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 py-6">
                <div className="max-w-7xl mx-auto text-center text-black">
                    <h1 className="text-4xl font-extrabold">{t("termsandconditions.title")}</h1>
                    <p className="mt-2 text-lg">{t("termsandconditions.welcome")}</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg p-8">
                        {/* Uso Aceptable */}
                        <h2 className="text-3xl font-semibold text-blue-600 mb-6">{t("termsandconditions.acceptableUse.title")}</h2>
                        <p className="text-lg mb-4">{t("termsandconditions.acceptableUse.content")}</p>

                        {/* Privacidad y Protección de Datos */}
                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-6">{t("termsandconditions.privacy.title")}</h2>
                        <p className="text-lg mb-4">{t("termsandconditions.privacy.content")}</p>
                        <p className="mt-4 text-lg">
                            {t("termsandconditions.privacy.details")}{" "}
                            <Link href="/privacy-policy" className="text-blue-600">
                                {t("termsandconditions.privacy.link")}
                            </Link>
                        </p>

                        {/* Uso de Imágenes */}
                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-6">{t("termsandconditions.imagesUse.title")}</h2>
                        <p className="text-lg mb-4">{t("termsandconditions.imagesUse.content")}</p>

                        {/* Limitación de Responsabilidad */}
                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-6">{t("termsandconditions.liability.title")}</h2>
                        <p className="text-lg mb-4">{t("termsandconditions.liability.content")}</p>

                        {/* Modificación de los Términos */}
                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-6">{t("termsandconditions.modifications.title")}</h2>
                        <p className="text-lg mb-4">{t("termsandconditions.modifications.content")}</p>

                        {/* Contacto y Soporte */}
                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-6">{t("termsandconditions.contact.title")}</h2>
                        <p className="text-lg mb-4">
                            {t("termsandconditions.contact.content")}{" "}
                            <Link href="/contact" className="text-blue-600">
                                {t("termsandconditions.contact.link")}
                            </Link>{" "}
                            {t("termsandconditions.contact.or")} <span className="text-blue-600">support@clothy.com</span>.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TermsAndConditions;
