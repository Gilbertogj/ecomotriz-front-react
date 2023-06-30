import React from "react";
import { useParams } from "react-router-dom";

import { FormAgregarObra } from "../../components/form-agregar-obra/FormAgregarObra";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

export const AgregarObraPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/clientes/${id}/obras/`,
    id
  );

  return isLoading ? (
    <LoadingSpinner />
  ) : !data.id ? (
    <p>El cliente #{id} no existe</p>
  ) : (
    <FormAgregarObra clienteId={id} />
  );
};
