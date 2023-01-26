import React, { useEffect, useState } from "react";
import globIcon from "../../../../assets/icons/Global.svg";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../../hooks/useQuery";

const colors = ["#FFEA20", "#D9ACF5", "#8EA7E9", "#FD8A8A", "#ADA2FF"];
function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function NoteTile({ docId, data }) {
  const query = useQuery();
  const navigate = useNavigate();
  function selectNote() {
    navigate(`/?f=${query.get("f")}&n=${docId}`);
  }

  return (
    <div
      onClick={selectNote}
      className="note-tile"
      style={{ backgroundColor: getRandomColor() }}
    >
      <div className="language-image">
        <img src={globIcon} />
      </div>
      <div className="doc-title-desc">
        <div className="title">
          <p>{data.name}</p>
        </div>
        <div className="description">
          <p>{data.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteTile;
