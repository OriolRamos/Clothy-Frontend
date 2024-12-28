import Head from "next/head";
import SignUp from "@/app/components/SignUp";

const SignUpPage = () => {
    return (
        <div>
            {/* Metadades per millorar el SEO */}
            <Head>
                <title>Registra't a Clothy - Crea el teu compte</title>
                <meta name="description" content="Crea el teu compte a Clothy, la botiga de moda en línia. Registra't ara i gaudeix de descomptes exclusius, novetats i ofertes especials." />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Registra't a Clothy - Crea el teu compte" />
                <meta property="og:description" content="Crea el teu compte a Clothy, la botiga de moda en línia. Registra't ara i gaudeix de descomptes exclusius, novetats i ofertes especials." />
                <meta property="og:image" content="/images/og-image-signup.jpg" />
                <meta property="og:url" content="https://www.clothy.com/signup" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Registra't a Clothy - Crea el teu compte" />
                <meta name="twitter:description" content="Crea el teu compte a Clothy, la botiga de moda en línia. Registra't ara i gaudeix de descomptes exclusius, novetats i ofertes especials." />
                <meta name="twitter:image" content="/images/og-image-signup.jpg" />
            </Head>

            <SignUp />
        </div>
    );
};

export default SignUpPage;
