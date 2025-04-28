import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputField from '@/Components/Forms/InputField';
import Button from '@/Components/Forms/Button';
import GuestLayout from '@/Layouts/GuestLayout';

const Register = () => {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        national_id: '',
        location: '',
        user_type: 3, // Set to admin type by default
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onSuccess: () => {
                // Redirect will be handled by the controller
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Register Admin Account" />

            <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">
                Create Admin Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                    label="Username"
                    name="username"
                    value={data.username}
                    onChange={(e) => setData('username', e.target.value)}
                    error={errors.username}
                    required
                />

                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                    required
                />

                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    required
                />

                <InputField
                    label="Confirm Password"
                    name="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    error={errors.password_confirmation}
                    required
                />

                <InputField
                    label="National ID"
                    name="national_id"
                    value={data.national_id}
                    onChange={(e) => setData('national_id', e.target.value)}
                    error={errors.national_id}
                    required
                />

                <InputField
                    label="Location"
                    name="location"
                    value={data.location}
                    onChange={(e) => setData('location', e.target.value)}
                    error={errors.location}
                    required
                />

                <Button
                    type="submit"
                    className="w-full"
                    loading={processing}
                >
                    Create Admin Account
                </Button>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            href={route('login')}
                            className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
};

export default Register; 