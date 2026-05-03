# StudySync Backend API

Production-ready backend for Study Planner application with JWT authentication and role-based access control.

## Features

- ✅ JWT Authentication (Signup/Login)
- ✅ Role-based Authorization (Student, Teacher, Worker, Admin)
- ✅ Password Hashing with bcrypt
- ✅ MongoDB with Mongoose ODM
- ✅ Input Validation
- ✅ Secure Admin Seeding
- ✅ Error Handling
- ✅ CORS Configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone and navigate to backend folder:**
```bash
   cd backend
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Create .env file:**
```bash
   cp .env.example .env
```

4. **Configure environment variables in .env:**
```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/studysync
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   ADMIN_NAME=Titli Nath
   ADMIN_EMAIL=titlinath3@gmail.com
   ADMIN_PASSWORD=turturii
   CLIENT_URL=http://localhost:3000
```

5. **Seed admin user:**
```bash
   npm run seed:admin
```

6. **Start server:**
```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
```

## 📡 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/signup` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |

### User Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/user/me` | Get current user profile | Private |

### Admin Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/admin/users` | Get all users | Admin Only |
| GET | `/api/admin/users/:id` | Get user by ID | Admin Only |
| DELETE | `/api/admin/users/:id` | Delete user | Admin Only |

### Health Check

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/health` | Server health status | Public |

## Request Examples

### Signup (Student)
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student",
  "institution": "Harvard University"
}
```

### Signup (Teacher)
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "role": "teacher",
  "institution": "MIT"
}
```

### Signup (Worker)
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "Bob Wilson",
  "email": "bob@example.com",
  "password": "password123",
  "role": "worker",
  "company": "Google Inc."
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Profile (Protected)
```bash
GET /api/user/me
Authorization: Bearer YOUR_JWT_TOKEN
```

### Get All Users (Admin Only)
```bash
GET /api/admin/users
Authorization: Bearer ADMIN_JWT_TOKEN
```

## Security Features

- ✅ Passwords hashed with bcrypt (10 salt rounds)
- ✅ JWT token authentication
- ✅ Role-based authorization
- ✅ Environment variables for sensitive data
- ✅ Input validation with express-validator
- ✅ CORS protection
- ✅ Admin cannot be created through signup
- ✅ Admin users cannot be deleted

##  Project Structure