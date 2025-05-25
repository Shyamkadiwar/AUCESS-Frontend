"use client"

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/admin/sidebar';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: User[];
  message?: string;
}

interface DashboardResponse {
  user: {
    role: string;
  }
}

const Students = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isSubAdmin, setIsSubAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<ApiResponse>('http://localhost:3000/api/v1/users/', {
        withCredentials: true
      });
      
      if (response.data && response.data.success) {
        setUsers(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const checkAdminStatus = async () => {
    try {
      const response = await axios.get<DashboardResponse>('http://localhost:3000/api/v1/admin/dashboard', {
        withCredentials: true
      });
      
      if (response.data && response.data.user) {
        setIsAdmin(response.data.user.role === 'ADMIN');
        setIsSubAdmin(response.data.user.role === 'SUB_ADMIN');
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
        router.push('/admin/sigin');
      }
    }
  };

  const confirmDelete = (userId: string) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

  const proceedWithDelete = async () => {
    if (!userToDelete) return;
    
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/admin/delete-user/${userToDelete}`, {
        withCredentials: true
      });
      
      if (response.data && response.status === 200) {
        fetchUsers();
        setUserToDelete(null);
        setShowDeleteModal(false);
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      const axiosError = err as AxiosError<{ message: string }>;
      setError('Failed to delete user. ' + (axiosError.response?.data?.message || 'Please try again later.'));
      setUserToDelete(null);
      setShowDeleteModal(false);
    }
  };

  useEffect(() => {
    checkAdminStatus().then(() => {
      fetchUsers();
    });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getUserNameById = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'this user';
  };
  
  if (isLoading) {
    return (
      <div className="h-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-screen flex flex-col w-full overflow-hidden bg-gradient-to-br from-blue-200 to-blue-300">
      <div className='hidden md:flex'>
        <Sidebar />
      </div>
      <main className="md:ml-64 p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
            <p className="text-gray-600">View and manage Students accounts</p>
          </div>
        </div>

        <div>
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <div className="bg-sky-50 shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto bg-sky-50">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    {(isAdmin || isSubAdmin) && (
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 
                              user.role === 'SUB_ADMIN' ? 'bg-blue-100 text-blue-800' : 
                                'bg-green-100 text-green-800'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(user.createdAt)}
                        </td>
                        {(isAdmin || isSubAdmin) && (
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {/* Only admins can delete any user. Sub-admins should not be able to delete admins */}
                            {isAdmin || (isSubAdmin && user.role !== 'ADMIN') ? (
                              <button 
                                onClick={() => confirmDelete(user.id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                              >
                                Delete
                              </button>
                            ) : null}
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={(isAdmin || isSubAdmin) ? 5 : 4} className="px-6 py-4 text-center text-sm text-gray-500">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete {getUserNameById(userToDelete || '')}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={proceedWithDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;