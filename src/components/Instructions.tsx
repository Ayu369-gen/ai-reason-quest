import { Button } from "@/components/ui/button";
import { Clock, ListChecks, Target, Trophy } from "lucide-react";

interface InstructionsProps {
  onStart: () => void;
}

const Instructions = ({ onStart }: InstructionsProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="max-w-3xl w-full">
        <div className="bg-card rounded-2xl shadow-hover p-8 md:p-12 space-y-8 animate-fade-in">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Quiz Instructions
            </h1>
            <p className="text-muted-foreground">Please read carefully before starting</p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 p-4 bg-muted rounded-lg">
              <div className="bg-primary/10 p-3 rounded-lg h-fit">
                <ListChecks className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Question Format</h3>
                <p className="text-muted-foreground">
                  You will answer 20 reasoning-based questions about AI. Each question requires a simple <strong>Yes</strong> or <strong>No</strong> response.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-muted rounded-lg">
              <div className="bg-accent/10 p-3 rounded-lg h-fit">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Time Limit</h3>
                <p className="text-muted-foreground">
                  Each question has a <strong>10-second</strong> timer. Answer quickly but thoughtfully!
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-muted rounded-lg">
              <div className="bg-primary/10 p-3 rounded-lg h-fit">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Question Order</h3>
                <p className="text-muted-foreground">
                  Questions are presented in random order to ensure fair assessment of your understanding.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-muted rounded-lg">
              <div className="bg-accent/10 p-3 rounded-lg h-fit">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Final Grade</h3>
                <p className="text-muted-foreground">
                  Your score will be revealed only after you complete all 20 questions.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 text-center">
            <Button
              variant="quiz"
              size="xl"
              onClick={onStart}
              className="w-full md:w-auto px-12"
            >
              Start the Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;