import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

export const MarkerModal = ({
  show,
  handleClose,
  obraSeleccionada,
  setObras,
  setObraSeleccionada,
}) => {
  const [disableActualizarBtn, setDisableActualizarBtn] = useState(true);

  const [form, setForm] = useState({
    estado: obraSeleccionada.estado,
  });

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const selectRef = useRef();

  useEffect(() => {
    setForm({
      estado: obraSeleccionada.estado,
    });
  }, [obraSeleccionada]);

  const handleChange = (e) => {
    setDisableActualizarBtn(false);

    setForm({
      estado: e.target.value,
    });
  };

  const handleActualizarEstatus = async () => {
    setDisableActualizarBtn(true);

    let data = await fetch(
      `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/maps/${obraSeleccionada.id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authtoken}`,
        },
        body: JSON.stringify(form),
      }
    );

    let json = await data.json();

    if (json.expired) {
      dispatch(setCurrentUser({ token: json.token }));

      data = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/maps/${obraSeleccionada.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${json.token}`,
          },
          body: JSON.stringify(form),
        }
      );

      json = await data.json();
    }
    if (data.status === 200) {
      setObras((prevState) => {
        const arr = [...prevState];

        const filteredArr = arr.filter((obra) => obra.id !== json.id);

        filteredArr.push(json);

        return filteredArr;
      });

      alert("Se ha actualizado correctamente el estatus de la obra.");
    } else {
      alert("Algo ha fallado, por favor comunique sobre este error");
      setDisableActualizarBtn(false);
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Modal
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => {
          setDisableActualizarBtn(true);
          handleClose();
          setObraSeleccionada({});
        }}
        className="text-dark"
      >
        <Modal.Header closeButton>
          <h5>Información de la obra</h5>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <strong>Asesor: </strong>
              {obraSeleccionada.nombre_asesor}
            </div>
            <div>
              <strong>Nombre de la obra: </strong>
              {obraSeleccionada.nombre}
            </div>
            <div>
              <strong>Descripción: </strong>
              {obraSeleccionada.descripcion}
            </div>
            <div>
              <strong>M3: </strong>
              {obraSeleccionada.m3}
            </div>
            <div>
              <strong>Nombre del cliente: </strong>
              {obraSeleccionada.nombre_cliente}
            </div>
            <div>
              <strong>Contacto: </strong>
              {obraSeleccionada.persona_contacto}
            </div>
            <div>
              <strong>Teléfono: </strong>
              {obraSeleccionada.telefono}
            </div>
            <div className="d-flex">
              <div className="me-2 d-flex align-items-center">
                <strong>Estatus: </strong>
              </div>
              <div>
                <select
                  className="form-select"
                  onChange={handleChange}
                  ref={selectRef}
                  name="estado"
                  value={form.estado}
                >
                  <option value="Activa">Activa</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Ganada">Ganada</option>
                  <option value="Perdida">Perdida</option>
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            disabled={disableActualizarBtn}
            onClick={handleActualizarEstatus}
          >
            Actualizar Estatus
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => {
              setDisableActualizarBtn(true);
              handleClose();
              setObraSeleccionada({});
            }}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
