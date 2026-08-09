# LEARN.MD
video demo
https://www.youtube.com/watch?v=XMTp16cP4os</br>
ppt:https://gamma.app/docs/LEARNMD-Interactive-Learning-Platform-2hl8u87mtbhesu9?mode=doc

> **Personalized Adaptive Learning Platform to Bridge the Rural–Urban Education Gap**

LEARN.MD is an adaptive learning platform designed to address the **rural–urban education gap** by providing personalized learning, adaptive assessments, gamification, multilingual support, and data-driven insights for teachers.

The platform is designed with the realities of **government and rural-school education** in mind — including uneven access to quality teachers, large classrooms, learning loss, limited connectivity, and the need for affordable digital education on low-end devices.

Instead of treating every student the same, LEARN.MD continuously uses learning performance to understand **what a student knows, where they struggle, and what they should learn next.**

---

# 🎯 Problem Statement

### IEMH4-ED-01 — Personalized Adaptive Learning Platform to Bridge the Rural–Urban Education Gap

Post-pandemic learning loss, uneven access to quality teachers, and oversized classrooms have widened the educational gap between rural/government-school students and their urban private-school peers.

A **one-size-fits-all curriculum** does not account for differences in:

* Learning pace
* Prior knowledge
* Academic ability
* Language
* Learning gaps
* Access to educational resources

Teachers also often lack the tools required to identify struggling students **before they fall significantly behind or drop out**.

LEARN.MD addresses these challenges by bringing adaptive learning and actionable educational analytics into a single platform.

---

# 💡 Our Solution

LEARN.MD combines **adaptive assessment, personalized learning, gamification, multilingual support, and teacher analytics** into one platform.

### For Students

Students receive a personalized learning experience where:

* Quiz difficulty responds to their performance.
* Learning progress is continuously tracked.
* Topics requiring additional practice can be identified.
* Educational lectures can be accessed according to their learning needs.
* Gamification encourages consistent engagement.
* English and Hindi interfaces make the platform more accessible.

### For Teachers

Teachers receive actionable insights instead of simply seeing marks.

The teacher dashboard helps identify:

* Students falling behind
* Low-performing topics
* Individual accuracy
* Class-level performance
* Quiz completion
* Difficulty levels reached
* Recent assessment activity
* Students requiring attention

This allows teachers to intervene **before examination time**, rather than discovering learning gaps only after a poor result.

---

# 🧠 Adaptive Learning Engine

The core of LEARN.MD is its adaptive assessment system.

Instead of presenting every student with the exact same sequence of questions, the platform considers student performance and question characteristics to support personalized difficulty progression.

The system tracks factors such as:

```text
Correctness
Question Difficulty
Topic
Accuracy
Quiz Score
Highest Difficulty Reached
Topic Performance
Previous Attempts
```

A quiz attempt can store:

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

This information is stored in Firebase Firestore and can be used to continuously understand student performance.

### Adaptive Learning Flow

```text
                 Student
                    │
                    ▼
             Start Assessment
                    │
                    ▼
             Answer Question
                    │
                    ▼
          Evaluate Performance
                    │
          ┌─────────┴─────────┐
          │                   │
       Correct              Incorrect
          │                   │
          ▼                   ▼
   Increase Challenge    Reinforce Topic
          │                   │
          └─────────┬─────────┘
                    │
                    ▼
           Update Performance
                    │
                    ▼
        Select Next Appropriate
             Question
                    │
                    ▼
              Repeat
                    │
                    ▼
          Store Assessment Data
                    │
                    ▼
          Teacher Analytics
```

> **Goal:** Move from a static examination model to a continuous learning-and-feedback model.

---

# 📊 Teacher Analytics

The teacher dashboard transforms raw assessment data into actionable information.

### Key Analytics

| Metric                           | Purpose                                     |
| -------------------------------- | ------------------------------------------- |
| **Total Students**               | Understand classroom size and participation |
| **Class Average**                | Monitor overall academic performance        |
| **Quiz Completion**              | Identify participation gaps                 |
| **Student Accuracy**             | Measure individual understanding            |
| **Topic Performance**            | Identify weak learning areas                |
| **Difficulty Reached**           | Understand learning progression             |
| **Recent Attempts**              | Monitor ongoing activity                    |
| **Students Requiring Attention** | Identify learners needing intervention      |
| **Risk Classification**          | Prioritize academic support                 |

