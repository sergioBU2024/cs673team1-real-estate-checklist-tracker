import React, { useEffect, useState, useContext } from 'react';
import Header from '../Header'; // Adjust the import path as necessary
import ProgressBar from '../ProgressBar';
import { getApplications } from '../../controllers/leaseApplicationsController';
import { UserContext } from '../../contexts/UserContext';

const ClientHomePage = () => {

    
    const { user, setUser } = useContext(UserContext);

    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const data = await getApplications();
                setApplications(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchApplications();
    }, []);

    return (
        <div>
            <Header username={user.firstName + " " +user.lastName} />  {/* Include the Header component here */}
            <div className="content">
                <h1>Your Applications</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {applications.length > 0 ? (
                    applications.map((app, index) => (
                        <div key={app._id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '8px' }}>
                            <h2>Application {index + 1}</h2>
                            <p><strong>Location:</strong> {app.location}</p>
                            <p><strong>Agent ID:</strong> {app.agent}</p>
                            <p><strong>Created At:</strong> {new Date(app.createdAt).toLocaleString()}</p>
                            <ProgressBar progress={50} /> {/* Placeholder progress */}
                        </div>
                    ))
                ) : (
                    <p>No applications found.</p>
                )}
            </div>
        </div>
    );
};

export default ClientHomePage;
