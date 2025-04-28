import React from 'react';

const InfoItem = ({ label, value, icon: Icon, className = '' }) => {
    return (
        <div className={`flex items-center ${className}`}>
            <dt className="w-32 text-sm font-medium text-gray-500 dark:text-gray-400">
                {label}
            </dt>
            <dd className="text-sm text-gray-900 dark:text-white font-medium flex items-center">
                {Icon && <Icon className="w-4 h-4 mr-1 text-gray-400" />}
                {value}
            </dd>
        </div>
    );
};

export default InfoItem; 