"use client"
import { useState, useEffect } from 'react';
import { CheckCircle, BookOpen, Trophy, TrendingUp, ExternalLink } from 'lucide-react';
import axios from 'axios';
import { Card } from './ui/card';

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
          axios.get('http://localhost:3000/api/v1/quiz/user/quizzes/completed', axiosConfig),
          axios.get('http://localhost:3000/api/v1/quiz/ongoing', axiosConfig),
          axios.get('http://localhost:3000/api/v1/quiz/upcoming', axiosConfig)
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
      link: 'http://localhost:3001/user/completed-quiz/'
    },
    {
      label: 'Active Quizzes',
      value: statsData.activeQuizzes.value,
      icon: Trophy,
      color: 'text-green-600',
      link: 'http://localhost:3001/user/quizzes/'
    },
    {
      label: 'Upcoming Quizzes',
      value: statsData.upcomingQuizzes.value,
      icon: BookOpen,
      color: 'text-purple-600',
      link: 'http://localhost:3001/user/dashboard'
    },
  ];

  if (error) {
    return <div className="text-red-500">Error loading stats data. Please try again later.</div>;
  }

  return (
    <div className="flex flex-col w-full justify-between lg:flex-row gap-6 mb-8">
      {stats.map((stat) => (
        <Card key={stat.label} className="w-full flex flex-col p-4 relative bg-sky-50">
          <div className="flex items-start w-full justify-between">
            <div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-semibold text-black mt-1">
                {loading ? '...' : stat.value}
              </p>
            </div>
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
          </div>
          <a 
            href={stat.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </Card>
      ))}
    </div>
  );
}