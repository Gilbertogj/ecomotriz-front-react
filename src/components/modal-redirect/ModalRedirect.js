import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useHistory } from "react-router-dom";

export const ModalRedirect = ({ showConfirmModal, text, link }) => {
  const history = useHistory();

  const redirect = () => {
    history.push(link);
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Modal
        show={showConfirmModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Operación exitosa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Body>
            <p>{text}</p>
          </Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={redirect}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
