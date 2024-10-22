import React, { createContext, useState } from 'react';

// Create TenantContext
export const TenantContext = createContext();

// Export TenantProvider component
export const TenantProvider = ({ children }) => {
  const [tenants, setTenants] = useState([]);

  return (
    <TenantContext.Provider value={{ tenants, setTenants }}>
      {children}
    </TenantContext.Provider>
  );
};
