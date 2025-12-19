import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Dialog, DialogTitle,
  DialogContent, List, ListItem, ListItemText, Chip, Avatar
} from '@mui/material';
import { Class, People, Assignment, Visibility } from '@mui/icons-material';

const TeacherClasses = () => {
  const [classes] = useState([
    {
      id: 1,
      name: 'Class 10-A',
      subject: 'Mathematics',
      students: 30,
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      students_list: [
        { id: 1, name: 'Poovendrakumar', rollNo: '001', attendance: 95 },
        { id: 2, name: 'Ananya Sharma', rollNo: '002', attendance: 92 },
        { id: 3, name: 'Rohit Kumar', rollNo: '003', attendance: 88 }
      ]
    },
    {
      id: 2,
      name: 'Class 9-B',
      subject: 'Mathematics',
      students: 28,
      schedule: 'Tue, Thu - 10:00 AM',
      students_list: [
        { id: 4, name: 'Priya Singh', rollNo: '001', attendance: 97 },
        { id: 5, name: 'Arjun Patel', rollNo: '002', attendance: 90 },
        { id: 6, name: 'Sneha Reddy', rollNo: '003', attendance: 85 }
      ]
    }
  ]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [open, setOpen] = useState(false);

  const handleViewStudents = (classData) => {
    setSelectedClass(classData);
    setOpen(true);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        My Classes
      </Typography>

      <Grid container spacing={3}>
        {classes.map((classData) => (
          <Grid item xs={12} md={6} key={classData.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Class sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {classData.name}
                  </Typography>
                </Box>
                
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Subject: <strong>{classData.subject}</strong>
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <People sx={{ mr: 1, fontSize: 16 }} />
                  <Typography variant="body2">
                    {classData.students} Students
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Schedule: {classData.schedule}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Visibility />}
                    onClick={() => handleViewStudents(classData)}
                    size="small"
                  >
                    View Students
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Assignment />}
                    size="small"
                  >
                    Take Attendance
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Students in {selectedClass?.name} - {selectedClass?.subject}
        </DialogTitle>
        <DialogContent>
          <List>
            {selectedClass?.students_list.map((student) => (
              <ListItem key={student.id} sx={{ border: '1px solid #e0e0e0', mb: 1, borderRadius: 1 }}>
                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                  {student.name.charAt(0)}
                </Avatar>
                <ListItemText
                  primary={student.name}
                  secondary={`Roll No: ${student.rollNo}`}
                />
                <Chip
                  label={`${student.attendance}% Attendance`}
                  color={student.attendance >= 90 ? 'success' : student.attendance >= 75 ? 'warning' : 'error'}
                  size="small"
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TeacherClasses;