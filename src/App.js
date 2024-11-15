// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Box, Typography, AppBar, Toolbar, IconButton, Container, Slide } from "@mui/material";
import { Language as LanguageIcon } from "@mui/icons-material";
import { Public as PublicIcon } from "@mui/icons-material";
import ImageUpload from "./components/ImageUpload";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacityPolicy from "./components/PrivacityPolicy";
import LoginForm from "./components/LoginForm"; // Importamos el nuevo componente de formulario de login
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
    const [showNavbar, setShowNavbar] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

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
        <Router>
            <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Roboto', sans-serif" }}>
                <Slide in={showNavbar} direction="down">
                    <AppBar position="fixed" sx={{ bgcolor: "#f5f5f5", color: "#333" }}>
                        <Toolbar sx={{ justifyContent: "space-between" }}>
                            <StyledIconButton component={Link} to="/" color="inherit">Home</StyledIconButton>
                            <StyledIconButton component={Link} to="/about" color="inherit">About</StyledIconButton>
                            <StyledIconButton component={Link} to="/contact" color="inherit">Contact Us</StyledIconButton>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                                <img src={logo} alt="Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                                <Typography variant="h5" component="div" sx={{
                                    fontFamily: "'Playfair Display', serif",
                                    color: "#333",
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                    Clothy
                                </Typography>
                            </Box>

                            <LoginButton component={Link} to="/login" color="inherit">Login</LoginButton>
                            <SignUpButton component={Link} to="/sign-up" color="inherit">Sign Up</SignUpButton>
                            <StyledIconButton color="inherit">
                                <PublicIcon />
                            </StyledIconButton>
                        </Toolbar>
                    </AppBar>
                </Slide>
                <Toolbar />
                <Container component="main" sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", pt: 3 }}>
                    <Routes>
                        <Route path="/" element={<ImageUpload />} />
                        <Route path="/terms" element={<TermsAndConditions />} />
                        <Route path="/privacy-policy" element={<PrivacityPolicy />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<LoginForm />} /> {/* Nueva ruta para login */}
                        <Route path="/sign-up" element={<LoginForm />} /> {/* Puedes reutilizar el mismo componente */}
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
                            Termes d'Ús i Condicions
                        </Link>
                        {" - "}
                        <Link to="/privacy-policy" style={{ color: "black", textDecoration: "underline" }}>
                            Política de Privacitat
                        </Link>
                    </Typography>
                </Box>

            </Box>
        </Router>
    );
}

export default App;
