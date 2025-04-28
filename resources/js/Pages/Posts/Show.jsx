import React from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Card from '@/Components/Card';
import { FiBriefcase, FiMapPin, FiCalendar, FiTag, FiUsers } from 'react-icons/fi';
import { Link } from '@inertiajs/react';

const Show = ({ post }) => {
    return (
        <>
            <Head title="Post Details" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    {/* Post Details */}
                    <Card className="bg-white dark:bg-gray-800 shadow-sm">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{post.title}</h2>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        Posted by {post.company?.company_name}
                                    </p>
                                </div>
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        post.is_active
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                    }`}
                                >
                                    {post.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>

                            <div className="space-y-4">
                                {/* Location */}
                                <div className="flex items-start">
                                    <FiMapPin className="h-5 w-5 text-gray-400 mt-1 mr-3" />
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</h3>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{post.location}</p>
                                    </div>
                                </div>

                                {/* Deadline */}
                                <div className="flex items-start">
                                    <FiCalendar className="h-5 w-5 text-gray-400 mt-1 mr-3" />
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Deadline</h3>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {new Date(post.deadline).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</h3>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-line">
                                        {post.description}
                                    </p>
                                </div>

                                {/* Required Skills */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Required Skills</h3>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {post.skills?.map((skill) => (
                                            <span
                                                key={skill.id}
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                                            >
                                                <FiTag className="mr-1 h-3 w-3" />
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Applications */}
                    <Card className="bg-white dark:bg-gray-800 shadow-sm">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Applications</h2>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <FiUsers className="mr-1 h-4 w-4" />
                                    {post.applications_count || 0} applications
                                </div>
                            </div>

                            {post.applications?.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead>
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    Volunteer
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    Applied At
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {post.applications.map((application) => (
                                                <tr key={application.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900 dark:text-white">
                                                            {application.volunteer?.user?.username}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                application.status === 0
                                                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                                    : application.status === 1
                                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                            }`}
                                                        >
                                                            {application.status === 0
                                                                ? 'Pending'
                                                                : application.status === 1
                                                                ? 'Accepted'
                                                                : 'Rejected'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                        {new Date(application.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <Link
                                                            href={route('applications.show', application.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                        >
                                                            View Details
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400">No applications yet.</p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

Show.layout = page => <DashboardLayout children={page} title="Post Details" />;

export default Show; 