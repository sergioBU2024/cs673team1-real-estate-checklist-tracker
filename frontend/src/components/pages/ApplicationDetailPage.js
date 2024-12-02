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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  ChevronRight,
  LocationOn,
  Person,
  Delete,
  Send,
} from "@mui/icons-material";
import Header from "../Header";
import { getApplicationDetails } from "../../controllers/leaseApplicationsController";
import {
  registerUser,
  deleteUser,
  sendInvitationEmail,
} from "../../controllers/usersController";
import { addUserToApplication } from "../../controllers/leaseApplicationsController";
import { UserContext } from "../../contexts/UserContext";

const ApplicationDetailPage = () => {
  const { applicationId } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [inviteDetails, setInviteDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [inviteError, setInviteError] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        const details = await getApplicationDetails(applicationId);
        setApplication(details);
      } catch (err) {
        setError("Failed to load application details.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationDetails();
  }, [applicationId]);

  const handleOpenInviteDialog = () => {
    setOpenInviteDialog(true);
  };

  const handleCloseInviteDialog = () => {
    setOpenInviteDialog(false);
    setInviteDetails({ email: "", firstName: "", lastName: "" });
    setInviteError(null);
  };

  const handleSendInvitation = async () => {
    try {
      const { email, firstName, lastName } = inviteDetails;
      console.log("Registering Applicant...", inviteDetails);
      const userResponse = await registerUser(
        firstName,
        lastName,
        email,
        "defaultPassword123", // Set a default password for new clients
        "Client", // The role of the user
        "", // Optional: Add other details (e.g., phone number, etc.)
        ""
      );

      console.log("Adding user to application:");
      console.log(applicationId, userResponse.userId);
      await addUserToApplication(applicationId, userResponse.userId);
      console.log("Sending Invitation Email:", inviteDetails, email);
      await sendInvitationEmail(email, firstName, userResponse.userId);

      // Set default progress and other fields if needed
      userResponse.progress = userResponse.progress || 0;
      userResponse.id = userResponse.userId;

      setApplication((prev) => ({
        ...prev,
        users: [...prev.users, userResponse],
      }));

      setOpenInviteDialog(false);
    } catch (err) {
      setInviteError("Failed to send invitation or add user.");
    }
  };

  const handleOpenDeleteDialog = (userId) => {
    setSelectedUserId(userId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedUserId(null);
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(selectedUserId);
      setApplication((prev) => ({
        ...prev,
        users: prev.users.filter((user) => user.id !== selectedUserId),
      }));
      setOpenDeleteDialog(false);
    } catch {
      setError("Failed to delete user.");
    }
  };

  const handleChangeInviteDetails = (e) => {
    const { name, value } = e.target;
    setInviteDetails((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  const isAgent = user.role === "Agent";

  return (
    <Box sx={{ bgcolor: "grey.50", minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Application Details
        </Typography>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <LocationOn />
              <Typography>
                <strong>Location:</strong> {application.location}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Person />
              <Typography>
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
                primary={`${appUser.firstName} ${appUser.lastName}`}
                secondary={`${appUser.progress}% Completed`}
                sx={{ cursor: isAgent || user.id === appUser.id ? "pointer" : "default" }}
                onClick={() =>
                  isAgent || user.id === appUser.id
                    ? navigate(`/applications/${applicationId}/users/${appUser.id}`)
                    : null
                } // Only allow clicking for the current user if not an agent
              />
              <Box
                sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1 }}
              >
                <LinearProgress
                  variant="determinate"
                  value={appUser.progress}
                  sx={{ height: 8, borderRadius: 1,width: "100%" }}
                />
              </Box>
              {isAgent && (
                <>
                  <Tooltip title="Delete User">
                    <IconButton
                      onClick={() => handleOpenDeleteDialog(appUser.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View User">
                    <IconButton
                      onClick={() =>
                        isAgent || user.id === appUser.id
                          ? navigate(
                              `/applications/${applicationId}/users/${appUser.id}`
                            )
                          : null
                      }
                      disabled={!isAgent && user.id !== appUser.id} // Disable the icon button if not an agent
                    >
                      <ChevronRight />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </ListItem>
          ))}
        </List>
        {isAgent && (
          <Button
            variant="contained"
            onClick={handleOpenInviteDialog}
            startIcon={<Send />}
          >
            Add new User
          </Button>
        )}
      </Container>
      <Dialog open={openInviteDialog} onClose={handleCloseInviteDialog}>
        <DialogTitle>Send Invitation Link</DialogTitle>
        <DialogContent>
          <TextField
            name="firstName"
            label="First Name"
            fullWidth
            margin="dense"
            value={inviteDetails.firstName}
            onChange={handleChangeInviteDetails}
          />
          <TextField
            name="lastName"
            label="Last Name"
            fullWidth
            margin="dense"
            value={inviteDetails.lastName}
            onChange={handleChangeInviteDetails}
          />
          <TextField
            name="email"
            label="Email"
            fullWidth
            margin="dense"
            value={inviteDetails.email}
            onChange={handleChangeInviteDetails}
          />
          {inviteError && <Alert severity="error">{inviteError}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInviteDialog}>Cancel</Button>
          <Button onClick={handleSendInvitation} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteUser} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApplicationDetailPage;
