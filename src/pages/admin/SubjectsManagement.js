import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Grid, IconButton, Chip
} from '@mui/material';
import { Add, Edit, Delete, Book } from '@mui/icons-material';

const SubjectsManagement = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Mathematics', code: 'MATH101', teacher: 'Bharani', classes: ['10-A', '10-B'] },
    { id: 2, name: 'Science', code: 'SCI101', teacher: 'Priya Sharma', classes: ['10-A', '9-A'] },
    { id: 3, name: 'English', code: 'ENG101', teacher: 'Raj Kumar', classes: ['10-A', '10-B', '9-A'] },
    { id: 4, name: 'Social Studies', code: 'SOC101', teacher: 'Meera Singh', classes: ['9-A'] }
  ]);
  const [open, setOpen] = useState(false);
  const [editSubject, setEditSubject] = useState(null);
  const [formData, setFormData] = useState({ name: '', code: '', teacher: '', classes: '' });

  const handleSubmit = () => {
    if (editSubject) {
      setSubjects(subjects.map(subject => 
        subject.id === editSubject.id 
          ? { ...subject, ...formData, classes: formData.classes.split(',').map(c => c.trim()) }
          : subject
      ));
    } else {
      setSubjects([...subjects, {
        id: Date.now(),
        ...formData,
        classes: formData.classes.split(',').map(c => c.trim())
      }]);
    }
    setOpen(false);
    setEditSubject(null);
    setFormData({ name: '', code: '', teacher: '', classes: '' });
  };

  const handleEdit = (subject) => {
    setEditSubject(subject);
    setFormData({ ...subject, classes: subject.classes.join(', ') });
    setOpen(true);
  };

  const handleDelete = (id) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Subjects Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Add Subject
        </Button>
      </Box>

      <Grid container spacing={3}>
        {subjects.map((subject) => (
          <Grid item xs={12} md={6} lg={4} key={subject.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Book sx={{ mr: 1, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {subject.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {subject.code}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton size="small" onClick={() => handleEdit(subject)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(subject.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Teacher: {subject.teacher}
                </Typography>
                
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Classes:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {subject.classes.map((cls, index) => (
                    <Chip key={index} label={cls} size="small" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editSubject ? 'Edit Subject' : 'Add New Subject'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Subject Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Subject Code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Teacher"
            value={formData.teacher}
            onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Classes (comma separated)"
            value={formData.classes}
            onChange={(e) => setFormData({ ...formData, classes: e.target.value })}
            placeholder="10-A, 10-B, 9-A"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editSubject ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubjectsManagement;