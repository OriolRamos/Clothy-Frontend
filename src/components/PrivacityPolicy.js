import React from "react";
import { Container, Typography, Box, Link } from "@mui/material";
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
    const { t } = useTranslation();

    return (
        <Container sx={{ mt: 6, mb: 6, p: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}>
            <Typography
                variant="h3"
                gutterBottom
                sx={{ fontFamily: "'Playfair Display', serif", color: "#2c3e50", textAlign: "center" }}
            >
                {t("privacyPolicy.title")}
            </Typography>

            <Typography
                variant="body1"
                paragraph
                sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify", mb: 2 }}
            >
                {t("privacyPolicy.effectiveDate")}
            </Typography>

            <Typography
                variant="body1"
                paragraph
                sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
            >
                {t("privacyPolicy.intro1")}
                <strong>{t("privacyPolicy.Clothy")}</strong>
                {t("privacyPolicy.intro2")}
                <strong>{t("privacyPolicy.GDPR")}</strong>
                {t("privacyPolicy.intro3")}
            </Typography>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    {t("privacyPolicy.section1.title")}
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    {t("privacyPolicy.section1.description")}
                </Typography>
                <ul style={{ paddingLeft: "1.5rem", fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                    {t("privacyPolicy.section1.items", { returnObjects: true }).map((item, index) => (
                        <li key={index}>
                            <strong>{item.title}:</strong> {item.description}
                        </li>
                    ))}
                </ul>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    {t("privacyPolicy.section2.title")}
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    {t("privacyPolicy.section2.description")}
                </Typography>
                <ul style={{ paddingLeft: "1.5rem", fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                    {t("privacyPolicy.section2.items", { returnObjects: true }).map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    {t("privacyPolicy.section2.note")}
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    {t("privacyPolicy.section3.title")}
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    {t("privacyPolicy.section3.description")}
                </Typography>
                <ul style={{ paddingLeft: "1.5rem", fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                    {t("privacyPolicy.section3.items", { returnObjects: true }).map((item, index) => (
                        <li key={index}><strong>{item}</strong></li>
                    ))}
                </ul>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    {t("privacyPolicy.section3.contact")}
                    <Link href="mailto:support@clothy.com" sx={{ color: "#2980b9" }}>
                        support@clothy.com
                    </Link>
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    {t("privacyPolicy.section4.title")}
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    {t("privacyPolicy.section4.description")}
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    {t("privacyPolicy.section5.title")}
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify"}}
                >
                    {t("privacyPolicy.section5.description")}
                    <ul style={{paddingLeft: "1.5rem", fontFamily: "'Roboto', sans-serif", color: "#555"}}>
                        {t("privacyPolicy.section5.items", {returnObjects: true}).map((item, index) => (
                            <li key={index}>
                                <strong>{item.title}:</strong> {item.description}
                            </li>
                        ))}
                    </ul>
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify"}}
                >
                    {t("privacyPolicy.section5.note")}
                </Typography>
            </Box>

            <Box sx={{mt: 4}}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    {t("privacyPolicy.section6.title")}
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    {t("privacyPolicy.section6.description")}
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Playfair Display', serif", color: "#34495e" }}
                >
                    {t("privacyPolicy.section7.title")}
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontFamily: "'Roboto', sans-serif", color: "#555", textAlign: "justify" }}
                >
                    {t("privacyPolicy.section7.description")}
                    <Link href="mailto:support@clothy.com" sx={{ color: "#2980b9" }}>
                        support@clothy.com
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default PrivacyPolicy;
