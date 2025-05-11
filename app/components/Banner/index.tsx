"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const Banner = () => {
    const router = useRouter();
    const { t, i18n } = useTranslation('common');
    const { resolvedTheme } = useTheme();

    // Espera a que i18n y theme estén listos
    if (!i18n.isInitialized || !resolvedTheme) {
        return <div>Loading...</div>;
    }

    console.log('Idioma actual:', i18n.language);
    console.log('Tema actual:', resolvedTheme);

    const handleSignUp = () => {
        router.push('/signup');
    };

    // Selecciona la imagen según el tema
    const bannerSrc =
        resolvedTheme === 'dark'
            ? '/images/logos/LogoRealistaMetalicBlancTransparent.png'
            : '/images/logos/LogoNegreMetallic_Transparent.png';

    return (
        <div id="baner-section" className='mx-auto max-w-7xl my-10 sm:py-10 px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 my-16'>

                {/* COLUMN-1 */}
                <div className="mx-auto sm:mx-0">
                    <div className='py-3 text-center lg:text-start'>
                        <button className='text-blue dark:text-blue-300 bg-lightblue dark:bg-gray-700 hover:shadow-xl text-sm md:text-lg font-bold px-6 py-1 rounded-3xl tracking-wider hover:text-white hover:bg-black dark:hover:bg-gray-900'>
                            {t('banner.clothDesigns')}
                        </button>
                    </div>
                    <div className="py-3 text-center lg:text-start">
                        <h1 className="text-4xl lg:text-5xl font-bold text-darkpurple dark:text-gray-100">
                            {t('banner.redesigningFashion')} <br /> {t('banner.experienceFashion')}
                        </h1>
                        <h2 className="text-2xl lg:text-3xl font-bold text-darkpurple dark:text-gray-300 mt-4">
                            {t('banner.simpleSustainablePersonalized')}
                        </h2>
                    </div>
                    <div className="my-7 text-center lg:text-start">
                        <a
                            href="/signup"
                            className="text-xs md:text-sm font-semibold hover:shadow-xl bg-blue dark:bg-blue-800 text-white dark:text-gray-100 py-2 px-4 md:py-3 md:px-10 rounded-full hover:bg-hoblue dark:hover:bg-blue-700"
                            onClick={handleSignUp}
                        >
                            {t('signUp.registerButton')}
                        </a>
                    </div>
                </div>

                {/* COLUMN-2 */}
                <div className='hidden lg:flex lg:justify-center lg:items-center'>
                    <Image
                        src={bannerSrc}
                        alt={t('banner.imageAlt')}
                        width={500}
                        height={500}
                        className="transition-opacity duration-500"
                    />
                </div>

            </div>
        </div>
    );
};

export default Banner;
