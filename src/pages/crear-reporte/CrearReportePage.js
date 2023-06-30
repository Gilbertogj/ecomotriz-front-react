import React from "react";
import { useParams } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { FormAgregarReporte } from "../../components/form-agregar-reporte/FormAgregarReporte";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

export const CrearReportePage = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_produccion/reporte_ollero/${id}/`,
    id
  );

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      {isLoading ? (
        <LoadingSpinner />
      ) : data.id ? (
        <FormAgregarReporte reporte={data} />
      ) : (
        <p>No existe el reporte #{id} </p>
      )}
    </div>
  );
};
