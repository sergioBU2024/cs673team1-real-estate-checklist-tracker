import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientDataContext } from './ClientDataContext';
import Header from './Header'; // Import the Header component
import './ClientHomePage.css';

function ClientHomePage() {
  const { clientData } = useContext(ClientDataContext);
  const navigate = useNavigate();

  if (!clientData) {
    return <p>No client information available. Please submit your details.</p>;
  }

  const handlePayment = () => {
    alert("Payment process initiated.");
    // Implement payment logic here
  };

  return (
    <div className="client-home-container">
      {/* Header Component */}
      <Header username="Mr. Abraham Lincoln" /> 

      {/* Title */}
      <h2 className="title">Client Information</h2>

      {/* Client, Housing, and Payment Information */}
      <div className="info-section">
        <div className="tenant-info">
          <h3>Tenant Information</h3>
          <p><strong>First Name:</strong> {clientData.firstName}</p>
          <p><strong>Last Name:</strong> {clientData.lastName}</p>
          <p><strong>Email:</strong> {clientData.email}</p>
          <p><strong>Phone:</strong> {clientData.phone}</p>
        </div>

        <div className="housing-info">
          <h3>Housing Information</h3>
          <p><strong>Location:</strong> {clientData.location}</p>
          <p><strong>Move-in Date:</strong> {clientData.moveInDate}</p>
          <p><strong>Move-out Date:</strong> {clientData.moveOutDate}</p>
        </div>

        <div className="payment-info">
          <h3>Payment Information</h3>
          <p><strong>Rent:</strong> {clientData.rent}</p>
          <p><strong>Deposit:</strong> {clientData.deposit}</p>
          <p><strong>Due Date:</strong> {clientData.dueDate}</p>
          <p><strong>Status:</strong> <span className={`status ${clientData.status.toLowerCase()}`}>{clientData.status}</span></p>
          <button className="pay-button" onClick={handlePayment}>Pay Now</button>
        </div>
      </div>
    </div>
  );
}

export default ClientHomePage;
