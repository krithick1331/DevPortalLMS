# 🔐 DEV-Portal LMS Authentication Setup Guide

## ✅ Current Status

Your authentication system is **fully functional** and connected to MongoDB!

### Test Results
```
✅ Student Login         - PASS
✅ Admin Login           - PASS  
✅ Other Student Logins  - PASS
✅ Invalid Credentials   - PASS (correctly rejected)
```

---

## 📋 Quick Start

### 1. **Start MongoDB** (if not running)
```bash
# Windows - Start MongoDB Community Server service, or:
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 2. **Seed Test Users** (one-time setup)
```bash
cd backend
npm run seed
```

### 3. **Start Backend Server**
```bash
cd backend
npm run dev
```
Server will start at: `http://localhost:3000`

### 4. **Start Frontend** (in another terminal)
```bash
cd frontend
npm run dev
```
Frontend will be at: `http://localhost:5173`

---

## 🔑 Test Credentials

### Student Account
```
Email:    student@example.com
Password: password123
Role:     student
```

### Admin Account
```
Email:    admin@example.com
Password: admin123
Role:     admin
```

### Additional Test Accounts
```
Email:    bob.learner@example.com
Password: testpass456
Role:     student

Email:    alice.dev@example.com
Password: devpass789
Role:     student
```

---

## 🔄 Authentication Flow

### Login Flow
```
1. User enters email/password on LoginPage.jsx
   ↓
2. Frontend calls AuthContext.login()
   ↓
3. POST request to /api/auth/login (backend)
   ↓
4. Backend queries MongoDB User collection
   ↓
5. Password verified with bcrypt
   ↓
6. JWT token generated and returned
   ↓
7. Token stored in localStorage
   ↓
8. User redirected to Dashboard
```

### API Endpoints

#### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

Response:
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "email": "newuser@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "student",
    "points": 0
  }
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "student@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "email": "student@example.com",
    "firstName": "John",
    "lastName": "Student",
    "role": "student",
    "points": 0,
    "streak": 0
  }
}
```

#### Get Current User
```bash
GET /api/auth/me
Authorization: Bearer eyJhbGc...

Response:
{
  "user": {
    "id": "...",
    "email": "student@example.com",
    "firstName": "John",
    "lastName": "Student",
    "role": "student"
  }
}
```

#### Logout
```bash
POST /api/auth/logout

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 🗄️ MongoDB Connection

### Configuration
```
URI: mongodb://localhost:27017/dev-portal-lms
Database: dev-portal-lms
Collection: users
```

### User Document Structure
```javascript
{
  _id: ObjectId,
  email: "student@example.com",
  password: "$2a$10$...", // bcrypt hashed
  firstName: "John",
  lastName: "Student",
  role: "student",          // "student" or "admin"
  active: true,
  points: 0,
  streak: 0,
  lastActivity: ISODate(),
  createdAt: ISODate(),
  updatedAt: ISODate()
}
```

---

## 🧪 Testing Commands

### Test Login Credentials Against MongoDB
```bash
cd backend
npm run test:login
```

### Seed Fresh Test Data
```bash
cd backend
npm run seed
```

### Check Backend Health
```bash
curl http://localhost:3000/api/health
```

### Test Login API
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"password123"}'
```

---

## 🔐 Security Features

✅ **Password Hashing** - bcryptjs (10 salt rounds)
✅ **JWT Tokens** - 7-day expiration
✅ **Rate Limiting** - 100 requests per 15 minutes
✅ **CORS Protection** - Configured for frontend origin
✅ **Helmet Security Headers** - CSP, X-Frame-Options, etc.
✅ **Input Validation** - Required fields checked
✅ **Password Select** - Password excluded from queries unless explicitly selected

---

## 🛠️ Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running: `mongosh` should connect
- Check `.env` file has correct `MONGODB_URI`
- Default: `mongodb://localhost:27017/dev-portal-lms`

### Login Returns 401 Unauthorized
- Verify email exists in database: `npm run test:login`
- Check password is correct
- Ensure user was seeded with `npm run seed`

### Token Expired
- Token expires after 7 days
- User needs to login again
- Check `JWT_SECRET` in `.env`

### Port 3000 Already in Use
```bash
# Windows: Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## 📝 Next Steps

1. ✅ MongoDB connection working
2. ✅ Test users created
3. ✅ Login endpoint tested
4. **→ Test login in frontend**
5. → Build user dashboard
6. → Implement course progression
7. → Add admin features

---

## 📞 Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start backend server |
| `npm run seed` | Create test users |
| `npm run test:login` | Verify credentials |
| `npm run start` | Start backend (production) |

---

**Created:** November 13, 2025  
**Status:** ✅ Ready for frontend integration  
**Next:** Start both servers and test the login page
