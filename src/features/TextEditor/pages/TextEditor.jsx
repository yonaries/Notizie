import React, { useState, useEffect } from "react";
import {
  doc,
  query as fbQuery,
  where,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import "./styles/text-editor.css";
import { QuillEditor } from "./Quill";
import { useQuery } from "../../../hooks/useQuery";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { database } from "../../../config/firebaseConfig";
import { useAuth } from "../../../context/AuthContext";
import updateNote from "../../Notes/functions/update-note";
import deleteNote from "../../Notes/functions/delete-note";

function TextEditor() {
  const query = useQuery();
  const { currentUser } = useAuth();

  const [noteId, setNoteId] = useState(query.get("n"));
  const noteRef = noteId && doc(database, "notes", query.get("n"));
  const [values, loading, error] = useDocumentData(noteRef);
  const [title, setTitle] = useState("");
  const [data, setData] = React.useState({ value: null });

  useEffect(() => {
    const id = query.get("n");
    setNoteId(id);
    if (values && !loading) {
      setTitle(values.name);
      setData(values.data);
    }
  }, [values]);

  async function updateNoteHandler() {
    const note = {
      uid: currentUser.uid,
      folderId: query.get("f"),
      name: title,
      desc: "",
      lastSeen: serverTimestamp(),
      data: data,
    };
    try {
      await updateNote(noteId, note);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteHandler() {
    try {
      const response = window.confirm(
        "Are you sure you want to delete this folder?"
      );
      if (response) await deleteNote(query.get("n"));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="text-editor">
      <div>
        <div className="text-note-title" style={{ display: "flex" }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Note Title"
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={updateNoteHandler}
              style={{
                border: "none",
                borderRadius: "5px",
                backgroundColor: "black",
                color: "white",
                padding: "10px",
                margin: "0 10px",
                fontWeight: "600",
                fontSize: "13px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Update
            </button>
            <button
              onClick={deleteHandler}
              style={{
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#FF0032",
                color: "white",
                padding: "10px",
                margin: "0 10px",
                fontWeight: "600",
                fontSize: "13px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Delete
            </button>
          </div>
        </div>
        <QuillEditor data={data} setData={setData} />
      </div>
    </div>
  );
}

export default TextEditor;
