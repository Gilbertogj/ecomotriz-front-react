import React from "react";
import { Link, useLocation } from "react-router-dom";

import { ReactComponent as EditarLogo } from "../../assets/svg/iconoEditar.svg";
import { DeleteObraButton } from "../delete-obra-button/DeleteObraButton";

export const DetallesCondicionVenta = ({ condicionVentaData, urlId }) => {
  const { pathname } = useLocation();

  return (
    <div className="container">
      {condicionVentaData.id ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div style={{ width: "40px" }} className="invisible">
              .
            </div>
            <div className="text-center">
              <h2>Condición de Venta {condicionVentaData.id}</h2>
            </div>

            <div>
              {/* <div className="d-flex  flex-column align-items-center">
                {obraData.id &&
                  pathname === `/comercializacion/obra/${condicionVentaData.id}` && (
                    <Link to={`/comercializacion/editar-obra/${obraData.id}`}>
                      <div style={{ width: "40px" }}>
                        <EditarLogo />
                      </div>
                    </Link>
                  )}

                {obraData.id && pathname === `/logistica/obra/${obraData.id}` && (
                  <Link to={`/logistica/editar-obra/${obraData.id}`}>
                    <div style={{ width: "40px" }}>
                      <EditarLogo />
                    </div>
                  </Link>
                )}

                {obraData.id && (
                  <DeleteObraButton clienteId={obraData.cliente} />
                )}
              </div> */}
            </div>
          </div>

          <div className="row">
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Id:</strong> {condicionVentaData.id}
              </li>
              <li className="list-group-item">
                <strong>CFDI:</strong>{" "}
                {condicionVentaData.CFDI}
              </li>
              <li className="list-group-item">
                <strong>Método de pago:</strong> {condicionVentaData.metodo_pago}
              </li>
              <li className="list-group-item">
                <strong>Forma de pago:</strong> {condicionVentaData.forma_pago}
              </li>
              <li className="list-group-item">
                <strong>Pago:</strong> {condicionVentaData.pago}
              </li>
              <li className="list-group-item">
                <strong>Tipo Facturación:</strong> {condicionVentaData.tipo_facturacion}
              </li>
              <li className="list-group-item">
                <strong>Fecha de creación:</strong>{" "}
                {condicionVentaData.created_at.slice(0, 10)}
              </li>
              {/* <li className="list-group-item">
                <strong>Permiso:</strong>
                {obraData.permiso ? (
                  <a href={obraData.permiso} target="_blank" rel="noreferrer">
                    Foto
                  </a>
                ) : (
                  " No hay Foto"
                )}
              </li> */}
            </ul>
          </div>

          {/* <div className="d-flex justify-content-end mt-2 ">
            {!obraData.detail && pathname.includes("pedido") && (
              <Link
                to={`/logistica/agregar-pedido/cliente/${obraData.cliente}/obra/${obraData.id}`}
                className="btn mb-2"
                style={{ backgroundColor: "#00C08B", color: "white" }}
              >
                Continuar
              </Link>
            )}

            {!obraData.detail && pathname.includes("cotizacion") && (
              <Link
                to={`/comercializacion/agregar-cotizacion/cliente/${obraData.cliente}/obra/${obraData.id}`}
                className="btn mb-2"
                style={{ backgroundColor: "#00C08B", color: "white" }}
              >
                Continuar
              </Link>
            )}
          </div> */}
        </>
      ) : (
        <p>No existe la condicion de venta #{urlId}</p>
      )}
    </div>
  );
};
