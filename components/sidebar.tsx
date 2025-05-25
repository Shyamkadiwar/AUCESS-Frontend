import Logo from '@/public/mainLogo.png'
import Image from 'next/image';
import { Home, BookOpen, Trophy, LogOut, Users } from 'lucide-react';
import { Link } from './ui/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export function Sidebar() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/logout`, {}, {
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
        <Link href={'/user/dashboard'} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <Home className="w-5 h-5" />
          Dashboard
        </Link>
        <Link href={'/user/quizzes'} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <BookOpen className="w-5 h-5" />
          Ongoing Quizzes
        </Link>
        <Link href={'/user/completed-quiz'} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <Trophy className="w-5 h-5" />
          Completed Quizzes
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