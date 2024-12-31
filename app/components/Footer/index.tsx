"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";

// MIDDLE LINKS DATA
interface ProductType {
    id: number;
    section: string;
    name: string[];
    link: string[];
}

const products: ProductType[] = [
    {
        id: 1,
        section: "Menu",
        name: ['Home', 'About Us', 'FAQ', 'Join Us'],
        link: ['/#baner-section', '/#section2', '/#faq-section', '/#joinus-section',]
    },
    {
        id: 4,
        section: "Others",
        name: ['About Us'],
        link: ['/about-us']
    }
]

const Footer = () => {
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

    return (
        <div className="bg-black" id="first-section">
            <div className="mx-auto max-w-2xl pt-16 pb-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-24 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">
                    {/* COLUMN-1 */}
                    <div className="col-span-4">
                        <h3 className="text-white text-4xl font-semibold leading-9 mb-4 lg:mb-20 flex items-center justify-start">
                            <img
                                src="/images/clothy_white.png" // Ruta a la imatge
                                alt="Clothy Logo"
                                className="h-12 w-12 object-contain mr-3" // Mida més gran per a la imatge i un espai entre la imatge i el text
                            />
                            Clothy Labs
                        </h3>
                        <div className="flex gap-4">
                            <div className="footer-icons">
                                <Link href="https://facebook.com">
                                    <Image src={'/images/footer/vec.svg'} alt="facebook" width={15} height={20}/>
                                </Link>
                            </div>
                            <div className="footer-icons">
                                <Link href="https://twitter.com">
                                    <Image src={'/images/footer/twitter.svg'} alt="twitter" width={20} height={20} />
                                </Link>
                            </div>
                            <div className="footer-icons">
                                <Link href="https://instagram.com">
                                    <Image src={'/images/footer/instagram.svg'} alt="instagram" width={20} height={20} />
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
                                @{currentYear} - All Rights Reserved by{' '}
                                <Link href="https://clothy.es" target="_blank">Clothy.es</Link>
                            </h3>
                        </div>
                        <div className="flex justify-center md:justify-end">
                            <Link href="/privacy-policy">
                                <h3 className="text-offwhite pr-6" onClick={handlePrivacyPolicy}>Privacy policy</h3>
                            </Link>
                            <Link href="/terms&conditions">
                                <h3 className="text-offwhite pl-6 border-solid border-l border-footer" onClick={handleTermsConditions}>Terms & conditions</h3>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
