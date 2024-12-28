import Link from "next/link";

const TermsAndConditions = () => {
    return (
        <div className="text-gray-900 min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 py-6">
                <div className="max-w-7xl mx-auto text-center text-black">
                    <h1 className="text-4xl font-extrabold">Términos de Uso y Condiciones</h1>
                    <p className="mt-2 text-lg">Bienvenido a Clothy. Tu experiencia y confianza son nuestra
                        prioridad.</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg p-8">
                        <h2 className="text-3xl font-semibold text-blue-600 mb-6">1. Uso Aceptable</h2>
                        <p className="text-lg mb-4">
                            Clothy está diseñada para uso personal y no comercial. Está estrictamente prohibido:
                        </p>
                        <ul className="list-disc pl-6 text-lg">
                            <li>Copiar, distribuir o modificar cualquier contenido de la plataforma sin autorización
                                escrita.
                            </li>
                            <li>Intentar acceder al código fuente o manipular los algoritmos de IA.</li>
                            <li>Utilizar la plataforma para actividades ilícitas o que infrinjan derechos de terceros.
                            </li>
                        </ul>

                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-6">2. Privacidad y Protección de
                            Datos (GDPR)</h2>
                        <p className="text-lg mb-4">
                            En Clothy seguimos estrictamente el Reglamento General de Protección de Datos (GDPR). Los
                            datos personales que nos proporcionas se utilizan exclusivamente para ofrecerte un mejor
                            servicio. A continuación, destacamos los puntos principales:
                        </p>
                        <ul className="list-disc pl-6 text-lg">
                            <li>Solo recopilamos datos necesarios, como tu imagen para buscar ropa similar.</li>
                            <li>No compartimos tus datos con terceros sin tu consentimiento explícito.</li>
                            <li>Puedes solicitar acceder, modificar o eliminar tus datos en cualquier momento.</li>
                        </ul>
                        <p className="mt-4 text-lg">
                            Consulta nuestra <Link href="/privacy-policy" className="text-blue-600">Política de
                            Privacidad</Link> para más detalles.
                        </p>

                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-6">3. Uso de las Imágenes</h2>
                        <p className="text-lg mb-4">
                            Cuando subes una imagen a Clothy, esta solo se utiliza con el propósito de buscar prendas de
                            ropa similares y mejorar nuestro algoritmo de IA. Garantizamos que:
                        </p>
                        <ul className="list-disc pl-6 text-lg">
                            <li>Tus imágenes se procesan de manera segura y no se comparten con ninguna entidad
                                externa.
                            </li>
                            <li>Las imágenes no se almacenan indefinidamente; las eliminamos automáticamente después de
                                un período definido.
                            </li>
                            <li>Puedes solicitar la eliminación inmediata de cualquier imagen subida.</li>
                        </ul>

                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-6">4. Limitación de
                            Responsabilidad</h2>
                        <p className="text-lg mb-4">
                            Aunque hacemos todo lo posible por mantener un servicio seguro y confiable, Clothy no se
                            hace responsable de:
                        </p>
                        <ul className="list-disc pl-6 text-lg">
                            <li>Errores técnicos o interrupciones temporales en el servicio.</li>
                            <li>Resultados inexactos en la búsqueda de prendas similares.</li>
                            <li>Cualquier mal uso de la plataforma por parte de los usuarios.</li>
                        </ul>

                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-6">5. Modificación de los
                            Términos</h2>
                        <p className="text-lg mb-4">
                            Nos reservamos el derecho de modificar estos términos y condiciones para adaptarnos a nuevas
                            necesidades legales o tecnológicas. Siempre que realicemos cambios importantes, te
                            notificaremos previamente. Recomendamos revisar periódicamente esta página para estar
                            informado.
                        </p>

                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-6">6. Contacto y Soporte</h2>
                        <p className="text-lg mb-4">
                            Si tienes alguna duda, preocupación o sugerencia sobre estos términos, no dudes en
                            contactarnos a través de nuestro <Link href="/contact" className="text-blue-600">formulario
                            de contacto</Link> o enviando un correo electrónico a <span
                            className="text-blue-600">support@clothy.com</span>.
                        </p>
                    </div>
                </div>
            </main>
        </div>

    );
};

export default TermsAndConditions;
