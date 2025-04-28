import React from 'react';
import { Link } from '@inertiajs/react';
import { FiSearch } from 'react-icons/fi';

const SearchResults = ({ results, onClose, isDarkMode }) => (
    <div className="absolute left-0 right-0 top-full mt-2 rounded-xl bg-surface-white py-2 shadow-soft-lg ring-1 ring-border-light dark:bg-background-dark dark:ring-border-dark">
        {results.map((result, index) => (
            <Link
                key={index}
                href={result.href}
                className="flex items-center space-x-4 px-4 py-2.5 text-sm text-content-default transition-colors hover:bg-surface-light dark:text-content-white dark:hover:bg-background-darker"
                onClick={onClose}
            >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50 text-xl dark:bg-primary-500/10">
                    {result.icon}
                </span>
                <div>
                    <p className="font-medium text-content-dark dark:text-content-white">{result.title}</p>
                    <p className="text-xs text-content-light dark:text-content-lighter">{result.description}</p>
                </div>
            </Link>
        ))}
    </div>
);

const SearchBar = ({ searchQuery, setSearchQuery, showSearch, setShowSearch, searchResults, isDarkMode }) => {
    return (
        <div className="relative flex-1 max-w-lg">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <FiSearch className="h-5 w-5 text-content-lighter dark:text-content-light" />
            </div>
            <input
                type="text"
                placeholder="Search anything..."
                className={`w-full rounded-xl border border-border-light bg-surface-light pl-11 pr-4 py-2.5 text-sm text-content-dark placeholder-content-light transition-colors focus:border-primary-500 focus:bg-surface-white focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-background-dark dark:text-content-white dark:placeholder-content-lighter dark:focus:border-primary-500 dark:focus:bg-background-darker`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearch(true)}
            />
            {showSearch && searchResults.length > 0 && (
                <SearchResults
                    results={searchResults}
                    onClose={() => setShowSearch(false)}
                    isDarkMode={isDarkMode}
                />
            )}
        </div>
    );
};

export default SearchBar; 