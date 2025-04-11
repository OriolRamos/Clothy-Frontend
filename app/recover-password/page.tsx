"use client";

import Head from "next/head";
import RecoverPassword from "@/app/components/Recover-Password/index"; // Assegura't que el path és correcte
import Link from "next/link";
import { useTranslation } from "react-i18next";

const RecoverPage = () => {
    const { t } = useTranslation("common");

    return (
        <>
            <Head>
                {/* Títol i meta-descripció traduïts amb i18n */}
                <title>{t("seo.recover.title")}</title>
                <meta name="description" content={t("seo.recover.description")} />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:title" content={t("seo.recover.title")} />
                <meta property="og:description" content={t("seo.recover.description")} />
                <meta property="og:image" content="/images/og-image-recover.jpg" />
                <meta property="og:url" content="https://www.clothy.es/recover-password" />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={t("seo.recover.title")} />
                <meta name="twitter:description" content={t("seo.recover.description")} />
                <meta name="twitter:image" content="/images/og-image-recover.jpg" />

                {/* Enllaços alternatius per als diferents idiomes */}
                <link rel="alternate" href="https://www.clothy.es/recover-password" hrefLang="es" />
                <link rel="alternate" href="https://www.clothy.es/recover-password" hrefLang="en" />
                <link rel="alternate" href="https://www.clothy.es/recover-password" hrefLang="ca" />
                <link rel="alternate" href="https://www.clothy.es/recover-password" hrefLang="ch" />
                <link rel="alternate" href="https://www.clothy.es/recover-password" hrefLang="ar" />
                <link rel="alternate" href="https://www.clothy.es/recover-password" hrefLang="bn" />
                <link rel="alternate" href="https://www.clothy.es/recover-password" hrefLang="de" />
                <link rel="alternate" href="https://www.clothy.es/recover-password" hrefLang="fr" />
                <link rel="alternate" href="https://www.clothy.es/recover-password" hrefLang="hi" />
                <link rel="alternate" href="https://www.clothy.es/recover-password" hrefLang="ja" />
                <link rel="alternate" href="https://www.clothy.es/recover-password" hrefLang="ko" />
                <link rel="alternate" href="https://www.clothy.es/recover-password" hrefLang="pt" />
                <link rel="alternate" href="https://www.clothy.es/recover-password" hrefLang="ru" />
                <link rel="alternate" href="https://www.clothy.es/recover-password" hrefLang="tr" />
                <link rel="alternate" href="https://www.clothy.es/recover-password" hrefLang="x-default" />
            </Head>

            {/* Component de recuperació de contrasenya */}
            <RecoverPassword />
        </>
    );
};

export default RecoverPage;
