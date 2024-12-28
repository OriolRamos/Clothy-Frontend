import Link from "next/link";

const PrivacyPolicy = () => {
    return (
        <div className="text-gray-900 min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 py-6">
                <div className="max-w-7xl mx-auto text-center text-black">
                    <h1 className="text-4xl font-extrabold">Política de Privacidad de Clothy</h1>
                    <p className="mt-2 text-lg">Fecha de efectividad: 13/03/2024</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg p-8">
                        <p className="text-lg mb-6">
                            En Clothy, tu privacidad es nuestra prioridad. Nos comprometemos a proteger tus datos personales y a cumplir con el Reglamento General de Protección de Datos (GDPR). Aquí te explicamos cómo recopilamos, utilizamos y protegemos tu información.
                        </p>

                        <h2 className="text-3xl font-semibold text-blue-600 mb-4">1. Qué información recopilamos y cómo la usamos</h2>
                        <p className="text-lg mb-4">
                            Recopilamos la información necesaria para ofrecer nuestro servicio y mejorarlo continuamente. Esto incluye:
                        </p>
                        <ul className="list-disc pl-6 text-lg">
                            <li><strong>Imágenes subidas:</strong> Las utilizamos para buscar prendas similares con nuestra IA. Estas imágenes se procesan de manera anonimizada y se eliminan después de un corto periodo.</li>
                            <li><strong>Información técnica:</strong> Como el tipo de dispositivo, sistema operativo y datos de uso para optimizar nuestra plataforma.</li>
                        </ul>

                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-4">2. Base legal para el tratamiento de datos</h2>
                        <p className="text-lg mb-4">
                            La base legal para tratar tus datos se basa en:
                        </p>
                        <ul className="list-disc pl-6 text-lg">
                            <li><strong>Tu consentimiento explícito:</strong> Cuando nos autorizas a utilizar tus imágenes.</li>
                            <li><strong>La necesidad de procesar datos:</strong> Para ofrecer el servicio que solicitas.</li>
                            <li><strong>El interés legítimo:</strong> Para mejorar el rendimiento de nuestra plataforma y IA.</li>
                        </ul>
                        <p className="text-lg mt-4">
                            Puedes retirar tu consentimiento en cualquier momento contactándonos.
                        </p>

                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-4">3. Tus derechos según el GDPR</h2>
                        <p className="text-lg mb-4">
                            Según el GDPR, tienes derecho a:
                        </p>
                        <ul className="list-disc pl-6 text-lg">
                            <li><strong>Acceder:</strong> Puedes solicitar ver los datos que tenemos sobre ti.</li>
                            <li><strong>Rectificar:</strong> Puedes corregir datos incorrectos o incompletos.</li>
                            <li><strong>Eliminar:</strong> Puedes solicitar que eliminemos tus datos.</li>
                            <li><strong>Restricción:</strong> Puedes limitar cómo procesamos tus datos en determinadas circunstancias.</li>
                            <li><strong>Portabilidad:</strong> Tienes derecho a recibir tus datos en un formato electrónico.</li>
                        </ul>
                        <p className="text-lg mt-4">
                            Para ejercer cualquiera de estos derechos, envíanos un correo a <span className="text-blue-600">support@clothy.com</span>.
                        </p>

                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-4">4. Privacidad de menores</h2>
                        <p className="text-lg mb-4">
                            Nuestro servicio no está destinado a menores de 13 años. Si descubres que un menor nos ha proporcionado datos, contacta con nosotros inmediatamente y tomaremos las medidas necesarias para eliminarlos.
                        </p>

                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-4">5. Cookies y tecnologías similares</h2>
                        <p className="text-lg mb-4">
                            Utilizamos cookies para mejorar tu experiencia en Clothy:
                        </p>
                        <ul className="list-disc pl-6 text-lg">
                            <li><strong>Cookies técnicas:</strong> Necesarias para el funcionamiento básico de la plataforma.</li>
                            <li><strong>Cookies analíticas:</strong> Con tu consentimiento, para analizar el uso y mejorar nuestros servicios.</li>
                        </ul>
                        <p className="text-lg mt-4">
                            Puedes gestionar las cookies desde la configuración de tu navegador.
                        </p>

                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-4">6. Cambios en la Política de Privacidad</h2>
                        <p className="text-lg mb-4">
                            Nos reservamos el derecho de actualizar esta política en cualquier momento. Notificaremos cualquier cambio importante antes de que sea efectivo.
                        </p>

                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-4">7. Contacto</h2>
                        <p className="text-lg mb-4">
                            Para dudas o consultas, puedes escribirnos a <span className="text-blue-600">support@clothy.com</span>.
                        </p>
                    </div>
                </div>
            </main>

        </div>
    );
};

export default PrivacyPolicy;
