import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, FormControl, InputLabel, Select,
  MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Checkbox, Chip
} from '@mui/material';
import { Save, CheckCircle, Cancel } from '@mui/icons-material';

const TeacherAttendance = () => {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({
    '001': true,
    '002': true,
    '003': false,
    '004': true,
    '005': true
  });

  const classes = ['10-A', '9-B'];
  const students = [
    { rollNo: '001', name: 'Poovendrakumar', id: 1 },
    { rollNo: '002', name: 'Ananya Sharma', id: 2 },
    { rollNo: '003', name: 'Rohit Kumar', id: 3 },
    { rollNo: '004', name: 'Priya Singh', id: 4 },
    { rollNo: '005', name: 'Arjun Patel', id: 5 }
  ];

  const handleAttendanceChange = (rollNo) => {
    setAttendance(prev => ({
      ...prev,
      [rollNo]: !prev[rollNo]
    }));
  };

  const handleSave = () => {
    alert('Attendance saved successfully!');
  };

  const presentCount = Object.values(attendance).filter(Boolean).length;
  const totalCount = students.length;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Attendance Management
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
                <Typography variant="body2" sx={{ mb: 1 }}>Date</Typography>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Present: {presentCount}/{totalCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {((presentCount / totalCount) * 100).toFixed(1)}% Attendance
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Class {selectedClass} - {new Date(selectedDate).toLocaleDateString()}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSave}
            >
              Save Attendance
            </Button>
          </Box>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Roll No</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell align="center">Present</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.rollNo}>
                    <TableCell>{student.rollNo}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={attendance[student.rollNo] || false}
                        onChange={() => handleAttendanceChange(student.rollNo)}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        icon={attendance[student.rollNo] ? <CheckCircle /> : <Cancel />}
                        label={attendance[student.rollNo] ? 'Present' : 'Absent'}
                        color={attendance[student.rollNo] ? 'success' : 'error'}
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
    </Box>
  );
};

export default TeacherAttendance;