"use client";
import React, { useState } from "react";
import { Navbar as MTNavbar, Collapse, Button, IconButton, Typography } from "@material-tailwind/react";
import { RectangleStackIcon, CommandLineIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useAuth } from "../AuthContext/index"; // Importem el context

const NAV_MENU = [
    {
        name: "Home",
        icon: RectangleStackIcon,
        link: "/",
    },
];

const Navbar: React.FC = () => {
    const { isAuthenticated, userInitial, logout } = useAuth(); // Usem el context
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen((cur) => !cur);

    return (
        <MTNavbar shadow={false} fullWidth placeholder=""  // Si el component accepta 'placeholder', potser s'ha de passar una cadena buida
                  onPointerEnterCapture={() => {}}  // Passant funcions per evitar l'error, encara que potser no calgui utilitzar-les
                  onPointerLeaveCapture={() => {}} className="border-0 sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                <Typography
                    placeholder=""  // Si el component accepta 'placeholder', potser s'ha de passar una cadena buida
                    onPointerEnterCapture={() => {}}  // Passant funcions per evitar l'error, encara que potser no calgui utilitzar-les
                    onPointerLeaveCapture={() => {}}
                    as="a"
                    href="https://www.clothy.es"
                    target="_blank"
                    color="blue-gray"
                    className="text-lg font-bold flex items-center gap-2 ml-4"
                >
                    <img src="/images/clothy_black.png" alt="Clothy Logo" className="h-8 w-8 object-contain" />
                    Clothy
                </Typography>

                <ul className="ml-10 hidden items-center gap-8 lg:flex">
                    {NAV_MENU.map(({ name, link, icon: Icon }) => (
                        <li key={name}>
                            <Link href={link} passHref>
                                <Typography
                                    as="a"
                                    variant="paragraph"
                                    color="gray"
                                    className="flex items-center gap-2 font-medium text-gray-900"
                                    placeholder=""  // Si el component accepta 'placeholder', potser s'ha de passar una cadena buida
                                    onPointerEnterCapture={() => {}}  // Passant funcions per evitar l'error, encara que potser no calgui utilitzar-les
                                    onPointerLeaveCapture={() => {}}
                                >
                                    <Icon className="h-5 w-5" />
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
                                    placeholder=""  // Si el component accepta 'placeholder', potser s'ha de passar una cadena buida
                                    onPointerEnterCapture={() => {}}  // Passant funcions per evitar l'error, encara que potser no calgui utilitzar-les
                                    onPointerLeaveCapture={() => {}}
                                >
                                    <CommandLineIcon className="h-5 w-5" />
                                    Search Cloth
                                </Typography>
                            </Link>
                        </li>
                    )}
                </ul>

                <div className="hidden items-center gap-2 lg:flex">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                                {userInitial}
                            </div>
                            <Button placeholder=""  // Si el component accepta 'placeholder', potser s'ha de passar una cadena buida
                                    onPointerEnterCapture={() => {}}  // Passant funcions per evitar l'error, encara que potser no calgui utilitzar-les
                                    onPointerLeaveCapture={() => {}} variant="text" color="red" onClick={logout}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button placeholder=""  // Si el component accepta 'placeholder', potser s'ha de passar una cadena buida
                                        onPointerEnterCapture={() => {}}  // Passant funcions per evitar l'error, encara que potser no calgui utilitzar-les
                                        onPointerLeaveCapture={() => {}} variant="text">Login</Button>
                            </Link>
                            <Link href="/signup">
                                <Button placeholder=""  // Si el component accepta 'placeholder', potser s'ha de passar una cadena buida
                                        onPointerEnterCapture={() => {}}  // Passant funcions per evitar l'error, encara que potser no calgui utilitzar-les
                                        onPointerLeaveCapture={() => {}} color="gray">Sign up</Button>
                            </Link>
                        </>
                    )}
                </div>

                <IconButton placeholder=""  // Si el component accepta 'placeholder', potser s'ha de passar una cadena buida
                            onPointerEnterCapture={() => {}}  // Passant funcions per evitar l'error, encara que potser no calgui utilitzar-les
                            onPointerLeaveCapture={() => {}} variant="text" color="gray" onClick={handleOpen} className="ml-auto inline-block lg:hidden">
                    {open ? <XMarkIcon strokeWidth={2} className="h-6 w-6" /> : <Bars3Icon strokeWidth={2} className="h-6 w-6" />}
                </IconButton>
            </div>

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
                                        placeholder=""  // Si el component accepta 'placeholder', potser s'ha de passar una cadena buida
                                        onPointerEnterCapture={() => {}}  // Passant funcions per evitar l'error, encara que potser no calgui utilitzar-les
                                        onPointerLeaveCapture={() => {}}
                                    >
                                        <Icon className="h-5 w-5" />
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
                                        placeholder=""  // Si el component accepta 'placeholder', potser s'ha de passar una cadena buida
                                        onPointerEnterCapture={() => {}}  // Passant funcions per evitar l'error, encara que potser no calgui utilitzar-les
                                        onPointerLeaveCapture={() => {}}
                                    >
                                        <CommandLineIcon className="h-5 w-5" />
                                        Search Cloth
                                    </Typography>
                                </Link>
                            </li>
                        )}
                    </ul>
                    <div className="mt-6 mb-4 flex items-center gap-2">
                        {isAuthenticated ? (
                            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                                {userInitial}
                            </div>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button placeholder=""  // Si el component accepta 'placeholder', potser s'ha de passar una cadena buida
                                            onPointerEnterCapture={() => {}}  // Passant funcions per evitar l'error, encara que potser no calgui utilitzar-les
                                            onPointerLeaveCapture={() => {}} variant="text">Login</Button>
                                </Link>
                                <Link href="/signup">
                                    <Button placeholder=""  // Si el component accepta 'placeholder', potser s'ha de passar una cadena buida
                                            onPointerEnterCapture={() => {}}  // Passant funcions per evitar l'error, encara que potser no calgui utilitzar-les
                                            onPointerLeaveCapture={() => {}} color="gray">Sign up</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Collapse>
        </MTNavbar>
    );
};

export default Navbar;
