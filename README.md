# LearnAI – Real-Time AI Teaching Platform

LearnAI is a modern, full-stack AI-powered learning platform built with Next.js, React, Supabase, and Vercel. It enables users to interact with AI tutors, generate smart notes and quizzes, bookmark sessions, and track their learning journey—all in a beautiful, responsive UI.

## Features

- **AI Companions:** Discover, create, and interact with subject-specific AI tutors ("companions") for personalized learning.
- **Voice-Powered Sessions:** Engage in natural, voice-driven conversations with AI tutors (powered by Vapi and OpenAI/Gemini).
- **Smart Notes & Quizzes:** Instantly generate study notes and quizzes from your session transcripts using advanced AI models.
- **Session History:** View and revisit your recent and bookmarked sessions.
- **Bookmarks:** Save your favorite companions for quick access.
- **PDF Export:** Download your AI-generated notes as beautifully formatted PDFs.
- **Responsive UI:** Clean, modern design with consistent card layouts and smooth animations.
- **Authentication:** Secure sign-in and user management via Clerk.
- **Supabase/Postgres:** Scalable, serverless backend for data storage and user/session management.
- **Environment Variable Management:** Secure handling of API keys and tokens for both server and client contexts.

## Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS 4, Lucide Icons
- **Backend:** Supabase (Postgres), Server Actions
- **AI Providers:** OpenAI, Gemini (Google Generative AI)
- **Voice:** Vapi SDK
- **Authentication:** Clerk
- **PDF Generation:** jsPDF, html2canvas-pro

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/deceasedone/saas-lms.git
   cd saas-lms
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env.local` and fill in your Supabase, Clerk, Vapi, and AI provider keys.

4. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

## Folder Structure

- `app/` – Next.js app directory (pages, layouts, API routes)
- `components/` – Reusable UI components (cards, modals, navbar, etc.)
- `lib/` – Utility functions, API clients, and server actions
- `constants/` – Static data (subject colors, etc.)
- `public/` – Static assets (icons, images)
- `types/` – TypeScript type definitions

## Customization & Extensibility

- **Add new AI models:** Easily switch or add new AI providers in `lib/actions/ai.actions.ts`.
- **UI Components:** All UI is built with reusable, accessible components and Tailwind CSS.
- **Database:** Extend the Supabase schema for new features (e.g., achievements, progress tracking).

## Roadmap / Future Updates

- **Dark Mode:** Full dark mode support for all pages and components.
- **Mobile-first enhancements:** Further optimize for mobile and tablet experiences.
- **More AI providers:** Plug-and-play support for additional LLMs.
- **Gamification:** Badges, streaks, and progress tracking.
- **Admin dashboard:** Manage users, content, and analytics.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

*Built with ❤️ by the LearnAI team. Inspired by the future of education.*
