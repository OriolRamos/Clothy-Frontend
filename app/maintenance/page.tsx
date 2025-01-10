import Image from 'next/image';
import maintenanceImage from '../public/images/maintenance.svg'; // Imatge de manteniment que has de tenir al directori public

const MaintenancePage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            {/* Títol gran */}
            <h1 className="text-5xl font-bold text-center text-gray-900 mb-8">
                Pagina en Mantenimiento
            </h1>

            {/* Imatge de manteniment */}
            <div className="flex justify-center items-center">
                <Image
                    src="/images/maintenance.png"
                    alt="Manteniment"
                    width={500} // ajusta la mida segons sigui necessari
                    height={500} // ajusta la mida segons sigui necessari
                />
            </div>
        </div>
    );
};

export default MaintenancePage;
