import { Card } from './ui/card';
import { Users, BookOpen, Trophy, TrendingUp } from 'lucide-react';

const stats = [
  {
    label: 'Total Students',
    value: '1,234',
    icon: Users,
    trend: '+12%',
    color: 'text-blue-600',
  },
  {
    label: 'Active Quizzes',
    value: '45',
    icon: BookOpen,
    trend: '+5%',
    color: 'text-green-600',
  },
  {
    label: 'Completion Rate',
    value: '89%',
    icon: Trophy,
    trend: '+3%',
    color: 'text-purple-600',
  },
  {
    label: 'Avg. Score',
    value: '76%',
    icon: TrendingUp,
    trend: '+8%',
    color: 'text-orange-600',
  },
];

export function Stats() {
  return (
    <div className="flex flex-col w-full justify-between lg:flex-row gap-6 mb-8">
      {stats.map((stat) => (
        <Card key={stat.label} className='w-full flex flex-col'>
          <div className="flex items-start w-full justify-between">
            <div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-semibold text-black mt-1">{stat.value}</p>
              <p className="text-green-500 text-sm mt-1">{stat.trend} this month</p>
            </div>
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
          </div>
        </Card>
      ))}
    </div>
  );
}