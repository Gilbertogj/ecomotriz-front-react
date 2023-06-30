import React from "react";
import { useParams } from "react-router-dom";

import { DetallesProyeccion } from "../../components/detalles-proyeccion/DetallesProyeccion";

import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

export const ProyeccionPage = () => {
  const { id } = useParams();


  const { data, setData, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/proyecciones/${id}/`,
    id
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : data.id ? (
        <DetallesProyeccion proyeccionData={data} setData={setData} />
      ) : (
        <p>No existe la proyeccion #{id} </p>
      )}
    </>
  );
};
