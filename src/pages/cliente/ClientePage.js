import React from "react";
import { useParams } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { DetallesCliente } from "../../components/detalles-cliente/DetallesCliente";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

import "./ClientePage.styles.scss";

export const ClientePage = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/clientes/${id}/`,
    id
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DetallesCliente detallesCliente={data} urlId={id} />
      )}
    </>
  );
};
