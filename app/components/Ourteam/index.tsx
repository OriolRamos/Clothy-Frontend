"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const Index = () => {
    const { t } = useTranslation('common');

    return (
        <div className="mx-auto max-w-7xl sm:py-4 lg:px-8 m-32 bg-white dark:bg-gray-900">
            <h2 className="text-4xl sm:text-6xl font-bold text-center text-black dark:text-gray-100">
                {t("ourteam.title")}
            </h2>
            <h3 className="text-2xl font-medium text-center pt-10 opacity-75 text-gray-700 dark:text-gray-400">
                {t("ourteam.subtitle")}
            </h3>
            <div className="flex items-center justify-center h-screen">
                <Image
                    src="/images/team/teaming2.jpg"
                    alt={t("ourteam.image_alt")}
                    height={342}
                    width={648}
                    quality={100}
                    className="rounded-lg"
                />
            </div>
            <p className="text-lg text-center opacity-75 leading-8 text-gray-800 dark:text-gray-300">
                {t("ourteam.description")}
            </p>
        </div>
    );
};

export default Index;