import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Chip
} from '@mui/material';
import { Add, Announcement, CalendarToday } from '@mui/icons-material';

const TeacherAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Math Quiz Next Week',
      content: 'There will be a math quiz on Friday covering chapters 1-3.',
      date: '2024-01-10',
      class: '10-A',
      priority: 'medium'
    },
    {
      id: 2,
      title: 'Assignment Submission',
      content: 'Please submit your algebra assignments by Wednesday.',
      date: '2024-01-08',
      class: '9-B',
      priority: 'high'
    }
  ]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    class: '10-A',
    priority: 'medium'
  });

  const classes = ['10-A', '9-B'];

  const handleSubmit = () => {
    setAnnouncements([...announcements, {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split('T')[0]
    }]);
    setOpen(false);
    setFormData({ title: '', content: '', class: '10-A', priority: 'medium' });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Class Announcements
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Create Announcement
        </Button>
      </Box>

      <Grid container spacing={3}>
        {announcements.map((announcement) => (
          <Grid item xs={12} key={announcement.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Announcement sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                    {announcement.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip 
                      label={`Class ${announcement.class}`} 
                      size="small" 
                      variant="outlined"
                    />
                    <Chip 
                      label={announcement.priority.toUpperCase()} 
                      size="small" 
                      color={getPriorityColor(announcement.priority)}
                    />
                  </Box>
                </Box>
                
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {announcement.content}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                  <CalendarToday sx={{ fontSize: 16, mr: 1 }} />
                  <Typography variant="body2">
                    {new Date(announcement.date).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Announcement</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Content"
            multiline
            rows={4}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                >
                  {classes.map((cls) => (
                    <MenuItem key={cls} value={cls}>
                      Class {cls}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeacherAnnouncements;