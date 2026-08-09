import { auth } from "./lib/firebase.ts";
import { saveQuizAttempt } from "./lib/quizService.ts";

const QUESTION_BANK = [
  // EASY
  {
    id: "e1",
    difficulty: 1,
    topic: "OS basics",
    question: "What does an operating system primarily provide?",
    options: [
      "A hardware schematic",
      "An interface between user and hardware",
      "A programming language",
      "A web browser",
    ],
    correctIndex: 1,
  },

  {
    id: "e2",
    difficulty: 1,
    topic: "Processes",
    question: "Which term best describes a running instance of a program?",
    options: [
      "Thread",
      "Process",
      "Package",
      "Module",
    ],
    correctIndex: 1,
  },

  {
    id: "e3",
    difficulty: 1,
    topic: "Memory management",
    question: "What is RAM used for in a computer?",
    options: [
      "Permanent storage",
      "Short-term working memory for programs",
      "Cooling the CPU",
      "Rendering graphics only",
    ],
    correctIndex: 1,
  },

  {
    id: "e4",
    difficulty: 1,
    topic: "Synchronization",
    question: "What is the purpose of a lock/mutex?",
    options: [
      "Increase memory",
      "Coordinate access to shared resources",
      "Speed up network IO",
      "Compress files",
    ],
    correctIndex: 1,
  },

  {
    id: "e5",
    difficulty: 1,
    topic: "OS basics",
    question: "Which of these is an OS-level responsibility?",
    options: [
      "Compiling code",
      "Managing files and devices",
      "Designing websites",
      "Creating 3D models",
    ],
    correctIndex: 1,
  },

  // MEDIUM
  {
    id: "m1",
    difficulty: 2,
    topic: "CPU scheduling",
    question:
      "Which scheduling algorithm gives each process a fair time slice in rotation?",
    options: [
      "Shortest Job First",
      "Round Robin",
      "Priority Scheduling",
      "First-Come First-Served",
    ],
    correctIndex: 1,
  },

  {
    id: "m2",
    difficulty: 2,
    topic: "Processes",
    question: "What is the difference between a process and a thread?",
    options: [
      "Process shares memory, thread does not",
      "Thread is a lightweight unit within a process",
      "They are the same",
      "Thread is heavier than a process",
    ],
    correctIndex: 1,
  },

  {
    id: "m3",
    difficulty: 2,
    topic: "Memory management",
    question: "Virtual memory allows a system to:",
    options: [
      "Run programs without RAM",
      "Use disk to extend apparent memory",
      "Increase CPU clock speed",
      "Eliminate multitasking",
    ],
    correctIndex: 1,
  },

  {
    id: "m4",
    difficulty: 2,
    topic: "Synchronization",
    question:
      "Which primitive can be used to wait for an event and sleep until it occurs?",
    options: [
      "Spinlock",
      "Semaphore",
      "No-op",
      "Compiler flag",
    ],
    correctIndex: 1,
  },

  {
    id: "m5",
    difficulty: 2,
    topic: "OS basics",
    question: "What is a kernel in an operating system?",
    options: [
      "A user application",
      "Core component managing resources",
      "A database",
      "A network protocol",
    ],
    correctIndex: 1,
  },

  // HARD
  {
    id: "h1",
    difficulty: 3,
    topic: "Deadlocks",
    question: "Which condition is NOT required for deadlock?",
    options: [
      "Mutual exclusion",
      "Hold and wait",
      "Circular wait",
      "Prevention",
    ],
    correctIndex: 3,
  },

  {
    id: "h2",
    difficulty: 3,
    topic: "CPU scheduling",
    question:
      "Which scheduling policy minimizes average waiting time if job lengths are known?",
    options: [
      "Round Robin",
      "Shortest Remaining Time First",
      "Priority Inversion",
      "First-Come First-Served",
    ],
    correctIndex: 1,
  },

  {
    id: "h3",
    difficulty: 3,
    topic: "Memory management",
    question:
      "Which technique improves locality by dividing memory into pages?",
    options: [
      "Segmentation",
      "Paging",
      "Virtualization",
      "Inlining",
    ],
    correctIndex: 1,
  },

  {
    id: "h4",
    difficulty: 3,
    topic: "Synchronization",
    question: "What problem does priority inheritance solve?",
    options: [
      "Memory leaks",
      "Priority inversion",
      "Paging faults",
      "Race detection",
    ],
    correctIndex: 1,
  },

  {
    id: "h5",
    difficulty: 3,
    topic: "Processes",
    question: "Which term describes a process created by another process?",
    options: [
      "Thread",
      "Fork child",
      "Daemon",
      "Zombie",
    ],
    correctIndex: 1,
  },
];

const TOTAL_QUESTIONS_PER_ATTEMPT = 10;

const DIFFICULTY_LABEL = {
  1: "FOUNDATIONAL",
  2: "INTERMEDIATE",
  3: "ADVANCED",
};

const state = {
  currentDifficulty: 2,
  highestDifficulty: 2,

  correctAnswers: 0,
  wrongAnswers: 0,

  answeredQuestions: [],
  answerHistory: [],

  topicPerformance: {},

  questionCount: 0,

  currentQuestion: null,
  selectedIndex: null,
};


// --------------------------------------------------
// DOM
// --------------------------------------------------

const currentQuestionNumberEl =
  document.getElementById("current-question-number");

const totalQuestionNumberEl =
  document.getElementById("total-question-number");

const progressTrackEl =
  document.getElementById("progress-track");

const checkpointCurrentEl =
  document.getElementById("checkpoint-current");

const checkpointTotalEl =
  document.getElementById("checkpoint-total");

const questionIndexEl =
  document.getElementById("question-index");

const questionTextEl =
  document.getElementById("question-text");

const optionsListEl =
  document.getElementById("options-list");

const validationMessageEl =
  document.getElementById("validation-message");

const prevBtn =
  document.getElementById("prev-btn");

const nextBtn =
  document.getElementById("next-btn");

const exitBtn =
  document.getElementById("exit-btn");

const quizShell =
  document.getElementById("quiz-shell");

const resultsShell =
  document.getElementById("results-shell");

const resultsFractionEl =
  document.getElementById("results-fraction");

const resultsPercentEl =
  document.getElementById("results-percent");

const resultsCorrectEl =
  document.getElementById("results-correct");

const resultsAnsweredEl =
  document.getElementById("results-answered");

const reviewBtn =
  document.getElementById("review-btn");

const dashboardBtn =
  document.getElementById("dashboard-btn");

const dashboardBtn2 =
  document.getElementById("dashboard-btn-2");

const backToSummaryBtn =
  document.getElementById("back-to-summary-btn");

const reviewListEl =
  document.getElementById("review-list");


// --------------------------------------------------
// Helpers
// --------------------------------------------------

function clampDifficulty(value) {
  return Math.max(1, Math.min(3, value));
}


function getQuestionsForDifficulty(difficulty) {
  return QUESTION_BANK.filter(
    (question) =>
      question.difficulty === difficulty &&
      !state.answeredQuestions.includes(question.id)
  );
}


function pickNextQuestionAdaptive() {
  let candidates =
    getQuestionsForDifficulty(state.currentDifficulty);

  // If no question exists at the current level,
  // look at all unanswered questions.
  if (candidates.length === 0) {
    candidates = QUESTION_BANK.filter(
      (question) =>
        !state.answeredQuestions.includes(question.id)
    );
  }

  // If somehow everything was answered, restart from bank.
  if (candidates.length === 0) {
    candidates = QUESTION_BANK;
  }

  const randomIndex =
    Math.floor(Math.random() * candidates.length);

  return candidates[randomIndex];
}


// --------------------------------------------------
// Progress
// --------------------------------------------------

function updateProgress() {
  const current =
    state.questionCount + 1;

  if (currentQuestionNumberEl) {
    currentQuestionNumberEl.textContent =
      String(Math.min(current, TOTAL_QUESTIONS_PER_ATTEMPT));
  }

  if (totalQuestionNumberEl) {
    totalQuestionNumberEl.textContent =
      String(TOTAL_QUESTIONS_PER_ATTEMPT);
  }

  if (checkpointCurrentEl) {
    checkpointCurrentEl.textContent =
      String(Math.min(current, TOTAL_QUESTIONS_PER_ATTEMPT));
  }

  if (checkpointTotalEl) {
    checkpointTotalEl.textContent =
      String(TOTAL_QUESTIONS_PER_ATTEMPT);
  }

  if (progressTrackEl) {
    const percentage =
      (state.questionCount /
        TOTAL_QUESTIONS_PER_ATTEMPT) *
      100;

    progressTrackEl.style.width =
      `${percentage}%`;
  }
}


