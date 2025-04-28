import React from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import PostForm from '@/Components/Posts/PostForm';
import CreatePageLayout from '@/Components/Dashboard/CreatePageLayout';

const Edit = ({ post, companies, skills }) => {
    return (
        <>
            <Head title="Edit Post" />
            <CreatePageLayout 
                title="Edit Post"
                backRoute={route('posts.index')}
            >
                <PostForm post={post} companies={companies} skills={skills} />
            </CreatePageLayout>
        </>
    );
};

Edit.layout = page => <DashboardLayout children={page} title="Edit Post" />;

export default Edit; 