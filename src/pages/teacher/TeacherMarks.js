import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, FormControl, InputLabel, Select,
  MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TextField, Chip
} from '@mui/material';
import { Save, Grade } from '@mui/icons-material';

const TeacherMarks = () => {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedExam, setSelectedExam] = useState('midterm');
  const [marks, setMarks] = useState({
    '001': { math: 85, science: 78, english: 92 },
    '002': { math: 92, science: 88, english: 85 },
    '003': { math: 78, science: 82, english: 79 },
    '004': { math: 88, science: 90, english: 87 },
    '005': { math: 95, science: 93, english: 96 }
  });

  const classes = ['10-A', '9-B'];
  const exams = [
    { value: 'midterm', label: 'Mid Term Exam' },
    { value: 'final', label: 'Final Exam' },
    { value: 'unit1', label: 'Unit Test 1' },
    { value: 'unit2', label: 'Unit Test 2' }
  ];

  const students = [
    { rollNo: '001', name: 'Poovendrakumar', id: 1 },
    { rollNo: '002', name: 'Ananya Sharma', id: 2 },
    { rollNo: '003', name: 'Rohit Kumar', id: 3 },
    { rollNo: '004', name: 'Priya Singh', id: 4 },
    { rollNo: '005', name: 'Arjun Patel', id: 5 }
  ];

  const subjects = ['math', 'science', 'english'];

  const handleMarkChange = (rollNo, subject, value) => {
    setMarks(prev => ({
      ...prev,
      [rollNo]: {
        ...prev[rollNo],
        [subject]: parseInt(value) || 0
      }
    }));
  };

  const handleSave = () => {
    alert('Marks saved successfully!');
  };

  const getGrade = (mark) => {
    if (mark >= 90) return { grade: 'A+', color: 'success' };
    if (mark >= 80) return { grade: 'A', color: 'success' };
    if (mark >= 70) return { grade: 'B', color: 'info' };
    if (mark >= 60) return { grade: 'C', color: 'warning' };
    return { grade: 'F', color: 'error' };
  };

  const calculateAverage = (studentMarks) => {
    const total = Object.values(studentMarks).reduce((sum, mark) => sum + mark, 0);
    return (total / Object.values(studentMarks).length).toFixed(1);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Marks Management
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Select Class</InputLabel>
                <Select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  {classes.map((cls) => (
                    <MenuItem key={cls} value={cls}>
                      Class {cls}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
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
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                fullWidth
              >
                Save All Marks
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Grade sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Class {selectedClass} - {exams.find(e => e.value === selectedExam)?.label}
            </Typography>
          </Box>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Roll No</TableCell>
                  <TableCell>Student Name</TableCell>
                  {subjects.map((subject) => (
                    <TableCell key={subject} align="center">
                      {subject.charAt(0).toUpperCase() + subject.slice(1)}
                    </TableCell>
                  ))}
                  <TableCell align="center">Average</TableCell>
                  <TableCell align="center">Grade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => {
                  const studentMarks = marks[student.rollNo] || {};
                  const average = calculateAverage(studentMarks);
                  const gradeInfo = getGrade(parseFloat(average));
                  
                  return (
                    <TableRow key={student.rollNo}>
                      <TableCell>{student.rollNo}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      {subjects.map((subject) => (
                        <TableCell key={subject} align="center">
                          <TextField
                            size="small"
                            type="number"
                            value={studentMarks[subject] || ''}
                            onChange={(e) => handleMarkChange(student.rollNo, subject, e.target.value)}
                            inputProps={{ min: 0, max: 100 }}
                            sx={{ width: 80 }}
                          />
                        </TableCell>
                      ))}
                      <TableCell align="center">
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {average}%
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={gradeInfo.grade}
                          color={gradeInfo.color}
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
    </Box>
  );
};

export default TeacherMarks;