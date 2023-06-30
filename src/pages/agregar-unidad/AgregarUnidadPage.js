import React from "react";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { FormAgregarUnidad } from "../../components/form-agregar-unidad/FormAgregarUnidad";

export const AgregarUnidadPage = () => {
  

  return (
    <>
   
        <FormAgregarUnidad formToEdit={false}  />
    
    </>
  );
};
