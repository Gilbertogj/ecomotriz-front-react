import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";

import "./TablaObras.styles.scss";

export const TablaObras = () => {
  const { pathname } = useLocation();

  const { id } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/clientes/${id}/obras/`,
    id
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="container">
          <div className="row text-center">
            {pathname.includes("pedido") || pathname.includes("cotizacion") ? (
              <h2>Seleccione obra</h2>
            ) : (
              <h2>Obras de {data.nombre}</h2>
            )}
          </div>

          <div className="d-flex justify-content-end mb-3">
            {pathname.includes("logistica") && (
              <Link
                to={`/concreco/logistica/agregar-obra/${id}`}
                className="btn btn-primary"
              >
                Agregar Obra
              </Link>
            )}

            {pathname.includes("comercializacion") && (
              <Link
                to={`/concreco/comercializacion/agregar-obra/${id}`}
                className="btn btn-primary"
              >
                Agregar Obra
              </Link>
            )}
          </div>

          <div className="row">
            <div className="table-responsive p-0">
              <table className="table table-striped table-hover table-bordered text-center">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Residente</th>
                  </tr>
                </thead>
                <tbody>
                  {data.obras.map((obra) => (
                    <tr key={obra.id}>
                      <td>
                        {pathname.includes("pedido") && (
                          <Link
                            to={`/concreco/logistica/obra/${obra.id}/realizar-pedido`}
                          >
                            {obra.id}
                            
                          </Link>
                        )}

                        {pathname.includes("cotizacion") && (
                          <Link
                            to={`/concreco/comercializacion/obra/${obra.id}/realizar-cotizacion`}
                          >
                            {obra.id}
                          </Link>
                        )}

                        {pathname.includes("logistica") &&
                          !pathname.includes("pedido") && (
                            <Link to={`/concreco/logistica/obra/${obra.id}`}>
                              {obra.id}
                            </Link>
                          )}

                        {pathname.includes("comercializacion") &&
                          !pathname.includes("cotizacion") && (
                            <Link
                              to={`/concreco/comercializacion/obra/${obra.id}`}
                            >
                              {obra.id}
                            </Link>
                          )}
                      </td>
                      <td>
                        {pathname.includes("pedido") && (
                          <Link
                            to={`/concreco/logistica/obra/${obra.id}/realizar-pedido`}
                          >
                            {obra.nombre}
                          </Link>
                        )}

                        {pathname.includes("cotizacion") && (
                          <Link
                            to={`/concreco/comercializacion/obra/${obra.id}/realizar-cotizacion`}
                          >
                            {obra.nombre}
                          </Link>
                        )}

                        {pathname.includes("logistica") &&
                          !pathname.includes("pedido") && (
                            <Link to={`/concreco/logistica/obra/${obra.id}`}>
                              {obra.nombre}
                            </Link>
                          )}

                        {pathname.includes("comercializacion") &&
                          !pathname.includes("cotizacion") && (
                            <Link
                              to={`/concreco/comercializacion/obra/${obra.id}`}
                            >
                              {obra.nombre}
                            </Link>
                          )}
                      </td>
                      <td>
                        {pathname.includes("pedido") && (
                          <Link
                            to={`/concreco/logistica/obra/${obra.id}/realizar-pedido`}
                          >
                            {obra.residente}
                          </Link>
                        )}

                        {pathname.includes("cotizacion") && (
                          <Link
                            to={`/concreco/comercializacion/obra/${obra.id}/realizar-cotizacion`}
                          >
                            {obra.residente}
                          </Link>
                        )}

                        {pathname.includes("logistica") &&
                          !pathname.includes("pedido") && (
                            <Link to={`/concreco/logistica/obra/${obra.id}`}>
                              {obra.residente}
                            </Link>
                          )}

                        {pathname.includes("comercializacion") &&
                          !pathname.includes("cotizacion") && (
                            <Link
                              to={`/concreco/comercializacion/obra/${obra.id}`}
                            >
                              {obra.residente}
                            </Link>
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
