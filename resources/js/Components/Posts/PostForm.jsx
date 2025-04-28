import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { FiBriefcase, FiMapPin, FiCalendar, FiTag, FiX, FiPlus, FiHome, FiFileText } from 'react-icons/fi';
import { Link } from '@inertiajs/react';
import { TextInput, SelectInput } from '@/Components/Dashboard/Inputs';
import Button from '@/Components/Forms/Button';

export default function PostForm({ post, companies, skills }) {
    const { data, setData, post: submit, put, processing, errors } = useForm({
        company_id: post?.company_id || '',
        title: post?.title || '',
        description: post?.description || '',
        location: post?.location || '',
        deadline: post?.deadline || '',
        is_active: post?.is_active ?? true,
        skills: post?.skills?.map(s => s.id) || [],
    });

    const [selectedSkills, setSelectedSkills] = useState(
        post?.skills?.map(s => ({ id: s.id, name: s.name })) || []
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (post) {
            put(route('posts.update', post.id));
        } else {
            submit(route('posts.store'));
        }
    };

    const handleSkillSelect = (skill) => {
        if (!selectedSkills.some(s => s.id === skill.id)) {
            setSelectedSkills([...selectedSkills, skill]);
            setData('skills', [...data.skills, skill.id]);
        }
    };

    const handleSkillRemove = (skillId) => {
        setSelectedSkills(selectedSkills.filter(s => s.id !== skillId));
        setData('skills', data.skills.filter(id => id !== skillId));
    };

    return (
        <form onSubmit={handleSubmit} className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="px-4 py-5 sm:p-6 space-y-6">
                {/* Company and Title */}
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <SelectInput
                        id="company_id"
                        label="Company"
                        value={data.company_id}
                        onChange={e => setData('company_id', e.target.value)}
                        error={errors.company_id}
                        icon={FiHome}
                        required
                        className="bg-white dark:bg-gray-800"
                    >
                        <option value="">Select a company</option>
                        {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                                {company.company_name}
                            </option>
                        ))}
                    </SelectInput>

                    <TextInput
                        id="title"
                        type="text"
                        label="Title"
                        value={data.title}
                        onChange={e => setData('title', e.target.value)}
                        error={errors.title}
                        icon={FiBriefcase}
                        required
                        placeholder="Enter post title"
                        className="bg-white dark:bg-gray-800"
                    />
                </div>

                {/* Location and Deadline */}
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <TextInput
                        id="location"
                        type="text"
                        label="Location"
                        value={data.location}
                        onChange={e => setData('location', e.target.value)}
                        error={errors.location}
                        icon={FiMapPin}
                        required
                        placeholder="Enter location"
                        className="bg-white dark:bg-gray-800"
                    />

                    <TextInput
                        id="deadline"
                        type="date"
                        label="Deadline"
                        value={data.deadline}
                        onChange={e => setData('deadline', e.target.value)}
                        error={errors.deadline}
                        icon={FiCalendar}
                        required
                        className="bg-white dark:bg-gray-800"
                    />
                </div>

                {/* Description */}
                <div className="grid grid-cols-1 gap-y-6 gap-x-4">
                    <TextInput
                        id="description"
                        type="textarea"
                        label="Description"
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        error={errors.description}
                        icon={FiFileText}
                        required
                        placeholder="Enter post description"
                        className="bg-white dark:bg-gray-800"
                        rows={4}
                    />
                </div>

                {/* Skills */}
                <div className="grid grid-cols-1 gap-y-6 gap-x-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Required Skills
                        </label>
                        <div className="mt-1">
                            {/* Selected Skills */}
                            <div className="flex flex-wrap gap-2 mb-2">
                                {selectedSkills.map((skill) => (
                                    <span
                                        key={skill.id}
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                                    >
                                        <FiTag className="h-3 w-3 mr-1" />
                                        {skill.name}
                                        <button
                                            type="button"
                                            onClick={() => handleSkillRemove(skill.id)}
                                            className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-indigo-600 hover:bg-indigo-200 dark:text-indigo-400 dark:hover:bg-indigo-800"
                                        >
                                            <FiX className="h-3 w-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>

                            {/* Skill Selection */}
                            <SelectInput
                                onChange={(e) => {
                                    const skill = skills.find(s => s.id === e.target.value);
                                    if (skill) handleSkillSelect(skill);
                                    e.target.value = '';
                                }}
                                icon={FiTag}
                                className="bg-white dark:bg-gray-800"
                            >
                                <option value="">Select skills</option>
                                {skills
                                    .filter(skill => !selectedSkills.some(s => s.id === skill.id))
                                    .map((skill) => (
                                        <option key={skill.id} value={skill.id}>
                                            {skill.name}
                                        </option>
                                    ))}
                            </SelectInput>
                        </div>
                        {errors.skills && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.skills}</p>
                        )}
                    </div>
                </div>

                {/* Active Status */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="is_active"
                        checked={data.is_active}
                        onChange={(e) => setData('is_active', e.target.checked)}
                        className="h-4 w-4 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-indigo-600 dark:focus:ring-offset-gray-800"
                    />
                    <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                        Active Post
                    </label>
                </div>
            </div>

            {/* Form Actions */}
            <div className="px-4 py-4 sm:px-6 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-end space-x-3">
                <Link
                    href={route('posts.index')}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
                >
                    Cancel
                </Link>
                <Button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-gray-800"
                >
                    {processing ? (post ? 'Updating...' : 'Creating...') : (post ? 'Update Post' : 'Create Post')}
                </Button>
            </div>
        </form>
    );
} 