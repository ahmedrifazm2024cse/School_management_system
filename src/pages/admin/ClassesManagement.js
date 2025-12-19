import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Grid, Chip, IconButton, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { Add, Edit, Delete, Class, People } from '@mui/icons-material';

const ClassesManagement = () => {
  const [classes, setClasses] = useState([
    { id: 1, name: 'Class 10-A', teacher: 'Bharani', students: 30, subjects: ['Math', 'Science', 'English'] },
    { id: 2, name: 'Class 10-B', teacher: 'Priya Sharma', students: 28, subjects: ['Math', 'Science', 'Hindi'] },
    { id: 3, name: 'Class 9-A', teacher: 'Raj Kumar', students: 32, subjects: ['Math', 'Science', 'Social'] }
  ]);
  const [open, setOpen] = useState(false);
  const [editClass, setEditClass] = useState(null);
  const [formData, setFormData] = useState({ name: '', teacher: '', subjects: '' });

  const handleSubmit = () => {
    if (editClass) {
      setClasses(classes.map(cls => 
        cls.id === editClass.id 
          ? { ...cls, ...formData, subjects: formData.subjects.split(',').map(s => s.trim()) }
          : cls
      ));
    } else {
      setClasses([...classes, {
        id: Date.now(),
        ...formData,
        students: 0,
        subjects: formData.subjects.split(',').map(s => s.trim())
      }]);
    }
    setOpen(false);
    setEditClass(null);
    setFormData({ name: '', teacher: '', subjects: '' });
  };

  const handleEdit = (cls) => {
    setEditClass(cls);
    setFormData({ ...cls, subjects: cls.subjects.join(', ') });
    setOpen(true);
  };

  const handleDelete = (id) => {
    setClasses(classes.filter(cls => cls.id !== id));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Classes Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Add Class
        </Button>
      </Box>

      <Grid container spacing={3}>
        {classes.map((cls) => (
          <Grid item xs={12} md={6} lg={4} key={cls.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Class sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {cls.name}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton size="small" onClick={() => handleEdit(cls)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(cls.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Teacher: {cls.teacher}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <People sx={{ mr: 1, fontSize: 16 }} />
                  <Typography variant="body2">
                    {cls.students} Students
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {cls.subjects.map((subject, index) => (
                    <Chip key={index} label={subject} size="small" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editClass ? 'Edit Class' : 'Add New Class'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Class Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Class Teacher"
            value={formData.teacher}
            onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Subjects (comma separated)"
            value={formData.subjects}
            onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
            placeholder="Math, Science, English"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editClass ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClassesManagement;