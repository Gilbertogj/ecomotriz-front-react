import React from "react";
import { useParams } from "react-router-dom";

import { FormAgregarCondicionVenta } from "../../components/form-agregar-condicion-venta/FormAgregarCondicionVenta";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

export const AgregarCondicionVentaPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/condicion-venta/?clienteId=${id}`,
    id
  );

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <FormAgregarCondicionVenta clienteId={id} />
  );
};
