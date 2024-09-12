"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getExamByIndex } from "@/utils/examActions";
import { Exam } from "@/types/exam";

export default function ExamDetailView() {
  const [exam, setExam] = useState<Exam | null>(null);

  const router = useRouter();

  const { examId } = router.query;

  useEffect(() => {
    const exam = getExamByIndex(parseInt(examId as string));
    setExam(exam);
  }, [examId]);

  const handleDelete = () => {
    try {
    } catch (err) {}
  };

  if (!exam) {
    return (
      <div className="flex justify-center items-center h-screen">
        Exam not found
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{exam.title}</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/editor?examId=${examId}`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this exam?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  exam and all its questions.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {exam.description && (
        <p className="text-muted-foreground mb-6">{exam.description}</p>
      )}

      {exam.questions.map((question, index) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <CardTitle>Question {index + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium mb-4">{question.title}</p>
            {question.description && (
              <p className="text-sm text-muted-foreground mb-4">
                {question.description}
              </p>
            )}
            <Separator className="my-4" />
            <div className="space-y-2">
              {question.answers.map((answer, answerIndex) => (
                <div
                  key={answerIndex}
                  className={`p-2 rounded-md ${
                    answer.isCorrect ? "bg-green-100 dark:bg-green-900" : ""
                  }`}
                >
                  <p className="font-medium">
                    {answer.title}
                    {answer.isCorrect && (
                      <span className="ml-2 text-green-600 dark:text-green-400">
                        (Correct)
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
