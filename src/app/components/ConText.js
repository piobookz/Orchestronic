"use client";
import { createContext, useContext, useState } from "react";

const Context = createContext();

export const Provider = ({ children }) => {
  const [projectData, setProjectData] = useState(null);

  return (
    <Context.Provider value={{ projectData, setProjectData }}>
      {children}
    </Context.Provider>
  );
};

export const useProvider = () => useContext(Context);
