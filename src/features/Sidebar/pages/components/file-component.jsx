import React from "react";
import "../styles/file-component.css";
import editIcon from "../../../../assets/icons/Edit_fill_black.svg";
import removeIcon from "../../../../assets/icons/Remove_fill_black.svg";
import deleteFolder from "../../functions/delete-folder";
import renameFolder from "../../functions/update.-folder";
import { useAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function FileTile({ data, docRef }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  function selectFolder(e) {
    e.preventDefault();
    navigate(`/?f=${docRef}&n=''`);
  }

  async function deleteHandler() {
    try {
      const response = window.confirm(
        "Are you sure you want to delete this folder?"
      );
      if (response) await deleteFolder(docRef);
    } catch (error) {
      console.log(error);
    }
  }
  async function updateHandler() {
    try {
      const response = window.prompt("New folder name");
      if (response) await renameFolder(docRef, response, currentUser.uid);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="collection" onClick={selectFolder}>
      <p>{data.name}</p>
      <div className="action-buttons">
        <img src={editIcon} onClick={updateHandler} />
        <img src={removeIcon} onClick={deleteHandler} />
      </div>
    </div>
  );
}

export default FileTile;
