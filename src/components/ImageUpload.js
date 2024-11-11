import React from "react";
import { Button, IconButton } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const ImageUpload = ({ onImageUpload, onLoadingStart }) => {
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            onLoadingStart();
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageUpload(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                onChange={handleFileSelect}
            />
            <label htmlFor="image-upload">
                <IconButton component="span" color="primary">
                    <CameraAltIcon />
                </IconButton>
            </label>
        </div>
    );
};

export default ImageUpload;
