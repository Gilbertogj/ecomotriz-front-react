import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { DetallesRegistroProduccion } from "../../components/detalles-registro-produccion/DetallesRegistroProduccion";

export const RegistrosPage = () => {
  const { userRol } = useContext(ReactReduxContext);

  const { id } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_produccion/registro_produccion/${id}/`,
    id
  );

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : !data.detail ? (
        <>
          <h3 className="text-center"> Registro de Producción</h3>
          <DetallesRegistroProduccion registro={data} />

          {userRol === "Ollero" && !data.reporte_ollero.incidencia && (
            <Link
              to={`/concreco/produccion/crear-reporte/${data.reporte_ollero.id}`}
              className="btn btn-success"
            >
              {data.reporte_ollero.salida_planta
                ? "Continuar con el reporte"
                : "Iniciar reporte"}
            </Link>
          )}
        </>
      ) : (
        <p>No existe el registro #{id} </p>
      )}
    </div>
  );
};
