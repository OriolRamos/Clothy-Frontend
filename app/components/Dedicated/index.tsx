"use client"
import Image from "next/image";
import { useTranslation } from "react-i18next";

const Dedicated = () => {
    const { t } = useTranslation('common');

    return (
        <div id="dedicated-section" className="relative bg-lightgray dark:bg-gray-900 py-20">
            {/* Fondo decorativo */}
            <Image
                src="/images/dedicated/spiral.svg"
                height={272}
                width={686}
                alt={t("dedicated.spiralAlt")}
                className="absolute left-0 hidden lg:block -z-10"
            />

            <div className="mx-auto max-w-7xl px-4 sm:py-20 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">
                    {/* COLUMN-1 */}
                    <div>
                        <Image
                            src="/images/dedicated/personal_image.jpg"
                            alt={t("dedicated.imageAlt")}
                            width={416}
                            height={530}
                            className="mx-auto md:mx-0 rounded-lg filter saturate-90 brightness-105"
                        />
                    </div>

                    {/* COLUMN-2 */}
                    <div className="relative">
                        {/* Imagen decorativa */}
                        <Image
                            src="/images/dedicated/comma.svg"
                            alt={t("dedicated.commaAlt")}
                            width={200}
                            height={106}
                            className="absolute -top-10 -left-10 hidden lg:block"
                        />

                        {/* Contenido principal */}
                        <h2 className="text-4xl lg:text-6xl font-bold text-darkpurple dark:text-gray-100 leading-snug text-center lg:text-start">
                            {t("dedicated.title")}
                        </h2>
                        <p className="text-2xl font-medium text-gray-700 dark:text-gray-400 mt-5 text-center lg:text-start">
                            {t("dedicated.description")}
                        </p>
                        <p className="text-2xl font-semibold mt-12 text-darkpurple dark:text-gray-200 text-center lg:text-start">
                            {t("dedicated.ceoName")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dedicated;