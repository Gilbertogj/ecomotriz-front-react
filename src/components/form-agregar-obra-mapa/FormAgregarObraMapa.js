import React, { useContext, useState } from "react";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

const initialFormState = {
  m3: "",
  nombre_cliente: "",
  persona_contacto: "",
  telefono: "",
  nombre: "",
  descripcion: "",
  fecha: "",
};

export const FormAgregarObraMapa = ({
  nuevaObraPosicion,
  setNuevaObraPosicion,
  setObras,
}) => {
  const [form, setForm] = useState(initialFormState);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formulario = {
      m3: form.m3,
      nombre_cliente: form.nombre_cliente,
      persona_contacto: form.persona_contacto,
      telefono: form.telefono,
      nombre: form.nombre,
      descripcion: form.descripcion,
      fecha: form.fecha,
      latitud: nuevaObraPosicion.latitud,
      longitud: nuevaObraPosicion.longitud,
    };

    let data = await fetch(
      process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_comercializacion/maps/",
      {
        method: "POST",
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
        process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_comercializacion/maps/",
        {
          method: "POST",
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
      setObras((prevState) => {
        const arr = [...prevState];

        const filteredArr = arr.filter((obra) => obra.id !== json.id);

        filteredArr.push(json);

        return filteredArr;
      });

      alert("Se ha agregado correctamente la obra al mapa.");

      document.querySelector("#cerrarAcordeonBtn").click();
      setForm(initialFormState);
      setNuevaObraPosicion({ latitud: "", longitud: "" });
    } else {
      alert("Agregue datos validos");
    }
  };

  return (
    <div className="container">
      <form className="row" onSubmit={handleSubmit}>
        <div className="form-text my-2">
          <strong>Mueve el marcador a la ubicación de la obra.</strong>
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="m3">M3:</label>
          <input
            type="number"
            step="any"
            id="m3"
            name="m3"
            value={form.m3}
            className="form-control form-control-sm"
            onChange={handleChange}
            autoComplete="off"
            required
            onWheel={(e) => {
              e.target.blur();
            }}
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="nombreCliente">Nombre Cliente:</label>
          <input
            type="text"
            id="nombreCliente"
            name="nombre_cliente"
            value={form.nombre_cliente}
            className="form-control form-control-sm"
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="contacto">Contacto:</label>
          <input
            type="text"
            id="contacto"
            name="persona_contacto"
            value={form.persona_contacto}
            className="form-control form-control-sm"
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={form.telefono}
            className="form-control form-control-sm"
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>

        <div className="col-12 col-md-3">
          <label htmlFor="nombreRegistrarObra">Nombre de obra:</label>
          <input
            type="text"
            id="nombreRegistrarObra"
            name="nombre"
            value={form.nombre}
            className="form-control form-control-sm"
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>

        <div className="col-12 col-md-3">
          <label htmlFor="descripcionRegistrarObra">Descripción de obra:</label>
          <select
            id="descripcionRegistrarObra"
            name="descripcion"
            value={form.descripcion}
            className="form-select form-select-sm"
            onChange={handleChange}
            required
          >
            <option></option>
            <option value="Obra vertical">Obra vertical</option>
            <option value="Particular">Particular</option>
            <option value="Industrial">Industrial</option>
            <option value="Urbanización">Urbanización</option>
            <option value="Viviendero">Viviendero</option>
          </select>
        </div>

        <div className="col-12 col-md-3">
          <label htmlFor="fecha">Fecha de prospección:</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={form.fecha}
            className="form-control form-control-sm"
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex justify-content-end my-3">
          <input
            type="submit"
            value="Registrar Obra"
            className="btn btn-success btn-sm"
          />
        </div>
      </form>
    </div>
  );
};
