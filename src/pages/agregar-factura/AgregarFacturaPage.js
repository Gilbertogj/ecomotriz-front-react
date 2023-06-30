import React from "react";
import { useParams } from "react-router-dom";
import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { FormAgregarFactura } from "../../components/form-agregar-factura/FormAgregarFactura";

export const AgregarFacturaPage = () => {
    const { id } = useParams();

  return (
    <>
   
        <FormAgregarFactura infoFinancieraId={id}  />
    
    </>
  );
};