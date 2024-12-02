import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { Public as PublicIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import i18n from '../idiomes/i18n'

const LanguageSelector = () => {
    const { i18n } = useTranslation(); // Hook per accedir a la funcionalitat d'idiomes
    const [anchorEl, setAnchorEl] = useState(null); // Estat per al menú desplegable

    // Obre el menú
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Tanca el menú
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Canvia l'idioma
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng); // Funció de canvi d'idioma
        handleMenuClose(); // Tanca el menú després de seleccionar
    };

    return (
        <>
            {/* Botó per obrir el selector d'idioma */}
            <IconButton color="inherit" onClick={handleMenuOpen}>
                <PublicIcon />
            </IconButton>

            {/* Menú desplegable per seleccionar idioma */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
                <MenuItem onClick={() => changeLanguage('es')}>Español</MenuItem>
                <MenuItem onClick={() => changeLanguage('ca')}>Català</MenuItem>
            </Menu>
        </>
    );
};

export default LanguageSelector;
