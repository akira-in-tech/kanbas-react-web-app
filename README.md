# Kanbas — React Web App

[![CI](https://github.com/akira-in-tech/kanbas-react-web-app/actions/workflows/ci.yml/badge.svg)](https://github.com/akira-in-tech/kanbas-react-web-app/actions/workflows/ci.yml)

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
| Framework | React 18, TypeScript, Vite 6 |
| State | Redux Toolkit |
| Routing | React Router v7 |
| HTTP | Axios |
| Styling | Bootstrap 5 |
| Testing | Vitest, Testing Library, Playwright |

## Getting Started

### Prerequisites

- Node.js 20+
- [kanbas-node-server-app](https://github.com/akira-in-tech/kanbas-node-server-app) running on port 4000

### Installation

```bash
npm ci
```

### Running

```bash
npm run dev
```

App opens at the URL printed by Vite. Copy `.env.example` to `.env.local` to point the frontend at a local API; otherwise it uses the documented Render backend.

### Quality checks

```bash
npm run check
npm run test:e2e
npm audit --omit=dev --audit-level=high
```

Browser tests mock the backend boundary and cover the accessible sign-in flow plus the service-unavailable state. GitHub Actions runs unit, type/build, dependency, and Chromium checks.

## Deployment

Deployed to GitHub Pages via the [`gh-pages`](https://www.npmjs.com/package/gh-pages) package. The `homepage` field in `package.json` sets the base path, and the app uses `HashRouter`, so client-side routing works on Pages without extra rewrite rules.

```bash
npm run deploy
```

This builds the app (`predeploy`) and pushes `dist/` to the `gh-pages` branch. Set `VITE_REMOTE_SERVER` at build time when the backend moves. `HashRouter` keeps client-side routes compatible with GitHub Pages.

## Project Structure

```
src/
├── config.ts           # validated API boundary
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

The deployed product navigation contains only the Kanbas learning experience. Historical course exercises remain outside the product route and are not presented as application features.

## Related

- [kanbas-node-server-app](https://github.com/akira-in-tech/kanbas-node-server-app) — Express API backend

## License

MIT License — see [LICENSE](LICENSE)
