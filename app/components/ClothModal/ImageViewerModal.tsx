// app/components/ImageViewerModal/ImageViewerModal.tsx
'use client';

import React from 'react';
import Image from 'next/image';

interface ImageViewerModalProps {
    imageUrl: string;
    altText: string;
    onClose: () => void;
}

const ImageViewerModal: React.FC<ImageViewerModalProps> = ({ imageUrl, altText, onClose }) => {
    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-90 p-4"
            onClick={onClose} // Permet tancar el modal clicant fora de la imatge
        >
            <div
                className="relative max-w-full max-h-full w-auto h-auto flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()} // Evita que el clic a la imatge tanqui el modal
            >
                <button
                    className="absolute top-4 right-4 text-white text-4xl font-bold cursor-pointer z-10 hover:text-gray-300 transition-colors"
                    onClick={onClose}
                    aria-label="Tancar imatge gran"
                >
                    &times;
                </button>
                <div className="relative w-[95vw] h-[85vh] sm:w-[90vw] sm:h-[90vh] max-w-[1200px] max-h-[900px] flex items-center justify-center">
                    <Image
                        src={imageUrl}
                        alt={altText}
                        fill
                        className="object-contain"
                        priority // Carrega la imatge amb prioritat ja que és el contingut principal del modal
                    />
                </div>
                {altText && (
                    <p className="mt-4 text-white text-lg text-center p-2 bg-black bg-opacity-50 rounded-md">
                        {altText}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ImageViewerModal;