import React from "react";
import { useParams } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { DetallesCondicionVenta } from "../../components/detalles-condicion-venta/DetallesCondicionVenta";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

export const CondicionVentaPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/condicion-venta/${id}/`,
    id
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DetallesCondicionVenta condicionVentaData={data} urlId={id} />
      )}
    </>
  );
};