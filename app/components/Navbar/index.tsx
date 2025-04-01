"use client";
import React, { useState, useEffect } from "react";
import {
    Collapse,
    Button,
    IconButton,
    Typography,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem } from "@material-tailwind/react";
import { RectangleStackIcon, MagnifyingGlassIcon , XMarkIcon, Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useAuth } from "../AuthContext/index";
import {LogoDesktop, LogoMobile} from "./LogoComponents"
import UserMenu from "./UserMenu"
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from 'react-i18next';





const Navbar: React.FC = () => {
    const { isAuthenticated, userInitial, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const [userMenuVisible, setUserMenuVisible] = useState(false); // Estat per controlar la visibilitat del UserMenu
    const { t } = useTranslation('common'); // Usar traducciones

    const NAV_MENU = [
        {
            name: t("navbar.home"),
            icon: RectangleStackIcon,
            link: "/",
        },
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 800) {
                setOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleOpen = () => setOpen((cur) => !cur);

    return (
        <div className="bg-white bg-opacity-60 sticky top-0 z-50 w-full px-5 py-2 backdrop-blur-md">
            <div className="max-w-full mx-auto">
                <div className="max-w-[1980px] mx-auto flex items-center justify-between lg:justify-start">
                    {/* Botó per a mòbil */}
                    <div className="lg:hidden flex items-center p-1 gap-1">
                        <IconButton
                            variant="text"
                            color="gray"
                            onClick={handleOpen}
                            {...({} as any)}
                        >
                            {open ? <XMarkIcon className="h-6 w-6"/> : <Bars3Icon className="h-6 w-6"/>}
                        </IconButton>
                        {!isAuthenticated && (
                            <LanguageSwitcher/>
                        )}
                    </div>

                    {/* Logo per pantalles grans */}
                    <div className="hidden lg:block">
                        <LogoDesktop/>
                    </div>

                    {/* Logo per pantalles petites */}
                    <div className="lg:hidden flex justify-center w-full pointer-events-none">
                        <LogoMobile />
                    </div>

                    {/* Menús a la dreta en pantalla gran */}
                    <ul className="hidden lg:flex items-center justify-center gap-8 ml-auto">
                        {NAV_MENU.map(({name, link, icon: Icon}) => (
                            <li key={name}>
                                <Link href={link} passHref>
                                    <Typography
                                        as="a"
                                        variant="paragraph"
                                        color="gray"
                                        className="flex items-center gap-2 font-medium text-gray-900"
                                        {...({} as any)} // Ignora altres propietats no passades
                                    >
                                        <Icon className="h-5 w-5"/>
                                        {name}
                                    </Typography>
                                </Link>
                            </li>
                        ))}
                        {isAuthenticated && (
                            <li key="search_cloth">
                                <Link href="/search_cloth" passHref>
                                    <Typography
                                        as="a"
                                        variant="paragraph"
                                        color="gray"
                                        className="flex items-center gap-2 font-medium text-gray-900"
                                        {...({} as any)} // Ignora altres propietats no passades
                                    >
                                        <MagnifyingGlassIcon className="h-5 w-5"/>
                                        {t("navbar.search")}
                                    </Typography>
                                </Link>
                            </li>
                        )}
                    </ul>

                    {/* Accions d'usuari a la dreta */}
                    <div className="ml-auto flex items-center gap-2">
                        <div className="hidden lg:block">
                            <LanguageSwitcher/>
                        </div>
                        {/* Logo per pantalles petites */}
                        <div className="lg:hidden flex justify-center w-full">
                            {isAuthenticated && (
                                <LanguageSwitcher/>
                            )}
                        </div>

                        {isAuthenticated ? (
                            <UserMenu userInitial={userInitial}   // Per exemple, les inicials de l'usuari
                                      logout={logout}
                            />
                        ) : (
                            <>
                                <Link href="/login" {...({} as any)}>
                                    <Button variant="text" {...({} as any)}>{t("loginbutton")}</Button>
                                </Link>
                                <Link href="/signup" {...({} as any)}>
                                    <Button color="gray" className="whitespace-nowrap" {...({} as any)}>{t("signupbutton")}</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Menú responsive per a pantalla petita */}
                <Collapse open={open}>
                    <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
                        <ul className="flex flex-col gap-4">
                            {NAV_MENU.map(({name, link, icon: Icon}) => (
                                <li key={name}>
                                    <Link href={link} passHref>
                                        <Typography
                                            as="a"
                                            variant="paragraph"
                                            color="gray"
                                            className="flex items-center gap-2 font-medium text-gray-900"
                                            {...({} as any)}
                                        >
                                            <Icon className="h-5 w-5"/>
                                            {name}
                                        </Typography>
                                    </Link>
                                </li>
                            ))}
                            {isAuthenticated && (
                                <li key="search_cloth">
                                    <Link href="/search_cloth" passHref>
                                        <Typography
                                            as="a"
                                            variant="paragraph"
                                            color="gray"
                                            className="flex items-center gap-2 font-medium text-gray-900"
                                            {...({} as any)}
                                        >
                                            <MagnifyingGlassIcon className="h-5 w-5"/>
                                            {t("navbar.search")}
                                        </Typography>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>

                </Collapse>
            </div>
        </div>
    );
};

export default Navbar;