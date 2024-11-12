// src/components/About.js
import React from "react";
import { Container, Typography } from "@mui/material";

const About = () => {
    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: "'Playfair Display', serif" }}>
                Sobre Nosaltres
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                Clothy és una plataforma innovadora creada per transformar la manera com els usuaris interactuen amb les imatges a través de la nostra aplicació senzilla i eficient.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                El nostre equip està dedicat a proporcionar una experiència d'usuari excel·lent, amb una interfície moderna i funcional.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                Amb l'objectiu de crear una comunitat d'usuaris activa, oferim eines útils per gestionar i compartir contingut visual de manera eficient i segura.
            </Typography>
        </Container>
    );
};

export default About;
