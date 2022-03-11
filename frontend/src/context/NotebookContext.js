import React, { useContext, useState } from "react";

export const NotebookContext = React.createContext();

export const useNotebookContext = () => useContext(NotebookContext);

export function NotebookProvider({ children }) {
  const [selectedNotebook, setSelectedNotebook] = useState("");
  const [notebookTitle, setNotebookTitle] = useState("");
  const [notebookList, setNotebookList] = useState([]);
  return (
    <NotebookContext.Provider
      value={{
        selectedNotebook,
        setSelectedNotebook,
        notebookTitle,
        setNotebookTitle,
        notebookList,
        setNotebookList,
      }}
    >
      {children}
    </NotebookContext.Provider>
  );
}
