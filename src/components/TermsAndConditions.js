import React from "react";
import { Container, Typography, Box, Link } from "@mui/material";
import { useTranslation } from "react-i18next"; // Biblioteca d'i18n

const TermsAndConditions = () => {
    const { t } = useTranslation(); // Carreguem la funció de traducció

    return (
        <Container sx={{ mt: 6, mb: 6, p: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}>
            <Typography
                variant="h3"
                gutterBottom
                sx={{ fontFamily: "'Playfair Display', serif", color: "#2c3e50", textAlign: "center" }}
            >
                {t("terms.title")}
            </Typography>
            <Typography
                variant="body1"
                paragraph
                sx={{fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify", mb: 2}}
            >
                {t("terms.intro1")}
                <strong>Clothy</strong>
                {t("terms.intro2")}
            </Typography>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    {t("terms.section1.title")}
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    {t("terms.section1.description")}
                </Typography>
                <ul style={{ paddingLeft: "1.5rem", fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                    <li>{t("terms.section1.item1")}</li>
                    <li>{t("terms.section1.item2")}</li>
                    <li>{t("terms.section1.item3")}</li>
                </ul>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    {t("terms.section2.title")}
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    {t("terms.section2.description1")}
                    <strong>{t("terms.section2.GDPR")}</strong>
                    {t("terms.section2.description2")}
                </Typography>
                <ul style={{ paddingLeft: "1.5rem", fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                    <li>{t("terms.section2.item1")}</li>
                    <li>{t("terms.section2.item2")}</li>
                    <li>{t("terms.section2.item3")}</li>
                </ul>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    {t("terms.section2.privacyPolicy")}{" "}
                    <Link href="/privacy-policy" sx={{ color: "#2980b9" }}>
                        {t("terms.section2.privacyLink")}
                    </Link>
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    {t("terms.section3.title")}
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    {t("terms.section3.description")}
                </Typography>
                <ul style={{ paddingLeft: "1.5rem", fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                    <li>{t("terms.section3.item1")}</li>
                    <li>{t("terms.section3.item2")}</li>
                    <li>{t("terms.section3.item3")}</li>
                </ul>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    {t("terms.section4.title")}
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    {t("terms.section4.description")}
                </Typography>
                <ul style={{ paddingLeft: "1.5rem", fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                    <li>{t("terms.section4.item1")}</li>
                    <li>{t("terms.section4.item2")}</li>
                    <li>{t("terms.section4.item3")}</li>
                </ul>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    {t("terms.section5.title")}
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    {t("terms.section5.description")}
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    {t("terms.section6.title")}
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    {t("terms.section6.description1")}
                    <Link href="/contact" sx={{ color: "#2980b9" }}>
                        formulari de contacte
                    </Link>{" "}
                    {t("terms.section6.description2")}
                    <Link href="mailto:support@clothy.com" sx={{ color: "#2980b9" }}>
                        support@clothy.com
                    </Link>
                    {t("terms.section6.description3")}
                </Typography>
            </Box>
        </Container>
    );
};

export default TermsAndConditions;
