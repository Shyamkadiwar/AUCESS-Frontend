import { Sidebar } from './sidebar';
import { Stats } from './stats';
import { QuizList } from './quizList';
import { OngoingContests } from './onGoingContest';
import { Bell } from 'lucide-react';


const DashboardComponent = () => {
  return (
    <div className="h-full min-h-screen flex flex-col w-full overflow-hidden bg-gray-50">
      <div className='hidden md:flex'>
        <Sidebar />
      </div>
      <main className="md:ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-gray-600">Here's what's happening with your quizzes today.</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="w-6 h-6 text-gray-600" />
            </button>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=40&h=40"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>

        <Stats />
        <OngoingContests />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Your Quizzes</h2>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Create New Quiz
              </button>
            </div>
            <QuizList />
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardComponent;