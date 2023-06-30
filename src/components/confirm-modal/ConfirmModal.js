import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const ConfirmModal = ({ text, show, onHide, functionRef }) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h5>{text}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              functionRef();
            }}
          >
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
