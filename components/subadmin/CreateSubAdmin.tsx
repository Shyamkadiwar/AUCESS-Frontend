"use client"

import { useState } from 'react';
import { Plus, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface CreateSubAdminFormProps {
    onSuccess: () => void;
}

interface FormData {
    name: string;
    email: string;
    password: string;
}

const CreateSubAdminForm: React.FC<CreateSubAdminFormProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/create-sub-admin`, formData, {
                withCredentials: true // Important for sending cookies with the request
            });

            if (response.data.success) {
                setFormData({ name: '', email: '', password: '' });
                onSuccess(); // Refresh the list after successful creation
            } else {
                setError(response.data.message || 'Failed to create sub-admin');
            }
        } catch (err: any) {
            console.error('Error creating sub-admin:', err);
            setError(err.response?.data?.message || 'Failed to create sub-admin');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full flex justify-center items-center'>
            <div className="bg-white w-1/3 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold text-black mb-4">Create New Sub-Admin</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-black">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border  bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black flex items-center justify-center"
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <span className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                                Creating...
                            </span>
                        ) : (
                            <span className="flex items-center">
                                <Plus size={16} className="mr-2" />
                                Create Sub-Admin
                            </span>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateSubAdminForm;