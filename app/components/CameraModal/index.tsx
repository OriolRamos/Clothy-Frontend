import React, { useRef, useState } from 'react';
import CameraCaptureModal from '../CameraModal/CameraCaptureModal'; // Assegura't que la ruta és correcta

const ImageUploadModal = ({ onFileSelect, onClose }) => {
    const fileInputGallery = useRef(null);
    const [showCameraCapture, setShowCameraCapture] = useState(false);

    const handleGalleryClick = () => {
        fileInputGallery.current.click();
    };

    const handleCameraClick = () => {
        // En comptes d'activar l'input, obrim el modal de càmera
        setShowCameraCapture(true);
    };

    // Quan es captura la imatge, es passa el blob al callback onFileSelect
    const handleCameraCapture = (blob: Blob) => {
        // Converteix el blob a File
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
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            onFileSelect(e.target.files[0]);
                        }
                    }}
                />
            </div>
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
