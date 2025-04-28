import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Card from '@/Components/Card';
import UsersTable from '@/Components/Users/UsersTable';
import UserFilters from '@/Components/Users/UserFilters';
import SearchInput from '@/Components/Users/SearchInput';
import { router } from '@inertiajs/react';
import { debounce } from 'lodash';
import { FiEdit2, FiEye, FiPlus } from 'react-icons/fi';
import { Link } from '@inertiajs/react';

const Index = ({ users, filters, filterOptions }) => {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [selectedType, setSelectedType] = useState(filters.type || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
    const [selectedLocation, setSelectedLocation] = useState(filters.location || '');
    const [dateFrom, setDateFrom] = useState(filters.dateFrom || '');
    const [dateTo, setDateTo] = useState(filters.dateTo || '');

    const debouncedUpdateFilters = debounce((newFilters) => {
        router.get(route('users.index'), {
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

    const handleTypeFilter = (value) => {
        setSelectedType(value);
        debouncedUpdateFilters({ type: value });
    };

    const handleStatusFilter = (value) => {
        setSelectedStatus(value);
        debouncedUpdateFilters({ status: value });
    };

    const handleLocationFilter = (value) => {
        setSelectedLocation(value);
        debouncedUpdateFilters({ location: value });
    };

    const handleDateFromChange = (value) => {
        setDateFrom(value);
        debouncedUpdateFilters({ dateFrom: value });
    };

    const handleDateToChange = (value) => {
        setDateTo(value);
        debouncedUpdateFilters({ dateTo: value });
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedType('');
        setSelectedStatus('');
        setSelectedLocation('');
        setDateFrom('');
        setDateTo('');
        router.get(route('users.index'), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Users Management" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Card className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Users</h2>
                <Link
                    href={route('users.create')}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700 text-white text-sm font-medium rounded-lg transition duration-150 ease-in-out shadow-sm hover:shadow focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 gap-2"
                >
                    <FiPlus className="w-5 h-5" />
                    <span>Add User</span>
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
                            <UserFilters
                                selectedType={selectedType}
                                selectedStatus={selectedStatus}
                                selectedLocation={selectedLocation}
                                dateFrom={dateFrom}
                                dateTo={dateTo}
                                onTypeChange={handleTypeFilter}
                                onStatusChange={handleStatusFilter}
                                onLocationChange={handleLocationFilter}
                                onDateFromChange={handleDateFromChange}
                                onDateToChange={handleDateToChange}
                                onClearFilters={handleClearFilters}
                                filterOptions={filterOptions}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="min-h-[400px]">
                        <UsersTable
                            users={users.data}
                            onPageChange={(page) => debouncedUpdateFilters({ page })}
                            pagination={users}
                        />
                    </div>
                </Card>
            </div>
        </>
    );
};

Index.layout = page => <DashboardLayout children={page} title="Users Management" />;

export default Index; 