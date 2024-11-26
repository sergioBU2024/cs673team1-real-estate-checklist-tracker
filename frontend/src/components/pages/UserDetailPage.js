import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Alert, List, ListItem, ListItemText, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Header from '../Header';
import { getTasksClient, assignTask } from '../../controllers/tasksController'; // Assuming the controller functions are correct
import { getNewUserInfo } from '../../controllers/usersController'; // Assuming this function fetches user details
import { UserContext } from '../../contexts/UserContext';  // Assuming you have a context for user info

const UserDetailPage = () => {
  const { applicationId, userId } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');

  // For creating new tasks
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    type: '',
  });

  const { user } = useContext(UserContext); // Get the user's role from context (assuming this is available)

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getNewUserInfo(userId); // Fetch user details
        setUserName(userDetails.firstName + " " + userDetails.lastName); // Set the user's full name
      } catch (err) {
        setError('Failed to load user details.');
      }
    };

    const fetchTasks = async () => {
      try {
        const userTasks = await getTasksClient(userId, applicationId);
        setTasks(userTasks);
      } catch (err) {
        setError("Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails(); // Fetch user details when the component mounts
    fetchTasks(); // Fetch tasks for the user
  }, [applicationId, userId]);

  // Handle input changes for new task creation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  // Handle task creation and assignment
  const handleAddTask = async () => {
    try {
      const assignedTask = await assignTask(
        newTask.title,
        newTask.description,
        newTask.type,
        userId,
        applicationId
      );
      setTasks((prev) => [...prev, assignedTask.task]);
      setNewTask({ title: '', description: '', type: '' }); // Clear form after submitting
    } catch (err) {
      setError("Failed to add task.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Header />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4">{`${userName}'s tasks`}</Typography> {/* Display user's name here */}
        <List>
          {tasks.map((task) => (
            <ListItem
              key={task._id}
              button
              onClick={() => navigate(`/applications/${applicationId}/users/${userId}/task/${task._id}`)} // Navigate to task details page
            >
              <ListItemText
                primary={task.title}
                secondary={`Status: ${task.status}`}
              />
            </ListItem>
          ))}
        </List>

        {/* Conditionally render the "Add Task" form based on the user's role */}
        {user.role !== 'Client' && ( // If the user is not a client, show the task assignment form
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Assign New Task</Typography>
            <TextField
              label="Task Title"
              fullWidth
              margin="normal"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
            />
            <TextField
              label="Task Description"
              fullWidth
              margin="normal"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
            />

            {/* Task Type dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Task Type</InputLabel>
              <Select
                label="Task Type"
                name="type"
                value={newTask.type}
                onChange={handleInputChange}
              >
                <MenuItem value="file">File</MenuItem>
                <MenuItem value="form">Form</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" onClick={handleAddTask} sx={{ mt: 2 }}>
              Add Task
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UserDetailPage;