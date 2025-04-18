import React, { useRef, useState, useEffect } from 'react';
import CameraCaptureModal from '../CameraModal/CameraCaptureModal'; // Assegura't que la ruta és correcta

interface ImageUploadModalProps {
    onFileSelect: (file: File | string) => void;
    onClose: () => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ onFileSelect, onClose }) => {
    const fileInputGallery = useRef<HTMLInputElement | null>(null);
    const fileInputCamera = useRef<HTMLInputElement | null>(null);
    const [showCameraCapture, setShowCameraCapture] = useState(false);

    // Detecció simple de dispositius mòbils
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        setIsMobile(/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    }, []);

    const handleGalleryClick = () => {
        fileInputGallery.current?.click();
    };

    const handleCameraClick = () => {
        if (isMobile) {
            // Obrim directament la càmera del dispositiu mòbil
            fileInputCamera.current?.click();
        } else {
            // Obrim el modal de càmera per a escriptoris
            setShowCameraCapture(true);
        }
    };

    // Gestió de captura mitjançant input amb "capture"
    const handleMobileCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    // Captura des del modal de càmera
    const handleCameraCapture = (blob: Blob) => {
        const file = new File([blob], 'captured.jpg', { type: blob.type });
        onFileSelect(file);
        setShowCameraCapture(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full p-4 rounded-t-lg">
                <button
                    onClick={handleCameraClick}
                    className="w-full py-3 bg-faqblue text-white rounded-lg mb-2 hover:scale-105 transition transform duration-200"
                >
                    Prendre una foto
                </button>
                <button
                    onClick={handleGalleryClick}
                    className="w-full py-3 bg-faqblue text-white rounded-lg hover:scale-105 transition transform duration-200"
                >
                    Seleccionar de la galeria
                </button>
                <button
                    onClick={onClose}
                    className="mt-2 w-full text-center text-red-500"
                >
                    Cancel·lar
                </button>

                {/* Input per seleccionar de la galeria */}
                <input
                    ref={fileInputGallery}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                            onFileSelect(e.target.files[0]);
                        }
                    }}
                />

                {/* Input per a mòbils: captura directa amb "capture" */}
                <input
                    ref={fileInputCamera}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleMobileCapture}
                />
            </div>

            {/* Modal de càmera per a escriptoris */}
            {showCameraCapture && (
                <CameraCaptureModal
                    onCapture={handleCameraCapture}
                    onClose={() => setShowCameraCapture(false)}
                />
            )}
        </div>
    );
};

export default ImageUploadModal;
