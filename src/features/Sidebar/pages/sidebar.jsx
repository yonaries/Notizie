import React from "react";
import favIcon from "../../../assets/icons/Bookmark.svg";
import arrowIcon from "../../../assets/icons/Caret down.svg";
import folderAddIcon from "../../../assets/icons/Folder-plus.svg";
import folderIcon from "../../../assets/icons/Folder-user.svg";
import devAvatar from "../../../assets/icons/person.png";
import { CollectionsList } from "./components/collections-list";
import { FavoritesList } from "./components/favorites-list";
import { useAuth } from "../../../context/AuthContext";
import logOut from "../../Auth/functions/sign-out";
import createFolder from "../functions/create-folder";
import "./styles/sidebar.css";

const SideBar = () => {
  const { currentUser } = useAuth();

  async function newFolder() {
    try {
      const name = window.prompt("Folder name");
      await createFolder(currentUser.uid, name);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="side-bar">
      <div className="profile-bar">
        <div className="avatar">
          <img src={devAvatar} alt="User Image" />
        </div>
        <div>
          <p className="email">{currentUser.displayName}</p>
          <p className="email">{currentUser.email}</p>
        </div>
      </div>
      <div className="collection-container">
        <div className="title">
          <div className="title-icon">
            <img src={folderIcon} />
            Collections
          </div>
          <img
            src={folderAddIcon}
            style={{ cursor: "pointer" }}
            onClick={newFolder}
          />
        </div>
        <CollectionsList />
      </div>
      <div className="collection-container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "fixed",
            width: "17%",
            bottom: "1rem",
          }}
        >
          <button
            onClick={logOut}
            style={{
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#FF0032",
              color: "white",
              padding: "10px",
              fontWeight: "600",
              fontSize: "13px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
