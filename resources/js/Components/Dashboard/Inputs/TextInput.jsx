import React from 'react';
import BaseInput, { inputClasses } from './BaseInput';

const TextInput = ({
    type = 'text',
    icon: Icon,
    rightIcon: RightIcon,
    label,
    error,
    className = '',
    containerClassName,
    required,
    helpText,
    ...props
}) => {
    return (
        <BaseInput
            label={label}
            icon={Icon}
            error={error}
            required={required}
            helpText={helpText}
            containerClassName={containerClassName}
        >
            <input
                type={type}
                className={inputClasses({
                    error,
                    className,
                    leftIcon: Icon,
                    rightIcon: RightIcon
                })}
                {...props}
            />
            {Icon && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Icon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
            )}
            {RightIcon && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <RightIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
            )}
        </BaseInput>
    );
};

export default TextInput; 