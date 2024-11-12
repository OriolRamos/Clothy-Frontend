// src/components/TermsAndConditions.js
import React from "react";
import { Container, Typography } from "@mui/material";

const TermsAndConditions = () => {
    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: "'Playfair Display', serif" }}>
                Termes d'Ús i Condicions
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                Benvingut a Clothy! Aquests termes i condicions regulen l’ús d’aquesta web. En accedir-hi, acceptes complir amb aquests termes.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Playfair Display', serif" }}>
                1. Ús Acceptable
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                El contingut d’aquesta web és per a ús personal i no comercial. Està prohibit copiar, distribuir o modificar el contingut sense permís.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Playfair Display', serif" }}>
                2. Privacitat
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                Ens comprometem a protegir la privacitat dels nostres usuaris. Consulta la nostra política de privacitat per a més informació.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Playfair Display', serif" }}>
                3. Limitació de Responsabilitat
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                Clothy no es fa responsable de danys derivats de l’ús d’aquesta web o de la impossibilitat d’ús.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Playfair Display', serif" }}>
                4. Modificació dels Termes
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                Reservem el dret de modificar aquests termes en qualsevol moment. És responsabilitat de l’usuari revisar-los periòdicament.
            </Typography>
        </Container>
    );
};

export default TermsAndConditions;
