import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NewNote from "./NewNote";
import "./NoteForm.css";

function NoteForm() {
  const location = useLocation();
  const pathName = location.pathName;
  const [newForm, setNewForm] = useState(true);
  const [editForm, setEditForm] = useState(false);

  return <>{newForm && <NewNote />}</>;
}

export default NoteForm;
