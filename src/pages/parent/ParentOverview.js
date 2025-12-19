import React from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Avatar, Chip, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, LinearProgress
} from '@mui/material';
import { Person, School, CalendarToday, Grade, Phone, Email, Home } from '@mui/icons-material';

const ParentOverview = () => {
  const childDetails = {
    name: 'Poovendrakumar',
    class: '10-A',
    section: 'A',
    rollNo: '001',
    admissionNo: 'ADM2023001',
    dateOfBirth: '2008-05-15',
    bloodGroup: 'O+',
    address: '123 Main Street, Chennai, Tamil Nadu',
    parentName: 'MahendiraPrasath',
    parentPhone: '+91 9876543210',
    parentEmail: 'mahendira@email.com',
    emergencyContact: '+91 9876543211'
  };

  const academicInfo = {
    currentYear: '2023-24',
    admissionDate: '2023-04-01',
    overallGrade: 'A-',
    overallPercentage: 87,
    rank: 5,
    totalStudents: 30
  };

  const subjects = [
    { name: 'Mathematics', teacher: 'Bharani', grade: 'A', percentage: 88 },
    { name: 'Science', teacher: 'Priya Sharma', grade: 'A-', percentage: 85 },
    { name: 'English', teacher: 'Raj Kumar', grade: 'B+', percentage: 82 },
    { name: 'Social Studies', teacher: 'Meera Singh', grade: 'A', percentage: 90 },
    { name: 'Physical Education', teacher: 'Suresh Kumar', grade: 'A+', percentage: 95 }
  ];

  const attendanceStats = {
    totalDays: 180,
    presentDays: 166,
    absentDays: 14,
    percentage: 92.2
  };

  const feeDetails = [
    { particular: 'Tuition Fee', amount: 15000, status: 'Paid', dueDate: '2024-01-01' },
    { particular: 'Library Fee', amount: 500, status: 'Paid', dueDate: '2024-01-01' },
    { particular: 'Sports Fee', amount: 1000, status: 'Paid', dueDate: '2024-01-01' },
    { particular: 'Exam Fee', amount: 2000, status: 'Pending', dueDate: '2024-02-01' }
  ];

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'success';
    if (grade.includes('B')) return 'info';
    if (grade.includes('C')) return 'warning';
    return 'error';
  };

  const getStatusColor = (status) => {
    return status === 'Paid' ? 'success' : 'warning';
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Child Overview
      </Typography>

      <Grid container spacing={3}>
        {/* Personal Information */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Person sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Personal Information
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: '2rem', mr: 2 }}>
                  {childDetails.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {childDetails.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Class {childDetails.class} - Section {childDetails.section}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Roll No: {childDetails.rollNo}
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Admission No</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {childDetails.admissionNo}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Date of Birth</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {new Date(childDetails.dateOfBirth).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Blood Group</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {childDetails.bloodGroup}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Academic Year</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {academicInfo.currentYear}
                  </Typography>
                </Grid>
              </Grid>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">Address</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {childDetails.address}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Academic Performance */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Grade sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Academic Performance
                </Typography>
              </Box>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                      {academicInfo.overallGrade}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Overall Grade
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      {academicInfo.rank}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Class Rank
                    </Typography>
                  </Card>
                </Grid>
              </Grid>

              <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                Subject Performance:
              </Typography>
              {subjects.slice(0, 4).map((subject, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {subject.name}
                    </Typography>
                    <Chip label={subject.grade} size="small" color={getGradeColor(subject.grade)} />
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={subject.percentage} 
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {subject.percentage}% - {subject.teacher}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Contact Information
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Person sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary">Parent Name</Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500, ml: 3 }}>
                  {childDetails.parentName}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Phone sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary">Phone Number</Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500, ml: 3 }}>
                  {childDetails.parentPhone}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Email sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary">Email Address</Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500, ml: 3 }}>
                  {childDetails.parentEmail}
                </Typography>
              </Box>

              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Phone sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary">Emergency Contact</Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500, ml: 3 }}>
                  {childDetails.emergencyContact}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Fee Details */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Fee Details
              </Typography>
              
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Particular</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="center">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {feeDetails.map((fee, index) => (
                      <TableRow key={index}>
                        <TableCell>{fee.particular}</TableCell>
                        <TableCell align="right">₹{fee.amount.toLocaleString()}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={fee.status}
                            size="small"
                            color={getStatusColor(fee.status)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ParentOverview;