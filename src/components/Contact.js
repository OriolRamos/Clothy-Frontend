import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation(); // Inicialitza i18n
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send(
            'service_93zbwrv', // ID del servei
            'template_otx15lj', // ID de la plantilla
            {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
            },
            'LjHenAfPxI9usSYdd' // Clau pública d'EmailJS
        )
            .then(() => {
                alert(t('contact_container.successMessage')); // Missatge traduït
                setFormData({ name: '', email: '', message: '' });
            })
            .catch(() => {
                alert(t('contact_container.errorMessage')); // Missatge traduït
            });
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: "'Playfair Display', serif" }}>
                {t('contact_container.title')} {/* Títol traduït */}
            </Typography>

            <Typography variant="body1" paragraph sx={{ fontFamily: "'Roboto', sans-serif", color: "#555" }}>
                {t('contact_container.description')} {/* Descripció traduïda */}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Playfair Display', serif", mt: 4 }}>
                {t('contact_container.formTitle')} {/* Títol del formulari */}
            </Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleSubmit}>
                <TextField
                    label={t('contact_container.nameLabel')} // Etiqueta del camp Nom
                    variant="outlined"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label={t('contact_container.emailLabel')} // Etiqueta del camp Email
                    variant="outlined"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label={t('contact_container.messageLabel')} // Etiqueta del camp Missatge
                    variant="outlined"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    {t('contact_container.submitButton')} {/* Botó traduït */}
                </Button>
            </Box>
        </Container>
    );
};

export default Contact;
