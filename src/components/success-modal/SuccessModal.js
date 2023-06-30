import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const SuccessModal = ({ show, handleClose, title, text }) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Modal show={show} onHide={handleClose} keyboard={false} centered>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        {text && (
          <Modal.Body>
            <Modal.Body>
              <p>{text}</p>
            </Modal.Body>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
