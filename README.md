# Kanbas — React Web App

The React frontend for Kanbas, a Canvas LMS-inspired learning management system built with TypeScript and Redux. Students can view courses, complete assignments, and manage enrollments; instructors can create and manage course content.

**Live:** [akira-in-tech.github.io/kanbas-react-web-app](https://akira-in-tech.github.io/kanbas-react-web-app/)

> Backend is deployed on Render, free tier — the first request after idle can take ~50s to wake up.

## Features

- Role-based access: `STUDENT`/`USER` accounts get a read-only view; only `FACULTY`/`ADMIN` see the add/edit/delete controls for courses, modules, and assignments. The `/Account/Users` admin page redirects non-admins to their profile. This is a UI convenience only — the backend independently enforces the same rules on every write, so the API rejects unauthorized requests even if someone bypasses the frontend.
- Course dashboard with modules and assignments
- Assignment editor with due dates and instructions
- Enrollment management (enroll/unenroll from courses)
- User authentication (sign in / sign up / profile)
- Redux-powered state management

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18, TypeScript |
| State | Redux Toolkit |
| Routing | React Router v6 |
| HTTP | Axios |
| Styling | Bootstrap 5 |

## Getting Started

### Prerequisites

- Node.js 18+
- [kanbas-node-server-app](https://github.com/akira-in-tech/kanbas-node-server-app) running on port 4000

### Installation

```bash
npm install
```

### Running

```bash
npm start
```

App opens at `http://localhost:3000`

## Deployment

Deployed to GitHub Pages via the [`gh-pages`](https://www.npmjs.com/package/gh-pages) package. The `homepage` field in `package.json` sets the base path, and the app uses `HashRouter`, so client-side routing works on Pages without extra rewrite rules.

```bash
npm run deploy
```

This builds the app (`predeploy`) and pushes `build/` to the `gh-pages` branch, which GitHub Pages serves. The build bakes in whatever `REACT_APP_REMOTE_SERVER` is set to at build time (from `.env.local`), currently the Render backend's URL — update that and redeploy if the backend ever moves.

## Project Structure

```
src/
└── Kanbas/
    ├── Account/        # Auth: sign in, sign up, profile
    ├── Courses/
    │   ├── Assignments/
    │   ├── Modules/
    │   ├── Home/
    │   └── People/
    ├── Dashboard.tsx   # Course list
    ├── Navigation.tsx
    └── store.ts        # Redux store
```

## Related

- [kanbas-node-server-app](https://github.com/akira-in-tech/kanbas-node-server-app) — Express API backend

## License

MIT License — see [LICENSE](LICENSE)
