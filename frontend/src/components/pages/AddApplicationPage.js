import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import { Box, Typography, Container, Paper, TextField, Button, MenuItem } from '@mui/material';
import { registerUser, sendInvitationEmail } from '../../controllers/usersController';
import { addApplication } from '../../controllers/leaseApplicationsController';

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
    setApplicants(Array.from({ length: number }, () => ({ firstName: '', lastName: '', email: '' })));
  };

  const handleApplicantChange = (index, field, value) => {
    const updatedApplicants = [...applicants];
    updatedApplicants[index][field] = value;
    setApplicants(updatedApplicants);
  };

  const handleSaveApplication = async () => {
    try {
      const userIds = [];
      console.log('Saving Application:', address, applicants);
      // Register applicants and collect their IDs
      for (const applicant of applicants) {
        console.log('Registering Applicant:', applicant);
        const userResponse = await registerUser(
          applicant.firstName,
          applicant.lastName,
          applicant.email,
          'defaultPassword123',  // Set a default password for new clients
          'Client',               // The role of the user
          '',                     // Optional: Add other details (e.g., phone number, etc.)
          ''
        );
        console.log('Sending Invitation Email:', applicant);
        await sendInvitationEmail(applicant.email, applicant.firstName, userResponse.userId);
        userIds.push(userResponse.userId); // Assuming the response includes the new user's ID
      }

      // Prepare the application data
      const applicationData = {
        location: `${address.street}, ${address.city}, ${address.state} ${address.zip}`,
        userIds,
      };

      // Create the application with the user IDs
      const applicationResponse = await addApplication(applicationData.location, userIds);
      console.log('Application Saved:', applicationResponse.data);
      
      

      // Navigate to the dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving application:', error);
    }
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
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              label="City"
              margin="normal"
              variant="outlined"
              value={address.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
            />
            <TextField
              fullWidth
              label="State"
              margin="normal"
              variant="outlined"
              value={address.state}
              onChange={(e) => handleAddressChange('state', e.target.value)}
            />
            <TextField
              fullWidth
              label="ZIP Code"
              margin="normal"
              variant="outlined"
              value={address.zip}
              onChange={(e) => handleAddressChange('zip', e.target.value)}
            />
          </Box>

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
            <Box key={index} sx={{ mt: 2 }}>
              <Typography variant="h6">Applicant {index + 1}</Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  value={applicant.firstName}
                  onChange={(e) => handleApplicantChange(index, 'firstName', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  value={applicant.lastName}
                  onChange={(e) => handleApplicantChange(index, 'lastName', e.target.value)}
                />
              </Box>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={applicant.email}
                onChange={(e) => handleApplicantChange(index, 'email', e.target.value)}
              />
            </Box>
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
