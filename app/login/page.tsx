"use client";

import Head from "next/head";
import { useTranslation } from "react-i18next";
import Login from "@/app/components/Login";

const LoginPage = () => {
    const { t } = useTranslation("common");

    return (
        <>
            <Head>
                {/* Títol i Meta Descripció traduïts */}
                <title>{t("seo.login.title")}</title>
                <meta name="description" content={t("seo.login.description")} />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:title" content={t("seo.login.title")} />
                <meta property="og:description" content={t("seo.login.description")} />
                <meta property="og:image" content="/images/og-image-login.jpg" />
                <meta property="og:url" content="https://www.clothy.es/login" />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={t("seo.login.title")} />
                <meta name="twitter:description" content={t("seo.login.description")} />
                <meta name="twitter:image" content="/images/og-image-login.jpg" />

                {/* Enllaços alternatius per als idiomes */}
                <link rel="alternate" href="https://www.clothy.es/login" hrefLang="es" />
                <link rel="alternate" href="https://www.clothy.es/login" hrefLang="en" />
                <link rel="alternate" href="https://www.clothy.es/login" hrefLang="ca" />
                <link rel="alternate" href="https://www.clothy.es/login" hrefLang="ch" />
                <link rel="alternate" href="https://www.clothy.es/login" hrefLang="ar" />
                <link rel="alternate" href="https://www.clothy.es/login" hrefLang="bn" />
                <link rel="alternate" href="https://www.clothy.es/login" hrefLang="de" />
                <link rel="alternate" href="https://www.clothy.es/login" hrefLang="fr" />
                <link rel="alternate" href="https://www.clothy.es/login" hrefLang="hi" />
                <link rel="alternate" href="https://www.clothy.es/login" hrefLang="ja" />
                <link rel="alternate" href="https://www.clothy.es/login" hrefLang="ko" />
                <link rel="alternate" href="https://www.clothy.es/login" hrefLang="pt" />
                <link rel="alternate" href="https://www.clothy.es/login" hrefLang="ru" />
                <link rel="alternate" href="https://www.clothy.es/login" hrefLang="tr" />
                <link rel="alternate" href="https://www.clothy.es/login" hrefLang="x-default" />
            </Head>

            {/* Component Login */}
            <Login />
        </>
    );
};

export default LoginPage;
