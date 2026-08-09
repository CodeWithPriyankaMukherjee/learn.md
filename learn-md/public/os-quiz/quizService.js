import {
  addDoc,
  collection,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { db } from "./firebase.js";

export async function saveQuizAttempt(attempt) {
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
