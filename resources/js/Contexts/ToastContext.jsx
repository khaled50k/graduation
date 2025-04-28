import React, { createContext, useContext, useState } from 'react';
import ToastMessage from '@/Components/Dashboard/ToastMessage';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'success', duration = 3000) => {
        const id = Date.now();
        setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
        return id;
    };

    const removeToast = (id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    const showSuccess = (message, duration) => {
        return addToast(message, 'success', duration);
    };

    const showError = (message, duration) => {
        return addToast(message, 'error', duration);
    };

    const showWarning = (message, duration) => {
        return addToast(message, 'warning', duration);
    };

    const showInfo = (message, duration) => {
        return addToast(message, 'info', duration);
    };

    return (
        <ToastContext.Provider value={{ showSuccess, showError, showWarning, showInfo }}>
            {children}
            <div className="fixed top-0 right-0 z-50 p-4">
                {toasts.map((toast) => (
                    <ToastMessage
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        duration={toast.duration}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
}; 