import React, { useState } from "react";
import { Alert, Dropdown, Form, Modal } from "react-bootstrap";
import { doc, getDocs, query, where, writeBatch } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/DropdownMenu.scss";

const BATCH_SIZE = 500;

async function deleteStoredFile(url) {
  try {
    await deleteObject(ref(storage, url));
  } catch (error) {
    if (error.code !== "storage/object-not-found") throw error;
    console.warn(
      "A storage object was already missing during folder deletion.",
    );
  }
}

export default function FolderMenu({ folder }) {
  const [modal, setModal] = useState(null);
  const [newName, setNewName] = useState(folder.name);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  function openModal(type) {
    setError("");
    if (type === "rename") setNewName(folder.name);
    setModal(type);
  }

  function closeModal() {
    if (busy) return;
    setModal(null);
    setError("");
  }

  async function renameFolder(event) {
    event.preventDefault();
    const name = newName.trim();
    if (!name || name === folder.name) {
      closeModal();
      return;
    }

    setBusy(true);
    setError("");
    try {
      const snapshot = await getDocs(
        query(db.folders, where("userId", "==", currentUser.uid)),
      );
      const updates = [{ ref: doc(db.folders, folder.id), data: { name } }];

      snapshot.docs.forEach((folderDoc) => {
        const data = db.formatDoc(folderDoc);
        const path = data.path || [];
        if (path.some((ancestor) => ancestor.id === folder.id)) {
          updates.push({
            ref: folderDoc.ref,
            data: {
              path: path.map((ancestor) =>
                ancestor.id === folder.id ? { ...ancestor, name } : ancestor,
              ),
            },
          });
        }
      });

      for (let index = 0; index < updates.length; index += BATCH_SIZE) {
        const batch = writeBatch(db.folders.firestore);
        updates.slice(index, index + BATCH_SIZE).forEach((update) => {
          batch.update(update.ref, update.data);
        });
        await batch.commit();
      }
      setModal(null);
    } catch (renameError) {
      console.error("Error renaming folder:", renameError);
      setError("The folder could not be renamed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function deleteFolder() {
    setBusy(true);
    setError("");
    try {
      const folders = [doc(db.folders, folder.id)];
      const files = [];
      const visited = new Set([folder.id]);
      const pendingFolderIds = [folder.id];

      while (pendingFolderIds.length > 0) {
        const parentId = pendingFolderIds.pop();
        const [childFolders, childFiles] = await Promise.all([
          getDocs(
            query(
              db.folders,
              where("parentId", "==", parentId),
              where("userId", "==", currentUser.uid),
            ),
          ),
          getDocs(
            query(
              db.files,
              where("folderId", "==", parentId),
              where("userId", "==", currentUser.uid),
            ),
          ),
        ]);

        childFolders.docs.forEach((folderDoc) => {
          if (visited.has(folderDoc.id)) return;
          visited.add(folderDoc.id);
          folders.push(folderDoc.ref);
          pendingFolderIds.push(folderDoc.id);
        });
        files.push(...childFiles.docs);
      }

      await Promise.all(
        files.map((fileDoc) => deleteStoredFile(fileDoc.data().url)),
      );

      const documentRefs = [...folders, ...files.map((fileDoc) => fileDoc.ref)];
      for (let index = 0; index < documentRefs.length; index += BATCH_SIZE) {
        const batch = writeBatch(db.folders.firestore);
        documentRefs.slice(index, index + BATCH_SIZE).forEach((documentRef) => {
          batch.delete(documentRef);
        });
        await batch.commit();
      }
      setModal(null);
    } catch (deleteError) {
      console.error("Error deleting folder:", deleteError);
      setError(
        "The folder could not be completely deleted. Please try again; some files may already have been removed.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Dropdown
        className="folder-menu"
        onClick={(event) => event.stopPropagation()}
      >
        <Dropdown.Toggle
          as={MenuToggle}
          aria-label={`Actions for ${folder.name}`}
        />
        <Dropdown.Menu align="end">
          <Dropdown.Item
            as="button"
            type="button"
            onClick={() => openModal("rename")}
          >
            Rename
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            type="button"
            onClick={() => openModal("delete")}
          >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal show={modal === "rename"} onHide={closeModal}>
        <Form onSubmit={renameFolder}>
          <Modal.Header closeButton={!busy}>
            <Modal.Title>Rename folder</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group>
              <Form.Label>Folder name</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                required
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                disabled={busy}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn-drive"
              onClick={closeModal}
              disabled={busy}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-drive btn-drive-primary"
              disabled={busy || !newName.trim()}
            >
              {busy ? "Saving..." : "Rename"}
            </button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={modal === "delete"} onHide={closeModal}>
        <Modal.Header closeButton={!busy}>
          <Modal.Title>Delete folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <p>
            Delete <strong>{folder.name}</strong> and all of its files and
            subfolders? This cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn-drive"
            onClick={closeModal}
            disabled={busy}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-drive btn-drive-danger"
            onClick={deleteFolder}
            disabled={busy}
          >
            {busy ? "Deleting..." : "Delete folder"}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const MenuToggle = React.forwardRef(({ onClick, ...props }, ref) => (
  <button
    {...props}
    ref={ref}
    type="button"
    className="three-dots-toggle folder-menu-toggle"
    onClick={(event) => {
      event.preventDefault();
      event.stopPropagation();
      onClick(event);
    }}
  >
    <span aria-hidden="true">&#8942;</span>
  </button>
));
