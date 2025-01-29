"use client"
import Image from "next/image";
import { useTranslation } from "react-i18next";

const Index = () => {
    const { t } = useTranslation('common');

    return (
        <div className="mx-auto max-w-7xl sm:py-4 lg:px-8 m-32">
            <h2 className="text-4xl sm:text-6xl font-bold text-center">
                {t("ourteam.title")}
            </h2>
            <h3 className="text-2xl font-medium text-center pt-10 opacity-75">
                {t("ourteam.subtitle")}
            </h3>
            <div className="flex items-center justify-center h-screen">
                <Image
                    src="/images/team/teaming2.jpg"
                    alt={t("ourteam.image_alt")}
                    height={342} // La mitad de 684
                    width={648} // La mitad de 1296
                    quality={100} // Mejora la calidad al máximo permitido
                    className="rounded-lg" // Añade un efecto más profesional
                />
            </div>
            <p className="text-lg text-center opacity-75 leading-8 text-white">
                {t("ourteam.description")}
            </p>
        </div>
    );
};

export default Index;
