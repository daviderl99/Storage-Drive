import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import FolderMenu from "./FolderMenu";

export default function Folder({ folder }) {
  return (
    <div className="folder-card-container">
      <Link
        to={`/folder/${folder.id}`}
        state={{ folder: folder }}
        className="folder-card"
      >
        <FontAwesomeIcon icon={faFolder} className="folder-icon" />
        <span className="folder-name" title={folder.name}>
          {folder.name}
        </span>
      </Link>
      <FolderMenu folder={folder} />
    </div>
  );
}
