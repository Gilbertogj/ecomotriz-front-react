import React from "react";
import { useParams, useLocation } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { FormRealizarPedido } from "../../components/form-realizar-pedido/FormRealizarPedido";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { Cotizacion } from "../../components/cotizacion/Cotizacion";
import { FormRealizarPedidoCotizacion } from "../../components/form-realizar-pedido/FormRealizarPedidoCotizacion";

export const AgregarPedidoCotizationPage = () => {
  const { cotizacionId, condicionVentaId } = useParams();

  const { pathname } = useLocation();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/cotizaciones/lineas/?id=${cotizacionId}`,
    cotizacionId
  );

  if (isLoading) return <LoadingSpinner />

  const linea = data[0]

  return (
    <>
      <FormRealizarPedidoCotizacion  linea={linea} cotizacionId={cotizacionId} condicionVentaId={condicionVentaId}/>
    </>
  );
};
