import React from 'react';
import { Box, Typography, Grid, Card, CardContent, LinearProgress, Chip, Avatar } from '@mui/material';
import { Person, Assignment, Grade, Announcement, TrendingUp, School } from '@mui/icons-material';

const ParentDashboard = () => {
  const childInfo = {
    name: 'Poovendrakumar',
    class: '10-A',
    rollNo: '001',
    section: 'A',
    admissionNo: 'ADM2023001'
  };

  const stats = [
    { title: 'Attendance', value: '92%', icon: <Assignment />, color: 'success' },
    { title: 'Overall Grade', value: 'A-', icon: <Grade />, color: 'primary' },
    { title: 'Pending Fees', value: '₹0', icon: <School />, color: 'success' },
    { title: 'New Messages', value: '2', icon: <Announcement />, color: 'info' }
  ];

  const recentPerformance = [
    { subject: 'Mathematics', grade: 'A', percentage: 88, teacher: 'Bharani' },
    { subject: 'Science', grade: 'A-', percentage: 85, teacher: 'Priya Sharma' },
    { subject: 'English', grade: 'B+', percentage: 82, teacher: 'Raj Kumar' },
    { subject: 'Social Studies', grade: 'A', percentage: 90, teacher: 'Meera Singh' }
  ];

  const recentActivity = [
    { type: 'attendance', message: 'Present in all classes today', date: '2024-01-15', status: 'positive' },
    { type: 'grade', message: 'Scored 88% in Mathematics test', date: '2024-01-14', status: 'positive' },
    { type: 'notice', message: 'Parent-teacher meeting scheduled', date: '2024-01-13', status: 'neutral' },
    { type: 'assignment', message: 'Science project submitted on time', date: '2024-01-12', status: 'positive' }
  ];

  const upcomingEvents = [
    { title: 'Parent-Teacher Meeting', date: '2024-01-20', type: 'meeting' },
    { title: 'Mathematics Quiz', date: '2024-01-18', type: 'exam' },
    { title: 'Sports Day', date: '2024-02-05', type: 'event' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'attendance': return <Assignment sx={{ fontSize: 16 }} />;
      case 'grade': return <Grade sx={{ fontSize: 16 }} />;
      case 'notice': return <Announcement sx={{ fontSize: 16 }} />;
      default: return <Person sx={{ fontSize: 16 }} />;
    }
  };

  const getActivityColor = (status) => {
    switch (status) {
      case 'positive': return 'success';
      case 'negative': return 'error';
      default: return 'info';
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Parent Dashboard
      </Typography>

      {/* Child Info Card */}
      <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: 'white' }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'rgba(255,255,255,0.2)', fontSize: '2rem' }}>
                {childInfo.name.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {childInfo.name}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mb: 0.5 }}>
                Class: {childInfo.class} | Roll No: {childInfo.rollNo}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Admission No: {childInfo.admissionNo}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: `${stat.color}.main` }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                  <Box sx={{ color: `${stat.color}.main` }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Academic Performance */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TrendingUp sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Academic Performance
                </Typography>
              </Box>
              {recentPerformance.map((subject, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {subject.subject}
                    </Typography>
                    <Chip label={subject.grade} size="small" color="primary" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Teacher: {subject.teacher}
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={subject.percentage} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {subject.percentage}%
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity & Upcoming Events */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            {/* Recent Activity */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Recent Activity
                  </Typography>
                  {recentActivity.slice(0, 4).map((activity, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Chip
                          icon={getActivityIcon(activity.type)}
                          label={activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                          size="small"
                          color={getActivityColor(activity.status)}
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(activity.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {activity.message}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            {/* Upcoming Events */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Upcoming Events
                  </Typography>
                  {upcomingEvents.map((event, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(event.date).toLocaleDateString()}
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

export default ParentDashboard;