// src/components/ImageUpload.js
import React, { useState } from "react";
import styled from "styled-components";
import { Box, Typography, Paper } from "@mui/material";

const ImageUpload = () => {
    const [image, setImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const handleRemoveImage = () => {
        setImage(null);
    };

    const handleSendImage = () => {
        // Aquí pots afegir la funcionalitat per enviar la imatge
        console.log("Image sent:", image.name);
    };

    return (
        <StyledWrapper>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: "'Playfair Display', serif" }}>
                Cerca la roba que més t'agrada
            </Typography>

            <div className="container">
                <div className="folder">
                    <div className="front-side">
                        <div className="tip" />
                        <div className="cover" />
                    </div>
                    <div className="back-side cover" />
                </div>
                <label className="custom-file-upload">
                    <input
                        accept="image/*"
                        type="file"
                        onChange={handleImageUpload}
                    />
                    {image ? image.name : "Selecciona Imatge"}
                </label>
            </div>

            {image && (
                <Box mt={2} sx={{ textAlign: 'center' }}>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* Vista prèvia de la imatge en petit */}
                        <img
                            src={URL.createObjectURL(image)}
                            alt={image.name}
                            style={{ width: '100px', height: 'auto', marginBottom: '10px' }}
                        />
                        <Typography variant="body1">{image.name}</Typography>

                        {/* Botons Send i Delete */}
                        <div className="button-container">
                            <button className="buttonDelete" onClick={handleRemoveImage}>Delete</button>
                            <button className="buttonSend" onClick={handleSendImage}>Send</button>
                        </div>
                    </Paper>
                    <Typography variant="body2" color="textSecondary">
                    L'arxiu seleccionat es mostrarà aquí. Pots penjar-ne més si cal!
                    </Typography>
                </Box>
            )}
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 500px;

    .container {
        margin-top: 50px;
        --transition: 350ms;
        --folder-W: 120px;
        --folder-H: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        padding: 10px;
        background: linear-gradient(135deg, #d2cdcd, #8c8686);
        border-radius: 15px;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        height: calc(var(--folder-H) * 1.7);
        position: relative;
        margin-bottom: 1em;
    }

    .folder {
        position: absolute;
        top: -20px;
        left: calc(50% - 60px);
        animation: float 2.5s infinite ease-in-out;
        transition: transform var(--transition) ease;
    }

    .folder:hover {
        transform: scale(1.05);
    }

    .folder .front-side,
    .folder .back-side {
        position: absolute;
        transition: transform var(--transition);
        transform-origin: bottom center;
    }

    .folder .back-side::before,
    .folder .back-side::after {
        content: "";
        display: block;
        background-color: white;
        opacity: 0.5;
        z-index: 0;
        width: var(--folder-W);
        height: var(--folder-H);
        position: absolute;
        transform-origin: bottom center;
        border-radius: 15px;
        transition: transform 350ms;
        z-index: 0;
    }

    .container:hover .back-side::before {
        transform: rotateX(-5deg) skewX(5deg);
    }

    .container:hover .back-side::after {
        transform: rotateX(-15deg) skewX(12deg);
    }

    .folder .front-side {
        z-index: 1;
    }

    .container:hover .front-side {
        transform: rotateX(-40deg) skewX(15deg);
    }

    .folder .tip {
        background: linear-gradient(135deg, #ff9a56, #ff6f56);
        width: 80px;
        height: 20px;
        border-radius: 12px 12px 0 0;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        position: absolute;
        top: -10px;
        z-index: 2;
    }

    .folder .cover {
        background: linear-gradient(135deg, #ffe563, #ffc663);
        width: var(--folder-W);
        height: var(--folder-H);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
    }

    .custom-file-upload {
        font-size: 1.1em;
        color: #ffffff;
        text-align: center;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        border-radius: 10px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: background var(--transition) ease;
        display: inline-block;
        width: 100%;
        padding: 10px 35px;
        position: relative;
    }

    .custom-file-upload:hover {
        background: rgba(255, 255, 255, 0.4);
    }

    .custom-file-upload input[type="file"] {
        display: none;
    }

    @keyframes float {
        0% {
            transform: translateY(0px);
        }

        50% {
            transform: translateY(-20px);
        }

        100% {
            transform: translateY(0px);
        }
    }

    .buttonSend, .buttonDelete {
        display: inline-block;
        transition: all 0.2s ease-in;
        position: relative;
        overflow: hidden;
        z-index: 1;
        color: #090909;
        padding: 0.7em 1.7em;
        cursor: pointer;
        font-size: 14px;
        border-radius: 0.5em;
        background: #e8e8e8;
        border: 1px solid #e8e8e8;
        box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
        margin: 10px;
    }

    .buttonSend:active, .buttonDelete:active {
        color: #666;
        box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
    }

    .buttonSend:before, .buttonDelete:before {
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%) scaleY(1) scaleX(1.25);
        top: 100%;
        width: 140%;
        height: 180%;
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 50%;
        display: block;
        transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
        z-index: -1;
    }

    .buttonSend:after {
        content: "";
        position: absolute;
        left: 55%;
        transform: translateX(-50%) scaleY(1) scaleX(1.45);
        top: 180%;
        width: 160%;
        height: 190%;
        background-color: #009087;
        border-radius: 50%;
        display: block;
        transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
        z-index: -1;
    }

    .buttonSend:hover {
        color: #ffffff;
        border: 1px solid #009087;
    }

    .buttonSend:hover:before {
        top: -35%;
        background-color: #009087;
        transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
    }

    .buttonSend:hover:after {
        top: -45%;
        background-color: #009087;
        transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
    }

    .buttonDelete:after {
        content: "";
        position: absolute;
        left: 55%;
        transform: translateX(-50%) scaleY(1) scaleX(1.45);
        top: 180%;
        width: 160%;
        height: 190%;
        background-color: #d9544f;
        border-radius: 50%;
        display: block;
        transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
        z-index: -1;
    }

    .buttonDelete:hover {
        color: #ffffff;
        border: 1px solid #d9544f;
    }

    .buttonDelete:hover:before {
        top: -35%;
        background-color: #d9544f;
        transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
    }

    .buttonDelete:hover:after {
        top: -45%;
        background-color: #d9544f;
        transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
    }
`;

export default ImageUpload;
