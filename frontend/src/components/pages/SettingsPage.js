import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Paper, TextField, Button } from '@mui/material';
import { getUserInfo, updateUserInfo } from '../../controllers/usersController';
import { UserContext } from '../../contexts/UserContext';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  // State to hold user information
  const [updatedUser, setUpdatedUser] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    officeLocation: '',
  });

  // Fetch user info on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo(); // Adjust the endpoint as needed
        setUpdatedUser({
          firstName: response.firstName,
          lastName: response.lastName,
          phoneNumber: response.phoneNumber,
          officeLocation: response.officeLocation,
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  // Update state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle save button click to update user info
  const handleSave = async () => {
    try {
      await updateUserInfo(
        updatedUser.firstName,
        updatedUser.lastName,
        updatedUser.phoneNumber,
        updatedUser.officeLocation,
        ''
      );

      // Update the user context with the new user information
      setUser({
        ...user,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phoneNumber: updatedUser.phoneNumber,
        officeLocation: updatedUser.officeLocation,
      });

      alert('User information updated successfully');
      navigate(-1); // Go back to the previous page
    } catch (error) {
      console.error('Error updating user info:', error);
      alert('Failed to update user information');
    }
  };

  // Handle close button to navigate back
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
              name="firstName"
              margin="normal"
              variant="outlined"
              value={updatedUser.firstName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              margin="normal"
              variant="outlined"
              value={updatedUser.lastName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              margin="normal"
              variant="outlined"
              value={updatedUser.phoneNumber}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Office Location"
              name="officeLocation"
              margin="normal"
              variant="outlined"
              value={updatedUser.officeLocation}
              onChange={handleChange}
            />
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" color="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  };

  export default SettingsPage;