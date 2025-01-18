import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from '@heroicons/react/20/solid'

interface datatype {
    heading: string;
    imgSrc: string;
    paragraph: string;
    link: string;
    linkDir: string;
}

const Aboutdata: datatype[] = [
    {
        heading: "Sobre Nosotros",
        imgSrc: "/images/aboutus/imgOne.svg",
        paragraph: 'En Clothy, creemos que la moda no es solo ropa. Es una forma de expresar quiénes somos, de imaginar el mundo tal como queremos que sea y de conectar con los demás. Con este sueño en el corazón, fundamos Clothy: una plataforma nacida para rediseñar el futuro de la moda, haciéndola más accesible, inclusiva y sostenible para todos.',
        link: 'Conocer más',
        linkDir: "#dedicated-section"
    },
    {
        heading: "Nuestra Historia",
        imgSrc: "/images/aboutus/imgTwo.svg",
        paragraph: 'Todo comenzó con una pregunta sencilla: ¿Cómo podemos ayudar a las personas a encontrar prendas de ropa que realmente se adapten a su visión y estilo? Inspirados por la rapidez con la que la tecnología está cambiando el mundo, decidimos combinar la inteligencia artificial con la creatividad humana para construir una herramienta única: una que permita a los usuarios encontrar ropa basada en imágenes de una manera intuitiva y personalizada.',
        link: 'Leer más',
        linkDir: "#featured-section"
    },
    {
        heading: "Nuestra Visión",
        imgSrc: "/images/aboutus/imgThree.svg",
        paragraph: 'Nuestra misión va más allá del estilo o la comodidad. En Clothy, soñamos con un futuro donde la moda sea un reflejo del cambio que queremos ver en el mundo: un futuro más sostenible, inclusivo y conectado. Queremos ofrecer a los usuarios las herramientas para encontrar ropa que no solo los represente, sino que también respete al planeta.',
        link: 'Descubrir más',
        linkDir: "#beliefs-section"
    },
]

const Aboutus = () => {
    return (
        <div id="aboutus-section">
            <div className='mx-auto max-w-7xl px-4 py-24 my-32 lg:px-10 bg-lightgrey rounded-3xl relative'>
                <Image src="/images/aboutus/dots.svg" width={100} height={100} alt="dots-image" className="absolute bottom-1 -left-20" />
                <h3 className='text-center text-blue text-lg tracking-widest'>SOBRE NOSOTROS</h3>
                <h4 className='text-center text-4xl lg:text-5xl font-bold my-6'>Conozca más sobre nosotros</h4>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-16 gap-x-16 lg:gap-x-32'>
                    {Aboutdata.map((item, i) => (
                        <div key={i} className='hover:bg-navyblue bg-white rounded-3xl mt-16 pt-10 pl-8 pb-10 pr-6 shadow-xl group max-w-md sm:max-w-xl lg:max-w-2xl'>
                            <h4 className='text-3xl lg:text-4xl font-semibold text-black mb-5 group-hover:text-white'>{item.heading}</h4>
                            <Image src={item.imgSrc} alt={item.imgSrc} width={100} height={100} className="mb-5" />
                            <p className='text-lg font-normal text-black group-hover:text-offwhite mb-5'>{item.paragraph}</p>
                            <Link href={item.linkDir} className='text-lg font-semibold group-hover:text-white text-blue hover-underline'>
                                {item.link}
                                <ChevronRightIcon width={20} height={20} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Aboutus;
