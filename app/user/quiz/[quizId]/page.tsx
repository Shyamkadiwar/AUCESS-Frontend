"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sidebar } from '@/components/sidebar';
import { Calendar, Clock, Users, Award, FileText } from 'lucide-react';
import { Link } from '@/components/ui/link';

interface QuizOption {
  id: string;
  questionId: string;
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  id: string;
  quizId: string;
  text: string;
  points: number;
  timeLimit: number | null;
  options: QuizOption[];
}

interface LeaderboardEntry {
  id: string;
  leaderboardId: string;
  userId: string;
  score: number;
  completionTime: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
}

interface Leaderboard {
  id: string;
  quizId: string;
  entries?: LeaderboardEntry[];
  _count?: {
    entries: number;
  };
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  isPublic: boolean;
  timeLimit: number | null;
  passingScore: number;
  questions: QuizQuestion[];
  totalParticipants: number;
  totalQuestions: number;
  leaderboardEntries: number;
  leaderboard?: Leaderboard;
  topScores: LeaderboardEntry[];
}

interface PageParams {
  quizId: string;
}

const Quiz = ({ params }: { params: PageParams }) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);
  const [joinQuiz, setJoiningQuiz] = useState<boolean>(false)
  const [hasJoined, setHasJoined] = useState<boolean>(false)

  // Extract quizId from URL if using app router
  const quizId = params?.quizId;

  const handleJoin = async () => {
    setJoiningQuiz(true);
    setJoinError(null);
    
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/quiz/${quizId}/join`, {
        withCredentials: true
      });
      
      if (response.data.success) {
        setHasJoined(true);
      } else {
        setJoinError(response.data.message || 'Failed to join quiz');
      }
    } catch (err) {
      console.error(err)
    } finally {
      setJoiningQuiz(false);
    }
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/v1/quiz/${quizId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (response.status !== 200) {
          throw new Error(response.data.message || 'Failed to fetch quiz');
        }

        setQuiz(response.data.data as Quiz);
      } catch (err) {
        console.error('Error fetching quiz:', err);
        setError(
          axios.isAxiosError(err)
            ? err.response?.data?.message || err.message
            : err instanceof Error
              ? err.message
              : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (seconds: number | null | undefined): string => {
    if (!seconds) return 'No time limit';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="h-full min-h-screen flex flex-col w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <div className='hidden md:flex'>
          <Sidebar />
        </div>
        <main className="md:ml-64 p-8 flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading quiz details...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full min-h-screen flex flex-col w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <div className='hidden md:flex'>
          <Sidebar />
        </div>
        <main className="md:ml-64 p-8 flex items-center justify-center">
          <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-center w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
            <p className="text-gray-700">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="h-full min-h-screen flex flex-col w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <div className='hidden md:flex'>
          <Sidebar />
        </div>
        <main className="md:ml-64 p-8 flex items-center justify-center">
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 text-center w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-yellow-600 mb-2">Quiz Not Found</h2>
            <p className="text-gray-700">The requested quiz could not be found.</p>
            <button
              onClick={() => window.history.back()}
              className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition"
            >
              Go Back
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-full min-h-screen flex flex-col w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <div className='hidden md:flex'>
        <Sidebar />
      </div>
      <main className="md:ml-64 p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">{quiz.title}</h1>
            <p className="text-gray-600">{quiz.description}</p>
          </div>

        </div>

        {/* Quiz details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="text-gray-800">{formatDate(quiz.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Time Limit</p>
                  <p className="text-gray-800">{formatTime(quiz.timeLimit)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Questions</p>
                  <p className="text-gray-800">{quiz.totalQuestions}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Passing Score</p>
                  <p className="text-gray-800">{quiz.passingScore}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Participation</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Total Participants</p>
                  <p className="text-gray-800">{quiz.totalParticipants}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-black">Leaderboard Entries</p>
                  <p className="text-gray-800">{quiz.leaderboardEntries}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${quiz.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {quiz.isPublic ? 'Public' : 'Private'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg text-black shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Award className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Top Scores</h2>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                View All
              </button>
            </div>
            {quiz.topScores && quiz.topScores.length > 0 ? (
              <div className="space-y-2">
                {quiz.topScores.slice(0, 5).map((entry: LeaderboardEntry, index: number) => (
                  <div key={entry.id} className="flex items-center justify-between p-2 rounded bg-gray-50 hover:bg-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-600">{index + 1}.</span>
                      <span className="font-medium">{entry.user.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* <span className="text-sm text-gray-600">{formatTime(entry.completionTime)}</span> */}
                      <span className="font-bold text-blue-600">Score : {entry.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No scores yet</p>
            )}
          </div>
        </div>
        <div className="flex gap-2 w-ful justify-center items-center">
          <button 
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-green-700 transition"
          onClick={()=>(handleJoin())}>
            Join Quiz
          </button>
          <Link href={`/user/start-quiz/${quizId}`}>
            <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-green-700 transition">
              Start Quiz
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Quiz;