// app/subscription-canceled/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { XCircle, AlertTriangle } from 'lucide-react'; // Icones

const SubscriptionCanceledPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-xl shadow-2xl">
                <div>
                    <XCircle className="mx-auto h-16 w-16 text-red-500" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        {"Procés de Subscripció Cancel·lat"}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
                        {"Sembla que el procés de subscripció no s'ha completat o ha estat cancel·lat."}
                    </p>
                </div>

                <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-700 border-l-4 border-orange-400 dark:border-orange-600">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <AlertTriangle className="h-5 w-5 text-orange-400 dark:text-orange-300" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-orange-700 dark:text-orange-50">
                                {"No se t'ha realitzat cap càrrec. Pots intentar subscriure't de nou quan vulguis."}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    {/* Opció 1: Aplica estils directament al Link (Next.js 13+ ja renderitza <a>) */}
                    <Link
                        href="/subscription-plans"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-faqblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                    >
                        Veure els Plans de Subscripció
                    </Link>

                    <Link
                        href="/"
                        className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Tornar a la pàgina principal
                    </Link>

                    {/* Opció 2 (Menys comuna ara, però era per a casos on necessitaves l'<a> explícita):
                        Si has d'utilitzar l'etiqueta <a> interna per alguna raó específica,
                        assegura't que no hi ha res més al mateix nivell dins de <Link>
                        i que `legacyBehavior` pot ser necessari per a versions anteriors o casos especials.
                        La teva versió de Next.js (14.2.23) hauria de funcionar bé amb l'Opció 1.
                        L'ús de `legacyBehavior` ja indica que estàs utilitzant el patró antic.
                        Si mantens `legacyBehavior`, el problema podria ser més subtil, com un espai en blanc
                        o un comentari que es considera un altre fill, encara que és poc probable.
                    */}
                    {/* <Link href="/#pricing" legacyBehavior>
                        <a className="group relative w-full flex justify-center ...">
                            Veure els Plans de Subscripció
                        </a>
                    </Link>
                    <Link href="/" legacyBehavior>
                        <a className="group relative w-full flex justify-center ...">
                            Tornar a la pàgina principal
                        </a>
                    </Link>
                    */}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionCanceledPage;