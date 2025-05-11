"use client";

import React from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
    const { t } = useTranslation("common");
    const router = useRouter();

    return (
        <>
            <Head>
                {/* Metadades SEO dinàmiques amb i18n */}
                <title>{t("seo.aboutus.title")}</title>
                <meta
                    name="description"
                    content={t("seo.aboutus.description")}
                />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:title" content={t("seo.aboutus.title")} />
                <meta
                    property="og:description"
                    content={t("seo.aboutus.description")}
                />
                <meta property="og:image" content="/images/og-image-aboutus.jpg" />
                <meta property="og:url" content="https://www.clothy.es/about-us" />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={t("seo.aboutus.title")} />
                <meta
                    name="twitter:description"
                    content={t("seo.aboutus.description")}
                />
                <meta name="twitter:image" content="/images/og-image-aboutus.jpg" />

                {/* Enllaços alternatius per als idiomes (URL invariant) */}
                <link
                    rel="alternate"
                    href="https://www.clothy.es/about-us"
                    hrefLang="ca"
                />
                <link
                    rel="alternate"
                    href="https://www.clothy.es/about-us"
                    hrefLang="es"
                />
                <link
                    rel="alternate"
                    href="https://www.clothy.es/about-us"
                    hrefLang="en"
                />
                <link
                    rel="alternate"
                    href="https://www.clothy.es/about-us"
                    hrefLang="fr"
                />
                <link
                    rel="alternate"
                    href="https://www.clothy.es/about-us"
                    hrefLang="de"
                />
                <link
                    rel="alternate"
                    href="https://www.clothy.es/about-us"
                    hrefLang="it"
                />
                <link
                    rel="alternate"
                    href="https://www.clothy.es/about-us"
                    hrefLang="pt"
                />
                <link
                    rel="alternate"
                    href="https://www.clothy.es/about-us"
                    hrefLang="ar"
                />
                <link
                    rel="alternate"
                    href="https://www.clothy.es/about-us"
                    hrefLang="hi"
                />
                <link
                    rel="alternate"
                    href="https://www.clothy.es/about-us"
                    hrefLang="ja"
                />
                <link
                    rel="alternate"
                    href="https://www.clothy.es/about-us"
                    hrefLang="ko"
                />
                <link
                    rel="alternate"
                    href="https://www.clothy.es/about-us"
                    hrefLang="bn"
                />
                <link
                    rel="alternate"
                    href="https://www.clothy.es/about-us"
                    hrefLang="ru"
                />
                <link
                    rel="alternate"
                    href="https://www.clothy.es/about-us"
                    hrefLang="tr"
                />
                <link
                    rel="alternate"
                    href="https://www.clothy.es/about-us"
                    hrefLang="x-default"
                />
            </Head>

            {/* Contingut de la pàgina About Us */}
            <div className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 min-h-screen flex flex-col">
                {/* Encapçalament */}
                <header className="bg-blue-600 dark:bg-blue-800 py-6">
                    <div className="max-w-7xl mx-auto text-center text-black dark:text-white">
                        <h1 className="text-4xl font-extrabold">
                            {t("aboutusModal.header.title")}
                        </h1>
                        <p className="mt-2 text-lg">
                            {t("aboutusModal.header.effectiveDate")}
                        </p>
                    </div>
                </header>

                {/* Contingut Principal */}
                <main className="py-16 bg-gray-50 dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="rounded-lg p-8 bg-gray-100 dark:bg-gray-700">
                            <p className="text-lg mb-6 text-gray-900 dark:text-gray-100">
                                {t("aboutusModal.content.intro")}
                            </p>

                            <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                                {t("aboutusModal.content.history.title")}
                            </h2>
                            <p className="text-lg mb-6 text-gray-900 dark:text-gray-100">
                                {t("aboutusModal.content.history.description")}
                            </p>

                            <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                                {t("aboutusModal.content.vision.title")}
                            </h2>
                            <p className="text-lg mb-6 text-gray-900 dark:text-gray-100">
                                {t("aboutusModal.content.vision.description")}
                            </p>

                            <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                                {t("aboutusModal.content.commitment.title")}
                            </h2>
                            <p className="text-lg mb-6 text-gray-900 dark:text-gray-100">
                                {t("aboutusModal.content.commitment.description")}
                            </p>

                            <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                                {t("aboutusModal.content.future.title")}
                            </h2>
                            <p className="text-lg mb-6 text-gray-900 dark:text-gray-100">
                                {t("aboutusModal.content.future.description")}
                            </p>

                            <p className="text-lg mb-6 text-gray-900 dark:text-gray-100">
                                {t("aboutusModal.content.thanks")}
                            </p>

                            {/* Botó per tornar */}
                            <div className="mt-12">
                                <button
                                    className="text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 font-semibold py-2 px-4 rounded"
                                    onClick={() => router.push("/")}
                                >
                                    {t("aboutusModal.button.back")}
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default AboutUs;
