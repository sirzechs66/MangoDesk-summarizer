# AI-Powered Meeting Notes Summarizer

This is a full-stack application that uses AI to summarize meeting transcripts and allows users to edit and share the results via email.

**Live Application Link:** [You will add your Vercel link here after deployment]

---

### 1. Approach & Process

My approach was to build a modern, serverless, full-stack application using an integrated framework to ensure rapid development and scalability. The entire user flow, from input to sharing, is handled within a single, cohesive codebase.

The development process was broken down into clear, logical steps:

1.  **Project Scaffolding:** Initialized a Next.js project in a Replit cloud environment.
2.  **Backend API Development:**
    *   Created a secure, server-side API endpoint (`/api/summarize`) to handle communication with the OpenAI API. This prevents exposing the API key on the client side.
    *   Created a second endpoint (`/api/share`) to manage sending the final summary via email using the Resend API.
3.  **Frontend UI Development:** Built a clean, functional user interface with React and `useState` to manage the application's state (input, summary, loading).
4.  **Deployment:** Deployed the application on Vercel for seamless, continuous integration and delivery.

---

### 2. Tech Stack of Choice

| Component      | Technology                                | Justification                                                                                                                              |
| -------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Framework**  | **Next.js (with React)**                  | Chosen for its full-stack capabilities. API Routes provide an instant, serverless backend, while the React frontend is fast and modern.       |
| **AI Service** | **OpenAI API (GPT-4o mini)**              | Provides state-of-the-art language processing for high-quality summarization. The API is simple to integrate. |
| **Email Service** | **Resend**                               | A developer-friendly email API that is extremely easy to set up for transactional emails.                                |
| **Deployment** | **Vercel**                                | The best platform for hosting Next.js applications. It offers zero-configuration deployment and easy environment variable management. |
| **Environment** | **Replit**                                | Used as a disposable, browser-based development environment, removing the need for a local Node.js installation. |