import Head from "next/head";
import Login from "@/app/components/Login";

const LoginPage = () => {
    return (
        <div>
            {/* Metadades per millorar el SEO */}
            <Head>
                <title>Inicia Sessió o Registra't - Clothy</title>
                <meta name="description" content="Inicia sessió o crea un compte a Clothy, la teva botiga de moda en línia. Registra't i gaudeix de descomptes i promocions exclusives." />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Inicia Sessió o Registra't - Clothy" />
                <meta property="og:description" content="Inicia sessió o crea un compte a Clothy, la teva botiga de moda en línia. Registra't i gaudeix de descomptes i promocions exclusives." />
                <meta property="og:image" content="/images/og-image.jpg" />
                <meta property="og:url" content="https://www.clothy.com/login" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Inicia Sessió o Registra't - Clothy" />
                <meta name="twitter:description" content="Inicia sessió o crea un compte a Clothy, la teva botiga de moda en línia. Registra't i gaudeix de descomptes i promocions exclusives." />
                <meta name="twitter:image" content="/images/og-image.jpg" />
            </Head>

            <Login />
        </div>
    );
};

export default LoginPage;
