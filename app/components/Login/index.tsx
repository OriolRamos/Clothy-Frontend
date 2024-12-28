"use client";

import Image from "next/image";

const Login = () => {
    return (
        <div className="relative h-screen flex items-center bg-gray-100">
            {/* Contenidor principal */}
            <div className="absolute inset-0 lg:grid grid-cols-2">
                {/* Columna de la imatge */}
                <div className="relative h-full hidden lg:block">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-400 to-blue-600 clip-path-diagonal">
                        <Image
                            src="/images/login.png"
                            alt="Imagen de login"
                            layout="fill"
                            objectFit="cover"
                            className="opacity-90"
                        />
                    </div>
                </div>

                {/* Columna del formulari */}
                <div className="relative flex justify-center items-center">
                    <div className="rounded-2xl p-10 w-full max-w-lg">
                        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
                            Inicia sesión en tu cuenta
                        </h2>
                        <form className="space-y-6">
                            {/* Input de Usuario/Correo */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Usuario o correo electrónico
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="usuario@ejemplo.com"
                                />
                            </div>

                            {/* Input de Contraseña */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                    className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="••••••••"
                                />
                            </div>

                            {/* Botón de Login */}
                            <button
                                type="submit"
                                className="w-full bg-teal-400 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-teal-500 transition-colors"
                            >
                                Iniciar sesión
                            </button>

                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <hr className="flex-grow border-t border-gray-300" />
                            <span className="px-4 text-sm text-gray-500">O</span>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>

                        {/* Botón de Google */}
                        <button
                            className="flex items-center justify-center bg-teal-400 text-white py-3 px-6 rounded-lg w-full shadow-lg hover:bg-teal-500 transition-colors"
                        >
                            <svg
                                className="h-5 w-5 mr-3"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M21.35 11.1h-9.25v2.8h5.65c-.4 2.3-2.4 4-5.65 4-3.35 0-6.1-2.7-6.1-6s2.75-6 6.1-6c1.55 0 2.9.6 3.95 1.5l2.05-2.05C18.3 3.85 15.9 3 13.4 3 7.95 3 3.5 7.45 3.5 12.95S7.95 23 13.4 23c5.35 0 9.55-4.1 9.55-9.55 0-.55-.05-1.1-.15-1.65z" />
                            </svg>
                            Iniciar sesión con Google
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
