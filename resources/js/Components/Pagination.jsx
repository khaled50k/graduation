import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ pagination, onPageChange }) => {
    if (!pagination.links || pagination.links.length <= 3) return null;

    const isFirstPage = pagination.current_page === 1;
    const isLastPage = pagination.current_page === pagination.last_page;
    const totalPages = pagination.last_page;
    const currentPage = pagination.current_page;

    // Calculate visible page numbers with a simpler approach
    const getVisiblePages = () => {
        const delta = 2; // Pages to show before and after current page
        const range = [];
        const rangeWithDots = [];

        // Always show first page
        range.push(1);

        for (let i = currentPage - delta; i <= currentPage + delta; i++) {
            if (i > 1 && i < totalPages) {
                range.push(i);
            }
        }

        // Always show last page
        if (totalPages > 1) {
            range.push(totalPages);
        }

        // Add dots where needed
        let l;
        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    const pages = getVisiblePages();

    return (
        <div className="border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Results count - Always visible */}
                <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    <span className="hidden sm:inline">Showing </span>
                    {pagination.from}-{pagination.to} of {pagination.total} results
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-1">
                    {/* Previous button */}
                    <button
                        onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
                        disabled={isFirstPage}
                        className={`
                            relative inline-flex items-center justify-center p-2 rounded-md
                            text-sm font-medium transition duration-150 ease-in-out
                            ${isFirstPage
                                ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }
                        `}
                        aria-label="Previous page"
                    >
                        <FiChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Page numbers */}
                    <div className="flex items-center">
                        {pages.map((page, index) => (
                            <React.Fragment key={index}>
                                {page === '...' ? (
                                    <span className="px-2 text-gray-400 dark:text-gray-500">•••</span>
                                ) : (
                                    <button
                                        onClick={() => onPageChange(page)}
                                        className={`
                                            relative inline-flex items-center justify-center
                                            min-w-[2rem] h-8 px-3 mx-0.5 rounded-md
                                            text-sm font-medium transition duration-150 ease-in-out
                                            ${page === currentPage
                                                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
                                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700'
                                            }
                                        `}
                                    >
                                        {page}
                                    </button>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Next button */}
                    <button
                        onClick={() => !isLastPage && onPageChange(currentPage + 1)}
                        disabled={isLastPage}
                        className={`
                            relative inline-flex items-center justify-center p-2 rounded-md
                            text-sm font-medium transition duration-150 ease-in-out
                            ${isLastPage
                                ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }
                        `}
                        aria-label="Next page"
                    >
                        <FiChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination; 