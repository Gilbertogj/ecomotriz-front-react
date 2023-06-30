import React from "react";
import { Link, useLocation } from "react-router-dom";
import { DeleteClientButton } from "../delete-client-button/DeleteClientButton";

import { ReactComponent as EditarLogo } from "../../assets/svg/iconoEditar.svg";

export const DetallesCliente = ({ detallesCliente, urlId }) => {
  const { pathname } = useLocation();

  return (
    <div className="container">
      {detallesCliente.id ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div style={{ width: "40px" }} className="invisible">
              .
            </div>
            <div className="text-center">
              <h2>{detallesCliente.nombre}</h2>
            </div>
            <div>
              <div className="d-flex  flex-column align-items-center">
                {detallesCliente.id &&
                  pathname.includes("logistica") &&
                  !pathname.includes("realizar-pedido") && (
                    <Link
                      to={`/concreco/logistica/editar-cliente/${detallesCliente.id}`}
                    >
                      <div style={{ width: "40px" }}>
                        <EditarLogo />
                      </div>
                    </Link>
                  )}
                {detallesCliente.id &&
                  pathname.includes("logistica") &&
                  pathname.includes("realizar-pedido") && (
                    <Link
                      to={`/concreco/logistica/editar-cliente/${detallesCliente.id}/realizar-pedido`}
                    >
                      <div style={{ width: "40px" }}>
                        <EditarLogo />
                      </div>
                    </Link>
                  )}
                {detallesCliente.id && pathname.includes("comercializacion") && (
                  <Link
                    to={`/concreco/comercializacion/editar-cliente/${detallesCliente.id}`}
                  >
                    <div style={{ width: "40px" }}>
                      <EditarLogo />
                    </div>
                  </Link>
                )}
                {detallesCliente.id && !pathname.includes("pedido") && (
                  <DeleteClientButton />
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Id: </strong> {detallesCliente.id}
              </li>
              <li className="list-group-item">
                <strong>Alias:</strong> {detallesCliente.alias}
              </li>
              <li className="list-group-item">
                <strong>RFC: </strong> {detallesCliente.rfc}
              </li>
              <li className="list-group-item">
                <strong>Tipo de venta:</strong> {detallesCliente.pago}
              </li>
              <li className="list-group-item">
                <strong>Uso de CFDI:</strong> {detallesCliente.CFDI}
              </li>
              <li className="list-group-item">
                <strong>Método de pago:</strong>
                {detallesCliente.metodo_pago}
              </li>
              <li className="list-group-item">
                <strong>Forma de pago:</strong> {detallesCliente.forma_pago}
              </li>
              <li className="list-group-item">
                <strong>Correo facturas:</strong>{" "}
                {detallesCliente.correo_facturas}
              </li>
              <li className="list-group-item">
                <strong>Estado: </strong> {detallesCliente.estado_republica}
              </li>
              <li className="list-group-item">
                <strong>Municipio:</strong> {detallesCliente.municipio}
              </li>
              <li className="list-group-item">
                <strong>Código Postal:</strong> {detallesCliente.codigo_postal}
              </li>
              <li className="list-group-item">
                <strong>Giro empresa:</strong> {detallesCliente.giro_de_empresa}
              </li>
              <li className="list-group-item">
                <strong>Pago:</strong> {detallesCliente.tipo_venta}
              </li>
              <li className="list-group-item">
                <strong>Dirección :</strong> {detallesCliente.direccion}
              </li>
              <li className="list-group-item">
                <strong> Teléfono de oficinas:</strong> {detallesCliente.telefono}
              </li>
              <li className="list-group-item">
                <strong> Email:</strong> {detallesCliente.email}
              </li>
              <li className="list-group-item">
                <strong>Sitio Web:</strong> {detallesCliente.sitio_web}
              </li>
              <li className="list-group-item">
                <strong>Fecha de creación:</strong>{" "}
                {detallesCliente.created_at.slice(0, 10)}
              </li>
              <li className="list-group-item">
                <strong>Permiso: </strong>
                {detallesCliente.constancia_fiscal ? (
                  <a href={detallesCliente.constancia_fiscal} target="_blank" rel="noreferrer">
                    Constancia Fiscal
                  </a>
                ) : (
                  " No hay Constancia"
                )}
              </li>
            </ul>
          </div>

          <div className="d-flex justify-content-end mt-2 ">
            {pathname.includes("pedido") && (
              <Link
                to={`/concreco/logistica/cliente/${detallesCliente.id}/obras/realizar-pedido`}
                className="btn  mb-2"
                style={{ backgroundColor: "#00C08B", color: "white" }}
              >
                Continuar
              </Link>
            )}

            {pathname.includes("cotizacion") && (
              <Link
                to={`/concreco/comercializacion/cliente/${detallesCliente.id}/obras/realizar-cotizacion`}
                className="btn  mb-2"
                style={{ backgroundColor: "#00C08B", color: "white" }}
              >
                Continuar
              </Link>
            )}

            {pathname.includes("logistica") && !pathname.includes("pedido") && (
              <Link
                to={`/concreco/logistica/cliente/${detallesCliente.id}/obras`}
                className="btn mb-2"
                style={{ backgroundColor: "#00C08B", color: "white" }}
              >
                Ver Obras
              </Link>
            )}
            {pathname.includes("comercializacion") &&
              !pathname.includes("cotizacion") && (
                <Link
                  to={`/concreco/comercializacion/cliente/${detallesCliente.id}/obras`}
                  className="btn mb-2"
                  style={{ backgroundColor: "#00C08B", color: "white" }}
                >
                  Ver Obras
                </Link>
              )}
              
          </div>
          <div className="d-flex justify-content-end mt-2 ">
              {pathname.includes("logistica") && !pathname.includes("pedido") && (
              <Link
                to={`/concreco/logistica/cliente/${detallesCliente.id}/condicion-venta`}
                className="btn mb-2"
                style={{ backgroundColor: "#00C08B", color: "white" }}
              >
                Ver Condiciones de Venta
              </Link>
            )}
            </div>
        </>
      ) : (
        <p>No existe cliente #{urlId} </p>
      )}
    </div>
  );
};
