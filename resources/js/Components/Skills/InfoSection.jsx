import React from 'react';
import { FiTag, FiInfo } from 'react-icons/fi';

const InfoSection = ({ title, icon = FiInfo, children, className = '' }) => {
    const Icon = icon;

    return (
        <div className={`bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 ${className}`}>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Icon className="w-5 h-5 text-indigo-500" />
                {title}
            </h3>
            <dl className="space-y-4">
                {children}
            </dl>
        </div>
    );
};

export default InfoSection; 