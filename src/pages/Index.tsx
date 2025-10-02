import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Welcome from "@/components/Welcome";
import Instructions from "@/components/Instructions";
import QuizQuestion from "@/components/QuizQuestion";
import Results from "@/components/Results";
import { Loader2 } from "lucide-react";

type QuizStage = "welcome" | "instructions" | "loading" | "quiz" | "results";

interface Question {
  id: string;
  text: string;
  correctAnswer: boolean;
  originalQuestion: string;
  originalOption: string;
}

const Index = () => {
  const [stage, setStage] = useState<QuizStage>("welcome");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const loadQuestions = async () => {
    setStage("loading");
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-quiz');

      if (error) {
        throw error;
      }

      if (!data?.questions || data.questions.length === 0) {
        throw new Error("No questions received");
      }

      setQuestions(data.questions);
      setStage("quiz");
    } catch (error) {
      console.error("Error loading questions:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to load quiz questions. Please try again.",
        variant: "destructive",
      });
      setStage("welcome");
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setStage("results");
    }
  };

  const handleRestart = () => {
    setStage("welcome");
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuestions([]);
  };

  if (stage === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
          <p className="text-xl font-semibold text-foreground">Generating your quiz...</p>
          <p className="text-muted-foreground">Using AI to create personalized questions</p>
        </div>
      </div>
    );
  }

  if (stage === "welcome") {
    return <Welcome onStart={() => setStage("instructions")} />;
  }

  if (stage === "instructions") {
    return <Instructions onStart={loadQuestions} />;
  }

  if (stage === "quiz" && questions.length > 0) {
    return (
      <QuizQuestion
        question={questions[currentQuestionIndex]}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
      />
    );
  }

  if (stage === "results") {
    return (
      <Results
        score={score}
        totalQuestions={questions.length}
        onRestart={handleRestart}
      />
    );
  }

  return null;
};

export default Index;