import React from 'react';
import { Link } from '@inertiajs/react';
import { FiChevronRight } from 'react-icons/fi';

const MenuItem = ({ icon: Icon, title, href, isActive, hasSubmenu, isSubmenuOpen, onClick, children, isCollapsed }) => {
    return (
        <div className="relative group">
            <Link
                href={href}
                onClick={onClick}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400'
                        : 'text-content-default hover:bg-surface-light hover:text-primary-600 dark:text-content-white dark:hover:bg-background-dark/50'
                }`}
            >
                <span className="relative">
                    {isActive && (
                        <span className="absolute -left-1 -top-1 h-7 w-7 animate-ping rounded-full bg-primary-500 opacity-20"></span>
                    )}
                    <Icon className={`h-5 w-5 flex-shrink-0 transition-all duration-200 ${
                        isActive ? 'text-primary-600 dark:text-primary-400' : 'text-content-light group-hover:text-primary-600 dark:text-content-lighter dark:group-hover:text-primary-400'
                    }`} />
                </span>
                {!isCollapsed && (
                    <>
                        <span className="flex-1">{title}</span>
                        {hasSubmenu && (
                            <FiChevronRight className={`h-4 w-4 transition-transform duration-300 ${isSubmenuOpen ? 'rotate-90' : ''}`} />
                        )}
                    </>
                )}
                {isCollapsed && (
                    <div className="absolute left-full z-50 ml-3 hidden w-max origin-left scale-95 rounded-lg border border-border-light bg-surface-white p-2 opacity-0 shadow-lg transition-all group-hover:block group-hover:scale-100 group-hover:opacity-100 dark:border-border-dark dark:bg-background-darker">
                        <span className="whitespace-nowrap px-2 py-1 font-medium">{title}</span>
                    </div>
                )}
            </Link>
            {hasSubmenu && isSubmenuOpen && !isCollapsed && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-border-light pl-4 dark:border-border-dark">
                    {children}
                </div>
            )}
        </div>
    );
};

export default MenuItem; 