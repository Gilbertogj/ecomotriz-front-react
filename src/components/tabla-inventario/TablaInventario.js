import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";

import "./TablaInventario.styles.scss";

export const TablaInventario = () => {
  const { pathname } = useLocation();

  const { id } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/unidades/${id}/lineas`,
    id
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="container">
          <div className="row text-center">
            {/* {pathname.includes("pedido") || pathname.includes("cotizacion") ? (
              <h2>Seleccione obra</h2>
            ) : (
              <h2>Obras de {data.nombre}</h2>
            )} */}

            <h2>Inventario </h2>
          </div>

          <div className="d-flex justify-content-end mb-3">
           
              <Link
                to={`/unidades/agregar-inventario/${id}`}
                className="btn btn-primary"
              >
                Agregar elemento
              </Link>
       
          </div>

          <div className="row">
            <div className="table-responsive p-0">
              <table className="table table-striped table-hover table-bordered text-center">
                <thead>
                  <tr>
                    <th>Descripción</th>
                    <th>Imagen</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((linea) => (
                    <tr key={linea.id}>
                      <td>
                        

                            <Link
                              to={`/concreco/comercializacion/obra/${linea.id}`}
                            >
                              {linea.descripcion}
                            </Link>
                      
                      </td>
                      <td>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={linea.foto}
                      >
                        {linea.foto ? "Imagen" : "No hay imagen"}
                      </a>
                        
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
