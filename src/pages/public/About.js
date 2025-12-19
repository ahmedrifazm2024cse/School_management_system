import React from 'react';
import { Box, Typography, Container, Button, Grid, Card, CardContent } from '@mui/material';
import { School, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Header */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 2 }}>
        <Container>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              startIcon={<ArrowBack />}
              color="inherit"
              onClick={() => navigate('/')}
              sx={{ mr: 2 }}
            >
              Back
            </Button>
            <School sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              About School Portal
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
          About Our Platform
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.7 }}>
              Our School Management Portal is a comprehensive solution designed to streamline 
              educational administration and enhance communication between students, teachers, 
              parents, and administrators.
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.7 }}>
              Built with modern web technologies, our platform provides a secure, user-friendly 
              interface that adapts to the needs of different user roles within the educational 
              ecosystem.
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Key Benefits
            </Typography>
            <ul style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
              <li>Centralized student information management</li>
              <li>Real-time attendance tracking</li>
              <li>Grade management and reporting</li>
              <li>Parent-teacher communication tools</li>
              <li>Administrative oversight and analytics</li>
            </ul>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Contact Information
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Email: info@schoolportal.com
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Phone: +1 (555) 123-4567
                </Typography>
                <Typography variant="body2">
                  Address: 123 Education St, Learning City
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;