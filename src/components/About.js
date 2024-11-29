import React from "react";
import { Container, Typography, Box } from "@mui/material";

const About = () => {
    return (
        <Container sx={{ mt: 6, mb: 6, p: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}>
            <Typography
                variant="h3"
                gutterBottom
                sx={{ fontFamily: "'Playfair Display', serif", color: "#2c3e50", textAlign: "center" }}
            >
                Sobre Nosaltres
            </Typography>

            <Typography
                variant="body1"
                paragraph
                sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify", mt: 2 }}
            >
                A <strong>Clothy</strong>, creiem que la moda no és només roba. És una manera d’expressar qui som, d’imaginar el món tal
                com volem que sigui i de connectar amb els altres. Amb aquest somni al cor, vam fundar Clothy: una plataforma nascuda per
                redissenyar el futur de la moda, fer-la més accessible, inclusiva i sostenible per a tothom.
            </Typography>

            <Box sx={{ mt: 4, p: 2, bgcolor: "#eef2f7", borderRadius: 2 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    La nostra història
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif', color: '#555'", textAlign: "justify" }}
                >
                    Tot va començar amb una pregunta senzilla: *“Com podem ajudar la gent a trobar peces de roba que realment s’adaptin a
                    la seva visió i estil?”*. Inspirats per la rapidesa amb què la tecnologia està canviant el món, vam decidir combinar
                    la intel·ligència artificial amb la creativitat humana per construir una eina única: una que permeti als usuaris
                    trobar roba basada en imatges d’una manera intuïtiva i personalitzada.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    La nostra visió
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    La nostra missió va més enllà de l’estil o la comoditat. A Clothy, somiem amb un futur on la moda sigui un reflex del
                    canvi que volem veure en el món: un futur més sostenible, inclusiu i connectat. Volem oferir als usuaris les eines per
                    trobar roba que no només els representi, sinó que també respecti el planeta.
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    Creiem que la moda pot ser un motor de canvi positiu. Amb Clothy, estem fent els primers passos per construir una
                    comunitat global on l’estil, la tecnologia i els valors humans convergeixin.
                </Typography>
            </Box>

            <Box sx={{ mt: 4, p: 2, bgcolor: "#eef2f7", borderRadius: 2 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    Compromesos amb els nostres usuaris
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    Els nostres usuaris són el centre de tot el que fem. Cada funcionalitat, cada decisió i cada millora està pensada per
                    oferir una experiència que compleixi amb les seves necessitats i superi les seves expectatives. A través dels vostres
                    comentaris i suggeriments, ens comprometem a evolucionar i construir una plataforma que realment faci la diferència.
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    Construïm el futur junts
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    Aquest és només el començament. La nostra visió a llarg termini inclou projectes com crear un cercador de moda més
                    sostenible, integració amb marques locals i fins i tot eines que ajudin a reduir l’excés de consum en la indústria de
                    la roba. Tot això amb un únic objectiu: ajudar-te a trobar el teu estil mentre ajudem el món a trobar el seu equilibri.
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif', color: '#555'", textAlign: "justify" }}
                >
                    Gràcies per formar part d’aquest viatge. Amb Clothy, redefinim la moda, junts.
                </Typography>
            </Box>
        </Container>
    );
};

export default About;
