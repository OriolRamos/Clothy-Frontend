import Head from "next/head";
import ResetPassword from "@/app/components/Recover-Password/reset"; // Assegura't que el path sigui correcte
import Link from "next/link";

const ResetPage = () => {
    return (
        <div>
            {/* Metadatos per millorar el SEO */}
            <Head>
                <title>Recupera la teva contrasenya - Clothy</title>
                <meta
                    name="description"
                    content="Has oblidat la teva contrasenya? Recupera l'accés al teu compte de Clothy de manera ràpida i segura."
                />
                <meta name="robots" content="index, follow" />
                <meta
                    property="og:title"
                    content="Recupera la teva contrasenya - Clothy"
                />
                <meta
                    property="og:description"
                    content="Has oblidat la teva contrasenya? Recupera l'accés al teu compte de Clothy de manera ràpida i segura."
                />
                <meta
                    property="og:image"
                    content="/images/og-image.jpg"
                />
                <meta
                    property="og:url"
                    content="https://www.clothy.com/recover-password"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="Recupera la teva contrasenya - Clothy"
                />
                <meta
                    name="twitter:description"
                    content="Has oblidat la teva contrasenya? Recupera l'accés al teu compte de Clothy de manera ràpida i segura."
                />
                <meta
                    name="twitter:image"
                    content="/images/og-image.jpg"
                />
            </Head>

            {/* Component de Recuperació de Contrasenya */}
            <ResetPassword />
        </div>
    );
};

export default ResetPage;
