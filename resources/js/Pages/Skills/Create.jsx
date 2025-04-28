import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { FiTag } from 'react-icons/fi';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { TextInput } from '@/Components/Dashboard/Inputs';
import Button from '@/Components/Forms/Button';
import { useToast } from '@/Contexts/ToastContext';
import CreatePageLayout from '@/Components/Dashboard/CreatePageLayout';

const Create = () => {
    const { showSuccess, showError } = useToast();
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('skills.store'), {
            onSuccess: () => {
                showSuccess('Skill created successfully.');
            },
            onError: () => {
                showError('Failed to create skill. Please check the form for errors.');
            }
        });
    };

    return (
        <>
            <Head title="Create Skill" />
            <CreatePageLayout 
                title="Create Skill"
                backRoute={route('skills.index')}
            >
                <form onSubmit={handleSubmit}>
                        <div className="px-4 py-5 sm:p-6 space-y-6">
                            <TextInput
                                id="name"
                                type="text"
                                label="Skill Name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                error={errors.name}
                                icon={FiTag}
                                required
                                placeholder="Enter skill name"
                                className="bg-white dark:bg-gray-800"
                            />
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
                                {processing ? 'Creating...' : 'Create Skill'}
                            </Button>
                        </div>
                    </form>
            </CreatePageLayout>
        </>
    );
};

Create.layout = page => <DashboardLayout children={page} title="Create Skill" />;

export default Create; 