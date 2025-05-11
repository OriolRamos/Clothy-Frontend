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

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        setIsMobile(/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    }, []);

    const handleGalleryClick = () => {
        fileInputGallery.current?.click();
    };

    const handleCameraClick = () => {
        if (isMobile) {
            fileInputCamera.current?.click();
        } else {
            setShowCameraCapture(true);
        }
    };

    const handleMobileCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    const handleCameraCapture = (blob: Blob) => {
        const file = new File([blob], 'captured.jpg', { type: blob.type });
        onFileSelect(file);
        setShowCameraCapture(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-zinc-900 w-full p-4 rounded-t-lg">
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
                    className="mt-2 w-full text-center text-red-500 dark:text-red-400"
                >
                    Cancel·lar
                </button>

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

                <input
                    ref={fileInputCamera}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleMobileCapture}
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
