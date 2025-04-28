import React from 'react';

const InputField = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    error,
    required = false,
    placeholder = '',
    className = '',
    icon = null,
    helperText = '',
}) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={name}
                className="block text-sm font-medium mb-2 text-gray-700"
            >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={`
                        w-full px-4 py-2.5
                        ${icon ? 'pl-10' : ''}
                        bg-white
                        border
                        rounded-lg
                        shadow-sm
                        text-gray-900
                        placeholder-gray-400
                        transition duration-200
                        disabled:bg-gray-50
                        disabled:text-gray-500
                        ${error 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-100 bg-red-50/50' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                        }
                        ${className}
                    `}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${name}-error` : undefined}
                />
                {error && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                            className="h-5 w-5 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                )}
            </div>
            <div className="mt-1.5 min-h-[20px]">
                {error ? (
                    <p 
                        className="text-sm text-red-600 flex items-center gap-1" 
                        id={`${name}-error`}
                    >
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </p>
                ) : helperText ? (
                    <p className="text-sm text-gray-500">{helperText}</p>
                ) : null}
            </div>
        </div>
    );
};

export default InputField; 