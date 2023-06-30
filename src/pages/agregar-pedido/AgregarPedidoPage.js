import React from "react";
import { useParams, useLocation } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { FormRealizarPedido } from "../../components/form-realizar-pedido/FormRealizarPedido";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { Cotizacion } from "../../components/cotizacion/Cotizacion";

export const AgregarPedidoPage = () => {
  const { clienteId, obraId } = useParams();

  const { pathname } = useLocation();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/clientes/${clienteId}/obras/`,
    clienteId
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : !data.id ? (
        <p>El cliente #{clienteId} no existe</p>
      ) : data.obras.some((obra) => obra.id === parseInt(obraId)) ? (
        pathname.includes("pedido") ? (
          <FormRealizarPedido />
        ) : (
          <Cotizacion />
        )
      ) : (
        <p>
          El cliente #{clienteId} con obra #{obraId} no existe
        </p>
      )}
    </>
  );
};
