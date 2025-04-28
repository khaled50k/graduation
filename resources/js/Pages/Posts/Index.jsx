import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Card from '@/Components/Card';
import PostsTable from '@/Components/Posts/PostsTable';
import PostFilters from '@/Components/Posts/PostFilters';
import SearchInput from '@/Components/Users/SearchInput';
import { router } from '@inertiajs/react';
import { debounce } from 'lodash';
import { FiBriefcase, FiPlus } from 'react-icons/fi';

const Index = ({ posts, companies, skills, filters }) => {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [selectedCompany, setSelectedCompany] = useState(filters.company || '');
    const [selectedSkill, setSelectedSkill] = useState(filters.skill || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');

    const debouncedUpdateFilters = debounce((newFilters) => {
        router.get(route('posts.index'), {
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

    const handleCompanyChange = (value) => {
        setSelectedCompany(value);
        debouncedUpdateFilters({ company: value });
    };

    const handleSkillChange = (value) => {
        setSelectedSkill(value);
        debouncedUpdateFilters({ skill: value });
    };

    const handleStatusChange = (value) => {
        setSelectedStatus(value);
        debouncedUpdateFilters({ status: value });
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedCompany('');
        setSelectedSkill('');
        setSelectedStatus('');
        router.get(route('posts.index'), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Posts Management" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Card className="bg-white dark:bg-gray-800 shadow-sm">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Posts</h2>
                        <Link
                            href={route('posts.create')}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700 text-white text-sm font-medium rounded-lg transition duration-150 ease-in-out shadow-sm hover:shadow focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 gap-2"
                        >
                            <FiPlus className="w-5 h-5" />
                            <span>Add Post</span>
                        </Link>
                    </div>

                    {/* Search and Filters */}
                    <div className="py-4 sm:py-6 flex items-center justify-between">
                        <div className="w-64 sm:w-72">
                            <SearchInput
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                        <div>
                            <PostFilters
                                selectedCompany={selectedCompany}
                                selectedSkill={selectedSkill}
                                selectedStatus={selectedStatus}
                                onCompanyChange={handleCompanyChange}
                                onSkillChange={handleSkillChange}
                                onStatusChange={handleStatusChange}
                                onClearFilters={handleClearFilters}
                                companies={companies}
                                skills={skills}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="min-h-[400px]">
                        <PostsTable
                            posts={posts.data}
                            onPageChange={(page) => debouncedUpdateFilters({ page })}
                            pagination={posts}
                        />
                    </div>
                </Card>
            </div>
        </>
    );
};

Index.layout = page => <DashboardLayout children={page} title="Posts Management" />;

export default Index; 