import Image from "next/image";

const Dedicated = () => {
    return (
        <div id="dedicated-section" className="relative bg-lightgray py-20">
            {/* Fondo decorativo */}
            <Image
                src="/images/dedicated/spiral.svg"
                height={272}
                width={686}
                alt="spiral-design"
                className="absolute left-0 hidden lg:block -z-10"
            />

            <div className="mx-auto max-w-7xl px-4 sm:py-20 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">
                    {/* COLUMN-1 */}
                    <div>
                        <Image
                            src="/images/dedicated/personal_image.jpg"
                            alt="man-icon"
                            width={416}
                            height={530}
                            className="mx-auto md:mx-0 rounded-lg filter saturate-90 brightness-105"
                        />
                    </div>

                    {/* COLUMN-2 */}
                    <div className="relative">
                        {/* Imagen decorativa */}
                        <Image
                            src="/images/dedicated/comma.svg"
                            alt="comma-image"
                            width={200}
                            height={106}
                            className="absolute -top-10 -left-10 hidden lg:block"
                        />

                        {/* Contenido principal */}
                        <h2 className="text-4xl lg:text-6xl font-bold text-darkpurple leading-snug text-center lg:text-start">
                            Redefiniendo la moda para transformar el mundo.
                        </h2>
                        <p className="text-2xl font-medium text-gray-700 mt-5 text-center lg:text-start">
                            En Clothy, soñamos con una moda más inclusiva, sostenible y accesible para todos. Nuestro único objetivo es ayudarte a encontrar tu estilo mientras construimos tecnologia para canviar la moda.
                        </p>
                        <p className="text-2xl font-semibold mt-12 text-darkpurple text-center lg:text-start">
                            Oriol Ramos, CEO
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dedicated;
