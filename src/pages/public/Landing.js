import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent } from '@mui/material';
import { School, Login, Info, ContactMail } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    { title: 'Student Management', desc: 'Comprehensive student records and tracking' },
    { title: 'Teacher Portal', desc: 'Tools for educators to manage classes and grades' },
    { title: 'Parent Access', desc: 'Keep parents informed about their child\'s progress' },
    { title: 'Admin Dashboard', desc: 'Complete school administration and oversight' }
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 2 }}>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <School sx={{ mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                School Portal
              </Typography>
            </Box>
            <Box>
              <Button color="inherit" onClick={() => navigate('/about')} sx={{ mr: 1 }}>
                About
              </Button>
              <Button color="inherit" onClick={() => navigate('/contact')} sx={{ mr: 2 }}>
                Contact
              </Button>
              <Button variant="outlined" color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: 10,
        textAlign: 'center'
      }}>
        <Container>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 3 }}>
            Modern School Management
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Streamline your educational institution with our comprehensive portal
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Login />}
            onClick={() => navigate('/login')}
            sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, fontWeight: 600 }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%', boxShadow: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 4, textAlign: 'center' }}>
        <Container>
          <Typography variant="body2">
            © 2024 School Management Portal. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;