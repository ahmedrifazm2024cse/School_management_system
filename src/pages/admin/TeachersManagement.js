import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, TextField, InputAdornment, Chip, Avatar, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, Grid
} from '@mui/material';
import { Search, Add, Edit, Delete, School } from '@mui/icons-material';

const TeachersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editTeacher, setEditTeacher] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', phone: '', qualification: ''
  });

  useEffect(() => {
    const savedTeachers = JSON.parse(localStorage.getItem('teachers') || '[]');
    if (savedTeachers.length === 0) {
      const defaultTeachers = [
        { id: 1, name: 'Dr. Rajesh Kumar', subject: 'Data Structures', email: 'rajesh.kumar@college.edu', phone: '+91-9876543210', status: 'Active' },
        { id: 2, name: 'Prof. Meera Sharma', subject: 'Database Systems', email: 'meera.sharma@college.edu', phone: '+91-9876543211', status: 'Active' },
        { id: 3, name: 'Dr. Suresh Patel', subject: 'Computer Networks', email: 'suresh.patel@college.edu', phone: '+91-9876543212', status: 'Active' }
      ];
      setTeachers(defaultTeachers);
      localStorage.setItem('teachers', JSON.stringify(defaultTeachers));
    } else {
      setTeachers(savedTeachers);
    }
  }, []);

  const handleSubmit = () => {
    let updatedTeachers;
    if (editTeacher) {
      updatedTeachers = teachers.map(teacher => 
        teacher.id === editTeacher.id ? { ...teacher, ...formData, status: 'Active' } : teacher
      );
    } else {
      updatedTeachers = [...teachers, { id: Date.now(), ...formData, status: 'Active' }];
    }
    setTeachers(updatedTeachers);
    localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
    setOpen(false);
    setEditTeacher(null);
    setFormData({ name: '', email: '', subject: '', phone: '', qualification: '' });
  };

  const handleEdit = (teacher) => {
    setEditTeacher(teacher);
    setFormData(teacher);
    setOpen(true);
  };

  const handleDelete = (id) => {
    const updatedTeachers = teachers.filter(teacher => teacher.id !== id);
    setTeachers(updatedTeachers);
    localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
  };

  const handleAdd = () => {
    setEditTeacher(null);
    setFormData({ name: '', email: '', subject: '', phone: '', qualification: '' });
    setOpen(true);
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
          Teachers Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAdd}
          sx={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            fontWeight: 600
          }}
        >
          Add Teacher
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3, mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search teachers by name, subject, or email..."
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
                  <TableCell sx={{ fontWeight: 600 }}>Teacher</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Subject</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, bgcolor: 'secondary.main' }}>
                          <School />
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {teacher.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.phone}</TableCell>
                    <TableCell>
                      <Chip
                        label={teacher.status}
                        color={teacher.status === 'Active' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" sx={{ mr: 1 }} onClick={() => handleEdit(teacher)}>
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(teacher.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editTeacher ? 'Edit Teacher' : 'Add New Teacher'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Qualification"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editTeacher ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeachersManagement;