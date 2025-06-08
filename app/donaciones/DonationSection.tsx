// pots crear un nou fitxer, ex: app/components/Subscriptions/DonationsSection.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { HeartHandshake, ExternalLink } from 'lucide-react';
import { useTranslation } from "react-i18next"; // Afegit per a la traducció

const DonationsSection = () => {
    // Afegeix la funció de traducció si la necessites per al text
    const { t } = useTranslation('common');

    return (
        <section className="mt-20 mb-10">
            <div className="container mx-auto max-w-4xl px-4">
                {/* [CANVI CLAU] S'ha definit un fons per al mode clar (bg-slate-100)
                  i s'ha mantingut el teu fons fosc per al dark mode (dark:bg-gradient-to-tr...).
                */}
                <div className="
                    rounded-2xl
                    bg-slate-100
                    dark:bg-gradient-to-tr dark:from-slate-800 dark:via-gray-900 dark:to-slate-800
                    p-8
                    shadow-lg
                    border border-slate-200 dark:border-teal-500/20
                ">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Secció de la icona */}
                        <div className="flex-shrink-0">
                            {/*
                              [CANVI CLAU] Fons de la icona diferent per a cada mode.
                            */}
                            <div className="bg-teal-100 dark:bg-teal-500/10 p-5 rounded-full">
                                <HeartHandshake className="h-16 w-16 text-teal-500 dark:text-teal-400" />
                            </div>
                        </div>

                        {/* Secció del text */}
                        <div className="flex-grow text-center md:text-left">
                            {/*
                              [CANVI CLAU] Colors de text que canvien amb el mode.
                            */}
                            <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
                                {t("donations.title", "Vols Donar Suport al Projecte?")}
                            </h2>
                            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
                                {t("donations.description", "Si Clothy.es t'és útil, considera fer una donació. Cada contribució, per petita que sigui, ens ajuda a mantenir i millorar la plataforma.")}
                            </p>
                        </div>

                        {/* Secció del botó */}
                        <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
                            <Link
                                href="https://www.paypal.com/donate/?hosted_button_id=BJHKPD5W6R9Z2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    group flex items-center justify-center w-full px-8 py-4
                                    text-lg font-semibold text-white
                                    bg-teal-500 rounded-lg shadow-lg
                                    transition-all duration-300 ease-in-out
                                    hover:bg-teal-600 hover:shadow-teal-500/40 transform hover:-translate-y-1
                                    focus:outline-none focus:ring-4 focus:ring-teal-500/50
                                "
                            >
                                {t("donations.button", "Fer una Donació")}
                                <ExternalLink className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DonationsSection;