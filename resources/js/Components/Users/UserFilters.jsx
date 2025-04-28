import React, { useState, useRef, useEffect } from 'react';
import { FiFilter } from 'react-icons/fi';

const UserFilters = ({ 
    selectedType, 
    selectedStatus, 
    selectedLocation,
    dateFrom,
    dateTo,
    onTypeChange, 
    onStatusChange,
    onLocationChange,
    onDateFromChange,
    onDateToChange,
    onClearFilters,
    filterOptions
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const hasActiveFilters = selectedType || selectedStatus || 
        selectedLocation || dateFrom || dateTo;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const renderLocationOptions = () => {
        const locations = filterOptions?.locations || [];
        return [
            { value: '', label: 'All Locations' },
            ...locations.map(location => ({
                value: location,
                label: location.charAt(0).toUpperCase() + location.slice(1)
            }))
        ];
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Filter Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg border ${hasActiveFilters 
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-900/50 dark:border-indigo-800 dark:text-indigo-400' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700'
                } transition-colors duration-200`}
                title="Filter users"
            >
                <FiFilter className="w-5 h-5" />
                {hasActiveFilters && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                    </span>
                )}
            </button>

            {/* Filter Dropdown Panel */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    <div className="p-4">
                        <div className="space-y-4">
                            {/* Type Filter */}
                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    User Type
                                </label>
                                <select
                                    id="type"
                                    className="w-full rounded-md border-gray-300 dark:border-gray-600 text-sm 
                                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                        focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400
                                        transition-colors duration-200"
                                    value={selectedType}
                                    onChange={(e) => onTypeChange(e.target.value)}
                                >
                                    {filterOptions?.userTypes.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Status Filter */}
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    className="w-full rounded-md border-gray-300 dark:border-gray-600 text-sm 
                                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                        focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400
                                        transition-colors duration-200"
                                    value={selectedStatus}
                                    onChange={(e) => onStatusChange(e.target.value)}
                                >
                                    {filterOptions?.statusTypes.map((status) => (
                                        <option key={status.value} value={status.value}>
                                            {status.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Location Filter */}
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Location
                                </label>
                                <select
                                    id="location"
                                    className="w-full rounded-md border-gray-300 dark:border-gray-600 text-sm 
                                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                        focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400
                                        transition-colors duration-200"
                                    value={selectedLocation}
                                    onChange={(e) => onLocationChange(e.target.value)}
                                >
                                    {renderLocationOptions().map((location) => (
                                        <option key={location.value} value={location.value}>
                                            {location.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date Range Filters */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Registration Date
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="date"
                                        className="w-full rounded-md border-gray-300 dark:border-gray-600 text-sm 
                                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                            focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400
                                            transition-colors duration-200"
                                        value={dateFrom}
                                        onChange={(e) => onDateFromChange(e.target.value)}
                                        min={filterOptions?.dateRange?.min}
                                        max={filterOptions?.dateRange?.max}
                                        placeholder="From"
                                    />
                                    <input
                                        type="date"
                                        className="w-full rounded-md border-gray-300 dark:border-gray-600 text-sm 
                                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                            focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400
                                            transition-colors duration-200"
                                        value={dateTo}
                                        onChange={(e) => onDateToChange(e.target.value)}
                                        min={filterOptions?.dateRange?.min}
                                        max={filterOptions?.dateRange?.max}
                                        placeholder="To"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-4 flex justify-end">
                            {hasActiveFilters && (
                                <button
                                    onClick={onClearFilters}
                                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 
                                        dark:hover:text-gray-200"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserFilters; 