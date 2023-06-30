import React from "react";
import { formatNumToMxnCurrency } from "../../utils/formatNumToMxnCurrency";

export const DetallesProducto = ({ productoData, urlId }) => {
  return (
    <div className="container">
      {productoData.id ? (
        <>
          <div className="row mb-3">
            <div className="col d-flex justify-content-center align-items-center">
              <h2>Detalle Diseño</h2>
            </div>
          </div>

          <div className="row">
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Diseño:</strong> {productoData.diseño}
              </li>
              <li className="list-group-item">
                <strong>Precio 1:</strong>{" "}
                {formatNumToMxnCurrency(productoData.precio_1)}
              </li>
              <li className="list-group-item">
                <strong>Precio 2:</strong>{" "}
                {formatNumToMxnCurrency(productoData.precio_2)}
              </li>
              <li className="list-group-item">
                <strong>Precio 3:</strong>{" "}
                {formatNumToMxnCurrency(productoData.precio_3)}
              </li>
              {productoData.precio_contado.trim() && (
                <li className="list-group-item">
                  <strong>Precio Contado:</strong>{" "}
                  {formatNumToMxnCurrency(productoData.precio_contado)}
                </li>
              )}
            </ul>
          </div>
        </>
      ) : (
        <p>No existe el producto #{urlId}</p>
      )}
    </div>
  );
};
