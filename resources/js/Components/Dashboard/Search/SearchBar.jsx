import React, { useState, useRef, useEffect, Fragment } from 'react';
import { Link } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FiSearch, FiX, FiCommand, FiLoader, FiClock, FiArrowRight, FiTrendingUp } from 'react-icons/fi';

const SearchBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchRef = useRef(null);
    const inputRef = useRef(null);
    const [recentSearches, setRecentSearches] = useState(() => {
        const saved = localStorage.getItem('recentSearches');
        return saved ? JSON.parse(saved) : [];
    });

    // Quick links for empty state
    const quickLinks = [
        { title: 'Dashboard Overview', description: 'View your dashboard', href: route('dashboard'), icon: '📊' },
        { title: 'Profile Settings', description: 'Manage your account', href: route('profile'), icon: '👤' },
    ];

    // Mock search results - replace with real API call in production
    const searchResults = query ? [
        {
            title: 'Dashboard',
            description: 'Main dashboard overview',
            href: route('dashboard'),
            icon: '📊',
            category: 'Pages'
        },
        {
            title: 'Profile',
            description: 'View and edit your profile',
            href: route('profile'),
            icon: '👤',
            category: 'Settings'
        },
        {
            title: 'Analytics',
            description: 'View your analytics and statistics',
            href: route('dashboard'),
            icon: '📈',
            category: 'Reports'
        },
    ].filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    ) : [];

    // Group results by category
    const groupedResults = searchResults.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});

    const handleSearch = async (searchQuery) => {
        if (!searchQuery) return;
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            // Add to recent searches
            const newRecent = [
                { 
                    query: searchQuery, 
                    timestamp: new Date().toISOString(),
                    category: searchResults[0]?.category || 'General'
                },
                ...recentSearches.filter(item => item.query !== searchQuery)
            ].slice(0, 5);
            setRecentSearches(newRecent);
            localStorage.setItem('recentSearches', JSON.stringify(newRecent));
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => 
                prev < searchResults.length - 1 ? prev + 1 : -1
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => 
                prev > -1 ? prev - 1 : searchResults.length - 1
            );
        } else if (e.key === 'Enter' && selectedIndex > -1) {
            e.preventDefault();
            const selected = searchResults[selectedIndex];
            if (selected) {
                window.location = selected.href;
            }
        }
    };

    useEffect(() => {
        if (query) {
            handleSearch(query);
            setSelectedIndex(-1);
        }
    }, [query]);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleGlobalKeyDown);
        return () => document.removeEventListener('keydown', handleGlobalKeyDown);
    }, []);

    // Handle clicks outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            // Small delay to ensure the modal is rendered
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }, 50);
        }
    }, [isOpen]);

    const renderSearchResults = () => {
        if (searchResults.length > 0) {
            return (
                <div className="space-y-4 px-2">
                    {Object.entries(groupedResults).map(([category, items]) => (
                        <div key={category} className="space-y-1">
                            <h3 className="px-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {category}
                            </h3>
                            {items.map((result, index) => {
                                const isSelected = searchResults.indexOf(result) === selectedIndex;
                                return (
                                    <Link
                                        key={index}
                                        href={result.href}
                                        className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-200 ${
                                            isSelected
                                                ? 'bg-primary-50/50 text-primary-900 dark:bg-primary-900/10 dark:text-primary-100'
                                                : 'text-gray-900 hover:bg-gray-100/50 dark:text-white dark:hover:bg-gray-700/30'
                                        }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-base shadow-sm transition-transform group-hover:scale-105 ${
                                            isSelected
                                                ? 'bg-primary-100/80 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                                                : 'bg-gray-100/80 dark:bg-gray-700/50'
                                        }`}>
                                            {result.icon}
                                        </span>
                                        <div className="flex-1 truncate">
                                            <div className="font-medium">{result.title}</div>
                                            <div className="truncate text-xs text-gray-500 dark:text-gray-400">
                                                {result.description}
                                            </div>
                                        </div>
                                        {isSelected && (
                                            <FiArrowRight className="h-4 w-4 text-primary-500" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    ))}
                </div>
            );
        }

        if (query) {
            return (
                <div className="px-3 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="mb-2 text-lg font-medium">No results found</div>
                    <p>No matches found for "<span className="font-medium text-gray-900 dark:text-white">{query}</span>"</p>
                    <p className="mt-1 text-xs">Try adjusting your search or browse quick links below</p>
                    <div className="mt-6 grid gap-2 px-4">
                        {quickLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3 text-left text-sm text-gray-900 transition-colors hover:bg-gray-100 dark:bg-gray-800/50 dark:text-white dark:hover:bg-gray-700/50"
                            >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-base shadow-sm dark:bg-gray-700">
                                    {link.icon}
                                </span>
                                <div>
                                    <div className="font-medium">{link.title}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{link.description}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            );
        }

        if (recentSearches.length > 0) {
            return (
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-4 pt-2">
                        <h3 className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                            <FiClock className="h-3.5 w-3.5" />
                            Recent Searches
                        </h3>
                        <button
                            onClick={() => {
                                setRecentSearches([]);
                                localStorage.removeItem('recentSearches');
                            }}
                            className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                            Clear all
                        </button>
                    </div>
                    <div className="space-y-1">
                        {recentSearches.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setQuery(item.query)}
                                className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-gray-700/30"
                            >
                                <FiSearch className="h-3.5 w-3.5 text-gray-400" />
                                <span className="flex-1 truncate">{item.query}</span>
                                <span className="text-xs text-gray-400">
                                    {item.category}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-6 px-3 py-12 text-center">
                <div className="space-y-3">
                    <FiCommand className="mx-auto h-6 w-6 text-gray-400 dark:text-gray-500" />
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Begin typing to search...
                    </div>
                </div>
                <div className="space-y-3">
                    <h3 className="flex items-center justify-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                        <FiTrendingUp className="h-3.5 w-3.5" />
                        Quick Links
                    </h3>
                    <div className="grid gap-2 px-4">
                        {quickLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3 text-left text-sm text-gray-900 transition-colors hover:bg-gray-100 dark:bg-gray-800/50 dark:text-white dark:hover:bg-gray-700/50"
                            >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-base shadow-sm dark:bg-gray-700">
                                    {link.icon}
                                </span>
                                <div>
                                    <div className="font-medium">{link.title}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{link.description}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="relative flex-1 lg:max-w-lg">
            {/* Search Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="group flex w-full items-center gap-3 rounded-xl border border-gray-200/80 bg-white/80 px-4 py-3 text-left text-sm text-gray-500 shadow-sm backdrop-blur-sm transition-all duration-200 ease-in-out hover:border-gray-300 hover:bg-white hover:shadow-md focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700/80 dark:bg-gray-800/80 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-800 dark:focus:border-primary-500 dark:focus:ring-primary-500/20"
                aria-label="Open search"
                aria-expanded={isOpen}
                role="combobox"
            >
                <FiSearch className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span className="flex-1 font-medium">Quick search...</span>
                <kbd className="hidden items-center gap-1 rounded-md border border-gray-200/80 bg-gray-50/80 px-2 py-0.5 font-mono text-[10px] font-medium text-gray-500 shadow-sm transition-all dark:border-gray-700/80 dark:bg-gray-800/80 dark:text-gray-400 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>

            {/* Search Modal */}
            <Transition show={isOpen} as={Fragment}>
                <div className="fixed inset-0 z-[999] overflow-y-auto">
                    <div className="min-h-screen px-4 text-center">
                        {/* Backdrop */}
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div 
                                className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" 
                                aria-hidden="true" 
                                onClick={() => setIsOpen(false)}
                            />
                        </Transition.Child>

                        {/* Modal */}
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 scale-95 translate-y-4"
                            enterTo="opacity-100 scale-100 translate-y-0"
                            leave="ease-in duration-150"
                            leaveFrom="opacity-100 scale-100 translate-y-0"
                            leaveTo="opacity-0 scale-95 translate-y-4"
                        >
                            <div 
                                ref={searchRef}
                                className="inline-block w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white/95 text-left align-middle shadow-2xl ring-1 ring-black/5 backdrop-blur-xl transition-all focus-within:ring-2 focus-within:ring-primary-500/20 dark:bg-gray-800/95 dark:ring-white/5 dark:focus-within:ring-primary-500/20"
                                style={{ 
                                    marginTop: '2rem',
                                    maxHeight: 'calc(100vh - 4rem)'
                                }}
                            >
                                <div className="flex items-center gap-3 border-b border-gray-200/20 px-4 dark:border-gray-700/20">
                                    <FiSearch className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    <input
                                        ref={inputRef}
                                        type="search"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Type to search..."
                                        className="w-full bg-transparent py-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                        aria-label="Search input"
                                        role="searchbox"
                                        autoComplete="off"
                                        spellCheck="false"
                                    />
                                    <div className="flex items-center gap-2">
                                        {isLoading && (
                                            <FiLoader className="h-4 w-4 animate-spin text-gray-500 dark:text-gray-400" />
                                        )}
                                        {query && (
                                            <button
                                                onClick={() => setQuery('')}
                                                className="rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-100/50 hover:text-gray-700 focus:bg-gray-100/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500/20 dark:text-gray-400 dark:hover:bg-gray-700/30 dark:hover:text-gray-300 dark:focus:bg-gray-700/30"
                                                aria-label="Clear search"
                                            >
                                                <FiX className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Search Results */}
                                <div className="max-h-[calc(100vh-12rem)] overflow-y-auto overscroll-contain p-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200/50 hover:scrollbar-thumb-gray-300/50 dark:scrollbar-thumb-gray-700/50 dark:hover:scrollbar-thumb-gray-600/50">
                                    {renderSearchResults()}
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Transition>
        </div>
    );
};

export default SearchBar; 