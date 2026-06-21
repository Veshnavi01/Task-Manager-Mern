# 📋 Task Manager - MERN Stack Application

## 📖 Project Description           ## Link to Task-Manager : https://task-manager-mern-wine.vercel.app/

Task Manager is a full-stack web application developed using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). The application allows users to securely manage their daily tasks by creating, updating, deleting, searching, filtering, and sorting tasks.

Each user has their own account and can access only their own tasks using JWT (JSON Web Token) based authentication.

The application helps users stay organized by tracking task status, priority levels, due dates, and overall task statistics.

---

# 🚀 Features

## User Authentication
- User Registration
- User Login
- JWT-based Authentication
- Protected Routes
- User-specific Task Access

## Task Management
- Add New Task
- Edit Existing Task
- Delete Task
- Toggle Task Status (Pending ↔ Completed)
- Delete All Completed Tasks

## Task Details
- Task Title
- Task Description
- Due Date
- Priority Level
  - High
  - Medium
  - Low

## Search, Filter & Sort
- Search by Task Title
- Search by Description
- Filter by:
  - All Tasks
  - Pending Tasks
  - Completed Tasks
- Sort by:
  - Newest
  - Oldest
  - Priority
  - Due Date

## Dashboard Statistics
- Total Tasks
- Completed Tasks
- Pending Tasks
- Overdue Tasks

## User Interface
- Responsive Design
- Priority Color Badges
- Completed Task Strike-through
- Delete Confirmation Popup
- Clean and Modern Dashboard

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js

## Database
- MongoDB Atlas

## Authentication
- JSON Web Token (JWT)
- bcryptjs

---

# 📂 Project Structure

```text
Task-Manager-Mern
│
├── client
│   ├── public
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── services
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── Server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

# ⚙️ Local Setup Instructions

Follow these steps to run the project on your local machine.

---

## Step 1: Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/Veshnavi01/Task-Manager-Mern.git
```

Move into the project directory:

```bash
cd Task-Manager-Mern
```

---

## Step 2: Install Backend Dependencies

Move into the backend folder:

```bash
cd Server
```

Install all required packages:

```bash
npm install
```

This command installs:
- Express.js
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors
- and other backend dependencies

---

## Step 3: Create Environment Variables

Inside the Server folder create a file named:

```text
.env
```

Add the following variables:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

### Explanation

PORT
- Port on which backend server runs.

MONGO_URI
- MongoDB Atlas connection string.

JWT_SECRET
- Secret key used to generate JWT tokens.

---

## Step 4: Start Backend Server

Run:

```bash
npm start
```

or

```bash
node server.js
```

If successful, you should see:

```text
Server running on port 5000
MongoDB Connected
```

Backend URL:

```text
http://localhost:5000
```

---

## Step 5: Install Frontend Dependencies

Open a new terminal.

Move into frontend folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

This installs:
- React
- Axios
- React Router
- Tailwind CSS
- Vite

---

## Step 6: Start Frontend

Run:

```bash
npm run dev
```

You should see:

```text
Local: http://localhost:5173
```

Open:

```text
http://localhost:5173
```

in your browser.

---

# 🔗 API Documentation

---

## Authentication APIs

### Register User

```http
POST /api/auth/register
```

Request Body:

```json
{
  "name": "Veshnavi",
  "email": "veshnavi@example.com",
  "password": "123456"
}
```

Purpose:
Creates a new user account.

---

### Login User

```http
POST /api/auth/login
```

Request Body:

```json
{
  "email": "veshnavi@example.com",
  "password": "123456"
}
```

Purpose:
Authenticates the user and returns a JWT token.

---

## Task APIs

### Get All Tasks

```http
GET /api/tasks
```

Returns all tasks belonging to the logged-in user.

---

### Create Task

```http
POST /api/tasks
```

Creates a new task.

---

### Update Task

```http
PUT /api/tasks/:id
```

Updates task details.

---

### Toggle Task Status

```http
PUT /api/tasks/:id/toggle
```

Changes task status between Pending and Completed.

---

### Delete Task

```http
DELETE /api/tasks/:id
```

Deletes a task.

---

### Delete Completed Tasks

```http
DELETE /api/tasks/completed/all
```

Deletes all completed tasks of the logged-in user.

---

### Get Statistics

```http
GET /api/tasks/stats
```

Returns:

- Total Tasks
- Completed Tasks
- Pending Tasks
- Overdue Tasks

---

# 🔒 Security Features

The application includes the following security measures:

- Password hashing using bcryptjs
- JWT Authentication
- Protected Routes
- User-specific task access
- Environment variables for sensitive credentials

---

# 🌐 Deployment

## Frontend Deployment

Platform:
- Vercel

Deployment Steps:
1. Connect GitHub repository.
2. Select client folder.
3. Deploy.

---

## Backend Deployment

Platform:
- Render

Deployment Steps:
1. Connect GitHub repository.
2. Select Server folder.
3. Add environment variables:
   - MONGO_URI
   - JWT_SECRET
4. Deploy.

---

## Database Deployment

Platform:
- MongoDB Atlas

Used as cloud database for storing:
- User information
- Task information

---

# 🧪 Testing

The application has been tested for:

- User Registration
- User Login
- Task Creation
- Task Editing
- Task Deletion
- Task Status Toggle
- Search
- Filter
- Sort
- Statistics
- Authentication

---

# 👩‍💻 Author

**Veshnavi Singh**

B.Tech Computer Science Engineering

Academic Project - MERN Stack Development

---

# 📜 License

This project is developed for educational and academic purposes only.
