import React, { createContext, useState, useEffect } from 'react';
import { getTasksClient, assignTask, getTaskDetails, uploadTaskFile } from '../controllers/tasksController';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks for a user and application
  const fetchTasks = async (userId, applicationId) => {
    setLoading(true);
    try {
      const userTasks = await getTasksClient(userId, applicationId);
      setTasks(userTasks);
    } catch (err) {
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  // Assign a new task
  const addTask = async (newTask, userId, applicationId) => {
    try {
      const assignedTask = await assignTask(
        newTask.title,
        newTask.description,
        newTask.type,
        userId,
        applicationId
      );
      setTasks((prev) => [...prev, assignedTask.task]);
    } catch (err) {
      setError("Failed to add task.");
    }
  };

  // Fetch task details
  const fetchTaskDetails = async (taskId) => {
    try {
      return await getTaskDetails(taskId);
    } catch (err) {
      setError("Failed to load task details.");
      throw err;
    }
  };

  // Upload a file for a task
  const uploadFile = async (taskId, file) => {
    try {
      await uploadTaskFile(taskId, file);
    } catch (err) {
      setError("Failed to upload file.");
      throw err;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        addTask,
        fetchTaskDetails,
        uploadFile,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
