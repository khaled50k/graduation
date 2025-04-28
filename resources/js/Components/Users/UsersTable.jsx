import React from 'react';
import { Link } from '@inertiajs/react';
import UserTypeTag from './UserTypeTag';
import { FiEdit2, FiEye, FiUserPlus } from 'react-icons/fi';
import Pagination from '../Pagination';

const UsersTable = ({ users, pagination, onPageChange }) => {
    return (
        <div className="space-y-4">
            {/* Header with Add User button */}
           

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border-0">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-0">
                        <thead>
                            <tr>
                                {['Username', 'Email', 'Type', 'Status', 'Location', 'Actions'].map((col) => (
                                    <th
                                        key={col}
                                        className="bg-gray-50 dark:bg-gray-700/60 px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider first:rounded-tl-xl last:rounded-tr-xl border-0"
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className={
                                        `transition-all duration-200 ease-in group animate-fadeIn
                                        ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/70'}
                                        hover:shadow-md hover:z-10 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/30`
                                    }
                                    style={{ transitionProperty: 'background, box-shadow' }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {user.username}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                                            {user.email}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <UserTypeTag type={user.user_type} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium shadow-sm
                                            ${user.is_active
                                                ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                                : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                            }`}>
                                            <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${user.is_active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                            {user.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                            <svg className="h-4 w-4 text-gray-400 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {user.location}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                                        <Link
                                            href={route('users.edit', user.id)}
                                            className="inline-flex items-center justify-center rounded-md p-2 text-indigo-600 hover:text-white hover:bg-indigo-500 dark:text-indigo-300 dark:hover:bg-indigo-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                            aria-label="Edit"
                                            title="Edit"
                                        >
                                            <FiEdit2 className="h-5 w-5" />
                                        </Link>
                                        <Link
                                            href={route('users.show', user.id)}
                                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-white hover:bg-gray-500 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                            aria-label="View"
                                            title="View"
                                        >
                                            <FiEye className="h-5 w-5" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <Pagination pagination={pagination} onPageChange={onPageChange} />
            </div>
        </div>
    );
};

export default UsersTable;

// Fade-in animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
.animate-fadeIn { animation: fadeIn 0.5s cubic-bezier(.4,0,.2,1) both; }
`;
document.head.appendChild(style); 