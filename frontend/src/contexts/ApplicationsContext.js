
import React, { createContext, useState, useCallback } from 'react';

// Create the context
export const ApplicationsContext = createContext();

export const ApplicationsProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Memoize fetchApplications to ensure stable reference
  const fetchApplications = useCallback(async (sourceFunction) => {
    if (applications.length === 0) {
      try {
        setLoading(true);
        const data = await sourceFunction();
        setApplications(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }, [applications.length]); // Only recreate if applications length changes

  // Update an individual application
  const updateApplication = (id, updatedApplication) => {
    setApplications((prevApps) =>
      prevApps.map((app) => (app._id === id ? updatedApplication : app))
    );
  };

  // Clear all applications
  const clearApplications = () => {
    setApplications([]);
  };

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        loading,
        error,
        fetchApplications,
        updateApplication,
        clearApplications,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};