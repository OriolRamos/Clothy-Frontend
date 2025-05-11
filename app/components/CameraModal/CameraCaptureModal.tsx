import React, { useRef, useEffect } from 'react';

interface CameraCaptureModalProps {
    onCapture: (blob: Blob) => void;
    onClose: () => void;
}

const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({ onCapture, onClose }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        async function startCamera() {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (error) {
                console.error("Error accedint a la càmera:", error);
            }
        }
        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                canvas.toBlob(blob => {
                    if (blob) {
                        onCapture(blob);
                    }
                }, 'image/jpeg');
            }
        }
    };

    return (
        <div className="fixed inset-0 z-60 flex flex-col items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <video ref={videoRef} autoPlay className="w-full h-auto rounded-lg" />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
                <div className="mt-4 flex justify-between space-x-4">
                    <button
                        onClick={capturePhoto}
                        className="px-4 py-2 bg-faqblue dark:bg-faqblue/80 text-white rounded hover:scale-105 transition transform duration-200"
                    >
                        Capturar
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded hover:scale-105 transition transform duration-200"
                    >
                        Cancel·lar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CameraCaptureModal;