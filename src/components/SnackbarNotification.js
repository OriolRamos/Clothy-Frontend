import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarNotification = ({ open }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => {}}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert severity="success">Imatge carregada amb èxit!</Alert>
        </Snackbar>
    );
};

export default SnackbarNotification;
