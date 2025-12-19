import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Chip, FormControl, InputLabel,
  Select, MenuItem, Pagination
} from '@mui/material';
import { Announcement, CalendarToday, School, Person } from '@mui/icons-material';

const StudentNotices = () => {
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const notices = [
    {
      id: 1,
      title: 'School Reopening Notice',
      content: 'School will reopen on Monday, January 15th after winter break. All students are expected to attend classes regularly.',
      date: '2024-01-10',
      priority: 'high',
      category: 'general',
      author: 'Principal'
    },
    {
      id: 2,
      title: 'Math Quiz Next Week',
      content: 'There will be a mathematics quiz on Friday covering chapters 1-3. Please prepare accordingly.',
      date: '2024-01-10',
      priority: 'medium',
      category: 'academic',
      author: 'Bharani'
    },
    {
      id: 3,
      title: 'Sports Day Registration',
      content: 'Annual sports day will be held on February 5th. Registration is now open for all events.',
      date: '2024-01-08',
      priority: 'low',
      category: 'sports',
      author: 'Sports Coordinator'
    },
    {
      id: 4,
      title: 'Parent-Teacher Meeting',
      content: 'Parent-teacher meetings are scheduled for January 20th-22nd. Please inform your parents.',
      date: '2024-01-08',
      priority: 'high',
      category: 'general',
      author: 'Admin Office'
    },
    {
      id: 5,
      title: 'Science Project Submission',
      content: 'Science project submissions are due by January 25th. Late submissions will not be accepted.',
      date: '2024-01-07',
      priority: 'medium',
      category: 'academic',
      author: 'Priya Sharma'
    },
    {
      id: 6,
      title: 'Library New Books',
      content: 'New collection of books has arrived in the library. Students can issue books from Monday.',
      date: '2024-01-05',
      priority: 'low',
      category: 'general',
      author: 'Librarian'
    },
    {
      id: 7,
      title: 'Art Competition',
      content: 'Inter-class art competition will be held on January 30th. Interested students can register.',
      date: '2024-01-05',
      priority: 'low',
      category: 'extracurricular',
      author: 'Art Teacher'
    },
    {
      id: 8,
      title: 'Exam Schedule Released',
      content: 'Final examination schedule has been released. Check the notice board for detailed timetable.',
      date: '2024-01-03',
      priority: 'high',
      category: 'academic',
      author: 'Exam Controller'
    }
  ];

  const filteredNotices = filter === 'all' 
    ? notices 
    : notices.filter(notice => notice.category === filter);

  const paginatedNotices = filteredNotices.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'academic': return 'primary';
      case 'sports': return 'success';
      case 'extracurricular': return 'secondary';
      case 'general': return 'info';
      default: return 'default';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'academic': return <School sx={{ fontSize: 16 }} />;
      case 'sports': return <Person sx={{ fontSize: 16 }} />;
      default: return <Announcement sx={{ fontSize: 16 }} />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Notices & Announcements
      </Typography>

      {/* Filter */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Filter by Category</InputLabel>
                <Select
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value);
                    setPage(1);
                  }}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="general">General</MenuItem>
                  <MenuItem value="academic">Academic</MenuItem>
                  <MenuItem value="sports">Sports</MenuItem>
                  <MenuItem value="extracurricular">Extracurricular</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body2" color="text.secondary">
                Showing {filteredNotices.length} notice(s)
                {filter !== 'all' && ` in ${filter} category`}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Notices Grid */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {paginatedNotices.map((notice) => (
          <Grid item xs={12} md={6} key={notice.id}>
            <Card sx={{ height: '100%', position: 'relative' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    {getCategoryIcon(notice.category)}
                    <Typography variant="h6" sx={{ fontWeight: 600, ml: 1 }}>
                      {notice.title}
                    </Typography>
                  </Box>
                  <Chip 
                    label={notice.priority.toUpperCase()} 
                    size="small" 
                    color={getPriorityColor(notice.priority)}
                  />
                </Box>
                
                <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                  {notice.content}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                    <CalendarToday sx={{ fontSize: 16, mr: 1 }} />
                    <Typography variant="body2">
                      {new Date(notice.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip 
                      label={notice.category.charAt(0).toUpperCase() + notice.category.slice(1)} 
                      size="small" 
                      color={getCategoryColor(notice.category)}
                      variant="outlined"
                    />
                  </Box>
                </Box>
                
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  By: {notice.author}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            size="large"
          />
        </Box>
      )}

      {filteredNotices.length === 0 && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Announcement sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No notices found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              There are no notices in the selected category.
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default StudentNotices;