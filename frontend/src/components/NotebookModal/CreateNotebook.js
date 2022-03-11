import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { useNotebookContext } from "../../context/NotebookContext";
import { NotebookListMaker } from "../UserHome/NotebookListMaker";
import * as notebookActions from "../../store/notebook";

function CreateNotebook() {
  const { notebookTitle, setNotebookTitle, notebookList, setNotebookList } =
    useNotebookContext();

  return <div></div>;
}

export default CreateNotebook;
