import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Lock, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center'
      }}>
        <Lock sx={{ fontSize: 120, color: 'warning.main', mb: 2 }} />
        <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 700, mb: 2 }}>
          403
        </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          You don't have permission to access this page.
        </Typography>
        <Button
          variant="contained"
          startIcon={<Home />}
          onClick={() => navigate('/')}
          size="large"
        >
          Go Home
        </Button>
      </Box>
    </Container>
  );
};

export default Unauthorized;