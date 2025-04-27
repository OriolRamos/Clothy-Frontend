"use client";
import React from "react";
import { Typography } from "@material-tailwind/react";
import Image from "next/image";


const LogoDesktop: React.FC = () => (
    <Typography
        as="a"
        href="/"
        color="blue-gray"
        className="text-lg font-bold flex items-center gap-2"
        {...({} as any)}
    >
        <Image
            src="/images/clothy_black.png"
            alt="Clothy Logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
        />
        Clothy
    </Typography>
);

// Componente per a pantalles petites
const LogoMobile: React.FC = () => (
    <Typography
        as="a"
        href="/"
        color="blue-gray"
        className="text-lg font-bold flex items-center gap-2 mx-auto"
        {...({} as any)}
    >
        <Image
            src="/images/clothy_black.png"
            alt="Clothy Logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
        />
    </Typography>
);

export { LogoDesktop, LogoMobile };
