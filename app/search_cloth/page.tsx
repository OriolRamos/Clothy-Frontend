"use client";

import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

const SearchClothPage: React.FC = () => {
    const router = useRouter();

    const handleHome = () => {
        router.push('/');
    };

    return (
        <div className="min-h-[100vh] bg-gray-50 flex flex-col items-center pt-20 space-y-10">
            <div className="max-w-4xl mx-auto p-4 bg-white text-center">
            <Typography placeholder=""  // Si el component accepta 'placeholder', potser s'ha de passar una cadena buida
                        onPointerEnterCapture={() => {}}  // Passant funcions per evitar l'error, encara que potser no calgui utilitzar-les
                        onPointerLeaveCapture={() => {}} variant="h2" color="gray" className="mb-2 font-bold">
                    Search Cloth
                </Typography>
                <Typography placeholder=""  // Si el component accepta 'placeholder', potser s'ha de passar una cadena buida
                            onPointerEnterCapture={() => {}}  // Passant funcions per evitar l'error, encara que potser no calgui utilitzar-les
                            onPointerLeaveCapture={() => {}} variant="h4" color="gray" className="mb-4">
                    Aquesta pàgina està en desenvolupament i estarà disponible pròximament.
                </Typography>
                <div className="flex items-center justify-center h-screen">
                    <img
                        src="/images/creating_page.png" // Canvia aquesta URL amb la teva pròpia imatge
                        alt="Creating Page"
                        style={{width: "500px", height: "500px"}} // Ajustem la mida de la imatge
                    />
                </div>


                <div className="mt-6">
                    <Typography placeholder=""  // Si el component accepta 'placeholder', potser s'ha de passar una cadena buida
                                onPointerEnterCapture={() => {}}  // Passant funcions per evitar l'error, encara que potser no calgui utilitzar-les
                                onPointerLeaveCapture={() => {}} variant="h6" color="gray">
                        Si tens alguna pregunta o vols més informació, contacta amb nosaltres!
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default SearchClothPage;
