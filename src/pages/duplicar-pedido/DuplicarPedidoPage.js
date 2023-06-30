import React from "react";
import { useParams } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { FormDuplicarPedido } from "../../components/form-duplicar-pedido/FormDuplicarPedido";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

export const DuplicarPedidoPage = () => {
  const { pedidoId } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `https://ec2-3-18-209-167.us-east-2.compute.amazonaws.com/api/pedidos/${pedidoId}/`,
    pedidoId
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <FormDuplicarPedido pedidoData={data} />
      )}
    </>
  );
};