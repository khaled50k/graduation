import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchInput = ({
    placeholder = 'Search...',
    className = '',
    ...props
}) => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
                type="search"
                className={`
                    block w-full rounded-lg border-0 py-2.5 pl-10 pr-4
                    bg-gray-50 text-gray-900 
                    ring-1 ring-inset ring-gray-300 
                    placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-primary-600
                    dark:bg-gray-800 dark:text-white dark:ring-gray-700
                    dark:placeholder:text-gray-500 dark:focus:ring-primary-500
                    ${className}
                `}
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
};

export default SearchInput; 