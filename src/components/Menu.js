import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next"; // Importació d'i18n
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
    const { t } = useTranslation(); // Hook per a les traduccions

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
                <img src={logo} alt={t("menu_container.header.title")} style={{ width: "100px", marginBottom: "20px" }} />
                <Typography
                    variant="h2"
                    sx={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        color: "#000000",
                        mb: 2,
                    }}
                >
                    {t("menu_container.header.title")}
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: "'Roboto', sans-serif",
                        color: "#555555",
                        maxWidth: "600px",
                    }}
                >
                    {t("menu_container.header.subtitle")}
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
                    {t("menu_container.main.heading")}
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
                    {t("menu_container.main.description")}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        fontFamily: "'Roboto', sans-serif",
                        color: "#666666",
                        lineHeight: "1.8",
                    }}
                >
                    {t("menu_container.main.communityNote")}
                </Typography>
            </Box>

            {/* Botons */}
            <Box sx={{ mt: 6, display: "flex", gap: 2 }}>
                <StyledButton component={Link} to="/sign-up">
                    {t("menu_container.buttons.signup")}
                </StyledButton>
                <OutlineButton component={Link} to="/login">
                    {t("menu_container.buttons.login")}
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
                {t("menu_container.footer.betaNotice")}
            </Typography>
        </Box>
    );
}

export default Menu;
