import React from "react";
import { Link, useLocation } from "react-router-dom";

import { ReactComponent as EditarLogo } from "../../assets/svg/iconoEditar.svg";
import { DeleteObraButton } from "../delete-obra-button/DeleteObraButton";

export const DetallesObra = ({ obraData, urlId }) => {
  const { pathname } = useLocation();

  return (
    <div className="container">
      {obraData.id ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div style={{ width: "40px" }} className="invisible">
              .
            </div>
            <div className="text-center">
              <h2>{obraData.nombre}</h2>
            </div>

            <div>
              <div className="d-flex  flex-column align-items-center">
                {obraData.id &&
                  pathname ===
                    `/concreco/comercializacion/obra/${obraData.id}` && (
                    <Link
                      to={`/concreco/comercializacion/editar-obra/${obraData.id}`}
                    >
                      <div style={{ width: "40px" }}>
                        <EditarLogo />
                      </div>
                    </Link>
                  )}

                {obraData.id &&
                  pathname === `/concreco/logistica/obra/${obraData.id}` && (
                    <Link to={`/concreco/logistica/editar-obra/${obraData.id}`}>
                      <div style={{ width: "40px" }}>
                        <EditarLogo />
                      </div>
                    </Link>
                  )}

                {obraData.id && (
                  <DeleteObraButton clienteId={obraData.cliente} />
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Id:</strong> {obraData.id}
              </li>
              <li className="list-group-item">
                <strong>Nombre del cliente:</strong>{" "}
                {obraData.cliente_detail.nombre}
              </li>
              <li className="list-group-item">
                <strong>Residente:</strong> {obraData.residente}
              </li>
              <li className="list-group-item">
                <strong>Dirección:</strong> {obraData.direccion}
              </li>
              <li className="list-group-item">
                <strong>Teléfono:</strong> {obraData.telefono}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> {obraData.email}
              </li>
              <li className="list-group-item">
                <strong>Link Obra:</strong> <a href="{obraData.link_obra}">  {obraData.link_obra} </a>
              </li>
              <li className="list-group-item">
                <strong>Fecha de creación:</strong>{" "}
                {obraData.created_at.slice(0, 10)}
              </li>
              <li className="list-group-item">
                <strong>Permiso:</strong>
                {obraData.permiso ? (
                  <a href={obraData.permiso} target="_blank" rel="noreferrer">
                    Foto
                  </a>
                ) : (
                  " No hay Foto"
                )}
              </li>
            </ul>
          </div>

          <div className="d-flex justify-content-end mt-2 ">
            {/* {!obraData.detail && pathname.includes("pedido") && (
              <Link
                to={`/concreco/logistica/agregar-pedido/cliente/${obraData.cliente}/obra/${obraData.id}`}
                className="btn mb-2"
                style={{ backgroundColor: "#00C08B", color: "white" }}
              >
                Continuar
              </Link>
            )} */}

            {/* {!obraData.detail && pathname.includes("pedido") && (
              <Link
                to={`/concreco/logistica/cliente/${obraData.cliente}/obra/${obraData.id}/condicion/realizar-pedido`}
                className="btn mb-2"
                style={{ backgroundColor: "#00C08B", color: "white" }}
              >
                Continuar
              </Link>
            )} */}
            {!obraData.detail && pathname.includes("pedido") && (
              <Link
                to={`/concreco/logistica/obra/${obraData.id}/linea/realizar-pedido`}
                className="btn mb-2"
                style={{ backgroundColor: "#00C08B", color: "white" }}
              >
                Continuar
              </Link>
            )}

            {!obraData.detail && pathname.includes("cotizacion") && (
              <Link
                to={`/concreco/comercializacion/agregar-cotizacion/cliente/${obraData.cliente}/obra/${obraData.id}`}
                className="btn mb-2"
                style={{ backgroundColor: "#00C08B", color: "white" }}
              >
                Continuar
              </Link>
            )}
          </div>
        </>
      ) : (
        <p>No existe la obra #{urlId}</p>
      )}
    </div>
  );
};
