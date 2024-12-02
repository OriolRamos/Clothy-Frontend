import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const About = () => {
    const { t } = useTranslation(); // Using the translation hook

    return (
        <Container sx={{ mt: 6, mb: 6, p: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}>
            <Typography
                variant="h3"
                gutterBottom
                sx={{ fontFamily: "'Playfair Display', serif", color: "#2c3e50", textAlign: "center" }}
            >
                {t('about_container.title')}
            </Typography>

            <Typography
                variant="body1"
                paragraph
                sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify", mt: 2 }}
            >
                <span dangerouslySetInnerHTML={{ __html: t('about_container.intro') }} />
            </Typography>

            <Box sx={{ mt: 4, p: 2, bgcolor: "#eef2f7", borderRadius: 2 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    {t('about_container.historyTitle')}
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    {t('about_container.history')}
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    {t('about_container.visionTitle')}
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    {t('about_container.vision')}
                </Typography>
            </Box>

            <Box sx={{ mt: 4, p: 2, bgcolor: "#eef2f7", borderRadius: 2 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    {t('about_container.commitmentTitle')}
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    {t('about_container.commitment')}
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    {t('about_container.futureTitle')}
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    {t('about_container.future')}
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    {t('about_container.thanks')}
                </Typography>
            </Box>
        </Container>
    );
};

export default About;
