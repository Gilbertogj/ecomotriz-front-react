import React from "react";
import { useParams } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { DetalleInformacionFinanciera } from "../../components/detalle-informacion-financiera/DetalleInformacionFinanciera.js";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

import "./InformacionFinancieraPage.styles.scss";

export const InformacionFinancieraPage = () => {
  const { idFinanzas } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/informacion-financiera/${idFinanzas}/`,
    idFinanzas
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DetalleInformacionFinanciera detallesInfoFinanciera={data} urlId={idFinanzas} />
      )}
    </>
  );
};