function updateDifficultyLabel() {
  if (!progressTrackEl) return;

  const parent =
    progressTrackEl.parentElement;

  if (!parent) return;

  let label =
    parent.querySelector(".adaptive-level-label");

  if (!label) {
    label = document.createElement("div");

    label.className =
      "adaptive-level-label";

    label.style.marginTop = "10px";
    label.style.fontFamily =
      "IBM Plex Mono, Inter, sans-serif";
    label.style.fontSize = "12px";
    label.style.letterSpacing = "0.08em";
    label.style.color = "var(--muted)";

    parent.appendChild(label);
  }

  label.textContent =
    `LEVEL: ${DIFFICULTY_LABEL[state.currentDifficulty]}`;
}


// --------------------------------------------------
// Render question
// --------------------------------------------------

function renderQuestion(question) {
  if (!question) return;

  state.currentQuestion = question;
  state.selectedIndex = null;

  if (questionIndexEl) {
    questionIndexEl.textContent =
      String(state.questionCount + 1).padStart(2, "0");
  }

  if (questionTextEl) {
    questionTextEl.textContent =
      question.question;
  }

  if (optionsListEl) {
    optionsListEl.innerHTML = "";

    question.options.forEach(
      (optionText, optionIndex) => {

        const label =
          document.createElement("label");

        label.className = "option";

        const input =
          document.createElement("input");

        input.type = "radio";
        input.name = question.id;
        input.value = optionIndex;
        input.className = "option__input";

        input.addEventListener(
          "change",
          () => {
            selectAnswer(optionIndex);
          }
        );

        const marker =
          document.createElement("span");

        marker.className =
          "option__marker";

        marker.setAttribute(
          "aria-hidden",
          "true"
        );

        const text =
          document.createElement("span");

        text.className =
          "option__text";

        text.textContent =
          optionText;

        label.appendChild(input);
        label.appendChild(marker);
        label.appendChild(text);

        optionsListEl.appendChild(label);
      }
    );
  }

  if (validationMessageEl) {
    validationMessageEl.hidden = true;
  }

  updateProgress();
  updateDifficultyLabel();
  updateNavigation();
}


// --------------------------------------------------
// Answer selection
// --------------------------------------------------

function selectAnswer(optionIndex) {
  state.selectedIndex =
    optionIndex;

  if (validationMessageEl) {
    validationMessageEl.hidden = true;
  }

  if (optionsListEl) {
    const options =
      optionsListEl.querySelectorAll(".option");

    options.forEach(
      (option, index) => {
        option.classList.toggle(
          "is-selected",
          index === optionIndex
        );
      }
    );
  }
}


// --------------------------------------------------
// Navigation
// --------------------------------------------------

function updateNavigation() {
  if (prevBtn) {
    prevBtn.disabled = true;
  }

  if (!nextBtn) return;

  const isLast =
    state.questionCount >=
    TOTAL_QUESTIONS_PER_ATTEMPT - 1;

  if (isLast) {
    nextBtn.textContent =
      "Submit Quiz";
  } else {
    nextBtn.innerHTML =
      'Next <span aria-hidden="true">→</span>';
  }
}


// --------------------------------------------------
// Process answer
// --------------------------------------------------

