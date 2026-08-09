# LEARN.MD

> **Adaptive learning platform for personalized education, assessment, and teacher-driven analytics.**

LEARN.MD is an adaptive learning platform designed to connect **students, teachers, assessments, and learning analytics** in one system.

Students can authenticate, follow personalized learning paths, access educational lectures, attempt adaptive quizzes, and track their progress. Teachers can monitor student performance, identify learning gaps, analyze class-level trends, and intervene when additional support is needed.

---

## ✨ Features

* 🎓 **Student Dashboard** — Learning paths, courses, quizzes, lectures, mentors, schedules, streaks, XP, assignments, and progress tracking.
* 🧠 **Adaptive Quizzes** — Difficulty-aware assessments that adapt based on student performance.
* 📊 **Teacher Dashboard** — Student performance, class statistics, quiz activity, topic performance, and students requiring attention.
* 🔥 **Firebase Integration** — Firebase Authentication and Firestore for authentication and persistent assessment data.
* 📈 **Learning Analytics** — Score, accuracy, topic performance, difficulty reached, completion, and quiz-attempt tracking.
* 🚨 **Learning Gap Detection** — Helps teachers identify students who may require additional academic support.
* 🌐 **Bilingual Interface** — English and Hindi language support with persistent language preferences.
* 🎥 **Lecture System** — Embedded educational video lectures with mentor and language information.
* 🔐 **Role-Based Experience** — Separate experiences for Students and Teachers.
* 📱 **Responsive UI** — Designed for modern desktop and mobile learning experiences.
* ☁️ **Vercel Deployment** — Continuous deployment through GitHub and Vercel.

---

## 🧠 Adaptive Learning

The adaptive quiz system records **question-level performance** and uses factors such as correctness, topic, and difficulty to support adaptive progression.

Each quiz attempt can store information such as:

```text
studentId
quizId
quizTitle
score
totalQuestions
accuracy
highestDifficulty
answers
topicPerformance
completedAt
```

The collected data is stored in **Firebase Firestore** and is used by the teacher dashboard to understand both individual and class-level performance.

The goal is not simply to determine whether a student passed or failed, but to identify:

* What the student understands
* Which topics need improvement
* How accurately they answer questions
* What difficulty level they can reach
* Whether their performance is improving
* Whether additional intervention may be required

---

## 📊 Teacher Analytics

The teacher dashboard transforms assessment data into actionable insights.

It provides information such as:

* Total students
* Class average
* Quiz completion
* Student accuracy
* Topic-wise performance
* Difficulty reached
* Recent quiz attempts
* Students requiring attention
* Performance and risk classification

Rather than simply displaying marks, LEARN.MD aims to help educators understand **why a student is struggling and where support may be needed**.

---

## 🔥 Firebase Architecture

Firebase is used for authentication and persistent learning data.

```text
                    ┌──────────────┐
                    │    Student   │
                    └──────┬───────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  Authentication │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  Adaptive Quiz  │
                  └────────┬────────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
           Score       Accuracy     Difficulty
              │            │            │
              └────────────┼────────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │    Firestore    │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ Teacher Dashboard│
                  └────────┬────────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
     Student Analytics  Class Analytics  Learning Gaps
                                           │
                                           ▼
                                  Intervention Insights
```

### Core Services

```text
src/lib/firebase.ts
src/lib/quizService.ts
src/lib/teacherService.ts
```

* `firebase.ts` — Firebase initialization and configuration.
* `quizService.ts` — Quiz attempts, answers, scores, and assessment-related operations.
* `teacherService.ts` — Teacher analytics and student performance data.

---

## 🌐 Localization

LEARN.MD currently supports:

* 🇬🇧 English
* 🇮🇳 Hindi

Language preferences are stored using browser `localStorage`, allowing the selected language to persist across sessions.

---

## 🛠️ Tech Stack

| Category           | Technologies                                                          |
| ------------------ | --------------------------------------------------------------------- |
| **Frontend**       | React, TypeScript, JavaScript, HTML5, CSS3, Vite                      |
| **UI**             | Responsive CSS, SVG animations, component-based layouts               |
| **Authentication** | Firebase Authentication                                               |
| **Database**       | Firebase Firestore                                                    |
| **Assessment**     | Adaptive Quiz Engine, difficulty progression, topic performance       |
| **Analytics**      | Student performance aggregation, class analytics, risk classification |
| **Video**          | YouTube embedded lectures                                             |
| **Deployment**     | GitHub, Vercel                                                        |
| **Development**    | VS Code, Git, GitHub Copilot                                          |

---

## 📁 Project Structure

```text
learn.md/
├── public/
│   ├── os-quiz/
│   ├── student-dashboard/
│   ├── teacher-dashboard/
│   └── ...
│
├── src/
│   ├── lib/
│   │   ├── firebase.ts
│   │   ├── quizService.ts
│   │   └── teacherService.ts
│   │
│   ├── App.tsx
│   ├── App.css
│   └── ...
│
├── package.json
├── package-lock.json
├── vite.config.*
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd learn.md
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

For production deployment, add the same environment variables to the **Vercel Environment Variables** configuration.

> **Important:** Never commit your `.env` file or expose private credentials in the repository.

### 4. Run Locally

```bash
npm run dev
```

The development server will start locally and provide a URL such as:

```text
http://localhost:5173
```

### 5. Build for Production

```bash
npm run build
```

### 6. Preview the Production Build

```bash
npm run preview
```

---

## ☁️ Deployment

LEARN.MD uses **Vercel** for production deployment.

The deployment workflow is:

```text
┌──────────┐
│  GitHub  │
└────┬─────┘
     │
     ▼
┌──────────┐
│  Vercel  │
└────┬─────┘
     │
     ▼
┌────────────────┐
│ npm run build  │
└───────┬────────┘
        │
        ▼
┌─────────────────────┐
│ Vite Production     │
│ Build               │
└──────────┬──────────┘
           │
           ▼
   ┌───────────────┐
   │ Live Application│
   └───────────────┘
```

The `dist/` directory is generated automatically by Vite during the production build and does not need to be committed to the repository.

---

## 🎯 Project Goal

LEARN.MD aims to move education beyond a **one-size-fits-all model** by combining:

* Adaptive assessment
* Personalized learning
* Learning analytics
* Teacher-driven intervention

Instead of only asking:

> **"What score did the student get?"**

LEARN.MD focuses on:

> **"What does the student understand, where are they struggling, and what should happen next?"**

This approach enables a more personalized and data-informed learning experience for both students and educators.

---

## 🔮 Future Scope

The platform can be extended with:

* 🤖 AI-powered learning recommendations
* 🧠 More advanced adaptive learning algorithms
* 📚 Additional subjects and question banks
* 💡 AI-generated explanations for incorrect answers
* 🛤️ Personalized learning paths
* 📈 Predictive student-performance analytics
* 📝 Teacher assignment management
* 💬 Student-teacher communication
* 🌏 Additional Indian languages
* 👨‍👩‍👧 Parent/guardian dashboard
* 📡 Offline learning support

---

## 👥 Team

Built as an educational technology project focused on:

**Adaptive Learning • Personalized Assessment • Learning Analytics • Data-Driven Teaching**

---

## 📜 License

This project is developed for **educational, hackathon, and demonstration purposes**.
