import Link from "next/link";

const DonationPage = () => {
    return (
        <div className="text-gray-900 min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 py-6">
                <div className="max-w-7xl mx-auto text-center text-black">
                    <h1 className="text-4xl font-extrabold">¡Apóyanos en nuestra fase de desarrollo!</h1>
                    <p className="mt-2 text-lg">Tu colaboración es clave para seguir mejorando nuestros servicios.</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg p-8">
                        <p className="text-lg mb-6">
                            En Clothy, nos encontramos en una fase de desarrollo y por el momento todos nuestros servicios son gratuitos. Sin embargo, si deseas apoyarnos para seguir creciendo y mejorar nuestra plataforma, ¡estamos abiertos a recibir tu generosa donación!
                        </p>

                        <h2 className="text-3xl font-semibold text-blue-600 mb-4">¿Cómo puedes hacer una donación?</h2>
                        <p className="text-lg mb-4">
                            Existen varias formas de colaborar con nosotros. A continuación, te detallamos los métodos más sencillos y seguros:
                        </p>
                        <ul className="list-disc pl-6 text-lg mb-6">
                            <li><strong>PayPal:</strong> Si prefieres usar tu cuenta de PayPal, ¡también aceptamos donaciones a través de este sistema!</li>
                        </ul>

                        <h2 className="text-3xl font-semibold text-blue-600 mb-4">¿Por qué donar?</h2>
                        <p className="text-lg mb-4">
                            Tu donación nos ayudará a seguir desarrollando nuevas funciones, mejorando la calidad del servicio y asegurando que podamos ofrecerte una experiencia excelente.
                        </p>
                        <p className="text-lg mb-6">
                            Cada contribución, grande o pequeña, tiene un impacto significativo. ¡Gracias por ser parte de nuestro viaje!
                        </p>

                        <h2 className="text-3xl font-semibold text-blue-600 mb-4">Métodos de pago:</h2>
                        <p className="text-lg mb-4">
                            Puedes realizar tu donación de cualquiera de las siguientes maneras:
                        </p>
                        <ul className="list-disc pl-6 text-lg">
                            <li><Link href="https://www.paypal.com/donate/?hosted_button_id=BJHKPD5W6R9Z2" className="text-blue-600 hover:underline">Donar a través de PayPal</Link></li>
                        </ul>

                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-4">¿Tienes preguntas?</h2>
                        <p className="text-lg mb-4">
                            Si tienes alguna duda sobre el proceso de donación o necesitas más información, no dudes en ponerte en contacto con nosotros.
                        </p>
                        <p className="text-lg">
                            Puedes escribirnos a <span className="text-blue-600">support@clothy.es</span> para obtener asistencia.
                        </p>
                    </div>
                </div>
            </main>

        </div>
    );
};

export default DonationPage;
