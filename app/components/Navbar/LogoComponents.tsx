"use client";
import React from "react";
import { Typography } from "@material-tailwind/react";

const LogoDesktop: React.FC = () => (
    <Typography
        as="a"
        href="/"
        color="blue-gray"
        className="text-lg font-bold flex items-center gap-2"
        {...({} as any)}
    >
        <img src="/images/clothy_black.png" alt="Clothy Logo" className="h-8 w-8 object-contain" />
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
        <img src="/images/clothy_black.png" alt="Clothy Logo" className="h-8 w-8 object-contain" />
        Clothy
    </Typography>
);

export { LogoDesktop, LogoMobile };
