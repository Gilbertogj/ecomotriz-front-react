import React from "react";
import { useParams, useLocation } from "react-router-dom";

import { useFetchAndLoadingWA } from "../../hooks/useFetchAndLoadingWA";

import { DetalleUnidadOrden } from "../../components/detalle-unidad-orden/DetalleUnidadOrden";
import { OrdenTrabajo } from "../../components/orden-trabajo/OrdenTrabajo";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

import "./UnidadOrdenPage.styles.scss";

export const UnidadOrdenPage = () => {
  const { id } = useParams();

  const { pathname } = useLocation();
  // console.log(pathname);

  const { data, isLoading } = useFetchAndLoadingWA(
    `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/assets/${id}/`,
    id
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : pathname.includes("crear-orden") ? (
        <OrdenTrabajo />
        // <p>Crear nueva orden </p>
      ) :   (
        <DetalleUnidadOrden detallesUnidad={data} urlId={id} />
        // <p>Unidad para orden</p>
      )}


    </>
  );
};
