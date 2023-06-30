import React from "react";
import { useParams } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { DetalleSeguro } from "../../components/detalle-seguro/DetalleSeguro.js";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

import "./SeguroUnidadPage.styles.scss";

export const SeguroUnidadPage = () => {
  const { idSeguro } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/seguros/${idSeguro}/`,
    idSeguro
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DetalleSeguro detallesSeguro={data} urlId={idSeguro} />
      )}
    </>
  );
};
