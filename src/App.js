import React, { useState } from "react";
import { Container, Typography, IconButton, CircularProgress, Snackbar, Box } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { styled } from "@mui/system";
import ImageUpload from './components/ImageUpload';
import SnackbarNotification from './components/SnackbarNotification';

const App = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (imageData) => {
    setImage(imageData);
    setLoading(false);
  };

  const handleLoadingStart = () => {
    setLoading(true);
  };

  return (
      <Container>
        <Typography variant="h4" align="center" gutterBottom>Colthy - Pujada d'Imatges</Typography>
        <Box display="flex" justifyContent="center">
          <ImageUpload onImageUpload={handleImageUpload} onLoadingStart={handleLoadingStart} />
        </Box>

        {loading && <CircularProgress />}

        {image && !loading && (
            <Box mt={2}>
              <img src={image} alt="Imatge carregada" style={{ maxWidth: "100%", maxHeight: "300px" }} />
            </Box>
        )}

        <SnackbarNotification open={loading} />
      </Container>
  );
};

export default App;
