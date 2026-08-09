import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

export interface QuizAnswer {
  questionId: string;
  difficulty: number;
  topic: string;
  selectedAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
}

export interface QuizAttempt {
  studentId: string;
  quizId: string;
  quizTitle: string;

  score: number;
  totalQuestions: number;
  accuracy: number;

  highestDifficulty: number;

  answers: QuizAnswer[];

  topicPerformance: Record<
    string,
    {
      correct: number;
      wrong: number;
      answered: number;
    }
  >;
}

export async function saveQuizAttempt(
  attempt: QuizAttempt
): Promise<string> {
  if (!attempt.studentId) {
    throw new Error("No authenticated student ID.");
  }

  const docRef = await addDoc(
    collection(db, "quizAttempts"),
    {
      ...attempt,
      completedAt: serverTimestamp(),
    }
  );

  return docRef.id;
}