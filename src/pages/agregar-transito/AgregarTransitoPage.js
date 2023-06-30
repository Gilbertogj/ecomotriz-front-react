import React from "react";
import { useParams } from "react-router-dom";
import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { FormAgregarTransito } from "../../components/form-agregar-transito/FormAgregarTransito";

export const AgregarTransitoPage = () => {
    const { id } = useParams();

  return (
    <>
   
        <FormAgregarTransito unidadId={id}  />
    
    </>
  );
};