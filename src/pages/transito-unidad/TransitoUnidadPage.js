import React from "react";
import { useParams } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { DetalleTransito } from "../../components/detalle-transito/DetalleTransito.js";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

import "./TransitoUnidadPage.styles.scss";

export const TransitoUnidadPage = () => {
  const { idTransito } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/transitos/${idTransito}/`,
    idTransito
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DetalleTransito detallesTransito={data} urlId={idTransito} />
      )}
    </>
  );
};