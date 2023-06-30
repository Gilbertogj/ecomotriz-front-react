import React, { useContext, useRef } from "react";
import { Link, useParams } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { ReactComponent as EditarLogo } from "../../assets/svg/iconoEditar.svg";

export const DetallesProyeccion = ({ proyeccionData, setData }) => {
  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const { id } = useParams();

  const suministrarInputRef = useRef();

  const descargarExcel = async () => {
    let json = null;

    let blob = null;

    const url = `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/proyecciones/${id}/excel-proyeccion/`;
    let response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${authtoken}`,
      },
    });

    if (response.headers.get("Content-Type") !== "application/ms-excel") {
      json = await response.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${json.token}`,
          },
        });
      }
    }

    blob = await response.blob();
    const url2 = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url2;
    a.download = "Proyeccion.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleClick = async (e, prospecto) => {
    try {
      e.target.classList.add("d-none");

      e.target.nextSibling.classList.remove("d-none");

      let cumplimiento;

      if (prospecto.cumplimiento) {
        cumplimiento = false;
      }

      if (!prospecto.cumplimiento) {
        cumplimiento = true;
      }

      const obj = {
        cumplimiento,
        proyeccion: proyeccionData.id,
        id: prospecto.id,
      };

      let data = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/proyecciones/${id}/prospect/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authtoken}`,
          },
          body: JSON.stringify(obj),
        }
      );

      let json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/proyecciones/${id}/prospect/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${json.token}`,
            },
            body: JSON.stringify(obj),
          }
        );

        json = await data.json();
      }

      if (data.status === 201 || data.status === 200) {
        setData((prevState) => {
          const prevStateCopy = { ...prevState };

          const prevProspectos = [...prevStateCopy.prospectos];

          const arrElementsStringifed = prevProspectos.map((el) =>
            JSON.stringify(el)
          );

          const idx = arrElementsStringifed.indexOf(JSON.stringify(prospecto));

          prevProspectos.splice(idx, 1, json);

          prevStateCopy.prospectos = [...prevProspectos];

          return prevStateCopy;
        });
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      e.target.nextSibling.classList.add("d-none");
      e.target.classList.remove("d-none");
    }
  };

  const handleSuministrar = async (e, prospecto) => {
    try {
      if (!suministrarInputRef.current.value) {
        return;
      }

      e.target.classList.add("d-none");

      e.target.nextSibling.classList.remove("d-none");

      const obj = {
        proyeccion: Number(id),
        id: Number(prospecto.id),
        suministro_real: suministrarInputRef.current.value,
      };

      let data = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/proyecciones/${id}/prospect/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authtoken}`,
          },
          body: JSON.stringify(obj),
        }
      );

      let json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/proyecciones/${id}/prospect/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${json.token}`,
            },
            body: JSON.stringify(obj),
          }
        );

        json = await data.json();
      }

      if (data.status === 201 || data.status === 200) {
        setData((prevState) => {
          const prevStateCopy = { ...prevState };

          const prevProspectos = [...prevStateCopy.prospectos];

          const arrElementsStringifed = prevProspectos.map((el) =>
            JSON.stringify(el)
          );

          const idx = arrElementsStringifed.indexOf(JSON.stringify(prospecto));

          prevProspectos.splice(idx, 1, json);

          prevStateCopy.prospectos = [...prevProspectos];

          return prevStateCopy;
        });

        suministrarInputRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      e.target.nextSibling.classList.add("d-none");
      e.target.classList.remove("d-none");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <div style={{ width: "40px" }} className="invisible">
          .
        </div>
        <div className="text-center">
          <h2 className="text-center">Proyecciones</h2>
        </div>
        <div>
          <div className="d-flex justify-content-center">
            <Link to={`/concreco/comercializacion/editar-proyeccion/${id}`}>
              <div style={{ width: "40px" }}>
                <EditarLogo />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center justify-content-md-end mb-3">
        <button className="btn btn-success" onClick={descargarExcel}>
          Descargar Excel
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered text-center">
          <thead>
            <tr>
              <th>Asesor Comercial</th>
              <th>Cliente</th>
              <th>Tipo de Cliente</th>
              <th>Planta</th>
              <th>Tipo de Obra</th>
              <th>m3 Proyectados</th>
              <th>Fecha estimada de suministro</th>
              <th>Fecha de fin de obra</th>
              <th>Dirección de la Obra</th>
              <th>Ciudad donde se colará</th>
              <th>Factor por no suministro</th>
              <th>Suministro Real (m3)</th>
              <th>% de Cumplimiento</th>
              <th>Comentarios</th>
              <th>Cumplimiento</th>
            </tr>
          </thead>
          <tbody>
            {proyeccionData.prospectos.map((prospecto, i) => (
              <tr key={i}>
                <td>{prospecto.id}</td>
                <td>{prospecto.id}</td>
                <td>{prospecto.tipo_cliente}</td>
                <td>{prospecto.planta}</td>
                <td>{prospecto.tipo_obra}</td>
                <td>{prospecto.m3_proyectados}</td>
                <td>{prospecto.fecha_pedido}</td>
                <td>{prospecto.fecha_fin_obra}</td>
                <td>{prospecto.direccion}</td>
                <td>{prospecto.ciudad}</td>
                <td>{prospecto.factor_no_suministro}</td>
                <td>
                  {prospecto.suministro_real}
                  <input
                    className="my-1 w-100"
                    type="number"
                    ref={suministrarInputRef}
                  />
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={(e) => {
                      handleSuministrar(e, prospecto);
                    }}
                  >
                    Agregar
                  </button>
                  <button
                    className="btn btn-primary d-none"
                    type="button"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Loading...</span>
                  </button>
                </td>
                <td>
                  {(
                    (Number(prospecto.suministro_real) /
                      Number(prospecto.m3_proyectados)) *
                    100
                  ).toFixed(2)}{" "}
                  %
                </td>
                <td>{prospecto.observaciones}</td>
                <td>
                  {prospecto.cumplimiento ? "Sí" : "No"}

                  <div>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={(e) => {
                        handleClick(e, prospecto);
                      }}
                    >
                      {prospecto.cumplimiento ? "Desactivar" : "Activar"}
                    </button>

                    <button
                      className="btn btn-primary d-none"
                      type="button"
                      disabled
                    >
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Loading...</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
