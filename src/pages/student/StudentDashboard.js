import React from 'react';
import { Box, Typography, Grid, Card, CardContent, LinearProgress, Chip } from '@mui/material';
import { Assignment, Schedule, Announcement, Grade, TrendingUp } from '@mui/icons-material';

const StudentDashboard = () => {
  const stats = [
    { title: 'Overall Attendance', value: '92%', icon: <Assignment />, color: 'success' },
    { title: 'Average Grade', value: 'A-', icon: <Grade />, color: 'primary' },
    { title: 'Assignments Due', value: '3', icon: <Schedule />, color: 'warning' },
    { title: 'Notices', value: '2', icon: <Announcement />, color: 'info' }
  ];

  const subjects = [
    { name: 'Mathematics', grade: 'A', progress: 88, teacher: 'Bharani' },
    { name: 'Science', grade: 'A-', progress: 85, teacher: 'Priya Sharma' },
    { name: 'English', grade: 'B+', progress: 82, teacher: 'Raj Kumar' },
    { name: 'Social Studies', grade: 'A', progress: 90, teacher: 'Meera Singh' }
  ];

  const recentAnnouncements = [
    { title: 'Math Quiz Next Week', date: '2024-01-10', priority: 'medium' },
    { title: 'Sports Day Registration', date: '2024-01-08', priority: 'low' }
  ];

  const upcomingAssignments = [
    { subject: 'Mathematics', title: 'Algebra Problems', due: '2024-01-15' },
    { subject: 'Science', title: 'Physics Lab Report', due: '2024-01-17' },
    { subject: 'English', title: 'Essay Writing', due: '2024-01-20' }
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Student Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%', background: `linear-gradient(135deg, ${stat.color === 'primary' ? '#6366f1' : stat.color === 'success' ? '#10b981' : stat.color === 'warning' ? '#f59e0b' : '#3b82f6'} 0%, ${stat.color === 'primary' ? '#8b5cf6' : stat.color === 'success' ? '#059669' : stat.color === 'warning' ? '#d97706' : '#1d4ed8'} 100%)`, color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {stat.title}
                    </Typography>
                  </Box>
                  <Box sx={{ opacity: 0.8 }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Subject Performance */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Subject Performance
                </Typography>
              </Box>
              {subjects.map((subject, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {subject.name}
                    </Typography>
                    <Chip label={subject.grade} size="small" color="primary" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Teacher: {subject.teacher}
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={subject.progress} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {subject.progress}% Progress
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            {/* Announcements */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Announcement sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Recent Notices
                    </Typography>
                  </Box>
                  {recentAnnouncements.map((announcement, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {announcement.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(announcement.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            {/* Upcoming Assignments */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Schedule sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Upcoming Assignments
                    </Typography>
                  </Box>
                  {upcomingAssignments.map((assignment, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {assignment.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {assignment.subject} - Due: {new Date(assignment.due).toLocaleDateString()}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;