"use client";

import Head from "next/head";
import { useTranslation } from "react-i18next";
import SignUp from "@/app/components/SignUp";

const SignUpPage = () => {
    const { t } = useTranslation("common");

    return (
        <>
            {/* Metadades SEO amb traduccions */}
            <Head>
                {/* Títol i meta-descripció dinàmiques */}
                <title>{t("seo.signup.title")}</title>
                <meta name="description" content={t("seo.signup.description")} />
                <meta name="robots" content="index, follow" />

                {/* Open Graph meta tags */}
                <meta property="og:title" content={t("seo.signup.title")} />
                <meta property="og:description" content={t("seo.signup.description")} />
                <meta property="og:image" content="/images/og-image-signup.jpg" />
                <meta property="og:url" content="https://www.clothy.es/signup" />

                {/* Twitter Card meta tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={t("seo.signup.title")} />
                <meta name="twitter:description" content={t("seo.signup.description")} />
                <meta name="twitter:image" content="/images/og-image-signup.jpg" />

                {/* Enllaços alternatius multilingües (la URL és la mateixa perquè el contingut és dinàmic segons l'idioma) */}
                <link rel="alternate" href="https://www.clothy.es/signup" hrefLang="es" />
                <link rel="alternate" href="https://www.clothy.es/signup" hrefLang="en" />
                <link rel="alternate" href="https://www.clothy.es/signup" hrefLang="ca" />
                <link rel="alternate" href="https://www.clothy.es/signup" hrefLang="ch" />
                <link rel="alternate" href="https://www.clothy.es/signup" hrefLang="ar" />
                <link rel="alternate" href="https://www.clothy.es/signup" hrefLang="bn" />
                <link rel="alternate" href="https://www.clothy.es/signup" hrefLang="de" />
                <link rel="alternate" href="https://www.clothy.es/signup" hrefLang="fr" />
                <link rel="alternate" href="https://www.clothy.es/signup" hrefLang="hi" />
                <link rel="alternate" href="https://www.clothy.es/signup" hrefLang="ja" />
                <link rel="alternate" href="https://www.clothy.es/signup" hrefLang="ko" />
                <link rel="alternate" href="https://www.clothy.es/signup" hrefLang="pt" />
                <link rel="alternate" href="https://www.clothy.es/signup" hrefLang="ru" />
                <link rel="alternate" href="https://www.clothy.es/signup" hrefLang="tr" />
                <link rel="alternate" href="https://www.clothy.es/signup" hrefLang="x-default" />
            </Head>

            {/* Contingut de la pàgina de registre */}
            <SignUp />
        </>
    );
};

export default SignUpPage;
