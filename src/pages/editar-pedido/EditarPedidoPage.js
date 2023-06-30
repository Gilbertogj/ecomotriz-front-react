import React from "react";
import { useParams } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { FormRealizarPedido } from "../../components/form-realizar-pedido/FormRealizarPedido";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

export const EditarPedidoPage = () => {
  const { pedidoId } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/${pedidoId}/`,
    pedidoId
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <FormRealizarPedido pedidoData={data} />
      )}
    </>
  );
};
