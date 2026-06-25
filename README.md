# TaskDuty — Full Stack Task Manager

A full-stack MERN task management app built with TypeScript.

**Live Demo:** https://task-duty-front.vercel.app

---

## Project Structure

```
TaskDuty/
├── client/     ← React 19 + TypeScript + Vite + Tailwind CSS v4
├── server/     ← Node.js + Express + MongoDB + TypeScript
├── package.json
└── README.md
```

---

## Features

### Week 1 — Core CRUD
- Create, Read, Update, Delete tasks
- Filter by category (Work / Personal / Urgent) and completion status
- Form validation — all fields required, due date cannot be in the past
- Responsive UI with Signika Negative font

### Week 2 — Authentication
- JWT-based register and login (username or email)
- Bcrypt password hashing
- Protected routes — users only see their own tasks
- OTP-based password reset via Brevo email
- Profile page — update username and change password
- Navbar avatar dropdown with logout

### Week 3 — Soft Delete / Trash
- Tasks are soft deleted (moved to trash, not removed from DB)
- Dedicated Trash page to view deleted tasks
- Restore tasks from trash back to active list
- Permanently delete tasks from trash
- Confirmation modal replaces browser alert

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 |
| Backend | Node.js, Express 5, TypeScript |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT + Bcrypt |
| Email | Brevo (transactional API) |
| Hosting | Vercel (client) + Render (server) |

---

## Setup

### Server
```bash
cd server
npm install
cp .env.example .env    # fill in your values
npm run dev
```

### Client
```bash
cd client
npm install
cp .env.example .env    # set VITE_API_URL
npm run dev
```

### Environment Variables

**server/.env**
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_verified_email
BREVO_SENDER_NAME=TaskDuty
```

**client/.env**
```
VITE_API_URL=http://localhost:5000
```

---

## API Endpoints

### Auth
| Method | Route | Description |
|---|---|---|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Login |
| POST | /api/auth/forgot-password | Send OTP |
| POST | /api/auth/verify-otp | Verify OTP |
| POST | /api/auth/reset-password | Reset password |
| PUT | /api/auth/update-password | Change password (protected) |
| PUT | /api/auth/update-username | Change username (protected) |

### Tasks (all protected)
| Method | Route | Description |
|---|---|---|
| GET | /api/tasks | Get all active tasks |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Soft delete (move to trash) |
| GET | /api/tasks/trash | Get trashed tasks |
| PUT | /api/tasks/:id/restore | Restore from trash |
| DELETE | /api/tasks/:id/permanent | Permanently delete |

---

## Git Branch Strategy (Week 3)

```bash
# Feature branch created for soft delete
git checkout -b feature/soft-delete

# After implementation
git add .
git commit -m "feat: implement soft delete with trash page"
git push origin feature/soft-delete

# Merge into main
git checkout main
git merge feature/soft-delete
git push origin main
```
