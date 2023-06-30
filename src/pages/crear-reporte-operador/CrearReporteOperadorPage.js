import React from "react";
import { useParams } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { FormAgregarReporteOperador } from "../../components/form-agregar-reporte-operador/FormAgregarReporteOperador";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

export const CrearReporteOperadorPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_produccion/reporte_operador/${id}/`,
    id
  );

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      {isLoading ? (
        <LoadingSpinner />
      ) : data.id ? (
        <FormAgregarReporteOperador reporte={data} />
      ) : (
        <p>No existe el reporte #{id} </p>
      )}
    </div>
  );
};