function processAnswer() {
  if (
    state.selectedIndex === null ||
    state.selectedIndex === undefined
  ) {
    if (validationMessageEl) {
      validationMessageEl.textContent =
        "Select an answer to continue.";

      validationMessageEl.hidden =
        false;
    }

    return;
  }

  const question =
    state.currentQuestion;

  const selected =
    state.selectedIndex;

  const correct =
    selected === question.correctIndex;

  state.questionCount += 1;

  state.answeredQuestions.push(
    question.id
  );


  // Topic performance

  const topic =
    question.topic || "General";

  if (!state.topicPerformance[topic]) {
    state.topicPerformance[topic] = {
      correct: 0,
      wrong: 0,
      answered: 0,
    };
  }

  state.topicPerformance[topic].answered += 1;


  if (correct) {
    state.correctAnswers += 1;

    state.topicPerformance[topic].correct += 1;

    state.currentDifficulty =
      clampDifficulty(
        state.currentDifficulty + 1
      );

    if (validationMessageEl) {
      validationMessageEl.textContent =
        "Nice work — let's increase the challenge.";
    }

  } else {
    state.wrongAnswers += 1;

    state.topicPerformance[topic].wrong += 1;

    state.currentDifficulty =
      clampDifficulty(
        state.currentDifficulty - 1
      );

    if (validationMessageEl) {
      validationMessageEl.textContent =
        "Let's reinforce this concept before moving on.";
    }
  }


  if (
    state.currentDifficulty >
    state.highestDifficulty
  ) {
    state.highestDifficulty =
      state.currentDifficulty;
  }


  // Store answer

  state.answerHistory.push({
    questionId: question.id,
    difficulty: question.difficulty,
    topic: question.topic,
    selectedAnswer: selected,
    correctAnswer: question.correctIndex,
    isCorrect: correct,
  });


  if (validationMessageEl) {
    validationMessageEl.hidden = false;
  }


  setTimeout(() => {

    if (
      state.questionCount >=
      TOTAL_QUESTIONS_PER_ATTEMPT
    ) {
      submitQuiz();
      return;
    }

    const nextQuestion =
      pickNextQuestionAdaptive();

    renderQuestion(nextQuestion);

  }, 600);
}


// --------------------------------------------------
// SAVE QUIZ TO FIREBASE
// --------------------------------------------------

async function submitQuiz() {

  const total =
    state.questionCount;

  const correct =
    state.correctAnswers;

  const accuracy =
    total > 0
      ? Math.round((correct / total) * 100)
      : 0;


  // Show results

  if (resultsFractionEl) {
    resultsFractionEl.textContent =
      `${correct} / ${total}`;
  }

  if (resultsPercentEl) {
    resultsPercentEl.textContent =
      `${accuracy}%`;
  }

  if (resultsCorrectEl) {
    resultsCorrectEl.textContent =
      String(correct);
  }

  if (resultsAnsweredEl) {
    resultsAnsweredEl.textContent =
      String(total);
  }


  // IMPORTANT:
  // Make sure a student is actually logged in.

  const user =
    auth.currentUser;

  if (!user) {

    console.error(
      "QUIZ SAVE ERROR: No authenticated Firebase user."
    );

    showSaveStatus(
      "⚠ Quiz completed, but no signed-in student was found."
    );

  } else {

    const attempt = {

      studentId: user.uid,

      quizId:
        "operating-systems-01",

      quizTitle:
        "Operating System Fundamentals",

      score:
        correct,

      totalQuestions:
        total,

      accuracy:
        accuracy,

      highestDifficulty:
        state.highestDifficulty,

      answers:
        state.answerHistory,

      topicPerformance:
        state.topicPerformance,
    };


    try {

      // showSaveStatus(
      //   "Saving result..."
      // );

      const documentId =
        await saveQuizAttempt(
          attempt
        );

      console.log(
        "Quiz attempt successfully saved:",
        documentId
      );

      
    } catch (error) {

      console.error(
        "FIREBASE QUIZ SAVE ERROR:",
        error
      );

      showSaveStatus(
        "⚠ Quiz completed, but the result could not be saved."
      );
    }
  }


  // Switch UI

  if (quizShell) {
    quizShell.hidden = true;
  }

  if (resultsShell) {
    resultsShell.hidden = false;
  }

  showSummary();
}


// --------------------------------------------------
// Save status
// --------------------------------------------------

function showSaveStatus(message) {

  let element =
    document.getElementById(
      "adaptive-save-status"
    );

  if (!element) {

    element =
      document.createElement("p");

    element.id =
      "adaptive-save-status";

    element.style.fontFamily =
      "IBM Plex Mono, Inter, sans-serif";

    element.style.fontSize =
      "13px";

    element.style.margin =
      "18px 0";

    element.style.textAlign =
      "center";

    if (resultsShell) {
      resultsShell.appendChild(
        element
      );
    }
  }

  element.textContent =
    message;
}


