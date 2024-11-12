import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, TextField, Button } from '@mui/material';
import { getUserInfo, updateUserInfo } from '../../controllers/usersController';
import { UserContext } from '../../contexts/UserContext';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [updatedUser, setUpdatedUser] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    officeLocation: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateUserInfo(
        updatedUser.firstName,
        updatedUser.lastName,
        updatedUser.phoneNumber,
        updatedUser.officeLocation,
        ''
      );

      setUser({
        ...user,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phoneNumber: updatedUser.phoneNumber,
        officeLocation: updatedUser.officeLocation,
      });

      alert('User information updated successfully');
      navigate(-1);
    } catch (error) {
      console.error('Error updating user info:', error);
      alert('Failed to update user information');
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'grey.50',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '500px', // Increase width for better readability
          padding: '40px', // Increase padding for a more spacious layout
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', // Adjust shadow for a softer look
          textAlign: 'center',
          backgroundColor: '#ffffff',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#333333' }}>
          Edit User
        </Typography>

        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          margin="normal"
          variant="standard"
          value={updatedUser.firstName}
          onChange={handleChange}
          InputProps={{
            disableUnderline: true,
            sx: {
              backgroundColor: '#eaeaea',
              borderRadius: '8px',
              padding: '10px 16px', // Increase padding for more spacious fields
              width: '100%', // Ensures full width
            },
          }}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          margin="normal"
          variant="standard"
          value={updatedUser.lastName}
          onChange={handleChange}
          InputProps={{
            disableUnderline: true,
            sx: {
              backgroundColor: '#eaeaea',
              borderRadius: '8px',
              padding: '10px 16px',
              width: '100%',
            },
          }}
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          margin="normal"
          variant="standard"
          value={updatedUser.phoneNumber}
          onChange={handleChange}
          InputProps={{
            disableUnderline: true,
            sx: {
              backgroundColor: '#eaeaea',
              borderRadius: '8px',
              padding: '10px 16px',
              width: '100%',
            },
          }}
        />
        <TextField
          fullWidth
          label="Office Location"
          name="officeLocation"
          margin="normal"
          variant="standard"
          value={updatedUser.officeLocation}
          onChange={handleChange}
          InputProps={{
            disableUnderline: true,
            sx: {
              backgroundColor: '#eaeaea',
              borderRadius: '8px',
              padding: '10px 16px',
              width: '100%',
            },
          }}
        />

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              backgroundColor: '#cccccc',
              color: '#333333',
              '&:hover': { backgroundColor: '#b3b3b3' },
            }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: '#5a5a5a',
              color: '#ffffff',
              '&:hover': { backgroundColor: '#4d4d4d' },
            }}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SettingsPage;