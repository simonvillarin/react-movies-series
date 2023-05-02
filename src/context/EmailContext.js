import React, { createContext, useState } from "react";

export const EmailContext = createContext();

export const EmailContextProvider = ({ children }) => {
  const [emailContext, setEmailContext] = useState("");

  return (
    <EmailContext.Provider value={{ emailContext, setEmailContext }}>
      {children}
    </EmailContext.Provider>
  );
};
