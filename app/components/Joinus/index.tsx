const Join = () => {
    return (
        <div id="joinus-section" className="bg-joinus my-32 pb-32">
            <div className="mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8">
                {/* Sección de encabezado */}
                <div className="text-center">
                    <h3 className="text-blue text-lg font-normal tracking-widest">
                        ÚNETE A NOSOTROS
                    </h3>
                    <h2 className="text-3xl sm:text-5xl font-bold my-6 leading-tight">
                        Rediseñemos el mundo juntos.
                    </h2>
                    <p className="text-lightblack text-xs sm:text-sm md:text-base font-normal max-w-[750px] mx-auto">
                        En Clothy, creemos en la moda como una fuerza de cambio. Valoramos profundamente tus opiniones
                        para crear nuevos productos y mejorar constantemente. <br/>
                        Juntos, podemos construir un futuro más inclusivo, sostenible y conectado.
                    </p>
                </div>

                {/* Formulario de suscripción */}
                <div className="mx-auto max-w-4xl pt-5">
                    <div
                        className="sm:flex items-center mx-5 p-5 sm:p-0 rounded-xl justify-between bg-lightgrey sm:rounded-full">
                        {/* Campo de correo (eliminado el campo de nombre) */}
                        <div>
                            <input
                                type="email"
                                className="my-4 py-4 sm:pl-6 lg:text-xl text-black sm:rounded-full bg-lightgrey pl-1 focus:outline-none bg-emailbg focus:text-black"
                                placeholder="Tu correo electrónico"
                                autoComplete="off"
                            />
                        </div>
                        {/* Botón de suscripción */}
                        <div className="sm:mr-3">
                            <button
                                type="submit"
                                className="joinButton w-full sm:w-0 text-xl text-white font-semibold text-center rounded-xl sm:rounded-full bg-blue hover:bg-btnblue"
                            >
                                ¡Únete!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Join;
