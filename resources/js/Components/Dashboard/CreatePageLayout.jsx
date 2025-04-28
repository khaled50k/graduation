import React from 'react';
import { Link } from '@inertiajs/react';
import { FiArrowLeft } from 'react-icons/fi';
import Card from '@/Components/Dashboard/Card';

const CreatePageLayout = ({ title, backRoute, children }) => {
    return (
        <>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Card className="bg-white dark:bg-gray-800 shadow-sm">
                    <div className="px-4 py-4 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-4">
                            <Link
                                href={backRoute}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors duration-150"
                            >
                                <FiArrowLeft className="w-5 h-5" />
                            </Link>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {children}
                    </div>
                </Card>
            </div>
        </>
    );
};

export default CreatePageLayout; 