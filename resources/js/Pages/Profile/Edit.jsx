import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Card from '@/Components/Dashboard/Card';
import { TextInput } from '@/Components/Dashboard/Inputs';
import Button from '@/Components/Forms/Button';
import { DashboardIcons } from '@/Components/Dashboard/Icons';

const Edit = () => {
    const { auth } = usePage().props;
    
    // Profile Information Form
    const { data: profileData, setData: setProfileData, patch: patchProfile, errors: profileErrors, processing: profileProcessing } = useForm({
        username: auth.user.username || '',
        email: auth.user.email || '',
        national_id: auth.user.national_id || '',
        location: auth.user.location || '',
    });

    // Password Change Form
    const { data: passwordData, setData: setPasswordData, patch: patchPassword, errors: passwordErrors, processing: passwordProcessing, reset: resetPassword } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        patchProfile(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                // Show success message
            },
        });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        patchPassword(route('profile.password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                resetPassword();
                // Show success message
            },
        });
    };

    return (
        <DashboardLayout>
            <Head title="Profile" />

            <div className="py-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    {/* Profile Information */}
                    <Card>
                        <Card.Header>
                            <div className="flex items-center">
                                <DashboardIcons.User className="h-6 w-6 text-gray-400 dark:text-gray-500 mr-3" />
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Profile Information
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        Update your account information
                                    </p>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <form id="profile-form" onSubmit={handleProfileSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <TextInput
                                        label="Username"
                                        value={profileData.username}
                                        onChange={e => setProfileData('username', e.target.value)}
                                        error={profileErrors.username}
                                        icon={DashboardIcons.User}
                                        required
                                        helpText="Maximum 50 characters"
                                    />

                                    <TextInput
                                        label="Email"
                                        type="email"
                                        value={profileData.email}
                                        onChange={e => setProfileData('email', e.target.value)}
                                        error={profileErrors.email}
                                        icon={DashboardIcons.Mail}
                                        required
                                        helpText="Maximum 100 characters"
                                    />

                                    <TextInput
                                        label="National ID"
                                        value={profileData.national_id}
                                        onChange={e => setProfileData('national_id', e.target.value)}
                                        error={profileErrors.national_id}
                                        icon={DashboardIcons.CreditCard}
                                        required
                                        helpText="Maximum 20 characters"
                                    />

                                    <TextInput
                                        label="Location"
                                        value={profileData.location}
                                        onChange={e => setProfileData('location', e.target.value)}
                                        error={profileErrors.location}
                                        icon={DashboardIcons.MapPin}
                                        required
                                        helpText="Maximum 255 characters"
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        icon={DashboardIcons.Save}
                                        loading={profileProcessing}
                                    >
                                        Save Profile
                                    </Button>
                                </div>
                            </form>
                        </Card.Body>
                    </Card>

                    {/* Security Settings */}
                    <Card>
                        <Card.Header>
                            <div className="flex items-center">
                                <DashboardIcons.Lock className="h-6 w-6 text-gray-400 dark:text-gray-500 mr-3" />
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Change Password
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        Ensure your account is using a secure password
                                    </p>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <form onSubmit={handlePasswordSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <TextInput
                                        label="Current Password"
                                        type="password"
                                        value={passwordData.current_password}
                                        onChange={e => setPasswordData('current_password', e.target.value)}
                                        error={passwordErrors.current_password}
                                        icon={DashboardIcons.Lock}
                                        required
                                        helpText="Required to change password"
                                    />

                                    <TextInput
                                        label="New Password"
                                        type="password"
                                        value={passwordData.password}
                                        onChange={e => setPasswordData('password', e.target.value)}
                                        error={passwordErrors.password}
                                        icon={DashboardIcons.Lock}
                                        required
                                        helpText="8-60 characters"
                                    />

                                    <div className="sm:col-span-2">
                                        <TextInput
                                            label="Confirm Password"
                                            type="password"
                                            value={passwordData.password_confirmation}
                                            onChange={e => setPasswordData('password_confirmation', e.target.value)}
                                            error={passwordErrors.password_confirmation}
                                            icon={DashboardIcons.Lock}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        icon={DashboardIcons.Lock}
                                        loading={passwordProcessing}
                                    >
                                        Update Password
                                    </Button>
                                </div>
                            </form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Edit; 