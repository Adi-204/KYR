# Know Your Resume

Know Your Resume is an AI-powered resume analysis and assessment platform built with Next.js. It provides instant, actionable feedback, MCQ and written tests, and detailed scoring to help job seekers optimize their resumes and prepare for interviews.

---

## 🚀 Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Next.js API routes
- **AI Integration:** Google Gemini API (via `@google/genai`)
- **UI Components:** Custom components, Lucide Icons
- **State Management:** React Hooks
- **Other:** Cloudinary (for resume PDF storage), Vercel (deployment)

---

## ✨ Features

- **AI Resume Review:** Upload your resume (PDF) and get a detailed, section-wise analysis with strengths, critiques, and improvement suggestions.
- **ATS Compatibility:** Automated checks for keyword optimization and formatting.
- **MCQ & Written Tests:** Personalized technical and scenario-based questions generated from your resume.
- **Instant Feedback:** Scores and actionable feedback for each test and resume section.
- **Proctored Environment:** Camera-based proctoring for test integrity.
- **User Authentication:** Secure login and registration.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/know-your-resume.git
   cd know-your-resume
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your credentials (Google Gemini API key, Cloudinary, etc.)

4. **Run the development server:**
   ```sh
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## 🧩 Project Structure

```
app/
  api/                # API routes (AI, resume upload, review, etc.)
  hooks/              # Custom React hooks
  test/               # Test flows (MCQ, written, results)
  review/             # Resume review UI
  types/              # TypeScript types
  utils/              # Utility functions
components/           # Reusable UI components
public/               # Static assets
```

---

## 📝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a new branch:**
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Commit and push:**
   ```sh
   git commit -m "Add your message"
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** on GitHub

---

## 📄 License

This project is licensed under the MIT License.

---

## 📬 Contact

For questions, suggestions, or support, open an issue or email [boghawalaadi@gmail.com].

---

**Happy job hunting!**