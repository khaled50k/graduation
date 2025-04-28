import React from 'react';

const StatCard = ({ title, value, icon: Icon, growth }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{value}</p>
                {growth !== undefined && (
                    <p className={`mt-1 text-sm ${growth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {growth >= 0 ? '+' : ''}{growth}% from last month
                    </p>
                )}
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
                <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
        </div>
    </div>
);

export default StatCard; 