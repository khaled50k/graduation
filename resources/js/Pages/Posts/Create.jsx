import React from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import PostForm from '@/Components/Posts/PostForm';
import CreatePageLayout from '@/Components/Dashboard/CreatePageLayout';

const Create = ({ companies, skills }) => {
    return (
        <>
            <Head title="Create Post" />
            <CreatePageLayout 
                title="Create Post"
                backRoute={route('posts.index')}
            >
                <PostForm companies={companies} skills={skills} />
            </CreatePageLayout>
        </>
    );
};

Create.layout = page => <DashboardLayout children={page} title="Create Post" />;

export default Create; 