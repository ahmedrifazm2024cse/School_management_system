# College Management System

**Final Year Project - Computer Science Engineering**

A web-based college management system built using React.js and Node.js for managing students, faculty, and academic records.

## Project Details
- **Project Type:** Final Year Project
- **Domain:** Web Development
- **Technology Stack:** MERN Stack (MongoDB, Express.js, React.js, Node.js)
- **Duration:** 6 months

## Features

### Admin Module
- Student Management (Add, Edit, Delete, View)
- Faculty Management
- Course Management
- Attendance Tracking
- Marks Management

### Faculty Module
- View Assigned Classes
- Mark Attendance
- Enter Marks/Grades
- Create Announcements

### Student Module
- View Personal Details
- Check Attendance Records
- View Marks/Results
- Class Timetable

## Technology Stack
- **Frontend:** React.js, Material-UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT

## Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB Community Server** - [Download here](https://www.mongodb.com/try/download/community)
- **Git** (optional) - For cloning the repository

### Quick Start
1. **Setup Database:**
   ```bash
   SETUP_DATABASE.bat
   ```

2. **Start Application:**
   ```bash
   START_FULL.bat
   ```

3. **Access the System:**
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:3001
   - **Database:** mongodb://localhost:27017

### Manual Setup (if scripts fail)
1. **Install Dependencies:**
   ```bash
   npm install
   cd backend && npm install
   ```

2. **Start MongoDB:**
   ```bash
   net start MongoDB
   # OR manually: mongod --dbpath "C:\data\db"
   ```

3. **Start Backend:**
   ```bash
   cd backend
   npm start
   ```

4. **Start Frontend:**
   ```bash
   npm start
   ```

### Testing
- **Test Backend:** Run `TEST_BACKEND.bat`
- **Manual Test:** Visit http://localhost:3001/api/test

## Project Structure
```
college-management-system/
├── backend/          # Node.js backend
├── src/             # React frontend
├── public/          # Static files
└── README.md        # Project documentation
```

## Sample Login Credentials
- **Admin:** Create account with admin role
- **Faculty:** Create account with teacher role  
- **Student:** Create account with student role

## Database Schema
- Users (Authentication)
- Students (Student records)
- Teachers (Faculty records)
- Attendance (Attendance tracking)
- Marks (Grade management)

## Troubleshooting

### Common Issues

**1. "Backend server not running" error:**
- Run `SETUP_DATABASE.bat` first
- Ensure MongoDB is installed and running
- Check if ports 3000 and 3001 are available

**2. "Database connection failed":**
- Install MongoDB Community Server
- Create data directory: `mkdir C:\data\db`
- Start MongoDB service: `net start MongoDB`

**3. "Cannot add student" error:**
- Ensure all required fields are filled
- Check for duplicate email or roll number
- Verify backend server is running

**4. Port already in use:**
- Kill existing processes: `taskkill /f /im node.exe`
- Or change ports in `.env` files

### Student Management Features
- ✅ Add new students with validation
- ✅ Edit existing student details
- ✅ Delete students with confirmation
- ✅ Search and filter students
- ✅ Duplicate prevention (email/roll number)
- ✅ Real-time error handling

### Database Schema
```javascript
Student: {
  name: String (required, 2-50 chars)
  email: String (required, unique, valid email)
  rollNo: String (required, unique, uppercase)
  class: String (required, branch/year)
  phone: String (optional, 10-15 digits)
  address: String (optional, max 200 chars)
  status: String (Active/Inactive/Graduated/Suspended)
}
```

## Future Enhancements
- Email notifications
- Mobile app version
- Advanced reporting
- Fee management module
- Bulk student import/export
- Attendance analytics

---
**Developed as part of Computer Science Engineering curriculum**

### Support
If you encounter issues:
1. Run `TEST_BACKEND.bat` to diagnose problems
2. Check console logs in browser (F12)
3. Verify MongoDB is running in Task Manager
4. Ensure all dependencies are installed