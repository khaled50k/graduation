import React from 'react';
import { FiMenu } from 'react-icons/fi';
import SearchBar from './SearchBar';
import HeaderActions from './HeaderActions';

const Header = ({
    sidebarOpen,
    setSidebarOpen,
    isDarkMode,
    setIsDarkMode,
    searchQuery,
    setSearchQuery,
    showSearch,
    setShowSearch,
    searchResults,
}) => {
    return (
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-xl backdrop-saturate-150 dark:border-gray-700 dark:bg-gray-800/80">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex flex-1 items-center space-x-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-primary-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-primary-400 lg:hidden"
                    >
                        <span className="sr-only">Toggle sidebar</span>
                        <FiMenu className="h-5 w-5" />
                    </button>
                    
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        showSearch={showSearch}
                        setShowSearch={setShowSearch}
                        searchResults={searchResults}
                    />
                </div>

                <HeaderActions
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                />
            </div>
        </header>
    );
};

export default Header; 