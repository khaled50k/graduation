import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputField from '@/Components/Forms/InputField';
import Button from '@/Components/Forms/Button';
import GuestLayout from '@/Layouts/GuestLayout';

const Login = () => {
    const { data, setData, post, processing, errors } = useForm({
        login: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onSuccess: () => {
                // Redirect will be handled by the controller
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Sign In | Your Account" />

            <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Sign In to Your Account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Please enter your credentials to access your account
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                    label="Email Address or Username"
                    name="login"
                    type="text"
                    value={data.login}
                    onChange={(e) => setData('login', e.target.value)}
                    error={errors.login}
                    placeholder="Enter your email address or username"
                    required
                />

                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    placeholder="Enter your password"
                    required
                />

                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>

                    <Link
                        href={route('password.request')}
                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    loading={processing}
                >
                    Sign In to Account
                </Button>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link
                            href={route('register')}
                            className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Create an Account
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
};

export default Login; 