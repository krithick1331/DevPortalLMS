# DEV-Portal LMS

**Interactive Learning Management System with freeCodeCamp-Style Coding Challenges**

## Features
- ✅ Interactive code editor (HTML, CSS, JavaScript)
- ✅ Real-time preview
- ✅ Automated test validation
- ✅ Progress tracking
- ✅ Points & leaderboard

## Tech Stack
- **Frontend:** React 18 + Vite + TailwindCSS
- **Backend:** Node.js + Express + MongoDB
- **Code Execution:** Piston API

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB
- Docker (optional, for Piston)

### Installation

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Backend:**
```bash
cd backend
npm install
npm run dev
```

## Project Structure

```
.
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── contexts/    # React contexts
│   │   └── data/       # Static data and types
│   └── ...
├── backend/             # Node.js backend
│   ├── config/         # Configuration files
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Express middleware
│   └── utils/          # Utility functions
└── docs/              # Documentation
```

## License

MIT