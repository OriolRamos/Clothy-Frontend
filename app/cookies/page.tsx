"use client";
import { useTranslation } from "react-i18next";
import Head from "next/head";

const CookiesPolicy = () => {
    const { t } = useTranslation("common");

    return (
        <>
            {/* SEO complet */}
            <Head>
                <title>{t("seo.cookiespolicy.title")}</title>
                <meta name="description" content={t("seo.cookiespolicy.description")} />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:title" content={t("seo.cookiespolicy.title")} />
                <meta property="og:description" content={t("seo.cookiespolicy.description")} />
                <meta property="og:url" content="https://www.clothy.com/cookies-policy" />
                <meta property="og:image" content="/images/og-image-cookies.jpg" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={t("seo.cookiespolicy.title")} />
                <meta name="twitter:description" content={t("seo.cookiespolicy.description")} />
                <meta name="twitter:image" content="/images/og-image-cookies.jpg" />

                {/* Hreflang per idiomes */}
                <link rel="alternate" href="https://www.clothy.es/cookies-policy" hrefLang="ca" />
                <link rel="alternate" href="https://www.clothy.es/cookies-policy" hrefLang="es" />
                <link rel="alternate" href="https://www.clothy.es/cookies-policy" hrefLang="en" />
                <link rel="alternate" href="https://www.clothy.es/cookies-policy" hrefLang="fr" />
                <link rel="alternate" href="https://www.clothy.es/cookies-policy" hrefLang="de" />
                <link rel="alternate" href="https://www.clothy.es/cookies-policy" hrefLang="it" />
                <link rel="alternate" href="https://www.clothy.es/cookies-policy" hrefLang="pt" />
                <link rel="alternate" href="https://www.clothy.es/cookies-policy" hrefLang="ar" />
                <link rel="alternate" href="https://www.clothy.es/cookies-policy" hrefLang="x-default" />
            </Head>

            <div className="text-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
                {/* Encapçalament */}
                <header className="bg-white dark:bg-gray-800 py-6">
                    <div className="max-w-7xl mx-auto text-center text-black dark:text-white">
                        <h1 className="text-4xl font-extrabold">{t("cookiespolicy.header.title")}</h1>
                        <p className="mt-2 text-lg">{t("cookiespolicy.header.date")}</p>
                    </div>
                </header>

                {/* Contingut principal */}
                <main className="flex-1 bg-white dark:bg-gray-900 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="rounded-lg p-8 space-y-6 bg-white dark:bg-gray-800">
                            <p className="text-lg text-gray-900 dark:text-gray-100">{t("cookiespolicy.intro")}</p>

                            <h2 className="text-3xl font-semibold text-black dark:text-gray-100">{t("cookiespolicy.section1.title")}</h2>
                            <p className="text-lg text-gray-900 dark:text-gray-100">{t("cookiespolicy.section1.text")}</p>

                            <h2 className="text-3xl font-semibold text-black dark:text-gray-100">{t("cookiespolicy.section2.title")}</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-200 dark:border-gray-700">
                                    <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-700">
                                        <th className="p-3 text-left text-gray-900 dark:text-gray-100">{t("cookiespolicy.section2.table.header.type")}</th>
                                        <th className="p-3 text-left text-gray-900 dark:text-gray-100">{t("cookiespolicy.section2.table.header.description")}</th>
                                        <th className="p-3 text-left text-gray-900 dark:text-gray-100">{t("cookiespolicy.section2.table.header.consent")}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="p-3 text-gray-900 dark:text-gray-100">{t("cookiespolicy.section2.table.row1.type")}</td>
                                        <td className="p-3 text-gray-900 dark:text-gray-100">{t("cookiespolicy.section2.table.row1.description")}</td>
                                        <td className="p-3 text-gray-900 dark:text-gray-100">{t("cookiespolicy.section2.table.row1.consent")}</td>
                                    </tr>
                                    <tr className="bg-gray-50 dark:bg-gray-800">
                                        <td className="p-3 text-gray-900 dark:text-gray-100">{t("cookiespolicy.section2.table.row2.type")}</td>
                                        <td className="p-3 text-gray-900 dark:text-gray-100">{t("cookiespolicy.section2.table.row2.description")}</td>
                                        <td className="p-3 text-gray-900 dark:text-gray-100">{t("cookiespolicy.section2.table.row2.consent")}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 text-gray-900 dark:text-gray-100">{t("cookiespolicy.section2.table.row3.type")}</td>
                                        <td className="p-3 text-gray-900 dark:text-gray-100">{t("cookiespolicy.section2.table.row3.description")}</td>
                                        <td className="p-3 text-gray-900 dark:text-gray-100">{t("cookiespolicy.section2.table.row3.consent")}</td>
                                    </tr>
                                    <tr className="bg-gray-50 dark:bg-gray-800">
                                        <td className="p-3 text-gray-900 dark:text-gray-100">{t("cookiespolicy.section2.table.row4.type")}</td>
                                        <td className="p-3 text-gray-900 dark:text-gray-100">{t("cookiespolicy.section2.table.row4.description")}</td>
                                        <td className="p-3 text-gray-900 dark:text-gray-100">{t("cookiespolicy.section2.table.row4.consent")}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h2 className="text-3xl font-semibold text-black dark:text-gray-100">{t("cookiespolicy.section3.title")}</h2>
                            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-900 dark:text-gray-100">
                                <li>{t("cookiespolicy.section3.item1")}</li>
                                <li>{t("cookiespolicy.section3.item2")}</li>
                            </ul>
                            <p className="text-lg text-gray-900 dark:text-gray-100">{t("cookiespolicy.section3.note")}</p>

                            <h2 className="text-3xl font-semibold text-black dark:text-gray-100">{t("cookiespolicy.section4.title")}</h2>
                            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-900 dark:text-gray-100">
                                <li>{t("cookiespolicy.section4.item1")}</li>
                                <li>{t("cookiespolicy.section4.item2")}</li>
                            </ul>

                            <h2 className="text-3xl font-semibold text-black dark:text-gray-100">{t("cookiespolicy.section5.title")}</h2>
                            <p className="text-lg text-gray-900 dark:text-gray-100">{t("cookiespolicy.section5.intro")}</p>
                            <div className="space-y-4 text-lg text-gray-900 dark:text-gray-100">
                                <div>
                                    <strong>{t("cookiespolicy.section5.chrome.title")}:</strong>
                                    <ol className="list-decimal pl-6">
                                        <li>{t("cookiespolicy.section5.chrome.step1")}</li>
                                        <li>{t("cookiespolicy.section5.chrome.step2")}</li>
                                    </ol>
                                </div>
                                <div>
                                    <strong>{t("cookiespolicy.section5.firefox.title")}:</strong>
                                    <ol className="list-decimal pl-6">
                                        <li>{t("cookiespolicy.section5.firefox.step1")}</li>
                                        <li>{t("cookiespolicy.section5.firefox.step2")}</li>
                                    </ol>
                                </div>
                                <div>
                                    <strong>{t("cookiespolicy.section5.safari.title")}:</strong>
                                    <ol className="list-decimal pl-6">
                                        <li>{t("cookiespolicy.section5.safari.step1")}</li>
                                        <li>{t("cookiespolicy.section5.safari.step2")}</li>
                                    </ol>
                                </div>
                                <div>
                                    <strong>{t("cookiespolicy.section5.edge.title")}:</strong>
                                    <ol className="list-decimal pl-6">
                                        <li>{t("cookiespolicy.section5.edge.step1")}</li>
                                    </ol>
                                </div>
                            </div>
                            <p className="text-lg text-gray-900 dark:text-gray-100">{t("cookiespolicy.section5.note")}</p>

                            <h2 className="text-3xl font-semibold text-black dark:text-gray-100">{t("cookiespolicy.section6.title")}</h2>
                            <p className="text-lg text-gray-900 dark:text-gray-100">{t("cookiespolicy.section6.text")}</p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default CookiesPolicy;