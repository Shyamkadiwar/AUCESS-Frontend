import Logo from '@/public/mainLogo.png'
import Image from 'next/image';
import { Home, BookOpen, Trophy, Settings, Users, Plus, Timer, TimerOff, LogOut } from 'lucide-react';
import { Link } from '../ui/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

export function Sidebar() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await axios.post('http://localhost:3000/api/v1/admin/logout', {}, {
        withCredentials: true
      });
      
      if (response.data && response.data.success) {
        toast.success('Logged out successfully');
        // Redirect to home page after successful logout
        router.push('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Failed to logout. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };
  return (
    <div className="w-64 bg-gray-700 h-full max-h-screen fixed left-0 top-0 text-white p-6">
      <div className="flex items-center gap-2 mb-8">
        <Image src={Logo} alt='Aucess' className='w-12 h-16'/>
        <h1 className="text-2xl font-bold">AUCESS</h1>
      </div>
      
      <nav className="space-y-2">
        <Link href={'/admin/dashboard'} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <Home className="w-5 h-5" />
          Dashboard
        </Link>
        <Link href={'/admin/create-quiz'} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <Plus className="w-5 h-5" />
          Create Quiz
        </Link>
        <Link href={'/admin/quizzes'} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <Trophy className="w-5 h-5" />
          Ongoing Quizzes
        </Link>
        <Link href={'/admin/upcoming-quiz'} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <Timer className="w-5 h-5" />
          Upcoming Quizzes
        </Link>
        <Link href={'/admin/completed-quiz'} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <TimerOff className="w-5 h-5" />
          Completed Quizzes
        </Link>
        <Link href={'/admin/students'} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <Users className="w-5 h-5" />
          Students
        </Link>
        <Link href={'/admin/sub-admin'} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <Users className="w-5 h-5" />
          Manage Sub-admins 
        </Link>
        <button 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-left"
        >
          <LogOut className="w-5 h-5" />
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </nav>
    </div>
  );
}