// src/components/ImageUpload.js
import React, { useState } from "react";
import { Box, Button, Typography, IconButton, Paper } from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";

const ImageUpload = () => {
    const [image, setImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const handleRemoveImage = () => {
        setImage(null);
    };

    return (
        <Box textAlign="center" sx={{ width: "100%", maxWidth: 500 }}>
            <Typography variant="h5" gutterBottom>
                Puja una imatge per començar
            </Typography>

            <Paper elevation={3} sx={{ p: 3, mb: 2, width: "100%" }}>
                <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="upload-button"
                    type="file"
                    onChange={handleImageUpload}
                />
                <label htmlFor="upload-button">
                    <Button variant="contained" color="primary" component="span" startIcon={<CloudUpload />}>
                        Selecciona Imatge
                    </Button>
                </label>

                {image && (
                    <Box mt={2}>
                        <Typography variant="body1">{image.name}</Typography>
                        <IconButton color="secondary" onClick={handleRemoveImage}>
                            <Delete />
                        </IconButton>
                    </Box>
                )}
            </Paper>

            {image && (
                <Typography variant="body2" color="textSecondary">
                    L'arxiu seleccionat es mostrarà aquí. Pots penjar-ne més si cal!
                </Typography>
            )}
        </Box>
    );
};

export default ImageUpload;
