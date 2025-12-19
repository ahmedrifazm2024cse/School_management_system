import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText,
  Box, IconButton, Avatar, Menu, MenuItem, useTheme, Divider
} from '@mui/material';
import {
  Menu as MenuIcon, Dashboard, People, School, Class, Announcement,
  Assignment, Schedule, AccountCircle, Logout, Home
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const getMenuItems = () => {
    const baseItems = [
      { text: 'Dashboard', icon: <Dashboard />, path: `/${user?.role}` }
    ];

    switch (user?.role) {
      case 'admin':
        return [
          ...baseItems,
          { text: 'Students', icon: <People />, path: '/admin/students' },
          { text: 'Teachers', icon: <School />, path: '/admin/teachers' },
          { text: 'Classes', icon: <Class />, path: '/admin/classes' },
          { text: 'Subjects', icon: <Assignment />, path: '/admin/subjects' },
          { text: 'Announcements', icon: <Announcement />, path: '/admin/announcements' }
        ];
      case 'teacher':
        return [
          ...baseItems,
          { text: 'Classes', icon: <Class />, path: '/teacher/classes' },
          { text: 'Attendance', icon: <Assignment />, path: '/teacher/attendance' },
          { text: 'Marks', icon: <Assignment />, path: '/teacher/marks' },
          { text: 'Announcements', icon: <Announcement />, path: '/teacher/announcements' }
        ];
      case 'student':
        return [
          ...baseItems,
          { text: 'Attendance', icon: <Assignment />, path: '/student/attendance' },
          { text: 'Marks', icon: <Assignment />, path: '/student/marks' },
          { text: 'Timetable', icon: <Schedule />, path: '/student/timetable' },
          { text: 'Notices', icon: <Announcement />, path: '/student/notices' }
        ];
      case 'parent':
        return [
          ...baseItems,
          { text: 'Child Overview', icon: <People />, path: '/parent/overview' },
          { text: 'Attendance', icon: <Assignment />, path: '/parent/attendance' },
          { text: 'Marks', icon: <Assignment />, path: '/parent/marks' },
          { text: 'Messages', icon: <Announcement />, path: '/parent/messages' }
        ];
      default:
        return baseItems;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setDrawerOpen(!drawerOpen)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            College Management System
          </Typography>
          <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
              {user?.name?.charAt(0) || 'U'}
            </Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => setAnchorEl(null)}>
              <AccountCircle sx={{ mr: 1 }} /> Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontWeight: 600 }}>
            {user?.role?.toUpperCase()} PANEL
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {getMenuItems().map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => {
                  navigate(item.path);
                  setDrawerOpen(false);
                }}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  backgroundColor: location.pathname === item.path ? theme.palette.primary.main : 'transparent',
                  color: location.pathname === item.path ? 'white' : theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: location.pathname === item.path ? theme.palette.primary.dark : theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;