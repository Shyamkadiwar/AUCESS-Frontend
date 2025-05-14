import { BookOpen, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/app/admin/(app)/quizzes/page';

export const QuizCard = ({ quiz }: { quiz: Quiz }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 truncate pr-4">
            {quiz.title}
          </h3>
          <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
            ${quiz.price.toFixed(2)}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {quiz.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-700">
              {quiz.totalQuestions} Questions
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-700">
              {quiz.totalParticipants} Participants
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center text-black border-t pt-4 mt-4">
          <span className="text-xs text-gray-500">
            Created: {formatDate(quiz.createdAt)}
          </span>
          <div className="flex space-x-2">
            <Link href={`/admin/quiz/${quiz.id}`}>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};