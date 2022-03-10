import React from "react";

function NewNote() {
  return (
    <form>
      <label>Choose Notebook</label>
      <select>
        <option>--Notebook--</option>
      </select>

      <label>Title</label>
      <input />

      <label>Contents</label>
      <textarea></textarea>
      <div className="form_btn_container">
        <button>Submit</button>
        <button className="btn_alert">Discard</button>
      </div>
    </form>
  );
}

export default NewNote;
