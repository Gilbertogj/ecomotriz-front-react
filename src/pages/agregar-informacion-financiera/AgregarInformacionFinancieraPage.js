import React from "react";
import { useParams } from "react-router-dom";
import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { FormAgregarInformacionFinanciera } from "../../components/form-agregar-informacion-financiera/FormAgregarInformacionFinanciera";

export const AgregarInformacionFinancieraPage = () => {
    const { id } = useParams();

  return (
    <>
   
        <FormAgregarInformacionFinanciera unidadId={id}  />
    
    </>
  );
};