// components/Navbar/index.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
    Navbar as MTNavbar,
    Collapse,
    Button,
    IconButton,
    Typography,
} from "@material-tailwind/react";
import {
    RectangleStackIcon,
    UserCircleIcon,
    CommandLineIcon,
    XMarkIcon,
    Bars3Icon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';

// Configuració del menú de navegació
const NAV_MENU = [
    {
        name: "Home",
        icon: RectangleStackIcon,
        link: "/",
    },
];

interface NavItemProps {
    children: React.ReactNode;
    href?: string;
}

function NavItem({ children, href }: NavItemProps) {
    return (
        <li>
            <Typography
                as="a"
                href={href || "#"}
                target={href ? "_blank" : "_self"}
                variant="paragraph"
                color="gray"
                className="flex items-center gap-2 font-medium text-gray-900"
            >
                {children}
            </Typography>
        </li>
    );
}

const Navbar: React.FC = () => {
    const router = useRouter();

    const handleLogin = () => {
        // Redirigeix a la pàgina de login
        router.push('/login');
    };
    const handleSignUp = () => {
        // Redirigeix a la pàgina de login
        router.push('/signup');
    };
    const handleHome = () => {
        // Redirigeix a la pàgina de home
        router.push('/');
    };

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen((cur) => !cur);

    useEffect(() => {
        const debounce = (fn: Function) => {
            let frame: number;
            return (...params: any[]) => {
                if (frame) {
                    cancelAnimationFrame(frame);
                }
                frame = requestAnimationFrame(() => {
                    fn(...params);
                });
            };
        };

        const storeScroll = () => {
            document.documentElement.dataset.scroll = window.scrollY.toString();
        };

        document.addEventListener("scroll", debounce(storeScroll), { passive: true });
        storeScroll();
    }, []);

    return (
        <MTNavbar shadow={false} fullWidth className="border-0 sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                <Typography
                    as="a"
                    href="https://www.clothy.es"
                    target="_blank"
                    color="blue-gray"
                    className="text-lg font-bold flex items-center gap-2 ml-4" // Flex per alinear text i imatge, marge a l'esquerra
                >
                    <img
                        src="/images/clothy_black.png" // Ruta a la imatge
                        alt="Clothy Logo"
                        className="h-8 w-8 object-contain" // Millorar la qualitat de la imatge, mida més gran i mantenir les proporcions
                    />
                    Clothy
                </Typography>

                <ul className="ml-10 hidden items-center gap-8 lg:flex">
                    {NAV_MENU.map(({ name, link, icon: Icon, href }) => (
                        <NavItem key={name} href={link} onClick={link}>
                            <Icon className="h-5 w-5" />
                            {name}
                        </NavItem>
                    ))}
                </ul>
                <div className="hidden items-center gap-2 lg:flex">
                    {/* Botó Login */}
                    <Link href="/login">
                        <Button variant="text" onClick={handleLogin}>Login</Button>
                    </Link>

                    {/* Botó Sign up */}
                    <Link href="/signup">
                        <Button color="gray" onClick={handleSignUp}>Sign up</Button>
                    </Link>
                </div>

                <IconButton
                    variant="text"
                    color="gray"
                    onClick={handleOpen}
                    className="ml-auto inline-block lg:hidden"
                >
                    {open ? (
                        <XMarkIcon strokeWidth={2} className="h-6 w-6" />
                    ) : (
                        <Bars3Icon strokeWidth={2} className="h-6 w-6" />
                    )}
                </IconButton>
            </div>
            <Collapse open={open}>
                <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
                    <ul className="flex flex-col gap-4">
                        {NAV_MENU.map(({ name, icon: Icon }) => (
                            <NavItem key={name}>
                                <Icon className="h-5 w-5" />
                                {name}
                            </NavItem>
                        ))}
                    </ul>
                    <div className="mt-6 mb-4 flex items-center gap-2">
                        <Link href="/login">
                            <Button variant="text" onClick={handleLogin}>Login</Button>
                        </Link>

                        {/* Botó Sign up */}
                        <Link href="/signup">
                            <Button color="gray" onClick={handleSignUp}>Sign up</Button>
                        </Link>
                    </div>
                </div>
            </Collapse>
        </MTNavbar>
    );
};

export default Navbar;