The objective is to answer:

> **Which students need help, what are they struggling with, and what should the teacher do next?**

---

# 🚨 Early Learning-Gap Detection

One of the major goals of LEARN.MD is to help teachers identify struggling students **before examinations**.

Instead of waiting for:

```text
Poor Exam Result
       ↓
Teacher Notices Problem
       ↓
Student Already Behind
```

LEARN.MD aims to enable:

```text
Continuous Assessment
       ↓
Performance Analysis
       ↓
Learning Gap Detected
       ↓
Teacher Alert / Attention
       ↓
Early Intervention
       ↓
Improved Learning Outcome
```

This makes assessment useful not only for grading, but also for **early intervention**.

---

# 🎮 Gamified Learning

LEARN.MD incorporates gamification to encourage students to maintain consistent learning habits.

Students can track:

* 🔥 Learning streaks
* ⭐ XP
* 🏆 Progress
* 📚 Assignments
* 🎯 Quiz achievements

Gamification is intended to make learning more engaging while encouraging students to return to the platform consistently.

---

# 🌐 Multilingual Learning

Language can become a significant barrier for younger learners and students who are more comfortable learning in regional languages.

LEARN.MD currently supports:

* 🇬🇧 English
* 🇮🇳 Hindi

Language preferences are persisted using browser `localStorage`.

### Future multilingual expansion

The architecture can be extended to support additional Indian languages such as:

* Bengali
* Marathi
* Tamil
* Telugu
* Kannada
* Gujarati
* Odia
* Assamese

---

# 📱 Designed for Accessibility

The platform is designed with the target beneficiaries of the problem statement in mind.

### Target environment

```text
Government / Rural Schools
        │
        ├── Low-end devices
        ├── Limited bandwidth
        ├── Shared devices
        ├── Large classrooms
        └── Uneven teacher availability
```

The current application focuses on a lightweight web experience and responsive interface.

### Offline-first capabilities

The problem statement specifically calls for:

* PWA / local storage
* Offline lessons
* Offline videos
* Background synchronization

These form part of the platform's **planned offline-first expansion**, allowing students to continue learning when connectivity is unreliable.

---

# 🔥 Firebase Architecture

Firebase provides authentication and persistent learning data.

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
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
          Score        Accuracy      Difficulty
             │             │             │
             └─────────────┼─────────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ Firebase        │
                  │ Firestore       │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ Teacher         │
                  │ Dashboard       │
                  └────────┬────────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
        Individual      Class       Learning
        Analytics      Analytics      Gaps
                                        │
                                        ▼
                                Early Intervention
```

### Core Services

```text
src/lib/firebase.ts
src/lib/quizService.ts
src/lib/teacherService.ts
```

| Service             | Responsibility                                      |
| ------------------- | --------------------------------------------------- |
| `firebase.ts`       | Firebase initialization and configuration           |
| `quizService.ts`    | Quiz attempts, answers, scores, and assessment data |
| `teacherService.ts` | Teacher analytics and student performance data      |

---

# 🛠️ Technology Stack

| Category           | Technologies                                                          |
| ------------------ | --------------------------------------------------------------------- |
| **Frontend**       | React, TypeScript, JavaScript, HTML5, CSS3, Vite                      |
| **UI**             | Responsive CSS, SVG animations, component-based layouts               |
| **Authentication** | Firebase Authentication                                               |
| **Database**       | Firebase Firestore                                                    |
| **Assessment**     | Adaptive Quiz Engine, difficulty progression, topic performance       |
| **Analytics**      | Student performance aggregation, class analytics, risk classification |
| **Video**          | YouTube embedded lectures                                             |
| **Localization**   | English + Hindi                                                       |
| **Deployment**     | GitHub, Vercel                                                        |
| **Development**    | VS Code, Git, GitHub Copilot                                          |

---

# 📁 Project Structure

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

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd learn.md
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Firebase

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

For production deployment, configure the same variables in **Vercel Environment Variables**.

> ⚠️ Never commit `.env` files or private credentials to GitHub.

## 4. Run Locally

```bash
npm run dev
```

The development server will start at a local address such as:

```text
http://localhost:5173
```

## 5. Build for Production

```bash
npm run build
```

## 6. Preview Production Build

```bash
npm run preview
```

---

# ☁️ Deployment

LEARN.MD uses **Vercel** for deployment with GitHub-based continuous deployment.

```text
GitHub
   │
   ▼
