import React from "react";
import { useParams } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { FormAgregarObra } from "../../components/form-agregar-obra/FormAgregarObra";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

export const EditarObraPage = () => {
  const { obraId } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/obras/${obraId}/`,
    obraId
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <FormAgregarObra clienteId={data.cliente} obraData={data} />
      )}
    </>
  );
};
