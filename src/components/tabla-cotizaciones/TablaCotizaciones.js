import React from "react";
import { Link } from "react-router-dom";

import { formatNumToMxnCurrency } from "../../utils/formatNumToMxnCurrency";

export const TablaCotizaciones = ({ cotizaciones }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="table-responsive p-0">
          <table className="table table-striped table-hover table-bordered text-center">
            <thead>
              <tr>
                <th>Folio de cotización</th>
                <th>Fecha de cotización</th>
                <th>Fecha de vencimiento</th>
                <th>Nombre de cliente</th>
                <th>Nombre de obra</th>
                <th>Asesor comercial</th>
                <th>Tipo de venta (F o G)</th>
                <th>
                  Monto <br /> (Aquí sería el subtotal-antes de IVA)
                </th>
                <th>Status</th>
                <th>Aprobación</th>
              </tr>
            </thead>
            <tbody>
              {cotizaciones.map((cotizacion) => (
                <tr key={cotizacion.id}>
                  <td>
                    <Link
                      to={`/concreco/comercializacion/cotizacion/${cotizacion.id}`}
                    >
                      {cotizacion.folio}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/concreco/comercializacion/cotizacion/${cotizacion.id}`}
                    >
                      {cotizacion.created_at.slice(0, 10)}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/concreco/comercializacion/cotizacion/${cotizacion.id}`}
                    >
                      {cotizacion.vigencia}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/concreco/comercializacion/cotizacion/${cotizacion.id}`}
                    >
                      {cotizacion.cliente_nombre}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/concreco/comercializacion/cotizacion/${cotizacion.id}`}
                    >
                      {cotizacion.obra_nombre}
                    </Link>
                  </td>
                  <td>


                    <Link
                      to={`/concreco/comercializacion/cotizacion/${cotizacion.id}`}
                    >
                      {cotizacion.asesor_comercial.name}

                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/concreco/comercializacion/cotizacion/${cotizacion.id}`}
                    >
                      {cotizacion.tipo_venta}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/concreco/comercializacion/cotizacion/${cotizacion.id}`}
                    >
                      {formatNumToMxnCurrency(cotizacion.total)}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/concreco/comercializacion/cotizacion/${cotizacion.id}`}
                    >
                      {cotizacion.estado}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/concreco/comercializacion/cotizacion/${cotizacion.id}`}
                    >
                      {cotizacion.aprobacion}
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
