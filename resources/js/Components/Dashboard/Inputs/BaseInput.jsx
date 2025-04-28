import React from 'react';

const BaseInput = ({
    label,
    icon: Icon,
    error,
    className = '',
    required,
    children,
    helpText,
    containerClassName = '',
}) => {
    return (
        <div className={`relative ${containerClassName}`}>
            {label && (
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {Icon && <Icon className="mr-2 h-4 w-4" />}
                    <span>{label}</span>
                    {required && (
                        <span className="ml-1 text-red-500">*</span>
                    )}
                </label>
            )}
            <div className="relative">
                {children}
            </div>
            {helpText && !error && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {helpText}
                </p>
            )}
            {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
};

export const inputClasses = ({
    error,
    className = '',
    leftIcon,
    rightIcon,
}) => `
    block w-full rounded-lg border-0 
    ${leftIcon ? 'pl-10' : 'pl-4'} 
    ${rightIcon ? 'pr-10' : 'pr-4'} 
    py-2.5 text-gray-900
    ring-1 ring-inset 
    ${error 
        ? 'ring-red-300 dark:ring-red-600 focus:ring-red-500' 
        : 'ring-gray-300 dark:ring-gray-700 focus:ring-primary-500'
    }
    placeholder:text-gray-400
    focus:ring-2 focus:ring-inset
    dark:bg-gray-800 dark:text-white
    dark:placeholder:text-gray-500
    ${className}
`;

export default BaseInput; 