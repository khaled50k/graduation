import React, { Fragment, useState } from 'react';
import { Link } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { 
    FiBell, 
    FiLogOut, 
    FiUser, 
    FiCheckCircle, 
    FiAlertCircle, 
    FiAlertTriangle, 
    FiInfo, 
    FiChevronDown,
    FiSun,
    FiMoon
} from 'react-icons/fi';
import { useAuth } from '@/Contexts/AuthContext';
import { useTheme } from '@/Contexts/ThemeContext';
import ThemeCustomizer from './ThemeCustomizer';
import { colorSchemes } from '@/Config/theme';
import SearchBar from './Search/SearchBar';

const NotificationItem = ({ title, message, time, type = 'info' }) => {
    const IconComponent = {
        success: FiCheckCircle,
        warning: FiAlertTriangle,
        error: FiAlertCircle,
        info: FiInfo
    }[type];

    return (
        <div className="flex space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <div className={`mt-1 flex-shrink-0 rounded-full p-2 ${
                type === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-800/20 dark:text-green-400' :
                type === 'warning' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-800/20 dark:text-yellow-400' :
                type === 'error' ? 'bg-red-100 text-red-600 dark:bg-red-800/20 dark:text-red-400' :
                'bg-blue-100 text-blue-600 dark:bg-blue-800/20 dark:text-blue-400'
            }`}>
                <IconComponent className="h-5 w-5" />
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{message}</p>
                <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">{time}</p>
            </div>
        </div>
    );
};

const HeaderActions = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isThemeCustomizerOpen, setIsThemeCustomizerOpen] = useState(false);
    const { user } = useAuth();
    const { theme, updateTheme } = useTheme();

    const notifications = [
        { id: 1, type: 'success', title: 'Profile Updated', message: 'Your account has been updated successfully', time: '5m ago' },
        { id: 2, type: 'info', title: 'Welcome', message: 'Welcome to the dashboard', time: '2h ago' },
    ];

    const getInitials = (username) => {
        return username
            ?.split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase() || 'U';
    };

    const toggleTheme = () => {
        updateTheme({ isDark: !theme.isDark });
    };

    return (
        <div className="flex w-full items-center justify-between gap-4">
            {/* Search - Left side */}
            <div className="w-full max-w-md">
                <SearchBar />
            </div>

            {/* Actions - Right side */}
            <div className="flex items-center gap-2">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-primary-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-primary-400"
                    title={theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {theme.isDark ? (
                        <FiSun className="h-5 w-5" />
                    ) : (
                        <FiMoon className="h-5 w-5" />
                    )}
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-primary-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-primary-400"
                        title="Notifications"
                    >
                        <FiBell className="h-5 w-5" />
                        {notifications.length > 0 && (
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary-500"></span>
                        )}
                    </button>

                    <Transition
                        show={isNotificationsOpen}
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <div className="absolute right-0 mt-2 w-80 rounded-lg border border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                            <div className="border-b border-gray-100 p-4 dark:border-gray-700">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
                            </div>
                            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                {notifications.map((notification) => (
                                    <NotificationItem
                                        key={notification.id}
                                        title={notification.title}
                                        message={notification.message}
                                        time={notification.time}
                                        type={notification.type}
                                    />
                                ))}
                            </div>
                        </div>
                    </Transition>
                </div>

                {/* User Menu */}
                <div className="relative">
                    <button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-sm font-medium text-white">
                            {getInitials(user?.username)}
                        </div>
                        {user?.username && (
                            <>
                                <div className="hidden text-left lg:block">
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{user.username}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                                </div>
                                <FiChevronDown className={`h-4 w-4 text-gray-500 transition-transform dark:text-gray-400 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                            </>
                        )}
                    </button>

                    <Transition
                        show={isUserMenuOpen}
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <div className="absolute right-0 mt-2.5 w-56 z-50 rounded-lg border border-gray-100 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                            <div className="px-4 py-2 lg:hidden">
                                <div className="text-sm font-semibold text-gray-900 dark:text-white">{user?.username}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</div>
                            </div>
                            <div className="lg:hidden border-b border-gray-100 dark:border-gray-700 my-2"></div>
                            <Link
                                href={route('profile')}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                <FiUser className="h-4 w-4" />
                                Profile
                            </Link>
                            <div className="border-b border-gray-100 dark:border-gray-700 my-2"></div>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 dark:text-red-400 dark:hover:bg-gray-700"
                            >
                                <FiLogOut className="h-4 w-4" />
                                Logout
                            </Link>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    );
};

export default HeaderActions; 