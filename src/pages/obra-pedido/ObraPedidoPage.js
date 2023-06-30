import React from "react";
import { useParams } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { DetallesObra } from "../../components/detalles-obra/DetallesObra";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

export const ObraPedidoPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/obras/${id}/`,
    id
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DetallesObra obraData={data} urlId={id} />
      )}
    </>
  );
};
