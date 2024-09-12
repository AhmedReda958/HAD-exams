import { Exam } from "@/types/exam";

// ger all exams
const getExamsFromLocalStorage = (): Exam[] => {
  const storedExams = localStorage.getItem("exams");
  return storedExams ? JSON.parse(storedExams) : [];
};

// get exam by index
const getExamByIndex = (index: number): Exam | null => {
  const exams = getExamsFromLocalStorage();
  // Check if the index is valid
  if (index >= 0 && index < exams.length) {
    return exams[index];
  }
  return null; // Return null if index is out of bounds
};

// save exam
const saveExamToLocalStorage = (exam: Exam): void => {
  const storedExams = localStorage.getItem("exams");
  const exams: Exam[] = storedExams ? JSON.parse(storedExams) : [];
  // Add the new exam
  exams.push(exam);
  // Save the updated list back to localStorage
  localStorage.setItem("exams", JSON.stringify(exams));
};

// edit exam
const editExamInLocalStorage = (index: number, updatedExam: Exam): void => {
  const exams = getExamsFromLocalStorage();
  // Check if the index is valid
  if (index >= 0 && index < exams.length) {
    exams[index] = updatedExam; // Update the exam at the given index
    // Save the updated list back to localStorage
    localStorage.setItem("exams", JSON.stringify(exams));
  }
};

// delete exam
const deleteExamFromLocalStorage = (index: number): void => {
  const exams = getExamsFromLocalStorage();
  // Check if the index is valid
  if (index >= 0 && index < exams.length) {
    exams.splice(index, 1); // Remove the exam at the given index
    // Save the updated list back to localStorage
    localStorage.setItem("exams", JSON.stringify(exams));
  }
};

export {
  saveExamToLocalStorage,
  getExamsFromLocalStorage,
  getExamByIndex,
  editExamInLocalStorage,
  deleteExamFromLocalStorage,
};
