import React from 'react';

const UserTypeBadge = ({ type }) => {
    const getUserType = (type) => {
        switch (type) {
            case 1: return 'Volunteer';
            case 2: return 'Company';
            case 3: return 'Admin';
            default: return 'Unknown';
        }
    };

    return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
            {getUserType(type)}
        </span>
    );
};

export default UserTypeBadge; 