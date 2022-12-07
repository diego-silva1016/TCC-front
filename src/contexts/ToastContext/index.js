import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from '@mui/material'
const ToastContext = createContext()

export const ToastContextProvider = ({ children }) => {
    const [content, setContent] = useState({
        open: false,
        message: '',
        type: ''
    })

    const toastOpenSuccess = (message) => {
        setContent({
            open: true,
            message,
            type: 'success'
        });
    };

    const toastOpenError = (message) => {
        setContent({
            open: true,
            message,
            type: 'error'
        });
    };


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setContent({
            open: false,
            message: '',
            type: ''
        });
    };

    return (
        <ToastContext.Provider value={{ toastOpenSuccess, toastOpenError }}>
            {children}
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={content.open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={content.type} sx={{ width: '100%' }}>
                    {content.message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    return useContext(ToastContext)
}