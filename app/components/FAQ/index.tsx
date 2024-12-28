"use client";
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

const FAQ = () => {
    return (
        <div id="faq-section" className="mx-auto max-w-7xl py-24 lg:px-8 bg-faqblue rounded-2xl my-16 faq-bg">
            <h3 className="text-xl font-normal text-white text-center mb-6">Preguntas Frecuentes</h3>
            <h2 className="text-4xl lg:text-6xl font-semibold text-center text-white">
                Resolviendo tus dudas.
            </h2>
            <div className="w-full px-4 pt-16">
                {/* Pregunta 1 */}
                <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white py-8 px-6 mb-5">
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-2xl font-medium">
                                    <span>¿Qué es Clothy y cómo funciona?</span>
                                    <ChevronUpIcon
                                        className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-black font-normal opacity-50">
                                    Clothy es una plataforma diseñada para rediseñar el futuro de la moda. Nuestra primera funcionalidad permite a los usuarios encontrar ropa similar basada en imágenes a través de inteligencia artificial y web scraping. Nuestro objetivo es crear un entorno innovador y sostenible para todos los amantes de la moda.
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>

                {/* Pregunta 2 */}
                <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white py-8 px-6 mb-5">
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-2xl font-medium">
                                    <span>¿Cómo puedo buscar ropa similar usando Clothy?</span>
                                    <ChevronUpIcon
                                        className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-black font-normal opacity-50">
                                    Usar Clothy es muy sencillo. Solo necesitas subir una imagen de la prenda que estás buscando, y nuestra inteligencia artificial buscará opciones similares en tiempo real. Esto te permitirá encontrar productos que se adapten a tu estilo personal de manera rápida y efectiva.
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>

                {/* Pregunta 3 */}
                <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white py-8 px-6 mb-5">
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-2xl font-medium">
                                    <span>¿Clothy trabaja con marcas locales?</span>
                                    <ChevronUpIcon
                                        className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-black font-normal opacity-50">
                                    Sí, en Clothy creemos en apoyar a las marcas locales y sostenibles. Nuestro plan incluye integrar negocios locales para que puedan mostrar sus productos y llegar a una audiencia más amplia. De esta manera, fomentamos un ecosistema inclusivo y diverso en la industria de la moda.
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>

                {/* Pregunta 4 */}
                <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white py-8 px-6 mb-5">
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-2xl font-medium">
                                    <span>¿Es seguro usar Clothy?</span>
                                    <ChevronUpIcon
                                        className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-black font-normal opacity-50">
                                    Absolutamente. En Clothy priorizamos la seguridad y privacidad de nuestros usuarios. Tus datos y búsquedas están protegidos y nunca se compartirán con terceros sin tu consentimiento. Además, seguimos las mejores prácticas de seguridad en todas nuestras operaciones.
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>

                {/* Pregunta 5 */}
                <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white py-8 px-6">
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-2xl font-medium">
                                    <span>¿Cuáles son los planes futuros de Clothy?</span>
                                    <ChevronUpIcon
                                        className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-black font-normal opacity-50">
                                    Este es solo el comienzo. Planeamos expandir las funcionalidades de Clothy, incluyendo un buscador más sostenible, integración con marcas internacionales, y herramientas para ayudar a los usuarios a tomar decisiones de compra más responsables. También queremos desarrollar sistemas que reduzcan el exceso de consumo en la industria de la moda.
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
