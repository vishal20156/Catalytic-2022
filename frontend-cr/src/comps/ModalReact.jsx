import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { compose } from 'redux';

function ModalReact({ product }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const productImage = product+'cmp';
  
  const pd = `/Images/Compare/${productImage}.png`
  console.log(pd);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Compare nutrition
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Compare Nutrition</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    
                 <img src={pd}  className="img-fluid"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalReact