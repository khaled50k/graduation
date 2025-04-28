import { Link } from '@inertiajs/react';
import { FiUsers, FiUserPlus, FiHome } from 'react-icons/fi';

const Sidebar = () => {
    return (
        <aside className="bg-white dark:bg-gray-800 w-64 min-h-screen p-4">
            <nav className="space-y-1">
                <Link
                    href={route('dashboard')}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 group"
                >
                    <FiHome className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />
                    Dashboard
                </Link>
                <Link
                    href={route('users.index')}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 group"
                >
                    <FiUsers className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />
                    Users
                </Link>
                <Link
                    href={route('users.create')}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 group"
                >
                    <FiUserPlus className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />
                    Add User
                </Link>
                {/* Add other navigation items here */}
            </nav>
        </aside>
    );
};

export default Sidebar; 