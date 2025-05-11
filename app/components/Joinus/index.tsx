"use client";
import React, { useRef, useState } from "react";
import { sendEmailBenvinguda } from "../../utils/email/emailServiceBenvinguda";
import { useTranslation } from 'react-i18next';

const Join = () => {
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const { t } = useTranslation('common');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email) {
            setMessage(t('joinus.error_message'));
            return;
        }

        const dynamicData = {
            username: "Usuari Example",
            subject: t('joinus.email_subject'),
        };

        const result = await sendEmailBenvinguda(email, dynamicData);
        setMessage(result.message);

        if (result.success) {
            setEmail("");
        }
    };

    return (
        <div id="joinus-section" className="bg-joinus dark:bg-gray-900 my-32 pb-32">
            <div className="mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8">
                <div className="text-center">
                    <h3 className="text-blue dark:text-blue-300 text-lg font-normal tracking-widest">
                        {t('joinus.header')}
                    </h3>
                    <h2 className="text-3xl sm:text-5xl font-bold my-6 leading-tight text-black dark:text-gray-100">
                        {t('joinus.subheading')}
                    </h2>
                    <p className="text-lightblack dark:text-gray-400 text-xs sm:text-sm md:text-base font-normal max-w-[750px] mx-auto">
                        {t('joinus.description')}
                    </p>
                </div>

                <div className="mx-auto max-w-4xl pt-5">
                    <form
                        onSubmit={handleSubmit}
                        className="sm:flex items-center mx-5 p-5 sm:p-0 rounded-xl justify-between bg-lightgrey dark:bg-gray-800 sm:rounded-full"
                    >
                        <div>
                            <input
                                type="email"
                                className="my-4 py-4 sm:pl-6 lg:text-xl text-black dark:text-gray-100 sm:rounded-full bg-lightgrey dark:bg-gray-700 pl-1 focus:outline-none bg-emailbg dark:bg-gray-700 focus:text-black dark:focus:text-white"
                                placeholder={t('joinus.email_placeholder')}
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="sm:mr-3">
                            <button
                                type="submit"
                                className="joinButton w-full sm:w-auto text-xl text-white font-semibold text-center rounded-xl sm:rounded-full bg-blue dark:bg-blue-700 hover:bg-btnblue dark:hover:bg-blue-600"
                            >
                                {t('joinus.join_button')}
                            </button>
                        </div>
                    </form>

                    {message && (
                        <div className="text-center mt-4">
                            <p className="text-sm font-semibold text-black dark:text-gray-100">{message}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Join;