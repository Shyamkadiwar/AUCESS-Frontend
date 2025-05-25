"use client"
import { useState, useEffect, useRef, use } from 'react';
import axios from 'axios';
import { ArrowLeft, Clock, AlertCircle, Loader2, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Define interfaces for type safety
interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
}

interface Quiz {
  quizId: string;
  title: string;
  description: string;
  totalQuestions: number;
  questions: QuizQuestion[];
}

const QuizTaking = ({ params }: { params: Promise<{ quizId: string }> }) => {
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [showFullscreenWarning, setShowFullscreenWarning] = useState(true);
  const maxTabSwitches = 3;
  const fullscreenRef = useRef<HTMLDivElement>(null);

  const {quizId} = use(params);

  // Request fullscreen mode
  const enterFullscreen = () => {
    if (fullscreenRef.current) {
      if (fullscreenRef.current.requestFullscreen) {
        fullscreenRef.current.requestFullscreen();
      } else if ((fullscreenRef.current as any).webkitRequestFullscreen) {
        (fullscreenRef.current as any).webkitRequestFullscreen();
      } else if ((fullscreenRef.current as any).msRequestFullscreen) {
        (fullscreenRef.current as any).msRequestFullscreen();
      }
      setIsFullscreen(true);
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      if (!document.fullscreenElement) {
        handleTabSwitch();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Monitor visibility change for tab switches
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleTabSwitch();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [tabSwitchCount]);

  // Handle tab switch counter
  const handleTabSwitch = () => {
    const newCount = tabSwitchCount + 1;
    setTabSwitchCount(newCount);
    
    if (newCount >= maxTabSwitches) {
      // Auto-submit when max tab switches reached
      handleSubmitQuiz();
    }
  };

  // Start fullscreen and dismiss warning
  const startQuiz = () => {
    setShowFullscreenWarning(false);
    enterFullscreen();
  };

  // Fetch quiz questions
  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/quiz/${quizId}/take`, {
          withCredentials: true
        });

        if (response.data.success) {
          setQuiz(response.data.data);
          // Initialize timer if quiz has time limit
          if (response.data.data.timeLimit) {
            setTimeLeft(response.data.data.timeLimit);
          }
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error('Error fetching quiz questions:', err);
        setError(
          axios.isAxiosError(err) 
            ? err.response?.data?.message || err.message 
            : err instanceof Error 
              ? err.message 
              : 'Failed to load quiz questions'
        );
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuizQuestions();
    }
  }, [quizId]);

  // Timer functionality
  useEffect(() => {
    const timer = setInterval(() => {
      // Increment elapsed time
      setTimeElapsed(prev => prev + 1);
      
      // Decrement time left if there's a time limit
      if (timeLeft !== null) {
        setTimeLeft(prev => {
          if (prev !== null && prev <= 1) {
            clearInterval(timer);
            // Auto-submit when time is up
            handleSubmitQuiz();
            return 0;
          }
          return prev !== null ? prev - 1 : null;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number | null): string => {
    if (seconds === null) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  // Navigate to next question
  const handleNextQuestion = () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  // Navigate to previous question
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  // Submit quiz answers
  const handleSubmitQuiz = async () => {
    if (!quiz) return;

    // Prepare answers in required format
    const answersArray = Object.entries(answers).map(([questionId, answerId]) => ({
      questionId,
      answerId
    }));

    // Debug logging
    console.log("Submitting answers:", answersArray);

    try {
      setIsSubmitting(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/quiz/${quizId}/submit`, {
        answers: answersArray
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        console.log("Quiz submission successful:", response.data);
        console.log(answers);
        
        // Exit fullscreen before redirecting
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(err => console.error(err));
        }
        
        // Redirect to result page
        router.push(`/user/quiz-result/${quizId}`);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Error submitting quiz:', err);
      setError(
        axios.isAxiosError(err) 
          ? err.response?.data?.message || err.message 
          : err instanceof Error 
            ? err.message 
            : 'Failed to submit quiz'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if all questions are answered
  const allQuestionsAnswered = () => {
    if (!quiz) return false;
    return quiz.questions.every(q => answers[q.id]);
  };

  // Loading state
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-300">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-screen w-full text-black flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-300">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-center w-full max-w-md">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => router.back()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // If quiz not loaded
  if (!quiz) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-300">
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 text-center w-full max-w-md">
          <AlertCircle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-yellow-600 mb-2">Quiz Not Found</h2>
          <p className="text-gray-700 mb-4">The requested quiz could not be loaded.</p>
          <button 
            onClick={() => router.back()}
            className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Fullscreen warning state
  if (showFullscreenWarning) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-300">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Rules</h2>
          <div className="text-left mb-6 space-y-3">
            <p className="text-gray-700">This quiz will open in fullscreen mode:</p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li><strong>No tab switching allowed</strong> - You are permitted a maximum of <strong>3 tab switches</strong>.</li>
              <li>Exiting fullscreen will count as a tab switch.</li>
              <li>After 3 tab switches, your quiz will be automatically submitted.</li>
              <li>The remaining tab switches will be shown at the bottom of the quiz.</li>
            </ul>
          </div>
          <button 
            onClick={startQuiz}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
          >
            I Understand, Start Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestionData = quiz.questions[currentQuestion];

  return (
    <div ref={fullscreenRef} className="h-screen w-full flex flex-col bg-gradient-to-br from-blue-200 to-blue-300">
      {/* Quiz header */}
      <header className="bg-sky-50 shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              if (confirm("Are you sure you want to exit the quiz? Your progress will be lost.")) {
                if (document.fullscreenElement) {
                  document.exitFullscreen().catch(err => console.error(err));
                }
                router.back();
              }
            }} 
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-black" />
          </button>
          <h1 className="font-bold text-xl text-gray-800">{quiz.title}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <span className="font-medium text-black">
              {timeLeft !== null ? formatTime(timeLeft) : formatTime(timeElapsed)}
            </span>
          </div>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Question {currentQuestion + 1} / {quiz.totalQuestions}
          </div>
        </div>
      </header>

      {/* Quiz content */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
        <div className="max-w-3xl mx-auto">
          {/* Question */}
          <div className="bg-sky-50 rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-medium text-gray-800 mb-6">
              {currentQuestionData.text}
            </h2>
            
            {/* Options */}
            <div className="space-y-3">
              {currentQuestionData.options.map((option) => (
                <label 
                  key={option.id} 
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition ${
                    answers[currentQuestionData.id] === option.id
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestionData.id}`}
                    value={option.text}
                    checked={answers[currentQuestionData.id] === option.text}
                    onChange={() => handleAnswerSelect(currentQuestionData.id, option.text)}
                    className="h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-800">{option.text}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quiz navigation */}
      <footer className="bg-sky-50 shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestion === 0}
            className={`px-4 py-2 rounded-md font-medium ${
              currentQuestion === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>
          
          {/* Tab switch counter */}
          <div className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${
            tabSwitchCount >= maxTabSwitches - 1 ? 'bg-red-100 text-red-800' : 
            tabSwitchCount >= maxTabSwitches - 2 ? 'bg-amber-100 text-amber-800' : 
            'bg-green-100 text-green-800'
          }`}>
            {maxTabSwitches - tabSwitchCount} tab switches remaining
          </div>
        </div>
        
        <div className="flex gap-3">
          {!isFullscreen && (
            <button
              onClick={enterFullscreen}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition font-medium"
            >
              Return to Fullscreen
            </button>
          )}
          
          {currentQuestion < quiz.questions.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmitQuiz}
              disabled={!allQuestionsAnswered() || isSubmitting}
              className={`px-6 py-2 rounded-md font-medium flex items-center gap-2 ${
                allQuestionsAnswered() && !isSubmitting
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Quiz'
              )}
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default QuizTaking;