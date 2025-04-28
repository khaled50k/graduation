import React from 'react';
import { FiBriefcase } from 'react-icons/fi';

const PostItem = ({ title, company, applications, time }) => (
    <div className="group flex items-center space-x-4 rounded-lg p-3 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg transition-all duration-200 group-hover:shadow-purple-500/40">
            <FiBriefcase className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{title}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{company}</p>
            <div className="mt-1 flex items-center space-x-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">{applications} applications</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">{time}</span>
            </div>
        </div>
    </div>
);

export default PostItem; 