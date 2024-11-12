import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import { Box, Typography, Container, Paper, TextField, Button, MenuItem, Grid } from '@mui/material';

const AddApplicationPage = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: ''
  });
  const [numApplicants, setNumApplicants] = useState(1);
  const [applicants, setApplicants] = useState([{ firstName: '', lastName: '', email: '' }]);

  const handleAddressChange = (field, value) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNumApplicantsChange = (e) => {
    const number = parseInt(e.target.value);
    setNumApplicants(number);

    // Adjust the applicants array based on the selected number of applicants
    setApplicants(Array.from({ length: number }, () => ({ firstName: '', lastName: '', email: '' })));
  };

  const handleApplicantChange = (index, field, value) => {
    const updatedApplicants = [...applicants];
    updatedApplicants[index][field] = value;
    setApplicants(updatedApplicants);
  };

  const handleSaveApplication = () => {
    const applicationData = {
      address,
      applicants,
    };
    console.log('Application Saved:', applicationData);
    // Add the logic to save the application, e.g., send to an API
  };

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

          {/* Address Fields */}
          <Typography variant="h6" gutterBottom>Address</Typography>
          <TextField
            fullWidth
            label="Street Address"
            margin="normal"
            variant="outlined"
            value={address.street}
            onChange={(e) => handleAddressChange('street', e.target.value)}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="City"
                margin="normal"
                variant="outlined"
                value={address.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="State"
                margin="normal"
                variant="outlined"
                value={address.state}
                onChange={(e) => handleAddressChange('state', e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="ZIP Code"
                margin="normal"
                variant="outlined"
                value={address.zip}
                onChange={(e) => handleAddressChange('zip', e.target.value)}
              />
            </Grid>
          </Grid>

          {/* Number of Applicants Dropdown */}
          <TextField
            fullWidth
            label="Number of Applicants"
            margin="normal"
            variant="outlined"
            select
            value={numApplicants}
            onChange={handleNumApplicantsChange}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </TextField>

          {/* Dynamic Applicant Fields */}
          {applicants.map((applicant, index) => (
            <Grid container spacing={2} key={index} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Typography variant="h6">Applicant {index + 1}</Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  value={applicant.firstName}
                  onChange={(e) => handleApplicantChange(index, 'firstName', e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  value={applicant.lastName}
                  onChange={(e) => handleApplicantChange(index, 'lastName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={applicant.email}
                  onChange={(e) => handleApplicantChange(index, 'email', e.target.value)}
                />
              </Grid>
            </Grid>
          ))}

          {/* Save and Cancel Buttons */}
          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSaveApplication}>
              Add & Invite Applicants
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