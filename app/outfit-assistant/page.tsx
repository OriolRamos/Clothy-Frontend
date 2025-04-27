"use client";

import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import ImageUploadModal from "../components/CameraModal/index";
import { useAuth } from "@/app/components/AuthContext";
import { Camera, Send, Sun, Cloud, CloudRain, CloudLightning, CloudSnow, CloudDrizzle } from "lucide-react";
import Image from "next/image";


interface Message {
    id: number;
    content: string;
    role: "user" | "assistant";
    imageUrl?: string;
}

interface OutfitAssistantPageSearchParams {
    initialConversationId?: string;
}

export default function OutfitAssistantPage({
                                                searchParams,
                                            }: { searchParams: OutfitAssistantPageSearchParams }) {
    const initialConversationId = searchParams.initialConversationId;
    const { fetchWithAuth } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(true);
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const messageEndRef = useRef<HTMLDivElement>(null);
    const [weather, setWeather] = useState<any>(null);

    // Load existing messages if initialConversationId provided
    useEffect(() => {
        const loadHistory = async () => {
            if (!searchParams.initialConversationId) return;
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const res = await fetchWithAuth(`${apiUrl}/outfit-assistant/conversations/${initialConversationId}`, { method: "GET" });
                if (!res.ok) throw new Error("Failed to fetch conversation history");
                const data: { id: string; role: string; content: string; created_at: string }[] = await res.json();
                // Map to Message and set
                const msgs: Message[] = data.map((m, idx) => ({ id: idx, content: m.content, role: m.role as any }));
                setMessages(msgs);
            } catch (e) {
                console.error(e);
            }
        };
        loadHistory();
    }, [searchParams.initialConversationId, fetchWithAuth]);

    // Efecto que trae el clima de Met.no
    useEffect(() => {
        if (!location) return;
        (async () => {
            try {
                const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${location.latitude}&lon=${location.longitude}`;
                const res = await fetch(url, {
                    headers: { "User-Agent": "OutfitAssistant/1.0 (https://clothy.es; ceo@clothy.es)" }
                });
                if (!res.ok) throw new Error(`Status ${res.status}`);
                const json = await res.json();
                setWeather(json);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [location]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const requestLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
                (err) => console.warn("Geolocation error:", err.message),
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
            );
        } else {
            console.warn("Geolocation not supported.");
        }
    };

    const handleLocationAgree = () => {
        setShowLocationModal(false);
        requestLocation();
        navigator.geolocation.getCurrentPosition(
            (pos) => setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
            (err) => console.warn(err),
            { enableHighAccuracy: true }
        );
    };
    const handleLocationDecline = () => setShowLocationModal(false);

    // Choose weather icon based on symbol code
    const getWeatherIcon = (symbolCode: string) => {
        if (symbolCode.includes("clear") || symbolCode === "clearsky") return <Sun className="h-6 w-6 text-yellow-500" />;
        if (symbolCode.includes("partly") || symbolCode.includes("cloudy")) return (
            <div className="flex -space-x-1">
                <Sun className="h-5 w-5 text-yellow-500" />
                <Cloud className="h-6 w-6 text-gray-400" />
            </div>
        );
        if (symbolCode.includes("rain")) return <CloudRain className="h-6 w-6 text-blue-500" />;
        if (symbolCode.includes("drizzle")) return <CloudDrizzle className="h-6 w-6 text-blue-300" />;
        if (symbolCode.includes("thunder")) return <CloudLightning className="h-6 w-6 text-gray-700" />;
        if (symbolCode.includes("snow")) return <CloudSnow className="h-6 w-6 text-blue-200" />;
        return <Cloud className="h-6 w-6 text-gray-400" />;
    };

    const onFileSelect = (file: File | string) => {
            if (typeof file === "string") {
                // Si et passen un data-URL directament, només el mostrem
                setPreviewUrl(file);
                setImageFile(null);
            } else {
                setImageFile(file);
                const reader = new FileReader();
                reader.onload = () => setPreviewUrl(reader.result as string);
               reader.readAsDataURL(file);
           }
            setShowImageModal(false);
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setPreviewUrl(null);
    };

    const handleSend = async () => {
        if (!inputText.trim() && !imageFile) return;

        let currentConversationId = conversationId;

        // 1. Crear la conversa si no existeix
        if (!currentConversationId) {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const res = await fetchWithAuth(`${apiUrl}/outfit-assistant/conversations`, { method: "POST" });
                if (!res.ok) throw new Error(`Error creating conversation ${res.status}`);
                const data = await res.json();
                currentConversationId = data.conversation_id;
                setConversationId(currentConversationId);
            } catch (err) {
                console.error("Failed to create conversation:", err);
                return;
            }
        }

        // 2. Crear el missatge de l'usuari
        const userMessage: Message = {
            id: Date.now(),
            content: inputText.trim(),
            role: "user",
            imageUrl: previewUrl || undefined,
        };
        setMessages(prev => [...prev, userMessage]);
        setInputText("");

        // 3. Crear la informació de context (temps, localització)
        let weatherString = "";
        if (weather) {
            const instant = weather.properties.timeseries[0].data.instant.details;
            const next = weather.properties.timeseries[0].data.next_1_hours?.summary;
            weatherString = `Current weather at your location: ${instant.air_temperature}°C, ${next?.symbol_code}, wind ${instant.wind_speed} m/s, humidity ${instant.relative_humidity}%.`;
        }

        const formData = new FormData();
        formData.append("conversation_id", currentConversationId!);
        formData.append("text", userMessage.content);
        formData.append("weather", weatherString);
        const locStr = location ? `${location.latitude},${location.longitude}` : "";
        formData.append("location", locStr);
        if (imageFile) formData.append("image", imageFile);

        // 4. Enviar la petició
        setLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetchWithAuth(`${apiUrl}/outfit-assistant`, { method: "POST", body: formData });
            if (!res.ok) throw new Error(`Server responded with ${res.status}`);
            const data = await res.json();
            setMessages(prev => [...prev, { id: Date.now() + 1, content: data.reply, role: "assistant" }]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setImageFile(null);
            setPreviewUrl(null);
        }
    };


    // Derive modal data
    let currentTemp = weather?.properties.timeseries[0].data.instant.details.air_temperature;
    let currentSymbol = weather?.properties.timeseries[0].data.next_1_hours?.summary.symbol_code;

    return (
        <>
            <Head>
                <title>Outfit Assistant</title>
                <meta
                    name="description"
                    content="Haz una foto a tu outfit y te ayudo a decidir si es correcto y sugerencias de mejora"
                />
            </Head>

            <div className="flex flex-col min-h-screen bg-gray-50">
                {showLocationModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-2xl p-6 max-w-sm text-center">
                            <h2 className="text-2xl font-semibold mb-4">Permitir ubicación</h2>
                            <p className="mb-6">
                                Para ofrecerte sugerencias de outfit más precisas según tu clima y región,
                                necesitamos acceder a tu ubicación.
                            </p>
                            <div className="flex justify-around">
                                <button
                                    onClick={handleLocationDecline}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    No, gracias
                                </button>
                                <button
                                    onClick={handleLocationAgree}
                                    className="px-4 py-2 bg-faqblue text-white rounded hover:bg-blue-600"
                                >
                                    Permitir
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <header className="bg-white shadow p-6 text-center">
                    <h1 className="text-3xl font-bold text-black">Outfit Assistant</h1>
                    <p className="mt-1 text-gray-700">
                        Haz una foto a tu outfit y te ayudo a decidir si es correcto y sugerencias de mejora.
                    </p>
                </header>

                <main className="flex-1 p-6 space-y-4 pb-24 bg-gray-200">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[80%] p-4 rounded-lg break-words whitespace-pre-wrap ${
                                    msg.role === "user"
                                        ? "bg-faqblue text-white rounded-br-none"
                                        : "bg-white text-black rounded-bl-none shadow-lg"
                                }`}
                            >
                                {msg.imageUrl && (
                                    <Image
                                        src={msg.imageUrl}
                                        alt="User upload"
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        className="mb-2 rounded max-h-[150px] w-auto h-auto" // afegim h-auto per assegurar el comportament
                                        style={{ height: 'auto', width: 'auto', maxHeight: '150px' }}
                                    />
                                )}
                                <span>{msg.content}</span>
                            </div>
                        </div>
                    ))}
                    <div ref={messageEndRef} />
                </main>

                <footer className="border-t-2 border-gray-300 fixed bottom-0 left-0 w-full bg-white p-4 z-50">
                    <div className="flex items-center space-x-2">
                        {previewUrl ? (
                            <div className="relative">
                                <Image
                                    src={previewUrl}
                                    alt="Preview"
                                    width={40} // equival a h-10 (2.5rem) i w-10 (2.5rem)
                                    height={40}
                                    className="rounded object-cover"
                                    style={{ height: '40px', width: '40px' }} // Si vols forçar-ho més explícitament
                                />
                                <button
                                    onClick={handleRemoveImage}
                                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
                                >
                                    &times;
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowImageModal(true)}
                                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                            >
                                <Camera className="h-6 w-6 text-gray-600" />
                            </button>
                        )}
                        <input
                            type="text"
                            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Escribe tu mensaje..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading}
                            className="p-2 bg-faqblue text-white rounded-full hover:bg-blue-600 disabled:opacity-50"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                            ) : (
                                <Send className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                    {/* --- Mini-modal meteorològic --- */}
                    {currentTemp !== undefined && currentSymbol && (
                        <div className="absolute -top-16 right-4 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center space-x-1">
                            <span className="font-medium text-gray-800">{Math.round(currentTemp)}°C</span>
                            {getWeatherIcon(currentSymbol)}
                        </div>
                    )}
                </footer>

                {showImageModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <ImageUploadModal
                            onFileSelect={onFileSelect}
                            onClose={() => setShowImageModal(false)}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
