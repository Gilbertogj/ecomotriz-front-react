import React from "react";
import { Link } from "react-router-dom";

import { formatNumToMxnCurrency } from "../../utils/formatNumToMxnCurrency";

export const TablaProductos = ({ productos }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="table-responsive p-0">
          <table className="table table-striped table-hover table-bordered text-center">
            <thead>
              <tr>
                <th>Diseño</th>
                <th>Planta</th>
                <th>Precio 1</th>
                <th>Precio 2</th>
                <th>Precio 3</th>
                <th>Precio Contado</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>
                    <Link
                      to={`/concreco/comercializacion/producto/${producto.id}`}
                    >
                      {producto.diseño}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/concreco/comercializacion/producto/${producto.id}`}
                    >
                      {producto.ubicacion}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/concreco/comercializacion/producto/${producto.id}`}
                    >
                      {formatNumToMxnCurrency(producto.precio_1)}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/concreco/comercializacion/producto/${producto.id}`}
                    >
                      {formatNumToMxnCurrency(producto.precio_2)}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/concreco/comercializacion/producto/${producto.id}`}
                    >
                      {formatNumToMxnCurrency(producto.precio_3)}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/concreco/comercializacion/producto/${producto.id}`}
                    >
                      {producto.precio_contado.trim()
                        ? formatNumToMxnCurrency(producto.precio_contado)
                        : "N/A"}
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
