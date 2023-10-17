import React , { useState} from "react";
import { useParams, useLocation  } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { DetallesOrdenTrabajo } from "../../components/detalles-orden-trabajo/DetallesOrdenTrabajo.js";
import { SolicitudRefacciones } from "../../components/solicitud-refacciones/SolicitudRefacciones.js";
import { FallasEncontradas } from "../../components/fallas-encontradas/FallasEncontradas.js";

import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

// import "./InformacionFinancieraPage.styles.scss";

export const DetallesOrdenTrabajoPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  // const [isLoading, setIsLoading] = useState(false);
  

  const { data, isLoading } = useFetchAndLoading(
    `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/workorders/${id}/`,
    id
  );

  return (
    <>
  


        {isLoading ? (
        <LoadingSpinner />
      ) : pathname.includes("crear-solicitud") ? (
        <SolicitudRefacciones ordenTrabajoData={data} />
      ) : pathname.includes("fallas-encontrada") ? (
        <FallasEncontradas ordenTrabajoData={data} />
      ) : pathname.includes("compras") ? (
        <DetallesOrdenTrabajo data={data} />
        // <p>Tabla detalle orden compras </p>
      ) : (
        <DetallesOrdenTrabajo data={data} />
      )}  
    </>
  );
};