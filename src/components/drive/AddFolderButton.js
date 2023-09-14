import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function AddFolderButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    setName('');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // try {
    //   const collectionRef = collection(db, 'folders');
    //   await setDoc(doc(collectionRef), { name });

    //   setName('');
    //   closeModal();
    // } catch (error) {
    //   console.error("Error adding folder: ", error);
    // }

    setName('');
    closeModal();
  }

  return (
    <>
      <Button
        onClick={openModal}
        variant='outline-success'
        size='sm'
        className='p-2'
      >
        <FontAwesomeIcon icon={faFolderPlus} size='xl' />
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
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>Close</Button>
            <Button variant="success" type="submit">Create Folder</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
