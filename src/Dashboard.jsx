import React from "react";
import SideBar from "./features/Sidebar/pages/sidebar";
import Notes from "./features/Notes/pages/Notes";
import TextEditor from "./features/TextEditor/pages/TextEditor";
import "./App.css";

export default () => {
  return (
    <div className="App">
      <SideBar />
      <Notes />
      <TextEditor />
    </div>
  );
};
