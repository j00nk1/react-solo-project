import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { useListContext } from "../../context/ListContexts";
import NotebookChildren from "./NotebookChildren";
import * as noteActions from "../../store/note";
import "./NotebookListMaker.css";

export const NotebookListMaker = fetchedNotebooks => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const trash = e => {
    // delete notebook and associated notes
  };

  return (
    <>
      {fetchedNotebooks.map((nb, idx) => (
        <ul key={`nb_${nb.id}`} className="side_list nb_box">
          <label htmlFor={`nb_${nb.id}`}>
            {nb.title}{" "}
            {idx > 0 && (
              <i className="fa-solid fa-trash-can" onClick={trash}></i>
            )}
          </label>
          <input type="checkbox" id={`nb_${nb.id}`} className="nb_input" />
          <ul className="noteShow" style={{ flexDirection: "column" }}>
            <li>test</li>
            <li>test2</li>
          </ul>
          {/* <NotebookChildren
            props={{ userId, notebookId: nb.id }}
          ></NotebookChildren> */}
        </ul>
      ))}
    </>
  );
};
