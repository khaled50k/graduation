import React from 'react';

const Card = ({
    children,
    className = '',
    title,
    subtitle,
    toolbar,
    noPadding = false,
    variant = 'default', // default, flush, shadow
}) => {
    const baseClasses = `
        bg-white 
        rounded-xl
        ${variant === 'shadow' ? 'shadow-xl' : variant === 'default' ? 'shadow-sm' : ''}
        ${noPadding ? '' : 'p-6 lg:p-8'}
        ${className}
    `;

    return (
        <div className={baseClasses}>
            {(title || subtitle || toolbar) && (
                <div className="flex flex-wrap items-center justify-between mb-6">
                    <div>
                        {title && (
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                                {title}
                            </h3>
                        )}
                        {subtitle && (
                            <p className="mt-1 text-sm text-gray-500">
                                {subtitle}
                            </p>
                        )}
                    </div>
                    {toolbar && (
                        <div className="flex items-center space-x-3">
                            {toolbar}
                        </div>
                    )}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card; 