import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

interface WelcomeProps {
  onStart: () => void;
}

const Welcome = ({ onStart }: WelcomeProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-card rounded-2xl shadow-hover p-8 md:p-12 text-center space-y-8 animate-fade-in">
          <div className="flex justify-center">
            <div className="bg-gradient-primary p-6 rounded-full shadow-card">
              <Brain className="w-16 h-16 text-primary-foreground" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Reasoning Quiz
            </h1>
            <p className="text-xl text-muted-foreground">
              Test your understanding with reasoning-based questions
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Are you ready for the Quiz?
            </h2>
            
            <div className="flex gap-4 justify-center pt-4">
              <Button
                variant="quiz"
                size="xl"
                onClick={onStart}
                className="min-w-32"
              >
                Yes
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => window.location.reload()}
                className="min-w-32"
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;