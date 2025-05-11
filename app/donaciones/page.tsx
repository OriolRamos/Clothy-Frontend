"use client";

import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const DonationPage = () => {
    const { t } = useTranslation("common");

    return (
        <>
            <Head>
                {/* SEO dinàmic amb i18n */}
                <title>{t("seo.donations.title")}</title>
                <meta name="description" content={t("seo.donations.description")} />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:title" content={t("seo.donations.title")} />
                <meta property="og:description" content={t("seo.donations.description")} />
                <meta property="og:image" content="/images/og-image-donations.jpg" />
                <meta property="og:url" content="https://www.clothy.es/donaciones" />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={t("seo.donations.title")} />
                <meta name="twitter:description" content={t("seo.donations.description")} />
                <meta name="twitter:image" content="/images/og-image-donations.jpg" />

                {/* Enllaços alternatius per als idiomes */}
                <link rel="alternate" href="https://www.clothy.es/donaciones" hrefLang="ca" />
                <link rel="alternate" href="https://www.clothy.es/donaciones" hrefLang="es" />
                <link rel="alternate" href="https://www.clothy.es/donaciones" hrefLang="en" />
                <link rel="alternate" href="https://www.clothy.es/donaciones" hrefLang="fr" />
                <link rel="alternate" href="https://www.clothy.es/donaciones" hrefLang="de" />
                <link rel="alternate" href="https://www.clothy.es/donaciones" hrefLang="it" />
                <link rel="alternate" href="https://www.clothy.es/donaciones" hrefLang="pt" />
                <link rel="alternate" href="https://www.clothy.es/donaciones" hrefLang="ar" />
                <link rel="alternate" href="https://www.clothy.es/donaciones" hrefLang="hi" />
                <link rel="alternate" href="https://www.clothy.es/donaciones" hrefLang="zh" />
                <link rel="alternate" href="https://www.clothy.es/donaciones" hrefLang="x-default" />
            </Head>

            <div className="text-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
                {/* Encapçalament */}
                <header className="bg-blue-600 dark:bg-blue-800 py-6">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl font-extrabold dark:text-white">{t("donations.header.title")}</h1>
                        <p className="mt-2 text-lg text-black dark:text-gray-200">{t("donations.header.subtitle")}</p>
                    </div>
                </header>

                {/* Contingut principal */}
                <main className="flex-1 bg-white dark:bg-gray-900 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="rounded-lg p-8 bg-white dark:bg-gray-800">
                            <p className="text-lg mb-6 text-gray-900 dark:text-gray-100">{t("donations.content.intro")}</p>

                            <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                                {t("donations.content.howToDonate.title")}
                            </h2>
                            <p className="text-lg mb-4 text-gray-900 dark:text-gray-100">
                                {t("donations.content.howToDonate.description")}
                            </p>
                            <ul className="list-disc pl-6 text-lg mb-6 text-gray-900 dark:text-gray-100">
                                <li>{t("donations.content.howToDonate.paypal")}</li>
                            </ul>

                            <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                                {t("donations.content.whyDonate.title")}
                            </h2>
                            <p className="text-lg mb-4 text-gray-900 dark:text-gray-100">
                                {t("donations.content.whyDonate.description")}
                            </p>
                            <p className="text-lg mb-6 text-gray-900 dark:text-gray-100">
                                {t("donations.content.whyDonate.thanks")}
                            </p>

                            <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                                {t("donations.content.paymentMethods.title")}
                            </h2>
                            <p className="text-lg mb-4 text-gray-900 dark:text-gray-100">
                                {t("donations.content.paymentMethods.description")}
                            </p>
                            <ul className="list-disc pl-6 text-lg text-gray-900 dark:text-gray-100">
                                <li>
                                    <Link
                                        href="https://www.paypal.com/donate/?hosted_button_id=BJHKPD5W6R9Z2"
                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        {t("donations.content.paymentMethods.paypalLink")}
                                    </Link>
                                </li>
                            </ul>

                            <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mt-12 mb-4">
                                {t("donations.content.questions.title")}
                            </h2>
                            <p className="text-lg mb-4 text-gray-900 dark:text-gray-100">
                                {t("donations.content.questions.description")}
                            </p>
                            <p className="text-lg text-gray-900 dark:text-gray-100">
                                {t("donations.content.questions.contact")} <span className="text-blue-600 dark:text-blue-400">support@clothy.es</span>.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default DonationPage;
