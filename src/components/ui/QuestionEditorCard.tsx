import { PlusCircle, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Question, Answer } from "@/types/exam";

type QuestionEditorCardProps = {
  question: Question;
  questionIndex: number;
  updateQuestion: (index: number, question: Question) => void;
  removeQuestion: (index: number) => void;
  addAnswer: (questionIndex: number) => void;
  removeAnswer: (questionIndex: number, answerIndex: number) => void;
  updateAnswer: (
    questionIndex: number,
    answerIndex: number,
    answer: Answer
  ) => void;
};

const QuestionEditorCard: React.FC<QuestionEditorCardProps> = ({
  question,
  questionIndex,
  updateQuestion,
  removeQuestion,
  addAnswer,
  removeAnswer,
  updateAnswer,
}) => {
  return (
    <Card key={questionIndex} className="mb-6">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Question {questionIndex + 1}</span>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => removeQuestion(questionIndex)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor={`question-${questionIndex}`}>Question</Label>
            <Input
              id={`question-${questionIndex}`}
              value={question.title}
              onChange={(e) =>
                updateQuestion(questionIndex, {
                  ...question,
                  title: e.target.value,
                })
              }
              placeholder="Enter question"
            />
          </div>
          <div>
            <Label htmlFor={`question-description-${questionIndex}`}>
              Description (Optional)
            </Label>
            <Textarea
              id={`question-description-${questionIndex}`}
              value={question.description}
              onChange={(e) =>
                updateQuestion(questionIndex, {
                  ...question,
                  description: e.target.value,
                })
              }
              placeholder="Enter question description"
            />
          </div>
          <div className="space-y-2">
            <Label>Answers</Label>
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex} className="flex items-center space-x-2">
                <Input
                  value={answer.title}
                  onChange={(e) =>
                    updateAnswer(questionIndex, answerIndex, {
                      ...answer,
                      title: e.target.value,
                    })
                  }
                  placeholder={`Answer ${answerIndex + 1}`}
                  className={answer.isCorrect ? "border-green-500" : ""}
                />
                <Button
                  variant={answer.isCorrect ? "default" : "outline"}
                  size="icon"
                  onClick={() =>
                    updateAnswer(questionIndex, answerIndex, {
                      ...answer,
                      isCorrect: !answer.isCorrect,
                    })
                  }
                >
                  <Check
                    className={`h-4 w-4 ${
                      answer.isCorrect ? "text-white" : "text-gray-400"
                    }`}
                  />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeAnswer(questionIndex, answerIndex)}
                  disabled={question.answers.length <= 2}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => addAnswer(questionIndex)}
              className="w-full"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Answer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionEditorCard;
