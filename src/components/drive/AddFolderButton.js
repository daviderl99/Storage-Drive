import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";

export default function AddFolderButton({ currentFolder }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { currentUser } = useAuth();

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    setName("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (currentFolder === null) return;

    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }

    addDoc(db.folders, {
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
      createdAt: db.currentTimestamp,
    })
      .then(() => {
        console.log(`Created ${name}`);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });

    setName("");
    closeModal();
  }

  return (
    <>
      <Button
        onClick={openModal}
        variant="outline-success"
        size="sm"
        className="p-2 mt-3"
      >
        <FontAwesomeIcon icon={faFolderPlus} size="xl" />
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                type="text"
                requried
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Create Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
