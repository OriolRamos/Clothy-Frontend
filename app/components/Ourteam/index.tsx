import Image from "next/image";

const index = () => {
    return (
        <div className='mx-auto max-w-7xl sm:py-4 lg:px-8 m-32'>
            <h2 className="text-4xl sm:text-6xl font-bold text-center">En Clothy, creemos que mereces <br /> solo lo mejor.</h2>
            <h3 className="text-2xl font-medium text-center pt-10 opacity-75">
                La moda es mucho más que ropa: es identidad, creatividad y conexión. <br />
                En Clothy, utilizamos inteligencia artificial para ayudarte a encontrar <br />
                prendas que realmente reflejen tu estilo y visión.
            </h3>
            <div className="flex items-center justify-center h-screen">
                <Image
                    src="/images/team/teaming2.jpg"
                    alt="imagen-equipo-clothy"
                    height={342} // La mitad de 684
                    width={648} // La mitad de 1296
                    quality={100} // Mejora la calidad al máximo permitido
                    className="rounded-lg" // Añade un efecto más profesional
                />
            </div>
            <p className="text-lg text-center opacity-75 leading-8 text-white">
                Nuestro equipo está comprometido con ofrecerte una experiencia única. <br/>
                Innovamos cada día para construir una plataforma que te conecte con la moda <br/>
                que amas, de una manera accesible, sostenible y personalizada.
            </p>
        </div>
    )
}

export default index;
