import React, { useEffect, useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiXCircle, FiX } from 'react-icons/fi';

const ToastMessage = ({ message, type = 'success', onClose, duration = 3000 }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
                setIsVisible(false);
                onClose();
            }, 300);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    const iconMap = {
        success: <FiCheckCircle className="h-5 w-5 text-green-500" />,
        error: <FiXCircle className="h-5 w-5 text-red-500" />,
        warning: <FiAlertCircle className="h-5 w-5 text-yellow-500" />,
        info: <FiInfo className="h-5 w-5 text-blue-500" />,
    };

    const bgColorMap = {
        success: 'bg-white dark:bg-gray-800 border-l-4 border-green-500',
        error: 'bg-white dark:bg-gray-800 border-l-4 border-red-500',
        warning: 'bg-white dark:bg-gray-800 border-l-4 border-yellow-500',
        info: 'bg-white dark:bg-gray-800 border-l-4 border-blue-500',
    };

    const textColorMap = {
        success: 'text-green-800 dark:text-green-300',
        error: 'text-red-800 dark:text-red-300',
        warning: 'text-yellow-800 dark:text-yellow-300',
        info: 'text-blue-800 dark:text-blue-300',
    };

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 300);
    };

    return (
        <div className={`fixed bottom-4 right-4 z-50 transform transition-all duration-300 ease-in-out ${
            isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}>
            <div className={`${bgColorMap[type]} rounded-lg shadow-lg overflow-hidden backdrop-blur-sm min-w-[300px] max-w-md`}>
                <div className="p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                            {iconMap[type]}
                        </div>
                        <div className="ml-3 w-0 flex-1">
                            <p className={`text-sm font-medium ${textColorMap[type]}`}>
                                {message}
                            </p>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex">
                            <button
                                onClick={handleClose}
                                className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-current transition-colors duration-150"
                            >
                                <FiX className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToastMessage; 