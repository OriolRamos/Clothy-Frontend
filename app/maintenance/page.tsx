"use client";

import Head from "next/head";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Footer from "@/app/components/Footer";


const MaintenancePage = () => {
    const { t } = useTranslation("common"); // Si fas servir i18n

    return (
        <>
            <Head>
                {/* SEO bàsic */}
                <title>{t("seo.maintenance.title")}</title>
                <meta name="description" content={t("seo.maintenance.description")} />
                <meta name="robots" content="noindex, nofollow" />

                {/* Open Graph */}
                <meta property="og:title" content={t("seo.maintenance.title")} />
                <meta property="og:description" content={t("seo.maintenance.description")} />
                <meta property="og:image" content="/images/maintenance.png" />
                <meta property="og:url" content="https://www.clothy.es/maintenance" />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={t("seo.maintenance.title")} />
                <meta name="twitter:description" content={t("seo.maintenance.description")} />
                <meta name="twitter:image" content="/images/maintenance.png" />

                {/* Hreflang multilingüe */}
                <link rel="alternate" href="https://www.clothy.es/maintenance" hrefLang="es" />
                <link rel="alternate" href="https://www.clothy.es/maintenance" hrefLang="en" />
                <link rel="alternate" href="https://www.clothy.es/maintenance" hrefLang="ca" />
                <link rel="alternate" href="https://www.clothy.es/maintenance" hrefLang="ch" />
                <link rel="alternate" href="https://www.clothy.es/maintenance" hrefLang="ar" />
                <link rel="alternate" href="https://www.clothy.es/maintenance" hrefLang="bn" />
                <link rel="alternate" href="https://www.clothy.es/maintenance" hrefLang="de" />
                <link rel="alternate" href="https://www.clothy.es/maintenance" hrefLang="fr" />
                <link rel="alternate" href="https://www.clothy.es/maintenance" hrefLang="hi" />
                <link rel="alternate" href="https://www.clothy.es/maintenance" hrefLang="ja" />
                <link rel="alternate" href="https://www.clothy.es/maintenance" hrefLang="ko" />
                <link rel="alternate" href="https://www.clothy.es/maintenance" hrefLang="pt" />
                <link rel="alternate" href="https://www.clothy.es/maintenance" hrefLang="ru" />
                <link rel="alternate" href="https://www.clothy.es/maintenance" hrefLang="tr" />
                <link rel="alternate" href="https://www.clothy.es/maintenance" hrefLang="x-default" />
            </Head>

            {/* Contingut principal */}
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 text-center">
                <h1 className="text-5xl font-bold text-gray-900 mb-8">
                    {t("maintenance.title")}
                </h1>

                <p className="text-lg text-gray-700 mb-6 max-w-xl">
                    {t("maintenance.message")}
                </p>

                <Image
                    src="/images/maintenance.png"
                    alt={t("maintenance.imageAlt")}
                    width={500}
                    height={500}
                    priority
                />

            </div>
            <Footer/>
        </>
    );
};

export default MaintenancePage;
