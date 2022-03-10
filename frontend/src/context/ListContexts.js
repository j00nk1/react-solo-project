import React, { useContext, useState } from "react";

export const ListContext = React.createContext();

export const useListContext = () => useContext(ListContext);

export function ListProvider({ children }) {
  const [showNote, setShowNote] = useState(false);
  const [showNotebook, setShowNotebook] = useState(false);
  const [notes, setNotes] = useState([]);
  const [renderNote, setRenderNote] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <ListContext.Provider
      value={{
        showNote,
        setShowNote,
        showNotebook,
        setShowNotebook,
        notes,
        setNotes,
        renderNote,
        setRenderNote,
        title,
        setTitle,
        content,
        setContent,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}
