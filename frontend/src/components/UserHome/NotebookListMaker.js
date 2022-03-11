import "./NotebookListMaker.css";

export const NotebookListMaker = (fetchedNotebooks, fetchedNotes) => {
  const onclick = e => {
    // things to do when clicked on the li
  };

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
              <i className="fa-solid fa-trash-can" onclick={trash}></i>
            )}
          </label>
          <input type="checkbox" id={`nb_${nb.id}`} className="nb_input" />
          <ul className="noteShow" style={{ flexDirection: "column" }}>
            <li>test</li>
            <li>test2</li>
          </ul>
          {fetchedNotes > 0 &&
            fetchedNotes.map(note => (
              <ul className="noteShow">
                <li onclick={onclick}>{note.title}</li>
              </ul>
            ))}
        </ul>
      ))}
    </>
  );
};
