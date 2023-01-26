import React from "react";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { database } from "../../../../config/firebaseConfig";
import { useAuth } from "../../../../context/AuthContext";
import "../styles/file-list.css";
import FileTile from "./file-component";

export const CollectionsList = () => {
  const foldersRef = collection(database, "folders");
  const { currentUser } = useAuth();

  const foldersQuery = query(foldersRef, where("uid", "==", currentUser.uid));
  const [values, loading, error, snapshot] = useCollection(foldersQuery);
  return (
    <div>
      {loading ? (
        <div className="no-file">
          <p>Loading</p>
        </div>
      ) : values ? (
        values.docs.map((doc, index) => (
          <FileTile data={doc.data()} docRef={doc.id} key={doc.id} />
        ))
      ) : (
        <div className="no-file">
          <p>No Collections</p>
        </div>
      )}
    </div>
  );
};
