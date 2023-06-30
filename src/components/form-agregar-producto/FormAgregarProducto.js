import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";

import { ModalRedirect } from "../modal-redirect/ModalRedirect";

import "./FormAgregarProducto.styles.scss";

const initialState = {
  tipo: "",
  resistencia: "",
  edad: "",
  tma: "",
  revenimiento: "",
  forma: "",
  planta: "",
  precio1: "",
  precio2: "",
  precio3: "",
};

export const FormAgregarProducto = () => {
  const [form, setForm] = useState(initialState);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { authtoken, dispatch, setCurrentUser } = useContext(ReactReduxContext);

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e, historyRef) => {
    e.preventDefault();

    const formulario = {
      diseño:
        form.tipo +
        form.resistencia +
        form.edad +
        form.tma +
        form.revenimiento +
        form.forma,
      planta: form.planta,
      precio_1: form.precio1,
      precio_2: form.precio2,
      precio_3: form.precio3,
      ubicacion: form.planta,
    };

    let data = await fetch(
      process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_comercializacion/productos/create/",
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

    // console.log(json);

    if (json.expired) {
      dispatch(setCurrentUser({ token: json.token }));

      data = await fetch(
        process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_comercializacion/productos/create/",
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

    if (data.status === 400) {
      alert(data);
    }

    if (data.status === 201 || data.status === 200) {
      setShowConfirmModal(true);
    }

    if (data.status === 406) {
      alert(json.error);
    }
  };

  return (
    <div className="container">
      <ModalRedirect
        showConfirmModal={showConfirmModal}
        text="Se ha creado correctamente el producto."
        link="/concreco/comercializacion/productos"
      />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8">
          <h3 className="text-center">Agregar Diseño</h3>

          <form
            className="agregar-producto-form"
            onSubmit={(e) => {
              handleSubmit(e, history);
            }}
          >
            <div className="mb-2">
              <label htmlFor="tipo" className="form-label">
                Tipo de Concreto
              </label>
              <select
                id="tipo"
                name="tipo"
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="AR">Arquitectónico</option>
                <option value="AU">Autocompactable</option>
                <option value="CH">Autocurable</option>
                <option value="C">Convencional</option>
                <option value="ES">Estructural</option>
                <option value="JAL">Jalcreto</option>
                <option value="LZ">Lanzado</option>
                <option value="LV">Lavado</option>
                <option value="LG">Ligero</option>
                <option value="MO">Mortero</option>
                <option value="MR">MR (Módulo de Ruptura)</option>
                <option value="PB">Permeable</option>
                <option value="R">Rápido</option>
                <option value="RF">Relleno Fluido</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="resistencia" className="form-label">
                Resistencia
              </label>
              <select
                id="resistencia"
                name="resistencia"
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="25">25</option>
                <option value="35">35</option>
                <option value="38">38</option>
                <option value="40">40</option>
                <option value="42">42</option>
                <option value="45">45</option>
                <option value="48">48</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
                <option value="125">125</option>
                <option value="150">150</option>
                <option value="175">175</option>
                <option value="200">200</option>
                <option value="250">250</option>
                <option value="300">300</option>
                <option value="350">350</option>
                <option value="400">400</option>
                <option value="650">650</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="edad" className="form-label">
                Edad
              </label>
              <select
                id="edad"
                name="edad"
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="R01">R01</option>
                <option value="R03">R03</option>
                <option value="R07">R07</option>
                <option value="R14">R14</option>
                <option value="N">N</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="tma" className="form-label">
                Tamaño nominal
              </label>
              <select
                id="tma"
                name="tma"
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="10">3/8 10mm</option>
                <option value="20">3/4 20mm</option>
                <option value="40">1 1/12 40mm</option>
                <option value="05">Arena 05mm</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="revenimiento" className="form-label">
                Revenimiento
              </label>
              <select
                id="revenimiento"
                name="revenimiento"
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="0">0 cm</option>
                <option value="06">06 cm</option>
                <option value="08">08 cm</option>
                <option value="10">10 cm</option>
                <option value="12">12 cm</option>
                <option value="14">14 cm</option>
                <option value="16">16 cm</option>
                <option value="18">18 cm</option>
                <option value="20">20 cm</option>
                <option value="22">22 cm</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="forma" className="form-label">
                Forma
              </label>
              <select
                name="forma"
                id="forma"
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="T">Tirado</option>
                <option value="B">Bombeado</option>
                <option value="BC">Bomba Cliente</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="planta" className="form-label">
                Ubicación
              </label>
              <select
                name="planta"
                id="planta"
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="León">León</option>
                <option value="SMA">SMA</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="precio1" className="form-label">
                Precio 1
              </label>
              <input
                id="precio1"
                type="number"
                name="precio1"
                onChange={handleChange}
                step="any"
                className="form-control"
                autoComplete="off"
                required
                onWheel={(e) => {
                  e.target.blur();
                }}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="precio2" className="form-label">
                Precio 2
              </label>
              <input
                id="precio2"
                type="number"
                name="precio2"
                onChange={handleChange}
                step="any"
                className="form-control"
                autoComplete="off"
                required
                onWheel={(e) => {
                  e.target.blur();
                }}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="precio3" className="form-label">
                Precio 3
              </label>
              <input
                id="precio3"
                type="number"
                name="precio3"
                onChange={handleChange}
                step="any"
                className="form-control"
                autoComplete="off"
                required
                onWheel={(e) => {
                  e.target.blur();
                }}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="diseño" className="form-label">
                Diseño
              </label>
              <input
                id="diseño"
                type="text"
                className="form-control"
                value={
                  form.tipo +
                  form.resistencia +
                  form.edad +
                  form.tma +
                  form.revenimiento +
                  form.forma
                }
                readOnly
              />
            </div>

            <div className="d-flex justify-content-end ">
              <input
                type="submit"
                value="Agregar Producto"
                className="btn mb-3 mt-2"
                style={{ backgroundColor: "#00C08B", color: "white" }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
