import React from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip
} from '@mui/material';
import { Schedule, AccessTime, Person } from '@mui/icons-material';

const StudentTimetable = () => {
  const timetable = {
    Monday: [
      { time: '9:00 - 9:45', subject: 'Mathematics', teacher: 'Bharani', room: 'Room 101' },
      { time: '9:45 - 10:30', subject: 'Science', teacher: 'Priya Sharma', room: 'Lab 1' },
      { time: '10:30 - 10:45', subject: 'Break', teacher: '', room: '' },
      { time: '10:45 - 11:30', subject: 'English', teacher: 'Raj Kumar', room: 'Room 102' },
      { time: '11:30 - 12:15', subject: 'Social Studies', teacher: 'Meera Singh', room: 'Room 103' },
      { time: '12:15 - 1:00', subject: 'Lunch Break', teacher: '', room: '' },
      { time: '1:00 - 1:45', subject: 'Physical Education', teacher: 'Suresh Kumar', room: 'Playground' }
    ],
    Tuesday: [
      { time: '9:00 - 9:45', subject: 'Science', teacher: 'Priya Sharma', room: 'Lab 1' },
      { time: '9:45 - 10:30', subject: 'Mathematics', teacher: 'Bharani', room: 'Room 101' },
      { time: '10:30 - 10:45', subject: 'Break', teacher: '', room: '' },
      { time: '10:45 - 11:30', subject: 'Social Studies', teacher: 'Meera Singh', room: 'Room 103' },
      { time: '11:30 - 12:15', subject: 'English', teacher: 'Raj Kumar', room: 'Room 102' },
      { time: '12:15 - 1:00', subject: 'Lunch Break', teacher: '', room: '' },
      { time: '1:00 - 1:45', subject: 'Computer Science', teacher: 'Amit Patel', room: 'Computer Lab' }
    ],
    Wednesday: [
      { time: '9:00 - 9:45', subject: 'English', teacher: 'Raj Kumar', room: 'Room 102' },
      { time: '9:45 - 10:30', subject: 'Mathematics', teacher: 'Bharani', room: 'Room 101' },
      { time: '10:30 - 10:45', subject: 'Break', teacher: '', room: '' },
      { time: '10:45 - 11:30', subject: 'Science', teacher: 'Priya Sharma', room: 'Lab 1' },
      { time: '11:30 - 12:15', subject: 'Art & Craft', teacher: 'Kavya Reddy', room: 'Art Room' },
      { time: '12:15 - 1:00', subject: 'Lunch Break', teacher: '', room: '' },
      { time: '1:00 - 1:45', subject: 'Music', teacher: 'Ravi Shankar', room: 'Music Room' }
    ],
    Thursday: [
      { time: '9:00 - 9:45', subject: 'Social Studies', teacher: 'Meera Singh', room: 'Room 103' },
      { time: '9:45 - 10:30', subject: 'Science', teacher: 'Priya Sharma', room: 'Lab 1' },
      { time: '10:30 - 10:45', subject: 'Break', teacher: '', room: '' },
      { time: '10:45 - 11:30', subject: 'Mathematics', teacher: 'Bharani', room: 'Room 101' },
      { time: '11:30 - 12:15', subject: 'English', teacher: 'Raj Kumar', room: 'Room 102' },
      { time: '12:15 - 1:00', subject: 'Lunch Break', teacher: '', room: '' },
      { time: '1:00 - 1:45', subject: 'Physical Education', teacher: 'Suresh Kumar', room: 'Playground' }
    ],
    Friday: [
      { time: '9:00 - 9:45', subject: 'Mathematics', teacher: 'Bharani', room: 'Room 101' },
      { time: '9:45 - 10:30', subject: 'English', teacher: 'Raj Kumar', room: 'Room 102' },
      { time: '10:30 - 10:45', subject: 'Break', teacher: '', room: '' },
      { time: '10:45 - 11:30', subject: 'Computer Science', teacher: 'Amit Patel', room: 'Computer Lab' },
      { time: '11:30 - 12:15', subject: 'Science', teacher: 'Priya Sharma', room: 'Lab 1' },
      { time: '12:15 - 1:00', subject: 'Lunch Break', teacher: '', room: '' },
      { time: '1:00 - 1:45', subject: 'Library Period', teacher: 'Librarian', room: 'Library' }
    ]
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': 'primary',
      'Science': 'success',
      'English': 'info',
      'Social Studies': 'warning',
      'Physical Education': 'error',
      'Computer Science': 'secondary',
      'Art & Craft': 'default',
      'Music': 'default',
      'Library Period': 'default'
    };
    return colors[subject] || 'default';
  };

  const isBreakOrLunch = (subject) => {
    return subject === 'Break' || subject === 'Lunch Break';
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Class Timetable
      </Typography>

      {/* Today's Schedule */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Schedule sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Today's Schedule - {currentDay}
            </Typography>
          </Box>
          
          {timetable[currentDay] ? (
            <Grid container spacing={2}>
              {timetable[currentDay].map((period, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      bgcolor: isBreakOrLunch(period.subject) ? 'grey.100' : 'background.paper',
                      border: currentDay === new Date().toLocaleDateString('en-US', { weekday: 'long' }) ? '2px solid' : '1px solid',
                      borderColor: currentDay === new Date().toLocaleDateString('en-US', { weekday: 'long' }) ? 'primary.main' : 'divider'
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AccessTime sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {period.time}
                        </Typography>
                      </Box>
                      
                      {!isBreakOrLunch(period.subject) ? (
                        <>
                          <Chip 
                            label={period.subject} 
                            color={getSubjectColor(period.subject)}
                            size="small"
                            sx={{ mb: 1 }}
                          />
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <Person sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {period.teacher}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {period.room}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                          {period.subject}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="text.secondary">
              No classes scheduled for today.
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Weekly Timetable */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Weekly Timetable
          </Typography>
          
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Time</TableCell>
                  {days.map((day) => (
                    <TableCell key={day} align="center" sx={{ fontWeight: 600 }}>
                      {day}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {timetable.Monday.map((_, timeIndex) => (
                  <TableRow key={timeIndex}>
                    <TableCell sx={{ fontWeight: 500, bgcolor: 'grey.50' }}>
                      {timetable.Monday[timeIndex].time}
                    </TableCell>
                    {days.map((day) => {
                      const period = timetable[day][timeIndex];
                      return (
                        <TableCell key={day} align="center">
                          {!isBreakOrLunch(period.subject) ? (
                            <Box>
                              <Chip 
                                label={period.subject} 
                                color={getSubjectColor(period.subject)}
                                size="small"
                                sx={{ mb: 0.5 }}
                              />
                              <Typography variant="caption" display="block" color="text.secondary">
                                {period.teacher}
                              </Typography>
                              <Typography variant="caption" display="block" color="text.secondary">
                                {period.room}
                              </Typography>
                            </Box>
                          ) : (
                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                              {period.subject}
                            </Typography>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentTimetable;