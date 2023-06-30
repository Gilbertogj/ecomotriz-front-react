import React from "react";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { FormAgregarCliente } from "../../components/form-agregar-cliente/FormAgregarCliente";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

export const EditarClientePage = () => {
  const { data, isLoading } = useFetchAndLoading(
    process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api/clientes/choices/"
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <FormAgregarCliente choicesData={data} formToEdit={true} />
      )}
    </>
  );
};
