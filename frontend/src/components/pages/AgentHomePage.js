import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { ApplicationsContext } from '../../contexts/ApplicationsContext';
import { getApplicationsAgent, deleteApplication } from '../../controllers/leaseApplicationsController'; // Updated controller
import { getApplicationTasks } from '../../controllers/tasksController'; // Import getApplicationTasks
import Header from '../Header';
import { 
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Container,
  Alert,
  Skeleton,
  IconButton,
  Paper,
  Button,
  TextField
} from '@mui/material';
import {
  LocationOn,
  Person,
  CalendarToday,
  ChevronRight,
  Search
} from '@mui/icons-material';

const ApplicationCard = ({ application, onClick, progress }) => {

  const navigate = useNavigate();


  const daysSinceCreation = Math.floor(
    (new Date() - new Date(application.createdAt)) / (1000 * 60 * 60 * 24)
  );

  const getTimeText = () => {
    if (daysSinceCreation === 0) return 'Today';
    if (daysSinceCreation === 1) return 'Yesterday';
    return `${daysSinceCreation} days ago`;
  };

  const handleDelete = async (applicationId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this application?");
    if (confirmDelete) {
      try {
        await deleteApplication(applicationId); // Replace with your API call
        window.location.reload()// Refresh the application list
      } catch (error) {
        console.error("Error deleting application:", error);
      }
    }
  };

  return (
    <Card 
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
        }
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              {application.location}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              <CalendarToday sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="body2">
                {getTimeText()}
              </Typography>
            </Box>
          </Box>
          <IconButton size="small">
            <ChevronRight />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn sx={{ fontSize: 20, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Location ID: {application.location}
            </Typography>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Person sx={{ fontSize: 20, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Agent: {application.agent.firstName} {application.agent.lastName}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Application Progress
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`${progress}%`}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
           sx={{
           height: 8,
           borderRadius: 1,
           backgroundColor: '#e0e0e0', // Adjust the track (background) color
           '& .MuiLinearProgress-bar': {
            backgroundColor: '#758783', // Set the progress bar color
            },
           }}
         />
        </Box>
        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
          {/* <Button variant="outlined" color="secondary" onClick={onArchive}>
            Archive
          </Button> */}
         <Button
  variant="outlined"
  color="error" // Retaining error for logic but overriding the colors
  onClick={(event) => {
    event.stopPropagation(); // Prevent the card's onClick from triggering
    handleDelete(application._id);
  }}
  sx={{
    borderColor: 'gray', // Change outline color to gray
    color: 'gray', // Change text color to gray
    '&:hover': {
      borderColor: '#555', // Darker gray on hover
      color: '#555', // Darker gray text on hover
      backgroundColor: 'transparent', // No background on hover
    },
  }}
>
  Delete
</Button>


        </Box>
      </CardContent>
    </Card>
  );
};

const LoadingSkeleton = () => (
  <Box sx={{ mb: 2 }}>
    {[1, 2].map((i) => (
      <Card key={i} sx={{ mb: 2 }}>
        <CardContent>
          <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="30%" height={24} sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="80%" height={24} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="80%" height={24} />
            </Box>
          </Box>
          <Skeleton variant="rectangular" width="100%" height={8} />
        </CardContent>
      </Card>
    ))}
  </Box>
);

const AgentHomePage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { applications, loading, error, fetchApplications } = useContext(ApplicationsContext);
  const [progressData, setProgressData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredApplications, setFilteredApplications] = useState([]);

  useEffect(() => {
    // Fetch applications only once on component mount
    fetchApplications(getApplicationsAgent);
  }, [fetchApplications]);

  const calculateProgress = (applicationId) => {
    // Fetch all tasks for this application
    getApplicationTasks(applicationId).then((tasks) => {
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(task => task.status === 'completed').length;
      const progress = (completedTasks / totalTasks) * 100;
      setProgressData((prev) => ({
        ...prev,
        [applicationId]: progress,
      }));
    });
  };

  useEffect(() => {
    applications.forEach((app) => calculateProgress(app._id));
  }, [applications]);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    setFilteredApplications(
      applications.filter((app) => {
        const clientName = app.clientName?.toLowerCase() || ''; // Safely access clientName
        const location = app.location?.toLowerCase() || ''; // Safely access location
        const id = app._id?.toLowerCase() || ''; // Safely access ID

        // Check if any user's first or last name matches the query
      const userMatch = app.users?.some((user) => {
        const firstName = user.firstName?.toLowerCase() || '';
        const lastName = user.lastName?.toLowerCase() || '';
        return `${firstName} ${lastName}`.includes(query); // Combine and check
      });

  
        return (
          clientName.includes(query) ||
          location.includes(query) ||
          id.includes(query) ||
          userMatch
        );
      })
    );
  }, [applications, searchQuery]);
  
  


  const handleApplicationClick = (applicationId) => {
    navigate(`/applications/${applicationId}`);
  };

  const handleAddClick = () => {
    navigate('/add-application');
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  // const handleArchive = async (applicationId) => {
  //   const confirmArchive = window.confirm("Are you sure you want to archive this application?");
    // if (confirmArchive) {
    //   try {
    //     await archiveApplication(applicationId); // Replace with your API call
    //     fetchApplications(getApplicationsAgent); // Refresh the application list
    //   } catch (error) {
    //     console.error("Error archiving application:", error);
    //   }
    // }
  // };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Header username={`${user.firstName} ${user.lastName}`} />
      
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Your Applications
          </Typography>
          <Button
            variant="contained"
            onClick={handleAddClick}
           sx={{
            backgroundColor: '#758783', // Button background color
            textTransform: 'none', // Prevents uppercase text
            '&:hover': {
             backgroundColor: '#5c6b68', // Slightly darker color on hover
             },
           }}
           >
             Add
           </Button>
        </Box>

        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search applications by client name, address, or ID"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1 }} />,
          }}
          sx={{ mb: 3 }}
        />

        <Paper sx={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto', p: 2, bgcolor: 'transparent', boxShadow: 'none' }}>
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          ) : filteredApplications.length > 0 ? (
            filteredApplications.map((app) => (
              <ApplicationCard
                key={app._id}
                application={app}
                onClick={() => handleApplicationClick(app._id)}
                // onArchive={() => handleArchive(app._id)}
                progress={progressData[app._id] || 0} // Display progress dynamically
              />
            ))
          ) : (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="text.secondary">
                  No applications found.
                </Typography>
              </CardContent>
            </Card>
          )
          }
        </Paper>
      </Container>
    </Box>
  );
};

export default AgentHomePage;