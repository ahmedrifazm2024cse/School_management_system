const API_BASE_URL = 'http://localhost:3001/api';

// Helper function to handle API errors
const handleApiCall = async (apiCall) => {
  try {
    const response = await apiCall();
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response;
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error('Backend server not running. Please start MongoDB and backend first.');
    }
    throw error;
  }
};

const api = {
  // Auth
  login: (credentials) => 
    fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }),
  
  register: (userData) =>
    fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }),

  // Students
  getStudents: () => fetch(`${API_BASE_URL}/students`),
  createStudent: (student) =>
    fetch(`${API_BASE_URL}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    }),
  updateStudent: (id, student) =>
    fetch(`${API_BASE_URL}/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    }),
  deleteStudent: (id) =>
    fetch(`${API_BASE_URL}/students/${id}`, { method: 'DELETE' }),

  // Teachers
  getTeachers: () => fetch(`${API_BASE_URL}/teachers`),
  createTeacher: (teacher) =>
    fetch(`${API_BASE_URL}/teachers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacher)
    }),
  updateTeacher: (id, teacher) =>
    fetch(`${API_BASE_URL}/teachers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacher)
    }),
  deleteTeacher: (id) =>
    fetch(`${API_BASE_URL}/teachers/${id}`, { method: 'DELETE' }),

  // Attendance
  getAttendance: () => fetch(`${API_BASE_URL}/attendance`),
  createAttendance: (attendance) =>
    fetch(`${API_BASE_URL}/attendance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attendance)
    }),
  getStudentAttendance: (studentId) => 
    fetch(`${API_BASE_URL}/attendance/student/${studentId}`),

  // Marks
  getMarks: () => fetch(`${API_BASE_URL}/marks`),
  createMarks: (marks) =>
    fetch(`${API_BASE_URL}/marks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(marks)
    }),
  getStudentMarks: (studentId) => 
    fetch(`${API_BASE_URL}/marks/student/${studentId}`)
};

export default api;