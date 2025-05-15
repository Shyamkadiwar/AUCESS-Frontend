import Logo from '@/public/mainLogo.png'
import Image from 'next/image';
import { Home, BookOpen, Trophy, Settings, Users } from 'lucide-react';
import { Link } from './ui/link';

export function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 h-full max-h-screen fixed left-0 top-0 text-white p-6">
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
        <Link href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </nav>
    </div>
  );
}