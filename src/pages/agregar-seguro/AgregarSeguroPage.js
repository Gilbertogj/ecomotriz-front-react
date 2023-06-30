import React from "react";
import { useParams } from "react-router-dom";
import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { FormAgregarSeguro } from "../../components/form-agregar-seguro/FormAgregarSeguro";

export const AgregarSeguroPage = () => {
    const { id } = useParams();

  return (
    <>
   
        <FormAgregarSeguro unidadId={id}  />
    
    </>
  );
};