import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import { fetchData } from "../../utils/fetchData";

import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";
import { ModalRedirect } from "../modal-redirect/ModalRedirect";

const initialFormState = {
  cliente: "",
  tipo_cliente: "",
  planta: "",
  tipo_obra: "",
  m3_proyectados: "",
  fecha_pedido: "",
  fecha_fin_obra:"",
  direccion: "",
  ciudad: "",
  observaciones: "",
  suministro_real: 0,
  factor_no_suministro: "",
};

export const FormAgregarProyeccion = () => {
  const [form, setForm] = useState(initialFormState);
  const [prospecciones, setProspecciones] = useState([]);
  const [fetchedProspecciones, setFetchedProspecciones] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const { pathname } = useLocation();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (pathname.includes("editar") && id) {
        setIsLoading(true);
        const data = await fetchData(
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/proyecciones/${id}/`,
          authtoken,
          dispatch,
          setCurrentUser
        );

        setFetchedProspecciones(data.prospectos);
        setIsLoading(false);
      }
    })();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setProspecciones((prevState) => {
      const arr = [...prevState];

      arr.push(form);

      return arr;
    });

    setForm(initialFormState);
  };

  const crearProyeccion = async () => {
    if (prospecciones.length < 1) return;

    let data;
    let json;

    if (pathname.includes("editar") && id) {
      data = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/proyecciones/${id}/modify-prospects-to-proyeccion/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authtoken}`,
          },
          body: JSON.stringify({
            proyecciones: prospecciones,
          }),
        }
      );

      json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/proyecciones/${id}/modify-prospects-to-proyeccion/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${json.token}`,
            },
            body: JSON.stringify({
              proyecciones: prospecciones,
            }),
          }
        );

        json = await data.json();
      }
    } else {
      data = await fetch(
        process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_comercializacion/proyecciones/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authtoken}`,
          },
          body: JSON.stringify({
            proyecciones: prospecciones,
          }),
        }
      );

      json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_comercializacion/proyecciones/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${json.token}`,
            },
            body: JSON.stringify({
              proyecciones: prospecciones,
            }),
          }
        );

        json = await data.json();
      }
    

    // console.log(...data);
    console.log(data.status);

    if (data.status === 400) {
      if (json.email) {
        alert("Este correo ya ha sido registrado");
      }
      if (json.telefono) {
        alert("Este teléfono ya ha sido registrado");
        return;
      } else {
        alert("Ingresa un teléfono");
      }
    }

    if (data.status === 201 || data.status === 200) {
      console.log("Entro");
      setShowConfirmModal(true);
      console.log(data.status);
    }
    if (data.status === 200) {
      setShowConfirmModal(true);
      console.log(data.status);
    }

    if (data.status === 406) {
      alert(json.error);
    }
  }
  };

  return (
    <>
      <ModalRedirect
        showConfirmModal={showConfirmModal}
        text="Se ha realizado correctamente la acción."
        link="/concreco/comercializacion/proyecciones"
      />
      {id &&
        (isLoading ? (
          <LoadingSpinner />
        ) : (
          <>

            <div className="text-center">
              <h3>Prospectos Actuales</h3>
            </div>
            <div className="table-responsive p-0">
              <table className="table table-striped table-hover table-bordered text-center">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>m3</th>
                    <th>Fecha de suministro</th>
                    <th>Fecha de fin de obra</th>
                  </tr>
                </thead>
                <tbody>
                  {fetchedProspecciones.map((prospeccion, i) => (
                    <tr key={i}>
                      <td>{prospeccion.id}</td>
                      <td>{prospeccion.m3_proyectados}</td>
                      <td>{prospeccion.fecha_pedido}</td>
                      <td>{prospeccion.fecha_fin_obra}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ))}

      {fetchedProspecciones && (
        <div className="text-center">
          <h3>Agregar Prospecto</h3>
        </div>
      )}

      <div className="row justify-content-center">
        <div className="col-12 col-sm-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="cliente" className="form-label">
                Cliente
              </label>
              <input
                type="text"
                id="cliente"
                name="cliente"
                className="form-control"
                onChange={handleChange}
                value={form.cliente}
                autoComplete="off"
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="tipo_cliente" className="form-label">
                Tipo de cliente
              </label>
              <select
                id="tipo_cliente"
                name="tipo_cliente"
                className="form-select"
                onChange={handleChange}
                value={form.tipo_cliente}
                required
              >
                <option></option>
                <option value="Frecuente">Frecuente</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Intermitente">Intermitente</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="planta" className="form-label">
                Planta
              </label>
              <select
                id="planta"
                name="planta"
                className="form-select"
                onChange={handleChange}
                value={form.planta}
                required
              >
                <option></option>
                <option value="1">01 León</option>
                <option value="2">02 Puerto Interior</option>
                <option value="3">03 Salida a Lagos</option>
                <option value="4">04 San Miguel</option>
                <option value="5">05 San Pancho</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="tipo_obra" className="form-label">
                Tipo de obra
              </label>
              <select
                id="tipo_obra"
                name="tipo_obra"
                className="form-select"
                onChange={handleChange}
                value={form.tipo_obra}
                required
              >
                <option></option>
                <option value="Obra vertical">Obra vertical</option>
                <option value="Particular">Particular</option>
                <option value="Urbanización">Urbanización</option>
                <option value="Industrial">Industrial</option>
                <option value="Viviendero">Viviendero</option>
              </select>
            </div>


            <div className="mb-2">
              <label htmlFor="m3_proyectados" className="form-label">
                m3
              </label>
              <input
                type="number"
                step="any"
                id="m3_proyectados"
                min="1"
                name="m3_proyectados"
                className="form-control"
                onChange={handleChange}
                value={form.m3_proyectados}
                autoComplete="off"
                required
                onWheel={(e) => {
                  e.target.blur();
                }}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="fecha_pedido" className="form-label">
                Fecha estimada de suministro:
              </label>
              <input
                type="date"
                id="fecha_pedido"
                name="fecha_pedido"
                className="form-control"
                onChange={handleChange}
                value={form.fecha_pedido}
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="fecha_fin_obra" className="form-label">
                Fecha estimada de fin de obra:
              </label>
              <input
                type="date"
                id="fecha_fin_obra"
                name="fecha_fin_obra"
                className="form-control"
                onChange={handleChange}
                value={form.fecha_fin_obra}
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="direccion" className="form-label">
                Dirección de la obra
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                className="form-control"
                onChange={handleChange}
                value={form.direccion}
                autoComplete="off"
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="ciudad" className="form-label">
                Ciudad de la obra
              </label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                className="form-control"
                onChange={handleChange}
                value={form.ciudad}
                autoComplete="off"
                required
              />
            </div>

            

            <div className="mb-2">
              <label htmlFor="observaciones" className="form-label">
                Observaciones
              </label>
              <input
                type="text"
                id="observaciones"
                name="observaciones"
                className="form-control"
                onChange={handleChange}
                value={form.observaciones}
                autoComplete="off"
                required
              />
            </div>

            <div className="d-flex justify-content-end ">
              <input
                type="submit"
                value="Agregar linea"
                className="btn btn-outline-primary mb-3 mt-2"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="table-responsive p-0">
        <table className="table table-striped table-hover table-bordered text-center">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>m3</th>
              <th>Fecha de suministro</th>
              <th>Fecha de fin de obra</th>
            </tr>
          </thead>
          <tbody>
            {prospecciones.map((prospeccion, i) => (
              <tr key={i}>
                <td>{prospeccion.cliente}</td>
                <td>{prospeccion.m3_proyectados}</td>
                <td>{prospeccion.fecha_pedido}</td>
                <td>{prospeccion.fecha_fin_obra}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {prospecciones.length > 0 && (
        <div className="d-flex justify-content-end ">
          <button
            className="btn btn-success mb-3 mt-2"
            onClick={crearProyeccion}
          >
            Crear proyección
          </button>
        </div>
      )}
    </>
  );
};
