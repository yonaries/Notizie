import React, { useEffect, useState } from "react";
import {
  collection,
  query as fbQuery,
  where,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { database } from "../../../config/firebaseConfig";
import { useAuth } from "../../../context/AuthContext";
import { useQuery } from "../../../hooks/useQuery";
import NoteTile from "./components/NoteTile";
import createNote from "../functions/create-note";
import "./styles/notes.css";

function Notes() {
  const query = useQuery();
  const [folderId, setFolderId] = useState(query.get("f"));

  useEffect(() => {
    const id = query.get("f");
    setFolderId(id);
  }, [query]);

  const foldersRef = collection(database, "notes");
  const { currentUser } = useAuth();

  const foldersQuery = fbQuery(
    foldersRef,
    where("folderId", "==", query.get("f"))
  );
  const [values, loading, error, snapshot] = useCollection(foldersQuery);

  async function newNote() {
    const note = {
      uid: currentUser.uid,
      folderId: folderId,
      name: "untitled",
      desc: "",
      lastSeen: serverTimestamp(),
      data: "",
    };
    try {
      await createNote(note);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="notes">
      <div className="bar-button">
        <button
          onClick={newNote}
          style={{
            border: "none",
            backgroundColor: "black",
            color: "white",
            padding: "10px",
            fontWeight: "600",
            fontSize: "15px",
            margin: "10px",
            borderRadius: "5px",
            width: "95%",
            cursor: "pointer",
          }}
        >
          New note
        </button>
      </div>
      <div className="notes-list">
        {loading ? (
          <div>
            <p>Loading</p>
          </div>
        ) : values ? (
          values.docs.map((doc) => (
            <NoteTile docId={doc.id} data={doc.data()} key={doc.id} />
          ))
        ) : (
          <div>No data</div>
        )}
      </div>
    </div>
  );
}

export default Notes;
