"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Linkify from "react-linkify";

const TermsAndConditions = () => {
    const { t } = useTranslation("common");

    return (
        <div className="text-gray-900 min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 py-6">
                <div className="max-w-7xl mx-auto text-center text-black">
                    <h1 className="text-4xl font-extrabold">
                        {t("termsandconditions.title")}
                    </h1>
                    <p className="mt-2 text-lg">
                        {t("termsandconditions.lastUpdated")}
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg p-8" style={{ whiteSpace: 'pre-line' }}>
                        <p className="text-lg mb-8">
                            {t("termsandconditions.welcome")}
                        </p>

                        {/* Secció 1 */}
                        <section className="mb-8">
                            <h2 className="text-3xl font-semibold text-blue-600 mb-4">
                                {t("termsandconditions.section1.title")}
                            </h2>
                            <p className="text-lg">
                                {t("termsandconditions.section1.content")}
                            </p>
                        </section>

                        {/* Secció 2 */}
                        <section className="mb-8">
                            <h2 className="text-3xl font-semibold text-blue-600 mb-4">
                                {t("termsandconditions.section2.title")}
                            </h2>
                            <p className="text-lg">
                                {t("termsandconditions.section2.content")}
                            </p>
                        </section>

                        {/* Secció 3 */}
                        <section className="mb-8">
                            <h2 className="text-3xl font-semibold text-blue-600 mb-4">
                                {t("termsandconditions.section3.title")}
                            </h2>
                            <p className="text-lg" style={{ whiteSpace: 'pre-line' }}>
                                <Linkify>{t("termsandconditions.section3.content")}</Linkify>
                            </p>
                        </section>

                        {/* Secció 4 */}
                        <section className="mb-8">
                            <h2 className="text-3xl font-semibold text-blue-600 mb-4">
                                {t("termsandconditions.section4.title")}
                            </h2>
                            <p className="text-lg">
                                {t("termsandconditions.section4.content")}
                            </p>
                        </section>

                        {/* Secció 5 */}
                        <section className="mb-8">
                            <h2 className="text-3xl font-semibold text-blue-600 mb-4">
                                {t("termsandconditions.section5.title")}
                            </h2>
                            <p className="text-lg">
                                {t("termsandconditions.section5.content")}
                            </p>
                        </section>

                        {/* Secció 6 */}
                        <section className="mb-8">
                            <h2 className="text-3xl font-semibold text-blue-600 mb-4">
                                {t("termsandconditions.section6.title")}
                            </h2>
                            <p className="text-lg">
                                {t("termsandconditions.section6.content")}
                            </p>
                        </section>

                        {/* Secció 7 */}
                        <section className="mb-8">
                            <h2 className="text-3xl font-semibold text-blue-600 mb-4">
                                {t("termsandconditions.section7.title")}
                            </h2>
                            <p className="text-lg">
                                {t("termsandconditions.section7.content")}
                            </p>
                        </section>

                        {/* Secció 8 */}
                        <section className="mb-8">
                            <h2 className="text-3xl font-semibold text-blue-600 mb-4">
                                {t("termsandconditions.section8.title")}
                            </h2>
                            <p className="text-lg">
                                {t("termsandconditions.section8.content")}
                            </p>
                        </section>

                        {/* Secció 9 */}
                        <section className="mb-8">
                            <h2 className="text-3xl font-semibold text-blue-600 mb-4">
                                {t("termsandconditions.section9.title")}
                            </h2>
                            <p className="text-lg">
                                {t("termsandconditions.section9.content")}
                            </p>
                        </section>

                        {/* Secció 10 */}
                        <section className="mb-8">
                            <h2 className="text-3xl font-semibold text-blue-600 mb-4">
                                {t("termsandconditions.section10.title")}
                            </h2>
                            <p className="text-lg">
                                {t("termsandconditions.section10.content")}
                            </p>
                        </section>

                        {/* Secció 11 */}
                        <section className="mb-8">
                            <h2 className="text-3xl font-semibold text-blue-600 mb-4">
                                {t("termsandconditions.section11.title")}
                            </h2>
                            <p className="text-lg">
                                {t("termsandconditions.section11.content")}
                            </p>
                        </section>

                        {/* Secció 12 */}
                        <section className="mb-8">
                            <h2 className="text-3xl font-semibold text-blue-600 mb-4">
                                {t("termsandconditions.section12.title")}
                            </h2>
                            <p className="text-lg">
                                {t("termsandconditions.section12.content")}
                            </p>
                        </section>

                        {/* Secció 13 */}
                        <section>
                            <h2 className="text-3xl font-semibold text-blue-600 mb-4">
                                {t("termsandconditions.section13.title")}
                            </h2>
                            <p className="text-lg">
                                <Linkify>{t("termsandconditions.section13.content")}</Linkify>
                            </p>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TermsAndConditions;
