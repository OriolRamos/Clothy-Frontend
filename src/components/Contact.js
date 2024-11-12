// src/components/Contact.js
import React from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material';

const Contact = () => {
    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Contacte
            </Typography>
            <Typography variant="body1" paragraph>
                Si tens qualsevol dubte o vols posar-te en contacte amb nosaltres, pots enviar-nos un missatge mitjançant el formulari següent.
            </Typography>

            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Nom" variant="outlined" required />
                <TextField label="Correu Electrònic" variant="outlined" type="email" required />
                <TextField label="Missatge" variant="outlined" multiline rows={4} required />
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>Enviar</Button>
            </Box>
        </Container>
    );
};

export default Contact;
