import React from "react";
import { useParams } from "react-router-dom";
import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { FormAgregarInventario } from "../../components/form-agregar-inventario/FormAgregarInventario";

export const AgregarInventarioPage = () => {
    const { id } = useParams();

  return (
    <>
   
        <FormAgregarInventario unidadId={id}  />
    
    </>
  );
};