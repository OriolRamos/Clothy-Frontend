"use client";

import Head from "next/head";
import { useTranslation } from "react-i18next";
import Banner from "./components/Banner/index";
import Aboutus from "./components/Aboutus/index";
import Dedicated from "./components/Dedicated/index";
import Digital from "./components/Digital/index";
import Beliefs from "./components/Beliefs/index";
import ScrapedBrands from "./components/ScrapedBrands/index";
import Ourteam from "./components/Ourteam/index";
import Featured from "./components/Featured/index";
import FAQ from "./components/FAQ/index";
import Joinus from "./components/Joinus/index";
import Footer from "@/app/components/Footer";
import React from "react";

export default function Home() {
    const { t } = useTranslation("common");

    return (
        <>
            <Head>
                {/* Títol i Meta Descripció dinàmiques */}
                <title>{t("seo.home.title")}</title>
                <meta name="description" content={t("seo.home.description")} />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:title" content={t("seo.home.title")} />
                <meta
                    property="og:description"
                    content={t("seo.home.description")}
                />
                <meta property="og:image" content="/images/og-image-home.jpg" />
                <meta property="og:url" content="https://www.clothy.es/" />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={t("seo.home.title")} />
                <meta
                    name="twitter:description"
                    content={t("seo.home.description")}
                />
                <meta name="twitter:image" content="/images/og-image-home.jpg" />

                {/* Enllaços alternatius (hreflang) per als diferents idiomes */}
                <link rel="alternate" href="https://www.clothy.es/" hrefLang="ca" />
                <link rel="alternate" href="https://www.clothy.es/" hrefLang="es" />
                <link rel="alternate" href="https://www.clothy.es/" hrefLang="en" />
                <link rel="alternate" href="https://www.clothy.es/" hrefLang="fr" />
                <link rel="alternate" href="https://www.clothy.es/" hrefLang="de" />
                <link rel="alternate" href="https://www.clothy.es/" hrefLang="it" />
                <link rel="alternate" href="https://www.clothy.es/" hrefLang="pt" />
                <link rel="alternate" href="https://www.clothy.es/" hrefLang="ar" />
                <link rel="alternate" href="https://www.clothy.es/" hrefLang="hi" />
                <link rel="alternate" href="https://www.clothy.es/" hrefLang="ja" />
                <link rel="alternate" href="https://www.clothy.es/" hrefLang="ko" />
                <link rel="alternate" href="https://www.clothy.es/" hrefLang="ru" />
                <link rel="alternate" href="https://www.clothy.es/" hrefLang="tr" />
                <link rel="alternate" href="https://www.clothy.es/" hrefLang="x-default" />
            </Head>

            <main>
                <Banner />
                <Aboutus />
                <Dedicated />
                <Digital />
                <ScrapedBrands />
                <Beliefs />
                <Ourteam />
                <Featured />
                <FAQ />
                <Joinus />
                <Footer />
            </main>
        </>
    );
}
