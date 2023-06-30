import React from "react";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { FormAgregarCliente } from "../../components/form-agregar-cliente/FormAgregarCliente";

export const AgregarClientePage = () => {
  const { data, isLoading } = useFetchAndLoading(
    process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api/clientes/choices/"
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <FormAgregarCliente choicesData={data} />
      )}
    </>
  );
};
