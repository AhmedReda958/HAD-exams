"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Exam, Question, Answer } from "@/types/exam";
import QuestionEditorCard from "@/components/ui/QuestionEditorCard";

export default function ExamEditor() {
  const [exam, setExam] = useState<Exam>({
    title: "",
    questions: [],
    description: "",
  });

  const addQuestion = () => {
    setExam((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          title: "",
          answers: [
            { title: "", isCorrect: false },
            { title: "", isCorrect: false },
          ],
          description: "",
        },
      ],
    }));
  };

  const removeQuestion = (index: number) => {
    setExam((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const updateQuestion = (index: number, question: Question) => {
    setExam((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) => (i === index ? question : q)),
    }));
  };

  const addAnswer = (questionIndex: number) => {
    setExam((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              answers: [...q.answers, { title: "", isCorrect: false }],
            }
          : q
      ),
    }));
  };

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    setExam((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              answers: q.answers.filter((_, j) => j !== answerIndex),
            }
          : q
      ),
    }));
  };

  const updateAnswer = (
    questionIndex: number,
    answerIndex: number,
    answer: Answer
  ) => {
    setExam((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              answers: q.answers.map((a, j) =>
                j === answerIndex ? answer : { ...a, isCorrect: false }
              ),
            }
          : q
      ),
    }));
  };

  const isExamValid = () => {
    return (
      exam.title.trim() !== "" &&
      exam.questions.length > 0 &&
      exam.questions.every(
        (q) =>
          q.title.trim() !== "" &&
          q.answers.length >= 2 &&
          q.answers.some((a) => a.isCorrect) &&
          q.answers.every((a) => a.title.trim() !== "")
      )
    );
  };

  const handleSubmit = () => {
    if (isExamValid()) {
      console.log("Exam submitted:", exam);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Exam Editor</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Exam Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="exam-title">Exam Title</Label>
              <Input
                id="exam-title"
                value={exam.title}
                onChange={(e) =>
                  setExam((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter exam title"
              />
            </div>
            <div>
              <Label htmlFor="exam-description">
                Exam Description (Optional)
              </Label>
              <Textarea
                id="exam-description"
                value={exam.description}
                onChange={(e) =>
                  setExam((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Enter exam description"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {exam.questions.map((question, questionIndex) => (
        <QuestionEditorCard
          key={questionIndex}
          question={question}
          questionIndex={questionIndex}
          updateQuestion={updateQuestion}
          removeQuestion={removeQuestion}
          addAnswer={addAnswer}
          removeAnswer={removeAnswer}
          updateAnswer={updateAnswer}
        />
      ))}

      <Button onClick={addQuestion} className="mb-6">
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Question
      </Button>

      <Button
        onClick={handleSubmit}
        disabled={!isExamValid()}
        className="w-full"
      >
        Submit Exam
      </Button>
    </div>
  );
}
