'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';
import { GlobeAltIcon } from '@heroicons/react/24/solid';

const languages = [
    { code: 'en', label: 'English' },
    { code: 'ca', label: 'Català' },
    { code: 'es', label: 'Español' },
    { code: 'ar', label: 'العربية' }, // Àrab
    { code: 'bn', label: 'বাংলা' }, // Bengalí
    { code: 'ch', label: '中文' }, // Xinès (Chino)
    { code: 'fr', label: 'Français' }, // Francès
    { code: 'hi', label: 'हिन्दी' }, // Hindi
    { code: 'ja', label: '日本語' }, // Japonès
    { code: 'ko', label: '한국어' }, // Coreà
    { code: 'pt', label: 'Português' }, // Portuguès
    { code: 'ru', label: 'Русский' }, // Rus
    { code: 'tr', label: 'Türkçe' } // Turc
];

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation(); // Acceder a i18n
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || 'en'); // Estado inicial

    // Cambiar el idioma y guardar la preferencia
    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language); // Cambiar idioma
        setSelectedLanguage(language); // Actualizar estado
        localStorage.setItem('language', language); // Guardar preferencia en localStorage
    };

    // Cargar el idioma guardado al montar el componente
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') || 'en';
        i18n.changeLanguage(savedLanguage); // Cambiar idioma al guardado
        setSelectedLanguage(savedLanguage); // Actualizar estado
    }, [i18n]);

    return (
        <div className="relative">
            <Menu>
                <MenuHandler>
                    <button
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
                        title="Change language"
                    >
                        <GlobeAltIcon className="h-6 w-6 text-gray-800" />
                        <span className="hidden md:block">
                            {languages.find((lang) => lang.code === selectedLanguage)?.label}
                        </span>
                    </button>
                </MenuHandler>
                <MenuList className="z-50" {...({} as any)}> {/* Asegúrate de que el menú esté por encima de otros elementos */}
                    {languages.map(({ code, label }) => (
                        <MenuItem
                            key={code}
                            onClick={() => changeLanguage(code)}
                            className={`cursor-pointer ${
                                selectedLanguage === code ? 'font-bold text-blue-500' : ''
                            }`}
                            {...({} as any)}
                        >
                            {label}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </div>
    );
};

export default LanguageSwitcher;