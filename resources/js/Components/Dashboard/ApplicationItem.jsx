import React from 'react';
import { FiFileText, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const ApplicationItem = ({ title, company, status, time }) => (
    <div className="group flex items-center space-x-4 rounded-lg p-3 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg ${
            status === 'approved' ? 'bg-gradient-to-br from-green-500 to-green-600' :
            status === 'rejected' ? 'bg-gradient-to-br from-red-500 to-red-600' :
            'bg-gradient-to-br from-blue-500 to-blue-600'
        } text-white shadow-lg transition-all duration-200 group-hover:shadow-blue-500/40`}>
            {status === 'approved' ? <FiCheckCircle className="h-6 w-6" /> :
             status === 'rejected' ? <FiXCircle className="h-6 w-6" /> :
             <FiFileText className="h-6 w-6" />}
        </div>
        <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{title}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{company}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">{time}</p>
        </div>
    </div>
);

export default ApplicationItem; 