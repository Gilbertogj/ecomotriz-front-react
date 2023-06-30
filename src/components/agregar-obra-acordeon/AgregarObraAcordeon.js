import React, { useState } from "react";
import { useAccordionButton } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { FormAgregarObraMapa } from "../form-agregar-obra-mapa/FormAgregarObraMapa";

const AgregarObraBtn = ({
  children,
  eventKey,
  agregarObra,
  setAddObraBtnClicked,
}) => {
  const decoratedOnClick = useAccordionButton(eventKey, () => {
    setAddObraBtnClicked(true);
    agregarObra();
  });

  return (
    <button
      type="button"
      className="btn btn-primary btn-sm"
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
};

const ElminarObraBtn = ({
  children,
  eventKey,
  eliminarObra,
  setAddObraBtnClicked,
}) => {
  const decoratedOnClick = useAccordionButton(eventKey, () => {
    setAddObraBtnClicked(false);
    /* setNuevaObraPosicion({ latitud: "", longitud: "" }); */
    eliminarObra();
  });

  return (
    <button
      type="button"
      className="btn btn-danger btn-sm"
      onClick={decoratedOnClick}
      id="cerrarAcordeonBtn"
    >
      {children}
    </button>
  );
};

export const AgregarObraAcordeon = ({
  agregarObra,
  eliminarObra,
  nuevaObraPosicion,
  setNuevaObraPosicion,
  setObras,
}) => {
  const [addObraBtnClicked, setAddObraBtnClicked] = useState(false);

  return (
    <Accordion>
      <Card>
        <Card.Header>
          {!addObraBtnClicked ? (
            <AgregarObraBtn
              eventKey="0"
              agregarObra={agregarObra}
              setAddObraBtnClicked={setAddObraBtnClicked}
            >
              Agregar Obra
            </AgregarObraBtn>
          ) : (
            <ElminarObraBtn
              eventKey="0"
              eliminarObra={eliminarObra}
              setAddObraBtnClicked={setAddObraBtnClicked}
              setNuevaObraPosicion={setNuevaObraPosicion}
            >
              Cancelar
            </ElminarObraBtn>
          )}
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <FormAgregarObraMapa
            nuevaObraPosicion={nuevaObraPosicion}
            eliminarObra={eliminarObra}
            setAddObraBtnClicked={setAddObraBtnClicked}
            setNuevaObraPosicion={setNuevaObraPosicion}
            setObras={setObras}
          />
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};
