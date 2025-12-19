import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Grid, IconButton, Chip, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Add, Edit, Delete, Announcement, CalendarToday } from '@mui/icons-material';

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'School Reopening Notice',
      content: 'School will reopen on Monday, January 15th after winter break.',
      date: '2024-01-10',
      priority: 'high',
      audience: 'all'
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      content: 'Parent-teacher meetings scheduled for January 20th-22nd.',
      date: '2024-01-08',
      priority: 'medium',
      audience: 'parents'
    },
    {
      id: 3,
      title: 'Sports Day Event',
      content: 'Annual sports day will be held on February 5th. All students must participate.',
      date: '2024-01-05',
      priority: 'low',
      audience: 'students'
    }
  ]);
  const [open, setOpen] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'medium',
    audience: 'all'
  });

  const handleSubmit = () => {
    if (editAnnouncement) {
      setAnnouncements(announcements.map(ann => 
        ann.id === editAnnouncement.id 
          ? { ...ann, ...formData }
          : ann
      ));
    } else {
      setAnnouncements([...announcements, {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split('T')[0]
      }]);
    }
    setOpen(false);
    setEditAnnouncement(null);
    setFormData({ title: '', content: '', priority: 'medium', audience: 'all' });
  };

  const handleEdit = (announcement) => {
    setEditAnnouncement(announcement);
    setFormData(announcement);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter(ann => ann.id !== id));
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
          Announcements Management
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <Announcement sx={{ mr: 1, color: 'primary.main' }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {announcement.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
                        <CalendarToday sx={{ fontSize: 16 }} />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(announcement.date).toLocaleDateString()}
                        </Typography>
                        <Chip 
                          label={announcement.priority.toUpperCase()} 
                          size="small" 
                          color={getPriorityColor(announcement.priority)}
                        />
                        <Chip 
                          label={announcement.audience.toUpperCase()} 
                          size="small" 
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton size="small" onClick={() => handleEdit(announcement)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(announcement.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
                
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {announcement.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editAnnouncement ? 'Edit Announcement' : 'Create New Announcement'}</DialogTitle>
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
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Audience</InputLabel>
                <Select
                  value={formData.audience}
                  onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="students">Students</MenuItem>
                  <MenuItem value="teachers">Teachers</MenuItem>
                  <MenuItem value="parents">Parents</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editAnnouncement ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminAnnouncements;