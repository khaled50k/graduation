import React from 'react';

const Card = ({ children, className = '' }) => {
    return (
        <div className={`bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-900/5 rounded-lg ${className}`}>
            {children}
        </div>
    );
};

const Header = ({ children, className = '' }) => {
    return (
        <div className={`px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 ${className}`}>
            {children}
        </div>
    );
};

const Body = ({ children, className = '' }) => {
    return (
        <div className={`px-4 py-5 sm:p-6 ${className}`}>
            {children}
        </div>
    );
};

const Footer = ({ children, className = '' }) => {
    return (
        <div className={`px-4 py-4 sm:px-6 border-t border-gray-200 dark:border-gray-700 ${className}`}>
            {children}
        </div>
    );
};

// Attach subcomponents to Card
Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card; 