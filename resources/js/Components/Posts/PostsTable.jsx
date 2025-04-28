import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { FiBriefcase, FiMapPin, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Pagination from '@/Components/Pagination';

const PostsTable = ({ posts, onPageChange, pagination }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const { delete: destroy } = useForm();

    const handleDeleteClick = (post) => {
        setPostToDelete(post);
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = () => {
        if (postToDelete) {
            destroy(route('posts.destroy', postToDelete.id), {
                onSuccess: () => {
                    setShowDeleteConfirm(false);
                    setPostToDelete(null);
                },
            });
        }
    };

    return (
        <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border-0">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-0">
                        <thead>
                            <tr>
                                {['Title', 'Company', 'Location', 'Status', 'Actions'].map((col) => (
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
                            {posts.map((post, index) => (
                                <tr
                                    key={post.id}
                                    className={
                                        `transition-all duration-200 ease-in group animate-fadeIn
                                        ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/70'}
                                        hover:shadow-md hover:z-10 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/30`
                                    }
                                    style={{ transitionProperty: 'background, box-shadow' }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <FiBriefcase className="w-4 h-4 text-indigo-500 mr-2" />
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {post.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                                            {post.company?.company_name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 font-medium">
                                            <FiMapPin className="w-4 h-4 text-gray-400 mr-1.5" />
                                            {post.location}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            post.is_active
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                        }`}>
                                            <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
                                                post.is_active ? 'bg-green-500' : 'bg-red-500'
                                            }`} />
                                            {post.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                                        <Link
                                            href={route('posts.edit', post.id)}
                                            className="inline-flex items-center justify-center rounded-md p-2 text-indigo-600 hover:text-white hover:bg-indigo-500 dark:text-indigo-300 dark:hover:bg-indigo-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                            aria-label="Edit"
                                            title="Edit"
                                        >
                                            <FiEdit2 className="h-5 w-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteClick(post)}
                                            className="inline-flex items-center justify-center rounded-md p-2 text-red-600 hover:text-white hover:bg-red-500 dark:text-red-300 dark:hover:bg-red-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-400"
                                            aria-label="Delete"
                                            title="Delete"
                                        >
                                            <FiTrash2 className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <Pagination pagination={pagination} onPageChange={onPageChange} />
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
                                        <FiTrash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                            Delete Post
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Are you sure you want to delete the post "{postToDelete?.title}"? This action cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleDeleteConfirm}
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setShowDeleteConfirm(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostsTable;

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