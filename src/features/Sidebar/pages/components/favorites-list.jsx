import React from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import FileTile from "./file-component";
import { useAuth } from "../../../../context/AuthContext";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { database } from "../../../../config/firebaseConfig";
import "../styles/file-list.css";

export const FavoritesList = () => {
  const foldersRef = collection(database, "favorites");
  const { currentUser } = useAuth();

  const foldersQuery = query(foldersRef, where("uid", "==", currentUser.uid));
  const [values, loading, error, snapshot] = useCollectionData(foldersQuery);
  return (
    <div>
      {loading ? (
        <div className="no-file">
          <p>Loading</p>
        </div>
      ) : values.length > 0 ? (
        values.map((note, index) => <FileTile title={note.name} key={index} />)
      ) : (
        <div className="no-file">
          <p>Empty Favorite</p>
        </div>
      )}
    </div>
  );
};
