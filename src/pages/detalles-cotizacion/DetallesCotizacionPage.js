import React from "react";
import { useParams } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { DetallesCotizacion } from "../../components/detalles-cotizacion/DetallesCotizacion";

export const DetallesCotizacionPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/cotizaciones/${id}/`,
    id
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : data.id ? (
        <DetallesCotizacion data={data} />
      ) : (
        <p>No existe la cotizacion #{id}</p>
      )}
    </>
  );
};
