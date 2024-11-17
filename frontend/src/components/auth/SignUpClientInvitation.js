import React, { useState, useEffect } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import { Box, Typography, Paper, TextField, Button } from '@mui/material';
import { getNewUserInfo, updateUserInfo, loginUser } from '../../controllers/usersController';

const SettingsPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const [updatedUser, setUpdatedUser] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchUserInfoAndLogin = async () => {
      try {
        const response = await getNewUserInfo(userId);
        setEmail(response.email); // Update email state
        setUpdatedUser({
          firstName: response.firstName,
          lastName: response.lastName,
          password: '',
          confirmPassword: ''
        });
  
        // Now call loginUser with the email from response
        const loginData = await loginUser(response.email, 'defaultPassword123');
        console.log('Login Data:', loginData);
        localStorage.setItem('token', loginData.token);
      } catch (error) {
        console.error('Error fetching user info or logging in:', error);
      }
    };
  
    fetchUserInfoAndLogin();
  }, [userId]);
  

  useEffect(() => {
    // Log updatedUser whenever it changes
    console.log('Updated User:', updatedUser);
  }, [updatedUser]);

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
        '',
        '',
        updatedUser.password
      );

      alert('User information updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Error updating user info:', error);
      alert('Failed to update user information');
    }
  };

  const handleClose = () => {
    navigate('/');
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
          width: '500px',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
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
          disabled
          onChange={handleChange}
          value={updatedUser.firstName}
          sx={{
            backgroundColor: '#eaeaea',
            borderRadius: '8px',
            width: '100%'
          }}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          margin="normal"
          variant="standard"
          disabled
          onChange={handleChange}
          value={updatedUser.lastName}
          sx={{
            backgroundColor: '#eaeaea',
            borderRadius: '8px',
            width: '100%',
          }}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          margin="normal"
          variant="standard"
          onChange={handleChange}
          value={updatedUser.password}
          sx={{
            backgroundColor: '#eaeaea',
            borderRadius: '8px',
            width: '100%',
          }}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          margin="normal"
          variant="standard"
          onChange={handleChange}
          value={updatedUser.confirmPassword}
          sx={{
            backgroundColor: '#eaeaea',
            borderRadius: '8px',
            width: '100%',
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
