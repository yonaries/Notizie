import React, { useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

export function QuillEditor({ data, setData }) {
  const handleChange = (value) => {
    setData({ value });
  };

  return (
    <div>
      <EditorToolbar />
      <ReactQuill
        id="editor"
        theme="snow"
        value={data.value}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}
