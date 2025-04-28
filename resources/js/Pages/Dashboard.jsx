import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import { FiUsers, FiBriefcase, FiHome, FiFileText } from 'react-icons/fi';
import WelcomeSection from '@/Components/Dashboard/WelcomeSection';
import StatCard from '@/Components/Dashboard/StatCard';
import ActivityCard from '@/Components/Dashboard/ActivityCard';
import ApplicationItem from '@/Components/Dashboard/ApplicationItem';
import PostItem from '@/Components/Dashboard/PostItem';

const Dashboard = ({ stats, recentApplications, recentPosts }) => {
    return (
        <DashboardLayout>
            <Head title="Dashboard" />

            <div className="space-y-6">
                <WelcomeSection />

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Users"
                        value={stats.users}
                        icon={FiUsers}
                        growth={stats.userGrowth}
                    />
                    <StatCard
                        title="Active Posts"
                        value={stats.activePosts}
                        icon={FiBriefcase}
                        growth={stats.postGrowth}
                    />
                    <StatCard
                        title="Total Companies"
                        value={stats.companies}
                        icon={FiHome}
                        growth={stats.companyGrowth}
                    />
                    <StatCard
                        title="Total Applications"
                        value={stats.applications}
                        icon={FiFileText}
                        growth={stats.applicationGrowth}
                    />
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <ActivityCard title="Recent Applications">
                        <div className="space-y-1">
                            {recentApplications.map((application, index) => (
                                <ApplicationItem
                                    key={index}
                                    title={application.title}
                                    company={application.company}
                                    status={application.status}
                                    time={application.time}
                                />
                            ))}
                        </div>
                    </ActivityCard>

                    <ActivityCard title="Recent Job Posts">
                        <div className="space-y-1">
                            {recentPosts.map((post, index) => (
                                <PostItem
                                    key={index}
                                    title={post.title}
                                    company={post.company}
                                    applications={post.applications}
                                    time={post.time}
                                />
                            ))}
                        </div>
                    </ActivityCard>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard; 