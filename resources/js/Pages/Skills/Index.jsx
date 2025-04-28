import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Card from '@/Components/Card';
import SkillsTable from '@/Components/Skills/SkillsTable';
import SearchInput from '@/Components/Skills/SearchInput';
import { router } from '@inertiajs/react';
import { debounce } from 'lodash';
import { FiTag, FiPlus } from 'react-icons/fi';
import { Link } from '@inertiajs/react';

const Index = ({ skills, filters = {} }) => {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');

    const debouncedUpdateFilters = debounce((newFilters) => {
        router.get(route('skills.index'), {
            ...filters,
            ...newFilters,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    }, 300);

    const handleSearch = (value) => {
        setSearchQuery(value);
        debouncedUpdateFilters({ search: value });
    };

    const handlePageChange = (page) => {
        debouncedUpdateFilters({ page });
    };

    return (
        <>
            <Head title="Skills Management" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Card className="bg-white dark:bg-gray-800 shadow-sm">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Skills</h2>
                        <Link
                            href={route('skills.create')}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700 text-white text-sm font-medium rounded-lg transition duration-150 ease-in-out shadow-sm hover:shadow focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 gap-2"
                        >
                            <FiPlus className="w-5 h-5" />
                            <span>Add Skill</span>
                        </Link>
                    </div>

                    {/* Search */}
                    <div className="py-4 sm:py-6">
                        <div className="w-64 sm:w-72">
                            <SearchInput
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="min-h-[400px]">
                        <SkillsTable
                            skills={skills.data}
                            pagination={skills}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </Card>
            </div>
        </>
    );
};

Index.layout = page => <DashboardLayout children={page} title="Skills Management" />;

export default Index; 