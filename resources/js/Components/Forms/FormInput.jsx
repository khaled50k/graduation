import React from 'react';

const FormInput = ({
    label,
    icon: Icon,
    error,
    type = 'text',
    ...props
}) => {
    return (
        <div>
            {label && (
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {Icon && <Icon className="mr-2 h-4 w-4" />}
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ${
                    error
                        ? 'ring-red-300 dark:ring-red-600'
                        : 'ring-gray-300 dark:ring-gray-700'
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 sm:text-sm sm:leading-6 ${
                    error ? 'focus:ring-red-500' : 'focus:ring-primary-500'
                }`}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
        </div>
    );
};

export default FormInput; 