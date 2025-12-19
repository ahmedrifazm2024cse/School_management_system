import React from 'react';
import { Grid, Card, CardContent, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { Class, Assignment, People, Schedule } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  
  const stats = [
    { title: 'My Classes', value: '6', icon: <Class />, color: '#6366f1' },
    { title: 'Total Students', value: '180', icon: <People />, color: '#f59e0b' },
    { title: 'Pending Marks', value: '12', icon: <Assignment />, color: '#ef4444' },
    { title: 'Today\'s Classes', value: '4', icon: <Schedule />, color: '#10b981' }
  ];

  const todaySchedule = [
    { time: '09:00 AM', subject: 'Mathematics', class: '10-A', room: 'Room 101' },
    { time: '11:00 AM', subject: 'Mathematics', class: '10-B', room: 'Room 102' },
    { time: '02:00 PM', subject: 'Algebra', class: '11-A', room: 'Room 103' },
    { time: '03:30 PM', subject: 'Geometry', class: '9-A', room: 'Room 104' }
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
        Teacher Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              borderRadius: 3, 
              background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}25 100%)`,
              border: `1px solid ${stat.color}30`
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                  <Box sx={{ color: stat.color, opacity: 0.7 }}>
                    {React.cloneElement(stat.icon, { sx: { fontSize: 40 } })}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, p: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Today's Schedule
              </Typography>
              <List>
                {todaySchedule.map((item, index) => (
                  <ListItem 
                    key={index}
                    sx={{ 
                      bgcolor: 'grey.50', 
                      borderRadius: 2, 
                      mb: 1,
                      border: '1px solid #f0f0f0'
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {item.subject} - {item.class}
                          </Typography>
                          <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
                            {item.time}
                          </Typography>
                        </Box>
                      }
                      secondary={item.room}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, p: 2, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Quick Actions
              </Typography>
              {[
                { text: 'Mark Attendance', path: '/teacher/attendance' },
                { text: 'Enter Marks', path: '/teacher/marks' },
                { text: 'View Classes', path: '/teacher/classes' },
                { text: 'Send Announcement', path: '/teacher/announcements' }
              ].map((action, index) => (
                <Typography 
                  key={index}
                  variant="body2" 
                  onClick={() => navigate(action.path)}
                  sx={{ 
                    py: 1.5, 
                    px: 2,
                    mb: 1,
                    bgcolor: 'primary.light',
                    color: 'white',
                    borderRadius: 2,
                    cursor: 'pointer',
                    textAlign: 'center',
                    '&:hover': { bgcolor: 'primary.main' }
                  }}
                >
                  {action.text}
                </Typography>
              ))}
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 3, p: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Recent Updates
              </Typography>
              {[
                'New student joined 10-A',
                'Assignment submitted by 15 students',
                'Parent meeting scheduled'
              ].map((update, index) => (
                <Typography 
                  key={index}
                  variant="body2" 
                  sx={{ py: 1, borderBottom: index < 2 ? '1px solid #f0f0f0' : 'none' }}
                >
                  • {update}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacherDashboard;