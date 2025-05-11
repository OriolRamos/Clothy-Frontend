"use client";
import Image from "next/image";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const ScrapedBrands = () => {
    const { t } = useTranslation("common");

    const logos = useMemo(() => [
        "/images/brands/bershka.png",
        "/images/brands/oysho.png",
        "/images/brands/zara.png",
        "/images/brands/hm.png",
        "/images/brands/uniqlo.png",
        "/images/brands/mango.png",
        "/images/brands/pullandbear.png",
        "/images/brands/stradivarius.png",
    ], []);

    return (
        <div className="relative w-full h-[300px] overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md">
            <h2 className="text-4xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-2">
                {t("disponibleBrans")}
            </h2>
            <div className="relative w-full h-[250px] overflow-hidden">
                <div className="flex space-x-8 animate-marquee">
                    {logos.concat(logos).map((logo, index) => (
                        <div key={index} className="flex-shrink-0 w-[250px] h-[250px] mx-4">
                            <Image
                                src={logo}
                                alt={`Logo ${index}`}
                                width={250}
                                height={150}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
@keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}
.animate-marquee {
    width: calc(200% + 16px);
    animation: marquee 20s linear infinite;
}
`}</style>
        </div>
    );
};

export default ScrapedBrands;