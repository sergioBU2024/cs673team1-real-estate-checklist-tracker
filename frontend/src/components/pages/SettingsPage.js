import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Paper, TextField, Button } from '@mui/material';

const SettingsPage = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Edit User
          </Typography>
          <TextField
            fullWidth
            label="First Name"
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Last Name"
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Phone Number"
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Office Location"
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Reset Password"
            margin="normal"
            type="password"
            variant="outlined"
          />
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SettingsPage;
