import React from "react";
import { useParams } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { DetalleUnidad } from "../../components/detalle-unidad/DetalleUnidad";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

import "./UnidadPage.styles.scss";

export const UnidadPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/unidades/${id}/`,
    id
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DetalleUnidad detallesUnidad={data} urlId={id} />
      )}
    </>
  );
};

