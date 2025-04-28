import React from 'react';

const ActivityCard = ({ title, children }) => (
    <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-800/50 dark:shadow-gray-700/10 dark:backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {children}
    </div>
);

export default ActivityCard; 