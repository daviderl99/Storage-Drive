import React, { useState, useRef, useEffect } from "react";
import { Dropdown, Modal, Form, Button } from "react-bootstrap";
import { db } from "../../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import "../../styles/DropdownMenu.scss";

function DropdownMenu({ file }) {
  const { id: fileId, name: fileName } = file;
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState(fileName);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      const input = inputRef.current;
      if (input) {
        input.focus();
        // Select the text without the extension
        const extensionIndex = fileName.lastIndexOf(".");
        if (extensionIndex > 0) {
          input.setSelectionRange(0, extensionIndex);
        }
      }
    }
  }, [open, fileName]);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const renameFile = async () => {
    try {
      closeModal();
      await updateDoc(doc(db.files, fileId), { name: newName });
    } catch (error) {
      console.error("Error renaming file: ", error);
    }
  };

  const deleteFile = async () => {
    try {
      await deleteDoc(doc(db.files, fileId));
    } catch (error) {
      console.error("Error deleting file: ", error);
    }
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle as={Click} />
        <Dropdown.Menu>
          <Dropdown.Item
            as="div"
            onClick={(e) => {
              e.preventDefault();
              openModal();
            }}
          >
            Rename
          </Dropdown.Item>
          <Dropdown.Item
            as="div"
            onClick={(e) => {
              e.preventDefault();
              deleteFile();
            }}
          >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal show={open} onHide={closeModal}>
        <Modal.Body>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              renameFile();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Rename File</Form.Label>
              <Form.Control
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                ref={inputRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={renameFile}>
            Rename
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const Click = React.forwardRef(({ onClick }, ref) => (
  <span
    className="three-dots-toggle"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    &#8942; {/* Unicode for vertical ellipsis */}
  </span>
));

export default DropdownMenu;
