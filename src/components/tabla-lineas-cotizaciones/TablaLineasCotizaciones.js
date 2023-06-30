import React from "react";
import { Link } from "react-router-dom";

import { formatNumToMxnCurrency } from "../../utils/formatNumToMxnCurrency";

export const TablaLineasCotizaciones = ({ lineas }) => {
  if (!lineas){
    return <></>
  }
  return (
    <div className="container">
      <div className="row text-center mb-3">
        <h3>Lista de Lineas Cotización</h3>
      </div>
      <div className="row">
        <div className="table-responsive p-0">
          <table className="table table-striped table-hover table-bordered text-center">
            <thead>
              <tr>
                <th>Folio de cotización</th>
                <th>Fecha de cotización</th>
                <th>Fecha de vencimiento</th>
                <th>Diseño</th>
                <th>Precio Unitario</th>
                <th>Precio de Gerencia</th>
                
                
              </tr>
            </thead>
            <tbody>
              {lineas.map((linea) => (
                <tr key={linea.id}>
                  <td>
                    <Link
                      to={`/concreco/logistica/agregar-pedido/cotizacion/${linea.id}/condicion-venta`}
                    >
                    
                    </Link>  
                    {linea.folio}
                  </td>
                  <td>
                    <Link
                      to={`/concreco/logistica/agregar-pedido/cotizacion/${linea.id}/condicion-venta`}
                    >
                      {linea.created_at.slice(0, 10)}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/concreco/logistica/agregar-pedido/cotizacion/${linea.id}/condicion-venta`}
                    >
                      {linea.fecha_vencimiento}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/concreco/logistica/agregar-pedido/cotizacion/${linea.id}/condicion-venta`}
                    >
                      {linea.producto_detail.diseño}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/concreco/logistica/agregar-pedido/cotizacion/${linea.id}/condicion-venta`}
                    >
                      $  {linea.precio_unitario}
                    </Link>
                  </td>
                  <td>


                    <Link
                      to={`/concreco/logistica/agregar-pedido/cotizacion/${linea.id}/condicion-venta`}
                    >
                      {linea.precio_gerencia}

                    </Link>
                  </td>
                  
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
