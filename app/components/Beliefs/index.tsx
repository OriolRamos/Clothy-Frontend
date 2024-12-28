"use client";
import {useRouter} from "next/navigation";

const Beliefs = () => {

    const router = useRouter();

    const handleLogin = () => {
        // Redirigeix a la pàgina de login
        router.push('/login');
    };
    const handleJoinUs = () => {
        // Redirigeix a la pàgina de login
        router.push('/#joinus-section');
    };

    return (
        <div className='mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8 rounded-3xl'>
            <div className='grid grid-cols-1 lg:grid-cols-2 my-16 mx-5 gap-5'>

                {/* COLUMN-1 */}

                <div className="bg-darkblue bg-beliefs pt-12 px-10 sm:px-24 pb-52 md:pb-70 rounded-3xl">
                    <h2 className="text-lg font-normal text-white tracking-widest mb-5 text-center sm:text-start">CREENCIAS</h2>
                    <h3 className="text-4xl sm:text-65xl font-bold text-white leading-snug mb-5 text-center sm:text-start">La honestidad  <span className="text-grey">y el trabajo duro son nuestras creencias.</span></h3>
                    <h5 className="text-offwhite pt-2 mb-5 text-center sm:text-start">Trabajamos por y para vosotros, con el unico objetivo de mejorar la vida y cultura de las personas.</h5>
                    <div className="text-center sm:text-start">
                        <button className="text-xl py-5 px-14 mt-5 font-semibold text-white rounded-full bg-blue border border-blue hover:bg-hoblue" onClick={handleLogin}>Empieza</button>
                    </div>
                </div>

                {/* COLUMN-2 */}

                <div className="bg-build pt-12 px-10 sm:px-24 pb-52 md:pb-70 rounded-3xl">
                    <h2 className="text-lg font-normal text-blue tracking-widest mb-5 text-center sm:text-start">CONSTRUIE CON NOSOTROS</h2>
                    <h3 className="text-4xl sm:text-65xl font-bold text-black leading-snug mb-5 text-center sm:text-start"><span className="text-blue">Construye</span> esa gran idea que tienes.</h3>
                    <h5 className="bluish pt-2 mb-5 text-center sm:text-start">Las ideas canvian el mundo, por eso estamos totalmente avieros a escuchar y implementar vuestras ideas. En Clothy todas las ideas son importantes.</h5>
                    <div className="text-center sm:text-start">
                        <button className="text-xl py-5 px-14 mt-5 font-semibold text-white rounded-full bg-blue border border-blue hover:bg-hoblue" onClick={handleJoinUs}>Contactanos</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Beliefs;
