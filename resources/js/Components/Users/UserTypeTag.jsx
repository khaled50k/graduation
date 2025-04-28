import React from 'react';

const UserTypeTag = ({ type }) => {
    const getTypeConfig = (userType) => {
        switch (userType) {
            case 1:
                return {
                    label: 'Volunteer',
                    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                };
            case 2:
                return {
                    label: 'Company',
                    className: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                };
            case 3:
                return {
                    label: 'Admin',
                    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                };
            default:
                return {
                    label: 'Unknown',
                    className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                };
        }
    };

    const config = getTypeConfig(type);

    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${config.className}`}>
            {config.label}
        </span>
    );
};

export default UserTypeTag; 