import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { FiUser, FiMail, FiMapPin, FiShield, FiLock, FiCreditCard } from 'react-icons/fi';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { TextInput, SelectInput } from '@/Components/Dashboard/Inputs';
import Button from '@/Components/Forms/Button';
import { useToast } from '@/Contexts/ToastContext';
import CreatePageLayout from '@/Components/Dashboard/CreatePageLayout';

const Edit = ({ user }) => {
    const { showSuccess, showError } = useToast();
    const { data, setData, put, processing, errors } = useForm({
        username: user.username,
        email: user.email,
        password: '',
        password_confirmation: '',
        user_type: user.user_type,
        national_id: user.national_id,
        location: user.location,
        is_active: user.is_active
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('users.update', user.id), {
            onSuccess: () => {
                showSuccess('User updated successfully.');
            },
            onError: () => {
                showError('Failed to update user. Please check the form for errors.');
            }
        });
    };

    return (
        <>
            <Head title={`Edit User - ${user.username}`} />
            <CreatePageLayout 
                title={`Edit User - ${user.username}`}
                backRoute={route('users.index')}
            >
                <form onSubmit={handleSubmit}>
                    <div className="px-4 py-5 sm:p-6 space-y-6">
                        {/* Username and Email */}
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                            <TextInput
                                id="username"
                                type="text"
                                label="Username"
                                value={data.username}
                                onChange={e => setData('username', e.target.value)}
                                error={errors.username}
                                icon={FiUser}
                                required
                                placeholder="Enter username"
                                className="bg-white dark:bg-gray-800"
                            />

                            <TextInput
                                id="email"
                                type="email"
                                label="Email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                error={errors.email}
                                icon={FiMail}
                                required
                                placeholder="Enter email address"
                                className="bg-white dark:bg-gray-800"
                            />
                        </div>

                        {/* Password Fields */}
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                            <TextInput
                                id="password"
                                type="password"
                                label="Password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                error={errors.password}
                                icon={FiLock}
                                placeholder="Enter new password"
                                className="bg-white dark:bg-gray-800"
                            />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                label="Confirm Password"
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                                icon={FiLock}
                                placeholder="Confirm new password"
                                className="bg-white dark:bg-gray-800"
                            />
                        </div>

                        {/* National ID and User Type */}
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                            <TextInput
                                id="national_id"
                                type="text"
                                label="National ID"
                                value={data.national_id}
                                onChange={e => setData('national_id', e.target.value)}
                                error={errors.national_id}
                                icon={FiCreditCard}
                                required
                                placeholder="Enter national ID"
                                className="bg-white dark:bg-gray-800"
                            />

                            <SelectInput
                                id="user_type"
                                label="User Type"
                                value={data.user_type}
                                onChange={e => setData('user_type', e.target.value)}
                                error={errors.user_type}
                                icon={FiShield}
                                required
                                className="bg-white dark:bg-gray-800"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </SelectInput>
                        </div>

                        {/* Location */}
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                            <TextInput
                                id="location"
                                type="text"
                                label="Location"
                                value={data.location}
                                onChange={e => setData('location', e.target.value)}
                                error={errors.location}
                                icon={FiMapPin}
                                required
                                placeholder="Enter location"
                                className="bg-white dark:bg-gray-800"
                            />
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="px-4 py-4 sm:px-6 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-end space-x-3">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-gray-800"
                        >
                            {processing ? 'Updating...' : 'Update User'}
                        </Button>
                    </div>
                </form>
            </CreatePageLayout>
        </>
    );
};

Edit.layout = page => <DashboardLayout children={page} title="Edit User" />;

export default Edit; 