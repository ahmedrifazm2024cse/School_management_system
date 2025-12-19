import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, FormControl, InputLabel, Select,
  MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, LinearProgress, Avatar
} from '@mui/material';
import { Grade, TrendingUp, Assessment } from '@mui/icons-material';

const ParentMarks = () => {
  const [selectedExam, setSelectedExam] = useState('midterm');
  
  const childInfo = {
    name: 'Poovendrakumar',
    class: '10-A',
    rollNo: '001'
  };

  const examResults = {
    midterm: [
      { subject: 'Mathematics', marks: 85, total: 100, grade: 'A' },
      { subject: 'Science', marks: 78, total: 100, grade: 'B+' },
      { subject: 'English', marks: 92, total: 100, grade: 'A+' },
      { subject: 'Social Studies', marks: 88, total: 100, grade: 'A' },
      { subject: 'Physical Education', marks: 95, total: 100, grade: 'A+' }
    ],
    final: [
      { subject: 'Mathematics', marks: 88, total: 100, grade: 'A' },
      { subject: 'Science', marks: 82, total: 100, grade: 'A-' },
      { subject: 'English', marks: 90, total: 100, grade: 'A' },
      { subject: 'Social Studies', marks: 85, total: 100, grade: 'A' },
      { subject: 'Physical Education', marks: 93, total: 100, grade: 'A+' }
    ]
  };

  const exams = [
    { value: 'midterm', label: 'Mid Term Exam' },
    { value: 'final', label: 'Final Exam' }
  ];

  const currentResults = examResults[selectedExam] || [];
  
  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'success';
    if (grade.includes('B')) return 'info';
    return 'warning';
  };

  const calculateOverallPercentage = (results) => {
    const totalMarks = results.reduce((sum, result) => sum + result.marks, 0);
    const totalPossible = results.reduce((sum, result) => sum + result.total, 0);
    return totalPossible > 0 ? Math.round((totalMarks / totalPossible) * 100) : 0;
  };

  const overallPercentage = calculateOverallPercentage(currentResults);
  const classRank = 5;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Child's Marks & Performance
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

      {/* Performance Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {overallPercentage}%
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Overall Score
                  </Typography>
                </Box>
                <Assessment sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {classRank}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Class Rank
                  </Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    A-
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Overall Grade
                  </Typography>
                </Box>
                <Grade sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Exam Results */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Exam Results
                </Typography>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Select Exam</InputLabel>
                  <Select
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                  >
                    {exams.map((exam) => (
                      <MenuItem key={exam.value} value={exam.value}>
                        {exam.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Subject</TableCell>
                      <TableCell align="center">Marks</TableCell>
                      <TableCell align="center">Total</TableCell>
                      <TableCell align="center">Percentage</TableCell>
                      <TableCell align="center">Grade</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentResults.map((result, index) => {
                      const percentage = Math.round((result.marks / result.total) * 100);
                      return (
                        <TableRow key={index}>
                          <TableCell sx={{ fontWeight: 500 }}>
                            {result.subject}
                          </TableCell>
                          <TableCell align="center">{result.marks}</TableCell>
                          <TableCell align="center">{result.total}</TableCell>
                          <TableCell align="center">
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {percentage}%
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={result.grade}
                              color={getGradeColor(result.grade)}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Subject Performance */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Subject Performance
              </Typography>
              {currentResults.map((subject, index) => {
                const percentage = Math.round((subject.marks / subject.total) * 100);
                return (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {subject.subject}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {percentage}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={percentage} 
                      color={percentage >= 90 ? 'success' : percentage >= 80 ? 'info' : 'warning'}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                );
              })}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ParentMarks;