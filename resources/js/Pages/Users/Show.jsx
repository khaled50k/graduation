import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { FiUser, FiMail, FiMapPin, FiShield, FiArrowLeft, FiCreditCard, FiEdit2, FiTrash2, FiCalendar, FiClock, FiInfo } from 'react-icons/fi';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Card from '@/Components/Dashboard/Card';
import Button from '@/Components/Forms/Button';
import { router } from '@inertiajs/react';
import ConfirmModal from '@/Components/Dashboard/ConfirmModal';
import InfoSection from '@/Components/Users/InfoSection';
import InfoItem from '@/Components/Users/InfoItem';
import StatusBadge from '@/Components/Users/StatusBadge';
import UserTypeBadge from '@/Components/Users/UserTypeBadge';
import { useToast } from '@/Contexts/ToastContext';

const Show = ({ user }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { showSuccess, showError } = useToast();

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        router.delete(route('users.destroy', user.id), {
            onSuccess: () => {
                showSuccess('User deleted successfully.');
                router.visit(route('users.index'));
            },
            onError: () => {
                showError('Failed to delete user. Please try again.');
            }
        });
        setShowDeleteModal(false);
    };

    return (
        <>
            <Head title={`User Details - ${user.username}`} />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Card className="bg-white dark:bg-gray-800 shadow-sm">
                    {/* Header */}
                    <div className="px-4 py-4 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Link
                                    href={route('users.index')}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors duration-150"
                                >
                                    <FiArrowLeft className="w-5 h-5" />
                                </Link>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    User Details
                                </h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link
                                    href={route('users.edit', user.id)}
                                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                                >
                                    <FiEdit2 className="w-4 h-4 mr-2" />
                                    Edit
                                </Link>
                                <Button
                                    onClick={handleDelete}
                                    variant="danger"
                                    className="inline-flex items-center"
                                >
                                    <FiTrash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* User Details */}
                    <div className="px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {/* Basic Information */}
                            <InfoSection title="Basic Information" icon={FiUser}>
                                <InfoItem label="Username" value={user.username} />
                                <InfoItem label="Email" value={user.email} icon={FiMail} />
                                <InfoItem label="User Type" value={<UserTypeBadge type={user.user_type} />} />
                                <InfoItem label="Status" value={<StatusBadge isActive={user.is_active} />} />
                            </InfoSection>

                            {/* Additional Information */}
                            <InfoSection title="Additional Information" icon={FiInfo}>
                                <InfoItem label="National ID" value={user.national_id} icon={FiCreditCard} />
                                <InfoItem label="Location" value={user.location} icon={FiMapPin} />
                                <InfoItem label="Created At" value={new Date(user.created_at).toLocaleDateString()} icon={FiCalendar} />
                                <InfoItem label="Last Updated" value={new Date(user.updated_at).toLocaleDateString()} icon={FiClock} />
                            </InfoSection>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                title="Delete User"
                message="Are you sure you want to delete this user? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
            />
        </>
    );
};

Show.layout = page => <DashboardLayout children={page} title="User Details" />;

export default Show; 