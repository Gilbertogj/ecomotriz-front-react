import React, { useEffect, useState, useRef, useContext } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { ModalRedirect } from "../modal-redirect/ModalRedirect";

import "./FormAgregarObra.styles.scss";

const initialState = {
  nombre: "",
  residente: "",
  direccion: "",
  telefono: "",
  email: "",
  linkObra: "",
};

export const FormAgregarObra = ({ clienteId, obraData }) => {
  const [form, setForm] = useState(initialState);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const imagenRef = useRef();

  const history = useHistory();
  const { pathname } = useLocation();

  const { obraId } = useParams();

  useEffect(() => {
    if (obraData) {
      setForm({
        nombre: obraData.nombre,
        residente: obraData.residente,
        direccion: obraData.direccion,
        telefono: obraData.telefono,
        email: obraData.email,
        linkObra: obraData.linkObra,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (imagenRef.current.files[0]) {
      formData.append("permiso", imagenRef.current.files[0]);
    }

    formData.append("nombre", form.nombre);
    formData.append("residente", form.residente);
    formData.append("direccion", form.direccion);
    formData.append("telefono", form.telefono);
    formData.append("email", form.email);
    formData.append("cliente", clienteId);
    formData.append("link_obra", form.linkObra);
    

    if (obraData) {
      let data = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/obras/${obraId}/update/`,
        {
          method: "PATCH",
          headers: {
            /* "Content-Type": "application/json", */
            Authorization: `Token ${authtoken}`,
          },
          body: formData,
        }
      );

      let json = await data.json();

      // console.log(json);

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/obras/${obraId}/update/`,
          {
            method: "PATCH",
            headers: {
              /* "Content-Type": "application/json", */
              Authorization: `Token ${json.token}`,
            },
            body: formData,
          }
        );

        json = await data.json();
      }

      if (data.status === 400) {
        if (json.email) {
          alert("Ingresa un email válido");
          return;
        }
      }
      if (data.status === 200) {
        setShowConfirmModal(true);
      }
    } else {
      let data = await fetch(
        process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api/obras/create/",
        {
          method: "POST",
          headers: {
            /* "Content-Type": "application/json", */
            Authorization: `Token ${authtoken}`,
          },
          body: formData,
        }
      );

      let json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api/obras/create/",
          {
            method: "POST",
            headers: {
              /* "Content-Type": "application/json", */
              Authorization: `Token ${json.token}`,
            },
            body: formData,
          }
        );

        json = await data.json();
      }

      if (data.status === 400) {
        if (json.email) {
          alert("Ingresa un email válido");
          return;
        }
      }

      if (data.status === 201) {
        setShowConfirmModal(true);
      }
    }
  };

  return (
    <div className="container">
      <ModalRedirect
        showConfirmModal={showConfirmModal}
        text={
          obraData
            ? "Se ha actualizado correctamente la obra."
            : "Se ha creado correctamente la obra."
        }
        link={
          obraData
            ? pathname.includes("logistica")
              ? `/concreco/logistica/obra/${obraId}`
              : pathname.includes("comercializacion") &&
                `/concreco/comercializacion/obra/${obraId}`
            : pathname.includes("logistica")
            ? `/concreco/logistica/cliente/${clienteId}/obras`
            : pathname.includes("comercializacion") &&
              `/concreco/comercializacion/cliente/${clienteId}/obras`
        }
      />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8">
          {obraData ? (
            <h3 className="text-center">Editar Obra</h3>
          ) : (
            <h3 className="text-center">Agregar Obra</h3>
          )}

          <form
            className="agregar-obra-form"
            onSubmit={(e) => {
              handleSubmit(e, history);
            }}
          >
            <div className="mb-2">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="form-control"
                autoComplete="off"
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="residente" className="form-label">
                Residente
              </label>
              <input
                type="text"
                name="residente"
                id="residente"
                value={form.residente}
                onChange={handleChange}
                className="form-control"
                autoComplete="off"
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="direccion" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                name="direccion"
                id="direccion"
                value={form.direccion}
                onChange={handleChange}
                className="form-control"
                autoComplete="off"
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="telefono" className="form-label">
                Teléfono
              </label>
              <input
                type="text"
                name="telefono"
                id="telefono"
                value={form.telefono}
                onChange={handleChange}
                className="form-control"
                autoComplete="off"
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
                autoComplete="off"
              />
            </div>

            <div className="mb-2">
              <label htmlFor="linkObra" className="form-label">
                Link Obra
              </label>
              <input
                type="linkObra"
                name="linkObra"
                id="linkObra"
                value={form.linkObra}
                onChange={handleChange}
                className="form-control"
                autoComplete="off"
              />
            </div>

            <div className="mb-2">
              <label htmlFor="image" className="form-label">
                Imágen
              </label>
              <input
                type="file"
                id="image"
                className="form-control"
                ref={imagenRef}
              />
            </div>

            <div className="d-flex justify-content-end ">
              {obraData ? (
                <input
                  type="submit"
                  value="Guardar Cambios"
                  className="btn  mb-3 mt-2"
                  style={{ backgroundColor: "#00C08B", color: "white" }}
                />
              ) : (
                <input
                  type="submit"
                  value="Agregar"
                  className="btn  mb-3 mt-2"
                  style={{ backgroundColor: "#00C08B", color: "white" }}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
