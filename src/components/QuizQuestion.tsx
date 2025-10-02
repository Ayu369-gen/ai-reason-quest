import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface Question {
  id: string;
  text: string;
  correctAnswer: boolean;
  originalQuestion: string;
  originalOption: string;
}

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
}

const QuizQuestion = ({ question, questionNumber, totalQuestions, onAnswer }: QuizQuestionProps) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);

  useEffect(() => {
    if (timeLeft === 0 && !answered) {
      handleAnswer(false); // Default to incorrect if time runs out
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, answered]);

  const handleAnswer = (answer: boolean) => {
    if (answered) return;
    
    setAnswered(true);
    setSelectedAnswer(answer);
    const isCorrect = answer === question.correctAnswer;
    
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1500);
  };

  const progressValue = (timeLeft / 10) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="max-w-3xl w-full">
        <div className="bg-card rounded-2xl shadow-hover p-8 md:p-12 space-y-8 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-muted-foreground">
                Question {questionNumber} of {totalQuestions}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className={`w-5 h-5 ${timeLeft <= 3 ? 'text-destructive animate-pulse' : 'text-primary'}`} />
              <span className={`text-lg font-bold ${timeLeft <= 3 ? 'text-destructive' : 'text-primary'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <Progress 
            value={progressValue} 
            className={`h-2 ${timeLeft <= 3 ? '[&>div]:bg-destructive' : ''}`}
          />

          {/* Question */}
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
              <p className="text-xs text-muted-foreground mb-1">Context</p>
              <p className="text-sm font-medium text-foreground">{question.originalQuestion}</p>
              <p className="text-sm text-muted-foreground mt-2">{question.originalOption}</p>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {question.text}
            </h2>
          </div>

          {/* Answer Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              variant={
                answered && selectedAnswer === true
                  ? question.correctAnswer === true
                    ? "success"
                    : "destructive"
                  : "quiz"
              }
              size="xl"
              onClick={() => handleAnswer(true)}
              disabled={answered}
              className="flex-1"
            >
              {answered && selectedAnswer === true && (
                question.correctAnswer === true ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )
              )}
              Yes
            </Button>
            
            <Button
              variant={
                answered && selectedAnswer === false
                  ? question.correctAnswer === false
                    ? "success"
                    : "destructive"
                  : "outline"
              }
              size="xl"
              onClick={() => handleAnswer(false)}
              disabled={answered}
              className="flex-1"
            >
              {answered && selectedAnswer === false && (
                question.correctAnswer === false ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )
              )}
              No
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;