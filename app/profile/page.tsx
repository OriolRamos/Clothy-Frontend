"use client";
import React, { useState, useEffect } from "react";
import SessionExpiredModal from "../components/SessionExpiredModal/index"; // Importem el modal
import {useAuth} from "../components/AuthContext/index";
import SuccesModal from "../components/Notifications/SuccesModal";
import ErrorModal from "../components/Notifications/ErrorModal";


const UserProfile = () => {
    const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);
    const { fetchWithAuth } = useAuth();
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "********",
        fullName: "",
        birthDate: "",
        gender: "",
        height: "",
        weight: "",
        location: "",
        country: "",
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetchWithAuth(`${apiUrl}/users/profile`, {
                    method: "GET",
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Dades del perfil de l'usuari:", data);
                    // Actualitza les dades de l'usuari amb la resposta de l'API
                    setUserData((prevData) => ({
                        username: data.username || prevData.username,
                        email: data.email || prevData.email,
                        password: data.password || prevData.password, // Afegir la propietat password
                        fullName: data.fullName || prevData.fullName,
                        birthDate: data.birthDate || prevData.birthDate,
                        gender: data.gender || prevData.gender,
                        height: data.height || prevData.height,
                        weight: data.weight || prevData.weight,
                        location: data.location || prevData.location,
                        country: data.country || prevData.country,
                    }));
                    // Aquí pots actualitzar l'estat amb les dades del perfil
                } else {
                    throw new Error("Error obtenint el perfil de l'usuari.");
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, [fetchWithAuth]); // Dependència de fetchWithAuth per assegurar la coherència



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const [isSucessModalOpen, setIsSucessModalOpen] = useState(false); // Estat per controlar el modal

    // Funció per tancar el modal
    const handleCloseSucessModal = () => {
        setIsSucessModalOpen(false);
    };

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // Estat per controlar el modal

    // Funció per tancar el modal
    const handleCloseErrorModal = () => {
        setIsErrorModalOpen(false);
    };

    const saveChanges = () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        // Prepara les dades per enviar-les al backend
        const profileData = {
            email: userData.email, // L'email sempre s'ha d'enviar
            username: userData.username || null,  // Si username és null o undefined, enviar null
            fullName: userData.fullName || null,  // Si fullName és null o undefined, enviar null
            birthDate: userData.birthDate || null,  // Si birthDate és null o undefined, enviar null
            gender: userData.gender || null,  // Si gender és null o undefined, enviar null
            height: userData.height ? parseFloat(userData.height) : null,  // Si height és null o undefined, enviar null (i assegurar que és un número)
            weight: userData.weight ? parseFloat(userData.weight) : null,  // Si weight és null o undefined, enviar null (i assegurar que és un número)
            location: userData.location || null,  // Si location és null o undefined, enviar null
            country: userData.country || null,  // Si country és null o undefined, enviar null
        };

        console.log("Dades enviades", profileData);

        // Realitzar la petició PUT
        fetch(`${apiUrl}/users/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profileData),
        })
            .then((response) => {
                if (response.ok) {
                    // Mostrar el modal de success quan el perfil s'actualitza correctament
                    setIsSucessModalOpen(true);
                } else {
                    return response.json().then((data) => {
                        throw new Error(data.detail || "Error desconocido al actualizar el perfil.");
                    });
                }
            })
            .catch((error) => {
                console.error("Error al actualizar el perfil:", error);
                alert("Error al actualizar el perfil.");
            });
    };

    return (
        <div className="text-gray-900 min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 py-6">
                <div className="max-w-7xl mx-auto text-center text-black">
                    <h1 className="text-4xl font-extrabold">Perfil de Usuario</h1>
                    <p className="mt-2 text-lg">Personaliza tu experiencia y mejora las búsquedas.</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 bg-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg p-8 bg-gray-100 shadow-lg">
                        <h2 className="text-3xl font-semibold text-blue-600 mb-6">Información Personal</h2>

                        {/* Username */}
                        <div className="mb-6">
                            <label className="block text-lg font-medium text-gray-700">Nombre de usuario</label>
                            <input
                                type="text"
                                name="username"
                                value={userData.username}
                                onChange={handleInputChange}
                                className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-6">
                            <label className="block text-lg font-medium text-gray-700">Correo electrónico</label>
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                disabled
                                className="mt-2 p-3 border border-gray-300 rounded-md w-full bg-gray-200"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-6">
                            <label className="block text-lg font-medium text-gray-700">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                value={userData.password}
                                disabled
                                className="mt-2 p-3 border border-gray-300 rounded-md w-full bg-gray-200"
                            />
                            <p className="text-sm text-gray-500 mt-1">Haz clic <a href="/change-password" className="text-blue-600 underline">aquí</a> para cambiarla.</p>
                        </div>

                        {/* Optional Fields */}
                        <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-6">Opciones adicionales</h2>
                        {/* Informative Text Below Optional Fields */}
                        <p className="mt-6 text-sm text-gray-500 italic">
                            Compartir estas opciones adicionales nos ayuda a conocerte mejor y a personalizar tu experiencia,
                            mejorando las búsquedas y recomendaciones según tus preferencias. ¡Gracias por compartir con nosotros!
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div>
                                <label className="block text-lg font-medium text-gray-700">Nombre completo</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={userData.fullName}
                                    onChange={handleInputChange}
                                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                                />
                            </div>

                            {/* Birth Date */}
                            <div>
                                <label className="block text-lg font-medium text-gray-700">Fecha de nacimiento</label>
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={userData.birthDate}
                                    onChange={handleInputChange}
                                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                                />
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="block text-lg font-medium text-gray-700">Género</label>
                                <select
                                    name="gender"
                                    value={userData.gender}
                                    onChange={handleInputChange}
                                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="male">Hombre</option>
                                    <option value="female">Mujer</option>
                                    <option value="non-binary">No binario</option>
                                </select>
                            </div>

                            {/* Height */}
                            <div>
                                <label className="block text-lg font-medium text-gray-700">Altura (cm)</label>
                                <input
                                    type="number"
                                    name="height"
                                    value={userData.height}
                                    onChange={handleInputChange}
                                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                                />
                            </div>

                            {/* Weight */}
                            <div>
                                <label className="block text-lg font-medium text-gray-700">Peso (kg)</label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={userData.weight}
                                    onChange={handleInputChange}
                                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-lg font-medium text-gray-700">Ubicación (Ciudad)</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={userData.location}
                                    onChange={handleInputChange}
                                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                                />
                            </div>

                            {/* Country */}
                            <div>
                                <label className="block text-lg font-medium text-gray-700">País</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={userData.country}
                                    onChange={handleInputChange}
                                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                                />
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="mt-12 text-center">
                            <button
                                onClick={saveChanges}
                                className="bg-blue-600 text-black px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700"
                            >
                                Guardar cambios
                            </button>
                        </div>
                        {/* Aquí cridem el SuccessModal, passan-li el missatge i el temps que es mantindrà obert */}
                        <SuccesModal
                            isOpen={isSucessModalOpen}
                            onClose={handleCloseSucessModal}
                            text="¡Perfil actualizado correctamente!"
                            duration={5} // El modal es tancarà automàticament després de 5 segons
                        />

                        <ErrorModal
                            isOpen={isErrorModalOpen}
                            onClose={handleCloseErrorModal}
                            text="Error actualizando el perfil"
                            duration={5} // El modal es tancarà automàticament després de 5 segons
                        />

                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserProfile;
