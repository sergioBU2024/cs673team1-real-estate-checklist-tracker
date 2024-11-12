import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import { Box, Typography, Container, Paper, TextField, Button } from '@mui/material';

const AddApplicationPage = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/dashboard');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Header />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Add New Application
          </Typography>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Phone"
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
            label="Apartment Address"
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            label="Move In Date"
            margin="normal"
            variant="outlined"
            type="date"
          />

          <TextField
            fullWidth
            label="Monthly Rent Price"
            margin="normal"
            variant="outlined"
            type="number"
          />
          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary">
              Save Application
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddApplicationPage;
