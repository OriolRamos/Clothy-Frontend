"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import { useTranslation } from "react-i18next";

// MIDDLE LINKS DATA
interface ProductType {
    id: number;
    section: string;
    name: string[];
    link: string[];
}



const Footer = () => {
    const { t } = useTranslation('common');
    const products: ProductType[] = [
        {
            id: 1,
            section: t("footer.menu"),
            name: [t("footer.home"), t("footer.aboutus"), t("footer.FAQ"), t("footer.joinus")],
            link: ['/#baner-section', '/#section2', '/#faq-section', '/#joinus-section',]
        },
        {
            id: 4,
            section: t("footer.others"),
            name: [t("footer.aboutus")],
            link: ['/about-us']
        }
    ]
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        // Estableix l'any actual quan el component es carrega
        setCurrentYear(new Date().getFullYear());
    }, []);

    const router = useRouter();

    const handleTermsConditions = () => {
        // Redirigeix a la pàgina de login
        router.push('/terms&conditions');
    };
    const handlePrivacyPolicy = () => {
        // Redirigeix a la pàgina de login
        router.push('/privacy-policy');
    };
    const handleCookiesPolicy = () => {
        // Redirigeix a la pàgina de login
        router.push('/cookies');
    };

    return (
        <div className="bg-black" id="first-section">
            <div className="mx-auto max-w-2xl pt-16 pb-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-24 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">
                    {/* COLUMN-1 */}
                    <div className="col-span-4">
                        <h3 className="text-white text-4xl font-semibold leading-9 mb-4 lg:mb-20 flex items-center justify-start">
                            <div className="relative h-12 w-12 mr-3">

                                <Image
                                    src="/images/clothy_white.png"
                                    alt="Clothy Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                                Clothy Labs
                        </h3>
                        <div className="flex gap-4">
                            {/* X (ex-Twitter) */}
                            <div className="footer-icons">
                                <Link
                                    href="https://x.com/clothylabs?s=21"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image
                                        src="/images/footer/logo_X.png"
                                        alt="X"
                                        width={20}
                                        height={20}
                                    />
                                </Link>
                            </div>

                            {/* YouTube */}
                            <div className="footer-icons">
                                <Link
                                    href="https://www.youtube.com/@Clothy-Labs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image
                                        src="/images/footer/logo_youtube.png"
                                        alt="YouTube"
                                        width={20}
                                        height={20}
                                    />
                                </Link>
                            </div>

                            {/* Instagram */}
                            <div className="footer-icons">
                                <Link
                                    href="https://www.instagram.com/clothy.labs?igsh=MWVnd3gya3MwcRjdQ%3D%3D&utm_source=qr"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image
                                        src="/images/footer/instagram.svg"
                                        alt="Instagram"
                                        width={20}
                                        height={20}
                                    />
                                </Link>
                            </div>

                            {/* TikTok */}
                            <div className="footer-icons">
                                <Link
                                    href="https://www.tiktok.com/@clothylabs?_t=ZN-8wSA80jvCBq&_r=1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image
                                        src="/images/footer/logo_tiktok.png"
                                        alt="TikTok"
                                        width={20}
                                        height={20}
                                    />
                                </Link>
                            </div>
                        </div>


                    </div>

                    {/* CLOUMN-2/3 */}
                    {products.map((product) => (
                        <div key={product.id} className="group relative col-span-2">
                            <p className="text-white text-xl font-extrabold mb-9">{product.section}</p>
                            <ul>
                                {product.name.map((name, index) => (
                                    <li key={index} className="mb-5">
                                        <Link href={product.link[index]}
                                              className="text-white text-lg font-normal mb-6 space-links">{name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* All Rights Reserved */}
            <div className="mx-auto max-w-2xl lg:max-w-7xl">
                <div className="pt-5 pb-5 px-4 sm:px-6 lg:px-4 border-solid border-t border-footer">
                    <div className="mt-4 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 xl:gap-x-8">
                        <div>
                            <h3 className="text-center md:text-start text-offwhite text-lg">
                                @{currentYear} - {t("footer.allRights", "All Rights Reserved by")} {' '}
                                <Link href="https://clothy.es" target="_blank">Clothy.es</Link>
                            </h3>
                        </div>
                        <div className="flex justify-center md:justify-end">
                            <Link href="/privacy-policy">
                                <h3 className="text-offwhite pr-6" onClick={handlePrivacyPolicy}>{t("footer.pricavyPolicy", "Privacy policy")}</h3>
                            </Link>
                            <Link href="/terms&conditions">
                                <h3 className="text-offwhite pl-6 pr-6 border-solid border-l border-footer" onClick={handleTermsConditions}>{t("footer.termsConditions", "Terms & conditions")}</h3>
                            </Link>
                            <Link href="/cookies">
                                <h3 className="text-offwhite pl-6 border-solid border-l border-footer" onClick={handleCookiesPolicy}>{t("footer.cookies", "Cookies Policy")}</h3>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
