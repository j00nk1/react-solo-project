import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { useListContext } from "../../context/ListContexts";
import NotebookChildren from "./NotebookChildren";
import * as noteActions from "../../store/note";
import * as notebookActions from "../../store/notebook";
import { useNotebookContext } from "../../context/NotebookContext";
import "./NotebookListMaker.css";

export const NotebookListMaker = fetchedNotebooks => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const history = useHistory();
  const { setNotebookList } = useNotebookContext();

  const trash = async e => {
    // delete notebook and associated notes
    const notebookId = e.target.id;
    if (
      window.confirm(
        "Are you sure you want to DELETE the notebook? (All the notes in this notebook will be deleted too)"
      )
    ) {
      await dispatch(notebookActions.deleteNotebook({ userId, notebookId }));
      const nbList = await dispatch(notebookActions.fetchNotebooks({ userId }));
      setNotebookList(nbList);
      await history.push(`users/${userId}/notebooks`);
    }
  };

  return (
    <>
      {fetchedNotebooks.map((nb, idx) => (
        <ul key={`nb_${nb.id}`} className="side_list nb_box">
          <label htmlFor={`nb_${nb.id}`}>
            {nb.title}{" "}
            {idx > 0 && (
              <i
                className="fa-solid fa-trash-can"
                id={nb.id}
                onClick={trash}
              ></i>
            )}
          </label>
          <input type="checkbox" id={`nb_${nb.id}`} className="nb_input" />
          {/* <ul className="noteShow" style={{ flexDirection: "column" }}>
            <li>test</li>
            <li>test2</li>
          </ul> */}
          <ul className="noteShow" style={{ flexDirection: "column" }}>
            <NotebookChildren
              props={{ userId, notebookId: nb.id }}
            ></NotebookChildren>
          </ul>
        </ul>
      ))}
    </>
  );
};
