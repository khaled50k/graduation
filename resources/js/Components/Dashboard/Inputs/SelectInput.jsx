import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import BaseInput, { inputClasses } from './BaseInput';

const SelectInput = ({
    label,
    icon: Icon,
    error,
    children,
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
            <select
                className={inputClasses({
                    error,
                    className,
                    leftIcon: Icon,
                    rightIcon: true
                })}
                {...props}
            >
                {children}
            </select>
            {Icon && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Icon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
            )}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiChevronDown className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
        </BaseInput>
    );
};

export default SelectInput; 