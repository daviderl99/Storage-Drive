import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "./DropdownMenu";
import "../../styles/main.scss";

function isImage(file) {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
  const fileExtension = file.name.split(".").pop().toLowerCase();
  return imageExtensions.includes(fileExtension);
}

export default function File({ file }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const image = isImage(file);

  function handleClick(e) {
    if (!image) return;
    e.preventDefault();
    // Ignore clicks from the menu or from modals portaled out of this card
    if (!e.currentTarget.contains(e.target) || e.target.closest(".dropdown")) {
      return;
    }
    setPreviewOpen(true);
  }

  return (
    <>
      <a
        href={file.url}
        target="_blank"
        rel="noreferrer"
        className="file-card"
        onClick={handleClick}
      >
        <div className="file-preview">
          {image ? (
            <img src={file.url} alt={file.name} />
          ) : (
            <FontAwesomeIcon icon={faFile} />
          )}
        </div>
        <div className="file-meta">
          <span className="file-name" title={file.name}>{file.name}</span>
          <DropdownMenu file={file} />
        </div>
      </a>
      {image && (
        <Modal
          show={previewOpen}
          onHide={() => setPreviewOpen(false)}
          size="xl"
          centered
          className="image-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>{file.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={file.url} alt={file.name} className="image-modal-img" />
          </Modal.Body>
          <Modal.Footer>
            <a
              href={file.url}
              target="_blank"
              rel="noreferrer"
              className="btn-drive"
            >
              Open original
            </a>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
