import React from "react";
import { Container, Typography, Box, Link } from "@mui/material";

const PrivacyPolicy = () => {
    return (
        <Container sx={{ mt: 6, mb: 6, p: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}>
            <Typography
                variant="h3"
                gutterBottom
                sx={{ fontFamily: "'Playfair Display', serif", color: "#2c3e50", textAlign: "center" }}
            >
                Política de Privacitat de Clothy
            </Typography>

            <Typography
                variant="body1"
                paragraph
                sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify", mb: 2 }}
            >
                Data d’efectivitat: 13/03/2024
            </Typography>

            <Typography
                variant="body1"
                paragraph
                sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
            >
                A <strong>Clothy</strong>, la teva privacitat és la nostra prioritat. Ens comprometem a protegir les teves dades personals
                i a complir amb el <strong>Reglament General de Protecció de Dades (GDPR)</strong>. Aquí t’expliquem com recopilem,
                utilitzem i protegim la teva informació.
            </Typography>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    1. Quina informació recopilem i com la fem servir
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    Recopilem informació necessària per oferir el nostre servei i millorar-lo contínuament. Això inclou:
                </Typography>
                <ul style={{ paddingLeft: "1.5rem", fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                    <li>
                        <strong>Imatges penjades:</strong> Les utilitzem per cercar peces similars amb la nostra IA. Aquestes imatges
                        s’elaboren de manera anonimitzada i s’eliminen després d’un període curt.
                    </li>
                    <li>
                        <strong>Informació tècnica:</strong> Com el tipus de dispositiu, sistema operatiu i dades d’ús per optimitzar la
                        nostra plataforma.
                    </li>
                </ul>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    2. Base legal pel tractament de dades
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    La base legal per tractar les teves dades es basa en:
                </Typography>
                <ul style={{ paddingLeft: "1.5rem", fontFamily: "'Roboto', sans-serif', color: '#555'" }}>
                    <li>El teu consentiment explícit, quan ens autoritzes a utilitzar les teves imatges.</li>
                    <li>La necessitat de processar dades per oferir el servei que sol·licites.</li>
                    <li>L’interès legítim de millorar el rendiment de la nostra plataforma i IA.</li>
                </ul>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    Pots retirar el teu consentiment en qualsevol moment contactant-nos.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    3. Els teus drets segons el GDPR
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    Segons el GDPR, tens dret a:
                </Typography>
                <ul style={{ paddingLeft: "1.5rem", fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                    <li><strong>Accedir:</strong> Pots sol·licitar veure les dades que tenim sobre tu.</li>
                    <li><strong>Rectificar:</strong> Pots corregir dades incorrectes o incompletes.</li>
                    <li><strong>Eliminar:</strong> Pots sol·licitar que eliminem les teves dades.</li>
                    <li>
                        <strong>Restricció:</strong> Pots limitar com processem les teves dades en determinades circumstàncies.
                    </li>
                    <li><strong>Portabilitat:</strong> Tens dret a rebre les teves dades en un format electrònic.</li>
                </ul>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    Per exercir qualsevol d’aquests drets, envia’ns un correu a <Link href="mailto:support@clothy.com" sx={{ color: "#2980b9" }}>support@clothy.com</Link>.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    4. Privacitat de menors
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    El nostre servei no està destinat a menors de 13 anys. Si descobreixes que un menor ens ha proporcionat dades, contacta’ns immediatament i prendrem les mesures necessàries per eliminar-les.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    5. Galetes i tecnologies similars
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    Utilitzem galetes per millorar la teva experiència a Clothy:
                </Typography>
                <ul style={{ paddingLeft: "1.5rem", fontFamily: "'Roboto', sans-serif', color: '#555'" }}>
                    <li>
                        <strong>Galetes tècniques:</strong> Necessàries per al funcionament bàsic de la plataforma.
                    </li>
                    <li>
                        <strong>Galetes analítiques:</strong> Amb el teu consentiment, per analitzar l’ús i millorar els nostres serveis.
                    </li>
                </ul>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    Pots gestionar les galetes des de la configuració del teu navegador.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    6. Canvis en la Política de Privacitat
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    Ens reservem el dret a actualitzar aquesta política en qualsevol moment. Notificarem qualsevol canvi important abans que sigui efectiu.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    7. Contacte
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    Per dubtes o consultes, pots escriure’ns a <Link href="mailto:support@clothy.com" sx={{ color: "#2980b9" }}>support@clothy.com</Link>.
                </Typography>
            </Box>
        </Container>
    );
};

export default PrivacyPolicy;
