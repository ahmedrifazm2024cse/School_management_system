import React from 'react';
import { Grid, Card, CardContent, Typography, Box, LinearProgress, Button } from '@mui/material';
import { People, School, Class, Assignment, TrendingUp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const stats = [
    { title: 'Total Students', value: '1,247', icon: <People />, color: '#6366f1', change: '+12%' },
    { title: 'Total Teachers', value: '89', icon: <School />, color: '#f59e0b', change: '+5%' },
    { title: 'Total Classes', value: '45', icon: <Class />, color: '#10b981', change: '+2%' },
    { title: 'Active Subjects', value: '28', icon: <Assignment />, color: '#ef4444', change: '+8%' }
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
        Admin Dashboard
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
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                      <Typography variant="caption" color="success.main">
                        {stat.change}
                      </Typography>
                    </Box>
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
                Recent Activities
              </Typography>
              {[
                'New student John Doe enrolled in Grade 10',
                'Teacher Sarah Johnson updated marks for Math class',
                'Parent meeting scheduled for next week',
                'New announcement posted for all students'
              ].map((activity, index) => (
                <Box key={index} sx={{ py: 2, borderBottom: index < 3 ? '1px solid #f0f0f0' : 'none' }}>
                  <Typography variant="body2">{activity}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {index + 1} hour{index !== 0 ? 's' : ''} ago
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, p: 2, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Attendance Rate
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                94.5%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={94.5} 
                sx={{ height: 8, borderRadius: 4, bgcolor: 'grey.200' }}
              />
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 3, p: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Quick Actions
              </Typography>
              {[
                { text: 'Add New Student', path: '/admin/students' },
                { text: 'Manage Teachers', path: '/admin/teachers' },
                { text: 'Create Announcement', path: '/admin/announcements' },
                { text: 'Manage Classes', path: '/admin/classes' }
              ].map((action, index) => (
                <Button
                  key={index}
                  variant="contained"
                  onClick={() => navigate(action.path)}
                  sx={{ 
                    py: 1.5, 
                    px: 2,
                    mb: 1,
                    width: '100%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    borderRadius: 2,
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                >
                  {action.text}
                </Button>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;