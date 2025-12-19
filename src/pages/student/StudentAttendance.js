import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, FormControl, InputLabel, Select,
  MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, LinearProgress
} from '@mui/material';
import { CalendarToday, CheckCircle, Cancel, TrendingUp } from '@mui/icons-material';

const StudentAttendance = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  
  const attendanceData = [
    { date: '2024-01-15', subject: 'Mathematics', status: 'present' },
    { date: '2024-01-15', subject: 'Science', status: 'present' },
    { date: '2024-01-15', subject: 'English', status: 'absent' },
    { date: '2024-01-14', subject: 'Mathematics', status: 'present' },
    { date: '2024-01-14', subject: 'Social Studies', status: 'present' },
    { date: '2024-01-13', subject: 'Science', status: 'present' },
    { date: '2024-01-13', subject: 'English', status: 'present' },
    { date: '2024-01-12', subject: 'Mathematics', status: 'absent' },
    { date: '2024-01-12', subject: 'Physical Education', status: 'present' }
  ];

  const subjectStats = [
    { subject: 'Mathematics', present: 18, total: 20, percentage: 90 },
    { subject: 'Science', present: 19, total: 20, percentage: 95 },
    { subject: 'English', present: 17, total: 20, percentage: 85 },
    { subject: 'Social Studies', present: 20, total: 20, percentage: 100 },
    { subject: 'Physical Education', present: 16, total: 18, percentage: 89 }
  ];

  const months = [
    { value: '2024-01', label: 'January 2024' },
    { value: '2023-12', label: 'December 2023' },
    { value: '2023-11', label: 'November 2023' }
  ];

  const getStatusColor = (status) => {
    return status === 'present' ? 'success' : 'error';
  };

  const getStatusIcon = (status) => {
    return status === 'present' ? <CheckCircle /> : <Cancel />;
  };

  const overallAttendance = Math.round(
    (subjectStats.reduce((sum, stat) => sum + stat.present, 0) / 
     subjectStats.reduce((sum, stat) => sum + stat.total, 0)) * 100
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        My Attendance
      </Typography>

      {/* Overall Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {overallAttendance}%
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Overall Attendance
                  </Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {subjectStats.reduce((sum, stat) => sum + stat.present, 0)}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Days Present
                  </Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {subjectStats.reduce((sum, stat) => sum + (stat.total - stat.present), 0)}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Days Absent
                  </Typography>
                </Box>
                <Cancel sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Subject-wise Attendance */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Subject-wise Attendance
              </Typography>
              {subjectStats.map((stat, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {stat.subject}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {stat.present}/{stat.total} ({stat.percentage}%)
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={stat.percentage} 
                    color={stat.percentage >= 90 ? 'success' : stat.percentage >= 75 ? 'warning' : 'error'}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Attendance */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Recent Attendance
                </Typography>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Month</InputLabel>
                  <Select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    {months.map((month) => (
                      <MenuItem key={month.value} value={month.value}>
                        {month.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell align="center">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendanceData.slice(0, 8).map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {new Date(record.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{record.subject}</TableCell>
                        <TableCell align="center">
                          <Chip
                            icon={getStatusIcon(record.status)}
                            label={record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            color={getStatusColor(record.status)}
                            size="small"
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

export default StudentAttendance;