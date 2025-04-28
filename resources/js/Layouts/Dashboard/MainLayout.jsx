import React from 'react';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { DashboardIcons } from '@/Components/Dashboard/Icons';

const MainLayout = ({ 
    title, 
    children, 
    actions,
    breadcrumbs = [],
    contentClassName = ''
}) => {
    return (
        <DashboardLayout>
            <Head title={title} />

            {/* Header */}
            <div className="sticky top-0 z-10 flex-shrink-0 flex flex-col bg-white dark:bg-gray-800 shadow-sm">
                {/* Breadcrumbs */}
                {breadcrumbs.length > 0 && (
                    <div className="px-4 sm:px-6 lg:px-8 py-2 bg-gray-50 dark:bg-gray-900/50">
                        <nav className="flex text-sm">
                            <ol className="flex items-center space-x-2">
                                <li>
                                    <Link
                                        href={route('dashboard')}
                                        className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500"
                                    >
                                        <DashboardIcons.Home className="h-4 w-4" />
                                    </Link>
                                </li>
                                {breadcrumbs.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <li>
                                            <DashboardIcons.ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-600" />
                                        </li>
                                        <li>
                                            {item.href ? (
                                                <Link
                                                    href={item.href}
                                                    className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500"
                                                >
                                                    {item.label}
                                                </Link>
                                            ) : (
                                                <span className="text-gray-700 dark:text-gray-300">
                                                    {item.label}
                                                </span>
                                            )}
                                        </li>
                                    </React.Fragment>
                                ))}
                            </ol>
                        </nav>
                    </div>
                )}

                {/* Page Header */}
                <div className="min-h-[64px] flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white truncate">
                            {title}
                        </h1>
                    </div>
                    {actions && (
                        <div className="flex items-center space-x-4 ml-4">
                            {actions}
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 relative focus:outline-none ${contentClassName}`}>
                <main className="flex-1 relative pb-8">
                    <div className="mt-8">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </DashboardLayout>
    );
};

export default MainLayout; 