// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter , Route, Routes, Link, Navigate } from "react-router-dom";
import { Box, Typography, AppBar, Toolbar, IconButton, Container, Slide, Snackbar, Alert  } from "@mui/material";
import { Language as LanguageIcon } from "@mui/icons-material";
import { Public as PublicIcon } from "@mui/icons-material";
import ImageUpload from "./components/ImageUpload";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacityPolicy from "./components/PrivacityPolicy";
import CheckBackendConnectionButton from "./components/CheckBackendConnection";
import LoginForm from "./components/LoginForm"; // Importamos el nuevo componente de formulario de login
import SignUpForm from "./components/SignUpForm"; // Importamos el nuevo componente de formulario de login
import SearchClothing from "./components/SearchClothing"; // Importamos el nuevo componente de formulario de login
import ProtectedRoute from "./components/ProtectedRoute"; // Importamos el nuevo componente de formulario de login
import LanguageSelector from "./components/LanguageSelector";
import Contact from "./components/Contact";
import Menu from "./components/Menu"; // Importamos el nuevo componente de formulario de login
import { useNavigate } from 'react-router-dom'; // Important importar useNavigate
import { useTranslation } from 'react-i18next';
import About from "./components/About";
import styled from 'styled-components';
import logo from './images/logo_black.png';

// Botó base estilitzat per aplicar una estètica minimalista
const StyledIconButton = styled(IconButton)`
    && {
        font-family: 'Playfair Display', serif;
        font-size: 16px; // Mida més petita de lletra
        font-weight: 300; // Lletra més prima
        color: #333; // Color del text més subtil
        background-color: transparent; // Fons sempre transparent
        padding: 6px 12px;
        margin: 5px;
        border-radius: 6px;
        text-transform: none; // Evita la capitalització automàtica
        text-decoration: none; // Evita subratllat del text
        box-shadow: none;
        transition: transform 0.2s ease, color 0.2s ease;

        &:hover {
            transform: scale(1.05); // Augment subtil en passar el ratolí
            color: #555; // Liger canvi de color per fer-ho més atractiu
            background-color: transparent; // Manté el fons transparent en hover
            text-decoration: none;
        }
    }
`;

// Botó especial per al Login, amb fons blanc i estètica minimalista
const LoginButton = styled(StyledIconButton)`
    && {
        font-size: 14px; // Mida més petita de lletra
        font-weight: 300;
        background-color: #ffffff !important; // Fons blanc suau
        border-radius: 10px !important; // Cantonades lleugerament arrodonides
        color: #333 !important;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15); // Ombra suau per donar profunditat

        &:hover {
            color: #111 !important;
            background-color: #f9f9f9 !important; // Fons lleugerament més clar en hover
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); // Augment subtil de l’ombra
        }
    }
`;

// Botó especial per al Sign Up, amb fons negre i estil minimalista
const SignUpButton = styled(StyledIconButton)`
    && {
        font-size: 14px; // Mida més petita de lletra
        font-weight: 300;
        background-color: #000000 !important;
        border-radius: 10px !important;
        padding: 6px 16px;
        color: #ffffff !important;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);

        &:hover {
            color: #f1f1f1 !important;
            background-color: #333333 !important; // Lleuger canvi de to en hover
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
        }
    }
`;


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [openSnackbar, setOpenSnackbar] = useState(false); // Estat per la Snackbar
    const { t } = useTranslation();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token); // Comprova si hi ha un token
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Esborra el token
        setIsAuthenticated(false); // Actualitza l'estat
        setOpenSnackbar(true); // Obre el missatge de Snackbar
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setShowNavbar(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos]);

    return (
        <BrowserRouter>
            <Box sx={{  flexDirection: "column", fontFamily: "'Roboto', sans-serif" }}>
                <Slide in={showNavbar} direction="down">
                    <AppBar position="fixed" sx={{ bgcolor: "#f5f5f5", color: "#333" }}>
                        <Toolbar sx={{ justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <StyledIconButton component={Link} to="/" color="inherit">
                                    {t('home')}
                                </StyledIconButton>
                                {isAuthenticated && (
                                    <StyledIconButton component={Link} to="/search" color="inherit">
                                        {t('search_clothing')}
                                    </StyledIconButton>
                                )}
                            </Box>
                            <Box
                                sx={{
                                    position: "absolute",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <img src={logo} alt="Logo" style={{ width: "40px", height: "40px", marginRight: "10px" }} />
                                <Typography variant="h5" component="div" sx={{ fontFamily: "'Playfair Display', serif", color: "#333" }}>
                                    Clothy
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                {isAuthenticated ? (
                                    <StyledIconButton onClick={handleLogout} component={Link} to="/" color="inherit">
                                        {t('logout')}
                                    </StyledIconButton>
                                ) : (
                                    <>
                                        <LoginButton component={Link} to="/login" color="inherit">
                                            {t('login')}
                                        </LoginButton>
                                        <SignUpButton component={Link} to="/sign-up" color="inherit">
                                            {t('signup')}
                                        </SignUpButton>
                                    </>
                                )}
                                <Snackbar
                                    open={openSnackbar}
                                    autoHideDuration={3000}
                                    onClose={() => setOpenSnackbar(false)}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                >
                                    <Alert severity="error" sx={{ bgcolor: "#d4edda", color: "#155724", fontSize: "16px", borderRadius: "8px" }}>
                                        {t('session_closed')}
                                    </Alert>
                                </Snackbar>
                                <StyledIconButton color="inherit">
                                    <LanguageSelector />
                                </StyledIconButton>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Slide>
                <Toolbar />
                <Container component="main"
                           sx={{ minHeight: "100vh", p: 0, m: 0 }}
                           maxWidth={false}>
                    <Routes>
                        <Route path="/" element={<Menu />} />
                        <Route path="/terms" element={<TermsAndConditions />} />
                        <Route path="/privacy-policy" element={<PrivacityPolicy />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />                        
                        <Route path="/sign-up" element={<SignUpForm />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route
                            path="/search"
                            element={
                                <ProtectedRoute setIsAuthenticated={setIsAuthenticated}>
                                    {isAuthenticated && (
                                        <>
                                            <SearchClothing /> {/* Component de cerca */}
                                        </>
                                    )}
                                </ProtectedRoute>
                            }
                        />

                    </Routes>
                </Container>
                <Box
                    component="footer"
                    sx={{
                        bgcolor: "#f5f5f5",
                        color: "black",
                        py: 2,
                        textAlign: "center",
                        width: "100%",
                        borderTop: "1px solid rgba(0, 0, 0, 0.2)", // Línia superior semitransparent
                    }}
                >
                    <Typography variant="body2" sx={{ fontFamily: "'Playfair Display', serif" }}>
                        © 2025 Clothy -{" "}
                        <Link to="/terms" style={{ color: "black", textDecoration: "underline" }}>
                            {t('terms_and_conditions')}
                        </Link>
                        {" - "}
                        <Link to="/privacy-policy" style={{ color: "black", textDecoration: "underline" }}>
                            {t('privacy_policy')}
                        </Link>
                        {" - "}
                        <Link to="/about" style={{ color: "black", textDecoration: "underline" }}>
                            {t('about')}
                        </Link>
                        {" - "}
                        <Link to="/contact" style={{ color: "black", textDecoration: "underline" }}>
                            {t('contact')}
                        </Link>
                    </Typography>

                </Box>

            </Box>
        </BrowserRouter>
    );
}
export default App;
