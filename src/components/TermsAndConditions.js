import React from "react";
import { Container, Typography, Box, Link } from "@mui/material";

const TermsAndConditions = () => {
    return (
        <Container sx={{ mt: 6, mb: 6, p: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}>
            <Typography
                variant="h3"
                gutterBottom
                sx={{ fontFamily: "'Playfair Display', serif", color: "#2c3e50", textAlign: "center" }}
            >
                Termes d'Ús i Condicions
            </Typography>
            <Typography
                variant="body1"
                paragraph
                sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify", mb: 2 }}
            >
                Benvingut a <strong>Clothy</strong>. Ens alegra que confiïs en nosaltres per explorar la moda d’una manera única i innovadora. Aquí trobaràs tota la informació sobre com funciona la nostra plataforma, com gestionem les teves dades i què esperem de tu com a usuari. La transparència és la nostra prioritat, i complim rigorosament amb la normativa europea vigent.
            </Typography>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    1. Ús Acceptable
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    Clothy està dissenyada per a ús personal i no comercial. Està estrictament prohibit:
                </Typography>
                <ul style={{ paddingLeft: "1.5rem", fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                    <li>Copiar, distribuir o modificar cap contingut de la plataforma sense autorització escrita.</li>
                    <li>Intentar accedir al codi font o manipular els algoritmes d’IA.</li>
                    <li>Utilitzar la plataforma per a activitats il·lícites o que infringeixin drets de tercers.</li>
                </ul>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    2. Privacitat i Protecció de Dades (GDPR)
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    A Clothy, seguim estrictament el <strong>Reglament General de Protecció de Dades (GDPR)</strong>. Les dades personals que ens proporciones s'utilitzen exclusivament per oferir-te un millor servei. A continuació, destaquem els punts principals:
                </Typography>
                <ul style={{ paddingLeft: "1.5rem", fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                    <li>Només recopilem dades necessàries, com la teva imatge per buscar roba similar.</li>
                    <li>No compartim les teves dades amb tercers sense el teu consentiment explícit.</li>
                    <li>Pots sol·licitar accedir, modificar o eliminar les teves dades en qualsevol moment.</li>
                </ul>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif', color: '#555'", textAlign: "justify" }}
                >
                    Consulta la nostra <Link href="/privacy-policy" sx={{ color: "#2980b9" }}>Política de Privacitat</Link> per a més informació.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    3. Ús de les Imatges
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    Quan puges una imatge a Clothy, aquesta només s’utilitza amb la finalitat de buscar peces de roba similars i millorar el nostre algoritme d’IA. Garantim que:
                </Typography>
                <ul style={{ paddingLeft: "1.5rem", fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                    <li>Les teves imatges es processen de manera segura i no es comparteixen amb cap entitat externa.</li>
                    <li>Les imatges no s'emmagatzemen indefinidament; les eliminem automàticament després d’un període definit.</li>
                    <li>Pots sol·licitar l’eliminació immediata de qualsevol imatge pujada.</li>
                </ul>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    4. Limitació de Responsabilitat
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    Tot i que fem tot el possible per mantenir un servei segur i fiable, Clothy no es fa responsable de:
                </Typography>
                <ul style={{ paddingLeft: "1.5rem", fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                    <li>Errors tècnics o interrupcions temporals en el servei.</li>
                    <li>Resultats inexactes en la cerca de peces similars.</li>
                    <li>Qualsevol mal ús de la plataforma per part dels usuaris.</li>
                </ul>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    5. Modificació dels Termes
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    Ens reservem el dret de modificar aquests termes i condicions per adaptar-nos a noves necessitats legals o tecnològiques. Sempre que realitzem canvis importants, t’ho notificarem prèviament. Recomanem revisar periòdicament aquesta pàgina per estar-ne informat.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    6. Contacte i Suport
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    Si tens qualsevol dubte, preocupació o suggeriment sobre aquests termes, no dubtis a contactar-nos a través del nostre{" "}
                    <Link href="/contact" sx={{ color: "#2980b9" }}>formulari de contacte</Link> o enviant un correu electrònic a{" "}
                    <Link href="mailto:support@clothy.com" sx={{ color: "#2980b9" }}>support@clothy.com</Link>. Estem aquí per ajudar-te i escoltar-te!
                </Typography>
            </Box>
        </Container>
    );
};

export default TermsAndConditions;
