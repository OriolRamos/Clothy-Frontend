"use client";
import React, { useRef, useState } from "react";
import { sendEmailBenvinguda } from "../../utils/email/emailServiceBenvinguda"; // Importem el servei de SendGrid

const Join = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Comprova que hi hagi un email
        if (!email) {
            setMessage("Per favor, introdueix un correu electrònic.");
            return;
        }

        // Envia el correu electrònic amb les dades dinàmiques
        const dynamicData = {
            username: "Usuari Example", // Pots recollir més dades dinàmiques del formulari aquí
            subject: "Benvingut/da a Clothy!",
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
                        ÚNETE A NOSOTROS
                    </h3>
                    <h2 className="text-3xl sm:text-5xl font-bold my-6 leading-tight">
                        Rediseñemos el mundo juntos.
                    </h2>
                    <p className="text-lightblack text-xs sm:text-sm md:text-base font-normal max-w-[750px] mx-auto">
                        En Clothy, creemos en la moda como una fuerza de cambio. Valoramos
                        profundamente tus opiniones para crear nuevos productos y mejorar
                        constantemente. <br />
                        Juntos, podemos construir un futuro más inclusivo, sostenible y
                        conectado.
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
                                placeholder="Tu correo electrónico"
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
                                ¡Únete!
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
