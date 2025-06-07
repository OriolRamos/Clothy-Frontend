// pots crear un nou fitxer, ex: app/components/Subscriptions/DonationsSection.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { HeartHandshake, ExternalLink } from 'lucide-react';

const DonationsSection = () => {
    return (
        <section className="mt-20 mb-10">
            <div className="container mx-auto max-w-4xl">
                {/* La targeta utilitza un degradat similar però distintiu */}
                <div className="rounded-2xl bg-gradient-to-tr from-slate-800 via-gray-900 to-slate-800 dark:from-slate-900 dark:to-gray-900 p-8 shadow-xl border border-teal-500/20">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0">
                            <div className="bg-teal-500/10 p-5 rounded-full">
                                <HeartHandshake className="h-16 w-16 text-teal-400" />
                            </div>
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <h2 className="text-3xl font-bold text-white tracking-tight">
                                Vols Donar Suport al Projecte?
                            </h2>
                            <p className="mt-3 text-lg text-slate-300">
                                Si Clothy.es t'és útil, considera fer una donació. Cada contribució, per petita que sigui, ens ajuda a mantenir i millorar la plataforma.
                            </p>
                        </div>
                        <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
                            <Link
                                href="https://www.paypal.com/donate/?hosted_button_id=BJHKPD5W6R9Z2"
                                target="_blank" // Obre en una nova pestanya
                                rel="noopener noreferrer" // Bona pràctica de seguretat
                                className="
                                    group flex items-center justify-center w-full px-8 py-4
                                    text-lg font-semibold text-white
                                    bg-teal-500 rounded-lg shadow-lg
                                    transition-all duration-300 ease-in-out
                                    hover:bg-teal-600 hover:shadow-teal-500/40 transform hover:-translate-y-1
                                "
                            >
                                Fer una Donació
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