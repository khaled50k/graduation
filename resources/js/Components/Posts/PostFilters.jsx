import React, { useState, useRef, useEffect } from 'react';
import { FiFilter } from 'react-icons/fi';

const PostFilters = ({ 
    selectedCompany, 
    selectedSkill, 
    selectedStatus,
    onCompanyChange, 
    onSkillChange,
    onStatusChange,
    onClearFilters,
    companies,
    skills
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const hasActiveFilters = selectedCompany || selectedSkill || selectedStatus;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Filter Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg border ${hasActiveFilters 
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-900/50 dark:border-indigo-800 dark:text-indigo-400' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700'
                } transition-colors duration-200`}
                title="Filter posts"
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
                            {/* Company Filter */}
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Company
                                </label>
                                <select
                                    id="company"
                                    className="w-full rounded-md border-gray-300 dark:border-gray-600 text-sm 
                                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                        focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400
                                        transition-colors duration-200"
                                    value={selectedCompany}
                                    onChange={(e) => onCompanyChange(e.target.value)}
                                >
                                    <option value="">All Companies</option>
                                    {companies.map((company) => (
                                        <option key={company.id} value={company.id}>
                                            {company.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Skill Filter */}
                            <div>
                                <label htmlFor="skill" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Skill
                                </label>
                                <select
                                    id="skill"
                                    className="w-full rounded-md border-gray-300 dark:border-gray-600 text-sm 
                                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                        focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400
                                        transition-colors duration-200"
                                    value={selectedSkill}
                                    onChange={(e) => onSkillChange(e.target.value)}
                                >
                                    <option value="">All Skills</option>
                                    {skills.map((skill) => (
                                        <option key={skill.id} value={skill.id}>
                                            {skill.name}
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
                                    <option value="">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
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

export default PostFilters; 