import React, { createContext, useState } from 'react';

export const ClientDataContext = createContext();

export const ClientDataProvider = ({ children }) => {
  const [clientData, setClientData] = useState(null);
  
  return (
    <ClientDataContext.Provider value={{ clientData, setClientData }}>
      {children}
    </ClientDataContext.Provider>
  );
};
