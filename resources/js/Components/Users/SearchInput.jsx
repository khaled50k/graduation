import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchInput = ({ value, onChange }) => {
    return (
        <div className="relative min-w-[200px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400
                    text-sm transition-colors duration-200"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default SearchInput; 