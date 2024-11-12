// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Box, Typography, AppBar, Toolbar, IconButton, Container, Slide } from "@mui/material";
import { Menu as MenuIcon, Language as LanguageIcon } from "@mui/icons-material";
import ImageUpload from "./components/ImageUpload";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacityPolicy from "./components/PrivacityPolicy";
import About from "./components/About";
import styled from 'styled-components';
import logo from './images/logo_black.png';

// Estilitzem els IconButton per aplicar la font i una mida més petita
const StyledIconButton = styled(IconButton)`
  font-family: 'Playfair Display', serif;
  font-size: 1rem;  // Petita mida per als botons
  padding: 8px;
  margin: 5px;
  &:hover {
    opacity: 0.8;
  }
`;

// Botó especial per al Login
const LoginButton = styled(StyledIconButton)`
  background-color: gray;
  border-radius: 25px;
  padding: 10px 20px;
  color: white;
  text-transform: none;
  &:hover {
    background-color: darkgray;
  }
`;

// Botó especial per al Sign Up
const SignUpButton = styled(StyledIconButton)`
  background-color: black;
  border-radius: 25px;
  padding: 10px 20px;
  color: white;
  text-transform: none;
  &:hover {
    background-color: darkslategray;
  }
`;

function App() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showNavbar, setShowNavbar] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setShowNavbar(prevScrollPos > currentScrollPos || currentScrollPos < 10); // Mostra el navbar si es fa scroll amunt o a la part superior
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos]);

    return (
        <Router>
            <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Roboto', sans-serif" }}>

                {/* Menú superior amb Slide per amagar-lo en scroll */}
                <Slide in={showNavbar} direction="down">
                    <AppBar position="fixed" sx={{ bgcolor: "#f5f5f5", color: "#333" }}> {/* Fons clar i color de text fosc */}
                        <Toolbar sx={{ justifyContent: "space-between" }}>

                            <StyledIconButton component={Link} to="/" color="inherit">Home</StyledIconButton>
                            <StyledIconButton component={Link} to="/about" color="inherit">About</StyledIconButton>
                            <StyledIconButton component={Link} to="/contact" color="inherit">Contact Us</StyledIconButton>

                            {/* Logo a l'esquerra del text */}
                            <img
                                src={logo}
                                alt="Logo"
                                style={{ width: '40px', height: '40px', marginRight: '10px' }}  // Ajusta la mida del logo segons necessiti
                            />

                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    fontFamily: "'Playfair Display', serif",
                                    flexGrow: 1,
                                    textAlign: "center",
                                    color: "#333",
                                }}
                            >
                                Clothy
                            </Typography>

                            <LoginButton component={Link} to="/login" color="inherit">Login</LoginButton>
                            <SignUpButton component={Link} to="/sign-up" color="inherit">Sign Up</SignUpButton>

                            <StyledIconButton color="inherit">
                                <LanguageIcon />
                            </StyledIconButton>
                        </Toolbar>
                    </AppBar>
                </Slide>

                {/* Espai per a desplaçar el contingut per sota de la barra fixa */}
                <Toolbar />

                {/* Rutes */}
                <Container component="main" sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", pt: 3 }}>
                    <Routes>
                        <Route path="/" element={<ImageUpload />} />
                        <Route path="/terms" element={<TermsAndConditions />} />
                        <Route path="/privacy-policy" element={<PrivacityPolicy />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </Container>

                {/* Peu de pàgina */}
                <Box component="footer" sx={{ bgcolor: "primary.main", color: "white", py: 2, textAlign: "center", width: "100%" }}>
                    <Typography variant="body2" sx={{ fontFamily: "'Roboto', sans-serif" }}>
                        © 2025 Clothy -{" "}
                        <Link to="/terms" style={{ color: "white", textDecoration: "underline" }}>
                            Termes d'Ús i Condicions
                        </Link>
                        -{" "}
                        <Link to="/privacy-policy" style={{ color: "white", textDecoration: "underline" }}>
                            Política de Privacitat
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Router>
    );
}

export default App;
