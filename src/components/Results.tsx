import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, Award, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const Results = ({ score, totalQuestions, onRestart }: ResultsProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getGrade = () => {
    if (percentage >= 90) return { grade: "A+", message: "Outstanding!", color: "text-success" };
    if (percentage >= 80) return { grade: "A", message: "Excellent!", color: "text-success" };
    if (percentage >= 70) return { grade: "B", message: "Good job!", color: "text-primary" };
    if (percentage >= 60) return { grade: "C", message: "Not bad!", color: "text-accent" };
    return { grade: "D", message: "Keep practicing!", color: "text-destructive" };
  };

  const gradeInfo = getGrade();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-card rounded-2xl shadow-hover p-8 md:p-12 text-center space-y-8 animate-fade-in">
          <div className="flex justify-center">
            <div className="bg-gradient-primary p-6 rounded-full shadow-card">
              <Trophy className="w-16 h-16 text-primary-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Quiz Complete!
            </h1>
            <p className="text-xl text-muted-foreground">
              Here are your results
            </p>
          </div>

          <div className="space-y-6 pt-4">
            {/* Score Display */}
            <div className="bg-muted/50 rounded-xl p-8 space-y-4">
              <div className="space-y-2">
                <div className={`text-7xl font-bold ${gradeInfo.color}`}>
                  {gradeInfo.grade}
                </div>
                <div className="text-2xl font-semibold text-foreground">
                  {gradeInfo.message}
                </div>
              </div>

              <Progress value={percentage} className="h-3 mt-4" />

              <div className="flex justify-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold text-foreground">{percentage}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  <span className="text-lg text-muted-foreground">
                    {score} / {totalQuestions} correct
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-success/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-success">{score}</div>
                <div className="text-sm text-muted-foreground">Correct Answers</div>
              </div>
              <div className="bg-destructive/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-destructive">{totalQuestions - score}</div>
                <div className="text-sm text-muted-foreground">Incorrect Answers</div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              variant="quiz"
              size="xl"
              onClick={onRestart}
              className="w-full md:w-auto px-12"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;