import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import { Search, Add, Edit, Delete, Person } from "@mui/icons-material";

const StudentsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    class: "",
    rollNo: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  // Force refresh every 3 seconds to ensure students display
  useEffect(() => {
    const interval = setInterval(() => {
      fetchStudents();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchStudents = async () => {
    try {
      console.log("Fetching students...");
      const response = await fetch(
        "https://backend-school-management-3e0z.onrender.com/api/students"
      );
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Fetched students:", data.length, "students");
        console.log("Students data:", data);
        setStudents(Array.isArray(data) ? data : []);
      } else {
        console.error("❌ Failed to fetch students:", response.status);
        setStudents([]);
      }
    } catch (error) {
      console.error("❌ Error fetching students:", error);
      setStudents([]);
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo?.includes(searchTerm)
  );

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.rollNo ||
      !formData.class
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const url = editStudent
        ? `https://backend-school-management-3e0z.onrender.com/api/students/${editStudent._id}`
        : "https://backend-school-management-3e0z.onrender.com/api/students";

      const method = editStudent ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setOpen(false);
        setEditStudent(null);
        setFormData({
          name: "",
          email: "",
          class: "",
          rollNo: "",
          phone: "",
          address: "",
        });
        alert(editStudent ? "Student updated!" : "Student added successfully!");
        // Force refresh the student list
        setTimeout(() => {
          fetchStudents();
        }, 500);
      } else {
        const error = await response.json();
        alert(error.message || "Failed to save student");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server connection failed");
    }
  };

  const handleEdit = (student) => {
    setEditStudent(student);
    setFormData(student);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      const response = await fetch(
        `https://backend-school-management-3e0z.onrender.com/api/students/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        await fetchStudents();
        alert("Student deleted!");
      } else {
        alert("Failed to delete student");
      }
    } catch (error) {
      alert("Server error");
    }
  };

  const handleAdd = () => {
    setEditStudent(null);
    setFormData({
      name: "",
      email: "",
      class: "",
      rollNo: "",
      phone: "",
      address: "",
    });
    setOpen(true);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "primary.main" }}
        >
          Engineering Students Management
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={fetchStudents}
            sx={{ fontWeight: 600 }}
          >
            Refresh ({students.length})
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAdd}
            sx={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              fontWeight: 600,
            }}
          >
            Add Student
          </Button>
        </Box>
      </Box>

      <Card sx={{ borderRadius: 3, mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search students by name, class, or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Student</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Roll No</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Branch</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student._id} hover>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
                            <Person />
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {student.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{student.rollNo}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <Chip
                          label={student.status || "Active"}
                          color={
                            (student.status || "Active") === "Active"
                              ? "success"
                              : "default"
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          sx={{ mr: 1 }}
                          onClick={() => handleEdit(student)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(student._id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        {students.length === 0
                          ? "No students found. Add your first student!"
                          : "No students match your search."}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editStudent ? "Edit Student" : "Add New Student"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name *"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email *"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Branch & Year (e.g., CSE-3A) *"
                value={formData.class}
                onChange={(e) =>
                  setFormData({ ...formData, class: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Roll No *"
                value={formData.rollNo}
                onChange={(e) =>
                  setFormData({ ...formData, rollNo: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editStudent ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentsManagement;
