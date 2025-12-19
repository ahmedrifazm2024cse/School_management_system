import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, FormControl, InputLabel, Select,
  MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, LinearProgress, Avatar
} from '@mui/material';
import { CalendarToday, CheckCircle, Cancel, TrendingUp, Person } from '@mui/icons-material';

const ParentAttendance = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  
  const childInfo = {
    name: 'Poovendrakumar',
    class: '10-A',
    rollNo: '001'
  };

  const attendanceData = [
    { date: '2024-01-15', subject: 'Mathematics', status: 'present' },
    { date: '2024-01-15', subject: 'Science', status: 'present' },
    { date: '2024-01-15', subject: 'English', status: 'absent' },
    { date: '2024-01-14', subject: 'Mathematics', status: 'present' },
    { date: '2024-01-14', subject: 'Social Studies', status: 'present' },
    { date: '2024-01-13', subject: 'Science', status: 'present' },
    { date: '2024-01-13', subject: 'English', status: 'present' },
    { date: '2024-01-12', subject: 'Mathematics', status: 'absent' },
    { date: '2024-01-12', subject: 'Physical Education', status: 'present' },
    { date: '2024-01-11', subject: 'Science', status: 'present' }
  ];

  const subjectStats = [
    { subject: 'Mathematics', present: 18, total: 20, percentage: 90 },
    { subject: 'Science', present: 19, total: 20, percentage: 95 },
    { subject: 'English', present: 17, total: 20, percentage: 85 },
    { subject: 'Social Studies', present: 20, total: 20, percentage: 100 },
    { subject: 'Physical Education', present: 16, total: 18, percentage: 89 }
  ];

  const monthlyStats = [
    { month: 'January 2024', present: 18, total: 20, percentage: 90 },
    { month: 'December 2023', present: 19, total: 22, percentage: 86 },
    { month: 'November 2023', present: 20, total: 21, percentage: 95 },
    { month: 'October 2023', present: 17, total: 20, percentage: 85 }
  ];

  const months = [
    { value: '2024-01', label: 'January 2024' },
    { value: '2023-12', label: 'December 2023' },
    { value: '2023-11', label: 'November 2023' },
    { value: '2023-10', label: 'October 2023' }
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

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'success';
    if (percentage >= 75) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Child's Attendance
      </Typography>

      {/* Child Info */}
      <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: 'white' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 60, height: 60, bgcolor: 'rgba(255,255,255,0.2)', mr: 2, fontSize: '1.5rem' }}>
              {childInfo.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {childInfo.name}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Class: {childInfo.class} | Roll No: {childInfo.rollNo}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

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
          <Card sx={{ height: '100%' }}>
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {stat.present}/{stat.total}
                      </Typography>
                      <Chip
                        label={`${stat.percentage}%`}
                        size="small"
                        color={getAttendanceColor(stat.percentage)}
                      />
                    </Box>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={stat.percentage} 
                    color={getAttendanceColor(stat.percentage)}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly Attendance Trend */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Monthly Attendance Trend
              </Typography>
              {monthlyStats.map((month, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {month.month}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {month.present}/{month.total}
                      </Typography>
                      <Chip
                        label={`${month.percentage}%`}
                        size="small"
                        color={getAttendanceColor(month.percentage)}
                      />
                    </Box>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={month.percentage} 
                    color={getAttendanceColor(month.percentage)}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Attendance Records */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Recent Attendance Records
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
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell>Remarks</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendanceData.slice(0, 10).map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarToday sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                            {new Date(record.date).toLocaleDateString()}
                          </Box>
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
                        <TableCell>
                          {record.status === 'absent' ? 'Medical leave' : '-'}
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

export default ParentAttendance;