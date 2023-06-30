import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";

import "./TablaCondicionVenta.styles.scss";

export const TablaCondicionVenta = () => {
  const { pathname } = useLocation();

  const { cotizacionId, id, clienteId, obraId } = useParams();

  const useId = cotizacionId || id
  const url = cotizacionId ?
    `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/condicion-venta/?cotizacionId=${cotizacionId}` :
    `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/condicion-venta/?clienteId=${id}`


  const { data, isLoading } = useFetchAndLoading(
    url,
    useId, clienteId
  );

  if (isLoading) return <LoadingSpinner />
  const dataResult = data.results || data
  
  return (
    <>
      <div className="container">

        <div className="row text-center">
          {pathname.includes("pedido") || pathname.includes("cotizacion") ? (
            <h2>Seleccione Condición de Venta </h2>
          ) : (
            // <h2>Obras de {data.nombre}</h2>
            <h2>Condiciones de Venta de { } </h2>
          )}
        </div>

        

          <div className="d-flex justify-content-end mb-3">
            {pathname.includes("logistica")  &&  (
              <Link
                to={`/concreco/logistica/agregar-condicion-venta/${id}`}
                className="btn btn-primary"
              >
                Agregar Condición de Venta
                
              </Link>
            )}

            {pathname.includes("comercializacion") && (
              <Link
                to={`/concreco/comercializacion/agregar-condicion-venta/${id}`}
                className="btn btn-primary"
              >
                Agregar Condición de Venta
                
              </Link>
            )}

            
          </div> : <></>
        


        <div className="row">
          <div className="table-responsive p-0">
            <table className="table table-striped table-hover table-bordered text-center">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>CFDI</th>
                  <th>Método de pago</th>
                  <th>Forma de pago</th>
                  <th>Pago</th>
                  <th>Tipo de facturación</th>
                </tr>
              </thead>
              <tbody>
                {dataResult.map((condicion) => (
                  <tr key={condicion.id}>
                    <td>
                      {pathname.includes("pedido") && (
                        <Link
                          to={`/concreco/logistica/agregar-pedido/cotizacion/${cotizacionId}/condicion-venta/${condicion.id}`}
                        >
                          {condicion.id}
                          {/* {obraId} */}

                        </Link>
                      )}

                      

                      {pathname.includes("logistica") &&
                        !pathname.includes("pedido") && (
                          <Link to={`/concreco/logistica/condicion-venta/${condicion.id}`}>
                            {condicion.id}
                          </Link>
                        )}

                      {pathname.includes("comercializacion") &&
                        !pathname.includes("cotizacion") && (
                          <Link to={`/concreco/comercializacion/condicion-venta/${condicion.id}`}>
                            {condicion.id}
                          </Link>
                        )}
                    </td>
                    <td>
                      {pathname.includes("pedido") && (
                        <Link
                          to={`/concreco/logistica/agregar-pedido/cotizacion/${cotizacionId}/condicion-venta/${condicion.id}`}
                        >
                          {condicion.CFDI}
                        </Link>
                      )}

                      

                      {pathname.includes("logistica") &&
                        !pathname.includes("pedido") && (
                          <Link to={`/concreco/logistica/condicion-venta/${condicion.id}`}>
                            {condicion.CFDI}
                          </Link>
                        )}

                      {pathname.includes("comercializacion") &&
                        !pathname.includes("cotizacion") && (
                          <Link to={`/concreco/comercializacion/condicion-venta/${condicion.id}`}>
                            {condicion.CFDI}
                          </Link>
                        )}
                    </td>
                    <td>
                      {pathname.includes("pedido") && (
                        <Link
                          to={`/concreco/logistica/agregar-pedido/cotizacion/${cotizacionId}/condicion-venta/${condicion.id}`}
                        >
                          {condicion.metodo_pago}
                        </Link>
                      )}

                     

                      {pathname.includes("logistica") &&
                        !pathname.includes("pedido") && (
                          <Link to={`/concreco/logistica/condicion-venta/${condicion.id}`}>
                            {condicion.metodo_pago}
                          </Link>
                        )}

                      {pathname.includes("comercializacion") &&
                        !pathname.includes("cotizacion") && (
                          <Link to={`/concreco/comercializacion/condicion-venta/${condicion.id}`}>
                            {condicion.metodo_pago}
                          </Link>
                        )}
                    </td>
                    <td>
                      {pathname.includes("pedido") && (
                        <Link
                          to={`/concreco/logistica/agregar-pedido/cotizacion/${cotizacionId}/condicion-venta/${condicion.id}`}
                        >
                          {condicion.forma_pago}
                        </Link>
                      )}

                     

                      {pathname.includes("logistica") &&
                        !pathname.includes("pedido") && (
                          <Link to={`/concreco/logistica/condicion-venta/${condicion.id}`}>
                            {condicion.forma_pago}
                          </Link>
                        )}

                      {pathname.includes("comercializacion") &&
                        !pathname.includes("cotizacion") && (
                          <Link to={`/concreco/comercializacion/condicion-venta/${condicion.id}`}>
                            {condicion.forma_pago}
                          </Link>
                        )}
                    </td>
                    <td>
                      {pathname.includes("pedido") && (
                        <Link
                          to={`/concreco/logistica/agregar-pedido/cotizacion/${cotizacionId}/condicion-venta/${condicion.id}`}
                        >
                          {condicion.pago}
                        </Link>
                      )}

                      

                      {pathname.includes("logistica") &&
                        !pathname.includes("pedido") && (
                          <Link to={`/concreco/logistica/condicion-venta/${condicion.id}`}>
                            {condicion.pago}
                          </Link>
                        )}

                      {pathname.includes("comercializacion") &&
                        !pathname.includes("cotizacion") && (
                          <Link to={`/concreco/comercializacion/condicion-venta/${condicion.id}`}>
                            {condicion.pago}
                          </Link>
                        )}
                    </td>
                    <td>
                      {pathname.includes("pedido") && (
                        <Link
                          to={`/concreco/logistica/agregar-pedido/cotizacion/${cotizacionId}/condicion-venta/${condicion.id}`}
                        >
                          {condicion.tipo_facturacion}
                        </Link>
                      )}

                      
                      {pathname.includes("logistica") &&
                        !pathname.includes("pedido") && (
                          <Link to={`/concreco/logistica/condicion-venta/${condicion.id}`}>
                            {condicion.tipo_facturacion}
                          </Link>
                        )}

                      {pathname.includes("comercializacion") &&
                        !pathname.includes("cotizacion") && (
                          <Link to={`/concreco/comercializacion/condicion-venta/${condicion.id}`}>
                            {condicion.tipo_facturacion}
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

    </>
  );
};
