import React, { useEffect, useState, useContext } from 'react';
import './UserDetailPage.css';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  List,
  ListItem,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
} from '@mui/material';
import Header from '../Header';
import { getTasksClient, assignTask } from '../../controllers/tasksController'; // Assuming the controller functions are correct
import { getNewUserInfo } from '../../controllers/usersController'; // Assuming this function fetches user details
import { UserContext } from '../../contexts/UserContext'; // Assuming you have a context for user info
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

// Default tasks for selection in the "Assign New Task" module
const defaultTasks = [
  { title: 'Upload ID', description: 'Please upload a copy of your passport or state ID.', type: 'File' },
  { title: 'Upload F1-VISA', description: 'For international students: please upload a copy of your valid F1 VISA.', type: 'File' },
  { title: 'Upload I-20', description: 'Upload your currently valid I-20 document.', type: 'File' },
  { title: 'Upload Proof of Income', description: 'Please upload recent pay stubs or employment verification letter.', type: 'File' },
  { title: 'Upload Credit Report', description: 'Please upload a recent credit report.', type: 'File' },
  { title: 'Upload Reference Letters', description: 'Provide reference letters from previous landlords or employers.', type: 'File' },
  { title: 'Upload Bank Statements', description: 'Upload the last two months of bank statements.', type: 'File' },
  { title: 'Upload Guarantor Form', description: 'Upload the completed guarantor form signed by your guarantor.', type: 'Form' },
  { title: 'Upload Pet Information', description: 'Upload vaccination records and pet information (if applicable).', type: 'File' },
  { title: 'Upload Vehicle Information', description: 'Provide details via the vehicle information form.', type: 'Form' },
  { title: 'Upload Utility Transfer', description: 'Upload confirmation of utility account setup or transfer.', type: 'File' },
];

const UserDetailPage = () => {
  const { applicationId, userId } = useParams(); // Get application and user IDs from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [tasks, setTasks] = useState([]); // State to store tasks for the user
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const [error, setError] = useState(null); // Error state for API calls
  const [userName, setUserName] = useState(''); // State to store user's full name
  const [userEmail, setUserEmail] = useState(''); // State to store user's email
  const [userPhone, setUserPhone] = useState(''); // State to store user's phone number
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    type: '',
  }); // State for creating a new task
  const [selectedTask, setSelectedTask] = useState(''); // State to track selected task from dropdown

  const { user } = useContext(UserContext); // Get the user's role from context

  useEffect(() => {
    // Fetch user details
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getNewUserInfo(userId); // Fetch user details
        setUserName(userDetails.firstName + ' ' + userDetails.lastName); // Set the user's full name
        setUserEmail(userDetails.email);
        setUserPhone(userDetails.phoneNumber)
      } catch (err) {
        setError('Failed to load user details.');
      }
    };

    // Fetch tasks for the user
    const fetchTasks = async () => {
      try {
        const userTasks = await getTasksClient(userId, applicationId);
        setTasks(userTasks); // Set the user's tasks
      } catch (err) {
        setError('Failed to load tasks.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserDetails(); // Fetch user details when the component mounts
    fetchTasks(); // Fetch tasks for the user
  }, [applicationId, userId]);

  // Handle input changes for new task creation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value })); // Update the new task state
  };

  // Handle selection of default tasks
  const handleSelectTask = (e) => {
    const selected = defaultTasks.find((task) => task.title === e.target.value); // Find the selected task
    if (selected) {
      setNewTask({
        ...selected,
        type: selected.type.toLowerCase(), // Ensure backend compatibility
      });
    } else {
      setNewTask({ title: '', description: '', type: '' }); // Clear fields for a new task
    }
    setSelectedTask(e.target.value);
  };

  // Handle task creation and assignment
  const handleAddTask = async () => {
    try {
      console.log('New Task Data:', newTask); // Debugging log for new task data
      const assignedTask = await assignTask(
        newTask.title,
        newTask.description,
        newTask.type.toLowerCase(), // Ensure backend compatibility
        userId,
        applicationId
      );
      console.log('API Response:', assignedTask); // Debugging log for API response
      setTasks((prev) => [...prev, assignedTask.task]); // Add the new task to the task list
      setNewTask({ title: '', description: '', type: '' }); // Clear the new task form
      setSelectedTask('');
    } catch (err) {
      setError('Failed to add task.'); // Handle errors during task assignment
    }
  };

  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="error-container">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box className="user-detail-page">
      <Header />
      <Box className="content-container">
        {/* Client Details */}
        <Grid container spacing={4}>
          {user.role !== 'Client' && (
            <Grid item xs={12}>
              <Box className="module-container">
                <Typography className="module-heading">Client Details</Typography>
                <Box className="client-details">
                  <Typography className="client-name">{userName}</Typography>
                  <Box className="client-info">
                    <EmailIcon /> {userEmail}
                  </Box>
                  <Box className="client-info">
                    <PhoneIcon /> {userPhone}
                  </Box>
                </Box>
              </Box>
            </Grid>
          )}

          {/* User's Tasks */}
          <Grid item xs={user.role === 'Client' ? 12 : 8}>
            <Box className="module-container">
              <Typography className="module-heading">{`${userName}'s Tasks`}</Typography>
              <List>
                {tasks.map((task) => (
                  <ListItem
                    key={task._id}
                    button
                    onClick={() =>
                      navigate(
                        `/applications/${applicationId}/users/${userId}/task/${task._id}`
                      )
                    }
                    className="task-item"
                  >
                    <Typography className="task-title">{task.title}</Typography>
                    <Typography
                      className={`task-status ${
                        task.status === 'completed'
                          ? 'status-completed'
                          : task.status === 'submitted'
                          ? 'status-submitted'
                          : 'status-pending'
                      }`}
                    >
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>

          {/* Assign New Task */}
          {user.role !== 'Client' && (
            <Grid item xs={4}>
              <Box className="module-container">
                <Typography className="module-heading">Assign New Task</Typography>

                {/* Dropdown to select default tasks */}
                <FormControl fullWidth margin="normal" className="form-field">
                  <InputLabel>Select Task</InputLabel>
                  <Select value={selectedTask} onChange={handleSelectTask}>
                    <MenuItem value="">New Task</MenuItem>
                    {defaultTasks.map((task) => (
                      <MenuItem key={task.title} value={task.title}>
                        {task.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Task Title */}
                <TextField
                  label="Task Title"
                  fullWidth
                  margin="normal"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange} // Editable even for default tasks
                />

                {/* Task Description */}
                <TextField
                  label="Task Description"
                  fullWidth
                  margin="normal"
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange} // Editable even for default tasks
                />

                {/* Dropdown for Task Type */}
                <FormControl fullWidth margin="normal" className="form-field">
                  <InputLabel>Task Type</InputLabel>
                  <Select
                    value={newTask.type}
                    name="type"
                    onChange={(e) =>
                      setNewTask((prev) => ({ ...prev, type: e.target.value }))
                    }
                  >
                    <MenuItem value="file">File Upload</MenuItem>
                    <MenuItem value="form">Form Submission</MenuItem>
                  </Select>
                </FormControl>

                {/* Add Task Button */}
                <Button
                  variant="contained"
                  className="add-task-button"
                  onClick={handleAddTask}
                >
                  Add Task
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default UserDetailPage;