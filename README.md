# Kanbas — React Web App

The React frontend for Kanbas, a Canvas LMS-inspired learning management system built with TypeScript and Redux. Students can view courses, complete assignments, and manage enrollments; instructors can create and manage course content.

## Features

- Role-based access: Student and Faculty views
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
