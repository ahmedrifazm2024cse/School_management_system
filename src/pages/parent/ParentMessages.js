import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Chip, Avatar, Divider
} from '@mui/material';
import { Add, Message, Send, Person, School } from '@mui/icons-material';

const ParentMessages = () => {
  const [open, setOpen] = useState(false);
  const [newMessage, setNewMessage] = useState({ to: '', subject: '', content: '' });
  
  const messages = [
    {
      id: 1,
      from: 'Bharani (Math Teacher)',
      subject: 'Excellent Performance in Mathematics',
      content: 'Your child Poovendrakumar has shown excellent performance in the recent mathematics test. He scored 88% and is among the top performers in the class.',
      date: '2024-01-15',
      type: 'received',
      priority: 'normal',
      read: true
    },
    {
      id: 2,
      from: 'Principal Office',
      subject: 'Parent-Teacher Meeting Invitation',
      content: 'You are cordially invited to attend the parent-teacher meeting scheduled for January 20th, 2024. Please confirm your attendance.',
      date: '2024-01-14',
      type: 'received',
      priority: 'high',
      read: false
    },
    {
      id: 3,
      from: 'Priya Sharma (Science Teacher)',
      subject: 'Science Project Submission',
      content: 'Reminder: The science project is due on January 25th. Please ensure your child completes and submits the project on time.',
      date: '2024-01-12',
      type: 'received',
      priority: 'medium',
      read: true
    },
    {
      id: 4,
      from: 'You',
      subject: 'Inquiry about Child\'s Progress',
      content: 'I would like to know about my child\'s overall progress and areas where improvement is needed.',
      date: '2024-01-10',
      type: 'sent',
      priority: 'normal',
      read: true
    }
  ];

  const teachers = [
    'Bharani (Math Teacher)',
    'Priya Sharma (Science Teacher)',
    'Raj Kumar (English Teacher)',
    'Meera Singh (Social Studies Teacher)',
    'Principal Office',
    'Admin Office'
  ];

  const handleSendMessage = () => {
    // In a real app, this would send the message to the server
    console.log('Sending message:', newMessage);
    setOpen(false);
    setNewMessage({ to: '', subject: '', content: '' });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      default: return 'default';
    }
  };

  const unreadCount = messages.filter(msg => !msg.read && msg.type === 'received').length;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Messages & Communication
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          New Message
        </Button>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {messages.length}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Total Messages
                  </Typography>
                </Box>
                <Message sx={{ fontSize: 40, opacity: 0.8 }} />
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
                    {unreadCount}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Unread Messages
                  </Typography>
                </Box>
                <Message sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {messages.filter(msg => msg.type === 'sent').length}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Sent Messages
                  </Typography>
                </Box>
                <Send sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Messages List */}
      <Grid container spacing={3}>
        {messages.map((message) => (
          <Grid item xs={12} key={message.id}>
            <Card sx={{ 
              border: !message.read && message.type === 'received' ? '2px solid' : '1px solid',
              borderColor: !message.read && message.type === 'received' ? 'primary.main' : 'divider'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar sx={{ 
                    mr: 2, 
                    bgcolor: message.type === 'sent' ? 'success.main' : 'primary.main' 
                  }}>
                    {message.type === 'sent' ? <Person /> : <School />}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {message.subject}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {message.type === 'sent' ? `To: ${message.from}` : `From: ${message.from}`}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        {message.priority !== 'normal' && (
                          <Chip 
                            label={message.priority.toUpperCase()} 
                            size="small" 
                            color={getPriorityColor(message.priority)}
                          />
                        )}
                        {!message.read && message.type === 'received' && (
                          <Chip label="NEW" size="small" color="error" />
                        )}
                        <Chip 
                          label={message.type === 'sent' ? 'SENT' : 'RECEIVED'} 
                          size="small" 
                          variant="outlined"
                          color={message.type === 'sent' ? 'success' : 'primary'}
                        />
                      </Box>
                    </Box>
                    
                    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                      {message.content}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary">
                      {new Date(message.date).toLocaleDateString()} at {new Date(message.date).toLocaleTimeString()}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* New Message Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Compose New Message</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="To"
            value={newMessage.to}
            onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })}
            sx={{ mb: 2, mt: 1 }}
            SelectProps={{ native: true }}
          >
            <option value="">Select Recipient</option>
            {teachers.map((teacher) => (
              <option key={teacher} value={teacher}>
                {teacher}
              </option>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Subject"
            value={newMessage.subject}
            onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Message"
            multiline
            rows={6}
            value={newMessage.content}
            onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
            placeholder="Type your message here..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSendMessage} 
            variant="contained"
            startIcon={<Send />}
            disabled={!newMessage.to || !newMessage.subject || !newMessage.content}
          >
            Send Message
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ParentMessages;