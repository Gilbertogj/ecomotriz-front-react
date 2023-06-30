import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export const CotizacionModal = ({ show, handleClose, modalSelectRef }) => {
  return (
    <Modal show={show} backdrop="static" keyboard={false} centered>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Seleccione una ciudad</Form.Label>
            <Form.Select
              aria-label="Default select example"
              id="ciudad"
              ref={modalSelectRef}
            >
              <option value="León">León</option>
              <option value="SMA">SMA</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
