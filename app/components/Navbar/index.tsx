"use client";
import React, { useState, useEffect } from "react";
import { Navbar as MTNavbar, Collapse, Button, IconButton, Typography } from "@material-tailwind/react";
import { RectangleStackIcon, UserCircleIcon, CommandLineIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const NAV_MENU = [
    {
        name: "Home",
        icon: RectangleStackIcon,
        link: "/",
    },
    // Afegeix més ítems si cal
];

interface NavItemProps {
    children: React.ReactNode;
    href?: string;
}

function NavItem({ children, href }: NavItemProps) {
    return (
        <li>
            <Link href={href || "#"} passHref>
                <Typography
                    as="a"
                    variant="paragraph"
                    color="gray"
                    className="flex items-center gap-2 font-medium text-gray-900"
                    onClick={() => {}}
                    placeholder="" // Afegit placeholder
                    onPointerEnterCapture={() => {}} // Afegit onPointerEnterCapture
                    onPointerLeaveCapture={() => {}} // Afegit onPointerLeaveCapture
                    id="" // Afegit id
                    key="" // Afegit key
                >
                    {children}
                </Typography>
            </Link>
        </li>
    );
}


const Navbar: React.FC = () => {
    const router = useRouter();

    const handleLogin = () => {
        router.push('/login');
    };
    const handleSignUp = () => {
        router.push('/signup');
    };
    const handleHome = () => {
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
        <MTNavbar
            shadow={false}
            fullWidth
            className="border-0 sticky top-0 z-50"
            onPointerEnterCapture={() => {}} // Afegit onPointerEnterCapture
            onPointerLeaveCapture={() => {}} // Afegit
            onClick={() => {}}
            id="" // Afegit id
            key="" // Afegit key
            placeholder="Your Placeholder Text"  // Afegir aquí la propietat placeholder
        >
            <div className="container mx-auto flex items-center justify-between">
                <Typography
                    as="a"
                    href="https://www.clothy.es"
                    target="_blank"
                    color="blue-gray"
                    className="text-lg font-bold flex items-center gap-2 ml-4"
                    onClick={() => {}}
                    placeholder="" // Afegit placeholder
                    onPointerEnterCapture={() => {}} // Afegit onPointerEnterCapture
                    onPointerLeaveCapture={() => {}} // Afegit onPointerLeaveCapture
                    id="" // Afegit id
                    key="" // Afegit key
                >
                    <img
                        src="/images/clothy_black.png"
                        alt="Clothy Logo"
                        className="h-8 w-8 object-contain"
                    />
                    Clothy
                </Typography>

                <ul className="ml-10 hidden items-center gap-8 lg:flex">
                    {NAV_MENU.map(({ name, link, icon: Icon }) => (
                        <NavItem key={name} href={link}>
                            <Icon className="h-5 w-5" />
                            {name}
                        </NavItem>
                    ))}
                </ul>
                <div className="hidden items-center gap-2 lg:flex">
                    <Link href="/login">
                        <Button variant="text" onClick={handleLogin}
                                placeholder="" // Afegeix placeholder amb un valor buit si no tens cap valor específic
                                onPointerEnterCapture={() => {}} // Afegeix una funció buida si no tens una acció específica
                                onPointerLeaveCapture={() => {}} // Afegeix una funció buida si no tens una acció específic
                        >Login</Button>
                    </Link>
                    <Link href="/signup">
                        <Button color="gray" onClick={handleSignUp}
                                placeholder="" // Afegeix placeholder amb un valor buit si no tens cap valor específic
                                onPointerEnterCapture={() => {}} // Afegeix una funció buida si no tens una acció específica
                                onPointerLeaveCapture={() => {}} // Afegeix una funció buida si no tens una acció específic
                        >Sign up</Button>
                    </Link>
                </div>

                <IconButton
                    variant="text"
                    color="gray"
                    onClick={handleOpen}
                    className="ml-auto inline-block lg:hidden"
                    placeholder="" // Afegeix placeholder amb un valor buit si no tens cap valor específic
                    onPointerEnterCapture={() => {}} // Afegeix una funció buida si no tens una acció específica
                    onPointerLeaveCapture={() => {}} // Afegeix una funció buida si no tens una acció específic
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
                            <Button variant="text" onClick={handleLogin} placeholder="" // Afegeix placeholder amb un valor buit si no tens cap valor específic
                                    onPointerEnterCapture={() => {}} // Afegeix una funció buida si no tens una acció específica
                                    onPointerLeaveCapture={() => {}} // Afegeix una funció buida si no tens una acció específica
                            >Login</Button>
                        </Link>
                        <Link href="/signup">
                            <Button color="gray" onClick={handleSignUp} placeholder="" // Afegeix placeholder amb un valor buit si no tens cap valor específic
                                    onPointerEnterCapture={() => {}} // Afegeix una funció buida si no tens una acció específica
                                    onPointerLeaveCapture={() => {}} // Afegeix una funció buida si no tens una acció específic
                                    >Sign up</Button>
                        </Link>
                    </div>
                </div>
            </Collapse>
        </MTNavbar>
    );
};

export default Navbar;
