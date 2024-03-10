// OffcanvasContext.js
"use client";
import React, { createContext, useContext, useState } from "react";

const OffcanvasContext = createContext();

export const useOffcanvas = () => useContext(OffcanvasContext);

export const OffcanvasProvider = ({ children }) => {
  const [isOffcanvasVisible, setIsOffcanvasVisible] = useState(false);

  const toggleOffcanvas = () => {
    setIsOffcanvasVisible(!isOffcanvasVisible);
    console.log("in the toggle function", isOffcanvasVisible);
  };

  return (
    <OffcanvasContext.Provider value={{ isOffcanvasVisible, toggleOffcanvas }}>
      {children}
    </OffcanvasContext.Provider>
  );
};
