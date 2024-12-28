"use client";
import React from "react";
import { useRouter } from "next/navigation";

const AboutUs = () => {
    const router = useRouter();

    return (
        <div className="text-gray-900">
            {/* Header */}
            <header className="bg-blue-600 py-6">
                <div className="max-w-7xl mx-auto text-center text-black">
                    <h1 className="text-4xl font-extrabold">Sobre Nosotros</h1>
                    <p className="mt-2 text-lg">Fecha de efectividad: 13/03/2024</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg p-8">
                        <p className="text-lg mb-6">
                            En Clothy, creemos que la moda no es solo ropa. Es una forma de expresar quiénes somos, de imaginar el mundo tal como queremos que sea y de conectar con los demás. Con este sueño en el corazón, fundamos Clothy: una plataforma nacida para rediseñar el futuro de la moda, haciéndola más accesible, inclusiva y sostenible para todos.
                        </p>

                        <h2 className="text-3xl font-semibold text-blue-600 mb-4">Nuestra historia</h2>
                        <p className="text-lg mb-6">
                            Todo comenzó con una pregunta sencilla: <i>“¿Cómo podemos ayudar a las personas a encontrar prendas de ropa que realmente se adapten a su visión y estilo?”</i>. Inspirados por la rapidez con la que la tecnología está cambiando el mundo, decidimos combinar la inteligencia artificial con la creatividad humana para construir una herramienta única: una que permita a los usuarios encontrar ropa basada en imágenes de una manera intuitiva y personalizada.
                        </p>

                        <h2 className="text-3xl font-semibold text-blue-600 mb-4">Nuestra visión</h2>
                        <p className="text-lg mb-6">
                            Nuestra misión va más allá del estilo o la comodidad. En Clothy, soñamos con un futuro donde la moda sea un reflejo del cambio que queremos ver en el mundo: un futuro más sostenible, inclusivo y conectado. Queremos ofrecer a los usuarios las herramientas para encontrar ropa que no solo los represente, sino que también respete al planeta.
                        </p>

                        <h2 className="text-3xl font-semibold text-blue-600 mb-4">Comprometidos con nuestros usuarios</h2>
                        <p className="text-lg mb-6">
                            Nuestros usuarios son el centro de todo lo que hacemos. Cada funcionalidad, cada decisión y cada mejora está pensada para ofrecer una experiencia que cumpla con sus necesidades y supere sus expectativas. A través de vuestros comentarios y sugerencias, nos comprometemos a evolucionar y construir una plataforma que realmente marque la diferencia.
                        </p>

                        <h2 className="text-3xl font-semibold text-blue-600 mb-4">Construimos el futuro juntos</h2>
                        <p className="text-lg mb-6">
                            Esto es solo el comienzo. Nuestra visión a largo plazo incluye proyectos como crear un buscador de moda más sostenible, integración con marcas locales e incluso herramientas que ayuden a reducir el exceso de consumo en la industria de la ropa. Todo esto con un único objetivo: ayudarte a encontrar tu estilo mientras ayudamos al mundo a encontrar su equilibrio.
                        </p>

                        <p className="text-lg mb-6">
                            Gracias por formar parte de este viaje. Con Clothy, redefinimos la moda juntos.
                        </p>

                        {/* Botón para volver */}
                        <div className="mt-12">
                            <button
                                className="text-white bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded"
                                onClick={() => router.push('/')}
                            >
                                Volver a la página principal
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AboutUs;
