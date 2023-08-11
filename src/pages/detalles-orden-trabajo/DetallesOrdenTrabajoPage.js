import React , { useState} from "react";
import { useParams } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { DetallesOrdenTrabajo } from "../../components/detalles-orden-trabajo/DetallesOrdenTrabajo.js";


import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

// import "./InformacionFinancieraPage.styles.scss";

export const DetallesOrdenTrabajoPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  

//   const { data, isLoading } = useFetchAndLoading(
//     `${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/informacion-financiera/${idFinanzas}/`,
//     idFinanzas
//   );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DetallesOrdenTrabajo  />
        // <DetallesOrdenTrabajo detallesInfoFinanciera={data} urlId={idFinanzas} />
        // <p>hola nuevo </p>
      )}
    </>
  );
};