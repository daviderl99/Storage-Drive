import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import "../../styles/File.scss";

function isImage(file) {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
  const fileExtension = file.name.split(".").pop().toLowerCase();
  return imageExtensions.includes(fileExtension);
}

export default function File({ file }) {
  return (
    <a
      href={file.url}
      target="_blank"
      rel="noreferrer"
      className="file-link btn btn-outline-secondary p-0 w-100"
    >
      <div className="file-info">
        <p className="file-title mt-2" title={file.name}>{file.name}</p>
        {isImage(file) ? (
          <img src={file.url} alt={file.name} className="file-image" />
        ) : (
          <FontAwesomeIcon icon={faFile} className="file-image w-50" />
        )}
      </div>
    </a>
  );
}