Vercel
   │
   ▼
npm run build
   │
   ▼
Vite Production Build
   │
   ▼
Live Application
```

The `dist/` directory is generated automatically by Vite and does not need to be committed to the repository.

---

# 🎯 Alignment With the Problem Statement

| Problem Statement Requirement  | LEARN.MD Implementation                                |
| ------------------------------ | ------------------------------------------------------ |
| **Adaptive difficulty**        | Performance-aware quiz progression                     |
| **Personalized learning**      | Student performance and topic-level tracking           |
| **Teacher analytics**          | Teacher dashboard with class and individual analytics  |
| **Early intervention**         | Students requiring attention / risk classification     |
| **Learning-gap detection**     | Topic and student performance analysis                 |
| **Gamification**               | XP, streaks, progress, and achievements                |
| **Regional languages**         | English and Hindi interface                            |
| **Low-end devices**            | Lightweight responsive web application                 |
| **Offline learning**           | Planned PWA/local-storage architecture                 |
| **Offline video access**       | Planned compressed/offline lecture delivery            |
| **Background synchronization** | Planned offline-first synchronization                  |
| **Near-zero cost**             | Web-based architecture using Firebase and Vercel       |
| **Government-school focus**    | Designed around large classrooms and limited resources |

---

# 🌱 Expected Impact

LEARN.MD is designed to benefit:

### 👨‍🎓 Students

* Personalized learning pace
* Adaptive assessment
* Better visibility into progress
* Increased engagement through gamification
* Multilingual accessibility

### 👩‍🏫 Teachers

* Real-time performance insights
* Early identification of struggling students
* Topic-level learning-gap analysis
* Class-wide analytics
* Data-driven intervention

### 🏫 Government Schools & NGOs

* Scalable digital learning infrastructure
* Low-cost deployment
* Centralized student analytics
* Support for large classrooms
* Potential to reach students with limited access to quality educational resources

---

# 🔮 Future Scope

The current platform establishes the foundation for a broader adaptive-learning ecosystem.

Planned improvements include:

* 🤖 AI-powered learning recommendations
* 🧠 Advanced Item Response Theory (IRT)-based adaptive testing
* 🔄 Reinforcement-learning-based question selection
* 📚 Larger subject-specific question banks
* 💡 AI-generated explanations for incorrect answers
* 🛤️ Personalized learning paths
* 📈 Predictive student-performance analytics
* 📝 Teacher assignment management
* 💬 Student-teacher communication
* 🗣️ Text-to-speech for regional languages
* 🎙️ Speech-to-text interaction
* 🌏 Additional Indian languages
* 📱 Progressive Web App (PWA)
* 📦 Offline lessons and educational content
* 🔄 Background synchronization
* 🎥 Low-bandwidth compressed video/audio delivery
* 👨‍👩‍👧 Parent/guardian dashboard
* 🏆 Advanced badges and leaderboards

---

# 🧩 Project Vision

Education should not depend on whether a student lives in a rural or urban environment.

LEARN.MD aims to make personalized learning more accessible by giving every student the opportunity to learn at an appropriate **pace, difficulty level, and language**, while giving teachers the information they need to provide timely support.

The platform moves the focus from:

> **"Did the student pass?"**

to:

> **"What does the student understand, where is the learning gap, and what should we do next?"**

---

# 👥 Team

Built as an educational technology project focused on:

**Adaptive Learning • Personalized Education • Learning Analytics • Gamification • Educational Accessibility**

---

# 📜 License

This project is developed for **educational, hackathon, and demonstration purposes**.
