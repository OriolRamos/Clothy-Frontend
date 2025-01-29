"use client";
import React, { useRef, useState } from "react";
import { sendEmailBenvinguda } from "../../utils/email/emailServiceBenvinguda"; // Importem el servei de SendGrid
import { useTranslation } from 'react-i18next'; // Afegim la importació de i18next

const Join = () => {
    const [email, setEmail] = useState<string>(""); // Definim el tipus de l'estat
    const [message, setMessage] = useState<string>("");
    const { t } = useTranslation('common'); // Utilitzem el hook de i18next per obtenir les traduccions

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Comprova que hi hagi un email
        if (!email) {
            setMessage(t('joinus.error_message')); // Utilitzem la traducció per l'error
            return;
        }

        // Envia el correu electrònic amb les dades dinàmiques
        const dynamicData = {
            username: "Usuari Example", // Pots recollir més dades dinàmiques del formulari aquí
            subject: t('joinus.email_subject'), // Utilitzem la traducció per al tema de l'email
        };

        const result = await sendEmailBenvinguda(email, dynamicData);
        setMessage(result.message);

        // Neteja el camp de correu si l'enviament ha estat correcte
        if (result.success) {
            setEmail("");
        }
    };

    return (
        <div id="joinus-section" className="bg-joinus my-32 pb-32">
            <div className="mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8">
                {/* Secció de capçalera */}
                <div className="text-center">
                    <h3 className="text-blue text-lg font-normal tracking-widest">
                        {t('joinus.header')} {/* Traducim la capçalera */}
                    </h3>
                    <h2 className="text-3xl sm:text-5xl font-bold my-6 leading-tight">
                        {t('joinus.subheading')} {/* Traducim el subtítol */}
                    </h2>
                    <p className="text-lightblack text-xs sm:text-sm md:text-base font-normal max-w-[750px] mx-auto">
                        {t('joinus.description')} {/* Traducim la descripció */}
                    </p>
                </div>

                {/* Formulari de subscripció */}
                <div className="mx-auto max-w-4xl pt-5">
                    <form
                        onSubmit={handleSubmit}
                        className="sm:flex items-center mx-5 p-5 sm:p-0 rounded-xl justify-between bg-lightgrey sm:rounded-full"
                    >
                        {/* Camp de correu */}
                        <div>
                            <input
                                type="email"
                                className="my-4 py-4 sm:pl-6 lg:text-xl text-black sm:rounded-full bg-lightgrey pl-1 focus:outline-none bg-emailbg focus:text-black"
                                placeholder={t('joinus.email_placeholder')} // Traduïm el placeholder
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Botó de subscripció */}
                        <div className="sm:mr-3">
                            <button
                                type="submit"
                                className="joinButton w-full sm:w-0 text-xl text-white font-semibold text-center rounded-xl sm:rounded-full bg-blue hover:bg-btnblue"
                            >
                                {t('joinus.join_button')} {/* Traduïm el text del botó */}
                            </button>
                        </div>
                    </form>

                    {/* Missatge d'error o èxit */}
                    {message && (
                        <div className="text-center mt-4">
                            <p className="text-sm font-semibold">{message}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Join;
