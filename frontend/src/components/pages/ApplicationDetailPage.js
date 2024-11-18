import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  LinearProgress,
  Card,
  CardContent,
  Container,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { ChevronRight, LocationOn, Person } from "@mui/icons-material";
import Header from "../Header";
import { getApplicationDetails } from "../../controllers/leaseApplicationsController";
import { UserContext } from "../../contexts/UserContext"; // Import UserContext

const ApplicationDetailPage = () => {
  const { applicationId } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Get the current user from context

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        const details = await getApplicationDetails(applicationId);
        console.log(details);
        setApplication(details);
      } catch (err) {
        setError("Failed to load application details.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationDetails();
  }, [applicationId]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  console.log(user);
  const isAgent = user.role === "Agent"; // Check if the user is an agent

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      <Header />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Application Details
        </Typography>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <LocationOn color="action" />
              <Typography variant="body1">
                <strong>Location:</strong> {application.location}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Person color="action" />
              <Typography variant="body1">
                <strong>Agent:</strong> {application.agent.firstName}{" "}
                {application.agent.lastName}
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Typography variant="h5" gutterBottom>
          Users
        </Typography>
        <List>
          {application.users.map((appUser) => (
            <ListItem key={appUser.id} disableGutters>
              <ListItemText
                primary={appUser.firstName + " " + appUser.lastName}
                secondary={`${appUser.progress}% Completed`}
                sx={{ cursor: isAgent || user.id === appUser.id ? "pointer" : "default" }}
                onClick={() =>
                  isAgent || user.id === appUser.id
                    ? navigate(`/applications/${applicationId}/users/${appUser.id}`)
                    : null
                } // Only allow clicking for the current user if not an agent
              />
              <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={appUser.progress}
                  sx={{ height: 8, borderRadius: 1, width: "100%" }}
                />
              </Box>
              <IconButton
                onClick={() =>
                  isAgent || user.id === appUser.id
                    ? navigate(`/applications/${applicationId}/users/${appUser.id}`)
                    : null
                }
                disabled={!isAgent && user.id !== appUser.id} // Disable the icon button if not an agent
              >
                <ChevronRight />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default ApplicationDetailPage;