// --------------------------------------------------
// Results / Review
// --------------------------------------------------

function showSummary() {

  const resultsSection =
    document.getElementById(
      "results-section"
    );

  const reviewSection =
    document.getElementById(
      "review-section"
    );

  if (resultsSection) {
    resultsSection.hidden = false;
  }

  if (reviewSection) {
    reviewSection.hidden = true;
  }
}


function buildReviewList() {

  if (!reviewListEl) return;

  reviewListEl.innerHTML = "";

  state.answerHistory.forEach(
    (answer, index) => {

      const question =
        QUESTION_BANK.find(
          (q) => q.id === answer.questionId
        );

      if (!question) return;


      const item =
        document.createElement("li");

      item.className =
        "review-item";


      const eyebrow =
        document.createElement("p");

      eyebrow.className =
        "review-item__eyebrow";

      eyebrow.textContent =
        `QUESTION ${String(index + 1).padStart(2, "0")}`;


      const title =
        document.createElement("h2");

      title.className =
        "review-item__question";

      title.textContent =
        question.question;


      const options =
        document.createElement("div");

      options.className =
        "options-list";


      question.options.forEach(
        (optionText, optionIndex) => {

          const row =
            document.createElement("div");

          row.className =
            "option is-disabled";


          if (
            optionIndex ===
            question.correctIndex
          ) {

            row.classList.add(
              "is-correct"
            );

          } else if (
            optionIndex ===
              answer.selectedAnswer &&
            !answer.isCorrect
          ) {

            row.classList.add(
              "is-incorrect"
            );
          }


          const marker =
            document.createElement("span");

          marker.className =
            "option__marker";


          const text =
            document.createElement("span");

          text.className =
            "option__text";

          text.textContent =
            optionText;


          row.appendChild(marker);
          row.appendChild(text);

          options.appendChild(row);
        }
      );


      item.appendChild(eyebrow);
      item.appendChild(title);
      item.appendChild(options);

      reviewListEl.appendChild(item);
    }
  );
}


// --------------------------------------------------
// Exit
// --------------------------------------------------

function handleExit() {

  const confirmed =
    window.confirm(
      "Exit the quiz? Your progress will be lost."
    );

  if (!confirmed) return;

  window.location.href =
    "/#dashboard";
}


// --------------------------------------------------
// INIT
// --------------------------------------------------

function init() {

  console.log(
    "Quiz module loaded successfully."
  );

  if (totalQuestionNumberEl) {
    totalQuestionNumberEl.textContent =
      String(TOTAL_QUESTIONS_PER_ATTEMPT);
  }

  if (checkpointTotalEl) {
    checkpointTotalEl.textContent =
      String(TOTAL_QUESTIONS_PER_ATTEMPT);
  }


  const firstQuestion =
    pickNextQuestionAdaptive();

  renderQuestion(
    firstQuestion
  );


  if (nextBtn) {
    nextBtn.addEventListener(
      "click",
      (event) => {
        event.preventDefault();

        processAnswer();
      }
    );
  }


  if (exitBtn) {
    exitBtn.addEventListener(
      "click",
      handleExit
    );
  }


  if (reviewBtn) {

    reviewBtn.addEventListener(
      "click",
      () => {

        buildReviewList();

        const resultsSection =
          document.getElementById(
            "results-section"
          );

        const reviewSection =
          document.getElementById(
            "review-section"
          );

        if (resultsSection) {
          resultsSection.hidden = true;
        }

        if (reviewSection) {
          reviewSection.hidden = false;
        }
      }
    );
  }


  if (dashboardBtn) {
    dashboardBtn.addEventListener(
      "click",
      handleExit
    );
  }


  if (dashboardBtn2) {
    dashboardBtn2.addEventListener(
      "click",
      handleExit
    );
  }


  if (backToSummaryBtn) {

    backToSummaryBtn.addEventListener(
      "click",
      () => {
        showSummary();
      }
    );
  }
}


init();
