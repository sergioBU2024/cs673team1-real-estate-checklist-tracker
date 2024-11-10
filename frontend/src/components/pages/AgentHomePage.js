import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { getApplicationsAgent } from '../../controllers/leaseApplicationsController';
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
} from '@mui/material';
import {
  LocationOn,
  Person,
  CalendarToday,
  ChevronRight,
} from '@mui/icons-material';

const ApplicationCard = ({ application, onClick }) => {
  const daysSinceCreation = Math.floor(
    (new Date() - new Date(application.createdAt)) / (1000 * 60 * 60 * 24)
  );

  const getTimeText = () => {
    if (daysSinceCreation === 0) return 'Today';
    if (daysSinceCreation === 1) return 'Yesterday';
    return `${daysSinceCreation} days ago`;
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
              50%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={50} 
            sx={{ height: 8, borderRadius: 1 }}
          />
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
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplicationsAgent();
        setApplications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleApplicationClick = (applicationId) => {
    navigate(`/applications/${applicationId}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Header username={`${user.firstName} ${user.lastName}`} />
      
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
          Your Applications
        </Typography>
        
        <Paper 
          sx={{ 
            maxHeight: 'calc(100vh - 200px)', 
            overflow: 'auto',
            p: 2,
            bgcolor: 'transparent',
            boxShadow: 'none'
          }}
        >
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          ) : applications.length > 0 ? (
            applications.map((app) => (
              <ApplicationCard
                key={app._id}
                application={app}
                onClick={() => handleApplicationClick(app._id)}
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
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default AgentHomePage;