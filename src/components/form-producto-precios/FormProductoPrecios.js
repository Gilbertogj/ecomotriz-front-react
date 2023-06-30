import React, { useContext, useRef, useState } from "react";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { ModalRedirect } from "../modal-redirect/ModalRedirect";

export const FormProductoPrecios = ({ productoData }) => {
  const [form, setForm] = useState({
    precio_1: productoData.precio_1,
    precio_2: productoData.precio_2,
    precio_3: productoData.precio_3,
    precio_contado: productoData.precio_contado,
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const submitBtnRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/productos/${productoData.id}/update/`;

    let formData = new FormData();

    formData.append("precio_1", form.precio_1);
    formData.append("precio_2", form.precio_2);
    formData.append("precio_3", form.precio_3);
    formData.append("precio_contado", form.precio_contado);

    let data = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Token ${authtoken}`,
      },
      body: formData,
    });

    let json = await data.json();

    if (json.expired) {
      dispatch(setCurrentUser({ token: json.token }));

      data = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Token ${json.token}`,
        },
        body: formData,
      });

      json = await data.json();
    }

    if (data.status >= 200 || data.status < 300) {
      setShowConfirmModal(true);
    }
  };

  const handleChange = (e) => {
    submitBtnRef.current.disabled = false;

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className="container px-0 mt-3">
      <ModalRedirect
        showConfirmModal={showConfirmModal}
        text="Se han actualizado correctamente los precios del producto."
        link="/concreco/comercializacion/productos"
      />
      <h6>
        <strong>Modificar precios</strong>
      </h6>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between">
          <div>
            <label htmlFor="precio1" className="form-label">
              Precio 1
            </label>
            <input
              type="number"
              step="any"
              className="form-control"
              name="precio_1"
              id="precio1"
              value={form.precio_1}
              onChange={handleChange}
              autoComplete="off"
              required
              onWheel={(e) => {
                e.target.blur();
              }}
            />
          </div>
          <div className="mx-3">
            <label htmlFor="precio2" className="form-label">
              Precio 2
            </label>
            <input
              type="number"
              step="any"
              className="form-control"
              name="precio_2"
              id="precio2"
              value={form.precio_2}
              onChange={handleChange}
              autoComplete="off"
              required
              onWheel={(e) => {
                e.target.blur();
              }}
            />
          </div>
          <div>
            <label htmlFor="precio3" className="form-label">
              Precio 3
            </label>
            <input
              type="number"
              step="any"
              className="form-control"
              name="precio_3"
              id="precio3"
              value={form.precio_3}
              onChange={handleChange}
              autoComplete="off"
              required
              onWheel={(e) => {
                e.target.blur();
              }}
            />
          </div>
          {productoData.precio_contado.trim() && (
            <div className="mx-3">
              <label htmlFor="precio_contado" className="form-label">
                Precio Contado
              </label>
              <input
                type="number"
                step="any"
                className="form-control"
                name="precio_contado"
                id="precio_contado"
                value={form.precio_contado}
                onChange={handleChange}
                autoComplete="off"
                required
                onWheel={(e) => {
                  e.target.blur();
                }}
              />
            </div>
          )}
        </div>
        <div className="d-flex justify-content-end">
          <input
            type="submit"
            value="Actualizar Precios"
            className="btn btn-success my-3"
            ref={submitBtnRef}
            disabled
          />
        </div>
      </form>
    </div>
  );
};
