"use client"; // Marca el componente como Client Component

import Image from "next/image";
import { useRouter } from "next/navigation"; // Correcto para Client Components

const Banner = () => {

    const router = useRouter();

    const handleSignUp = () => {
        // Redirige a la página de signup
        router.push('/signup');
    };

    return (
        <div id="baner-section" className='mx-auto max-w-7xl my-10 sm:py-10 px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 my-16'>

                {/* COLUMN-1 */}

                <div className="mx-auto sm:mx-0">
                    <div className='py-3 text-center lg:text-start'>
                        <button className='text-blue bg-lightblue hover:shadow-xl text-sm md:text-lg font-bold px-6 py-1 rounded-3xl tracking-wider hover:text-white hover:bg-black'>
                            Cloth Designs
                        </button>
                    </div>
                    <div className="py-3 text-center lg:text-start">
                        <h1 className="text-4xl lg:text-5xl font-bold text-darkpurple">
                            Rediseñando la forma <br /> de vivir la moda
                        </h1>
                        <h2 className="text-2xl lg:text-3xl font-bold text-darkpurple mt-4">
                            Simple, sostenible y personalizado
                        </h2>
                    </div>
                    <div className="my-7 text-center lg:text-start">
                        <a
                            href="/signup"
                            className="text-xs md:text-sm font-semibold hover:shadow-xl bg-blue text-white py-2 px-4 md:py-3 md:px-10 rounded-full hover:bg-hoblue"
                            onClick={handleSignUp}
                        >
                            Inicia Sessió
                        </a>
                    </div>
                </div>

                {/* COLUMN-2 */}

                <div className='lg:-m-24 lg:pt-20 hidden lg:block'>
                    <Image src="/images/banner/banner.svg" alt="hero-image" width={800} height={642} />
                </div>

            </div>
        </div>
    )
}

export default Banner;
