import Head from "next/head";
import ResetPassword from "@/app/components/Recover-Password/reset"; // Assegura't que el path sigui correcte

const ResetPage = () => {
    return (
        <div>
            <Head>
                <title>Restableix la teva contrasenya - Clothy</title>
                <meta
                    name="description"
                    content="Has rebut un enllaç per restablir la teva contrasenya? Introdueix la nova contrasenya per recuperar l'accés al teu compte Clothy."
                />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:title" content="Restableix la teva contrasenya - Clothy" />
                <meta
                    property="og:description"
                    content="Has rebut un enllaç per restablir la teva contrasenya? Introdueix la nova contrasenya per recuperar l'accés al teu compte Clothy."
                />
                <meta property="og:image" content="/images/og-image.jpg" />
                <meta property="og:url" content="https://www.clothy.com/reset-password" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Restableix la teva contrasenya - Clothy" />
                <meta
                    name="twitter:description"
                    content="Has rebut un enllaç per restablir la teva contrasenya? Introdueix la nova contrasenya per recuperar l'accés al teu compte Clothy."
                />
                <meta name="twitter:image" content="/images/og-image.jpg" />

                {/* Idiomes alternatius - hreflang */}
                <link rel="alternate" href="https://www.clothy.es/reset-password" hrefLang="ca" />
                <link rel="alternate" href="https://www.clothy.es/reset-password" hrefLang="es" />
                <link rel="alternate" href="https://www.clothy.es/reset-password" hrefLang="en" />
                <link rel="alternate" href="https://www.clothy.es/reset-password" hrefLang="fr" />
                <link rel="alternate" href="https://www.clothy.es/reset-password" hrefLang="de" />
                <link rel="alternate" href="https://www.clothy.es/reset-password" hrefLang="it" />
                <link rel="alternate" href="https://www.clothy.es/reset-password" hrefLang="pt" />
                <link rel="alternate" href="https://www.clothy.es/reset-password" hrefLang="ar" />
                <link rel="alternate" href="https://www.clothy.es/reset-password" hrefLang="hi" />
                <link rel="alternate" href="https://www.clothy.es/reset-password" hrefLang="zh" />
                <link rel="alternate" href="https://www.clothy.es/reset-password" hrefLang="x-default" />
            </Head>

            {/* Component de Reset de contrasenya */}
            <ResetPassword />
        </div>
    );
};

export default ResetPage;
