"use client";
import React, { useState, useEffect } from "react";
import {
    Navbar as MTNavbar,
    Collapse,
    Button,
    IconButton,
    Typography,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import { RectangleStackIcon, CommandLineIcon, XMarkIcon, Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useAuth } from "../AuthContext/index";
import {LogoDesktop, LogoMobile} from "./LogoComponents"
import UserMenu from "./UserMenu"

const NAV_MENU = [
    {
        name: "Home",
        icon: RectangleStackIcon,
        link: "/",
    },
];

const Navbar: React.FC = () => {
    const { isAuthenticated, userInitial, logout, userImage } = useAuth();
    const [open, setOpen] = useState(false);
    const [userMenuVisible, setUserMenuVisible] = useState(false); // Estat per controlar la visibilitat del UserMenu


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
        <MTNavbar shadow={false} fullWidth className="border-0 sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between lg:justify-start">
                {/* Botó per a mòbil */}
                <IconButton
                    variant="text"
                    color="gray"
                    onClick={handleOpen}
                    className="lg:hidden"
                >
                    {open ? <XMarkIcon strokeWidth={2} className="h-6 w-6" /> : <Bars3Icon strokeWidth={2} className="h-6 w-6" />}
                </IconButton>

                {/* Logo per pantalles grans */}
                <div className="hidden lg:block">
                    <LogoDesktop />
                </div>

                {/* Logo per pantalles petites */}
                <div className="lg:hidden flex justify-center w-full">
                    <LogoMobile />
                </div>

                {/* Menús a la dreta en pantalla gran */}
                <ul className="hidden lg:flex items-center justify-center gap-8 ml-auto">
                    {NAV_MENU.map(({ name, link, icon: Icon }) => (
                        <li key={name}>
                            <Link href={link} passHref>
                                <Typography
                                    as="a"
                                    variant="paragraph"
                                    color="gray"
                                    className="flex items-center gap-2 font-medium text-gray-900"
                                >
                                    <Icon className="h-5 w-5" />
                                    {name}
                                </Typography>
                            </Link>
                        </li>
                    ))}
                    {isAuthenticated && (
                        <li key="search_cloth">
                            <Link href="/maintenance" passHref>
                                <Typography
                                    as="a"
                                    variant="paragraph"
                                    color="gray"
                                    className="flex items-center gap-2 font-medium text-gray-900"
                                >
                                    <CommandLineIcon className="h-5 w-5" />
                                    Search Cloth
                                </Typography>
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Accions d'usuari a la dreta */}
                <div className="ml-auto flex items-center gap-2">
                    {isAuthenticated ? (
                        <UserMenu />
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="text">Login</Button>
                            </Link>
                            <Link href="/signup">
                                <Button color="gray">Sign up</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Menú responsive per a pantalla petita */}
            <Collapse open={open}>
                <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
                    <ul className="flex flex-col gap-4">
                        {NAV_MENU.map(({ name, link, icon: Icon }) => (
                            <li key={name}>
                                <Link href={link} passHref>
                                    <Typography
                                        as="a"
                                        variant="paragraph"
                                        color="gray"
                                        className="flex items-center gap-2 font-medium text-gray-900"
                                    >
                                        <Icon className="h-5 w-5" />
                                        {name}
                                    </Typography>
                                </Link>
                            </li>
                        ))}
                        {isAuthenticated && (
                            <li key="search_cloth">
                                <Link href="/maintenance" passHref>
                                    <Typography
                                        as="a"
                                        variant="paragraph"
                                        color="gray"
                                        className="flex items-center gap-2 font-medium text-gray-900"
                                    >
                                        <CommandLineIcon className="h-5 w-5" />
                                        Search Cloth
                                    </Typography>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </Collapse>
        </MTNavbar>
    );
};

export default Navbar;
