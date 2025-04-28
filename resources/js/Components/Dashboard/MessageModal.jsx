import React from 'react';
import Modal from './Modal';
import Button from '../Forms/Button';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiXCircle } from 'react-icons/fi';

const MessageModal = ({ isOpen, onClose, title, message, type = 'success', buttonText = 'OK' }) => {
    const iconMap = {
        success: <FiCheckCircle className="h-6 w-6 text-green-500" />,
        error: <FiXCircle className="h-6 w-6 text-red-500" />,
        warning: <FiAlertCircle className="h-6 w-6 text-yellow-500" />,
        info: <FiInfo className="h-6 w-6 text-blue-500" />,
    };

    const icon = iconMap[type];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size="sm"
        >
            <div className="mt-2">
                <div className="flex items-center justify-center mb-4">
                    {icon}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    {message}
                </p>
            </div>

            <div className="mt-5 sm:mt-4 flex justify-center">
                <Button
                    onClick={onClose}
                    variant="primary"
                    className="w-full sm:w-auto"
                >
                    {buttonText}
                </Button>
            </div>
        </Modal>
    );
};

export default MessageModal; 