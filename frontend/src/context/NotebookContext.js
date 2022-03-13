import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";

export const NotebookContext = React.createContext();

export const useNotebookContext = () => useContext(NotebookContext);

export function NotebookProvider({ children }) {
  const notebooks = useSelector(state => state.notebook);
  const [selectedNotebook, setSelectedNotebook] = useState("");
  const [notebookTitle, setNotebookTitle] = useState("");
  const [notebookList, setNotebookList] = useState([notebooks]);

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
