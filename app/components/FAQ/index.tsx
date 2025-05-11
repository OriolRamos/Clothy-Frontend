"use client";
import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { useTranslation } from "react-i18next";

const FAQ = () => {
    const { t } = useTranslation('common');
    return (
        <div id="faq-section" className="mx-auto max-w-7xl py-24 lg:px-8 bg-faqblue dark:bg-gray-800 rounded-2xl my-16 faq-bg">
            <h3 className="text-xl font-normal text-white text-center mb-6">{t("faq.title")}</h3>
            <h2 className="text-4xl lg:text-6xl font-semibold text-center text-white">
                {t("faq.subtitle")}
            </h2>
            <div className="w-full px-4 pt-16">
                {/* Pregunta 1 */}
                <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white dark:bg-gray-700 py-8 px-6 mb-5">
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-2xl font-medium text-gray-900 dark:text-gray-100">
                                    <span>{t("faq.question1.title")}</span>
                                    <ChevronUpIcon
                                        className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500 dark:text-purple-300`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-black dark:text-gray-300 font-normal opacity-50">
                                    {t("faq.question1.content")}
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>

                {/* Pregunta 2 */}
                <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white dark:bg-gray-700 py-8 px-6 mb-5">
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-2xl font-medium text-gray-900 dark:text-gray-100">
                                    <span>{t("faq.question2.title")}</span>
                                    <ChevronUpIcon
                                        className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500 dark:text-purple-300`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-black dark:text-gray-300 font-normal opacity-50">
                                    {t("faq.question2.content")}
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>

                {/* Pregunta 3 */}
                <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white dark:bg-gray-700 py-8 px-6 mb-5">
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-2xl font-medium text-gray-900 dark:text-gray-100">
                                    <span>{t("faq.question3.title")}</span>
                                    <ChevronUpIcon
                                        className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500 dark:text-purple-300`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-black dark:text-gray-300 font-normal opacity-50">
                                    {t("faq.question3.content")}
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>

                {/* Pregunta 4 */}
                <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white dark:bg-gray-700 py-8 px-6 mb-5">
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-2xl font-medium text-gray-900 dark:text-gray-100">
                                    <span>{t("faq.question4.title")}</span>
                                    <ChevronUpIcon
                                        className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500 dark:text-purple-300`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-black dark:text-gray-300 font-normal opacity-50">
                                    {t("faq.question4.content")}
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>

                {/* Pregunta 5 */}
                <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white dark:bg-gray-700 py-8 px-6">
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-2xl font-medium text-gray-900 dark:text-gray-100">
                                    <span>{t("faq.question5.title")}</span>
                                    <ChevronUpIcon
                                        className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500 dark:text-purple-300`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-black dark:text-gray-300 font-normal opacity-50">
                                    {t("faq.question5.content")}
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>
            </div>
        </div>
    );
};

export default FAQ;