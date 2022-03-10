import React, { useContext, useState } from "react";

export const NotebookContext = React.createContext();

export const useNotebookContext = () => useContext(NotebookContext);

export function NotebookProvider({ children }) {
  const [selectedNotebook, setSelectedNotebook] = useState(null);
  return (
    <NotebookContext.Provider value={{ selectedNotebook, setSelectedNotebook }}>
      {children}
    </NotebookContext.Provider>
  );
}
