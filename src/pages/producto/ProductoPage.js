import React from "react";
import { useParams } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { DetallesProducto } from "../../components/detalles-producto/DetallesProducto";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { FormProductoPrecios } from "../../components/form-producto-precios/FormProductoPrecios";

export const ProductoPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/productos/${id}/`,
    id
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <DetallesProducto productoData={data} urlId={id} />
          <FormProductoPrecios productoData={data} />
        </>
      )}
    </>
  );
};
