import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./utils/ProtectedRoute";
import ConnectionStatus from "./components/ConnectionStatus";

// Common pages
import Login from "./pages/common/Login";
import Register from "./pages/common/Register";
import NotFound from "./pages/common/NotFound";
import Unauthorized from "./pages/common/Unauthorized";

// Public pages
import Landing from "./pages/public/Landing";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentsManagement from "./pages/admin/StudentsManagement";
import TeachersManagement from "./pages/admin/TeachersManagement";
import ClassesManagement from "./pages/admin/ClassesManagement";
import SubjectsManagement from "./pages/admin/SubjectsManagement";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";

// Teacher pages
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherClasses from "./pages/teacher/TeacherClasses";
import TeacherAttendance from "./pages/teacher/TeacherAttendance";
import TeacherMarks from "./pages/teacher/TeacherMarks";
import TeacherAnnouncements from "./pages/teacher/TeacherAnnouncements";

// Student pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentMarks from "./pages/student/StudentMarks";
import StudentTimetable from "./pages/student/StudentTimetable";
import StudentNotices from "./pages/student/StudentNotices";

// Parent pages
import ParentDashboard from "./pages/parent/ParentDashboard";
import ParentOverview from "./pages/parent/ParentOverview";
import ParentAttendance from "./pages/parent/ParentAttendance";
import ParentMarks from "./pages/parent/ParentMarks";
import ParentMessages from "./pages/parent/ParentMessages";

function App() {
  const { user } = useAuth();

  return (
    <>
      <ConnectionStatus />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout>
                <StudentsManagement />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/teachers"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout>
                <TeachersManagement />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/classes"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout>
                <ClassesManagement />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/subjects"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout>
                <SubjectsManagement />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/announcements"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout>
                <AdminAnnouncements />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Protected Teacher routes */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <Layout>
                <TeacherDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/classes"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <Layout>
                <TeacherClasses />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/attendance"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <Layout>
                <TeacherAttendance />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/marks"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <Layout>
                <TeacherMarks />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/announcements"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <Layout>
                <TeacherAnnouncements />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Protected Student routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Layout>
                <StudentDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/attendance"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Layout>
                <StudentAttendance />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/marks"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Layout>
                <StudentMarks />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/timetable"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Layout>
                <StudentTimetable />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/notices"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Layout>
                <StudentNotices />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Protected Parent routes */}
        <Route
          path="/parent"
          element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <Layout>
                <ParentDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/overview"
          element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <Layout>
                <ParentOverview />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/attendance"
          element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <Layout>
                <ParentAttendance />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/marks"
          element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <Layout>
                <ParentMarks />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/messages"
          element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <Layout>
                <ParentMessages />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Error routes */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
