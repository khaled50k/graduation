import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import Header from '@/Components/Dashboard/Header';
import useTheme from '@/Hooks/useTheme';
import HeaderActions from '@/Components/Dashboard/HeaderActions';

const DashboardLayout = ({ children, title, auth }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
        const saved = localStorage.getItem('sidebar-collapsed');
        return saved ? JSON.parse(saved) : false;
    });
    const [isDarkMode, setIsDarkMode] = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    // Sample notifications - in a real app, these would come from your backend
    const notifications = [
        {
            title: 'New Order',
            message: 'You have received a new order #1234',
            time: '5 minutes ago',
            type: 'success'
        },
        {
            title: 'System Update',
            message: 'System maintenance scheduled for tonight',
            time: '1 hour ago',
            type: 'warning'
        },
        {
            title: 'Payment Failed',
            message: 'Payment for order #5678 failed',
            time: '2 hours ago',
            type: 'error'
        }
    ];

    // Mock search functionality
    useEffect(() => {
        if (searchQuery) {
            // Simulate API call with mock results
            setSearchResults([
                {
                    title: 'Dashboard Overview',
                    description: 'Main dashboard page',
                    href: route('dashboard'),
                    icon: '📊'
                },
                {
                    title: 'User Settings',
                    description: 'Manage your account settings',
                    href: '#',
                    icon: '⚙️'
                }
            ]);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    // Persist sidebar state
    useEffect(() => {
        localStorage.setItem('sidebar-collapsed', JSON.stringify(isSidebarCollapsed));
    }, [isSidebarCollapsed]);

    const handleSidebarCollapse = (collapsed) => {
        setIsSidebarCollapsed(collapsed);
    };

    return (
        <div className="min-h-screen bg-surface-light dark:bg-background-darker">
            <Head title={title} />

            <Sidebar
                isCollapsed={isSidebarCollapsed}
                onCollapse={handleSidebarCollapse}
            />

            <div className={`flex flex-col transition-all duration-300 ease-in-out ${
                isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
            }`}>
                <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800 sm:gap-8 sm:px-6 lg:px-8">
                    <HeaderActions />
                </div>

                <main className="flex-1">
                    <div className="py-6">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h1 className="text-2xl font-semibold text-content-dark dark:text-content-white">
                                {title}
                            </h1>
                        </div>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout; 