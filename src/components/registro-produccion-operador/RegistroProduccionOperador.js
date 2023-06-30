import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import { fetchData } from "../../utils/fetchData";
import { SuccessModal } from "../success-modal/SuccessModal";

const formInitialState = {
  operador: "",
};

export const RegistroProduccionOperador = ({ reporteOperador }) => {
  const [form, setForm] = useState(formInitialState);
  const [operadores, setOperadores] = useState([]);
  const [selectAlreadyFocused, setSelectAlreadyFocused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [operadorAssigned, setOperadorAssigned] = useState(false);
  const [newOperador, setNewOperador] = useState(null);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const selectOperadorInputRef = useRef();

  const { id } = useParams();

  useEffect(() => {
    if (reporteOperador.id) {
      setOperadorAssigned(true);
    }
  }, []);

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formulario = {
        ...form,
        pedido: id,
      };

      let data = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_produccion/reporte_operador/create/`,
        {
          method: reporteOperador.id ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authtoken}`,
          },
          body: JSON.stringify(formulario),
        }
      );

      let json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_produccion/reporte_operador/create/`,
          {
            method: reporteOperador.id ? "PATCH" : "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${json.token}`,
            },
            body: JSON.stringify(formulario),
          }
        );

        json = await data.json();
      }

      if (data.status === 201) {
        setShowModal(true);
        setNewOperador(json.nombre_operador);
        setOperadorAssigned(true);
      }
    } catch (error) {
      alert(error);
    }
  };

  const fetchOperadores = async () => {
    try {
      if (selectAlreadyFocused) {
        return;
      }

      const fetchedData = await fetchData(


        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/users/?tipo_usuario=Operador`,

        authtoken,
        dispatch,
        setCurrentUser
      );

      setOperadores(fetchedData);
      setSelectAlreadyFocused(true);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <SuccessModal
        show={showModal}
        handleClose={handleClose}
        title="Operador asignado."
      />
      {operadorAssigned ? (
        <div className="text-center">
          <strong>Operador asignado: </strong>
          {newOperador || reporteOperador.nombre_operador}
        </div>
      ) : (
        <div className="mt-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="form-label" htmlFor="operador">
                Selecciona Operador
              </label>
              <select
                className="form-select"
                id="operador"
                name="operador"
                onFocus={fetchOperadores}
                onChange={handleChange}
                value={form.operador}
                required
                ref={selectOperadorInputRef}
              >
                <option></option>
                {operadores.map((operador) => (
                  <option key={operador.id} value={operador.id}>
                    {operador.name} {operador.last_name}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="submit"
              value="Asignar operador"
              className="btn btn-success"
            />
          </form>
        </div>
      )}
    </>
  );
};
