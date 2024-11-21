import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../images/logo_black.png";

// Botons estilitzats amb interactivitat
const StyledButton = styled(Button)`
  && {
    font-family: "Playfair Display", serif;
    font-size: 18px;
    font-weight: 400;
    color: #ffffff;
    background-color: #000000;
    padding: 12px 24px;
    border-radius: 8px;
    text-transform: none;
    transition: all 0.3s ease;

    &:hover {
      background-color: #444444;
      transform: scale(1.05);
    }
  }
`;

const OutlineButton = styled(Button)`
  && {
    font-family: "Playfair Display", serif;
    font-size: 18px;
    font-weight: 400;
    color: #000000;
    background-color: transparent;
    border: 2px solid #000000;
    padding: 12px 24px;
    border-radius: 8px;
    text-transform: none;
    transition: all 0.3s ease;

    &:hover {
      background-color: #f0f0f0;
      transform: scale(1.05);
    }
  }
`;

function Menu() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                textAlign: "center",
                bgcolor: "#ffffff",
                color: "#333",
                px: 4,
                py: 6,
                backgroundImage: "url('/path-to-background-image.jpg')", // Pots afegir una imatge de fons subtil
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Encapçalament */}
            <Box
                sx={{
                    mt: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <img src={logo} alt="Logo Clothy" style={{ width: "100px", marginBottom: "20px" }} />
                <Typography
                    variant="h2"
                    sx={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        color: "#000000",
                        mb: 2,
                    }}
                >
                    Clothy
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: "'Roboto', sans-serif",
                        color: "#555555",
                        maxWidth: "600px",
                    }}
                >
                    Redissenyant la manera de viure la moda. Simple, sostenible i personalitzat.
                </Typography>
            </Box>

            {/* Missatges principals */}
            <Box sx={{ mt: 6, maxWidth: "800px" }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: "'Roboto', sans-serif",
                        fontWeight: 500,
                        mb: 4,
                    }}
                >
                    La nostra primera implementació
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        fontFamily: "'Roboto', sans-serif",
                        color: "#666666",
                        lineHeight: "1.8",
                        mb: 4,
                    }}
                >
                    Amb Clothy pots carregar una imatge d’una peça de roba i la nostra intel·ligència
                    artificial et mostrarà opcions similars de diverses marques perquè puguis adquirir-les
                    fàcilment. Això és només el principi. Estem treballant en nous productes i serveis que
                    et sorprendran.
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        fontFamily: "'Roboto', sans-serif",
                        color: "#666666",
                        lineHeight: "1.8",
                    }}
                >
                    Si tens alguna idea o vols col·laborar, contacta amb el nostre equip de suport. Nosaltres
                    dissenyem per la comunitat, perquè volem construir un futur millor junts.
                </Typography>
            </Box>

            {/* Botons */}
            <Box sx={{ mt: 6, display: "flex", gap: 2 }}>
                <StyledButton component={Link} to="/sign-up">
                    Registra't
                </StyledButton>
                <OutlineButton component={Link} to="/login">
                    Inicia Sessió
                </OutlineButton>
            </Box>

            {/* Nota beta */}
            <Typography
                variant="caption"
                sx={{
                    fontFamily: "'Roboto', sans-serif",
                    color: "#888888",
                    mt: 8,
                }}
            >
                Clothy està en fase beta. Prova la nostra plataforma i ajuda’ns a millorar.
            </Typography>
        </Box>
    );
}

export default Menu;
