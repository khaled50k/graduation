import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { FiTag } from 'react-icons/fi';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { TextInput } from '@/Components/Dashboard/Inputs';
import Button from '@/Components/Forms/Button';
import { useToast } from '@/Contexts/ToastContext';
import CreatePageLayout from '@/Components/Dashboard/CreatePageLayout';

const Edit = ({ skill }) => {
    const { showSuccess, showError } = useToast();
    const { data, setData, put, processing, errors } = useForm({
        name: skill.name,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('skills.update', skill.id), {
            onSuccess: () => {
                showSuccess('Skill updated successfully.');
            },
            onError: () => {
                showError('Failed to update skill. Please check the form for errors.');
            }
        });
    };

    return (
        <>
            <Head title={`Edit Skill - ${skill.name}`} />
            <CreatePageLayout 
                title={`Edit Skill - ${skill.name}`}
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
                            {processing ? 'Updating...' : 'Update Skill'}
                        </Button>
                    </div>
                </form>
            </CreatePageLayout>
        </>
    );
};

Edit.layout = page => <DashboardLayout children={page} title="Edit Skill" />;

export default Edit; 