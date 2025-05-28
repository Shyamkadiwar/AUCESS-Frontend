"use client"
import { useState, useEffect } from 'react';
import { CheckCircle, BookOpen, Trophy, ExternalLink } from 'lucide-react';
import axios from 'axios';
import { Card } from './ui/card';
import Link from 'next/link';

interface StatsDataItem {
  value: string;
}

interface StatsData {
  completedQuizzes: StatsDataItem;
  activeQuizzes: StatsDataItem;
  upcomingQuizzes: StatsDataItem;
}

export function Stats() {
  const [statsData, setStatsData] = useState<StatsData>({
    completedQuizzes: { value: '0' },
    activeQuizzes: { value: '0' },
    upcomingQuizzes: { value: '0' }
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Configure axios with credentials
        const axiosConfig = {
          withCredentials: true
        };

        // Fetch all data in parallel
        const [completedResponse, ongoingResponse, upcomingResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/quiz/user/quizzes/completed`, axiosConfig),
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/quiz/ongoing`, axiosConfig),
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/quiz/upcoming`, axiosConfig)
        ]);

        // Process the responses
        const completedQuizzes = completedResponse.data.count || completedResponse.data.data.length;
        const ongoingQuizzes = ongoingResponse.data.count || ongoingResponse.data.data.length;
        const upcomingQuizzes = upcomingResponse.data.count || upcomingResponse.data.data.length;

        setStatsData({
          completedQuizzes: { value: completedQuizzes.toLocaleString() },
          activeQuizzes: { value: ongoingQuizzes.toLocaleString() },
          upcomingQuizzes: { value: upcomingQuizzes.toLocaleString() }
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching stats data:", err);
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Define stats configuration
  const stats = [
    {
      label: 'Quiz Attempted',
      value: statsData.completedQuizzes.value,
      icon: CheckCircle,
      color: 'text-blue-600',
      link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/user/completed-quiz/`
    },
    {
      label: 'Active Quizzes',
      value: statsData.activeQuizzes.value,
      icon: Trophy,
      color: 'text-green-600',
      link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/user/quizzes/`
    },
    {
      label: 'Upcoming Quizzes',
      value: statsData.upcomingQuizzes.value,
      icon: BookOpen,
      color: 'text-purple-600',
      link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/user/dashboard`
    },
  ];

  if (error) {
    return <div className="text-red-500">Error loading stats data. Please try again later.</div>;
  }

  return (
    <div className="flex flex-col w-full justify-between pb-8 border-b border- lg:flex-row gap-6 mb-8">
      {stats.map((stat) => (
        <Link
          key={stat.label}
          href={stat.link}
          rel="noopener noreferrer"
          className='w-full'
        >
          <Card className="w-full flex flex-col p-4 relative bg-white dark:bg-[#18181a]">
            <div className="flex items-start w-full justify-between">
              <div>
                <h2 className="text-gray-600 dark:text-white/90">{stat.label}</h2>
                <p className="text-2xl font-semibold text-black dark:text-white/90 mt-2">
                  {loading ? '...' : stat.value}
                </p>
              </div>
              <stat.icon className={`w-6 h-6 text-[#86caf3]`} />
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}