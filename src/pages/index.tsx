"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, Eye, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Exam } from "@/types/exam";
import { getExamsFromLocalStorage } from "@/utils/examActions";

export default function Home() {
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    const storedExams = getExamsFromLocalStorage();
    setExams(storedExams);
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Exams</h1>
        <Link href="/editor">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Exam
          </Button>
        </Link>
      </div>

      {exams.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">
              No exams found. Create your first exam!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{exam.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {exam.description || "No description provided"}
                </p>
                <p className="text-sm mb-4">
                  {exam.questions.length} question
                  {exam.questions.length !== 1 ? "s" : ""}
                </p>
                <div className="flex justify-end space-x-2">
                  <Link href={`/exam/${index}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </Link>
                  <Link href={`/editor?examId=${index}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
