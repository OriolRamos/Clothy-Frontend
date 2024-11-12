// src/components/PrivacityPolicy.js
import React from "react";
import { Container, Typography } from "@mui/material";

const PrivacityPolicy = () => {
    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: "'Playfair Display', serif" }}>
                Política de Privacitat de Clothy
            </Typography>

            <Typography variant="body1" paragraph sx={{ fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                Data d’efectivitat: 13/03/2024
            </Typography>

            <Typography variant="body1" paragraph sx={{ fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                La teva privacitat i la seguretat de les dades són molt importants per a nosaltres. Ens comprometem a gestionar, protegir i utilitzar la teva informació personal de manera responsable.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Playfair Display', serif" }}>
                1. Quina informació personal recollim i com la utilitzem
            </Typography>

            <Typography variant="body1" paragraph sx={{ fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                <strong>Propòsit:</strong> Per permetre l’ús de la nostra plataforma i proporcionar-te informació sobre els nostres serveis. <br />
                <strong>Tipus d’informació recollida:</strong> Imatges penjades pels usuaris i informació tècnica del dispositiu (com tipus de dispositiu, sistema operatiu, etc.).
            </Typography>

            <Typography variant="body1" paragraph sx={{ fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                <strong>Propòsit:</strong> Per millorar l'eficàcia de la IA en la cerca de referències de roba i analitzar els resultats. <br />
                <strong>Tipus d’informació recollida:</strong> Les imatges carregades i les cerques realitzades es poden emmagatzemar temporalment per a l’entrenament de la IA, sempre en format anonimitzat i sense cap identificador associat.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Playfair Display', serif" }}>
                2. Base legal per al tractament de les dades personals
            </Typography>

            <Typography variant="body1" paragraph sx={{ fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                La base legal per al tractament de dades inclou: la necessitat de processar dades per proporcionar el servei; l’interès legítim de millorar la IA i el servei; i, en alguns casos, el teu consentiment. Pots retirar el teu consentiment en qualsevol moment, si bé això pot afectar l’ús de determinades funcionalitats.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Playfair Display', serif" }}>
                3. Els teus drets
            </Typography>

            <Typography variant="body1" paragraph sx={{ fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                Tens dret a retirar el consentiment, accedir i rectificar les teves dades, sol·licitar el dret a l’oblit, restringir el tractament i la portabilitat de les dades. Per exercir aquests drets, posa’t en contacte amb nosaltres.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Playfair Display', serif" }}>
                4. Privacitat de Menors
            </Typography>

            <Typography variant="body1" paragraph sx={{ fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                Aquest servei no està destinat a menors de 13 anys. Si un menor de 13 anys ens ha proporcionat informació, la eliminarem immediatament. Si ets el pare, mare o tutor legal i tens coneixement que el teu fill ens ha proporcionat informació personal, contacta amb nosaltres.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Playfair Display', serif" }}>
                5. Galetes i tecnologies similars
            </Typography>

            <Typography variant="body1" paragraph sx={{ fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                Utilitzem galetes per millorar la teva experiència a la nostra plataforma. Les galetes tècniques són necessàries per al funcionament de la web, mentre que les galetes analítiques es col·loquen amb el teu consentiment.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Playfair Display', serif" }}>
                6. Canvis en la Política
            </Typography>

            <Typography variant="body1" paragraph sx={{ fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                Ens reservem el dret de modificar aquesta Política de Privacitat en qualsevol moment. En cas de modificacions substancials, t’informarem de manera destacada abans que el canvi entri en vigor.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Playfair Display', serif" }}>
                7. Contacte
            </Typography>

            <Typography variant="body1" paragraph sx={{ fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                Si tens preguntes o dubtes sobre la Política de Privacitat, pots contactar amb nosaltres a través de <a href="mailto:email@example.com">email@example.com</a>.
            </Typography>
        </Container>
    );
};

export default PrivacityPolicy;
