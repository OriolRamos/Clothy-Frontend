"use client";
import { useTranslation } from "react-i18next";
import Head from "next/head";

const PrivacyPolicy = () => {
    const { t } = useTranslation("common");

    return (
        <>
            {/* SEO complet */}
            <Head>
                <title>{t("seo.privacypolicy.title")}</title>
                <meta name="description" content={t("seo.privacypolicy.description")} />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:title" content={t("seo.privacypolicy.title")} />
                <meta property="og:description" content={t("seo.privacypolicy.description")} />
                <meta property="og:url" content="https://www.clothy.com/privacy-policy" />
                <meta property="og:image" content="/images/og-image.jpg" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={t("seo.privacypolicy.title")} />
                <meta name="twitter:description" content={t("seo.privacypolicy.description")} />
                <meta name="twitter:image" content="/images/og-image.jpg" />

                {/* Hreflang per idiomes */}
                <link rel="alternate" href="https://www.clothy.es/privacy-policy" hrefLang="ca" />
                <link rel="alternate" href="https://www.clothy.es/privacy-policy" hrefLang="es" />
                <link rel="alternate" href="https://www.clothy.es/privacy-policy" hrefLang="en" />
                <link rel="alternate" href="https://www.clothy.es/privacy-policy" hrefLang="fr" />
                <link rel="alternate" href="https://www.clothy.es/privacy-policy" hrefLang="de" />
                <link rel="alternate" href="https://www.clothy.es/privacy-policy" hrefLang="it" />
                <link rel="alternate" href="https://www.clothy.es/privacy-policy" hrefLang="pt" />
                <link rel="alternate" href="https://www.clothy.es/privacy-policy" hrefLang="ar" />
                <link rel="alternate" href="https://www.clothy.es/privacy-policy" hrefLang="hi" />
                <link rel="alternate" href="https://www.clothy.es/privacy-policy" hrefLang="zh" />
                <link rel="alternate" href="https://www.clothy.es/privacy-policy" hrefLang="x-default" />
            </Head>
            <div className="text-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
                {/* Encapçalament */}
                <header className="bg-blue-600 dark:bg-blue-800 py-6">
                    <div className="max-w-7xl mx-auto text-center text-black dark:text-white">
                        <h1 className="text-4xl font-extrabold">{t("privacypolicy.header.title")}</h1>
                        <p className="mt-2 text-lg">{t("privacypolicy.header.date")}</p>
                    </div>
                </header>

                {/* Contingut principal */}
                <main className="flex-1 bg-white dark:bg-gray-900 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="rounded-lg p-8 bg-white dark:bg-gray-800">
                            <p className="text-lg mb-6 text-gray-900 dark:text-gray-100">{t("privacypolicy.intro")}</p>

                            <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4">{t("privacypolicy.section1.title")}</h2>
                            <p className="text-lg mb-4 text-gray-900 dark:text-gray-100">{t("privacypolicy.section1.description")}</p>
                            <ul className="list-disc pl-6 text-lg text-gray-900 dark:text-gray-100">
                                <li>{t("privacypolicy.section1.bullet1")}</li>
                                <li>{t("privacypolicy.section1.bullet2")}</li>
                            </ul>

                            <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mt-12 mb-4">{t("privacypolicy.section2.title")}</h2>
                            <p className="text-lg mb-4 text-gray-900 dark:text-gray-100">{t("privacypolicy.section2.description")}</p>
                            <ul className="list-disc pl-6 text-lg text-gray-900 dark:text-gray-100">
                                <li>{t("privacypolicy.section2.bullet1")}</li>
                                <li>{t("privacypolicy.section2.bullet2")}</li>
                                <li>{t("privacypolicy.section2.bullet3")}</li>
                            </ul>
                            <p className="text-lg mt-4 text-gray-900 dark:text-gray-100">{t("privacypolicy.section2.note")}</p>

                            <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mt-12 mb-4">{t("privacypolicy.section3.title")}</h2>
                            <p className="text-lg mb-4 text-gray-900 dark:text-gray-100">{t("privacypolicy.section3.description")}</p>
                            <ul className="list-disc pl-6 text-lg text-gray-900 dark:text-gray-100">
                                <li>{t("privacypolicy.section3.bullet1")}</li>
                                <li>{t("privacypolicy.section3.bullet2")}</li>
                                <li>{t("privacypolicy.section3.bullet3")}</li>
                                <li>{t("privacypolicy.section3.bullet4")}</li>
                                <li>{t("privacypolicy.section3.bullet5")}</li>
                            </ul>
                            <p className="text-lg mt-4 text-gray-900 dark:text-gray-100">{t("privacypolicy.section3.note")}</p>

                            <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mt-12 mb-4">{t("privacypolicy.section4.title")}</h2>
                            <p className="text-lg mb-4 text-gray-900 dark:text-gray-100">{t("privacypolicy.section4.description")}</p>

                            <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mt-12 mb-4">{t("privacypolicy.section5.title")}</h2>
                            <p className="text-lg mb-4 text-gray-900 dark:text-gray-100">{t("privacypolicy.section5.description")}</p>
                            <ul className="list-disc pl-6 text-lg text-gray-900 dark:text-gray-100">
                                <li>{t("privacypolicy.section5.bullet1")}</li>
                                <li>{t("privacypolicy.section5.bullet2")}</li>
                            </ul>
                            <p className="text-lg mt-4 text-gray-900 dark:text-gray-100">{t("privacypolicy.section5.note")}</p>

                            <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mt-12 mb-4">{t("privacypolicy.section6.title")}</h2>
                            <p className="text-lg mb-4 text-gray-900 dark:text-gray-100">{t("privacypolicy.section6.description")}</p>

                            <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mt-12 mb-4">{t("privacypolicy.section7.title")}</h2>
                            <p className="text-lg mb-4 text-gray-900 dark:text-gray-100">{t("privacypolicy.section7.description")}</p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default PrivacyPolicy;
