"use client"

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/admin/sidebar';
import axios from 'axios';
import CreateSubAdminForm from '@/components/subadmin/CreateSubAdmin';
import SubAdminList from '@/components/subadmin/SubAdminList';
import { SubAdmin } from '@/components/subadmin/types';
import { useRouter } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SubAdminPage = () => {
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  const fetchSubAdmins = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.get('http://localhost:3000/api/v1/admin/sub-admins', {
        withCredentials: true
      });
      
      if (response.data && response.data.success) {
        setSubAdmins(response.data.subAdmins || []);
        setIsAdmin(true);
      } else {
        setError(response.data?.message || 'Failed to fetch sub-admins');
      }
    } catch (err: any) {
      console.error('Error fetching sub-admins:', err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        setIsAdmin(false);
        setIsAuthenticated(false);
        setError('You do not have permission to access this page');
        return;
      }
      setError(err.response?.data?.message || 'Failed to fetch sub-admins');
    } finally {
      setIsLoading(false);
    }
  };

  const checkAdminStatus = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/admin/dashboard', {
        withCredentials: true
      });
      
      if (response.data && response.data.user) {
        const isUserAdmin = response.data.user.role === 'ADMIN';
        setIsAdmin(isUserAdmin);
        setIsAuthenticated(true);
        
        if (!isUserAdmin) {
          setError('Access denied. Only administrators can manage sub-admins.');
        }
      }
    } catch (err: any) {
      console.error('Authentication error:', err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        setIsAuthenticated(false);
        setError('Authentication failed. Please login to continue.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAdminStatus().then(() => {
      if (isAdmin) {
        fetchSubAdmins();
      }
    });
  }, [isAdmin]);
  if (isLoading) {
    return (
      <div className="h-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="h-full min-h-screen flex flex-col w-full overflow-hidden bg-gradient-to-br from-blue-200 to-blue-300">
        <div className='hidden md:flex'>
          <Sidebar />
        </div>
        <main className="md:ml-64 p-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-6">
              {isAuthenticated 
                ? "You don't have permission to access this page. Only administrators can manage sub-admins." 
                : "Please login with an administrator account to access this page."}
            </p>
            <Button 
              onClick={() => isAuthenticated 
                ? router.push('/admin/dashboard') 
                : router.push('/login')}
            >
              {isAuthenticated ? 'Return to Dashboard' : 'Go to Login'}
            </Button>
          </div>
        </main>
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
            <h1 className="text-3xl font-bold text-gray-900">Sub-Admins</h1>
            <p className="text-gray-600">Manage your sub-admin accounts</p>
          </div>
        </div>

        <div>
          {isAdmin && <CreateSubAdminForm onSuccess={fetchSubAdmins} />}
          
          {error && isAdmin && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <SubAdminList 
            subAdmins={subAdmins} 
            isAdmin={isAdmin}
            onRefresh={fetchSubAdmins} 
          />
        </div>
      </main>
    </div>
  );
}

export default SubAdminPage;