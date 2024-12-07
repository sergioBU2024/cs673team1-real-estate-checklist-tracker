import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  Stack,
} from "@mui/material";
import {
  getTaskDetails,
  uploadTaskFile,
  getFile,
  submitTask,
  approveTask,
  sendBackTask,
} from "../../controllers/tasksController";
import { UserContext } from "../../contexts/UserContext";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [comments, setComments] = useState("");

  const { user } = useContext(UserContext);

  const statusColors = {
    pending: "orange",
    submitted: "blue",
    completed: "green",
  };

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const taskDetails = await getTaskDetails(taskId);
        setTask(taskDetails);

        if (taskDetails.fileUrl) {
          const fileRes = await getFile(
            taskDetails.fileUrl,
            taskDetails.fileType
          );
          const blob = await fileRes.blob();
          const objectUrl = URL.createObjectURL(blob);
          setDownloadUrl(objectUrl);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  const handleFileUpload = async () => {
    if (!file) return;
    try {
      await uploadTaskFile(taskId, file);
      alert("File uploaded successfully!");
      window.location.reload();
    } catch (err) {
      setError("Failed to upload file.");
    }
  };

  const handleSubmitTask = async () => {
    try {
      await submitTask(taskId);
      alert("Task submitted successfully!");
      window.location.reload();
    } catch (err) {
      setError("Failed to submit task.");
    }
  };

  const handleApproveTask = async () => {
    try {
      await approveTask(taskId);
      alert("Task approved successfully!");
      window.location.reload();
    } catch (err) {
      setError("Failed to approve task.");
    }
  };

  const handleSendBackTask = async () => {
    try {
      if (!comments) {
        alert("Please add comments before sending the task back.");
        return;
      }
      await sendBackTask(taskId, comments);
      alert("Task sent back to client successfully!");
      window.location.reload();
    } catch (err) {
      setError("Failed to send task back.");
    }
  };

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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "grey.100",
        p: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          boxShadow: 3,
          borderRadius: 2,
          borderLeft: `10px solid ${statusColors[task.status]}`,
          bgcolor: `${statusColors[task.status]}10`,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 2,
              textAlign: "center",
              color: statusColors[task.status],
            }}
          >
            {task.title}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" sx={{ mb: 2, color: "grey.700" }}>
            {task.description}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              color: statusColors[task.status],
              fontWeight: "bold",
            }}
          >
            <strong>Status:</strong> {task.status}
          </Typography>
          {task.comments && (
            <Box sx={{ my: 2, p: 2, borderRadius: 2, bgcolor: "grey.200" }}>
              <Typography variant="h6" sx={{ mb: 1, color: "grey.800" }}>
                Comments from Agent:
              </Typography>
              <Typography variant="body1" sx={{ color: "grey.700" }}>
                {task.comments}
              </Typography>
            </Box>
          )}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            File Upload
          </Typography>

          {downloadUrl ? (
            <Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ color: "green" }}>
                A file has already been uploaded.
              </Typography>
              <a
                href={downloadUrl}
                download={`task-${taskId}-file`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                 variant="contained"
                 sx={{
                   backgroundColor: '#758783',
                   color: 'white',
                    '&:hover': {
                     backgroundColor: '#5c6b68',
                     },
                    }}
                 >
                  View/Download File
                </Button>

              </a>
            </Stack>
          ) : (
            <Typography variant="body2" sx={{ mt: 1, color: "red" }}>
              No file uploaded yet.
            </Typography>
          )}
        </CardContent>

        <CardActions
          sx={{
            justifyContent: "center",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
        >
          {user.role === "Client" ? (
            <>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "5px",
                  width: "90%",
                  textAlign: "center",
                  display: "block",
                }}
                disabled={task.status !== "pending"}
              />
              <Button
                variant="contained"
                onClick={handleFileUpload}
                sx={{
                  bgcolor: "primary.main",
                  ":hover": { bgcolor: "primary.dark" },
                  px: 4,
                }}
                disabled={!file || task.status !== "pending"}
              >
                Upload
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmitTask}
                sx={{
                  bgcolor: "secondary.main",
                  ":hover": { bgcolor: "secondary.dark" },
                  px: 4,
                  mt: 2,
                }}
                disabled={!task.fileUrl || task.status === "submitted"}
              >
                Submit Task
              </Button>
            </>
          ) : task.status === "submitted" ? (
            <>
              <Button
                variant="contained"
                onClick={handleApproveTask}
                sx={{
                  bgcolor: "success.main",
                  ":hover": { bgcolor: "success.dark" },
                  px: 4,
                }}
              >
                Approve Task
              </Button>
              <textarea
                placeholder="Add comments (optional)..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                style={{
                  width: "90%",
                  height: "80px",
                  marginTop: "10px",
                  borderRadius: "5px",
                  padding: "10px",
                  border: "1px solid #ddd",
                }}
              />
              <Button
                variant="outlined"
                onClick={handleSendBackTask}
                sx={{
                  color: "error.main",
                  borderColor: "error.main",
                  ":hover": { bgcolor: "error.light" },
                  px: 4,
                  mt: 2,
                }}
              >
                Send Back Task
              </Button>
            </>
          ) : (
            <Typography variant="body2" sx={{ color: "grey" }}>
              Only clients can upload files in the pending phase. Agents can
              approve or return submitted tasks.
            </Typography>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

export default TaskDetailsPage;
