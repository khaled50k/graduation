import React, { useCallback } from 'react';
import debounce from 'lodash/debounce';

const UserSearch = ({ value, onChange }) => {
    const debouncedSearch = useCallback(
        debounce((value) => {
            onChange(value);
        }, 300),
        [onChange]
    );

    const handleChange = (e) => {
        const value = e.target.value;
        debouncedSearch(value);
    };

    return (
        <div className="max-w-md w-full">
            <div className="relative">
                <input
                    type="search"
                    name="search"
                    id="search"
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 pl-4 pr-10 
                        text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                        bg-white dark:bg-gray-700
                        focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400
                        transition-colors duration-200"
                    placeholder="Search users..."
                    defaultValue={value}
                    onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                        className="h-5 w-5 text-gray-400 dark:text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default UserSearch; 