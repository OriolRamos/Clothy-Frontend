"use client"
import React from 'react'; // Importa React
import './globals.css';
import Navbar from './components/Navbar/index'; // Importa el Navbar
import Footer from './components/Footer/index'; // Importa el Footer
import Head from 'next/head'; // Importa Head desde next/head
import { AuthProvider } from "./components/AuthContext/index"; // Importa el AuthProvider
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n.js'; // Asegúrate de importar tu configuración de i18n

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    if (!i18n.isInitialized) {
        return <div>Loading...</div>; // Carregar un missatge o component mentre les traduccions es carreguen
    }
    return (
        <html lang="en">
        <Head>
            <title>Clothy</title>
            <meta name="description" content="Buscador de ropa" />
            <link rel="icon" href="/icon.png" />
        </Head>
        <body>
        <I18nextProvider i18n={i18n}>
        <AuthProvider>
            <Navbar />
            {children}
        </AuthProvider>
        </I18nextProvider>
        </body>
        </html>
    );
}