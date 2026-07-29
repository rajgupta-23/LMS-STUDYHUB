# StudyHub — MERN LMS

A complete, ready-to-run Learning Management System built with MongoDB, Express, React (Vite), and Node.js.

## Features
- JWT auth with two roles: **student** and **instructor**
- Instructors: create/delete courses, add lessons, view "My Courses"
- Students: browse/search courses, enroll, track progress per course, mark lessons complete
- Clean plain-CSS UI, fully responsive grid

## Project structure
```
StudyHub/
  server/   Express + MongoDB API
  client/   React (Vite) frontend
```

## 1. Backend setup
```bash
cd server
npm install
cp .env.example .env   # edit MONGO_URI / JWT_SECRET as needed
npm run dev             # starts on http://localhost:5000
```
Requires a running MongoDB instance (local `mongod` or a MongoDB Atlas connection string in `MONGO_URI`).

## 2. Frontend setup
```bash
cd client
npm install
npm run dev              # starts on http://localhost:5173
```
The client is pre-configured to call the API at `http://localhost:5000/api` (see `src/api/axios.js`).

## 3. Try it out
1. Open http://localhost:5173, click **Sign up**, and create one **instructor** account and one **student** account (use two browsers/incognito, or log out/in).
2. As the instructor, go to **Teach → New Course**, create a course.
3. As the student, browse **Courses**, open the course, click **Enroll now**, then check **Dashboard** for progress.

## API overview
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | /api/auth/register | — | Create account |
| POST | /api/auth/login | — | Log in |
| GET | /api/auth/me | token | Current user |
| GET | /api/courses | — | List/search published courses |
| GET | /api/courses/:id | — | Course + lessons |
| POST | /api/courses | instructor | Create course |
| PUT/DELETE | /api/courses/:id | instructor (owner) | Update/delete course |
| POST | /api/courses/:id/lessons | instructor (owner) | Add lesson |
| GET | /api/courses/mine | instructor | Courses you teach |
| POST | /api/enrollments | student | Enroll in a course |
| GET | /api/enrollments/mine | student | Your enrollments |
| POST | /api/enrollments/complete-lesson | student | Mark a lesson complete |

## Notes / next steps you may want
- Add file/video upload (e.g. Cloudinary/S3) instead of thumbnail/video URLs
- Add course reviews & ratings
- Add payment integration (Stripe) for paid courses
- Add pagination on the course list
- Deploy: server to Render/Railway, client to Vercel/Netlify, DB to MongoDB Atlas
