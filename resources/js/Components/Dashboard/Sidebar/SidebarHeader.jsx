import React from 'react';
import { Link } from '@inertiajs/react';
import { FiChevronsLeft, FiMenu } from 'react-icons/fi';
import { useTheme } from '@/Contexts/ThemeContext';
import ApplicationLogo from '@/Components/ApplicationLogo';

const SidebarHeader = ({ isCollapsed, onCollapse, isMobile = false }) => {
    const { theme } = useTheme();

    return (
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-3 dark:border-gray-700">
            <Link
                href={route('dashboard')}
                className={`flex items-center gap-3 rounded-lg transition-all duration-300 ${
                    isCollapsed ? 'w-10 justify-center' : 'w-full pr-3'
                }`}
            >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 text-primary-600 dark:bg-primary-500/20 dark:text-primary-400 ${
                    !isCollapsed && 'shrink-0'
                }`}>
                    <ApplicationLogo className="h-6 w-6" />
                </div>
                {!isCollapsed && (
                    <div className="flex flex-col truncate">
                        <span className="truncate text-sm font-semibold text-gray-800 dark:text-white">
                            {import.meta.env.VITE_APP_NAME || 'Laravel'}
                        </span>
                        <span className="truncate text-xs text-gray-400 dark:text-gray-500">
                            Dashboard
                        </span>
                    </div>
                )}
            </Link>

            <button
                onClick={onCollapse}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-primary-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-primary-400 ${
                    isMobile ? 'lg:hidden' : 'hidden lg:flex'
                }`}
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
                {isMobile ? (
                    <FiMenu className="h-5 w-5" />
                ) : (
                    <FiChevronsLeft className={`h-5 w-5 transition-transform duration-300 ${
                        isCollapsed ? 'rotate-180' : ''
                    }`} />
                )}
            </button>
        </div>
    );
};

export default SidebarHeader; 