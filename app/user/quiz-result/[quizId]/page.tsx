"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { ChevronLeft, Award, XCircle, Users, Share2, Loader2 } from 'lucide-react';

interface QuizResult {
  quizId: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  percentageScore: number;
  completed: boolean;
  completedAt: string;
  rank: number;
  totalParticipants: number;
  topScores: {
    rank: number;
    name: string;
    score: number;
  }[];
}

export default function QuizResult({ params }: { params: Promise<{ quizId: string }> }) {
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizId, setQuizId] = useState<string | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        setQuizId(resolvedParams.quizId);
      } catch (err) {
        setError('Failed to load quiz ID');
        console.error(err);
      }
    };
    
    resolveParams();
  }, [params]);

  useEffect(() => {
    const fetchQuizResult = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/v1/quiz/${quizId}/result`, {
          withCredentials: true
        });

        if (response.data.success) {
          setResult(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error('Error fetching quiz result:', err);
        setError(
          axios.isAxiosError(err) 
            ? err.response?.data?.message || err.message 
            : err instanceof Error 
              ? err.message 
              : 'Failed to load quiz result'
        );
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuizResult();
    }
  }, [quizId]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number): string => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-blue-100';
    if (score >= 40) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const handleBackToQuizzes = () => {
    router.push('/user/quizzes');
  };

  const handleViewQuizDetails = () => {
    router.push(`/user/quiz/${quizId}`);
  };

  const handleShareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: `My Quiz Result: ${result?.quizTitle}`,
        text: `I scored ${result?.percentageScore}% on the ${result?.quizTitle} quiz!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Quiz result link copied to clipboard!'))
        .catch(() => alert('Failed to copy link'));
    }
  };

  if (loading) {
    return (
      <div className="h-full min-h-screen flex flex-col w-full overflow-hidden bg-gradient-to-br from-blue-200 to-blue-300">
        <div className='hidden md:flex'>
          <Sidebar />
        </div>
        <main className="md:ml-64 p-8 flex items-center justify-center h-screen">
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto" />
            <p className="mt-4 text-gray-600">Loading quiz results...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full min-h-screen flex flex-col w-full overflow-hidden bg-gradient-to-br from-blue-200 to-blue-300">
        <div className='hidden md:flex'>
          <Sidebar />
        </div>
        <main className="md:ml-64 p-8 flex items-center justify-center">
          <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-center w-full max-w-2xl">
            <XCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
            <p className="text-gray-700 mb-4">{error}</p>
            <button 
              onClick={handleBackToQuizzes}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Back to Quizzes
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-full min-h-screen flex flex-col w-full overflow-hidden bg-gradient-to-br from-blue-200 to-blue-300">
        <div className='hidden md:flex'>
          <Sidebar />
        </div>
        <main className="md:ml-64 p-8 flex items-center justify-center">
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 text-center w-full max-w-2xl">
            <XCircle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-yellow-600 mb-2">Result Not Found</h2>
            <p className="text-gray-700 mb-4">The requested quiz result could not be found.</p>
            <button 
              onClick={handleBackToQuizzes}
              className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition"
            >
              Back to Quizzes
            </button>
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
      <main className="md:ml-64 p-4 md:p-8">
        <div className="mb-6 flex items-center gap-2">
          <button 
            onClick={handleViewQuizDetails}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Quiz Results</h1>
        </div>
        <div className="bg-sky-50 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-1">{result.quizTitle}</h2>
            <p className="text-gray-500 mb-6">Completed on {formatDate(result.completedAt)}</p>
            
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex flex-col items-center mb-6 md:mb-0">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center ${getScoreBg(result.percentageScore)}`}>
                  <span className={`text-4xl font-bold ${getScoreColor(result.percentageScore)}`}>
                    {result.percentageScore}%
                  </span>
                </div>
                <p className="mt-2 text-gray-600 font-medium">
                  {result.score} / {result.totalQuestions} correct
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full md:w-auto">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <Award className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Rank</p>
                  <p className="text-xl font-bold text-gray-800">
                    {result.rank} <span className="text-sm font-normal text-gray-500">/ {result.totalParticipants}</span>
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Participants</p>
                  <p className="text-xl font-bold text-gray-800">{result.totalParticipants}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 p-4 flex flex-wrap gap-2 justify-center md:justify-end">
            <button 
              onClick={handleShareResult}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share Result
            </button>
            <button 
              onClick={handleViewQuizDetails}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
            >
              View Quiz Details
            </button>
          </div>
        </div>
        
        <div className="bg-sky-50 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Award className="h-6 w-6 text-blue-600" />
              Leaderboard
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-black">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-gray-600">Rank</th>
                    <th className="px-4 py-3 text-left text-gray-600">Name</th>
                    <th className="px-4 py-3 text-right text-gray-600">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {result.topScores.map((entry) => (
                    <tr 
                      key={entry.rank} 
                      className={`border-t border-gray-100 ${
                        entry.rank === result.rank ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="px-4 py-3">
                        {entry.rank <= 3 ? (
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                            entry.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                            entry.rank === 2 ? 'bg-gray-100 text-gray-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {entry.rank}
                          </span>
                        ) : (
                          entry.rank
                        )}
                      </td>
                      <td className={`px-4 py-3 font-medium ${
                        entry.rank === result.rank ? 'text-blue-600' : 'text-gray-800'
                      }`}>
                        {entry.name}
                        {entry.rank === result.rank && ' (You)'}
                      </td>
                      <td className="px-4 py-3 text-right font-bold">
                        {entry.score} / {result.totalQuestions}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button 
            onClick={handleBackToQuizzes}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
          >
            Take Another Quiz
          </button>
        </div>
      </main>
    </div>
  );
};