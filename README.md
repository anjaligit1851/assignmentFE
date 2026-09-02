# Internal Project Management System (Frontend)

This repository contains the complete implementation for the Frontend of the Internal Project Management System, featuring a React application with real-time state management.

---

## Phase 3: Frontend Implementation

### A. Functional Requirement Document (FRD)

**Core Features:**
- **Authentication UI:** Secure user login interface with error handling.
- **Project Management UI:** View a list of projects dynamically fetched.
- **Task Board (Kanban):** Manage tasks for specific projects with Todo, In Progress, and Done statuses.
- **Real-Time UI Updates:** The UI seamlessly updates when task statuses change via Socket.io-client integration.

**User Roles & Permissions:**
- **User:** All authenticated users have access to all projects and can create/update tasks.

**Assumptions:**
- Users will only move tasks across columns (changing status) and won't simultaneously edit the text of the same task.

---

### B. Frontend System Design

**Architecture Overview & Design Decisions:**
- **Framework (React + Vite):** Built as a Single Page Application (SPA) utilizing Vite for extremely fast build times and hot module replacement.
- **State Management (Redux Toolkit):** Redux Toolkit manages global state (Authentication, Projects, Tasks). It reduces boilerplate and simplifies complex state mutations.
- **Service Layer Abstraction:** All API calls are encapsulated within a `services/` directory (`api.js`, `authService.js`, etc.). This decouples business logic from React components.
- **Real-Time Strategy:** A dedicated `socketService.js` initializes `socket.io-client`. When a user connects to a project board, the service dispatches Redux actions directly as WebSocket events arrive, keeping the UI instantly updated without unnecessary API polling.
- **Styling:** Vanilla CSS (`index.css`) with premium glassmorphism aesthetics, dynamic micro-animations, and modern typography (Inter). 

---

### C. Folder Structure

```
src/
 ├── assets/          # Static files and images
 ├── components/      # Reusable UI components (PrivateRoute)
 ├── features/        # Redux Toolkit Slices (auth, projects, tasks)
 ├── pages/           # Main Screens (Login, ProjectList, TaskBoard)
 ├── services/        # API and Socket abstraction layer
 ├── index.css        # Vanilla CSS styles and variables
 ├── App.jsx          # Main Router Setup
 └── store.js         # Redux Store Configuration
```

---

## Local Setup

### Prerequisites
- Node.js (v18+)

### Steps
1. Clone this repository.
2. `npm install`
3. Create a `.env` file in the root folder:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_SOCKET_URL=http://localhost:5000
   ```
4. `npm run dev`

---

## Deployment Steps (Frontend)

The frontend can be built and served statically via services like Vercel, Netlify, or Nginx.

1. Install dependencies: `npm install`
2. Build the production bundle: `npm run build`
3. Deploy the `dist/` folder to your hosting provider.

This repository also includes a GitHub Actions pipeline (`.github/workflows/deploy.yml`) that automatically runs linting and builds on push to the main branch.

---

## URLs (To be updated upon deployment)
- **Deployed Frontend URL:** `TBD`
- **Loom Video Link:** `TBD`

---

## AI Usage Declaration
*This frontend project was developed with the assistance of an AI coding agent (Antigravity by Google Deepmind) for scaffolding the React Redux application, setting up the service architecture, configuring Socket.IO client integrations, writing boilerplate styling, and drafting this documentation. The AI was directed and guided throughout the entire process by the developer, and all generated code is fully understood and maintainable.*
