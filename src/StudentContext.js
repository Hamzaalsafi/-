import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const StudentContext = createContext();

// Create the provider component
export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(() => {
    return localStorage.getItem("student") || "none"; 
  });


  useEffect(() => {
    localStorage.setItem("student", student);
  }, [student]);

  return (
    <StudentContext.Provider value={{ student, setStudent }}>
      {children}
    </StudentContext.Provider>
  );
};

// Custom hook to access the context
export const useStudent = () => {
  return useContext(StudentContext);
};
