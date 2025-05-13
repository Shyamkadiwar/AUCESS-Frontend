
import { OngoingContests } from '@/components/onGoingContest';
import { QuizList } from '@/components/quizList';
import { Stats } from '@/components/stats';
import { Bell, Plus } from 'lucide-react';
import { Sidebar } from '@/components/admin/sidebar';

const DashboardComponent = () => {
  return (
    <div className="h-full min-h-screen flex flex-col w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <div className='hidden md:flex'>
        <Sidebar />
      </div>
      <main className="md:ml-64 p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-gray-600 text-lg">Here&apos;s what&apos;s happening with your quizzes today.</p>
          </div>

          <div className="flex items-center gap-6">
            <button className="p-2.5 rounded-full hover:bg-white hover:shadow-md transition-all duration-200 relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center gap-3">
              {/* <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=40&h=40"
                alt="Profile"
                className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-md"
              /> */}
              <div className="hidden md:block">
                <p className="font-medium text-gray-900">Sarah Wilson</p>
                <p className="text-sm text-gray-500">Premium User</p>
              </div>
            </div>
          </div>
        </div>

        <Stats />
        <OngoingContests />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Your Quizzes</h2>
                <p className="text-sm text-gray-500 mt-1">Manage and track your quiz activities</p>
              </div>
              <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-indigo-100">
                <Plus className="w-5 h-5" />
                Create Quiz
              </button>
            </div>
            <QuizList />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {/* Placeholder for recent activity items */}
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p>You completed &quot;JavaScript Basics&quot; quiz</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p>New quiz &quot;React Fundamentals&quot; created</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <p>Quiz &quot;Python for Beginners&quot; updated</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardComponent;